import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImage from './assets/signup-image.png'; 
import Swal from 'sweetalert2';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
  
      if (res.ok) {
        localStorage.setItem('token', data.token); // Save token to local storage
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful',
          toast: true,
          position: 'top-end',
          text: 'You can now log in!',
          confirmButtonText: 'Okay',
        });
        navigate('/login'); 
      } else {
        setError(data.msg || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred while signing up');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* <div className="hidden lg:block lg:w-1/2">
        <img src={signupImage} alt="Signup Illustration" className="object-cover h-full" />
      </div> */}
      <div className="max-w-md w-full mx-auto p-8 shadow-lg rounded-lg bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already have an account? 
            <a href="/login" className="text-blue-500 hover:underline"> Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
