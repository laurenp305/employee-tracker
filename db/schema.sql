DROP DATABASE IF EXISTS team_db;

CREATE DATABASE team_db;
USE team_db;

-- creates department column --
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(25) NOT NULL,
    PRIMARY KEY (id)
);



