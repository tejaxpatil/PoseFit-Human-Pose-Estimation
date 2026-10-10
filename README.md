# PoseFit — Human Pose Estimation for Fitness Monitoring

## Project Overview

PoseFit is a Computer Vision mini-project that uses webcam video and MediaPipe Pose to estimate human body landmarks, calculate joint angles, and count exercise repetitions in real time.

The application provides a web dashboard for monitoring workouts and visualizing pose-estimation results.

## Objectives

- Detect human body landmarks from webcam video.
- Calculate knee and elbow joint angles using 3D pose landmarks.
- Identify exercise movement phases using angle thresholds.
- Count repetitions for squats, bicep curls, and push-ups.
- Display live video and workout statistics through a web interface.

## Technology Stack

### Computer Vision and Backend
- Python
- OpenCV
- MediaPipe Pose
- NumPy
- FastAPI
- Uvicorn

### Frontend
- React
- Vite
- Tailwind CSS
- JavaScript

## System Architecture

1. OpenCV captures video from the webcam.
2. MediaPipe Pose estimates body landmarks.
3. Joint angles are calculated from 3D world landmarks.
4. Exercise-specific thresholds identify movement states.
5. FastAPI exposes workout statistics and the video stream.
6. React displays the video, joint angles, repetition count, and session controls.

## Supported Exercises

- Squats: knee-angle monitoring.
- Bicep curls: elbow-angle monitoring.
- Push-ups: elbow-angle monitoring.

## Project Structure

```text
Human-Pose-Fitness/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── venv/
├── main.py
└── README.md
```

## Setup and Execution

### 1. Activate the Python environment

From the project root in PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

### 2. Install backend dependencies

```powershell
pip install -r backend/requirements.txt
```

### 3. Start the backend

```powershell
python -m uvicorn main:app --reload --app-dir backend
```

The API runs at `http://127.0.0.1:8000`.

API documentation is available at `http://127.0.0.1:8000/docs`.

### 4. Start the frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## Testing

Test each exercise with the webcam and verify:

- Body landmarks are detected.
- Joint-angle readings update.
- Repetitions increase after a complete movement.
- Workout start and stop controls work.
- The repetition counter can be reset.
- The dashboard receives live statistics from the backend.

## Limitations

- Results depend on camera position, lighting, visibility, and pose-estimation quality.
- Fixed angle thresholds may not work equally well for every person.
- Occluded body landmarks can reduce detection reliability.
- Joint angles are model estimates, not medical-grade measurements.
- Exercise counting requires testing under different movement conditions.

## Conclusion

PoseFit demonstrates how human pose estimation, geometric angle calculation, movement-state detection, and web application development can be combined to create a basic fitness-monitoring system.