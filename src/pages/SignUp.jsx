import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Mail,
    Lock,
    LogIn,
    ArrowRight,
    Github,
    Send
} from 'lucide-react';

const SignUpForm = () => {
    const navigate = useNavigate();
    const [signUpError, setSignUpError] = useState(null);

    // Define the validation schema using Yup
    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('Full Name is required')
            .min(3, 'Full Name must be at least 3 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
            .matches(/[0-9]/, 'Password must include at least one number'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    // Initialize react-hook-form with Yup schema
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // Handle form submission
    const onSubmit = async (data) => {
        setSignUpError(null);

        try {
            const response = await AuthService.signUp(data.fullname, data.email, data.password);

            if (response.success) {
                toast.success('An email is sent for account activation');
                navigate('/Login');
            } else {
                setSignUpError(response.info || 'Sign up failed');
                toast.error(response.info);
            }
        } catch (error) {
            console.error('Sign Up Error:', error);
            setSignUpError("Unknown error occurred");
            toast.error("Sign up failed");
        }
    };

    return (
        <div className="signup-page d-flex align-items-center">
            <div className="container">
                <div className="row g-0 overflow-hidden shadow-lg rounded-5">
                    {/* Left Side - Visual Section */}
                    <div
                        className="col-md-6 px-5 bg-primary text-white d-none d-md-flex flex-column justify-content-center"
                        style={{
                            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            minHeight: '700px'
                        }}
                    >
                        <h3 className="fw-bold mb-4">Create Your Account</h3>
                        <p className="lead mb-3 text-white-50">
                            Join our platform and unlock a world of possibilities.
                        </p>
                        <div className="signup-features">
                            <div className="d-flex align-items-center mb-3">
                                <ArrowRight className="me-2 text-white-50" />
                                <span>Instant Account Activation</span>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <ArrowRight className="me-2 text-white-50" />
                                <span>Secure Registration Process</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <ArrowRight className="me-2 text-white-50" />
                                <span>Personalized User Experience</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - SignUp Form */}
                    <div className="col-md-6 px-3 bg-white d-flex flex-column justify-content-center">
                        <div className="signup-form-wrapper">
                            <div className="text-center mb-5">
                                <LogIn size={48} className="text-primary mb-3" />
                                <h4 className="fw-bold text-primary">Create New Account</h4>
                                <p className="text-muted">Enter your details to get started</p>
                            </div>

                            {signUpError && (
                                <div className="alert alert-danger d-flex align-items-center" role="alert">
                                    <Send size={20} className="me-2" />
                                    {signUpError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* Full Name Field */}
                                <div className="mb-4 position-relative">
                                    <User
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        {...register('fullname')}
                                        className={`form-control form-control-lg ps-5 ${errors.fullname ? 'is-invalid' : ''}`}
                                    />
                                    {errors.fullname && (
                                        <div className="invalid-feedback">
                                            {errors.fullname.message}
                                        </div>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="mb-4 position-relative">
                                    <Mail
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                                        size={20}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        {...register('email')}
                                        className={`form-control form-control-lg ps-5 ${errors.email ? 'is-invalid' : ''}`}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="mb-4 position-relative">
                                    <Lock
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                                        size={20}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        {...register('password')}
                                        className={`form-control form-control-lg ps-5 ${errors.password ? 'is-invalid' : ''}`}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div className="mb-4 position-relative">
                                    <Lock
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                                        size={20}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        {...register('confirmPassword')}
                                        className={`form-control form-control-lg ps-5 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    />
                                    {errors.confirmPassword && (
                                        <div className="invalid-feedback">
                                            {errors.confirmPassword.message}
                                        </div>
                                    )}
                                </div>


                                {/* Submit Button */}
                                <button
                                    className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Signing up...' : 'Create Account'}
                                    <ArrowRight className="ms-2" size={20} />
                                </button>


                                {/* Login Link */}
                                <div className="text-center mt-4">
                                    <p className="text-muted">
                                        Already have an account?
                                        <a href="/login" className="text-primary ms-2">Login</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;