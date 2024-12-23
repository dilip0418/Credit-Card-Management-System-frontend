// src/context/useAuthContext.js
import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import the context

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}