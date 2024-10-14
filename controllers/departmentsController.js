const  Department  = require('../models/Department');

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