import axios from 'axios';

export const BACKEND_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
