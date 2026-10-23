<?php
// import.php
// Этот скрипт автоматически создаст нужные таблицы и перенесет ваши данные.
// После успешного выполнения его можно удалить.

header('Content-Type: text/html; charset=utf-8');

$host = 'localhost';
$db   = 'w98834km_oko';
$user = 'w98834km_oko';
$pass = '2008Larik1997.';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    echo "<p>✅ Подключение к базе данных успешно.</p>";
} catch (\PDOException $e) {
    die("❌ Ошибка подключения к базе: " . $e->getMessage());
}

// 1. Создаем таблицы
try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `items` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `category` VARCHAR(255) NOT NULL,
            `name` VARCHAR(255) NOT NULL,
            `characteristics` TEXT,
            `width` VARCHAR(50),
            `height` VARCHAR(50),
            `length` VARCHAR(50),
            `quantity` FLOAT NOT NULL DEFAULT 0,
            `price` FLOAT NOT NULL DEFAULT 0,
            `total` FLOAT NOT NULL DEFAULT 0,
            `note` TEXT,
            `image` VARCHAR(255),
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `transactions` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `item_name` VARCHAR(255) NOT NULL,
            `category` VARCHAR(255),
            `action` VARCHAR(50) NOT NULL,
            `qty_change` FLOAT NOT NULL,
            `qty_after` FLOAT NOT NULL,
            `username` VARCHAR(50),
            `note` TEXT,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "<p>✅ Таблицы созданы или уже существуют.</p>";
} catch (\PDOException $e) {
    die("❌ Ошибка создания таблиц: " . $e->getMessage());
}

// 2. Импорт данных
$jsonFile = 'db_export.json';
if (!file_exists($jsonFile)) {
    die("❌ Файл $jsonFile не найден! Пожалуйста, убедитесь, что вы загрузили его на сервер.");
}

$json = file_get_contents($jsonFile);
$data = json_decode($json, true);

if (!is_array($data)) {
    die("❌ Ошибка чтения JSON данных. Возможно, файл поврежден.");
}

$count = 0;
foreach ($data as $item) {
    $category = $item['_category'] ?? $item['category'] ?? 'Общая';
    $name = $item['Наименование '] ?? $item['Наименование'] ?? $item['name'] ?? '';
    $characteristics = $item['Характеристики'] ?? $item['characteristics'] ?? '';
    
    $width = (string)($item['Ширина'] ?? $item['width'] ?? '');
    $length = (string)($item['Длина/Высота'] ?? $item['Высота'] ?? $item['length'] ?? $item['height'] ?? '');
    $height = (string)($item['Высота'] ?? $item['height'] ?? '');
    
    $quantity = (float)($item['_qty'] ?? $item['quantity'] ?? 0);
    $price = (float)($item['_price'] ?? $item['price'] ?? 0);
    $note = $item['Примечание'] ?? $item['Заметки'] ?? $item['note'] ?? '';
    $total = (float)($item['_total'] ?? $item['total'] ?? 0);
    $image = $item['Фото'] ?? $item['image'] ?? '';

    $stmt = $pdo->prepare('INSERT INTO items (category, name, characteristics, width, height, length, quantity, price, total, note, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$category, $name, $characteristics, $width, $height, $length, $quantity, $price, $total, $note, $image]);
    $count++;
}

echo "<h1>🎉 Установка и Миграция завершена!</h1>";
echo "<p>Успешно импортировано товаров: $count</p>";
echo "<p><strong>Важно:</strong> Зайдите в файловый менеджер Beget и удалите файлы <code>import.php</code> и <code>db_export.json</code> в целях безопасности.</p>";
echo "<p><a href='index.html'>Перейти в Склад</a></p>";
?>
