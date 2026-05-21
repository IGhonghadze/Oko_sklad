# Инструкция по деплою Oko Склад

Для того чтобы приложение работало 24/7 и было доступно с телефона, его нужно развернуть на хостинге (VPS/VDS).

## Вариант 1: Использование вашего хостинга (Reg.ru / Hostland)

Если у вас есть доступ по SSH (Linux Ubuntu), выполните следующие шаги:

1. **Загрузите файлы** на сервер в папку `/var/www/sklad`.
2. **Установите зависимости**:
   ```bash
   sudo apt update
   sudo apt install python3-pip python3-venv nginx
   cd /var/www/sklad
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt gunicorn
   ```
3. **Настройте Gunicorn** (Systemd сервис):
   Создайте файл `/etc/systemd/system/sklad.service`:
   ```ini
   [Unit]
   Description=Gunicorn instance to serve Oko Sklad
   After=network.target

   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/var/www/sklad
   Environment="PATH=/var/www/sklad/venv/bin"
   ExecStart=/var/www/sklad/venv/bin/gunicorn --workers 3 --bind unix:sklad.sock -m 007 wsgi:app

   [Install]
   WantedBy=multi-user.target
   ```
4. **Настройте Nginx**:
   Создайте конфиг `/etc/nginx/sites-available/sklad`:
   ```nginx
   server {
       listen 80;
       server_name sklad.vash-domen.ru;

       location / {
           include proxy_params;
           proxy_pass http://unix:/var/www/sklad/sklad.sock;
       }
   }
   ```
5. **Запустите**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/sklad /etc/nginx/sites-enabled
   sudo systemctl start sklad
   sudo systemctl enable sklad
   sudo systemctl restart nginx
   ```

## Вариант 2: Простой деплой на PythonAnywhere (Рекомендуется)

Если вы не хотите настраивать сервер вручную:
1. Зарегистрируйтесь на [PythonAnywhere](https://www.pythonanywhere.com/).
2. Загрузите файлы через Files или GitHub.
3. Вкладка **Web**:
   - Source code: путь к папке.
   - Working directory: путь к папке.
   - WSGI configuration file: укажите `from app import app as application`.
4. Нажмите **Reload** и сайт готов!

## Как установить как приложение на телефон
1. Откройте сайт в Chrome (Android) или Safari (iOS).
2. Нажмите **кнопку меню** (три точки) или «Поделиться».
3. Выберите **«Добавить на главный экран»**.
4. Теперь у вас есть иконка «Oko Склад» на рабочем столе!
