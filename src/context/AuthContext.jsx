/* eslint-disable react/prop-types */
// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/authService';
import UserProfileService from '../services/UserProfileService';
import { toast } from 'react-toastify';

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = AuthService.getToken();
                if (token) {
                    const userDetails = user ?? AuthService.getUserDetails();
                    setIsLoggedIn(true);
                    setUser(userDetails);
                    const fullProfile = profile ?? await UserProfileService.getUserResponse(userDetails.id);
                    setProfile(fullProfile);
                }
            } catch (error) {
                setIsLoggedIn(false);
                setUser(null);
                setProfile(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, [profile, user]);

    const logIn = async (email, password) => {
        try {
            const result = await AuthService.signIn(email, password);

            if (result.success) {
                const userDetails = AuthService.getUserDetails();
                setIsLoggedIn(true);
                setUser(userDetails);
                const fullProfile = await UserProfileService.getUserResponse(userDetails.id);
                setProfile(fullProfile);
                return result;
            }
            setIsLoggedIn(false);
            setUser(null);
            setProfile(null);
            return result;
        } catch (error) {
            setIsLoggedIn(false);
            setUser(null);
            throw error;
        }
    };

    const logOut = () => {
        AuthService.logOut();
        setIsLoggedIn(false);
        setUser(null);
        setProfile(null);
        toast.info('Log Out Successfull 👍')
    };

    const value = {
        isLoggedIn,
        isLoading,
        user,
        profile,
        logIn,
        logOut
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Create the context outside the component
export const AuthContext = createContext();
