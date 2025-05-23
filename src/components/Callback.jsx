import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// This component handles the authentication callback from Google OAuth2.0
// It checks if the user is authenticated and redirects them to the appropriate page
function Callback() {
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const isAuthenticated = await checkAuth();
                navigate(isAuthenticated ? '/' : '/login', {
                    state: {authError: !isAuthenticated && 'Authentication failed.'}
                });
            } catch (err) {
                navigate('/login', {
                    state: {authError: err.message || 'Authentication failed.'}
                });
            }
        };
        handleCallback();
    }, [navigate, checkAuth]);

    return <div>Authenticating...</div>;
}

export default Callback;