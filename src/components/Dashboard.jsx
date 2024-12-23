import React from 'react'
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import { useAuth } from '../context/useAuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            {user.role === 'Admin' ? (
                <AdminDashboard />
            ) : (
                <UserDashboard />
            )}
        </div>
    );
};

export default Dashboard;