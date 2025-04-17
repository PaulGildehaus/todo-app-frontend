import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Callback() {
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            await checkAuth(); 
            navigate('/'); 
        };
        handleCallback();
    }, [navigate, checkAuth]);

    return <div>Loading...</div>;
}

export default Callback;