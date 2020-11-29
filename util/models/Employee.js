module.exports = class Employee {
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