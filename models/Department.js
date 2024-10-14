const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Department = sequelize.define('Department', {
  name: DataTypes.STRING,
  location: DataTypes.STRING,
});

module.exports = Department;
