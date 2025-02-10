import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './AdminPage';
import UserDashboard from './UserPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import IndexPage from './IndexPage';


const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role === 'admin' && userRole !== 'admin') {
    return <Navigate to="/login" />;
  }

  if (role === 'user' && userRole !== 'user') {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<IndexPage/>} />
        <Route path="/signup" element={<SignupPage />} />
      
      </Routes>
    </Router>
  );
};

export default App;