import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL, // Replace with your backend base URL
    timeout: 10000, // Request timeout (optional)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptors for requests (e.g., adding a token)
axiosInstance.interceptors.request.use(
    (config) => {
        // Skip adding Authorization for specific endpoints
        const excludeAuthRoutes = ['/auth/signin', '/auth/signup'];
        if (!excludeAuthRoutes.includes(config.url)) {
            const authDataString = localStorage.getItem('authData'); // Fetch the entire authData object
            if (authDataString) {
                const { token } = JSON.parse(authDataString); // Extract the token
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
                }
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// Add interceptors for responses (e.g., error handling)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            toast.warn('Un Authorized 🤚')
            // Handle unauthorized errors (e.g., redirect to login)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
