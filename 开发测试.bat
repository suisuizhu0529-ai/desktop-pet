@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "PATH=C:\Users\11375\.workbuddy\binaries\node\versions\22.22.2;%PATH%"
echo Starting DeskPet...
npx electron .
pause
