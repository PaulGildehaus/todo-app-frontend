import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../utils/apiConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // Check if the user is authenticated
  const checkAuth = async () => {
    try {
      const response = await axios.get(apiConfig.getCheckAuthUrl(), {
        withCredentials: true, // Include cookies in the request
        timeout: 5000
      });

      console.log('Auth check response:', response.data); // Log the response for debugging
      
      if (response.data.isAuthenticated) {
        setUser(response.data.user);
        setError(null);
      } else {
        setUser(null);
        setError('User not authenticated');
      }
      return response.data.isAuthenticated;

    } catch (err) {
      console.error('Authentication check failed:', err);
      setUser(null);
      setError(err.response?.data?.message || 'Authentication check failed');
      return false;
    } finally {
      setLoading(false); // Set loading to false after the check
    }
  };

  // Automatically check auth status when the app loads
  useEffect(() => {
    const interval = setInterval(() => {
      checkAuth();
    }, 15 * 60 * 1000); // Check every 15 minutes

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      loading, 
      checkAuth, 
      logout: async () => {
        try {
          await axios.post(apiConfig.getLogoutUrl(), {}, { withCredentials: true });
        } catch (err) {
          console.error('Logout failed:', err);
          setError(err.response?.data?.message || 'Logout failed');
        } finally {
          setUser(null);
        }
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);