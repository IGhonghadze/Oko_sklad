# Инструкция по деплою (Sklad + Oko) на VPS

Эта инструкция поможет вам запустить объединенное приложение на сервере (например, Timeweb, Reg.ru или любой Ubuntu VPS).

## 1. Подготовка сервера
Зайдите на сервер по SSH и выполните:
```bash
sudo apt update
sudo apt install python3-pip python3-venv nginx git -y
```

## 2. Копирование файлов
Создайте папку проекта и перенесите туда файлы из папки `sklad`:
```bash
mkdir /var/www/sklad_app
cd /var/www/sklad_app
# (Загрузите сюда файлы через SCP, SFTP или Git)
```

## 3. Настройка окружения
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
```

## 4. Настройка Gunicorn (Автозапуск)
Создайте файл сервиса: `sudo nano /etc/systemd/system/sklad.service`
```ini
[Unit]
Description=Gunicorn instance to serve Sklad App
After=network.target

[Service]
User=root
Group=www-data
WorkingDirectory=/var/www/sklad_app
Environment="PATH=/var/www/sklad_app/venv/bin"
ExecStart=/var/www/sklad_app/venv/bin/gunicorn --workers 3 --bind unix:sklad.sock -m 007 wsgi:app

[Install]
WantedBy=multi-user.target
```
Запустите его:
```bash
sudo systemctl start sklad
sudo systemctl enable sklad
```

## 5. Настройка Nginx
Создайте конфиг: `sudo nano /etc/nginx/sites-available/sklad`
```nginx
server {
    listen 80;
    server_name vash-domen.ru; # Укажите ваш домен или IP

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/sklad_app/sklad.sock;
    }

    location /static {
        alias /var/www/sklad_app/static;
    }

    location /uploads {
        alias /var/www/sklad_app/uploads;
    }
}
```
Активируйте и перезапустите:
```bash
sudo ln -s /etc/nginx/sites-available/sklad /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

## 6. SSL (HTTPS) — Обязательно
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d vash-domen.ru
```

---
**Готово!** Теперь ваше приложение доступно по адресу вашего домена.
- Склад: `https://vash-domen.ru`
- Калькулятор: `https://vash-domen.ru/calculator`
