import { toast } from 'react-toastify';
import axiosInstance from './axiosInstance';

const CreditCardApplicationsService = {
    getAllApplicationsPaged: async (params) => {
        try {
            // Remove empty, null, or undefined fields from the params, but keep `0`
            const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {});

            // Add default pagination if not already provided
            if (!filteredParams.pageNumber) filteredParams.pageNumber = 1;
            if (!filteredParams.pageSize) filteredParams.pageSize = 10;

            // If applicationStatusId is 0 (All), it should not be included in the payload
            if (filteredParams.applicationStatusId == 0) {
                delete filteredParams.applicationStatusId;
            }

            console.log(filteredParams);
            const response = await axiosInstance.post('/creditCardApplications/filter', filteredParams);

            if (response.data?.numOfRecords > 0) {
                console.log(response.data);
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            toast.error('Failed to fetch applications', error.message);
            throw error;
        }
    },

    getUserCreditCardStatuses: async (pageNumber, pageSize) => {
        try {
            const response = await axiosInstance.get(
                `/personalDetails/user-card-status?pageNumber=${pageNumber}&pageSize=${pageSize}`
            );
            if (response) {
                // console.log(response);
                return response.data;
            }
            return {}
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateApplicationStatus: async (id, status, comments) => {
        try {
            const response = await axiosInstance.post('/creditCardApplications/update-status', {
                Id: id,
                Status: status,
                Comments: comments,
            });
            return response.data;
        } catch (error) {
            toast.error('Failed to update the applicaiton');
            throw error;
        }
    },

    createApplication: async (data) => {
        try {
            console.log(data);
            const response = await axiosInstance.post(
                "/creditCardApplications/create",
                data
            );
            console.log(response);

            if (response.data.success) {
                return response.data.data;
            } else {
                toast.error(response.data.errors[0] || "Failed to submit application");
                return null;
            }
        } catch (error) {
            console.error("Error submitting credit card application:", error);
            toast.error("An error occurred. Please try again later.");
            return null;
        }
    },
};

export default CreditCardApplicationsService;