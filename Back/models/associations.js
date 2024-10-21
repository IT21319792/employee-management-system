const Employee = require('./Employee');
const Department = require('./Department');

// Define associations here
Department.hasMany(Employee, { foreignKey: 'department_id' });
Employee.belongsTo(Department, { as: 'department', foreignKey: 'department_id' });
