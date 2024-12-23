import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaHome, FaCog, FaUser, FaUserShield } from 'react-icons/fa'; // Icons for sidebar items
import { Link } from 'react-router-dom'; // Link for routing
// import 'react-pro-sidebar/dist/css/styles.css'; // Sidebar styles
import { useAuth } from '../../context/useAuthContext'; // Auth context

const CustomSidebar = () => {
    const [collapsed, setCollapsed] = useState(true); // State for collapsibility
    const { isLoggedIn, user } = useAuth(); // Get login state

    return (
        <div className='w-1'>
            <Sidebar className='h-100'
                style={{
                    background: '#343a40',
                    color: 'black',
                }}
                collapsed={collapsed}>
                <button onClick={() => setCollapsed(!collapsed)} className="btn btn-dark mt-2">
                    {collapsed ? '🍔' : '❌'}
                </button>
                <Menu iconShape="circle">
                    {isLoggedIn ? (
                        <>
                            {/* Sidebar links for logged-in users */}
                            <MenuItem icon={<FaHome />} component={<Link to="/dashboard" />}>
                                Dashboard
                            </MenuItem>
                            {/* Add Role Management for Admins */}
                            {user.role === 'Admin' && (
                                <MenuItem icon={<FaUserShield />} component={<Link to="/role-management" />}>
                                    Role Management
                                </MenuItem>
                            )}
                            <SubMenu title='Settings' icon={<FaCog />}>
                                <MenuItem icon={<FaUser />} component={<Link to="/profile" />}>Profile</MenuItem>
                                <MenuItem >Notifications</MenuItem>
                            </SubMenu>
                        </>
                    ) : (
                        // Static sidebar item for non-logged-in users
                        <MenuItem>About the App</MenuItem>
                    )}
                </Menu>
            </Sidebar>
            {/* Button to toggle collapse */}

        </div>
    );
};

export default CustomSidebar;
