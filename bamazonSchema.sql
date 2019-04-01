-- -----------  Create new DB called bamazon -----------
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

-- -----------  Create new table for products -----------
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

-- -----------  Create new table for departments -----------
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL,
  overhead_costs DECIMAL(10,2) NOT NULL
);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Clothing", 15000.00);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Home Goods", 10000.00);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Shoes", 5000.00);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Dust Collectors", 20000.00);

SELECT * FROM departments;

-- -----------  modify products table with new column -----------

