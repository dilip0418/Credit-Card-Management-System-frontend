// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute, PublicRoute } from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUpForm from './pages/SignUp';
import Dashboard from './components/Dashboard';
import NotFound from './pages/NotFound'; // Create a NotFound component
import ContactForm from './components/common/Contact';
import Profile from './components/Profile';
import RoleManagement from './components/RoleManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Public Routes (only for non-logged in users) */}
            <Route element={<PublicRoute />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUpForm />} />
            </Route>
            <Route path="/contact" element={<ContactForm />} />
            {/* Private Routes (only for logged-in users) */}
            <Route element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              {/* Add other private routes here */}
              <Route path="/profile" element={<Profile />} />
              <Route path="role-management" element={<RoleManagement />} />
            </Route>
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;