class Department {
  constructor(department) {
    this.department = department;
  }
  insertRow() {
    connection.query(
      "INSERT INTO department SET ?",
      {
        department: this.department,
      },
      (err) => {
        if (err) throw err;
        console.log(`INSERTED NEW DEPARTMENT: ${this.department}\n`);
      }
    );
  }
}

class Role {
  constructor(role, salary, departmentId) {
    this.role = role;
    this.salary = salary;
    this.departmentId = departmentId;
  }
  insertRow() {
    connection.query(
      "INSERT INTO role SET ?",
      {
        role: this.role,
        salary: this.salary,
        departmentId: this.departmentId,
      },
      (err) => {
        if (err) throw err;
        console.log(`INSERTED NEW ROLE: ${this.role}\n`);
      }
    );
  }
}

class Employee {
  constructor(firstName, lastName, roleId, managerId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
  }
  insertRow() {
    connection.query(
      "INSERT INTO employee SET ?",
      {
        firstName: this.firstName,
        lastName: this.lastName,
        roleId: this.roleId,
        managerId: this.managerId,
      },
      (err) => {
        if (err) throw err;
        console.log(
          `INSERTED NEW EMPLOYEE: ${this.firstName} ${this.lastName}\n`
        );
      }
    );
  }
}

module.exports = {
  Department,
  Role,
  Employee,
};
