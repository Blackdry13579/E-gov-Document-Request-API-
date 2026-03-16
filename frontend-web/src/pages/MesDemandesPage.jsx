import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { demandeService } from '../services/demandeService';

const MesDemandesPage = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchDemandes = async () => {
      setLoading(true);
      const result = await demandeService.getMyDemandes();
      if (result.success) {
        setDemandes(result.data.demandes || []);
      }
      setLoading(false);
    };
    fetchDemandes();
  }, []);

  const filteredDemandes = demandes.filter(d => {
    if (filter === 'ALL') return true;
    return d.statut === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'VALIDEE': return <Badge variant="success">Validé</Badge>;
      case 'EN_ATTENTE': return <Badge variant="warning">En cours</Badge>;
      case 'REJETEE': return <Badge variant="danger">Rejeté</Badge>;
      case 'EN_ATTENTE': return <Badge variant="primary">Brouillon</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <Layout>
      <Navbar title="Mes Demandes" />
      
      <div className="p-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Historique des demandes</h1>
            <p className="text-slate-500">Retrouvez et suivez l'état de toutes vos démarches.</p>
          </div>
          <Link to="/demandes/nouvelle">
            <Button variant="primary">Nouvelle Demande</Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overscroll-x-contain pb-2">
          {['ALL', 'EN_ATTENTE', 'VALIDEE', 'REJETEE', 'EN_ATTENTE'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === status 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-slate-500 border border-slate-100 hover:border-primary/30'
              }`}
            >
              {status === 'ALL' ? 'Toutes' : status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="table-wrapper overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                <tr>
                  <th className="px-8 py-4">Numéro</th>
                  <th className="px-8 py-4">Document</th>
                  <th className="px-8 py-4">Date de soumission</th>
                  <th className="px-8 py-4">Statut</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="5" className="px-8 py-12 text-center text-slate-400">Chargement de vos demandes...</td></tr>
                ) : filteredDemandes.length > 0 ? (
                  filteredDemandes.map(demande => (
                    <tr key={demande._id} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-5">
                        <span className="font-mono text-xs font-bold text-primary">
                          {demande.numeroSuivi || demande._id.substring(0, 8).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                            <span className="material-symbols-outlined">description</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{demande.documentType?.nom || 'Document'}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{demande.documentTypeCode}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-500">
                        {new Date(demande.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </td>
                      <td className="px-8 py-5">
                        {getStatusBadge(demande.statut)}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/demandes/${demande._id}`}>
                            <Button variant="ghost" size="sm" className="size-9 p-0 rounded-full">
                              <span className="material-symbols-outlined text-lg">visibility</span>
                            </Button>
                          </Link>
                          {demande.statut === 'EN_ATTENTE' && (
                             <Button variant="ghost" size="sm" className="size-9 p-0 rounded-full text-secondary">
                               <span className="material-symbols-outlined text-lg">delete</span>
                             </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center opacity-40">
                        <span className="material-symbols-outlined text-6xl mb-4">move_to_inbox</span>
                        <p className="text-slate-500 font-bold">Aucune demande trouvée avec ce statut.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default MesDemandesPage;
