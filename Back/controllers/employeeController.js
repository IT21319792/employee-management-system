const Employee = require('../models/Employee');
const Department = require('../models/Department');
const EmployeeRoles = require('../models/EmployeeRole'); 
const { Op } = require('sequelize'); 



// Create Employee
exports.createEmployee = async (req, res) => {
  const { first_name, last_name, email, position, salary, department_id } = req.body;
  try {

    const department = await Department.findByPk(department_id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }


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
  
      await EmployeeRoles.destroy({ where: { employee_id: id } });
      
  
      await employee.destroy();
      res.status(204).json(); 
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Unable to delete employee', details: error.message });
  }
};

// Search Employees
exports.searchEmployees = async (req, res) => {
    console.log('Search parameters:', req.query); 
    const { name, department, role } = req.query;

    try {
        let where = {};
  
        if (name) {
            where[Op.or] = [
                { first_name: { [Op.iLike]: `%${name}%` } }, 
                { last_name: { [Op.iLike]: `%${name}%` } }   
            ];
        } else if (department) {
            where.department_id = department; 
        } else if (role) {
            where.position = { [Op.iLike]: `%${role}%` }; 
        }
        const employees = await Employee.findAll({ where });
        if (Object.keys(where).length === 0) {
            return res.status(400).json({ message: 'Please provide a search parameter: name, department, or role.' });
        }

        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }

        res.status(200).json(employees);
    } catch (error) {
        console.error('Error searching employees:', error);
        res.status(500).json({ error: 'Unable to search employees', details: error.message });
    }
};


// Fetch employees along with department details
exports.getEmployeesWithDepartment = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        {
          model: Department,
          as: 'department', // Ensure the alias matches
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!employees || employees.length === 0) {
      return res.status(404).json({ error: 'Employees not found' });
    }

    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching employees with department data' });
  }
};

// Fetch all department details
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching department data' });
  }
};