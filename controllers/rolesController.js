const Role = require('../models/Role');

// Create a new role
exports.createRole = async (req, res) => {
    const { title, description } = req.body;
    try {
        const role = await Role.create({ title, description });
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create role', details: error.message });
    }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch roles', details: error.message });
    }
};

// Get a role by ID
exports.getRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch role', details: error.message });
    }
};

// Update a role
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        role.title = title;
        role.description = description;
        await role.save();
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update role', details: error.message });
    }
};

// Delete a role
exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        await role.destroy();
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete role', details: error.message });
    }
};
