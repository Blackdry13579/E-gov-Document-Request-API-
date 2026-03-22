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
    return handleResponse(api.put('/auth/me', data));
  },

  /**
   * Update password
   */
  updatePassword: async (data) => {
    return handleResponse(api.put('/auth/me/password', data));
  },

  /**
   * Get current user from local storage (UI helper)
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('egov_user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Alias for getProfile
   */
  getMe: async () => {
    return handleResponse(api.get('/auth/me'));
  },

  /**
   * Alias for updateProfile
   */
  updateProfil: async (data) => {
    return handleResponse(api.put('/auth/me', data));
  },

  /**
   * Forgot password
   */
  forgotPassword: async (data) => {
    return handleResponse(api.post('/auth/forgot-password', data));
  },

  /**
   * Reset password
   */
  resetPassword: async (token, data) => {
    return handleResponse(api.post(`/auth/reset-password/${token}`, data));
  }
};

export default authService;
export { authService };
