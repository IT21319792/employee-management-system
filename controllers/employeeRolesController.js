const EmployeeRoles = require('../models/EmployeeRole');
const Role = require('../models/Role');
const Employee = require('../models/Employee');

// Assign a role to an employee
exports.assignRole = async (req, res) => {
    const { employee_id, role_id } = req.body;
    try {
        // Check if the employee exists
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Check if the role exists
        const role = await Role.findByPk(role_id); // Assuming `role_id` is the primary key
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        // Check if the role is already assigned to the employee
        const existingRoleAssignment = await EmployeeRoles.findOne({ 
            where: { employee_id, role_id } 
        });

        if (existingRoleAssignment) {
            return res.status(400).json({ error: 'Role is already assigned to this employee' });
        }

        // Create the new role assignment
        const employeeRole = await EmployeeRoles.create({ employee_id, role_id });
        res.status(201).json(employeeRole);
    } catch (error) {
        res.status(500).json({ error: 'Unable to assign role', details: error.message });
    }
};

// Unassign a role from an employee
exports.unassignRole = async (req, res) => {
    const { employee_id, role_id } = req.params;
    try {
        const employeeRole = await EmployeeRoles.findOne({ where: { employee_id, role_id } });
        if (!employeeRole) {
            return res.status(404).json({ error: 'Role assignment not found' });
        }
        await employeeRole.destroy();
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ error: 'Unable to unassign role', details: error.message });
    }
};

// Get all roles for an employee
exports.getRolesForEmployee = async (req, res) => {
    const { employee_id } = req.params;
    try {
        const employeeRoles = await EmployeeRoles.findAll({ where: { employee_id } });
        res.status(200).json(employeeRoles);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch employee roles', details: error.message });
    }
};
