const express = require('express');
const router = express.Router();
const employeeRolesController = require('../controllers/employeeRolesController');


router.post('/', employeeRolesController.assignRole);
router.delete('/:employee_id/:role_id', employeeRolesController.unassignRole);
router.get('/:employee_id', employeeRolesController.getRolesForEmployee);

module.exports = router;
