@echo off
echo Starting GearGuard Development Servers...
echo.

REM Start Backend Server in new window
echo Starting Backend Server on http://localhost:5000
start "GearGuard Backend" cmd /k "cd /d %~dp0backend && node server.js"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Start Frontend Server in new window
echo Starting Frontend Server on http://localhost:3000
start "GearGuard Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000 (or next available port)
echo.
echo Press any key to exit this window (servers will continue running in their own windows)
pause >nul
