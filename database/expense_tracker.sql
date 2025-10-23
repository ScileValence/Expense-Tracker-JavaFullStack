-- expense_tracker simple schema
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
INSERT INTO categories (name) VALUES ('Food'), ('Rent'), ('Utilities'), ('Entertainment');
