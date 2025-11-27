/**
 * Veritabanı Şeması
 * 
 * Bu dosya, uygulama için gerekli veritabanı tablolarını oluşturur.
 * 
 * Kullanım:
 * 1. MySQL'de yeni bir veritabanı oluşturun
 * 2. Bu SQL dosyasını çalıştırın
 * 3. .env dosyasında veritabanı bilgilerini güncelleyin
 */

-- Veritabanı oluştur (eğer yoksa)
CREATE DATABASE IF NOT EXISTS mvc_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE mvc_app;

-- Kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ürünler tablosu
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Örnek veri ekle (isteğe bağlı)
INSERT INTO users (name, email, password) VALUES
('Ahmet Yılmaz', 'ahmet@example.com', 'password123'),
('Ayşe Demir', 'ayse@example.com', 'password123'),
('Mehmet Kaya', 'mehmet@example.com', 'password123');

-- Örnek ürün verileri
INSERT INTO products (name, description, price, stock, user_id) VALUES
('Laptop', 'Yüksek performanslı laptop', 15000.00, 10, 1),
('Mouse', 'Kablosuz mouse', 250.00, 50, 1),
('Klavye', 'Mekanik klavye', 800.00, 30, 2),
('Monitör', '27 inç 4K monitör', 5000.00, 5, 2);

-- Tabloları kontrol et
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM products;

