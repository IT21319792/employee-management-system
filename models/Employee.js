const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  position: DataTypes.STRING,
  salary: DataTypes.DECIMAL,
  department_id: DataTypes.INTEGER,
});

module.exports = Employee;
