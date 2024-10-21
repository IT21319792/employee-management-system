import React, { useState } from 'react';

interface EmployeeFormProps {
  onSubmit: (formData: any) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    department_id: ''
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    department_id: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      first_name: '',
      last_name: '',
      email: '',
      position: '',
      salary: '',
      department_id: ''
    };

    if (formData.first_name.length < 2) {
      newErrors.first_name = 'First name must be at least 2 characters long';
      valid = false;
    }

    if (formData.last_name.length < 2) {
      newErrors.last_name = 'Last name must be at least 2 characters long';
      valid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (formData.position.length < 3) {
      newErrors.position = 'Position must be at least 3 characters long';
      valid = false;
    }

    if (parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
      valid = false;
    }

    if (parseInt(formData.department_id) <= 0) {
      newErrors.department_id = 'Department ID must be a positive integer';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Name */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Position */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
      </div>

      {/* Salary */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Salary</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
      </div>

      {/* Department ID */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Department ID</label>
        <input
          type="number"
          name="department_id"
          value={formData.department_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.department_id && <p className="text-red-500 text-sm">{errors.department_id}</p>}
      </div>

      {/* Submit Button */}
      <div className="text-center col-span-1 md:col-span-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none w-full"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
