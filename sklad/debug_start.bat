@echo off
chcp 65001 >nul
echo Выполняется поиск Python...
set "PYTHON_EXE="

for /f "delims=" %%I in ('where python 2^>nul') do (
    set "PYTHON_EXE=%%I"
    goto :found_python
)

:found_python
if not defined PYTHON_EXE (
    echo Python не найден в переменной PATH.
    echo Пытаемся запустить через псевдоним магазина Windows...
    python -c "print('Python работает!')" >nul 2>&1
    if %errorlevel% neq 0 (
        echo ОШИБКА: Python не отвечает. 
        pause
        exit /b
    )
    set "PYTHON_EXE=python"
)

echo Python найден по пути: %PYTHON_EXE%
echo.
echo Установка Flask...
"%PYTHON_EXE%" -m pip install flask > pip_log.txt 2>&1

echo.
echo Запуск сервера...
"%PYTHON_EXE%" app.py > server_log.txt 2>&1

echo Сервер остановился. Лог сохранен в server_log.txt
pause
