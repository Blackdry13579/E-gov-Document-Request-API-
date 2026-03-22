import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
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
 // eslint-disable-next-line react-hooks/exhaustive-deps
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
 <Navbar title="Gestion des Dossiers - Administration"/>
 
 <div className="p-8 space-y-8">
 <h2 className="text-xl font-bold text-slate-800">Gestion des Dossiers</h2>

 {/* Stats Section */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
  <div className="flex justify-between items-center mb-1">
  <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg material-symbols-outlined">description</span>
  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold">+12%</span>
  </div>
  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Demandes</p>
  <p className="text-3xl font-black text-slate-900">{stats.total}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2 border-l-4 border-l-amber-500">
  <div className="flex justify-between items-center mb-1">
  <span className="p-2 bg-amber-50 text-amber-600 rounded-lg material-symbols-outlined">pending_actions</span>
  <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-xs font-bold">Urgents</span>
  </div>
  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">À traiter</p>
  <p className="text-3xl font-black text-slate-900">{stats.enAttente}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2 border-l-4 border-l-emerald-500">
  <div className="flex justify-between items-center mb-1">
  <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg material-symbols-outlined">verified</span>
  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold">Stable</span>
  </div>
  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Effectués</p>
  <p className="text-3xl font-black text-slate-900">{stats.approuves}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
  <div className="flex justify-between items-center mb-1">
  <span className="p-2 bg-rose-50 text-rose-600 rounded-lg material-symbols-outlined">cancel</span>
  <span className="text-slate-400 px-2 py-0.5 rounded text-xs font-bold">Fiscaux</span>
  </div>
  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Rejetés</p>
  <p className="text-3xl font-black text-slate-900">{stats.rejetes}</p>
  </div>
  </div>

 {/* Action Bar */}
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6">
  <div className="flex flex-wrap gap-4">
  <div className="flex-1 min-w-[300px]">
  <form className="relative" onSubmit={handleSearch}>
  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
  <input 
  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400"
  placeholder="Rechercher par numéro de dossier, nom, ou CIN..."
  type="text"
  value={filters.search}
  onChange={(e) => setFilters({...filters, search: e.target.value})}
  />
  </form>
  </div>
  <div className="flex flex-wrap gap-3">
  <select 
  className="flex items-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors text-sm font-medium border-none outline-none cursor-pointer"
  value={filters.statut}
  onChange={(e) => setFilters({...filters, statut: e.target.value})}
  >
  <option value="ALL">Tous les statuts</option>
  <option value="EN_ATTENTE">En attente (Prioritaire)</option>
  <option value="EN_COURS">Traitement en cours</option>
  <option value="DOCUMENTS_MANQUANTS">Pièces manquantes</option>
  </select>
  <button onClick={fetchDemandes} className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all">
  <span className="material-symbols-outlined text-[20px]">filter_alt</span>
  Actualiser
  </button>
  </div>
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
 <tr><td colSpan="6"className="p-12 text-center"><Loader /></td></tr>
 ) : demandes.length > 0 ? (
 demandes.map(demande => (
  <tr key={demande._id} className="hover:bg-slate-50/50 transition-colors group border-b border-slate-50">
  <td className="px-6 py-5">
  <span className="text-sm font-black text-primary tracking-tight">#{demande.numeroSuivi}</span>
  </td>
  <td className="px-6 py-5">
  <div className="flex flex-col">
  <span className="text-sm font-bold text-slate-900">{demande.citoyenId?.nom} {demande.citoyenId?.prenom}</span>
  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{demande.citoyenId?.matricule || 'User-102'}</span>
  </div>
  </td>
  <td className="px-6 py-5 text-sm font-bold text-slate-700">{demande.documentType?.nom || demande.documentTypeCode}</td>
  <td className="px-6 py-5 text-sm font-medium text-slate-500">
  {new Date(demande.createdAt).toLocaleDateString()}
  </td>
  <td className="px-6 py-5 text-center">
  {getStatusBadge(demande.statut)}
  </td>
  <td className="px-6 py-5 text-right">
  <Link 
  to={`/agent/demandes/${demande._id}`}
  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-all inline-block"
  >
  Traiter
  </Link>
  </td>
  </tr>
 ))
 ) : (
 <tr><td colSpan="6"className="p-12 text-center text-slate-400 font-bold">Aucun dossier trouvé.</td></tr>
 )}
 </tbody>
 </table>
 </div>
 {/* Pagination */}
 <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
 <p className="text-sm text-slate-500">Affichage de 1 à {demandes.length} sur {stats.total} dossiers</p>
 <div className="flex gap-2">
 <Button size="sm"variant="outline"disabled>Précédent</Button>
 <Button size="sm"variant="primary">1</Button>
 <Button size="sm"variant="outline"disabled>Suivant</Button>
 </div>
 </div>
 </Card>
 </div>
 </Layout>
 );
};

export default AgentListeDemandesPage;
