import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../App.css';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  salary: number;
  department_id: number;
};

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  const [updatedEmployee, setUpdatedEmployee] = useState<Employee>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: 0,
    department_id: 0,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false); // Track modal visibility

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleUpdateClick = (employee: Employee) => {
    setIsUpdating(employee.id);
    setUpdatedEmployee(employee);
    setModalIsOpen(true); // Open the modal when update is clicked
  };

  const handleUpdateSubmit = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You are about to update this employee's information.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:3000/employees/${id}`, updatedEmployee);
        Swal.fire('Updated!', 'Employee has been updated successfully.', 'success');
        setIsUpdating(null);
        setModalIsOpen(false);
        fetchEmployees();
      } catch (error) {
        console.error('Error updating employee:', error);
        Swal.fire('Error!', 'There was an error updating the employee.', 'error');
      }
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You are about to delete this employee.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/employees/${id}`);
        Swal.fire('Deleted!', 'Employee has been deleted successfully.', 'success');
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        Swal.fire('Error!', 'There was an error deleting the employee.', 'error');
      }
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdatedEmployee({ ...updatedEmployee, [e.target.name]: e.target.value });
  };

  return (
    <div className="employee-list">
      <h2>Employee List</h2>

      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
              <td>{employee.department_id}</td>
              <td>
                <button onClick={() => handleUpdateClick(employee)} className="icon-button">
                  <FaEdit className="icon edit-icon" />
                </button>
                <button onClick={() => handleDelete(employee.id)} className="icon-button">
                  <FaTrash className="icon delete-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  {/* Modal for updating employee */}
  <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal" overlayClassName="overlay">
        <h2>Update Employee</h2>
        <div className="update-form">
          <input
            type="text"
            name="first_name"
            value={updatedEmployee.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="last_name"
            value={updatedEmployee.last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={updatedEmployee.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="position"
            value={updatedEmployee.position}
            onChange={handleChange}
            placeholder="Position"
          />
          <input
            type="number"
            name="salary"
            value={updatedEmployee.salary}
            onChange={handleChange}
            placeholder="Salary"
          />
          <input
            type="number"
            name="department_id"
            value={updatedEmployee.department_id}
            onChange={handleChange}
            placeholder="Department ID"
          />
          <div className="modal-buttons">
            <button className="save-button" onClick={() => handleUpdateSubmit(updatedEmployee.id)}>Save</button>
            <button className="cancel-button" onClick={() => setModalIsOpen(false)}>Cancel</button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default EmployeeList;
