module.exports = class Employee {
  constructor(firstName, lastName, roleId, managerId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
  }
  insertRow() {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          firstName: this.firstName,
          lastName: this.lastName,
          roleId: this.roleId,
          managerId: this.managerId,
        },
        (err) => {
          if (err) reject(err);
          else
            resolve(`CREATED EMPLOYEE: ${this.firstName} ${this.lastName}\n`);
        }
      );
    });
  }
};
