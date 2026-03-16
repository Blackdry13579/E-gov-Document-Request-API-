import api, { handleResponse } from './api';

const documentService = {
  /**
   * Get all available document types
   * Backend: GET /api/documents
   */
  getAllDocuments: async () => {
    return handleResponse(api.get('/documents'));
  },

  /**
   * Alias for compatibility
   */
  getAllTypes: async () => {
    return handleResponse(api.get('/documents'));
  },

  /**
   * Get dynamic fields for a specific document by code
   * Backend: GET /api/documents/:code
   */
  getDocumentByCode: async (code) => {
    return handleResponse(api.get(`/documents/${code}`));
  }
};

export { documentService };
