@echo off
title 5M1E Quality Suite & DNKH Server (Port 3000)
cd /d "%~dp0"
echo ====================================================================
echo Starting Local Web Server on http://localhost:3000 ...
echo ====================================================================
echo.
echo 1. Keep this console window OPEN while working with Google OAuth and the app.
echo 2. Opening http://localhost:3000/5m1e-tracker/index.html in your browser...
echo.
echo To STOP the server, close this window.
echo ====================================================================
echo.
start "" "http://localhost:3000/5m1e-tracker/index.html"
python -m http.server 3000
if %ERRORLEVEL% NEQ 0 (
  echo Python command not found, falling back to Node.js...
  npx --yes serve -p 3000 .
)
pause
