import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
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
 // eslint-disable-next-line react-hooks/exhaustive-deps
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
 <Navbar title="Archive des Demandes - Administration"/>
 
 <div className="p-8 space-y-8">
 <h2 className="text-2xl font-bold text-slate-800">Archive des Demandes</h2>

 {/* Stats Section */}
 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
  <div className="flex justify-between items-center mb-1">
  <span className="p-2 bg-slate-50 text-slate-500 rounded-lg material-symbols-outlined">folder</span>
  <span className="text-slate-400 bg-slate-50 px-2 py-0.5 rounded text-[10px] font-black uppercase">Archives</span>
  </div>
  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Archivés</p>
  <p className="text-3xl font-black text-slate-900">{stats.total}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2 border-l-4 border-l-emerald-500">
  <div className="flex justify-between items-center mb-1">
  <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg material-symbols-outlined">check_circle</span>
  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-black uppercase">Validés</span>
  </div>
  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Succès</p>
  <p className="text-3xl font-black text-slate-900">{stats.approuves}</p>
  </div>

  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2 border-l-4 border-l-rose-500">
  <div className="flex justify-between items-center mb-1">
  <span className="p-2 bg-rose-50 text-rose-600 rounded-lg material-symbols-outlined">cancel</span>
  <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-[10px] font-black uppercase">Rejetés</span>
  </div>
  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Rejets</p>
  <p className="text-3xl font-black text-slate-900">{stats.rejetes}</p>
  </div>

  <div className="bg-primary p-6 rounded-2xl border border-primary shadow-lg flex flex-col gap-2 shadow-primary/20">
  <div className="flex justify-between items-center mb-1">
  <span className="p-2 bg-white/20 text-white rounded-lg material-symbols-outlined">trending_up</span>
  </div>
  <p className="text-sm font-semibold text-white/70 uppercase tracking-wider">Taux de Dossiers</p>
  <p className="text-3xl font-black text-white">{stats.total > 0 ? Math.round((stats.approuves / stats.total) * 100) : 0}%</p>
  </div>
  </div>

 {/* Filters & Table */}
 <Card className="p-0 overflow-hidden shadow-sm border border-slate-100">
  <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-white">
  <div className="flex items-center gap-4 flex-wrap">
  <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
  <button 
  onClick={() => setFilters({...filters, statut: 'ALL'})}
  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filters.statut === 'ALL' ? 'bg-white shadow-md text-primary' : 'text-slate-500 hover:text-primary'}`}
  >
  Tout
  </button>
  <button 
  onClick={() => setFilters({...filters, statut: 'VALIDEE'})}
  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filters.statut === 'VALIDEE' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-emerald-600'}`}
  >
  Validé
  </button>
  <button 
  onClick={() => setFilters({...filters, statut: 'REJETEE'})}
  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filters.statut === 'REJETEE' ? 'bg-white shadow-md text-rose-600' : 'text-slate-500 hover:text-rose-600'}`}
  >
  Rejeté
  </button>
  </div>

  <select 
  className="bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
  value={filters.documentType}
  onChange={(e) => setFilters({...filters, documentType: e.target.value})}
  >
  <option value="">Tous les documents</option>
  <option value="CNIB">CNIB - Carte d'Identité</option>
  <option value="PASSEPORT">Passeport Burkinabè</option>
  <option value="NAISSANCE">Extrait de Naissance</option>
  </select>
  </div>

  <button onClick={exportCSV} className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
  <span className="material-symbols-outlined text-lg">download</span>
  Exporter l'Archive
  </button>
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
 <tr><td colSpan="6"className="p-12 text-center"><Loader /></td></tr>
 ) : archives.length > 0 ? (
 archives.map(demande => (
  <tr key={demande._id} className="hover:bg-slate-50/50 transition-colors group border-b border-slate-50">
  <td className="px-6 py-5 font-black text-primary tracking-tight">#{demande.numeroSuivi}</td>
  <td className="px-6 py-5">
  <div className="flex items-center gap-4">
  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-[10px] uppercase group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
  {demande.citoyenId?.nom?.charAt(0)}{demande.citoyenId?.prenom?.charAt(0)}
  </div>
  <div className="flex flex-col">
  <span className="font-bold text-slate-900 leading-tight">{demande.citoyenId?.nom} {demande.citoyenId?.prenom}</span>
  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{demande.citoyenId?.matricule || 'USER-882'}</span>
  </div>
  </div>
  </td>
  <td className="px-6 py-5 font-bold text-slate-700">{demande.documentType?.nom || demande.documentTypeCode}</td>
  <td className="px-6 py-5 text-slate-500 font-medium whitespace-nowrap">
  {new Date(demande.updatedAt).toLocaleDateString()}
  </td>
  <td className="px-6 py-5">
  {getStatusBadge(demande.statut)}
  </td>
  <td className="px-6 py-5 text-right">
  <button 
  className="px-4 py-2 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
  onClick={() => navigate(`/agent/demandes/${demande._id}`)}
  >
  Détails
  </button>
  </td>
  </tr>
 ))
 ) : (
 <tr><td colSpan="6"className="p-12 text-center text-slate-400 font-bold">Aucune archive disponible.</td></tr>
 )}
 </tbody>
 </table>
 </div>

 <div className="p-4 border-t border-slate-100 flex items-center justify-between">
 <p className="text-xs text-slate-500 font-medium">Affichage de 1-{archives.length} sur {stats.total} demandes</p>
 <div className="flex items-center gap-2">
 <Button size="xs"variant="outline"disabled>Précédent</Button>
 <Button size="xs"variant="primary">1</Button>
 <Button size="xs"variant="outline"disabled>Suivant</Button>
 </div>
 </div>
 </Card>
 </div>
 </Layout>
 );
};

export default AgentArchivesPage;
