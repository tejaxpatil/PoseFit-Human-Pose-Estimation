import cv2
import mediapipe as mp
import numpy as np
import math

mp_pose = mp.solutions.pose
mp_draw = mp.solutions.drawing_utils


def calculate_angle(a, b, c):
    a, b, c = np.array(a), np.array(b), np.array(c)

    radians = (
        math.atan2(c[1] - b[1], c[0] - b[0])
        - math.atan2(a[1] - b[1], a[0] - b[0])
    )

    angle = abs(radians * 180.0 / math.pi)
    return 360 - angle if angle > 180 else angle


def get_knee_angle(landmarks, hip_id, knee_id, ankle_id,
                   width, height):
    hip = landmarks[hip_id]
    knee = landmarks[knee_id]
    ankle = landmarks[ankle_id]

    visibility = min(
        hip.visibility, knee.visibility, ankle.visibility
    )

    if visibility < 0.5:
        return None, visibility

    a = (int(hip.x * width), int(hip.y * height))
    b = (int(knee.x * width), int(knee.y * height))
    c = (int(ankle.x * width), int(ankle.y * height))

    return calculate_angle(a, b, c), visibility


def draw_text(frame, text, position, color, scale=0.7):
    cv2.putText(
        frame, text, position,
        cv2.FONT_HERSHEY_SIMPLEX,
        scale, color, 2, cv2.LINE_AA
    )


cap = cv2.VideoCapture(0)

counter = 0
stage = "UP"
feedback = "Stand ready"
last_angle = None

GREEN = (0, 220, 0)
WHITE = (255, 255, 255)
YELLOW = (0, 220, 255)
BLUE = (255, 180, 0)
RED = (0, 0, 255)

with mp_pose.Pose(
    static_image_mode=False,
    model_complexity=0,
    smooth_landmarks=True,
    min_detection_confidence=0.4,
    min_tracking_confidence=0.4
) as pose:

    while True:
        ret, frame = cap.read()

        if not ret:
            print("Could not access webcam")
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb_frame)

        height, width, _ = frame.shape

        # Header panel
        cv2.rectangle(frame, (0, 0), (width, 45), (35, 35, 35), -1)
        draw_text(frame, "HUMAN POSE FITNESS MONITOR",
                  (15, 30), WHITE, 0.7)

        if results.pose_landmarks:
            landmarks = results.pose_landmarks.landmark

            left_angle, left_vis = get_knee_angle(
                landmarks,
                mp_pose.PoseLandmark.LEFT_HIP.value,
                mp_pose.PoseLandmark.LEFT_KNEE.value,
                mp_pose.PoseLandmark.LEFT_ANKLE.value,
                width, height
            )

            right_angle, right_vis = get_knee_angle(
                landmarks,
                mp_pose.PoseLandmark.RIGHT_HIP.value,
                mp_pose.PoseLandmark.RIGHT_KNEE.value,
                mp_pose.PoseLandmark.RIGHT_ANKLE.value,
                width, height
            )

            candidates = []
            if left_angle is not None:
                candidates.append((left_angle, left_vis))
            if right_angle is not None:
                candidates.append((right_angle, right_vis))

            active_angle = None
            if candidates:
                active_angle = max(candidates, key=lambda x: x[1])[0]
                last_angle = active_angle

            mp_draw.draw_landmarks(
                frame,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS
            )

            # Exercise state and feedback
            if active_angle is not None:
                if active_angle < 100:
                    stage = "DOWN"
                    feedback = "Good depth"
                elif active_angle > 160:
                    if stage == "DOWN":
                        counter += 1
                    stage = "UP"
                    feedback = "Stand tall"
                else:
                    feedback = "Keep moving"

            left_text = (
                f"Left Knee: {int(left_angle)} deg"
                if left_angle is not None else "Left Knee: N/A"
            )
            right_text = (
                f"Right Knee: {int(right_angle)} deg"
                if right_angle is not None else "Right Knee: N/A"
            )

            draw_text(frame, left_text, (15, 80), GREEN)
            draw_text(frame, right_text, (15, 115), GREEN)

            # Information panel
            panel_top = max(160, height - 115)
            cv2.rectangle(
                frame, (0, panel_top), (width, height),
                (35, 35, 35), -1
            )

            draw_text(
                frame, "EXERCISE: SQUAT",
                (15, panel_top + 28), WHITE, 0.65
            )
            draw_text(
                frame, f"REPETITIONS: {counter}",
                (15, panel_top + 60), BLUE, 0.75
            )
            draw_text(
                frame, f"STATUS: {stage}",
                (15, panel_top + 90), YELLOW, 0.65
            )
            draw_text(
                frame, f"Feedback: {feedback}",
                (width // 2, panel_top + 60), GREEN, 0.6
            )

        else:
            draw_text(
                frame, "Pose not detected - adjust position",
                (15, 80), RED, 0.6
            )

        draw_text(
            frame, "Q: Quit   |   R: Reset Counter",
            (15, height - 10), WHITE, 0.5
        )

        cv2.imshow("Human Pose Fitness Monitor", frame)

        key = cv2.waitKey(1) & 0xFF

        if key == ord('q'):
            break
        elif key == ord('r'):
            counter = 0
            stage = "UP"
            feedback = "Counter reset"

cap.release()
cv2.destroyAllWindows()
