USE team_db;
INSERT INTO departments(id, dept_name);
VALUES
(01, "Sales Lead"),
(02, "Sales Person"),
(03, "Lead Engineer"),
(04, "Software Engineer"),
(05, "Account Manager");
(06, "Accountant");
(07, "Legal Team Lead");
(08, "Lawyer");
(09, "Board of Directors");

INSERT INTO roles(id, job_title, salary, department_id);
VALUES
(19, "Chief Executive Officer", 100000, 1),
(20, "Director of Sales & Marketing", 80000, 1),
(21, "Director of Engineering", 100000, 3),
(22, "Senior Engineer", 120000, 4),
(23, "Accountant", 90000, 5),
(24, "Accountant Intern", 70000, 6),
(25, "Director of Education", 100000, 7),
(26, "Lawyer", 90000, 8);

INSERT INTO employee(id, first_name, last_name, department_id, role_id, manager_id, added);
(0001, "Hermione","Granger", 09, 19, NULL, TRUE),
(0002, "Harry","Potter", 01, 20, NULL, FALSE),
(0003, "Ron","Weasley", 01, 23, NULL, FALSE),
(0004, "Draco","Malfoy", 02, 23, NULL, FALSE),
(0005, "Ginny","Weasley", 02, 23, NULL, FALSE),
(0006, "Fred","Weasley", 02, 25, NULL, FALSE),
(0007, "George","Weasley", 02, 25, NULL, FALSE),
(0008, "Albus","Dumbledore", 03, 25, NULL, FALSE),
(0009, "Rubeus","Hagrid", 02, 26, NULL, FALSE),
(0010, "Minerva","McGonagall", 05, 26, NULL, FALSE),
(0011, "Severus","Snape", 08, 26, NULL, FALSE),
(0012, "Remus","Lupin", 08, 26, NULL, FALSE),
(0013, "Sirius","Black", 07, 26, NULL, FALSE),
(0014, "Bellatrix","Lestrange", 02, 20, NULL, FALSE),
(0015, "Lord","Voldemort", 02, 20, NULL, FALSE),
(0016, "Draco","Malfoy", 06, 05, NULL, FALSE),
(0017, "Ginny","Weasley", 06, 05, NULL, FALSE),
(0018, "Fred","Weasley", 06, 05, NULL, FALSE),
(0019, "George","Weasley", 06, 05, NULL, FALSE),
(0020, "Albus","Dumbledore", 04, 24, NULL, FALSE),
(0021, "Rubeus","Hagrid", 04, 21, NULL, FALSE),
(0022, "Minerva","McGonagall", 04, 21, NULL, FALSE),
(0023, "Severus","Snape", 04, 21, NULL, FALSE),
(0024, "Remus","Lupin", 03, 21, NULL, FALSE),
(0025, "Sirius","Black", 03, 21, NULL, FALSE),

