CREATE DATABASE IF NOT EXISTS mapa_users;
USE mapa_users;


CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(120) NOT NULL,          
    email VARCHAR(100),                     
    fecha_alta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS visited_places (
    id INT AUTO_INCREMENT PRIMARY KEY,usersusersusers
    username VARCHAR(50),                  
    municipio VARCHAR(55) NOT NULL,
    province VARCHAR(20),        
    fecha_visita DATE,                     
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE 
) ENGINE = InnoDB;
