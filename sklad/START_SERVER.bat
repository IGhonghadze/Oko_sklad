@echo off
echo Starting Oko Sklad...
python -m pip install flask Werkzeug
echo.
echo Please do not close this window while using the application.
echo.
echo Opening browser...
start "" http://localhost:5000
python app.py
pause
