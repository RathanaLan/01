@echo off
REM ------------------------------------------------------------------
REM StockFlow Pro - Stock-Control Management System Startup Script
REM ------------------------------------------------------------------

echo ===================================================
echo Starting StockFlow Pro Management Suite...
echo ===================================================

REM 1. Ensure .env exists in backend
if not exist "backend\.env" (
    echo Initializing backend .env configuration...
    copy backend\.env.example backend\.env >nul
)

REM 2. Run Prisma migrations if needed
pushd backend
echo Verifying SQLite database status...
call npx prisma migrate deploy >nul 2>&1
popd

REM 3. Launch Backend Server in dedicated window
echo Launching Backend API (Port 4000)...
start "StockFlow Backend API" cmd /k "cd /d "%~dp0backend" && npx ts-node src/index.ts"

REM 4. Launch Frontend UI with --host
echo Launching Frontend Development Server (Port 5173)...
start "StockFlow Frontend UI" cmd /k "cd /d "%~dp0" && npx vite --host"

echo ===================================================
echo StockFlow Pro is live!
echo Web Portal: http://localhost:5173
echo API Server: http://localhost:4000
echo ===================================================
pause
