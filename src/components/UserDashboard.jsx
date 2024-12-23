import React, { useState, useEffect } from 'react';
import CreditCardDetails from './CreditCardDetails';
import TransactionTab from './TransactionsTab'
import SpendAnalysis from './SpendAnalysis';
import ApplicationStatus from './ApplicationStatus';
import CreditCardApplication from './CreditCardApplication';
import { Mosaic } from "react-loading-indicators";
import { useAuth } from '../context/useAuthContext';
import CreditCardService from '../services/creditCardService';

const UserDashboard = () => {
    const [creditCardStatus, setCreditCardStatus] = useState('NoCreditCard');
    const [applicationStatus, setApplicationStatus] = useState(null);
    const [applicationComments, setApplicationComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchCreditCardStatus = async () => {
            try {
                const response = await CreditCardService.getCreditCardStatus(user.id);
                setCreditCardStatus(response.status);
                setApplicationStatus(response.applicationStatus);
                setApplicationComments(response.comments);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        };
        fetchCreditCardStatus();
    }, [user.id]);

    if (isLoading) {
        return (
            <>
                <div className="container d-flex align-items-center justify-content-center">
                    <div>
                        <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
                    </div>
                </div>
            </>
        );
    }
    if (isLoggedIn) {
        return (
            <div>
                {creditCardStatus === 'NoCreditCard' && <CreditCardApplication />}
                {creditCardStatus === 'Pending' && <ApplicationStatus status={applicationStatus} comments={applicationComments} />}
                {creditCardStatus === 'HasCreditCard' && <CreditCardDetails userId={user.id} />}
                {creditCardStatus === 'HasCreditCard' && <SpendAnalysis />}
                <div className="card px-3">
                    {creditCardStatus === 'HasCreditCard' && <TransactionTab userId={user.id} />}
                </div>

            </div>
        );
    }

};

export default UserDashboard;