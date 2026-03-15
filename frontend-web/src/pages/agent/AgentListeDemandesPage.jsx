import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Input from '../../components/Input';
import agentService from '../../services/agentService';

const AgentListeDemandesPage = () => {
  const navigate = useNavigate();
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    enAttente: 0,
    approuves: 0,
    rejetes: 0
  });
  
  const [filters, setFilters] = useState({
    statut: 'EN_ATTENTE',
    search: '',
    dateRange: 'ALL'
  });

  const fetchDemandes = async () => {
    setLoading(true);
    const result = await agentService.getDemandesAgent({ 
      statut: filters.statut !== 'ALL' ? filters.statut : undefined,
      search: filters.search || undefined
    });

    if (result.success) {
      setDemandes(result.data.demandes || []);
      // Calculate basic stats for cards
      const allRes = await agentService.getDemandesAgent({ limit: 1000 });
      if (allRes.success) {
        const all = allRes.data.demandes || [];
        setStats({
          total: all.length,
          enAttente: all.filter(d => d.statut === 'EN_ATTENTE').length,
          approuves: all.filter(d => d.statut === 'VALIDEE').length,
          rejetes: all.filter(d => d.statut === 'REJETEE').length
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDemandes();
  }, [filters.statut]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDemandes();
  };

  const getStatusBadge = (statut) => {
    switch (statut) {
      case 'EN_ATTENTE': return <Badge variant="warning">À traiter</Badge>;
      case 'EN_COURS': return <Badge variant="primary">En cours</Badge>;
      case 'DOCUMENTS_MANQUANTS': return <Badge variant="secondary">Complément</Badge>;
      case 'VALIDEE': return <Badge variant="success">Validé</Badge>;
      case 'REJETEE': return <Badge variant="danger">Rejeté</Badge>;
      default: return <Badge>{statut}</Badge>;
    }
  };

  return (
    <Layout>
      <Navbar title="Gestion des Dossiers - Administration" />
      
      <div className="p-8 space-y-8">
        <h2 className="text-xl font-bold text-slate-800">Gestion des Dossiers</h2>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg material-symbols-outlined">list_alt</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">TOTAL</span>
            </div>
            <p className="text-2xl font-black text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-500">Demandes totales</p>
          </Card>

          <Card className="p-6 border-amber-100 bg-amber-50/10">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-amber-50 text-amber-600 rounded-lg material-symbols-outlined">pending_actions</span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded uppercase">En attente</span>
            </div>
            <p className="text-2xl font-black text-slate-800">{stats.enAttente}</p>
            <p className="text-sm text-slate-500">À traiter aujourd'hui</p>
          </Card>

          <Card className="p-6 border-green-100 bg-green-50/10">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-green-50 text-green-600 rounded-lg material-symbols-outlined">check_circle</span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded uppercase">Approuvés</span>
            </div>
            <p className="text-2xl font-black text-slate-800">{stats.approuves}</p>
            <p className="text-sm text-slate-500">Dossiers finalisés</p>
          </Card>

          <Card className="p-6 border-red-100 bg-red-50/10">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-red-50 text-red-600 rounded-lg material-symbols-outlined">cancel</span>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded uppercase">Rejetés</span>
            </div>
            <p className="text-2xl font-black text-slate-800">{stats.rejetes}</p>
            <p className="text-sm text-slate-500">Dossiers non-conformes</p>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <form className="relative w-full md:w-96" onSubmit={handleSearch}>
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm" 
              placeholder="Rechercher par ID, citoyen..." 
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </form>
          <div className="flex gap-3 w-full md:w-auto">
            <select 
              className="py-2 px-4 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 text-slate-600"
              value={filters.statut}
              onChange={(e) => setFilters({...filters, statut: e.target.value})}
            >
              <option value="ALL">Tous les statuts</option>
              <option value="EN_ATTENTE">En attente</option>
              <option value="EN_COURS">En cours</option>
              <option value="DOCUMENTS_MANQUANTS">Complément demandé</option>
            </select>
            <Button variant="primary" onClick={fetchDemandes} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filtrer
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-100 px-2 overflow-x-auto">
          {[
            { id: 'ALL', label: 'Toutes les demandes', count: stats.total },
            { id: 'EN_COURS', label: 'En cours', count: demandes.filter(d => d.statut === 'EN_COURS').length },
            { id: 'VALIDEE', label: 'Approuvées', count: stats.approuves, redirect: true },
            { id: 'REJETEE', label: 'Rejetées', count: stats.rejetes, redirect: true },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.redirect) navigate('/agent/archives');
                else setFilters({...filters, statut: tab.id});
              }}
              className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                filters.statut === tab.id 
                ? 'text-primary border-primary' 
                : 'text-slate-500 border-transparent hover:text-primary hover:border-primary/30'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${filters.statut === tab.id ? 'bg-primary/10' : 'bg-slate-100'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-primary uppercase text-xs font-bold tracking-wider">
                  <th className="px-6 py-4">ID Dossier</th>
                  <th className="px-6 py-4">Citoyen</th>
                  <th className="px-6 py-4">Type de document</th>
                  <th className="px-6 py-4">Date de dépôt</th>
                  <th className="px-6 py-4 text-center">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="6" className="p-12 text-center"><Loader /></td></tr>
                ) : demandes.length > 0 ? (
                  demandes.map(demande => (
                    <tr key={demande._id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-4 text-sm font-semibold text-primary">#{demande.numeroSuivi}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800">{demande.citoyenId?.nom} {demande.citoyenId?.prenom}</span>
                          <span className="text-xs text-slate-500">{demande.citoyenId?.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{demande.documentType?.nom || demande.documentTypeCode}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(demande.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getStatusBadge(demande.statut)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          className="text-slate-400 hover:text-primary"
                          onClick={() => navigate(`/agent/demandes/${demande._id}`)}
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6" className="p-12 text-center text-slate-400 font-bold">Aucun dossier trouvé.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
            <p className="text-sm text-slate-500">Affichage de 1 à {demandes.length} sur {stats.total} dossiers</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled>Précédent</Button>
              <Button size="sm" variant="primary">1</Button>
              <Button size="sm" variant="outline" disabled>Suivant</Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default AgentListeDemandesPage;
