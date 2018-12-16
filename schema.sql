DROP DATABASE IF EXISTS bAmazon_db;

CREATE DATABASE bAmazon_db;

USE bAmazon_db;

CREATE TABLE items (
	
	item_id INTEGER(1) auto_increment,
    product_name TEXT,
    department_name TEXT,
    price INTEGER(10),
    quantity INTEGER(10),
    PRIMARY KEY (item_id)
    
);

SELECT * FROM items;

