const Employee = require('../models/Employee');
const Department = require('../models/Department');
const EmployeeRoles = require('../models/EmployeeRole'); 

// Create Employee
exports.createEmployee = async (req, res) => {
  const { first_name, last_name, email, position, salary, department_id } = req.body;
  try {
    // Check if the department exists
    const department = await Department.findByPk(department_id); // Assuming `department_id` is the primary key
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Create the employee if the department is valid
    const employee = await Employee.create({ first_name, last_name, email, position, salary, department_id });
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error); 
    res.status(500).json({ error: 'Unable to create employee', details: error.message });
  }
};

// Read all Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch employees' });
  }
};

// Read Employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) res.json(employee);
    else res.status(404).json({ error: 'Employee not found' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch employee' });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, position, salary, department_id } = req.body;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      await employee.update({ first_name, last_name, email, position, salary, department_id });
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to update employee' });
  }
};



// Delete Employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      // Delete associated roles for the employee
      await EmployeeRoles.destroy({ where: { employee_id: id } });
      
      // Now delete the employee
      await employee.destroy();
      res.status(204).json(); // No content to send back
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Unable to delete employee', details: error.message });
  }
};
