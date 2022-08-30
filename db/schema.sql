DROP DATABASE IF EXISTS team_db;

CREATE DATABASE team_db;
USE team_db;

-- creates department table --
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(25) NOT NULL,
    PRIMARY KEY (id)
);

-- creates roles table with foregin key --
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  job_title VARCHAR(40) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(deptartment_id) REFERENCES departments(id)
);


