DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(30),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NULL,
);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("nerdy tshirts", 14.50, 100);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("nature tshirts", 12.50, 60);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("adventure tshirts", 10.20, 50);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("funny tshirts", 12.20, 25);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("cats tshirts", 12.50, 25);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("fitness tshirts", 16.20, 100);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("meme tshirts", 16.00, 90);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("jokes tshirts", 10.20, 75);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("kids tshirts", 10.20, 75);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("xmass tshirts", 8.00, 30);