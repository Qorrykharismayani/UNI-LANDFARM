-- Database Schema untuk Sistem Pembayaran Token UNI-LandFarm

CREATE DATABASE IF NOT EXISTS unilandfarm_db;
USE unilandfarm_db;

-- Tabel Users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    token_balance INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Token Packages (Daftar paket token yang tersedia)
CREATE TABLE IF NOT EXISTS token_packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    tokens INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    is_popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert beberapa paket token awal
INSERT INTO token_packages (name, tokens, price, description, is_popular) VALUES
('Starter Pack', 50, 25000.00, 'Cukup untuk mencoba 1-2 template premium.', FALSE),
('Basic Pack', 100, 50000.00, 'Pilihan terbaik untuk bisnis kecil.', TRUE),
('Pro Pack', 250, 100000.00, 'Hemat 20% untuk agensi atau retail.', FALSE),
('Ultimate Pack', 1000, 350000.00, 'Token tak terbatas untuk kebutuhan besar.', FALSE);

-- Tabel Transactions (Riwayat pembayaran user)
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    package_id INT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    tokens_added INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status ENUM('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES token_packages(id) ON DELETE SET NULL
);
