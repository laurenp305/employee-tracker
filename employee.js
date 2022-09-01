const {prompt} = require('inquirer');
const cTable = require('console.table');
const connection = require('.connection.js');

//prompts for adding, deleting, and viewing employees 
const questions = [{
    type: 'list', 
    name: 'action',
    message: 'What do you want to see first?',
    choices: [
        'View all employees',
        'View all departments',
        'View all roles',
        'Add an employee',
        'Add a department',
        'Add a role',
        'Delete an employee',
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
            case 'View all roles':
                viewAllRoles();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'Done':
                connection.end();
                break;
        }
    });
}

//Defining queries for each function
const queryEmp = 'SELECT * FROM employee';
const queryRole = 'SELECT * FROM roles';
const queryDept = 'SELECT * FROM departments';

const queryEmpDetails = 'SELECT employee.id, employee.first_name, employee.last_name, roles.job_title, roles.salary, departments.dept_name FROM employee LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;';
const queryRolesDetails = 'SELECT roles.id, roles.job_title, roles.salary, departments.dept_name FROM role LEFT JOIN department ON roles.department_id = departments.id;';

const queryEmpInfo = 'SELECT id, first_name, last_name FROM employee';
const queryRoleMang = 'SELECT id FROM roles';
const queryEmpChoices = 'SELECT CONCAT(first_name, " ", last_name) AS name FROM employee';

const queryAddEmpoyee = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
const queryAddDepartment = 'INSERT INTO department (dept_name) VALUES (?)';
const queryAddRole = 'INSERT INTO roles (job_title, salary, department_id) VALUES (?, ?, ?)';

const queryChangeEmp = 'UPDATE employee SETT ? WHERE ?';
const queryChangeRole = 'UPDATE roles SET ? WHERE ?';
const queryDeleteEmp = 'DELETE FROM employee WHERE ?';


//Defining functions for each query

//function for searching for employee information
const findEmp = (query) => {
    connection.query(queryEmpDetails, (err, res) => {
        if (err) throw err;
        console.log(`\n\n ***All ${res.length} Employees*** \n\n`)
        console.table(res);
        init();
    }
    )};

//function for searching for role information
const findRole = (query) => {
    connection.query(queryRolesDetails, (err, res) => {
        if (err) throw err;
        console.log(`\n\n ***All ${res.length} Roles*** \n\n`)
        console.table(res);
        init();
    }
    )}

//function for finding a department
const findDept = (query) => {
    connection.query(queryDept, (err, res) => {
        if (err) throw err;
        console.log(`\n\n ***All ${res.length} Departments*** \n\n`)
        console.table(res);
        init();
    }
    )}



