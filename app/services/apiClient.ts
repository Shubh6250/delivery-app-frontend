// app/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/", // Set your API base URL in .env
  timeout: 10000, // Adjust timeout as needed
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;