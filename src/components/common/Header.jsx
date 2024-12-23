import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import { useAuth } from '../../context/useAuthContext'; // Import AuthContext
import logo from '../../assets/logo.png';

const Header = () => {
    const { isLoggedIn, logOut, profile } = useAuth(); // Get login state and logout function
    const [isNavOpen, setIsNavOpen] = useState(false); // State for mobile nav toggle
    const navRef = useRef(); // Reference for the mobile nav
    const toggleButtonRef = useRef(); // Reference for the toggle button

    // Close the nav when clicking outside the menu or toggle button
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target) && !toggleButtonRef.current.contains(event.target)) {
                setIsNavOpen(false); // Close the nav if clicked outside
            }
        };

        // Add event listener for click outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="container-fluid d-flex justify-content-between align-items-center py-2 shadow-sm" style={{ backgroundColor: '#34495e' }}>
            {/* App Logo/Name */}
            <div className="d-flex align-items-center">
                <a href="/">
                    <img src={logo} alt="MyApp Logo" className="logo" style={{ width: '65px', height: '65px', marginRight: '10px' }} />
                </a>
            </div>

            {/* Navigation */}
            <div className="d-none d-md-flex">
                <Link to="/contact" className="btn btn-light">Contact</Link>
                {isLoggedIn ? (
                    // Links for logged-in users
                    <>

                        <button onClick={logOut} className="btn btn-danger mx-2">Logout</button>
                        <Link to="/profile" className="btn btn-light rounded-circle p-2 mx-2 d-flex align-items-center justify-content-center" style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#f0f0f0',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                        }}>
                            {/* Display first letter of user's name or email */}
                            {profile?.fullname?.[0] || profile?.userEmail?.[0] || 'P'}
                        </Link>
                    </>
                ) : (
                    // Links for non-logged-in users
                    <>
                        <Link to="/login" className="btn btn-light mx-2">Login</Link>
                        <Link to="/signup" className="btn btn-light mx-2">Sign Up</Link>
                    </>
                )}
            </div>

            {/* Mobile Navigation Toggle */}
            <button
                ref={toggleButtonRef}
                className="d-md-none btn btn-light"
                onClick={() => setIsNavOpen(!isNavOpen)}
            >
                <i className={`fas ${isNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>

            {/* Mobile Nav Menu (Side Menu) */}
            {isNavOpen && (
                <div
                    ref={navRef}
                    className="d-md-none w-75 position-absolute top-0 start-0 bg-dark text-white p-3"
                    style={{
                        zIndex: 100,
                        height: '100vh',
                        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease', // Smooth transition for sliding and opacity
                        transform: isNavOpen ? 'translateX(0)' : 'translateX(-100%)', // Slide in/out effect
                        opacity: isNavOpen ? '1' : '0', // Fade effect when opening/closing
                    }}
                >
                    {isLoggedIn ? (
                        <>
                            <Link to="/contact" className="btn btn-light w-100 my-2">Contact</Link>
                            <button onClick={logOut} className="btn btn-danger w-100 my-2">Logout</button>
                            <Link to="/profile" className="btn btn-light rounded-circle p-2 mx-2 d-flex align-items-center justify-content-center" style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#f0f0f0',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                            }}>
                                {/* Display first letter of user's name or email */}
                                {profile?.fullname?.[0] || profile?.userEmail?.[0] || 'P'}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-light w-100 my-2">Login</Link>
                            <Link to="/signup" className="btn btn-light w-100 my-2">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;