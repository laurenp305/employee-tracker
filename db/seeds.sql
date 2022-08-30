USE team_db;
INSERT INTO departments(id, dept_name);
VALUES
(01, "Sales"),
(02, "Engineering"),
(03, "Finance"),
(04, "Legal"),
(05, "Board of Directors");

INSERT INTO roles(id, job_title, salary, department_id);
VALUES
(19, "Chief Executive Officer", 100000, 05),
(20, "Director of Sales & Marketing", 80000, 01),
(21, "Director of Engineering", 100000, 02),
(22, "Senior Engineer", 120000, 02),
(23, "Accountant", 90000, 03),
(24, "Sales Person", 50000, 01),
(25, "Accountant Intern", 70000, 03),
(26, "Senior Legal Counsel", 110000, 04),
(27, "Lawyer", 90000, 04),
(28, "Engineer", 80000, 02),

INSERT INTO employee(id, first_name, last_name, department_id, role_id, manager_id, added);
(0001, "Hermione","Granger", 05, 19, NULL, TRUE),
(0002, "Harry","Potter", 05, 20, NULL, FALSE),
(0003, "Ron","Weasley", 05, 21, NULL, FALSE),
(0004, "Draco","Malfoy", 01, 24, NULL, FALSE),
(0005, "Ginny","Weasley", 05, 22, NULL, FALSE),
(0006, "Fred","Weasley", 01, 24, NULL, FALSE),
(0007, "George","Weasley", 01, 24, NULL, FALSE),
(0008, "Albus","Dumbledore", 05, 26, NULL, FALSE),
(0009, "Rubeus","Hagrid", 01, 24, NULL, FALSE),
(0010, "Minerva","McGonagall", 04, 27, NULL, FALSE),
(0011, "Severus","Snape", 04, 27, NULL, FALSE),
(0012, "Remus","Lupin", 04, 27, NULL, FALSE),
(0013, "Sirius","Black", 02, , NULL, FALSE),
(0014, "Bellatrix","Lestrange", 02, 20, NULL, FALSE),
(0015, "Lord","Voldemort", 03, 20, NULL, FALSE),

SELECT * FROM employee;

-- confirms true when a lead/managerial role id is chosen --
UPDATE employee SET lead_role = True WHERE role_id IN ("19", "20", "21", "22");

-- sets Hermione Granger as manager_id for certain role IDs -- 
UPDATE employee set manager_id = 0001 where role_id IN ("19", "20", "21", "22");

-- sets Harry Potter as manager_id for certain role IDs --
UPDATE employee set manager_id = 0002 where role_id IN ("23", "24", "25");

-- sets Ron Weasley as manager_id for certain role IDs --
UPDATE employee set manager_id = 0003 where role_id IN ("22", "27");

-- sets Dumbledore as manager for lawyer role ids --
UPDATE employee set manager_id = 0008 where role_id IN ("27");










