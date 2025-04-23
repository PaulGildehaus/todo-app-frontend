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
        timeout: 3000
      });

      const currentUser = response.data.isAuthenticated ? response.data.user : null;
      setUser(currentUser); // Update user state
      return currentUser;
    } catch (err) {
      console.error('Authentication check failed:', err);
      setUser(null);
      return null;
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    checkAuth();
    const interval = setInterval(checkAuth, 10000); // Check every 15 minutes
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