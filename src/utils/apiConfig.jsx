const API_CONFIG = {
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
    endpoints: {
      googleAuth: '/api/auth/google',
      checkAuth: '/api/auth/check',
    },
    getGoogleAuthUrl: () => `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.googleAuth}`,
    getCheckAuthUrl: () => `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.checkAuth}`,
  };
  
  export default API_CONFIG;