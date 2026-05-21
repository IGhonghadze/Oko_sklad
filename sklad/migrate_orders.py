import sqlite3
import os

DB_PATH = 'sklad.db'

def run_migration():
    print("Running manual migration...")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Add orders table if not exists
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_name TEXT,
            total_amount REAL,
            items_json TEXT,
            services_json TEXT,
            markup_rub REAL,
            markup_pct REAL,
            company TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()
    print("Migration complete!")

if __name__ == '__main__':
    run_migration()
