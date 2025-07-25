import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Update if your backend runs on a different port
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true if using cookies/auth
});

export default apiClient; 