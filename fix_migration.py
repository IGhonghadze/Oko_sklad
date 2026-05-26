import json

with open('db_export.json', 'r', encoding='utf-8') as f:
    data_str = f.read()

html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Миграция Базы Данных</title>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
</head>
<body style="font-family: sans-serif; padding: 20px;">
    <h2>Миграция данных в Firebase...</h2>
    <div id="status">Читаю данные...</div>
    <script>
        const data = {data_str};
        
        const total = data.length;
        document.getElementById('status').innerText = `Найдено ${{total}} товаров. Загружаю...`;
        
        let count = 0;
        let promises = [];
        
        data.forEach(item => {{
            const firestoreItem = {{
                category: item._category || item.category || 'Общая',
                name: item['Наименование '] || item['Наименование'] || item.name || '',
                characteristics: item['Характеристики'] || item.characteristics || '',
                width: String(item['Ширина'] || item.width || ''),
                length: String(item['Длина/Высота'] || item['Высота'] || item.length || item.height || ''),
                height: String(item['Высота'] || item.height || ''),
                quantity: parseFloat(item._qty || item.quantity || 0),
                price: parseFloat(item._price || item.price || 0),
                note: item['Примечание'] || item['Заметки'] || item.note || '',
                total: parseFloat(item._total || item.total || 0),
                image: item['Фото'] || item.image || ''
            }};
            
            let p = db.collection('items').add(firestoreItem).then(() => {{
                count++;
                document.getElementById('status').innerText = `Загружено ${{count}} из ${{total}}`;
            }});
            promises.push(p);
        }});
        
        Promise.all(promises).then(() => {{
            document.getElementById('status').innerText = '🎉 Миграция успешно завершена! Можете закрыть это окно и открыть основной сайт.';
        }}).catch(err => {{
            document.getElementById('status').innerText = '❌ Ошибка миграции: ' + err;
        }});
    </script>
</body>
</html>
"""

with open('migration.html', 'w', encoding='utf-8') as f:
    f.write(html)
