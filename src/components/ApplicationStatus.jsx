/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { CheckCircle, XCircle, Mail } from "lucide-react"; // Icons for aesthetics
import ContactForm from "../components/common/Contact";
import "../styles/ApplicationStatus.css"; // Add custom CSS styles

const ApplicationStatus = ({ status, comments }) => {
    const [showContactForm, setShowContactForm] = useState(false);

    const handleContactUs = () => {
        setShowContactForm(!showContactForm); // Toggle the form visibility
    };

    return (
        <div className="application-status-card">
            {/* Dynamic Status Content */}
            {status === "Applied" ? (
                <div className="status-content applied">
                    <CheckCircle className="status-icon" size={50} />
                    <h1 className="status-title">Application in Progress</h1>
                    <p className="status-message">
                        Your credit card application is currently being processed.
                    </p>
                    <p className="status-subtext">
                        Please allow 3-5 business days for our team to review your
                        application. We will notify you via email once a decision has been
                        made.
                    </p>
                </div>
            ) : status === "Rejected" ? (
                <div className="status-content rejected">
                    <XCircle className="status-icon" size={50} />
                    <h1 className="status-title">Application Rejected</h1>
                    <p className="status-message">
                        Unfortunately, your application could not be approved.
                    </p>
                    <p className="status-subtext rejection-reason">
                        <strong>Reason:</strong> {comments || "No specific reason provided."}
                    </p>
                </div>
            ) : (
                <div className="status-content unknown">
                    <Mail className="status-icon" size={50} />
                    <h1 className="status-title">Unknown Application Status</h1>
                    <p className="status-message">
                        Please contact support for more details regarding your application.
                    </p>
                </div>
            )}

            {/* Contact Us Section */}
            <div className="contact-section">
                <button className="contact-button" onClick={handleContactUs}>
                    {showContactForm ? "Close Contact Form" : "Contact Us"}
                </button>
                {showContactForm && (
                    <div className="contact-form-wrapper">
                        <ContactForm />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationStatus;
