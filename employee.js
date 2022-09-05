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
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id`

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("You viewed all employees!\n");
    
        prompts();
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
