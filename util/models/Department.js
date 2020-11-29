module.exports = class Department {
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