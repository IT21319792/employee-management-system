const  Department  = require('../models/Department');
const Employee = require('../models/Employee'); 


// Create a new department
exports.createDepartment = async (req, res) => {
    const { name, location } = req.body;
    try {
        const department = await Department.create({ name, location });
        res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create department', details: error.message });
    }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
    console.log('Fetching all departments...');
    try {
        const departments = await Department.findAll();
        console.log('Departments fetched:', departments);
        res.status(200).json(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ error: 'Unable to fetch departments', details: error.message });
    }
};

// Get a department by ID
exports.getDepartmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch department', details: error.message });
    }
};

// Update a department
exports.updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;
    try {
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        department.name = name;
        department.location = location;
        await department.save();
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update department', details: error.message });
    }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the department
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Check if there are employees in this department
        const employeesInDepartment = await Employee.findAll({ where: { department_id: id } });
        if (employeesInDepartment.length > 0) {
            return res.status(400).json({
                error: 'Cannot delete department with existing employees. Please reassign or delete employees first.'
            });
        }

        // If no employees, delete the department
        await department.destroy();
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete department', details: error.message });
    }
};
