import axios from 'axios';

/**
 * Axios instance with base configuration
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add egov_token
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('egov_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response helper to standardize output
 * Returns { success: true, data } or { success: false, error }
 */
export const handleResponse = async (request) => {
  try {
    const response = await request;
    return {
      success: true,
      data: response.data?.data || response.data,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Une erreur est survenue lors de la communication avec le serveur.',
    };
  }
};

export default api;
