@echo off
echo.
echo ========================================
echo   GearGuard - Production Setup Script
echo ========================================
echo.

REM Check if MongoDB is installed
echo [1/5] Checking MongoDB installation...
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo   WARNING: MongoDB not found in PATH
    echo   Please install MongoDB from: https://www.mongodb.com/try/download/community
    echo   Or use MongoDB Atlas cloud: https://www.mongodb.com/cloud/atlas
    echo.
    pause
) else (
    echo   MongoDB found!
)

REM Check if MongoDB service is running
echo.
echo [2/5] Checking MongoDB service...
sc query MongoDB | find "RUNNING" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo   Starting MongoDB service...
    net start MongoDB
    if %ERRORLEVEL% NEQ 0 (
        echo   WARNING: Could not start MongoDB service
        echo   You may need to run this as Administrator
        echo.
    )
) else (
    echo   MongoDB service is running!
)

REM Install backend dependencies
echo.
echo [3/5] Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo   ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

REM Seed database
echo.
echo [4/5] Seeding database...
call npm run seed
if %ERRORLEVEL% NEQ 0 (
    echo   ERROR: Failed to seed database
    echo   Make sure MongoDB is running and connection string is correct
    pause
    exit /b 1
)

REM Install frontend dependencies
echo.
echo [5/5] Installing frontend dependencies...
cd ..\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo   ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Setup Complete! ✓
echo ========================================
echo.
echo   Next steps:
echo   1. Open TWO terminals
echo   2. Terminal 1: cd backend    then    npm run dev
echo   3. Terminal 2: cd frontend   then    npm run dev
echo   4. Open browser: http://localhost:5173
echo.
echo   Backend API: http://localhost:5000
echo   Frontend:    http://localhost:5173
echo.
pause
