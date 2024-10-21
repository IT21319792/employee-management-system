
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Department = sequelize.define('Department', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'departments',
    timestamps: false
});


Department.sync().then(() => {
    console.log('Department table has been created (if it didn\'t exist).');
}
);

module.exports = Department;