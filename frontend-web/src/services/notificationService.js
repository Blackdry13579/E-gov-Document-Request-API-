import api, { handleResponse } from './api';

const notificationService = {
  /**
   * Get all notifications
   */
  getAll: async () => {
    return handleResponse(api.get('/notifications'));
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (id) => {
    return handleResponse(api.put(`/notifications/${id}/read`));
  },

  /**
   * Mark all as read
   */
  markAllRead: async () => {
    return handleResponse(api.put('/notifications/read-all'));
  }
};

export default notificationService;
