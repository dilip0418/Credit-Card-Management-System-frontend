import axiosInstance from './axiosInstance';

const CreditCardService = {
    getCreditCardDetails: async (userId) => {
        try {
            const response = await axiosInstance.get(`/creditCards/user-card/${userId}`);
            return response.data.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    getCreditCardStatus: async (userId) => {
        try {
            const response = await axiosInstance.get(`/personalDetails/card-status/${userId}`);
            return response.data.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    },

};

export default CreditCardService;