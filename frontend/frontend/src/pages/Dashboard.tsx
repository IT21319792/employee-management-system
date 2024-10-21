import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [adminData, setAdminData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect if not logged in
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
          setAdminData(data); 
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

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {adminData ? (
        <div>
          <p className="mb-4"><strong>ID:</strong> {adminData.id}</p>
          <p className="mb-4"><strong>Name:</strong> {adminData.name}</p>
          <p className="mb-4"><strong>Email:</strong> {adminData.email}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading admin data...</p>
      )}
    </div>
  );
};

export default Dashboard;
