@echo off
chcp 65001 >nul
cls

echo 🐕 桌面宠物 Electron 版 - 快速开始
echo ================================
echo.

REM 检查 Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ 检测不到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
echo ✅ Node.js 版本: %NODE_VER%

for /f "tokens=*" %%i in ('npm -v') do set NPM_VER=%%i
echo ✅ npm 版本: %NPM_VER%
echo.

REM 检查是否需要安装依赖
if not exist "node_modules" (
    echo 📦 安装依赖中...
    call npm install
    echo.
)

echo 选择操作:
echo 1 - 开发模式运行
echo 2 - 构建 Windows 版
echo 3 - 完整构建
echo 4 - 清除缓存并重启
echo.

set /p choice=请输入选项 (1-4): 

if "%choice%"=="1" (
    echo 🚀 启动开发模式...
    call npm start
) else if "%choice%"=="2" (
    echo 🔨 构建 Windows 版本中...
    call npm run electron-build -- --win
    echo ✅ 构建完成！文件在 dist 目录
    pause
) else if "%choice%"=="3" (
    echo 🔨 完整构建中...
    call npm run electron-build
    echo ✅ 构建完成！文件在 dist 目录
    pause
) else if "%choice%"=="4" (
    echo 🧹 清除缓存...
    rmdir /s /q node_modules
    call npm cache clean --force
    echo 📦 重新安装依赖...
    call npm install
    echo 🚀 启动开发模式...
    call npm start
) else (
    echo ❌ 无效选项
    pause
    exit /b 1
)

pause
