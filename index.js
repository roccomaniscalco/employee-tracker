const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const Department = require("./util/models/Department");
const Employee = require("./util/models/Employee");
const Role = require("./util/models/Role");
const orm = require("./util/orm");

connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "gigabyte",
  database: "employee_tracker_DB",
});

connection.connect((err) => {
  if (err) throw err;
  selectFunction();
});

const selectFunction = () => {
  inquirer
    .prompt([
      {
        name: "selectedFunction",
        type: "list",
        message: "Perform Function:",
        choices: [
          "View All Employees",
          "View Employees by Department",
          "View Employees by Manager",
          // new inquirer.Separator(),
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          // new inquirer.Separator(),
        ],
      },
    ])
    .then(({ selectedFunction }) => {
      switch (selectedFunction) {
        case "View All Employees":
          orm.printEmployees();
          break;
        case "View Employees by Department":
          viewDepartment();
          break;
        case "View Employees by Manager":
          viewManager();
          break;
        case "Add Employee":
          inputEmployee();
          break;
        case "Add Department":
          inputDepartment();
          break;
        case "Add Role":
          inputRole();
          break;
        case "Update Employee Role":
          updateRole();
          break;
      }
    })
    .catch((err) => {
      throw err;
    });
};

viewDepartment = async () => {
  const { departmentId } = await selectDepartment();
  orm.printDepartment(departmentId);
};

selectDepartment = async () => {
  const departments = await orm.selectFrom("department");
  return inquirer.prompt([
    {
      name: "departmentId",
      type: "list",
      message: "Select Department:",
      choices: departments.map(({ department, id }) => {
        return { name: department, value: id };
      }),
    },
  ]);
};

viewManager = async () => {
  const { managerId } = await selectManager();
  orm.printManager(managerId);
};

selectManager = async () => {
  const managers = await orm.selectFrom("employee");
  console.log(managers);
  return inquirer.prompt([
    {
      name: "managerId",
      type: "list",
      message: "Select Manager:",
      choices: managers.map(({ firstName, lastName, managerId }) => {
        return { name: firstName + " " + lastName, value: managerId };
      }),
    },
  ]);
};

selectRole = async () => {
  const roles = await orm.selectFrom("role");
  return inquirer.prompt([
    {
      name: "roleId",
      type: "list",
      message: "Select Role:",
      choices: roles.map(({ role, id }) => {
        return { name: role, value: id };
      }),
    },
  ]);
};

inputEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        message: "First Name:",
      },
      {
        name: "lastName",
        message: "Last Name:",
      },
    ])
    .then(async ({ firstName, lastName }) => {
      const { roleId } = await selectRole();
      new Employee(firstName, lastName, roleId, null).insertRow();
    })
    .catch((err) => {
      throw err;
    });
};

inputDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        message: "Department Title:",
      },
    ])
    .then(({ department }) => {
      new Department(department).insertRow();
    });
};

inputRole = () => {
  inquirer
    .prompt([
      {
        name: "role",
        message: "Role Title:",
      },
      {
        name: "salary",
        message: "Salary:",
      },
    ])
    .then(async ({ role, salary }) => {
      const { departmentId } = await selectDepartment();
      new Role(role, salary, departmentId).insertRow();
    });
};

// connection.end();
