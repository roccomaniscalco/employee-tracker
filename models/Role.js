module.exports = class Role {
  constructor(role, salary, departmentId) {
    this.role = role;
    this.salary = salary;
    this.departmentId = departmentId;
  }
  insertRow() {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          role: this.role,
          salary: this.salary,
          departmentId: this.departmentId,
        },
        (err) => {
          if (err) reject(err);
          else resolve(`CREATED ROLE: ${this.role}\n`);
        }
      );
    });
  }
};
