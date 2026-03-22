import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { demandeService } from '../services/demandeService';

const DashboardPage = () => {
 const { user } = useAuth();
 const [stats, setStats] = useState({
 total: 0,
 pending: 0,
 validated: 0,
 rejected: 0
 });
 const [recentDemandes, setRecentDemandes] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const fetchDashboardData = async () => {
 setLoading(true);
 const result = await demandeService.getMyDemandes({ limit: 5 });
 
 if (result.success) {
 setRecentDemandes(result.data.demandes || []);
 setStats(result.data.stats || {
 total: result.data.total || 0,
 pending: result.data.demandes?.filter(d => d.statut === 'EN_ATTENTE')?.length || 0,
 validated: result.data.demandes?.filter(d => d.statut === 'VALIDEE')?.length || 0,
 rejected: result.data.demandes?.filter(d => d.statut === 'REJETEE')?.length || 0
 });
 }
 setLoading(false);
 };

 fetchDashboardData();
 }, []);

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
 <Navbar title="Tableau de bord"/>
  <div className="dashboard-content">
  {/* Hero Section */}
  <section className="relative h-[300px] mb-8 overflow-hidden rounded-2xl">
  <img 
  src="https://images.unsplash.com/photo-1523805081446-ed9a9c8cbcc1?auto=format&fit=crop&q=80&w=2000" 
  alt="Burkina Faso Landscape" 
  className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent flex flex-col justify-center px-12 text-white">
  <h1 className="text-4xl font-black mb-2 animate-fade-in">Bonjour, {user?.prenom || 'Ibrahim'}</h1>
  <p className="text-lg opacity-90 max-w-lg">Bienvenue sur votre portail d'administration en ligne. Quelle démarche souhaitez-vous effectuer aujourd'hui ?</p>
  </div>
  </section>

  {/* Document Catalogue Gri d */}
  <section className="mb-12">
  <div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
  <span className="material-symbols-outlined text-primary">category</span>
  Catalogue des Services
  </h2>
  <Link to="/catalogue" className="text-primary font-bold text-sm hover:underline">Voir tout le catalogue</Link>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {[
  { id: 'cni', title: 'Carte d\'Identité (CNIB)', icon: 'badge', color: 'bg-indigo-50 text-indigo-600' },
  { id: 'birth', title: 'Acte de Naissance', icon: 'child_care', color: 'bg-emerald-50 text-emerald-600' },
  { id: 'passport', title: 'Passeport Ordinaire', icon: 'public', color: 'bg-amber-50 text-amber-600' },
  { id: 'judicial', title: 'Casier Judiciaire B3', icon: 'gavel', color: 'bg-rose-50 text-rose-600' }
  ].map((doc) => (
  <Link key={doc.id} to={`/demandes/nouvelle/${doc.id}`} className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all">
  <div className={`size-12 ${doc.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
  <span className="material-symbols-outlined text-2xl">{doc.icon}</span>
  </div>
  <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{doc.title}</h3>
  <p className="text-xs text-slate-500 mt-2">Délai moyen: 72h • Coût: 2500 FCFA</p>
  </Link>
  ))}
  </div>
  </section>

  {/* Quick Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
  <Card className="flex items-center gap-5 border-l-4 border-l-amber-500">
  <div className="size-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
  <span className="material-symbols-outlined text-3xl">pending_actions</span>
  </div>
  <div>
  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Demandes en cours</p>
  <h3 className="text-3xl font-black text-slate-900">{stats.pending}</h3>
  </div>
  </Card>

  <Card className="flex items-center gap-5 border-l-4 border-l-emerald-500">
  <div className="size-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
  <span className="material-symbols-outlined text-3xl">verified</span>
  </div>
  <div>
  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Documents délivrés</p>
  <h3 className="text-3xl font-black text-slate-900">{stats.validated}</h3>
  </div>
  </Card>

  <Card className="flex items-center gap-5 border-l-4 border-l-indigo-500">
  <div className="size-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
  <span className="material-symbols-outlined text-3xl">event_available</span>
  </div>
  <div>
  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Rendez-vous à venir</p>
  <h3 className="text-3xl font-black text-slate-900">02</h3>
  </div>
  </Card>
  </div>

 {/* Main Sections */}
 <div className="grid lg:grid-cols-3 gap-8">
 {/* Recent Activity */}
 <Card className="lg:col-span-2 p-0 overflow-hidden">
 <div className="p-6 border-b border-slate-100 flex justify-between items-center">
 <h3 className="font-bold text-slate-800">Demandes récentes</h3>
 <Link to="/demandes"className="text-xs font-bold text-primary hover:underline">Voir tout</Link>
 </div>
 
 <div className="table-wrapper">
 <table className="w-full text-left border-collapse">
 <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
 <tr>
 <th className="px-6 py-4">Document</th>
 <th className="px-6 py-4">Date</th>
 <th className="px-6 py-4">Statut</th>
 <th className="px-6 py-4">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {loading ? (
 <tr><td colSpan="4"className="px-6 py-8 text-center text-slate-400">Chargement...</td></tr>
 ) : recentDemandes.length > 0 ? (
 recentDemandes.map(demande => (
 <tr key={demande._id} className="hover:bg-slate-50/50 transition-all">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 <div className="size-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
 <span className="material-symbols-outlined text-lg">article</span>
 </div>
 <span className="text-sm font-bold text-slate-700">{demande.documentType?.nom || 'Document'}</span>
 </div>
 </td>
 <td className="px-6 py-4 text-sm text-slate-500">
 {new Date(demande.createdAt).toLocaleDateString()}
 </td>
 <td className="px-6 py-4">
 {getStatusBadge(demande.statut)}
 </td>
 <td className="px-6 py-4">
 <Link to={`/demandes/${demande._id}`} className="p-2 text-slate-400 hover:text-primary transition-all">
 <span className="material-symbols-outlined">chevron_right</span>
 </Link>
 </td>
 </tr>
 ))
 ) : (
 <tr><td colSpan="4"className="px-6 py-8 text-center text-slate-400">Aucune demande trouvée.</td></tr>
 )}
 </tbody>
 </table>
 </div>
 </Card>

 {/* Quick Info / Shortcuts */}
 <div className="space-y-6">
 <Card className="bg-flag-accent text-white border-none relative overflow-hidden">
 <div className="relative z-10">
 <h4 className="font-bold mb-2">Besoin d'aide ?</h4>
 <p className="text-xs text-white/80 mb-4">Consultez notre guide d'utilisation ou contactez le support technique.</p>
 <Button variant="ghost"className="bg-white/20 text-white border-white/30 hover:bg-white/30 w-full">Lire le guide</Button>
 </div>
 <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-white/10 rotate-12">help</span>
 </Card>

 <Card>
 <h4 className="font-bold text-slate-800 mb-4">Prochaines étapes</h4>
 <ul className="space-y-4">
 <li className="flex items-start gap-3">
 <div className="size-5 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0 mt-0.5">
 <span className="material-symbols-outlined text-xs">check</span>
 </div>
 <p className="text-xs text-slate-600">Complétez votre profil pour accélérer vos demandes.</p>
 </li>
 <li className="flex items-start gap-3">
 <div className="size-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
 <span className="material-symbols-outlined text-xs">radio_button_unchecked</span>
 </div>
 <p className="text-xs text-slate-600">Activez les notifications SMS pour un suivi en temps réel.</p>
 </li>
 </ul>
 </Card>
 </div>
 </div>
 </div>
 </Layout>
 );
};

export default DashboardPage;
