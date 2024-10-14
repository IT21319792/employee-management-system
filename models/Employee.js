const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true  // Validates that the value is a valid email address
        }
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'departments', // refers to the table name
            key: 'id', // refers to the column name in the departments table
        },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
    }
}, {
    tableName: 'employees',
    timestamps: true, 
});

// Syncing the Employee model to ensure it matches the database
Employee.sync().then(() => {
    console.log('Employee table has been created (if it didn\'t exist).');
});

module.exports = Employee;
