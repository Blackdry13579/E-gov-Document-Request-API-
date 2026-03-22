import api, { handleResponse } from './api';

const demandeService = {
  /**
   * Submit a new document request
   */
  create: async (demandeData) => {
    return handleResponse(api.post('/demandes', demandeData));
  },

  /**
   * Get my requests
   */
  getMyDemandes: async (params = {}) => {
    return handleResponse(api.get('/demandes', { params }));
  },

  /**
   * Get single request details
   */
  getById: async (reference) => {
    return handleResponse(api.get(`/demandes/${reference}`));
  },

  /**
   * Cancel a request
   */
  cancel: async (id) => {
    return handleResponse(api.post(`/demandes/${id}/cancel`));
  }
};

export { demandeService };
