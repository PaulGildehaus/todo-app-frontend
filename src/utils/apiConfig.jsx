const API_CONFIG = {
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
    endpoints: {
      googleAuth: '/api/auth/google',
      checkAuth: '/api/auth/check',
      logout: '/api/auth/logout',
    },
    getGoogleAuthUrl: () => `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.googleAuth}`,
    getCheckAuthUrl: () => `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.checkAuth}`,
    getLogoutUrl: () => `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.logout}`,
  };
  
  export default API_CONFIG;