import api, { handleResponse } from './api';

/**
 * Service pour les opérations d'administration
 */
const adminService = {
  // Stats globales
  getStatsGlobales: () => handleResponse(api.get('/admin/stats')),

  // Gestion des demandes
  getAllDemandes: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return handleResponse(api.get(`/admin/demandes?${params}`));
  },

  // Gestion des utilisateurs / agents
  getAllUsers: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return handleResponse(api.get(`/admin/users?${params}`));
  },
  
  createAgent: (data) => handleResponse(api.post('/admin/users', data)),
  
  updateUser: (id, data) => handleResponse(api.put(`/admin/users/${id}`, data)),
  
  toggleUserStatus: (id) => handleResponse(api.put(`/admin/users/${id}/toggle`)),

  getUserById: (id) => handleResponse(api.get(`/admin/users/${id}`)),

  // Gestion des services
  getAllServices: () => handleResponse(api.get('/admin/services')),
  
  createService: (data) => handleResponse(api.post('/admin/services', data)),
  
  updateService: (id, data) => handleResponse(api.put(`/admin/services/${id}`, data)),
  
  deleteService: (id) => handleResponse(api.delete(`/admin/services/${id}`)),

  getServiceById: (id) => handleResponse(api.get(`/admin/services/${id}`)),

  // Gestion des rôles
  getAllRoles: () => handleResponse(api.get('/admin/roles')),
  
  createRole: (data) => handleResponse(api.post('/admin/roles', data)),
  
  updateRole: (id, data) => handleResponse(api.put(`/admin/roles/${id}`, data)),
  
  deleteRole: (id) => handleResponse(api.delete(`/admin/roles/${id}`)),

  // Gestion des documents
  getAllDocuments: () => handleResponse(api.get('/documents')),

  getDocumentById: (id) => handleResponse(api.get(`/documents/${id}`)),
  
  createDocument: (data) => handleResponse(api.post('/admin/documents', data)),
  
  updateDocument: (id, data) => handleResponse(api.put(`/admin/documents/${id}`, data)),
  
  toggleDocument: (id) => handleResponse(api.delete(`/admin/documents/${id}`)),

  // Logs d'audit
  getLogs: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return handleResponse(api.get(`/admin/logs?${params}`));
  }
};

export default adminService;
