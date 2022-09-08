-- USE team_db;
INSERT INTO departments(dept_name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal"),
("Board of Directors");

INSERT INTO roles(job_title, salary, department_id)
VALUES
("Chief Executive Officer", 100000, 5),
("Director of Sales & Marketing", 80000, 1),
("Director of Engineering", 100000, 2),
("Senior Engineer", 120000, 2),
("Accountant", 90000, 3),
("Sales Person", 50000, 1),
("Accountant Intern", 70000, 3),
("Senior Legal Counsel", 110000, 4),
("Lawyer", 90000, 4),
("Engineer", 80000, 2);

INSERT INTO employee(first_name, last_name, department_id, role_id, manager_id)
VALUES
("Hermione","Granger", 5, 1, 1),
("Harry","Potter", 5, 2, 1),
("Ron","Weasley", 5, 3, 1),
("Draco","Malfoy", 1, 6, 1),
("Ginny","Weasley", 5, 4, 1),
("Fred","Weasley", 1, 6, 2),
("George","Weasley", 1, 6, 2),
("Albus","Dumbledore", 5, 7, 2),
("Rubeus","Hagrid", 1, 6, 3),
("Minerva","McGonagall", 4, 9, 3),
("Severus","Snape", 4, 9, 3),
("Remus","Lupin", 4, 8, NULL),
("Sirius","Black", 2, 7, NULL),
("Bellatrix","Lestrange", 2, 2, NULL),
("Lord","Voldemort", 3, 2, NULL);










