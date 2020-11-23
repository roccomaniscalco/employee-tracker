DROP DATABASE IF EXISTS employee_tracker_DB;
CREATE DATABASE employee_tracker_DB;
USE employee_tracker_DB;

CREATE TABLE department(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    role VARCHAR(30),
    salary DECIMAL,
    departmentId INT
);

CREATE TABLE employee(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    roleId INT,
    managerId INT
);
