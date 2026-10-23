<?php
// api.php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Настройки базы данных Beget
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
} catch (\PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
    exit;
}

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'getItems') {
        $stmt = $pdo->query('SELECT * FROM items ORDER BY created_at DESC');
        $items = $stmt->fetchAll();
        // Convert numbers
        foreach ($items as &$item) {
            $item['id'] = (string)$item['id'];
            $item['color'] = $item['color'] ?? '';
            $item['quantity'] = (float)$item['quantity'];
            $item['price'] = (float)$item['price'];
            $item['total'] = (float)$item['total'];
        }
        echo json_encode($items);
    } elseif ($action === 'getTransactions') {
        $stmt = $pdo->query('SELECT * FROM transactions ORDER BY created_at DESC LIMIT 100');
        $tx = $stmt->fetchAll();
        echo json_encode($tx);
    } elseif ($action === 'getCategories') {
        $stmt = $pdo->query('SELECT name FROM categories ORDER BY name ASC');
        $cats = $stmt->fetchAll(PDO::FETCH_COLUMN);
        echo json_encode($cats);
    } else {
        echo json_encode(['error' => 'Unknown action']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'addItem' || $action === 'updateItem') {
        // Handle form data (including file upload)
        $id = $_POST['id'] ?? null;
        $category = $_POST['category'] ?? '';
        $name = $_POST['name'] ?? '';
        $characteristics = $_POST['characteristics'] ?? '';
        $color = $_POST['color'] ?? '';
        $width = $_POST['width'] ?? '';
        $height = $_POST['height'] ?? '';
        $length = $_POST['length'] ?? '';
        $quantity = isset($_POST['quantity']) ? (float)$_POST['quantity'] : 0;
        $price = isset($_POST['price']) ? (float)$_POST['price'] : 0;
        $total = isset($_POST['total']) ? (float)$_POST['total'] : 0;
        $note = $_POST['note'] ?? '';
        
        // Handle image
        $imagePath = $_POST['image'] ?? ''; // Existing image path
        if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = 'uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
            $filename = time() . '_' . basename($_FILES['image_file']['name']);
            $targetPath = $uploadDir . $filename;
            if (move_uploaded_file($_FILES['image_file']['tmp_name'], $targetPath)) {
                $imagePath = $targetPath;
            }
        }

        // Ensure category is in categories table
        if (!empty($category)) {
            $catStmt = $pdo->prepare('INSERT IGNORE INTO categories (name) VALUES (?)');
            $catStmt->execute([$category]);
        }

        if ($action === 'addItem') {
            $stmt = $pdo->prepare('INSERT INTO items (category, name, characteristics, color, width, height, length, quantity, price, total, note, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([$category, $name, $characteristics, $color, $width, $height, $length, $quantity, $price, $total, $note, $imagePath]);
            $newId = $pdo->lastInsertId();
            echo json_encode(['success' => true, 'id' => (string)$newId]);
        } else {
            // updateItem
            $stmt = $pdo->prepare('UPDATE items SET category=?, name=?, characteristics=?, color=?, width=?, height=?, length=?, quantity=?, price=?, total=?, note=?, image=? WHERE id=?');
            $stmt->execute([$category, $name, $characteristics, $color, $width, $height, $length, $quantity, $price, $total, $note, $imagePath, $id]);
            echo json_encode(['success' => true]);
        }
    } elseif ($action === 'deleteItem') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) $input = $_POST;
        $ids = [];
        if (!empty($input['ids']) && is_array($input['ids'])) {
            $ids = array_map('strval', $input['ids']);
        } elseif (!empty($input['id'])) {
            $ids = [(string)$input['id']];
        }

        if (!empty($ids)) {
            $placeholders = str_repeat('?,', count($ids) - 1) . '?';
            $stmt = $pdo->prepare("SELECT id, name, category, quantity FROM items WHERE id IN ($placeholders)");
            $stmt->execute($ids);
            $deleted = $stmt->fetchAll();

            $delStmt = $pdo->prepare("DELETE FROM items WHERE id IN ($placeholders)");
            $delStmt->execute($ids);

            $username = $input['username'] ?? 'Администратор';
            foreach ($deleted as $d) {
                $tx = $pdo->prepare('INSERT INTO transactions (item_name, category, action, qty_change, qty_after, username, note) VALUES (?, ?, "delete", ?, 0, ?, "Удаление")');
                $tx->execute([$d['name'], $d['category'], -(float)$d['quantity'], $username]);
            }
            echo json_encode(['success' => true, 'count' => count($deleted)]);
        } else {
            echo json_encode(['error' => 'No ID provided']);
        }
    } elseif ($action === 'bulkMoveCategory') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) $input = $_POST;
        $ids = $input['ids'] ?? [];
        $newCategory = trim($input['category'] ?? '');
        $username = $input['username'] ?? 'Администратор';

        if (!empty($ids) && is_array($ids) && $newCategory !== '') {
            $placeholders = str_repeat('?,', count($ids) - 1) . '?';
            $stmt = $pdo->prepare("UPDATE items SET category = ? WHERE id IN ($placeholders)");
            $params = array_merge([$newCategory], $ids);
            $stmt->execute($params);

            $tx = $pdo->prepare('INSERT INTO transactions (item_name, category, action, qty_change, qty_after, username, note) VALUES (?, ?, "add", 0, 0, ?, ?)');
            $tx->execute(['Перемещение (' . count($ids) . ' поз.)', $newCategory, $username, 'Перемещено в: ' . $newCategory]);

            echo json_encode(['success' => true, 'count' => count($ids)]);
        } else {
            echo json_encode(['error' => 'Invalid parameters']);
        }
    } elseif ($action === 'bulkWriteOff') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) $input = $_POST;
        $ids = $input['ids'] ?? [];
        $qty = (float)($input['qty'] ?? 0);
        $note = trim($input['note'] ?? 'Массовое списание');
        $username = $input['username'] ?? 'Администратор';

        if (!empty($ids) && is_array($ids) && $qty > 0) {
            $placeholders = str_repeat('?,', count($ids) - 1) . '?';
            $stmt = $pdo->prepare("SELECT id, name, category, quantity, price FROM items WHERE id IN ($placeholders)");
            $stmt->execute($ids);
            $items = $stmt->fetchAll();

            foreach ($items as $it) {
                $currentQty = (float)$it['quantity'];
                $deduct = min($currentQty, $qty);
                $newQty = max(0, $currentQty - $qty);
                $newTotal = $newQty * (float)$it['price'];

                $upd = $pdo->prepare("UPDATE items SET quantity = ?, total = ? WHERE id = ?");
                $upd->execute([$newQty, $newTotal, $it['id']]);

                $tx = $pdo->prepare('INSERT INTO transactions (item_name, category, action, qty_change, qty_after, username, note) VALUES (?, ?, "writeoff", ?, ?, ?, ?)');
                $tx->execute([$it['name'], $it['category'], -$deduct, $newQty, $username, $note]);
            }
            echo json_encode(['success' => true, 'count' => count($items)]);
        } else {
            echo json_encode(['error' => 'Invalid parameters']);
        }
    } elseif ($action === 'addTransaction') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) $input = $_POST;
        
        $item_name = $input['item_name'] ?? '';
        $category = $input['category'] ?? '';
        $action_type = $input['action'] ?? '';
        $qty_change = isset($input['qty_change']) ? (float)$input['qty_change'] : 0;
        $qty_after = isset($input['qty_after']) ? (float)$input['qty_after'] : 0;
        $username = $input['username'] ?? 'Админ';
        $note = $input['note'] ?? '';
        
        $stmt = $pdo->prepare('INSERT INTO transactions (item_name, category, action, qty_change, qty_after, username, note) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([$item_name, $category, $action_type, $qty_change, $qty_after, $username, $note]);
        echo json_encode(['success' => true]);
    } elseif ($action === 'addCategory') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) $input = $_POST;
        $catName = trim($input['name'] ?? '');
        if (!empty($catName)) {
            $stmt = $pdo->prepare('INSERT IGNORE INTO categories (name) VALUES (?)');
            $stmt->execute([$catName]);
            echo json_encode(['success' => true, 'name' => $catName]);
        } else {
            echo json_encode(['error' => 'Category name cannot be empty']);
        }
    } elseif ($action === 'login') {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);
        if (!$data) $data = $_POST;

        $login = trim($data['login'] ?? '');
        $password = (string)($data['password'] ?? '');

        if ($login === '' && $password === '') {
            echo json_encode(['success' => false, 'error' => 'Заполните логин и пароль']);
            exit;
        }

        // 1. Быстрый мастер-пин / админ доступ
        if (($login === 'admin' && ($password === '474747' || $password === '47474' || $password === 'admin')) || ($password === '474747' || $password === '47474')) {
            echo json_encode([
                'success' => true,
                'user' => [
                    'id' => 1,
                    'role' => 'admin',
                    'name' => 'Администратор'
                ]
            ]);
            exit;
        }

        // 2. Проверка по таблице karta_users
        try {
            $stmt = $pdo->prepare("SELECT id, username, password_hash, role, name FROM karta_users WHERE username = ?");
            $stmt->execute([$login]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                $role = ($user['role'] === 'director' || $user['role'] === 'admin') ? 'admin' : 'employee';
                echo json_encode([
                    'success' => true,
                    'user' => [
                        'id' => (int)$user['id'],
                        'role' => $role,
                        'name' => $user['name']
                    ]
                ]);
                exit;
            }
        } catch (\Exception $e) {
            // Игнорируем ошибку, если таблицы нет
        }

        // 3. Проверка по таблице users
        try {
            $stmt2 = $pdo->prepare("SELECT id, username, password_hash, role, name FROM users WHERE username = ?");
            $stmt2->execute([$login]);
            $user2 = $stmt2->fetch();

            if ($user2 && password_verify($password, $user2['password_hash'])) {
                $role = ($user2['role'] === 'director' || $user2['role'] === 'admin') ? 'admin' : 'employee';
                echo json_encode([
                    'success' => true,
                    'user' => [
                        'id' => (int)$user2['id'],
                        'role' => $role,
                        'name' => $user2['name']
                    ]
                ]);
                exit;
            }
        } catch (\Exception $e) {
            // Игнорируем ошибку
        }

        echo json_encode(['success' => false, 'error' => 'Неверный логин или пароль']);
        exit;
    } else {
        echo json_encode(['error' => 'Unknown action']);
    }
}
?>
