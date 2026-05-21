import sqlite3
import re
import os

DB_PATH = 'sklad.db'
DATA_FILE = 'data.js'

def init_db():
    print("Инициализация базы данных...")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Таблица пользователей (с ролями)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'employee'
        )
    ''')

    # Создадим администратора по умолчанию
    cursor.execute("SELECT * FROM users WHERE username = 'admin'")
    if not cursor.fetchone():
        # В реальной системе пароли должны быть хэшированы
        cursor.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", 
                       ("admin", "admin123", "admin"))
        print("Создан пользователь: admin / admin123")

    # Создадим тестового сотрудника
    cursor.execute("SELECT * FROM users WHERE username = 'manager'")
    if not cursor.fetchone():
        cursor.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", 
                       ("manager", "1234", "employee"))
        print("Создан пользователь: manager / 1234")

    # Таблица товаров
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            name TEXT NOT NULL,
            characteristics TEXT,
            width TEXT,
            height TEXT,
            quantity REAL DEFAULT 0,
            price REAL DEFAULT 0,
            total REAL DEFAULT 0,
            note TEXT,
            image TEXT
        )
    ''')

    # Таблица истории операций (приход / расход)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_id INTEGER,
            item_name TEXT,
            category TEXT,
            action TEXT NOT NULL,
            qty_change REAL NOT NULL,
            qty_after REAL,
            username TEXT,
            note TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Таблица заказов (для калькулятора)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_name TEXT,
            total_amount REAL,
            items_json TEXT, -- Список изделий в JSON
            services_json TEXT, -- Список услуг в JSON
            markup_rub REAL,
            markup_pct REAL,
            company TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Папка для загрузки файлов
    uploads_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
    if not os.path.exists(uploads_dir):
        os.makedirs(uploads_dir)
        print(f"Создана папка для загрузок: {uploads_dir}")
    
    # Проверяем, пустая ли таблица товаров
    cursor.execute("SELECT COUNT(*) FROM items")
    if cursor.fetchone()[0] == 0:
        print("Таблица товаров пуста. Начинаем перенос из data.js...")
        migrate_data_js(conn, cursor)
    else:
        print("Данные уже существуют в базе. Миграция пропущена.")

    conn.commit()
    conn.close()
    print("База данных готова!")

def migrate_data_js(conn, cursor):
    if not os.path.exists(DATA_FILE):
        print(f"Файл {DATA_FILE} не найден!")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Парсим JS объект RAW_DATA
    # Ищем все вхождения "Имя категории": `данные`
    matches = re.finditer(r'"([^"]+)":\s*`([^`]+)`', content)
    
    total_added = 0
    for match in matches:
        category = match.group(1).strip()
        csv_data = match.group(2).strip()
        lines = csv_data.split('\n')
        
        if not lines:
            continue
            
        headers = [h.strip() for h in lines[0].split(';')]
        
        for line in lines[1:]:
            parts = [p.strip() for p in line.split(';')]
            if len(parts) < 2 or not parts[0]:
                continue
                
            # Собираем данные безопасно
            try:
                name = parts[0]
                characteristics = parts[1] if len(parts) > 1 else ""
                width = parts[2] if len(parts) > 2 else ""
                height = parts[3] if len(parts) > 3 else ""
                
                # Парсим количество
                qty_str = parts[4].replace(',', '.').replace(' ', '') if len(parts) > 4 and parts[4] else "0"
                quantity = float(qty_str) if qty_str else 0.0
                
                # Парсим цену - берем из любой колонки, где она есть (позиция 5-6 в зависимости от файла)
                price_str = "0"
                total_str = "0"
                
                # Поиск колонок с ценой
                price = 0.0
                total = 0.0
                note = ""
                image = ""
                
                for i, header in enumerate(headers):
                    if i >= len(parts):
                        continue
                    val = parts[i].replace(',', '.').replace(' ', '')
                    if not val:
                        continue
                        
                    if 'Цена' in header:
                        price = float(val)
                    elif 'Стоимость' in header:
                        total = float(val)
                    elif 'Примечание' in header:
                        note = parts[i]
                    elif 'Фото' in header:
                        image = parts[i]

                if total == 0 and quantity > 0 and price > 0:
                    total = quantity * price

                cursor.execute('''
                    INSERT INTO items 
                    (category, name, characteristics, width, height, quantity, price, total, note, image)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (category, name, characteristics, width, height, quantity, price, total, note, image))
                total_added += 1
                
            except Exception as e:
                print(f"Ошибка при импорте строки: {line}. Ошибка: {e}")
                
    print(f"Успешно перенесено {total_added} позиций из старых файлов в чистую SQL базу.")

if __name__ == '__main__':
    init_db()
