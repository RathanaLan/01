@echo off
title Chamroeun Nheat Saving Cooperative Web Control
echo ========================================================
echo   Chamroeun Nheat Saving Cooperative Web Control
echo   Digital Passbook & Wealth Simulator
echo ========================================================
echo.
echo Starting local web control server...
start http://localhost:3000
node server.js
pause

