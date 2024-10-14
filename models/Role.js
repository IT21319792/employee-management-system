const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
});

module.exports = Role;
