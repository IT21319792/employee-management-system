const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentsController');

router.post('/', departmentController.createDepartment);
router.get('/', departmentController.getAllDepartments);

// // Get a department by ID
// router.get('/:id', getDepartmentById);

// // Update a department
// router.put('/:id', updateDepartment);

// // Delete a department
// router.delete('/:id', deleteDepartment);

module.exports = router;
