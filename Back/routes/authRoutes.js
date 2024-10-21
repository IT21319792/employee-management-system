const express = require('express');
const { register, login, getAdminData } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Get Admin Data (protected route)
router.get('/admin', authMiddleware, getAdminData);

module.exports = router;
