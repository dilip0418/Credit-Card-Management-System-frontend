import { jwtDecode } from 'jwt-decode';
import axiosInstance from './axiosInstance';
import { toast } from 'react-toastify';
import UserProfileService from './UserProfileService';


const AuthService = {
    signIn: async (email, password) => {
        try {
            // Step 1: Call the authentication API
            const response = await axiosInstance.post('/auth/signin', { email, password });
            const { token, id } = response.data;

            // Step 2: Store token and user ID in localStorage
            localStorage.setItem('authData', JSON.stringify({ token, id }));

            // Step 3: Fetch minimal user data
            const userResponse = await UserProfileService.getUserResponse(id);
            var details = AuthService.getUserDetails();
            if (details.role != 'Admin') {
                // Step 4: Check profile completion
                if (userResponse && !userResponse.isProfileComplete) {
                    toast.info('Your profile is incomplete. Please complete your profile to access full features.');
                }
            }
            // Step 5: Return result for further handling
            return {
                success: true,
                id,
                token,
                userResponse,
            };
        } catch (err) {
            // Handle authentication errors
            // toast.error(err.response?.data?.message || 'Invalid email or password');
            return {
                success: false,
                message: err.response?.data?.message || 'Login failed',
            };
        }
    },

    signUp: async (fullname, email, password) => {
        try {
            const { id, message } = await axiosInstance.post('/auth/signup', { fullname, email, password });
            return { success: true, id, message, info: 'Registration successful. Please check your email for activation.' };
        } catch (error) {
            // Return error details
            return { success: false, message: error.response?.data || 'Registration failed' };
        }
    },

    logOut: () => {
        // Clear localStorage for authentication data
        localStorage.removeItem('authData');
    },

    getToken: () => {
        // Retrieve token from localStorage
        const authData = JSON.parse(localStorage.getItem('authData'));
        return authData?.token || null;
    },

    getUserId: () => {
        // Retrieve user ID from localStorage
        const authData = JSON.parse(localStorage.getItem('authData'));
        return authData?.id || null;
    },

    getUserDetails: () => {
        const token = AuthService.getToken();
        if (token) {
            const decoded = jwtDecode(token);
            return {
                id: decoded.UserID,
                role: decoded.role || null,
                email: decoded.email || null,
            };
        }
        return null;
    },
};

export default AuthService;
