/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import CreditCardService from "../services/creditCardService.js";
import TransactionService from "../services/transactionService.js";
import TransactionModal from "./TransactionModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { TRANSACTION_TYPES, CATEGORIES } from '../constants/TransactionConstants.js'
import { Mosaic } from "react-loading-indicators";
import { toast } from "react-toastify";



const CreditCardDetails = ({ userId }) => {
    const [creditCardData, setCreditCardData] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCreditCardDetails = async () => {
            const data = await CreditCardService.getCreditCardDetails(userId);
            setCreditCardData(data);
        };
        fetchCreditCardDetails();
    }, [userId]);

    const handleTransactionSubmit = async (formData) => {
        const transactionData = {
            ...formData,
            transactionId: 0,
            creditCardId: creditCardData.id,
        };
        if (Math.abs(creditCardData.balance - creditCardData.creditLimit) < transactionData.amount) {
            console.log(creditCardData.balance, transactionData.amount);
            toast.error('Oops!, Insufficient Credit Card balance... 😵')
            return;
        }
        const response = await TransactionService.createTransaction(transactionData);

        if (response.success) {

            return true; // Notify the modal of success
        } else {
            console.error("Transaction errors:", response.errors);
            return false;
        }
    };

    if (!creditCardData) {
        return <div><Mosaic /> </div>;
    }

    return (
        <div className="my-3 p-3">
            <div className="row">
                <div className="col-md-6">
                    <div className="card credit-card">
                        <div className="card-body p-3">
                            <div className="credit-card-header d-flex justify-content-around align-items-center">
                                <h5 className="card-title">Credit Card Details</h5>
                                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
                            </div>
                            <div className="credit-card-info">
                                <p className="card-text mb-1">
                                    <strong>Card Number:</strong> XXXX-XXXX-XXXX-{creditCardData.cardNumber?.slice(12)}
                                </p>
                                <p className="card-text mb-1">
                                    <strong>Card Holder Name:</strong> {creditCardData.cardHolderName}
                                </p>
                                <p className="card-text mb-1">
                                    <strong>Issued Date:</strong> {new Date(creditCardData.issuedDate).toLocaleDateString()}
                                </p>
                                <p className="card-text mb-1">
                                    <strong>Expiration Date:</strong> {new Date(creditCardData.expirationDate).toLocaleDateString()}
                                </p>
                                <p className="card-text mb-1">
                                    <strong>Credit Limit:</strong>₹{creditCardData.creditLimit} <mark> Spent ₹{creditCardData.balance}</mark>
                                </p>
                                <p className="card-text mb-1">
                                    <strong>Balance:</strong> ₹{creditCardData.balance}
                                </p>
                            </div>
                            <div className="credit-card-actions p-3">
                                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                                    Make Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction Modal */}
            <TransactionModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleTransactionSubmit}
                transactionTypes={TRANSACTION_TYPES}
                categories={CATEGORIES}
            />
        </div>
    );
};

export default CreditCardDetails;
