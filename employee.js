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

//Define prompts/options 





