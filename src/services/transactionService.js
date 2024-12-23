import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

const TransactionService = {
    fetchTransactions: async (filters) => {
        try {
            const user = filters.user;

            // Remove empty, null, or undefined fields from the params, but keep `0`
            const filteredParams = Object.entries(filters).reduce((acc, [key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {});

            // Add default pagination if not already provided
            if (!filteredParams.pageNumber) filteredParams.pageNumber = 1;
            if (!filteredParams.pageSize) filteredParams.pageSize = 10;


            if (user?.role != 'Admin') {
                filteredParams.creditCardId
            }
            const response = await axiosInstance.post('/transactions/filter', filteredParams);
            // console.log(filteredParams);

            if (response.data?.numOfRecords > 0) {
                // console.log(response);
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            toast.error('Failed to fetch transactions', error.message);
            throw error;
        }
    },

    createTransaction: async (transactionData) => {
        try {
            const response = await axiosInstance.post("/transactions/create", transactionData);
            if (response.data.success) {

                return response.data;
            } else {
                toast.warn(response.data.errors[0]);
                return { success: false, error: response.data.errors[0] };;
            }
        } catch (error) {
            console.log(error);
            return { success: false, error: error.data.errors[0] };;
        }
    },

    /**
 * Fetch summary stats for spending by category.
 * @param {string} userId - The user's unique ID.
 * @param {number|null} month - The optional month filter (1-12).
 * @param {number|null} year - The optional year filter (e.g., 2024).
 * @returns {Promise<Object>} - The API response.
 */
    getSummary: async (userId) => {
        try {


            // Make API request
            const response = await axiosInstance.get(`/stats/${userId}/summary`);

            // Return the API response data
            return response.data;
        } catch (error) {
            console.error("Error fetching spending summary:", error);
            // Optionally, you can format or return a custom error object here
            return { success: false, message: "Failed to fetch spending summary" };
        }
    },

    getSpendingByMonth: async (userId, year) => {
        try {
            const response = await axiosInstance.get(`/stats/${userId}/by-month`, { year });
            return response.data;
        } catch (error) {
            console.error("Error fetching spending summary:", error);
            // Optionally, you can format or return a custom error object here
            return { success: false, message: "Failed to fetch spending summary" };
        }
    },

    getByCategory: async (userId, month = null, year = null) => {
        try {
            // Build query parameters
            const params = {};
            if (month) params.month = month;
            if (year) params.year = year;

            const response = await axiosInstance.get(`/stats/${userId}/by-category`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching speding summary:', error);
            toast.warn(error.data.errors[0]);
            return { success: false, message: "Failed to fetch spending summary" }
        }
    }
};

export default TransactionService;