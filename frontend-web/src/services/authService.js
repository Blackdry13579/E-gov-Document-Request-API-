import api, { handleResponse } from './api';

const authService = {
  /**
   * Login user
   */
  login: async (credentials) => {
    return handleResponse(api.post('/auth/login', credentials));
  },

  /**
   * Register new citizen
   */
  register: async (userData) => {
    return handleResponse(api.post('/auth/register', { ...userData, role: 'CITOYEN' }));
  },

  /**
   * Get user profile
   */
  getProfile: async () => {
    return handleResponse(api.get('/auth/me'));
  },

  /**
   * Update profile
   */
  updateProfile: async (data) => {
    return handleResponse(api.put('/auth/profile', data));
  }
};

export { authService };
