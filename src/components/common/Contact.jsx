import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
    User,
    Mail,
    MessageSquare,
    Send,
    Info
} from 'lucide-react';
import ContactService from "../../services/cotactService";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/ContactForm.css";

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Submit handler
    const onSubmit = async (data) => {
        try {
            const result = await ContactService.sendMessageFromUser(data);

            if (result.success) {
                toast.success(result.message || "Message sent successfully!");
                reset();
            } else {
                toast.error(result.message || "Failed to send the message.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-0">
                {/* Contact Form Section */}
                <div className="col-lg-7 bg-light p-5">
                    <div className="contact-form-wrapper">
                        <h2 className="mb-4 text-primary fw-bold">
                            <MessageSquare className="me-2 text-primary" size={32} />
                            Get In Touch
                        </h2>
                        <p className="text-muted mb-4">
                            Have a question or want to work together? Fill out the form below.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3 position-relative">
                                <User className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" size={20} />
                                <input
                                    type="text"
                                    className={`form-control ps-5 ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Your Name"
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        <Info size={16} className="me-1" /> {errors.name.message}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3 position-relative">
                                <Mail className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" size={20} />
                                <input
                                    type="email"
                                    className={`form-control ps-5 ${errors.email ? 'is-invalid' : ''}`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    placeholder="Your Email"
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">
                                        <Info size={16} className="me-1" /> {errors.email.message}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3 position-relative">
                                <MessageSquare className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" size={20} />
                                <input
                                    type="text"
                                    className={`form-control ps-5 ${errors.subject ? 'is-invalid' : ''}`}
                                    {...register("subject", { required: "Subject is required" })}
                                    placeholder="Subject"
                                />
                                {errors.subject && (
                                    <div className="invalid-feedback">
                                        <Info size={16} className="me-1" /> {errors.subject.message}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3 position-relative">
                                <textarea
                                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                    {...register("message", {
                                        required: "Message is required",
                                        minLength: {
                                            value: 10,
                                            message: "Message must be at least 10 characters long",
                                        },
                                    })}
                                    placeholder="Your Message"
                                    rows="5"
                                ></textarea>
                                {errors.message && (
                                    <div className="invalid-feedback">
                                        <Info size={16} className="me-1" /> {errors.message.message}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary d-flex align-items-center justify-content-center"
                            >
                                Send Message <Send className="ms-2" size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div
                    className="col-lg-5 bg-primary text-white d-flex flex-column justify-content-center p-5"
                    style={{
                        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        minHeight: '600px'
                    }}
                >
                    <div className="contact-info">
                        <h3 className="mb-4 fw-bold">Contact Information</h3>
                        <div className="mb-3">
                            <h5 className="mb-1">Address</h5>
                            <p className="text-light opacity-75">
                                123 Business Street, City, Country
                            </p>
                        </div>
                        <div className="mb-3">
                            <h5 className="mb-1">Phone</h5>
                            <p className="text-light opacity-75">
                                +1 (555) 123-4567
                            </p>
                        </div>
                        <div className="mb-3">
                            <h5 className="mb-1">Email</h5>
                            <p className="text-light opacity-75">
                                contact@yourcompany.com
                            </p>
                        </div>
                        <div className="social-links mt-4">
                            <h5 className="mb-3">Follow Us</h5>
                            <div className="d-flex">
                                {/* Add your social media icons here */}
                                <a href="#" className="text-white me-3">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="text-white me-3">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-white">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;