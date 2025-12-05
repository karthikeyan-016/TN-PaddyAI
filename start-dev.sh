#!/bin/bash

echo "Starting Tamil Nadu Rice Yield Prediction System..."
echo

echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt
echo

echo "Starting backend server..."
python simple_server.py &
BACKEND_PID=$!
echo "Backend server started on http://localhost:8000 (PID: $BACKEND_PID)"
echo

echo "Waiting for backend to start..."
sleep 3

cd ..
echo "Installing frontend dependencies..."
npm install
echo

echo "Starting frontend development server..."
npm run dev &
FRONTEND_PID=$!
echo "Frontend server started on http://localhost:5173 (PID: $FRONTEND_PID)"
echo

echo "Both servers are running:"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Wait for user input
wait