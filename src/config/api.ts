import axios from 'axios';

// Base URL for API
export const API_BASE_URL = 'http://154.26.137.37:4015/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  config => {
    // You can add auth token here if needed
    // const token = getAuthToken();
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling errors
api.interceptors.response.use(
  response => response,
  async error => {
    // Handle 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Avoid circular imports by requiring services inline if needed,
      // or depend on the fact that NavigationService and authService imports are available.
      // Here we need to import them at the top, or use a dynamic import/callback pattern.
      // For simplicity, we'll assume we can import them.
      // However, authService imports api, so we might have a circular dependency if we import authService here.
      // To avoid this, we can clear storage manually and navigate.

      try {
        const AsyncStorage =
          require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.multiRemove(['@auth_token', '@auth_user']);
        delete api.defaults.headers.common['Authorization'];

        const NavigationService = require('../navigation/NavigationService');
        NavigationService.reset('Login');
      } catch (e) {
        console.error('Error handling 401:', e);
      }
    }

    // Handle common errors here
    if (error.response) {
      // Server responded with error status
      console.group('API Error');
      console.error('Status:', error.response.status);
      console.error('URL:', error.config?.url);
      console.error('Request Data:', error.config?.data);
      console.error('Response Data:', error.response.data);
      console.groupEnd();
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
