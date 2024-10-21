import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EmployeeForm from '../components/EmployeeForm';
import { createEmployee } from '../services/employeeService';
import EmployeeList from '../components/EmployeeList';
import DepartmentTable from '../components/DepartmentTable';
import Swal from 'sweetalert2';

const Home: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    }

    const fetchAdminData = async () => {
      try {
        const res = await fetch('http://localhost:3000/auth/admin', {
          method: 'GET',
          headers: {
            'x-auth-token': token || '',
          },
        });
        const data = await res.json();

        if (res.ok) {
          setAdminData(data); // Set admin data on successful response
        } else {
          setError(data.msg || 'Failed to fetch admin data');
        }
      } catch (err) {
        setError('An error occurred while fetching admin data');
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      await createEmployee(formData);
      console.log('Employee Data Submitted:', formData);
  
      // Success alert
      await Swal.fire({
        title: 'Success!',
        text: 'Employee added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      setSuccess('Employee added successfully!');
      setError(null);
    } catch (error) {
      console.error('Error adding employee:', error);
  
      // Error alert
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to add employee',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
  
      setError('Failed to add employee');
      setSuccess(null);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="bg-amber-50 min-h-screen py-10 px-4">
        {/* Display admin details if available */}
        {adminData && (
          <div className="bg-white shadow-lg rounded-lg p-4 mb-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold">Admin Details</h2>
            <p><strong>Name:</strong> {adminData.name}</p>
            <p><strong>Email:</strong> {adminData.email}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}

        {/* Main flex container  */}
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form Section */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> {success}</span>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}
            <EmployeeForm onSubmit={handleFormSubmit} />
          </div>

          {/* Employee List Section */}
          <div className="bg-white shadow-lg rounded-lg w-fit">
            <EmployeeList />
          </div>

          {/* Department Table Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <DepartmentTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
