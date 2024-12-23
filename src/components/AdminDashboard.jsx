import React, { useState } from 'react';
import ApplicationsTab from './ApplicationsTab';
import UserListTab from './UserListTab';
import '../styles/AdminDashboard.css'; // Import the CSS file with styles

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('Applications');

    return (
        <div className="dashboard-container">
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'Applications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Applications')}
                >
                    Applications
                </button>
                <button
                    className={`tab-button ${activeTab === 'Users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Users')}
                >
                    Users
                </button>
            </div>

            <div className="table-container p-5" style={{ overflowX: 'auto' }}>
                {activeTab === 'Applications' && <ApplicationsTab />}
                {activeTab === 'Users' && <UserListTab />}
            </div>
        </div >
    );
};

export default AdminDashboard;
