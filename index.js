const mysql = require("mysql");
require("console.table");

const Department = require("./models/Department");
const Employee = require("./models/Employee");
const Role = require("./models/Role");
const orm = require("./util/orm");
const prompt = require("./util/prompt");

// declares connection globally
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

const selectFunction = async () => {
  const { selectedFunction } = await prompt.listFunctions([
    "View All Employees",
    "View Employees by Department",
    "View Employees by Manager",
    "Add Employee",
    "Add Department",
    "Add Role",
    "Update Employee Role",
    // makes 'EXIT' green
    "\x1b[32mEXIT\x1b[0m",
  ]);
  switch (selectedFunction) {
    case "View All Employees":
      viewAll();
      break;
    case "View Employees by Department":
      viewDepartment();
      break;
    case "View Employees by Manager":
      viewManager();
      break;
    case "Add Employee":
      addEmployee();
      break;
    case "Add Department":
      addDepartment();
      break;
    case "Add Role":
      addRole();
      break;
    case "Update Employee Role":
      updateRole();
      break;
    case "\x1b[32mEXIT\x1b[0m":
      connection.end();
  }
};

const viewAll = async () => {
  console.table(await orm.printEmployees());

  selectFunction();
};

const viewDepartment = async () => {
  const { departmentId } = await prompt.listDepartment();
  console.table(await orm.printDepartment(departmentId));

  selectFunction();
};

const viewManager = async () => {
  const { managerId } = await prompt.listManagers();
  console.table(await orm.printManager(managerId));

  selectFunction();
};

const addEmployee = async () => {
  const { firstName, lastName } = await prompt.inputName();
  const { roleId } = await prompt.listRoles();
  const { isAppointingManager } = await prompt.confirmManagerAppointment();

  // sets managerId to null if no manager is appointed
  if (isAppointingManager) {
    const { managerId } = await prompt.listEmployees("Select Manager:");
    console.log(
      "\x1b[32m",
      await new Employee(firstName, lastName, roleId, managerId).insertRow()
    );
  } else
    console.log(
      "\x1b[32m",
      await new Employee(firstName, lastName, roleId, managerId).insertRow()
    );

  selectFunction();
};

const addDepartment = async () => {
  const { department } = await prompt.inputDepartment();
  console.log("\x1b[32m", await new Department(department).insertRow());

  selectFunction();
};

const addRole = async () => {
  const { role, salary } = await prompt.inputRole();
  const { departmentId } = await prompt.listDepartment();
  console.log(
    "\x1b[32m",
    await new Role(role, salary, departmentId).insertRow()
  );

  selectFunction();
};

const updateRole = async () => {
  const { employeeId } = await prompt.listEmployees("Select Employee:");
  const { roleId } = await prompt.listRoles();
  console.log("\x1b[32m", await orm.updateRole(employeeId, roleId));

  selectFunction();
};
