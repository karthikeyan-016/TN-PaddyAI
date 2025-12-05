@echo off
echo Starting Tamil Nadu Rice Yield Prediction System...
echo.

echo Installing backend dependencies...
cd backend
pip install -r requirements.txt
echo.

echo Starting backend server...
start "Backend Server" python simple_server.py
echo Backend server starting on http://localhost:8000
echo.

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

cd ..
echo Installing frontend dependencies...
npm install
echo.

echo Starting frontend development server...
start "Frontend Server" npm run dev
echo Frontend server starting on http://localhost:5173
echo.

echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul