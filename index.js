//required dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
// const server = require("./server");
var figlet = require('figlet');
require("dotenv").config();

//establishes connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
},
console.log(`Created connection to ${DB_NAME} Database!`)
);

//creates title for app
figlet('Employee Tracker!', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

//prompts for adding, deleting, and viewing employees 
function prompts() {

    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What do you want to see first?',
        choices: [
            'View all departments',
            'View all employees by deparment',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Remove a department',
            'Remove a role',
            'Remove an employee',
            'Change employee role',
            'Done'
        ]
    })
        .then(function ({ action }) {
            switch (action) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all employees by department':
                    viewAllEmployeesByDepartment();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Remove a department':
                    removeDepartment();
                    break;
                case 'Remove a role':
                    removeRole();
                    break;
                case 'Remove an employee':
                    removeEmployee();
                    break;
                case 'Change employee role':
                    changeRole();
                    break;
                case 'Done':
                    connection.end();
                    break;
            }
        });
}

//view all departments
function viewAllDepartments() {
    console.log("Viewing all departments\n");

    var query = `SELECT * FROM departments`

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("You viewed all departments!\n");
    
        prompts();
    });
}

//view all employees
function viewAllEmployees() {
    console.log("Viewing employees\n");

    var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = roles.id
    LEFT JOIN department ON role.department_id = departments.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id`

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("You viewed all employees!\n");
    
        prompts();
    });
}

//view all employees by department 
function viewAllEmployeesByDepartment() {
    console.log("Viewing all employees by department\n");

    var query = 
    `SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, departments.dept_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = departments.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    ORDER BY departments.dept_name`

    connection.query(query, function (err, res) {
        if (err) throw err;
        
        const listOfDepartments = res.map(data => ({
            value: data.id, name: data.name
        }));

        console.table(res);
        console.log("You viewed all employees by department!\n");

        promptDepartments(listOfDepartments);
    });
}

//creates an array of all departments 
function promptDepartments(listOfDepartments) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department would you like to view?',
            choices: listOfDepartments
        }
    ])
        .then(function (answer) {
            console.log("answer", answer.department_id);
            var query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employees.role_id = roles.id
            LEFT JOIN department ON roles.department_id = departments.id
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            WHERE departments.id = ?`

            connection.query(query, answer.department_id, function (err, res) {
                if (err) throw err;
                console.table("response", res);
                console.log(res.affectedRows + "You viewed all employees by department!\n");
                prompts();
            });
        }); 
}

//add employee and create array 
function addEmployee() {
    console.log("Adding an employee\n");
    var query = `SELECT roles.id, roles.job_title, roles.salary, departments.dept_name AS department
    FROM roles`
connection.query(query, function (err, res) {
    if (err) throw err;
    
    const listOfRoles = res.map(({ id, title, salary, department }) => ({
        value: id, title: `${title}`, salary: `${salary}`, department: `${department}`
    }));

    console.table(res);
    console.log("Choose role\n");

    promptEmployee(listOfRoles);
}
)};

//prompts and choices for adding employee
function promptInsert(listOfRoles) {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the employee first name?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the employee last name?'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the employee role id?',
            choices: listOfRoles
        }
    ])
        .then(function (answer) {
            console.log("answer", answer);
            
            var query = `INSERT INTO employee SET ?`
            
            connection.query(query, answer, function (err, res) {
                if (err) throw err;
                console.table("response", res);
                console.log(res.affectedRows + "You added an employee!\n");
                prompts();
            });
        });
}

//Create an employee array to delete employee
function removeEmployee() {
    console.log("Removing an employee\n");
    var query = `SELECT employee.id, employee.first_name, employee.last_name, roles.job_title, departments.dept_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = departments.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id`

connection.query(query, function (err, res) {
    if (err) throw err;
    
    const removeEmployeeChoices = res.map(({ id, first_name, last_name, title, department, salary, manager }) => ({
        value: id, name: `${first_name} ${last_name}`, title: `${title}`, department: `${department}`, salary: `${salary}`, manager: `${manager}`
    }));

    console.table(res);
    console.log("Choose employee to remove\n");

    promptDelete(removeEmployeeChoices);
}
)};

//Prompts choices to user so they can delete an employee
function promptDelete(removeEmployeeChoices) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which employee would you like to remove?',
            choices: removeEmployeeChoices
        }
    ])
        .then(function (answer) {
            console.log("answer", answer);
            
            var query = `DELETE FROM employee WHERE ?`
            
            connection.query(query, answer, function (err, res) {
                if (err) throw err;
                console.table("response", res);
                console.log(res.affectedRows + "You removed an employee!\n");
                prompts();
            });
        });
}

//Update an employee's role
function updateEmployeeRole() {
    listOfEmployees();
}


function listOfEmployees() {
    console.log("Updating an employee's role\n");

    var query = `SELECT employee.id, employee.first_name, employee.last_name, roles.job_title, departments.dept_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = departments.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id`

    connection.query(query, function (err, res) {
        if (err) throw err;

    const employeeOptions = res.map(({ id, first_name, last_name, title, department, salary, manager }) => ({
        value: id, name: `${first_name} ${last_name}`, title: `${title}`, department: `${department}`, salary: `${salary}`, manager: `${manager}`
    }));

    console.table(res);
    console.log("Choose employee to update\n");

    rolesChoices(employeeOptions);
}
)};

//Create an array of roles to update employee role
function rolesChoices(employeeOptions) {
    console.log("Update employee's role\n");

    var query = 
    `SELECT roles.id, roles.job_title, roles.salary, departments.dept_name AS department
    FROM roles`

    let roleChoices;

    connection.query(query, function (err, res) {
        if (err) throw err;
        
        roleChoices = res.map(({ id, title, salary, department }) => ({
            value: id, title: `${title}`, salary: `${salary}`, department: `${department}`
        }));
    });
}

function promptEmployeeRole(employeeOptions, roleChoices) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Choose employee to update by role.',
            choices: employeeOptions
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Which role do you want to update?',
            choices: roleChoices
        }
    ])
        .then(function (answer) {
            console.log("answer", answer);
            
            var query = `UPDATE employee SET role_id WHERE id = ?`
            
            //inserts new item into db
            connection.query(query, [answer.role_id, answer.employee_id], function (err, res) {
                if (err) throw err;
                console.table("response", res);
                console.log(res.affectedRows + "You updated an employee's role!\n");
                prompts();
            });
        });
}

//add employee role array
function addEmployeeRole() {
    var query = 
    `SELECT department.id, department.dept_name, roles.salary AS budget 
    FROM employee 
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    GROUP BY department.id, department.dept_name`

    connection.query(query, function (err, res) {
        if (err) throw err;
    
    const departmentOptions = res.map(({ id, dept_name, budget }) => ({
        value: id, name: `${dept_name}`, budget: `${budget}`
    }));

    console.table(res);
    console.log("Choose department to add role\n");

    promptAddEmployeeRole(departmentOptions);
}
)};

//Prompts choices to user so they can add an employee role
function promptAddEmployeeRole(departmentOptions) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role_title',
            message: 'Choose role title to add role.',
            choices: departmentOptions
        },
        {
            type: 'input',
            name: 'role_salary',
            message: 'What is the role salary?',
        },
        {
            type: 'input',
            name: 'department_id',
            message: departmentOptions
        },
    ])
        .then(function (answer) {
            console.log("answer", answer);
            
            var query = `INSERT INTO roles SET ?`
            
            connection.query(query, answer, function (err, res) {

                if (err) throw err;

                console.table("response", res);
                console.log(res.affectedRows + "You added a role!\n");

                prompts();
            });
        });
}

prompts();