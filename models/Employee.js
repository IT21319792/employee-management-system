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
        onUpdate: 'CASCADE',  // Optional: how to handle updates in the referenced table
        onDelete: 'SET NULL'  // Optional: how to handle deletions in the referenced table
    }
}, {
    tableName: 'employees',
    timestamps: true, // Optional: adds createdAt and updatedAt timestamps
});

// Syncing the Employee model to ensure it matches the database
Employee.sync().then(() => {
    console.log('Employee table has been created (if it didn\'t exist).');
});

module.exports = Employee;
