-- User rest api queries

-- Get All
SELECT * from "user";

-- Get
SELECT * FROM "user" where email = 'test@gmail.com' and password = 'password'; 

-- Post
INSERT INTO "user" (first_name, last_name, email, username, password)
VALUES ('Emil', 'Sharkov', 'test@gmail.com', 'test', 'password') returning *;

-- Put
UPDATE "user" SET (first_name, last_name, email, username, password) = 
('Emil1', 'Sharkov1', 'test@gmail.com1', 'test1', 'password1') where user_id = 1 returning *;

-- Delete
DELETE FROM "user" WHERE user_id = 1 returning *;