import cv2
import mediapipe as mp
import numpy as np
import math
import threading
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI(title="PoseFit API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

mp_pose = mp.solutions.pose
mp_draw = mp.solutions.drawing_utils

lock = threading.Lock()

exercise = "Squats"
session_active = False
session_started_at = None
session_elapsed = 0.0

counter = 0
stage = "UP"

stats = {
    "left_angle": None,
    "right_angle": None,
    "squats": 0,
    "status": "Ready",
    "detected": False,
    "exercise": "Squats",
    "session_active": False,
    "duration": 0,
}

EXERCISES = ("Squats", "Bicep Curls", "Push-ups")


class ExerciseRequest(BaseModel):
    exercise: str


# def calculate_angle(a, b, c):
#     a, b, c = np.array(a), np.array(b), np.array(c)

#     radians = (
#         math.atan2(c[1] - b[1], c[0] - b[0])
#         - math.atan2(a[1] - b[1], a[0] - b[0])
#     )

#     angle = abs(radians * 180 / math.pi)
#     return 360 - angle if angle > 180 else angle

def calculate_angle(a, b, c):
    """
    Calculate the angle ABC in 2D or 3D coordinates.
    B is the joint whose angle is being measured.
    """
    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)
    c = np.array(c, dtype=float)

    ba = a - b
    bc = c - b

    norm_ba = np.linalg.norm(ba)
    norm_bc = np.linalg.norm(bc)

    if norm_ba < 1e-6 or norm_bc < 1e-6:
        return None

    cosine = np.dot(ba, bc) / (norm_ba * norm_bc)
    cosine = np.clip(cosine, -1.0, 1.0)

    angle = math.degrees(math.acos(cosine))
    return angle


# def get_angle(landmarks, a_id, b_id, c_id, width, height):
#     a = landmarks[a_id]
#     b = landmarks[b_id]
#     c = landmarks[c_id]

#     visibility = min(a.visibility, b.visibility, c.visibility)

#     if visibility < 0.5:
#         return None, visibility

#     points = [
#         (int(p.x * width), int(p.y * height))
#         for p in (a, b, c)
#     ]

#     return calculate_angle(*points), visibility

def get_angle(world_landmarks, image_landmarks,
              a_id, b_id, c_id):
    """
    Calculate a joint angle using 3D world landmarks.
    Use image landmarks to check visibility.
    """
    a_img = image_landmarks[a_id]
    b_img = image_landmarks[b_id]
    c_img = image_landmarks[c_id]

    visibility = min(
        a_img.visibility,
        b_img.visibility,
        c_img.visibility
    )

    if visibility < 0.5:
        return None, visibility

    a = world_landmarks[a_id]
    b = world_landmarks[b_id]
    c = world_landmarks[c_id]

    angle = calculate_angle(
        [a.x, a.y, a.z],
        [b.x, b.y, b.z],
        [c.x, c.y, c.z]
    )

    return angle, visibility


def process_pose(frame, pose):
    global counter, stage

    height, width, _ = frame.shape
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb)

    if not results.pose_landmarks:
        with lock:
            stats["detected"] = False
            stats["status"] = "3D pose unavailable"
        return frame

    landmarks = results.pose_landmarks.landmark
    world_landmarks = results.pose_world_landmarks.landmark

    P = mp_pose.PoseLandmark

    # Squats use hip-knee-ankle; other exercises use shoulder-elbow-wrist.
    if exercise == "Squats":
        left_ids = (P.LEFT_HIP.value, P.LEFT_KNEE.value,
                    P.LEFT_ANKLE.value)
        right_ids = (P.RIGHT_HIP.value, P.RIGHT_KNEE.value,
                     P.RIGHT_ANKLE.value)
        down_threshold, up_threshold = 100, 160

    else:
        left_ids = (P.LEFT_SHOULDER.value, P.LEFT_ELBOW.value,
                    P.LEFT_WRIST.value)
        right_ids = (P.RIGHT_SHOULDER.value, P.RIGHT_ELBOW.value,
                     P.RIGHT_WRIST.value)

        if exercise == "Bicep Curls":
            down_threshold, up_threshold = 60, 150
        else:
            down_threshold, up_threshold = 95, 160

    left, left_vis = get_angle(
        world_landmarks, 
        landmarks, 
        *left_ids
    )
    right, right_vis = get_angle(
        world_landmarks, 
        landmarks, 
        *right_ids
    )

    candidates = []

    if left is not None:
        candidates.append((left, left_vis))

    if right is not None:
        candidates.append((right, right_vis))

    mp_draw.draw_landmarks(
        frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS
    )

    with lock:
        stats["detected"] = bool(candidates)
        stats["left_angle"] = round(left) if left is not None else None
        stats["right_angle"] = round(right) if right is not None else None

        if candidates:
            active_angle = max(candidates, key=lambda item: item[1])[0]

            if active_angle < down_threshold:
                stage = "DOWN"
            elif active_angle > up_threshold:
                if stage == "DOWN":
                    counter += 1
                stage = "UP"

            stats["squats"] = counter
            stats["status"] = stage
        else:
            stats["status"] = "Pose unclear"

    return frame



def generate_frames():
    global session_active, session_started_at
    global session_elapsed, exercise


    camera = None

    pose = mp_pose.Pose(
        static_image_mode=False,
        model_complexity=0,
        smooth_landmarks=True,
        min_detection_confidence=0.4,
        min_tracking_confidence=0.4,
    )

    try:
        while True:
            with lock:
                active = session_active
                current_exercise = exercise

            if not active:
                if camera is not None:
                    camera.release()
                    camera = None

                # Keep the browser video stream alive without using the camera.
                frame = np.zeros((480, 640, 3), dtype=np.uint8)
                cv2.putText(
                    frame, "POSEFIT",
                    (235, 200), cv2.FONT_HERSHEY_SIMPLEX,
                    1.2, (255, 180, 0), 2,
                )
                cv2.putText(
                    frame, "Press Start Workout",
                    (190, 255), cv2.FONT_HERSHEY_SIMPLEX,
                    0.8, (220, 220, 220), 2,
                )
            else:
                if camera is None:
                    camera = cv2.VideoCapture(0)

                    if not camera.isOpened():
                        camera.release()
                        camera = None
                        with lock:
                            session_active = False
                            stats["session_active"] = False
                            stats["status"] = "Camera unavailable"
                        continue

                success, frame = camera.read()

                if not success:
                    continue

                # Read the selected exercise consistently for this frame.
                with lock:
                    exercise = current_exercise

                frame = process_pose(frame, pose)

                cv2.putText(
                    frame, f"Exercise: {current_exercise}",
                    (15, 30), cv2.FONT_HERSHEY_SIMPLEX,
                    0.7, (0, 220, 255), 2,
                )

                with lock:
                    count = counter
                    current_stage = stage

                cv2.putText(
                    frame, f"Reps: {count}  Status: {current_stage}",
                    (15, 65), cv2.FONT_HERSHEY_SIMPLEX,
                    0.7, (0, 255, 0), 2,
                )

            encoded, buffer = cv2.imencode(".jpg", frame)

            if encoded:
                yield (
                    b"--frame\r\n"
                    b"Content-Type: image/jpeg\r\n\r\n"
                    + buffer.tobytes()
                    + b"\r\n"
                )

            with lock:
                if session_active and session_started_at is not None:
                    stats["duration"] = int(
                        session_elapsed + time.time() - session_started_at
                    )

    finally:
        if camera is not None:
            camera.release()
        pose.close()


@app.get("/")
def home():
    return {"message": "PoseFit API is running"}


@app.get("/api/stats")
def get_stats():
    with lock:
        result = dict(stats)
        result["exercise"] = exercise
        result["squats"] = counter
        result["session_active"] = session_active

        if session_active and session_started_at is not None:
            result["duration"] = int(
                session_elapsed + time.time() - session_started_at
            )
        else:
            result["duration"] = int(session_elapsed)

        return result


@app.post("/api/session/start")
def start_session():
    global session_active, session_started_at

    with lock:
        if not session_active:
            session_active = True
            session_started_at = time.time()
            stats["status"] = "Starting"
            stats["session_active"] = True

    return {"message": "Workout started"}


@app.post("/api/session/stop")
def stop_session():
    global session_active, session_started_at, session_elapsed

    with lock:
        if session_active and session_started_at is not None:
            session_elapsed += time.time() - session_started_at

        session_active = False
        session_started_at = None
        stats["session_active"] = False
        stats["status"] = "Stopped"

    return {"message": "Workout stopped"}


@app.post("/api/exercise")
def select_exercise(request: ExerciseRequest):
    global exercise, counter, stage

    if request.exercise not in EXERCISES:
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail="Invalid exercise")

    with lock:
        if session_active:
            from fastapi import HTTPException
            raise HTTPException(
                status_code=409,
                detail="Stop the workout before changing exercises",
            )

        exercise = request.exercise
        counter = 0
        stage = "UP"

        stats.update({
            "left_angle": None,
            "right_angle": None,
            "squats": 0,
            "status": "Ready",
            "detected": False,
            "exercise": exercise,
        })

    return {"message": "Exercise selected", "exercise": exercise}


@app.post("/api/reset")
def reset_counter():
    global counter, stage

    with lock:
        counter = 0
        stage = "UP"
        stats["squats"] = 0
        stats["status"] = "Ready"

    return {"message": "Counter reset", "squats": 0}


@app.get("/video_feed")
def video_feed():
    return StreamingResponse(
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )