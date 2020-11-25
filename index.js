const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const {Department, Role, Employee, viewEmployees} = require("./util");

connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "gigabyte",
  database: "employee_tracker_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

new Department("development").insertRow();
new Role("Senior Developer", 90000, 1).insertRow();
new Employee("Tom", "Browne", 1, 1).insertRow();

viewEmployees();

connection.end();