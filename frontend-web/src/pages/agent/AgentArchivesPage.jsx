import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import agentService from '../../services/agentService';

const AgentArchivesPage = () => {
  const navigate = useNavigate();
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    approuves: 0,
    rejetes: 0
  });

  const [filters, setFilters] = useState({
    statut: 'ALL',
    documentType: '',
    dateDebut: '',
    dateFin: ''
  });

  const fetchArchives = async () => {
    setLoading(true);
    const result = await agentService.getArchives(filters);
    if (result.success) {
      setArchives(result.data);
      setStats(result.stats);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArchives();
  }, [filters.statut, filters.documentType]);

  const exportCSV = () => {
    const headers = ['ID', 'Citoyen', 'Type document', 'Date traitement', 'Statut'];
    const rows = archives.map(d => [
      `#${d.numeroSuivi}`,
      `${d.citoyenId?.nom} ${d.citoyenId?.prenom}`,
      d.documentType?.nom || d.documentTypeCode,
      new Date(d.updatedAt).toLocaleDateString(),
      d.statut
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `archives_egov_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (statut) => {
    if (statut === 'VALIDEE') return <Badge variant="success">Validé</Badge>;
    if (statut === 'REJETEE') return <Badge variant="danger">Rejeté</Badge>;
    return <Badge>{statut}</Badge>;
  };

  return (
    <Layout>
      <Navbar title="Archive des Demandes - Administration" />
      
      <div className="p-8 space-y-8">
        <h2 className="text-2xl font-bold text-slate-800">Archive des Demandes</h2>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <span className="material-symbols-outlined text-3xl">task</span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Traités</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
              <p className="text-xs text-slate-400 mt-1"><span className="text-emerald-500 font-bold">+5%</span> ce mois</p>
            </div>
          </Card>

          <Card className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Dossiers Approuvés</p>
              <h3 className="text-2xl font-bold">{stats.approuves}</h3>
              <p className="text-xs text-slate-400 mt-1">
                <span className="text-emerald-500 font-bold">
                  {stats.total > 0 ? Math.round((stats.approuves / stats.total) * 100) : 0}%
                </span> de réussite
              </p>
            </div>
          </Card>

          <Card className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <span className="material-symbols-outlined text-3xl">cancel</span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Dossiers Rejetés</p>
              <h3 className="text-2xl font-bold">{stats.rejetes}</h3>
              <p className="text-xs text-slate-400 mt-1">
                <span className="text-red-500 font-bold">
                  {stats.total > 0 ? Math.round((stats.rejetes / stats.total) * 100) : 0}%
                </span> de rejets
              </p>
            </div>
          </Card>
        </div>

        {/* Filters & Table */}
        <Card className="p-0 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setFilters({...filters, statut: 'ALL'})}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${filters.statut === 'ALL' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
                >
                  Tout
                </button>
                <button 
                  onClick={() => setFilters({...filters, statut: 'VALIDEE'})}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${filters.statut === 'VALIDEE' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
                >
                  Validé
                </button>
                <button 
                  onClick={() => setFilters({...filters, statut: 'REJETEE'})}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${filters.statut === 'REJETEE' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
                >
                  Rejeté
                </button>
              </div>

              <select 
                className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium focus:ring-primary/50 outline-none"
                value={filters.documentType}
                onChange={(e) => setFilters({...filters, documentType: e.target.value})}
              >
                <option value="">Tous les documents</option>
                <option value="CNIB">CNIB</option>
                <option value="PASSEPORT">Passeport</option>
                <option value="NAISSANCE">Extrait de Naissance</option>
              </select>
            </div>

            <Button variant="primary" size="sm" onClick={exportCSV} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">download</span>
              Exporter CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">ID Demande</th>
                  <th className="px-6 py-4">Citoyen</th>
                  <th className="px-6 py-4">Type de Document</th>
                  <th className="px-6 py-4">Date de Traitement</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  <tr><td colSpan="6" className="p-12 text-center"><Loader /></td></tr>
                ) : archives.length > 0 ? (
                  archives.map(demande => (
                    <tr key={demande._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-primary">#{demande.numeroSuivi}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-[10px] uppercase">
                            {demande.citoyenId?.nom?.charAt(0)}{demande.citoyenId?.prenom?.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-700">{demande.citoyenId?.nom} {demande.citoyenId?.prenom}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{demande.documentType?.nom || demande.documentTypeCode}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(demande.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(demande.statut)}
                      </td>
                      <td className="px-6 py-4 text-center">
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
                  <tr><td colSpan="6" className="p-12 text-center text-slate-400 font-bold">Aucune archive disponible.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">Affichage de 1-{archives.length} sur {stats.total} demandes</p>
            <div className="flex items-center gap-2">
              <Button size="xs" variant="outline" disabled>Précédent</Button>
              <Button size="xs" variant="primary">1</Button>
              <Button size="xs" variant="outline" disabled>Suivant</Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default AgentArchivesPage;
