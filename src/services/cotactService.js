// ContactService.js
import axiosInstance from "./axiosInstance";

const ContactService = {
    sendMessageFromUser: async (formData) => {
        try {
            // Make the API request using axiosInstance
            const response = await axiosInstance.post("/contact", formData);

            // Parse the generic response structure
            const { success, data, errors } = response.data;

            if (success) {
                // Return the success message from the response
                return { success: true, message: data };
            } else {
                // Handle known errors returned from the backend
                return {
                    success: false,
                    message: errors[0],
                };
            }
        } catch (error) {
            console.error("Error sending message:", error);

            // Handle network or unexpected errors
            const errorMessage =
                error.response?.data?.message || "An error occurred. Please try again later.";
            return { success: false, message: errorMessage, errors: error.response?.data?.errors || [] };
        }
    },
    sendMailFromAdmin: async ({ email, subject, content }) => {

        try {
            const mailData = { name: 'CCMS', email: email, subject: subject, body: content }
            const response = await axiosInstance.post("/advertise", mailData);
            const { success, data, errors } = response.data;

            if (success) {
                // Return the success message from the response
                return { success: true, message: data };
            } else {
                // Handle known errors returned from the backend
                return {
                    success: false,
                    message: errors[0],
                };
            }
        } catch (error) {
            console.error("Error sending message:", error);

            // Handle network or unexpected errors
            const errorMessage =
                error.response?.data?.message || "An error occurred. Please try again later.";
            return { success: false, message: errorMessage, errors: error.response?.data?.errors || [] };
        }
    }

};

export default ContactService;
