// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuthContext';
import { OrbitProgress } from 'react-loading-indicators';

// Route for authenticated users
export const PrivateRoute = () => {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
        return <div><OrbitProgress /></div>; // Or a spinner
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

// Route for guests (not authenticated)
export const PublicRoute = () => {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner
    }

    return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" replace />;
};