module.exports = class Department {
  constructor(department) {
    this.department = department;
  }
  insertRow() {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department: this.department,
        },
        (err) => {
          if (err) reject(err);
          else resolve(`CREATED DEPARTMENT: ${this.department}\n`);
        }
      );
    });
  }
};
