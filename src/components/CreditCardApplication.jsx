// CreditCardApplicationCTA.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CreditCardApplicationsService from "../services/creditCardApplicationsService";
import { toast } from "react-toastify";
import "../styles/CreditCardApplication.css";
import { useAuth } from "../context/useAuthContext";

// Validation schema
const validationSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("Full Name is required")
        .min(3, "Full Name must be at least 3 characters"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    phoneNo: yup
        .string()
        .required("Phone Number is required")
        .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    annualIncome: yup
        .number()
        .required("Annual Income is required")
        .positive("Income must be greater than 0")
        .typeError("Please enter a valid number"),
});

const CreditCardApplication = () => {
    const { user } = useAuth();
    const [showForm, setShowForm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        data.applicantId = user.id; // adding currently logged in user's id
        const response = await CreditCardApplicationsService.createApplication(data);
        if (response) {
            toast.success("Application submitted successfully!");
            reset();
            window.location.reload(); // to fetch the application status.
            setShowForm(false); // Return to CTA after successful submission
        }
    };

    return (
        <div className="credit-card-application">
            {!showForm && (
                <div className="cta-card">
                    <h2>No Credit Card?</h2>
                    <p>Apply now and get your credit card in just a few clicks!</p>
                    <button onClick={() => setShowForm(true)} className="btn btn-primary">
                        Apply Now
                    </button>
                </div>
            )}

            {showForm && (
                <div className="form-container">
                    <h3>Credit Card Application Form</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                {...register("fullName")}
                                placeholder="Enter your full name"
                                className={errors.fullName ? "error" : ""}
                            />
                            {errors.fullName && (
                                <p className="error-message">{errors.fullName.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Enter your email"
                                className={errors.email ? "error" : ""}
                            />
                            {errors.email && (
                                <p className="error-message">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                {...register("phoneNo")}
                                placeholder="Enter your phone number"
                                className={errors.phoneNo ? "error" : ""}
                            />
                            {errors.phoneNo && (
                                <p className="error-message">{errors.phoneNo.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Annual Income</label>
                            <input
                                type="number"
                                {...register("annualIncome")}
                                placeholder="Enter your annual income"
                                className={errors.annualIncome ? "error" : ""}
                            />
                            {errors.annualIncome && (
                                <p className="error-message">{errors.annualIncome.message}</p>
                            )}
                        </div>

                        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreditCardApplication;
