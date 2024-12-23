import AuthService from './authService';
import axiosInstance from './axiosInstance';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuthContext';

const GetUserRole = () => {
    const { user } = useAuth();
    return user.role;
}

const UserProfileService = {
    // Fetch user response
    getUserResponse: async (userId) => {
        try {
            const response = await axiosInstance.get(`/auth/${userId}`);
            if (response.data?.success) {
                return response.data.data; // Parsed UserResponse
            } else {
                toast.error(response.data?.message || 'Failed to fetch user data');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user response:', error);
            toast.error('Unable to fetch user data. Please try again later.');
            return null;
        }
    },

    // Fetch personal details
    getPersonalDetails: async (userId) => {
        try {
            const response = await axiosInstance.get(`/personalDetails/${userId}`);
            if (response.status === 204) {
                if (GetUserRole() != 'Admin')
                    toast.warn('No personal details found. Please complete your profile.');
                return null;
            }
            if (response.data?.success) {
                return response.data.data; // Parsed PersonalDetailsResponse
            } else {
                toast.warn(response.message || 'Incomplete Profile');
                return null;
            }
        } catch (error) {
            console.error('Error fetching personal details:', error);
            toast.error('Unable to fetch personal details. Please try again later.');
            return null;
        }
    },

    fetchStates: async () => {
        try {
            const response = await axiosInstance.get(`/state-city/states`);
            if (response.status == 204) {
                toast('No states found');
                return [];
            }
            if (response.data?.success) {
                // console.log(response.data.data);
                const states = response.data.data;
                // console.log('States:', states, 'Type:', typeof states, 'Is Array:', Array.isArray(states));
                return states;
            } else {
                toast.error(response.message || 'Failed to fetch states');
                return [];
            }
        } catch (error) {
            console.error('Error fetching states:', error);
            toast.error('Unable to fetch states. Please try again later.');
            return [];
        }
    },

    fetchCities: async (stateId) => {
        try {
            const response = await axiosInstance.get(`/state-city/cities?stateId=${stateId}`);
            if (response.status == 204) {
                toast(response.message);
                return [];
            }
            if (response.data?.success) {
                return response.data.data;
            } else {
                toast.error(response.message || 'Failed to fetch cities');
                return [];
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
            toast.error('Unable to fetch cities. Please try again later.');
            return [];
        }
    },

    fetchEmploymentStatuses: async () => {
        try {
            const response = await axiosInstance.get("/personalDetails/empStatus");
            if (response.status == 204) {
                toast.error(response.data?.message);
                return [];
            } else if (response.data?.success) {
                return response.data.data;
            }
        } catch (error) {
            console.log('Error fetching Employment Statuses', error);
            toast.error('Unable to fetch Employment statuses. Please try again later.')
            return [];
        }
    },

    updatePersonalDetails: async (updatedProfile) => {
        try {
            const response = await axiosInstance.put(`/personalDetails/update`, updatedProfile);
            if (response.data?.success) {
                return response.data;
            } else {
                toast('Failed to update profile details');
            }
        } catch (error) {
            toast('Failed to update profile details. Try after some time.', error);
            return null;
        }
    },

    createPersonalDetails: async (data) => {
        try {
            // console.log(data);
            const response = await axiosInstance.post('/personalDetails/create', data);
            return response.data;
        } catch (error) {
            toast.error('Failed to create profile');
            throw error;
        }
    },
};

export default UserProfileService;