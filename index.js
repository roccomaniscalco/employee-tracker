const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

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
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
        ],
      },
    ])
    .then(async ({ selectedFunction }) => {
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
  const departments = await orm.select("department");
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

selectNewManager = async () => {
  const employees = await orm.select("employee");
  return inquirer.prompt([
    {
      name: "managerId",
      type: "list",
      message: "Select Manager:",
      choices: employees.map(({ firstName, lastName, id }) => {
        return { name: firstName + " " + lastName, value: id };
      }),
    },
  ]);
};

selectManager = async () => {
  const employees = await orm.selectWhere("employee", "managerId IS NOT NULL");
  const managerIds = [...new Set(employees.map(({ managerId }) => managerId))];
  const managers = [];
  for (let i = 0; i < managerIds.length; i++) {
    managers.push(
      (await orm.selectWhere("employee", `id = ${managerIds[i]}`))[0]
    );
  }

  return inquirer.prompt([
    {
      name: "managerId",
      type: "list",
      message: "Select Manager:",
      choices: managers.map(({ firstName, lastName, id }) => {
        return { name: firstName + " " + lastName, value: id };
      }),
    },
  ]);
};

selectRole = async () => {
  const roles = await orm.select("role");
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
      const {isAppointingManager} = await confirmManagerAppointment(firstName, lastName);
      if(isAppointingManager){
        const { managerId } = await selectNewManager();
        new Employee(firstName, lastName, roleId, managerId).insertRow();
      }
      else new Employee(firstName, lastName, roleId, null).insertRow();
    })
    .catch((err) => {
      throw err;
    });
};

confirmManagerAppointment = (firstName, lastName) => {
  return inquirer.prompt([
    {
      name: "isAppointingManager",
      message: `Appoint manager for ${firstName} ${lastName}`,
      type: "confirm",
    },
  ])
}

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
