import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuthContext';
import {
    Mail,
    Lock,
    LogIn,
    ArrowRight,
    Send
} from 'lucide-react';
import '../styles/Login.css'

const Login = () => {
    const navigate = useNavigate();
    const { logIn, user } = useAuth();
    const [loginError, setLoginError] = useState(null);

    // Validation schema
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Enter a valid email address'),
        password: Yup.string().required('Password is required'),
    });

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // Handle form submission
    const onSubmit = async (data) => {
        setLoginError(null);

        try {
            const result = await logIn(data.email, data.password);
            if (result.success) {
                toast.success('Login successful!');
                navigate('/dashboard');
            } else {
                toast.warn(result.message);
            }
            return result;
        } catch (error) {
            console.log('Login failed:', error);
            const errorMessage = error?.message || 'A unexpected error occurred.';
            setLoginError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="login-page vh-100 d-flex align-items-center">
            <div className="container">
                <div className="row g-0 overflow-hidden shadow-lg rounded-4">
                    {/* Left Side - Visual Section */}
                    <div
                        className="col-md-6 bg-primary text-white p-5 d-none d-md-flex flex-column justify-content-center"
                        style={{
                            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            minHeight: '600px'
                        }}
                    >
                        <h1 className="display-4 fw-bold mb-4">Welcome Back!</h1>
                        <p className="lead mb-4 text-white-50">
                            Sign in to access your personalized dashboard and continue your journey.
                        </p>
                        <div className="login-features">
                            <div className="d-flex align-items-center mb-3">
                                <ArrowRight className="me-2 text-white-50" />
                                <span>Secure and Fast Login</span>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <ArrowRight className="me-2 text-white-50" />
                                <span>Personalized Experience</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <ArrowRight className="me-2 text-white-50" />
                                <span>Advanced Dashboard</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
                        <div className="login-form-wrapper">
                            <div className="text-center mb-5">
                                <LogIn size={48} className="text-primary mb-3" />
                                <h2 className="fw-bold text-primary">Login to Your Account</h2>
                                <p className="text-muted">Enter your credentials to continue</p>
                            </div>

                            {loginError && (
                                <div className="alert alert-danger d-flex align-items-center" role="alert">
                                    <Send size={20} className="me-2" />
                                    {loginError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                        aria-invalid={!!errors.email}
                                        aria-describedby="email-error"
                                    />
                                    {errors.email && (
                                        <div id="email-error" className="invalid-feedback">
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
                                        aria-invalid={!!errors.password}
                                        aria-describedby="password-error"
                                    />
                                    {errors.password && (
                                        <div id="password-error" className="invalid-feedback">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>

                                {/* Forgot Password & Remember Me
                                // <div className="d-flex justify-content-between mb-4">
                                //     <div className="form-check">
                                //         <input
                                //             type="checkbox"
                                //             className="form-check-input"
                                //             id="rememberMe"
                                //         />
                                //         <label className="form-check-label" htmlFor="rememberMe">
                                //             Remember me
                                //         </label>
                                //     </div>
                                //     <a href="#" className="text-primary text-decoration-none">
                                //         Forgot Password?
                                //     </a>
                                // </div> */}

                                {/* Submit Button */}
                                <button
                                    className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                    <ArrowRight className="ms-2" size={20} />
                                </button>

                                {/* Sign Up Link */}
                                <div className="text-center mt-4">
                                    <p className="text-muted">
                                        Don&apos;t have an account?
                                        <a href="/signup" className="text-primary ms-2">Sign Up</a>
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

export default Login;