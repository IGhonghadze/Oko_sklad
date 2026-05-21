from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_from_directory
import sqlite3
import os
import uuid
from werkzeug.utils import secure_filename
import database  # Импортируем наш скрипт миграции

# Настраиваем Flask так, чтобы он брал файлы прямо из текущей папки
app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')
app.secret_key = 'oko_secret_key_123'
DB_PATH = 'sklad.db'
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_db():
    conn = sqlite3.connect(os.path.join(os.path.dirname(os.path.abspath(__file__)), DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn

def log_transaction(cursor, item_id, item_name, category, action, qty_change, qty_after, note=''):
    """Записывает операцию в журнал"""
    username = session.get('username', 'system')
    cursor.execute('''
        INSERT INTO transactions (item_id, item_name, category, action, qty_change, qty_after, username, note)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (item_id, item_name, category, action, qty_change, qty_after, username, note))

# Инициализация БД при запуске на сервере
try:
    print("Инициализация базы данных Склада...")
    database.init_db()
except Exception as e:
    print(f"Ошибка БД Склада: {e}")

@app.route('/')
def index():
    return render_template('index.html')

# --- ITEMS API ---

@app.route('/api/items', methods=['GET'])
def get_items():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authorized'}), 401
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM items")
    rows = cursor.fetchall()
    
    items = []
    for r in rows:
        items.append(dict(r))
        
    conn.close()
    return jsonify(items)

@app.route('/api/items', methods=['POST'])
def add_item():
    if 'user_id' not in session or session.get('role') != 'admin':
        return jsonify({'success': False, 'message': 'Not authorized'}), 403
        
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    
    total = data.get('price', 0) * data.get('quantity', 0)
    
    try:
        cursor.execute('''
            INSERT INTO items (category, name, characteristics, width, height, quantity, price, total, note, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('category', 'Общая'),
            data.get('name', ''),
            data.get('characteristics', ''),
            data.get('width', ''),
            data.get('length', ''),
            data.get('quantity', 0),
            data.get('price', 0),
            total,
            data.get('notes', ''),
            data.get('image', '')
        ))
        conn.commit()
        item_id = cursor.lastrowid
        
        # Логируем добавление
        log_transaction(cursor, item_id, data.get('name', ''), data.get('category', 'Общая'),
                       'add', data.get('quantity', 0), data.get('quantity', 0), 'Новый товар')
        conn.commit()
        
        conn.close()
        return jsonify({'success': True, 'id': item_id})
    except Exception as e:
        conn.close()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    if 'user_id' not in session or session.get('role') != 'admin':
        return jsonify({'success': False, 'message': 'Not authorized'}), 403
        
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    
    # Получаем старые данные для логирования
    cursor.execute("SELECT * FROM items WHERE id = ?", (item_id,))
    old_item = cursor.fetchone()
    old_qty = old_item['quantity'] if old_item else 0
    
    new_qty = data.get('quantity', 0)
    total = data.get('price', 0) * new_qty
    
    try:
        cursor.execute('''
            UPDATE items SET 
                category = ?, name = ?, characteristics = ?, width = ?, height = ?, 
                quantity = ?, price = ?, total = ?, note = ?, image = ?
            WHERE id = ?
        ''', (
            data.get('category', 'Общая'),
            data.get('name', ''),
            data.get('characteristics', ''),
            data.get('width', ''),
            data.get('length', ''),
            new_qty,
            data.get('price', 0),
            total,
            data.get('notes', ''),
            data.get('image', old_item['image']),
            item_id
        ))
        
        # Логируем изменение количества
        qty_diff = new_qty - old_qty
        if qty_diff != 0:
            action = 'income' if qty_diff > 0 else 'outcome'
            log_transaction(cursor, item_id, data.get('name', ''), data.get('category', ''),
                          action, qty_diff, new_qty, data.get('notes', ''))
        
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        conn.close()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    if 'user_id' not in session or session.get('role') != 'admin':
        return jsonify({'success': False, 'message': 'Not authorized'}), 403
        
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        # Получаем данные перед удалением
        cursor.execute("SELECT * FROM items WHERE id = ?", (item_id,))
        item = cursor.fetchone()
        
        cursor.execute("DELETE FROM items WHERE id = ?", (item_id,))
        
        # Логируем удаление
        if item:
            log_transaction(cursor, item_id, item['name'], item['category'],
                          'delete', -item['quantity'], 0, 'Удалён со склада')
        
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        conn.close()
        return jsonify({'success': False, 'message': str(e)}), 500

# --- HISTORY API ---

@app.route('/api/history', methods=['GET'])
def get_history():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authorized'}), 401
    
    limit = request.args.get('limit', 100, type=int)
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM transactions ORDER BY created_at DESC LIMIT ?", (limit,))
    rows = cursor.fetchall()
    
    history = []
    for r in rows:
        history.append(dict(r))
    
    conn.close()
    return jsonify(history)

# --- ORDERS API (Calculator) ---

@app.route('/api/orders', methods=['GET'])
def get_orders():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authorized'}), 401
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders ORDER BY created_at DESC")
    rows = cursor.fetchall()
    
    orders = []
    for r in rows:
        orders.append(dict(r))
        
    conn.close()
    return jsonify(orders)

@app.route('/api/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not authorized'}), 401
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = ?", (order_id,))
    order = cursor.fetchone()
    conn.close()
    
    if order:
        return jsonify(dict(order))
    return jsonify({'success': False, 'message': 'Заказ не найден'}), 404

@app.route('/api/orders', methods=['POST'])
def add_order():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Not authorized'}), 401
        
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        import json
        cursor.execute('''
            INSERT INTO orders 
            (client_name, total_amount, items_json, services_json, markup_rub, markup_pct, company)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('client_name', 'Новый заказ'),
            data.get('total_amount', 0),
            json.dumps(data.get('items', [])),
            json.dumps(data.get('services', [])),
            data.get('markup_rub', 0),
            data.get('markup_pct', 0),
            data.get('company', 'daneliya')
        ))
        conn.commit()
        order_id = cursor.lastrowid
        conn.close()
        return jsonify({'success': True, 'id': order_id})
    except Exception as e:
        conn.close()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Not authorized'}), 401
        
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        import json
        cursor.execute('''
            UPDATE orders SET 
                client_name = ?, total_amount = ?, items_json = ?, services_json = ?, 
                markup_rub = ?, markup_pct = ?, company = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (
            data.get('client_name', 'Заказ'),
            data.get('total_amount', 0),
            json.dumps(data.get('items', [])),
            json.dumps(data.get('services', [])),
            data.get('markup_rub', 0),
            data.get('markup_pct', 0),
            data.get('company', 'daneliya'),
            order_id
        ))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        conn.close()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Not authorized'}), 401
        
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute("DELETE FROM orders WHERE id = ?", (order_id,))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        conn.close()
        return jsonify({'success': False, 'message': str(e)}), 500

# --- FILE UPLOAD API ---

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Not authorized'}), 401
    
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'Файл не выбран'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'message': 'Пустое имя файла'}), 400
    
    if file and allowed_file(file.filename):
        ext = file.filename.rsplit('.', 1)[1].lower()
        filename = f"{uuid.uuid4().hex}.{ext}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        # Если передан item_id — привязываем к товару
        item_id = request.form.get('item_id')
        if item_id:
            conn = get_db()
            cursor = conn.cursor()
            cursor.execute("UPDATE items SET image = ? WHERE id = ?", (f"uploads/{filename}", int(item_id)))
            conn.commit()
            conn.close()
        
        return jsonify({'success': True, 'path': f"uploads/{filename}"})
    
    return jsonify({'success': False, 'message': 'Недопустимый формат файла'}), 400

@app.route('/uploads/<path:filename>')
def serve_upload(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# --- AUTH API ---

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        session['user_id'] = user['id']
        session['username'] = user['username']
        session['role'] = user['role']
        return jsonify({'success': True, 'role': user['role'], 'username': user['username']})
    else:
        return jsonify({'success': False, 'message': 'Неверный логин или пароль'})

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True})

@app.route('/api/auth/me', methods=['GET'])
def me():
    if 'user_id' in session:
        return jsonify({
            'authenticated': True,
            'username': session.get('username'),
            'role': session.get('role')
        })
    return jsonify({'authenticated': False})

# --- CALCULATOR (OKO) ---

@app.route('/calculator')
def calculator():
    if 'user_id' not in session:
        return redirect('/')
    return send_from_directory('static/oko', 'index.html')

if __name__ == '__main__':
    # Автоматически создаем базу данных и переносим старые данные при первом запуске
    print("Проверка базы данных...")
    database.init_db()
    
    print("\n" + "="*50)
    print("   СЕРВЕР СКЛАДА ЗАПУЩЕН!")
    print("   Откройте в браузере: http://localhost:5000")
    print("="*50 + "\n")
    app.run(host='0.0.0.0', port=5000, debug=True)
