import axios from 'axios';
import apiConfig from './apiConfig';

// Single instance of axios for API calls
const api = axios.create({
    baseURL: `${apiConfig.baseUrl}/api`,
    withCredentials: true, // Include cookies in requests
});

export default api;