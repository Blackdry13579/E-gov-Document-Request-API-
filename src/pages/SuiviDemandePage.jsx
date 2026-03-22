import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { demandeService } from '../services/demandeService';
import { formatDate, STATUS_COLORS } from '../utils/constants';
import { useNotif } from '../context/NotifContext';
import { cn } from '../utils/cn';

const SuiviDemandePage = () => {
 const { id } = useParams();
 const [demande, setDemande] = useState(null);
 const [loading, setLoading] = useState(true);
 const { addNotif } = useNotif();
 const navigate = useNavigate();

 useEffect(() => {
 const fetchDemande = async () => {
 try {
 const response = await demandeService.getById(id);
 setDemande(response);
 } catch {
 addNotif({ type: 'error', message: 'Impossible de charger les détails de la demande' });
 navigate('/demandes');
 } finally {
 setLoading(false);
 }
 };
 fetchDemande();
 }, [id, addNotif, navigate]);

 if (loading) return <Layout title="Suivi de demande"><Loader className="mt-20"/></Layout>;
 if (!demande) return <Layout title="Suivi de demande">Demande non trouvée</Layout>;

 return (
 <Layout title={`Suivi Demande #${id.slice(-8).toUpperCase()}`}>
 <div className="space-y-8">
 {/* Header with status */}
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
 <div className="space-y-1">
 <h2 className="text-3xl font-black text-slate-900">{demande.documentType?.nom}</h2>
 <p className="text-slate-500 font-medium">Soumise le {formatDate(demande.createdAt)}</p>
 </div>
 <div className="flex items-center gap-4">
 <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Statut:</span>
 <Badge className={cn('text-sm py-1.5 px-4', STATUS_COLORS[demande.statut])}>
 {demande.statut?.replace('-', ' ')}
 </Badge>
 </div>
 </div>

 <div className="grid lg:grid-cols-3 gap-8">
 {/* Main Details */}
 <div className="lg:col-span-2 space-y-8">
 <Card className="p-8 space-y-6">
 <h3 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">Détails du formulaire</h3>
 <div className="grid sm:grid-cols-2 gap-8">
 {Object.entries(demande.data || {}).map(([key, value]) => (
 <div key={key} className="space-y-1">
 <p className="text-xs font-black text-slate-400 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
 <p className="text-sm font-bold text-slate-700">{value?.toString() || 'N/A'}</p>
 </div>
 ))}
 </div>
 </Card>

 {/* Timeline Placeholder */}
 <Card className="p-8 space-y-8">
 <h3 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">Historique de traitement</h3>
 <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-slate-100">
 <div className="relative flex items-center gap-6">
 <div className="size-10 rounded-full bg-emerald-500 text-white flex items-center justify-center z-10 shadow-lg shadow-emerald-500/20">
 <span className="material-symbols-outlined text-xl">check</span>
 </div>
 <div>
 <p className="text-sm font-bold text-slate-900">Demande soumise</p>
 <p className="text-xs text-slate-500">{formatDate(demande.createdAt)}</p>
 </div>
 </div>
 
 {demande.statut !== 'pending' && (
 <div className="relative flex items-center gap-6">
 <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center z-10 shadow-lg shadow-primary/20">
 <span className="material-symbols-outlined text-xl">sync</span>
 </div>
 <div>
 <p className="text-sm font-bold text-slate-900">En cours de traitement</p>
 <p className="text-xs text-slate-500">Mis à jour récemment</p>
 </div>
 </div>
 )}

 <div className="relative flex items-center gap-6 opacity-30">
 <div className="size-10 rounded-full bg-white border-2 border-slate-200 text-slate-300 flex items-center justify-center z-10">
 <span className="material-symbols-outlined text-xl">verified</span>
 </div>
 <div>
 <p className="text-sm font-bold text-slate-400">Document délivré / Rejeté</p>
 <p className="text-xs text-slate-400">En attente des étapes précédentes</p>
 </div>
 </div>
 </div>
 </Card>
 </div>

 {/* Sidebar Info */}
 <div className="space-y-8">
 <Card className="p-8 space-y-6 bg-slate-50/50 border-slate-100">
 <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Informations Citoyen</h3>
 <div className="flex items-center gap-4">
 <div className="size-12 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-primary">
 {demande.citoyen?.nom?.charAt(0)}
 </div>
 <div>
 <p className="text-sm font-bold text-slate-900">{demande.citoyen?.prenom} {demande.citoyen?.nom}</p>
 <p className="text-xs text-slate-500">{demande.citoyen?.email}</p>
 </div>
 </div>
 </Card>

 <Card className="p-8 space-y-6">
 <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Document & Médias</h3>
 <div className="space-y-4">
 {demande.fichiers?.map((f, i) => (
 <a 
 key={i} 
 href={f.url} 
 target="_blank"
 rel="noreferrer"
 className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all group"
 >
 <div className="flex items-center gap-3">
 <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">description</span>
 <span className="text-xs font-bold text-slate-700">{f.type || 'Pièce jointe'}</span>
 </div>
 <span className="material-symbols-outlined text-slate-300 text-sm">open_in_new</span>
 </a>
 ))}
 {(!demande.fichiers || demande.fichiers.length === 0) && (
 <p className="text-xs text-slate-400 italic">Aucun fichier joint</p>
 )}
 </div>
 </Card>

 <div className="p-4 rounded-[2rem] bg-amber-50 border border-amber-100 flex gap-4">
 <span className="material-symbols-outlined text-amber-500">help</span>
 <p className="text-xs text-amber-800 leading-relaxed font-medium">
 Si vous remarquez une erreur dans vos informations, veuillez contacter le support dès que possible.
 </p>
 </div>
 </div>
 </div>
 </div>
 </Layout>
 );
};



export default SuiviDemandePage;
