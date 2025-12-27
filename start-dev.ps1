# GearGuard Development Servers Startup Script
Write-Host "Starting GearGuard Development Servers..." -ForegroundColor Green
Write-Host ""

# Start Backend Server
Write-Host "Starting Backend Server on http://localhost:5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host 'GearGuard Backend Server' -ForegroundColor Cyan; node server.js"

# Wait for backend to initialize
Start-Sleep -Seconds 3

# Start Frontend Server
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host 'GearGuard Frontend Server' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "✓ Backend: http://localhost:5000" -ForegroundColor Green
Write-Host "✓ Frontend: http://localhost:3000 (or next available port)" -ForegroundColor Green
Write-Host ""
Write-Host "Both servers are running in separate windows." -ForegroundColor Cyan
Write-Host "Close those windows to stop the servers." -ForegroundColor Cyan
