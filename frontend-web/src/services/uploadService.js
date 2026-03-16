import api, { handleResponse } from './api';

const uploadService = {
  /**
   * Upload a document file (identity, justificatif, etc.)
   */
  uploadFile: async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return handleResponse(api.post('/upload', formData, config));
  }
};

export default uploadService;
