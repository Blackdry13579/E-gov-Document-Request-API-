import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';
import { Search, Filter, Calendar, ChevronLeft, ChevronRight, Eye, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';

const AdminDemandesPage = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    statut: '',
    search: '',
    page: 1,
    limit: 10
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchDemandes();
  }, [filters.statut, filters.page]);

  const fetchDemandes = async () => {
    try {
      setLoading(true);
      const res = await adminService.getAllDemandes({
        statut: filters.statut,
        page: filters.page,
        limit: filters.limit
      });
      
      if (res.success) {
        setDemandes(res.data);
        setTotal(res.total || 0);
      }
    } catch (err) {
      setError("Erreur lors de la récupération des demandes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDemandes();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'EN_ATTENTE':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">En attente</span>;
      case 'EN_COURS':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">En cours</span>;
      case 'APPROUVE':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Approuvée</span>;
      case 'REJETE':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">Rejetée</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="app-container flex min-h-screen bg-slate-50">
      <Sidebar activePage="demandes" />
      
      <main className="main-content flex-1 ml-72 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestion Globale des Demandes</h1>
          <p className="text-slate-500">Supervisez et traitez toutes les demandes au niveau national.</p>
        </header>

        {/* Filters & Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-100 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary" size={18} />
                <input 
                  type="text"
                  placeholder="Rechercher par ID ou nom du citoyen..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm transition-all"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </form>
              <div className="flex flex-wrap gap-3">
                <select 
                  className="bg-slate-50 border-none rounded-xl text-sm font-medium px-4 py-2.5 focus:ring-2 focus:ring-primary cursor-pointer"
                  value={filters.statut}
                  onChange={(e) => setFilters({...filters, statut: e.target.value, page: 1})}
                >
                  <option value="">Tous les Statuts</option>
                  <option value="EN_ATTENTE">En attente</option>
                  <option value="EN_COURS">En cours</option>
                  <option value="APPROUVE">Approuvées</option>
                  <option value="REJETE">Rejetées</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100 transition-all">
                  <Calendar size={18} /> Période
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID Demande</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Citoyen</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="7" className="text-center py-12 text-slate-500">Chargement...</td></tr>
                ) : demandes.length > 0 ? demandes.map((demande) => (
                  <tr key={demande._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">
                      {demande.codeReference || `DOC-${demande._id.slice(-6).toUpperCase()}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary text-xs">
                          {demande.citoyenId?.prenom?.[0]}{demande.citoyenId?.nom?.[0]}
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {demande.citoyenId?.prenom} {demande.citoyenId?.nom}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {demande.documentTypeId?.nom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 uppercase">
                      {demande.documentTypeId?.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(demande.dateSoumission).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(demande.statut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="flex items-center gap-2 text-primary hover:text-blue-700 transition-colors ml-auto font-bold text-sm">
                        <Eye size={16} /> Détails
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="7" className="text-center py-12 text-slate-500">Aucune demande trouvée.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              {total > 0 ? `Affichage de ${(filters.page-1)*filters.limit + 1} à ${Math.min(filters.page*filters.limit, total)} sur ${total} résultats` : 'Aucun résultat'}
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setFilters({...filters, page: filters.page - 1})}
                disabled={filters.page === 1}
                className="size-9 rounded-xl flex items-center justify-center border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="px-4 py-2 bg-primary text-white font-bold rounded-xl text-sm">{filters.page}</span>
              <button 
                onClick={() => setFilters({...filters, page: filters.page + 1})}
                disabled={total <= filters.page * filters.limit}
                className="size-9 rounded-xl flex items-center justify-center border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatMiniCard title="En attente d'action" value="42" icon={<Clock />} color="blue" />
          <StatMiniCard title="Traitées aujourd'hui" value="18" icon={<CheckCircle />} color="green" />
          <StatMiniCard title="Cas prioritaires" value="07" icon={<AlertCircle />} color="red" />
        </div>
      </main>
    </div>
  );
};

const StatMiniCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    red: 'bg-red-50 text-red-600 border-red-100',
  };

  return (
    <div className={`rounded-2xl p-6 border ${colors[color]} flex items-center gap-4 shadow-sm`}>
      <div className={`size-12 rounded-full flex items-center justify-center bg-white shadow-sm border border-slate-100`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-black">{value}</p>
      </div>
    </div>
  );
};

export default AdminDemandesPage;
