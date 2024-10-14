const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./Employee');
const Role = require('./Role');

const EmployeeRole = sequelize.define('EmployeeRole', {
  employee_id: DataTypes.INTEGER,
  role_id: DataTypes.INTEGER,
});

// Relationships
Employee.belongsToMany(Role, { through: EmployeeRole });
Role.belongsToMany(Employee, { through: EmployeeRole });

module.exports = EmployeeRole;
