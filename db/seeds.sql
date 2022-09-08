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
("Chief Executive Officer", 100000, 05),
("Director of Sales & Marketing", 80000, 01),
("Director of Engineering", 100000, 02),
("Senior Engineer", 120000, 02),
("Accountant", 90000, 03),
("Sales Person", 50000, 01),
("Accountant Intern", 70000, 03),
("Senior Legal Counsel", 110000, 04),
("Lawyer", 90000, 04),
("Engineer", 80000, 02);

INSERT INTO employee(first_name, last_name, department_id, role_id, manager_id)
("Hermione","Granger", 5, 1),
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

-- SELECT * FROM employee;

-- -- confirms true when a lead/managerial role id is chosen --
-- UPDATE employee SET lead_role = True WHERE role_id IN ("19", "20", "21", "22");

-- -- sets Hermione Granger as manager_id for certain role IDs -- 
-- UPDATE employee set manager_id = 0001 where role_id IN ("19", "20", "21", "22");

-- -- sets Harry Potter as manager_id for certain role IDs --
-- UPDATE employee set manager_id = 0002 where role_id IN ("23", "24", "25");

-- -- sets Ron Weasley as manager_id for certain role IDs --
-- UPDATE employee set manager_id = 0003 where role_id IN ("22", "27");

-- -- sets Dumbledore as manager for lawyer role ids --
-- UPDATE employee set manager_id = 0008 where role_id IN ("27");










