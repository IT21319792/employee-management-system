// src/App.tsx
import React from 'react';
import Home from './pages/Home'; // Import your Home page
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect all unknown routes to login */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
