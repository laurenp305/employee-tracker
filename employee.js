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

//creates title for app
figlet('Welcome to Employee Tracker!', function (err, data) {
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
        .then(function ({ task }) {
            switch (task) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all employees by department':
                    viewAllDepartments();
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

