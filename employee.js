const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

//establishes connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "SuperSecretPassword",
    database: "employee_trackerDB"
});

//figlet for the title font 
import figlet from 'figlet';

// //creating title for app
figlet('Welcome to Employee Tracker!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

//prompts for adding, deleting, and viewing employees 
const questions = [{
    type: 'list', 
    name: 'action',
    message: 'What do you want to see first?',
    choices: [
        'View all employees',
        'View all departments',
        'View all employees by department',
        'Add an employee',
        'Remove employee',
        'Change employee role',
        'Change employee manager',
        'View all roles',
        'Add a role',
        'Remove a role',
        'Add a department',
        'Remove a department',
        'Done'
    ]
}];

//Passes questions to inquirer and returns the answer
const init = () => {
    prompt(questions)

    .then((responses) => {
        switch(responses.action) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all employees by department':
                viewAllEmployeesByDept();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Remove employee':
                removeEmployee();
                break;
            case 'Change employee role':
                changeEmployeeRole();
                break;
            case 'Change employee manager':
                changeEmployeeManager();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Remove a role':
                removeRole();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Remove a department':
                removeDepartment();
                break;
            case 'Done':
                connection.end();
                break;
        }
    });
}

// //Defining queries for each function
// const queryEmp = 'SELECT * FROM employee';
// const queryRole = 'SELECT * FROM roles';
// const queryDept = 'SELECT * FROM departments';

// const queryEmpDetails = 'SELECT employee.id, employee.first_name, employee.last_name, roles.job_title, roles.salary, departments.dept_name FROM employee LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;';
// const queryRolesDetails = 'SELECT roles.id, roles.job_title, roles.salary, departments.dept_name FROM role LEFT JOIN department ON roles.department_id = departments.id;';

// const queryEmpInfo = 'SELECT id, first_name, last_name FROM employee';
// const queryRoleMang = 'SELECT id FROM roles';
// const queryEmpChoices = 'SELECT CONCAT(first_name, " ", last_name) AS name FROM employee';

// const queryAddEmployee = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
// const queryAddDepartment = 'INSERT INTO department (dept_name) VALUES (?)';
// const queryAddRole = 'INSERT INTO roles (job_title, salary, department_id) VALUES (?, ?, ?)';

// const queryChangeEmp = 'UPDATE employee SETT ? WHERE ?';
// const queryChangeRole = 'UPDATE roles SET ? WHERE ?';
// const queryDeleteEmp = 'DELETE FROM employee WHERE ?';


//function to view all employees
