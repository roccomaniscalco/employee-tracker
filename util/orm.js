module.exports = orm = {
  select: (table) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ??`, [table], (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  selectWhere: (table, condition) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ?? WHERE ${condition}`,
        [table],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  },

  updateRole: (roleId, employeeId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE employee SET roleId = ? WHERE id = ? `,
        [roleId, employeeId],
        (err, res) => {
          if (err) reject(err);
          else resolve("UPDATED ROLE\n");
        }
      );
    });
  },

  printEmployees: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT e.id, e.firstName, e.lastName, r.role, d.department, r.salary, 
        CONCAT(m.firstName, " ", m.lastName) AS manager
        FROM employee e 
        LEFT JOIN role r ON e.roleId = r.id
        LEFT JOIN department d ON r.departmentId = d.id
        LEFT JOIN employee m ON e.managerId = m.id`,
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  },

  printDepartment: (departmentId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT e.id, e.firstName, e.lastName, r.role, r.salary, 
        CONCAT(m.firstName, " ", m.lastName) AS manager
        FROM employee e
        LEFT JOIN role r ON e.roleId = r.id
        LEFT JOIN employee m ON e.managerId = m.id
        WHERE r.departmentId = ?;`,
        [departmentId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  },

  printManager: (managerId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT e.id, e.firstName, e.lastName, r.role, r.salary, d.department
        FROM employee e
        LEFT JOIN role r ON e.roleId = r.id
        LEFT JOIN department d ON r.departmentId = d.id
        WHERE e.managerId = ?;`,
        [managerId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  },
};
