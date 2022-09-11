DROP DATABASE IF EXISTS team_db;

CREATE DATABASE team_db;
USE team_db;

-- creates department table --
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- creates roles table with foregin key --
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  job_title VARCHAR(30) NOT NULL,
  salary INT,
  department_id INT,
  PRIMARY KEY(id)
);

-- creates employee table with foreign keys to departments table, roles table, and the same table --
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  department_id INT,
  role_id INT NOT NULL,
  manager_id INT DEFAULT NULL,
  PRIMARY KEY(id)
);

