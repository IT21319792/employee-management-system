const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Admin
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const admin = await Admin.create({ name, email, password });

    const payload = { admin: { id: admin.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Admin already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

// Login Admin
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { admin: { id: admin.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Admin Data
exports.getAdminData = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id, { attributes: { exclude: ['password'] } });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
