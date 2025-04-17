import axios from 'axios';
import apiConfig from './apiConfig';

const api = axios.create({
    baseURL: `${apiConfig.baseUrl}/api`,
    withCredentials: true, // Include cookies in requests
});

export default api;