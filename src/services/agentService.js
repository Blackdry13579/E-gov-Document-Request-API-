import api, { handleResponse } from './api';

/**
 * Service for Agent-specific API calls
 */
const agentService = {
  /**
   * Get active requests for the agent's service
   * Params: statut, page, limit, documentType
   */
  getDemandesAgent: async (params = {}) => {
    // Backend filters by service automatically based on agent's profile
    return handleResponse(api.get('/agent/demandes', { params }));
  },

  /**
   * Get complete details for a specific request
   */
  getDemandeDetail: async (id) => {
    return handleResponse(api.get(`/agent/demandes/${id}`));
  },

  /**
   * Take charge of a request
   */
  prendreEnCharge: async (id) => {
    return handleResponse(api.put(`/agent/demandes/${id}/prendre-en-charge`));
  },

  /**
   * Validate a request and generate PDF
   */
  validerDemande: async (id, notesAgent = '') => {
    return handleResponse(api.put(`/agent/demandes/${id}/valider`, { notesAgent }));
  },

  /**
   * Reject a request with a mandatory motif
   */
  rejeterDemande: async (id, motif) => {
    if (!motif || motif.trim() === '') {
      return { success: false, error: 'Motif obligatoire' };
    }
    return handleResponse(api.put(`/agent/demandes/${id}/rejeter`, { motif }));
  },

  /**
   * Request missing documents
   */
  demanderComplement: async (id, documentsManquants, message) => {
    if (!documentsManquants || documentsManquants.length === 0) {
      return { success: false, error: 'Veuillez spécifier les documents manquants' };
    }
    return handleResponse(api.put(`/agent/demandes/${id}/demander-complement`, { documentsManquants, message }));
  },

  /**
   * Get agent's personal productivity stats
   */
  getStatsAgent: async () => {
    return handleResponse(api.get('/agent/stats'));
  },

  /**
   * Get archived requests (VALIDEE, REJETEE, TERMINEE)
   * Fetches separately and combines results
   */
  getArchives: async (filters = {}) => {
    try {
      const { page = 1, limit = 20, dateDebut, dateFin, documentType } = filters;
      
      const [resValidees, resRejetees] = await Promise.all([
        api.get('/agent/demandes', { params: { statut: 'VALIDEE', page, limit, dateDebut, dateFin, documentType } }),
        api.get('/agent/demandes', { params: { statut: 'REJETEE', page, limit, dateDebut, dateFin, documentType } })
      ]);

      const dataValidees = resValidees.data;
      const dataRejetees = resRejetees.data;

      if (!dataValidees.success || !dataRejetees.success) {
        return { success: false, error: 'Erreur lors de la récupération des archives' };
      }

      const combined = [...(dataValidees.data.demandes || []), ...(dataRejetees.data.demandes || [])];
      
      // Sort by treatment date (or createdAt if not available) desc
      combined.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      return {
        success: true,
        data: combined,
        stats: {
          total: (dataValidees.data.total || 0) + (dataRejetees.data.total || 0),
          approuves: dataValidees.data.total || 0,
          rejetes: dataRejetees.data.total || 0
        }
      };
    } catch (error) {
      return { success: false, error: error.message || 'Erreur lors de la récupération des archives' };
    }
  }
};

export { agentService };
export default agentService;
