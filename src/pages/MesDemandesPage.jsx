import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
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
 default: return <Badge>{status}</Badge>;
 }
 };

 return (
 <Layout>
 <Navbar title="Mes Demandes"/>
 
 <div className="p-8">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
  <div>
  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mon Historique</h1>
  <p className="text-slate-500 mt-1 font-medium">Suivez l'état d'avancement de vos demandes de documents administratifs en temps réel.</p>
  </div>
  <Link to="/demandes/nouvelle">
  <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
  <span className="material-symbols-outlined">add</span>
  Nouvelle Demande
  </button>
  </Link>
  </div>

 {/* Filters */}
  <div className="flex flex-wrap gap-3 mb-8">
  {[
  { id: 'ALL', label: 'Toutes les demandes' },
  { id: 'EN_ATTENTE', label: 'En cours de traitement' },
  { id: 'VALIDEE', label: 'Dossiers validés' },
  { id: 'REJETEE', label: 'Dossiers rejetés' }
  ].map(tab => (
  <button
  key={tab.id}
  onClick={() => setFilter(tab.id)}
  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
  filter === tab.id 
  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
  }`}
  >
  {tab.label}
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
 <tr><td colSpan="5"className="px-8 py-12 text-center text-slate-400">Chargement de vos demandes...</td></tr>
 ) : filteredDemandes.length > 0 ? (
 filteredDemandes.map(demande => (
  <tr key={demande._id} className="hover:bg-slate-50/50 transition-all group border-b border-slate-50">
  <td className="px-8 py-5">
  <span className="text-sm font-black text-primary tracking-tight">#{demande.numeroSuivi || demande._id.substring(0, 8).toUpperCase()}</span>
  </td>
  <td className="px-8 py-5">
  <div className="flex items-center gap-4">
  <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:scale-110 transition-transform">
  <span className="material-symbols-outlined">description</span>
  </div>
  <div className="flex flex-col">
  <span className="text-sm font-bold text-slate-900">{demande.documentType?.nom || 'Document'}</span>
  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{demande.documentTypeCode}</span>
  </div>
  </div>
  </td>
  <td className="px-8 py-5 text-sm font-medium text-slate-500">
  {new Date(demande.createdAt).toLocaleDateString()}
  </td>
  <td className="px-8 py-5">
  {getStatusBadge(demande.statut)}
  </td>
  <td className="px-8 py-5 text-right">
  <Link 
  to={`/demandes/${demande._id}`}
  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-all inline-block"
  >
  Consulter
  </Link>
  </td>
  </tr>
 ))
 ) : (
 <tr>
 <td colSpan="5"className="px-8 py-20 text-center">
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
