module.exports = class Role {
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