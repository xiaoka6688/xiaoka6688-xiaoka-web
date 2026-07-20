@echo off
cd /d "%~dp0"
chcp 65001 >nul 2>&1
title XiaoKa Portfolio - Build

echo.
echo ========================================
echo   XiaoKa Portfolio - Build Production
echo ========================================
echo.

echo [1/2] Checking Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found!
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js: %NODE_VERSION%
echo.

if not exist "%~dp0node_modules" (
    echo [!] Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo [2/2] Building production...
echo.
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Build complete!
echo   Output: dist/
echo ========================================
echo.

set /p PREVIEW="Start preview server? (Y/N): "
if /i "%PREVIEW%"=="Y" (
    echo.
    echo Starting preview server...
    echo URL: http://localhost:4173
    echo.
    start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:4173"
    call npm run preview
)

pause
