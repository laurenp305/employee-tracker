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

INSERT INTO roles(id, job_title, salary, department_id);
VALUES
(09, "Chief Executive Officer", 100000, 1),
(20, "Director of Sales & Marketing", 80000, 1),
(21, "Director of Engineering", 100000, 3),
(22, "Senior Engineer", 120000, 4),
(23, "Accountant", 90000, 5),
(24, "Accountant Intern", 70000, 6),
(25, "Director of Education", 100000, 7),
(26, "Lawyer", 90000, 8);

INSERT INTO employee(id, first_name, last_name, department_id, role_id, manager_id, added);

