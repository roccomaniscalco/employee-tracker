DROP DATABASE IF EXISTS employee_tracker_DB;
CREATE DATABASE employee_tracker_DB;
USE employee_tracker_DB;

CREATE TABLE department(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department VARCHAR(30) NOT NULL
);

CREATE TABLE role(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    role VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    departmentId INT NOT NULL
);

CREATE TABLE employee(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT NOT NULL,
    managerId INT
);

-- INSERT INTO department (department) 
-- VALUES ("Developement");

-- INSERT INTO role (role, salary, departmentId) 
-- VALUES ("Senior Developer", 90000, 1);

-- INSERT INTO employee (firstName, lastName, roleId, managerId)
-- VALUES ("Bob", "Builderson", 1, null);

-- UPDATE employee SET roleId = 2 WHERE id = 1;

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;

-- SELECT e.id, e.firstName, e.lastname, r.role, d.department, r.salary, m.firstName
-- FROM employee e 
-- LEFT JOIN role r ON e.roleId = r.id
-- LEFT JOIN department d ON r.departmentId = d.id
-- LEFT JOIN employee m ON e.managerId = m.id;
