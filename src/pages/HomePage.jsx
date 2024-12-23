import React from 'react';
import {
    CreditCard,
    BarChart2,
    Star,
    Users,
    CheckCircle,
    TrendingUp
} from 'lucide-react';
import '../styles/HomePage.css'; // Import custom CSS

const HomePage = () => {
    return (
        <div className="bg-light">
            {/* Hero Section */}
            <div className="container-fluid bg-primary bg-opacity-10 py-5">
                <div className="container text-center py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <h1 className="display-4 fw-bold text-dark mb-4">
                                Elevate Your Financial Journey
                            </h1>
                            <p className="lead text-muted mb-5">
                                Smart credit management and personalized financial insights at your fingertips
                            </p>
                            <div className="d-flex justify-content-center gap-3">
                                <a href="/signup" className="btn btn-primary btn-lg shadow-sm rounded-pill">
                                    Get Started
                                </a>
                                <a href="/login" className="btn btn-outline-primary btn-lg rounded-pill">
                                    Log In
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container py-5">
                <h2 className="text-center mb-5 fw-bold">Why Choose Our Platform</h2>
                <div className="row g-4">
                    {[
                        {
                            icon: <CreditCard className="text-primary mb-3" size={48} />,
                            title: "Seamless Applications",
                            description: "Apply for credit cards with a streamlined, user-friendly process that saves you time and reduces complexity."
                        },
                        {
                            icon: <BarChart2 className="text-success mb-3" size={48} />,
                            title: "Credit Insights",
                            description: "Get real-time credit score tracking, personalized recommendations, and comprehensive financial health monitoring."
                        },
                        {
                            icon: <Star className="text-warning mb-3" size={48} />,
                            title: "Exclusive Rewards",
                            description: "Access premium rewards, cashback offers, and tailored financial benefits with every transaction."
                        }
                    ].map((feature, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card h-100 border-0 text-center p-4 shadow-sm hover-shadow">
                                <div className="d-flex justify-content-center mb-3">
                                    {feature.icon}
                                </div>
                                <h3 className="h5 fw-bold mb-3">{feature.title}</h3>
                                <p className="text-muted">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Proof Section */}
            <div className="container py-5">
                <div className="row align-items-center g-5">
                    <div className="col-md-6">
                        <h2 className="mb-4 fw-bold">Trusted by Thousands</h2>
                        <div className="d-flex align-items-center mb-4">
                            <Users className="text-primary me-3" size={48} />
                            <div>
                                <h4 className="mb-1">50,000+ Active Users</h4>
                                <p className="text-muted">Growing community of financial empowerment</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <TrendingUp className="text-success me-3" size={48} />
                            <div>
                                <h4 className="mb-1">98% User Satisfaction</h4>
                                <p className="text-muted">Consistently delivering exceptional experience</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="bg-light p-4 rounded-3 shadow-sm testimonial-box">
                            <blockquote className="blockquote mb-4">
                                <p className="fst-italic text-dark">
                                    &quot;This platform has completely transformed how I manage my financial health. The insights are invaluable!&quot;
                                </p>
                            </blockquote>
                            <div className="d-flex align-items-center">
                                <div className="bg-primary rounded-circle me-3" style={{ width: '48px', height: '48px' }}></div>
                                <div>
                                    <p className="mb-0 fw-bold">Sarah Thompson</p>
                                    <small className="text-muted">Senior Marketing Manager</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-secondary text-white py-5">
                <div className="container text-center">
                    <h2 className="display-5 fw-bold mb-4">Take Control of Your Financial Future</h2>
                    <p className="lead mb-5 px-md-5">Join our platform and unlock personalized financial insights, seamless credit management, and exclusive rewards.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <a href="/signup" className="btn btn-light btn-lg d-flex align-items-center rounded-pill">
                            <CheckCircle className="me-2" /> Sign Up Now
                        </a>
                        <a href="/login" className="btn btn-outline-light btn-lg rounded-pill">Log In</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;