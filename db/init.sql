USE auth_backend;

CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
INSERT INTO users (username, email, password) VALUES ('ayush', 'test@gmail.com', 'ayushpassword');
