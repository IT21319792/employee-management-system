const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmployeeRole = sequelize.define('EmployeeRole', {
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'employee_roles'
});

module.exports = EmployeeRole;
