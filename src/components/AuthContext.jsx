import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../utils/apiConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Check if the user is authenticated
  const checkAuth = async () => {
    try {
      const response = await axios.get(apiConfig.getCheckAuthUrl(), {
        withCredentials: true, // Include cookies in the request
      });

      if (response.data.isAuthenticated) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
      
    } catch (err) {
      console.error('Authentication check failed:', err);
      setUser(null);
    } finally {
      setLoading(false); // Set loading to false after the check
    }
  };

  // Automatically check auth status when the app loads
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);