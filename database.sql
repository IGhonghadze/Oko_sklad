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

CREATE TABLE IF NOT EXISTS karta_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    
ole ENUM('director', 'worker') NOT NULL,
    
ame VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
