const inquirer = require("inquirer");

module.exports = prompt = {
  listFunctions: async (functions) => {
    return inquirer.prompt([
      {
        name: "selectedFunction",
        type: "list",
        message: "Perform Function:",
        choices: functions,
      },
    ]);
  },

  listEmployees: async (message) => {
    const employees = await orm.select("employee");
    return inquirer.prompt([
      {
        name: "employeeId",
        type: "list",
        message: message,
        choices: employees.map(({ firstName, lastName, id }) => {
          return { name: firstName + " " + lastName, value: id };
        }),
      },
    ]);
  },

  listManagers: async () => {
    const employees = await orm.selectWhere(
      "employee",
      "managerId IS NOT NULL"
    );
    // Creates array of unique manager IDs from employees[]
    const managerIds = [
      ...new Set(employees.map(({ managerId }) => managerId)),
    ];
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
  },

  listDepartment: async () => {
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
  },

  listRoles: async () => {
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
  },

  inputName: () => {
    return inquirer.prompt([
      {
        name: "firstName",
        message: "First Name:",
      },
      {
        name: "lastName",
        message: "Last Name:",
      },
    ]);
  },

  inputDepartment: () => {
    return inquirer.prompt([
      {
        name: "department",
        message: "Department Title:",
      },
    ]);
  },

  inputRole: () => {
    return inquirer.prompt([
      {
        name: "role",
        message: "Role Title:",
      },
      {
        name: "salary",
        message: "Salary:",
      },
    ]);
  },

  confirmManagerAppointment: () => {
    return inquirer.prompt([
      {
        name: "isAppointingManager",
        message: `Appoint Manager:`,
        type: "confirm",
      },
    ]);
  },
};
