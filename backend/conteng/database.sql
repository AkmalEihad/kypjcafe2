CREATE DATABASE KYPJCafe;

CREATE TABLE Customer (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    faculty VARCHAR(255),
    username VARCHAR(100),
    password VARCHAR(100),
    email VARCHAR(255)
)

CREATE TABLE Cafe(
    cafe_id SERIAL PRIMARY KEY,
    cafe_name VARCHAR(255),
    cafe_location VARCHAR(255),
    seller_id INT REFERENCES Seller(seller_id),
    description VARCHAR(255),
    cafe_image_url VARCHAR(255),
    is_open BOOLEAN
)

CREATE TABLE Seller(
    seller_id SERIAL PRIMARY KEY,
    seller_username VARCHAR(255),
    seller_name VARCHAR(255),
    seller_password VARCHAR(100),
    seller_email VARCHAR(255)
)

CREATE TABLE Menu(
    item_id SERIAL PRIMARY KEY, 
    item_name VARCHAR(255),
    categories VARCHAR(255),
    price DECIMAL(10,2),
    item_image_url VARCHAR(255)
    is_available BOOLEAN,
    cafe_id INT REFERENCES Cafe(cafe_id)
)

CREATE TABLE Orders(
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Customer(customer_id),
    order_date DATE,
    order_status VARCHAR(100),
    order_completed BOOLEAN
)

CREATE TABLE OrdersItems(
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(order_id),
    item_id INT REFERENCES Menu(item_id),
    quantity INT
)

SELECT m.item_id,m.item_name,m.price,o.order_id,o.order_date,oi.order_item_id,oi.quantity FROM Menu AS m INNER JOIN OrdersItems AS oi ON m.item_id = oi.item_id INNER JOIN Orders AS o ON oi.order_id = o.order_id WHERE order_id = 32;

#c4942f