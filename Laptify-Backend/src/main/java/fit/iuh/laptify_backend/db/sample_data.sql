-- Insert Roles
INSERT INTO roles (name)
VALUES ('ADMIN'),
       ('USER');

-- Insert Users
INSERT INTO users (email, name, password, role_id)
VALUES ('user1@example.com', 'Nguyen Van A', 'hashed_password_1', 2),
       ('user2@example.com', 'Tran Thi B', 'hashed_password_2', 2),
       ('user3@example.com', 'Le Van C', 'hashed_password_3', 2),
       ('user4@example.com', 'Pham Thi D', 'hashed_password_4', 2),
       ('admin@example.com', 'Admin User', 'hashed_password_admin', 1);

-- Insert User Placement Infos
INSERT INTO user_placement_infos (customer_name, phone_number, address, is_saved)
VALUES ('Nguyen Van A', '0912345678', '123 Nguyen Hue, HCMC', 1),
       ('Tran Thi B', '0987654321', '456 Tran Hung Dao, HCMC', 1),
       ('Le Van C', '0901234567', '789 Hoang Van Thu, HCMC', 0),
       ('Pham Thi D', '0923456789', '321 Ly Thuong Kiet, Hanoi', 1),
       ('Hoang Van E', '0934567890', '654 Nguyen Trai, HCMC', 0);

-- Insert Brands
INSERT INTO brands (code, name, description, created_at)
VALUES ('APPLE', 'Apple', 'Premium technology company', NOW()),
       ('DELL', 'Dell', 'Leading computer manufacturer', NOW()),
       ('HP', 'HP', 'Hewlett-Packard technology solutions', NOW()),
       ('LENOVO', 'Lenovo', 'Chinese multinational tech company', NOW()),
       ('ASUS', 'ASUS', 'Taiwanese computer hardware company', NOW()),
       ('CORSAIR', 'Corsair', 'Gaming peripherals manufacturer', NOW()),
       ('LOGITECH', 'Logitech', 'Computer input devices', NOW()),
       ('RAZER', 'Razer', 'Gaming hardware specialist', NOW()),
       ('STEELSERIES', 'SteelSeries', 'Gaming peripherals brand', NOW()),
       ('HYPERX', 'HyperX', 'Gaming brand by HP', NOW()),
       ('SONY', 'Sony', 'Electronics and entertainment', NOW()),
       ('BEATS', 'Beats', 'Premium audio brand', NOW()),
       ('SENNHEISER', 'Sennheiser', 'German audio equipment', NOW()),
       ('JBL', 'JBL', 'Audio equipment company', NOW()),
       ('BOSE', 'Bose', 'Premium sound systems', NOW()),
       ('MICROSOFT', 'Microsoft', 'Software and hardware company', NOW()),
       ('ROCCAT', 'ROCCAT', 'Gaming peripherals', NOW()),
       ('MADCATZ', 'Mad Catz', 'Gaming controller manufacturer', NOW()),
       ('NINTENDO', 'Nintendo', 'Gaming company', NOW()),
       ('SONY_GAMING', 'Sony Gaming', 'PlayStation manufacturer', NOW());

-- Insert Categories
INSERT INTO categories (id, name, description)
VALUES (1, 'Laptop', 'Portable computing devices'),
       (2, 'Keyboard', 'Computer input keyboards'),
       (3, 'Mouse', 'Computer pointing devices'),
       (4, 'Headphone', 'Audio listening devices'),
       (5, 'Gamepad', 'Gaming controllers');

-- Insert Products - Laptop (5 products)
INSERT INTO products (name, description, brand_id, category_id, created_at)
VALUES ('MacBook Pro 14', 'High-performance laptop', 1, 1, NOW()),
       ('Dell XPS 13', 'Ultra-portable laptop', 2, 1, NOW()),
       ('HP Pavilion 15', 'Affordable laptop', 3, 1, NOW()),
       ('Lenovo ThinkPad X1', 'Business laptop', 4, 1, NOW()),
       ('ASUS VivoBook 15', 'Budget-friendly laptop', 5, 1, NOW());

-- Insert Products - Keyboard (5 products)
INSERT INTO products (name, description, brand_id, category_id, created_at)
VALUES ('Corsair K95 Platinum', 'Mechanical gaming keyboard', 6, 2, NOW()),
       ('Logitech MX Keys', 'Wireless keyboard', 7, 2, NOW()),
       ('Razer BlackWidow', 'Gaming keyboard', 8, 2, NOW()),
       ('SteelSeries Apex Pro', 'Adjustable switches keyboard', 9, 2, NOW()),
       ('Apple Magic Keyboard', 'Wireless keyboard', 1, 2, NOW());

-- Insert Products - Mouse (5 products)
INSERT INTO products (name, description, brand_id, category_id, created_at)
VALUES ('Logitech G Pro X', 'Gaming mouse', 7, 3, NOW()),
       ('Razer DeathAdder V3', 'High-precision mouse', 8, 3, NOW()),
       ('Corsair Dark Core RGB', 'Wireless gaming mouse', 6, 3, NOW()),
       ('Steelseries Rival 600', 'Esports mouse', 9, 3, NOW()),
       ('Apple Magic Mouse', 'Wireless mouse', 1, 3, NOW());

-- Insert Products - Headphone (5 products)
INSERT INTO products (name, description, brand_id, category_id, created_at)
VALUES ('Sony WH-1000XM5', 'Noise-cancelling headphones', 11, 4, NOW()),
       ('Beats Studio Pro', 'Premium headphones', 12, 4, NOW()),
       ('Sennheiser Momentum 4', 'High-quality audio', 13, 4, NOW()),
       ('JBL Live Pro 2', 'True wireless earbuds', 14, 4, NOW()),
       ('Bose QuietComfort 45', 'Comfort headphones', 15, 4, NOW());

-- Insert Products - Gamepad (5 products)
INSERT INTO products (name, description, brand_id, category_id, created_at)
VALUES ('Xbox Series X Controller', 'Microsoft gaming controller', 16, 5, NOW()),
       ('PlayStation 5 Controller', 'DualSense controller', 20, 5, NOW()),
       ('Razer Wolverine V2 Pro', 'Professional gamepad', 8, 5, NOW()),
       ('HyperX Clutch Gladiate', 'Gaming controller', 10, 5, NOW()),
       ('Mad Catz C.A.T. 8', 'Fighting game controller', 18, 5, NOW());

-- Insert SKUs - Laptop (3 colors per product, 5 products = 15 SKUs)
-- Product IDs 1-5
-- Insert SKUs - Laptop (3 colors per product, 5 products = 15 SKUs)
-- Product IDs 1-5
INSERT INTO skus (sku_code, color, image_url, price, stock_quantity, product_id, total_purchases)
VALUES ('LP001-SLV', 'Silver', '/images/lp001-slv.jpg', 47976000, 10, 1, 45),
       ('LP001-GRY', 'Gray', '/images/lp001-gry.jpg', 47976000, 8, 1, 32),
       ('LP001-BLK', 'Black', '/images/lp001-blk.jpg', 47976000, 12, 1, 28),
       ('LP002-SLV', 'Silver', '/images/lp002-slv.jpg', 23976000, 15, 2, 52),
       ('LP002-BLU', 'Blue', '/images/lp002-blu.jpg', 23976000, 20, 2, 38),
       ('LP002-GRN', 'Green', '/images/lp002-grn.jpg', 23976000, 18, 2, 25),
       ('LP003-SLV', 'Silver', '/images/lp003-slv.jpg', 14376000, 25, 3, 61),
       ('LP003-BLK', 'Black', '/images/lp003-blk.jpg', 14376000, 22, 3, 48),
       ('LP003-WHT', 'White', '/images/lp003-wht.jpg', 14376000, 20, 3, 35),
       ('LP004-BLK', 'Black', '/images/lp004-blk.jpg', 31176000, 14, 4, 56),
       ('LP004-GRY', 'Gray', '/images/lp004-gry.jpg', 31176000, 11, 4, 42),
       ('LP004-SLV', 'Silver', '/images/lp004-slv.jpg', 31176000, 9, 4, 31),
       ('LP005-SLV', 'Silver', '/images/lp005-slv.jpg', 16776000, 30, 5, 70),
       ('LP005-BLU', 'Blue', '/images/lp005-blu.jpg', 16776000, 28, 5, 54),
       ('LP005-BLK', 'Black', '/images/lp005-blk.jpg', 16776000, 25, 5, 40);

-- Insert SKUs - Keyboard (3 colors per product, 5 products = 15 SKUs)
-- Product IDs 6-10
INSERT INTO skus (sku_code, color, image_url, price, stock_quantity, product_id, total_purchases)
VALUES ('KB001-BLK', 'Black', '/images/kb001-blk.jpg', 5496000, 20, 6, 85),
       ('KB001-WHT', 'White', '/images/kb001-wht.jpg', 5496000, 18, 6, 67),
       ('KB001-GRY', 'Gray', '/images/kb001-gry.jpg', 5496000, 16, 6, 52),
       ('KB002-BLK', 'Black', '/images/kb002-blk.jpg', 2376000, 35, 7, 125),
       ('KB002-SLV', 'Silver', '/images/kb002-slv.jpg', 2376000, 32, 7, 98),
       ('KB002-GLD', 'Gold', '/images/kb002-gld.jpg', 2376000, 30, 7, 76),
       ('KB003-BLK', 'Black', '/images/kb003-blk.jpg', 3576000, 25, 8, 95),
       ('KB003-GRN', 'Green', '/images/kb003-grn.jpg', 3576000, 22, 8, 72),
       ('KB003-PRP', 'Purple', '/images/kb003-prp.jpg', 3576000, 20, 8, 58),
       ('KB004-BLK', 'Black', '/images/kb004-blk.jpg', 4776000, 18, 9, 88),
       ('KB004-RD', 'Red', '/images/kb004-rd.jpg', 4776000, 15, 9, 69),
       ('KB004-BLU', 'Blue', '/images/kb004-blu.jpg', 4776000, 12, 9, 54),
       ('KB005-SLV', 'Silver', '/images/kb005-slv.jpg', 1896000, 40, 10, 142),
       ('KB005-WHT', 'White', '/images/kb005-wht.jpg', 1896000, 38, 10, 118),
       ('KB005-BLK', 'Black', '/images/kb005-blk.jpg', 1896000, 36, 10, 95);

-- Insert SKUs - Mouse (3 colors per product, 5 products = 15 SKUs)
-- Product IDs 11-15
INSERT INTO skus (sku_code, color, image_url, price, stock_quantity, product_id, total_purchases)
VALUES ('MS001-BLK', 'Black', '/images/ms001-blk.jpg', 1656000, 30, 11, 115),
       ('MS001-WHT', 'White', '/images/ms001-wht.jpg', 1656000, 28, 11, 92),
       ('MS001-GRY', 'Gray', '/images/ms001-gry.jpg', 1656000, 26, 11, 78),
       ('MS002-BLK', 'Black', '/images/ms002-blk.jpg', 1896000, 25, 12, 105),
       ('MS002-WHT', 'White', '/images/ms002-wht.jpg', 1896000, 23, 12, 84),
       ('MS002-RD', 'Red', '/images/ms002-rd.jpg', 1896000, 21, 12, 67),
       ('MS003-BLK', 'Black', '/images/ms003-blk.jpg', 1416000, 40, 13, 128),
       ('MS003-GRY', 'Gray', '/images/ms003-gry.jpg', 1416000, 38, 13, 102),
       ('MS003-BLU', 'Blue', '/images/ms003-blu.jpg', 1416000, 36, 13, 81),
       ('MS004-BLK', 'Black', '/images/ms004-blk.jpg', 2136000, 20, 14, 98),
       ('MS004-GRY', 'Gray', '/images/ms004-gry.jpg', 2136000, 18, 14, 76),
       ('MS004-BLU', 'Blue', '/images/ms004-blu.jpg', 2136000, 16, 14, 61),
       ('MS005-SLV', 'Silver', '/images/ms005-slv.jpg', 1896000, 32, 15, 110),
       ('MS005-WHT', 'White', '/images/ms005-wht.jpg', 1896000, 30, 15, 88),
       ('MS005-BLK', 'Black', '/images/ms005-blk.jpg', 1896000, 28, 15, 72);

-- Insert SKUs - Headphone (3 colors per product, 5 products = 15 SKUs)
-- Product IDs 16-20
INSERT INTO skus (sku_code, color, image_url, price, stock_quantity, product_id, total_purchases)
VALUES ('HP001-BLK', 'Black', '/images/hp001-blk.jpg', 8376000, 15, 16, 78),
       ('HP001-SLV', 'Silver', '/images/hp001-slv.jpg', 8376000, 13, 16, 62),
       ('HP001-BLU', 'Blue', '/images/hp001-blu.jpg', 8376000, 11, 16, 48),
       ('HP002-BLK', 'Black', '/images/hp002-blk.jpg', 9576000, 12, 17, 65),
       ('HP002-RD', 'Red', '/images/hp002-rd.jpg', 9576000, 10, 17, 52),
       ('HP002-BLU', 'Blue', '/images/hp002-blu.jpg', 9576000, 9, 17, 41),
       ('HP003-BLK', 'Black', '/images/hp003-blk.jpg', 9096000, 14, 18, 72),
       ('HP003-BRN', 'Brown', '/images/hp003-brn.jpg', 9096000, 12, 18, 58),
       ('HP003-GRY', 'Gray', '/images/hp003-gry.jpg', 9096000, 10, 18, 46),
       ('HP004-BLK', 'Black', '/images/hp004-blk.jpg', 4776000, 20, 19, 102),
       ('HP004-WHT', 'White', '/images/hp004-wht.jpg', 4776000, 18, 19, 81),
       ('HP004-BLU', 'Blue', '/images/hp004-blu.jpg', 4776000, 16, 19, 65),
       ('HP005-BLK', 'Black', '/images/hp005-blk.jpg', 7896000, 16, 20, 85),
       ('HP005-SLV', 'Silver', '/images/hp005-slv.jpg', 7896000, 14, 20, 68),
       ('HP005-GLD', 'Gold', '/images/hp005-gld.jpg', 7896000, 12, 20, 54);

-- Insert SKUs - Gamepad (3 colors per product, 5 products = 15 SKUs)
-- Product IDs 21-25
INSERT INTO skus (sku_code, color, image_url, price, stock_quantity, product_id, total_purchases)
VALUES ('GP001-BLK', 'Black', '/images/gp001-blk.jpg', 1416000, 30, 21, 145),
       ('GP001-WHT', 'White', '/images/gp001-wht.jpg', 1416000, 28, 21, 118),
       ('GP001-GRN', 'Green', '/images/gp001-grn.jpg', 1416000, 26, 21, 92),
       ('GP002-WHT', 'White', '/images/gp002-wht.jpg', 1656000, 25, 22, 138),
       ('GP002-BLK', 'Black', '/images/gp002-blk.jpg', 1656000, 23, 22, 112),
       ('GP002-RD', 'Red', '/images/gp002-rd.jpg', 1656000, 21, 22, 89),
       ('GP003-BLK', 'Black', '/images/gp003-blk.jpg', 4536000, 15, 23, 72),
       ('GP003-PRP', 'Purple', '/images/gp003-prp.jpg', 4536000, 13, 23, 58),
       ('GP003-GRN', 'Green', '/images/gp003-grn.jpg', 4536000, 11, 23, 46),
       ('GP004-BLK', 'Black', '/images/gp004-blk.jpg', 2376000, 20, 24, 95),
       ('GP004-RD', 'Red', '/images/gp004-rd.jpg', 2376000, 18, 24, 76),
       ('GP004-BLU', 'Blue', '/images/gp004-blu.jpg', 2376000, 16, 24, 61),
       ('GP005-BLK', 'Black', '/images/gp005-blk.jpg', 3576000, 18, 25, 68),
       ('GP005-SLV', 'Silver', '/images/gp005-slv.jpg', 3576000, 16, 25, 54),
       ('GP005-GLD', 'Gold', '/images/gp005-gld.jpg', 3576000, 14, 25, 43);
