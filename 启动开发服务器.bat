@echo off
cd /d "%~dp0"
chcp 65001 >nul 2>&1
title XiaoKa Portfolio - Dev Server

echo.
echo ========================================
echo   XiaoKa Portfolio - Quick Start
echo ========================================
echo.

echo [1/3] Checking Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js 16+ from https://nodejs.org/
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js: %NODE_VERSION%

echo [2/3] Checking npm...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm not found!
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm: v%NPM_VERSION%
echo.

echo [3/3] Checking dependencies...
if not exist "%~dp0node_modules" (
    echo [!] First run, installing dependencies...
    echo     (This may take 1-2 minutes)
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencies installed
) else (
    echo [OK] Dependencies ready
)
echo.

echo ========================================
echo   Starting dev server...
echo   URL: http://localhost:5173
echo ========================================
echo.

:: Open browser after 3 seconds
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:5173"

:: Start dev server
call npm run dev

pause
