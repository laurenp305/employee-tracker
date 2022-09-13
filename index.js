//required dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
// const server = require("./server");
var figlet = require('figlet');

//installed dotenv
require('dotenv').config();

//establishes connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
},
    console.log(`Created connection to ${process.env.DB_NAME} Database!`)
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
            'View all employees by department',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Remove a department',
            'Remove a role',
            'Remove an employee',
            'Update employee role',
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
                case 'Update employee role':
                    updateRole();
                    break;
                case 'Done':
                    connection.end();
                    break;
            }
        });
}

//VIEW ALL DEPARTMENTS//
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

//VIEW ALL EMPLOYEES BY DEPARTMENT//
function viewAllEmployeesByDepartment() {
    console.log("Viewing all employees by department\n");

    var query =
        `SELECT employee.id, employee.first_name, employee.last_name, roles.job_title, departments.dept_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    ORDER BY departments.dept_name`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const listOfDepartments = res.map(data => ({
            value: data.id, name: data.name
        }));

        console.table(res);
        console.log("You viewed all employees by department!\n");

    });
}

//VIEW ALL ROLES//
function viewAllRoles() {
    console.log("Viewing all roles\n");

    var query = `SELECT * FROM roles`

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("You viewed all roles!\n");

        prompts();
    });
}

//VIEW ALL EMPLOYEES//
function viewAllEmployees() {
    console.log("Viewing employees\n");

    var query = `SELECT * FROM employee`
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("You viewed all employees!\n");

        prompts();
    });
};

//ADD DEPARTMENT//
function addDepartment() {
    console.log("Adding a department\n");
    var query = `SELECT * FROM departments`
    connection.query(query, function (err, res) {
        if (err) throw err;
        const listOfRoles = res.map(({ id, dept_name }) => ({
            value: `${id}`, department: `${dept_name}`
        }));

        console.table(res)

        addDepartmentPrompts();

    })
};

//prompts and choices for adding department
function addDepartmentPrompts() {

    inquirer.prompt([
        {
            type: "input",
            name: "newDeptId",
            message: "What is the department ID?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter an ID!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "newDepartmentName",
            message: "What is the department name?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter a name!");
                    return false;
                }
            }
        },
    ])

        .then(function (res) {
            var query = `INSERT INTO departments (id, dept_name) VALUES (?, ?)`;
            connection.query(query, [res.newDeptId, res.newDepartmentName], function (err, res) {
                // if (err) throw err;
                console.table(res);
                console.log("You added a department!\n");
                prompts();
            });
        });
};

//ADD ROLE//
function addRole() {
    console.log("Adding a role\n");
    var query = `SELECT * FROM roles`
    connection.query(query, function (err, res) {
        if (err) throw err;
        const listOfRoles = res.map(({ id, dept_name, job_title, salary, department_id }) => ({
            value: `${id}`, department_name: `${dept_name}`, job: `${job_title}`, salary: `${salary}`, department_id: `${department_id}`
        }));

        console.table(res)

        addRolePrompts();

    })
};

//prompts and choices for adding role
function addRolePrompts() {

    inquirer.prompt([
        {
            type: "input",
            name: "newRoleId",
            message: "What is the role ID?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter an ID!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "newRoleTitle",
            message: "What is the role title?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter a title!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "newRoleSalary",
            message: "What is the role salary?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter a salary!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "newRoleDepartment",
            message: "What is the role's department name?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter a name!");
                    return false;
                }
            }
        },
    ])

        .then(function (res) {
            var query = `INSERT INTO departments (id, dept_name) VALUES (?, ?)`;
            connection.query(query, [res.newRoleId, res.newRoleTitle, res.newRoleSalary, res.newRoleDepartment], function (err, res) {
                // if (err) throw err;
                console.table(res);
                console.log("You added a role!\n");
                prompts();
            });
        });
};

//ADD EMPLOYEE//
function addEmployee() {
    console.log("Adding an employee\n");
    var query = `SELECT * FROM employee`
    connection.query(query, function (err, res) {
        if (err) throw err;
        const listOfRoles = res.map(({ id, first_name, last_name, department_id, role_id, manager_id }) => ({
            value: `${id}`, first: `${first_name}`, last: `${last_name}`, department: `${department_id}`, role: `${role_id}`, manager: `${manager_id}`
        }));

        console.table(res)

        addEmployeePrompts();

    })
};

//prompts and choices for adding employee
function addEmployeePrompts() {

    inquirer.prompt([
        {
            type: "input",
            name: "newEmployeeId",
            message: "What is the employee's ID?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter an ID!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "newEmployeeFirst",
            message: "What is the employee's first name?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter a name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "newEmployeeLast",
            message: "What is the employee's last name?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter a name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "newEmployeeId",
            message: "What is the employee's department ID?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter an ID!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "newEmployeeRole",
            message: "What is the employee's role ID?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter an ID!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "newEmployeeManager",
            message: "What is the employee's manager ID?",
            validate: prompt => {
                if (prompt) {
                    return true;
                } else {
                    console.log("Please enter an ID!");
                    return false;
                }
            }
        },
    ])

        .then(function (res) {
            var query = `INSERT INTO employee (id, first_name, last_name, department_id, role_id, manager_id) VALUES (?, ?, ?, ?, ?, ?)`;
            connection.query(query, [res.newEmployeeId, res.newEmployeeFirst, res.newEmployeeLast, res.newEmployeeId, res.newEmployeeRole, res.newEmployeeManager], function (err, res) {
                // if (err) throw err;
                console.table(res);
                console.log("You added an employee!\n");
                prompts();
            });
        });
};

//REMOVE DEPARTMENT//
function removeDepartment() {
    console.log("Removing a department\n");
    var query = `SELECT * FROM departments`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const removeDepartmentChoices = res.map(({ id, dept_name }) => ({
            value: id, departmentName: `${dept_name}`
        }));

        console.table(res);
        console.log("Choose department to remove\n");

        promptDeleteDept(removeDepartmentChoices);
    }
    )
};

//Prompts choices to user so they can delete an employee
function promptDeleteDept(removeDepartmentChoices) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which department would you like to remove?',
            choices: removeDepartmentChoices
        }
    ])
        .then(function (answer) {
            console.log("answer", answer);

            var query = `DELETE FROM departments WHERE ?`

            connection.query(query, answer, function (err, res) {
                // if (err) throw err;
                console.table("response", res);
                console.log(res.affectedRows + "You removed a department!\n");

                prompts();
            });
        });
};

//REMOVE DEPARTMENT//
function removeRole() {
    console.log("Removing a role\n");
    var query = `SELECT * FROM roles`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const removeRoleChoices = res.map(({ id, job_title, salary, department_id }) => ({
            value: id, title: `${job_title}`, salary: `${salary}`, departmentId: `${department_id}`
        }));

        console.table(res);
        console.log("Choose role to remove\n");

        promptDeleteRole(removeRoleChoices);
    }
    )
};

//Prompts choices to user so they can delete an employee
function promptDeleteRole(removeRoleChoices) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which role would you like to remove?',
            choices: removeRoleChoices
        }
    ])
        .then(function (answer) {
            console.log("answer", answer);

            var query = `DELETE FROM roles WHERE ?`

            connection.query(query, answer, function (err, res) {
                // if (err) throw err;
                console.table("response", res);
                console.log(res.affectedRows + "You removed a role!\n");

                prompts();
            });
        });
};

//REMOVE EMPLOYEE//
function removeEmployee() {
    console.log("Removing an employee\n");
    var query = `SELECT employee.id, employee.first_name, employee.last_name, roles.job_title, departments.dept_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
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
    )
};

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
};


//UPDATE EMPLOYEE ROLE//
function updateRole(){
    let query = `SELECT 
    employee.id,
    employee.first_name, 
    employee.last_name, 
    roles.job_title, 
    departments.dept_name, 
    roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
JOIN roles
    ON employee.role_id = roles.id
JOIN departments
    ON departments.id = roles.department_id
JOIN employee manager
    ON manager.id = employee.manager_id`
  
    connection.query(query, (error, res) => {
    console.log(error);
    //   if(err)throw err;
      const employee = res.map(({ id, first_name, last_name }) => ({
        value: id,
         name: `${first_name} ${last_name}`      
      }));
      console.table(res);
      updateEmployeeRole(employee);
    });
}

function updateEmployeeRole(employee){
  let query = 
  `SELECT 
    roles.id, 
    roles.job_title, 
    roles.salary 
  FROM roles`

  connection.query(query,(error, res)=>{
    // if(err)throw err;
    let roleChoices = res.map(({ id, job_title, salary }) => ({
      value: id, 
      title: `${job_title}`, 
      salary: `${salary}`      
    }));
    console.table(res);
    promptUpdatedRole(employee, roleChoices);
  });
}
  
function promptUpdatedRole(employee, roleChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: `Choose the employee you want to update: `,
        choices: employee
      },
      {
        type: "list",
        name: "role",
        message: "Select the employee's new role: ",
        choices: roleChoices
      },

    ]).then((res)=>{
      let query = `UPDATE employee SET role_id = ? WHERE id = ?`
      connection.query(query,[ res.role, res.employee],(err, res)=>{
          if(err)throw err;
          prompts();
        });
    });
}

prompts();
