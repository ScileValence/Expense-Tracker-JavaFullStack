-- expense-tracker v1.1 schema (MySQL)
CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

CREATE TABLE IF NOT EXISTS categories (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS expenses (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  amount DOUBLE,
  description VARCHAR(255),
  date DATE,
  category_id BIGINT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS budgets (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  month VARCHAR(20) NOT NULL,
  limit_amount DOUBLE
);

-- Create the categories table
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    UNIQUE KEY ux_categories_name (name)
);

-- Insert default categories only if they don't already exist
INSERT INTO categories (name)
VALUES 
('Food'),
('Rent'),
('Utilities'),
('Entertainment'),
('Other')
ON DUPLICATE KEY UPDATE name = name;

-- Remove exact duplicates, keeping only the lowest ID per name
DELETE c1
FROM categories c1
INNER JOIN categories c2
  ON c1.name = c2.name
 AND c1.id > c2.id;

-- Add a unique constraint so it NEVER happens again
ALTER TABLE categories
ADD CONSTRAINT ux_categories_name UNIQUE (name);

SELECT * FROM categories;
SET SQL_SAFE_UPDATES = 0;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

