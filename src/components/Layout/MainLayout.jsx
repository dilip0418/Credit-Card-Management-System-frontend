import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Header from '../common/Header';
import CustomSidebar from '../common/Sidebar';
import { useAuth } from '../../context/useAuthContext';
import Advertisement from '../common/Advertisement';
import Footer from '../common/Footer';
import '../../styles/MainLayout.css';

const MainLayout = () => {
    const { isLoggedIn } = useAuth(); // Check if the user is logged in

    return (
        <div className="d-flex flex-column vh-100">
            {/* Header */}
            <header className="row text-white px-3" style={{ backgroundColor: '#34495e' }}>
                <Header />
            </header>

            {/* Main Content */}
            <div className="row flex-grow-1">
                {/* Sidebar + Main Content */}
                <div className="col-lg-9 d-flex flex-column">
                    {isLoggedIn ? (
                        <div className="d-flex h-100">
                            <CustomSidebar />
                            <main className="flex-grow-1 pb-4 px-4 overflow-auto">
                                <Outlet /> {/* Dynamic child content */}
                            </main>
                        </div>
                    ) : (
                        <main className="flex-grow-1 px-4 overflow-hidden">
                            <Outlet /> {/* Public landing page */}
                        </main>
                    )}
                </div>

                {/* Advertisement */}
                <aside className="col-lg-3 bg-light p-4 overflow-auto" style={{ maxHeight: '100vh' }}>
                    <Advertisement />
                </aside>
            </div>

            {/* Footer */}
            <footer className="row bg-dark text-white text-center py-3">
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;
