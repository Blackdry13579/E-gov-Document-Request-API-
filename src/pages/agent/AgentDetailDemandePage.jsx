import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Loader from '../../components/Loader';
import Alert from '../../components/ui/Alert';
import agentService from '../../services/agentService';

const AgentDetailDemandePage = () => {
 const { id } = useParams();
 const [demande, setDemande] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [actionLoading, setActionLoading] = useState(false);
 const [rejectMotif, setRejectMotif] = useState('');
 const [notesAgent, setNotesAgent] = useState('');
 const [isEditingNotes, setIsEditingNotes] = useState(false);

 const fetchDetail = async () => {
 setLoading(true);
 const result = await agentService.getDemandeDetail(id);
 if (result.success) {
 setDemande(result.data);
 setNotesAgent(result.data.notesAgent || '');
 } else {
 setError(result.error || 'Erreur lors du chargement des détails');
 }
 setLoading(false);
 };

 useEffect(() => {
 fetchDetail();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [id]);

 const handleAction = async (actionFn, ...args) => {
 if (actionLoading) return;
 setActionLoading(true);
 const result = await actionFn(id, ...args);
 if (result.success) {
 await fetchDetail();
 } else {
 setError(result.error);
 }
 setActionLoading(false);
 };

 const handleReject = async () => {
 if (!rejectMotif.trim()) {
 setError('Veuillez spécifier un motif de rejet');
 return;
 }
 await handleAction(agentService.rejeterDemande, rejectMotif);
 };

 if (loading) return <Loader fullPage />;
 if (error && !demande) return <div className="p-8"><Alert variant="danger"message={error} /></div>;
 if (!demande) return <div className="p-8">Demande non trouvée</div>;

 const getStatusColor = (statut) => {
 switch (statut) {
 case 'EN_ATTENTE': return 'bg-amber-500';
 case 'EN_COURS': return 'bg-blue-500';
 case 'VALIDEE': return 'bg-green-500';
 case 'REJETEE': return 'bg-red-500';
 case 'DOCUMENTS_MANQUANTS': return 'bg-orange-500';
 default: return 'bg-slate-500';
 }
 };

 return (
 <Layout>
 <Navbar title={`Détail Dossier #${demande.numeroSuivi}`} />
 
 <main className="p-4 md:p-8 space-y-6">
 {error && <Alert variant="danger"message={error} onClose={() => setError(null)} />}

 {/* Breadcrumbs */}
 <div className="flex items-center gap-2 text-slate-500 text-sm">
 <span className="material-symbols-outlined text-sm">home</span>
 <Link to="/agent/dashboard"className="hover:text-primary">Accueil</Link>
 <span className="material-symbols-outlined text-sm">chevron_right</span>
 <Link to="/agent/demandes"className="hover:text-primary">Liste des demandes</Link>
 <span className="material-symbols-outlined text-sm">chevron_right</span>
 <span className="text-slate-900 font-medium font-bold">Détail #{demande.numeroSuivi}</span>
 </div>

 <div className="flex flex-col lg:flex-row gap-8">
 {/* Left Column */}
 <div className="flex-1 space-y-8">
  <div className="flex flex-wrap justify-between items-end gap-6">
  <div>
  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Traitement du Dossier</h2>
  <div className="flex items-center gap-4 mt-2">
  <p className="text-slate-500 font-medium">
  Référence: <span className="text-primary font-bold">#{demande.numeroSuivi}</span>
  </p>
  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
  <p className="text-slate-500 font-medium whitespace-nowrap">
  Déposé le {new Date(demande.createdAt).toLocaleDateString()}
  </p>
  </div>
  </div>
  <div className="flex gap-3">
  <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-bold text-sm shadow-sm" onClick={() => window.print()}>
  <span className="material-symbols-outlined text-xl">print</span>
  Imprimer
  </button>
  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-md shadow-primary/20 hover:bg-primary/90 transition-all">
  <span className="material-symbols-outlined text-xl">download</span>
  Télécharger Archive
  </button>
  </div>
  </div>

 {/* Citoyen Info */}
 <Card className="p-0 overflow-hidden shadow-sm">
 <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
 <h3 className="text-lg font-bold flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">person</span>
 Informations du Citoyen
 </h3>
 </div>
 <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 <div>
 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Nom Complet</p>
 <p className="text-slate-900 font-semibold mt-1">{demande.citoyenId?.nom} {demande.citoyenId?.prenom}</p>
 </div>
 <div>
 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Date de naissance</p>
 <p className="text-slate-900 font-semibold mt-1">
 {demande.citoyenId?.dateNaissance ? new Date(demande.citoyenId.dateNaissance).toLocaleDateString() : 'N/A'}
 </p>
 </div>
 <div>
 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email</p>
 <p className="text-slate-900 font-semibold mt-1">{demande.citoyenId?.email}</p>
 </div>
 <div className="md:col-span-2">
 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Adresse</p>
 <p className="text-slate-900 font-semibold mt-1">{demande.citoyenId?.adresse || 'Non renseignée'}</p>
 </div>
 <div>
 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">N° Identité</p>
 <p className="text-slate-900 font-semibold mt-1">{demande.citoyenId?.cnib || 'N/A'}</p>
 </div>
 </div>
 </Card>

 {/* Documents */}
 <section className="space-y-4">
 <h3 className="text-xl font-bold px-1">Pièces justificatives</h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
 {demande.piecesJointes && demande.piecesJointes.length > 0 ? (
 demande.piecesJointes.map((piece, idx) => (
 <a 
 key={idx} 
 href={piece.url} 
 target="_blank"
 rel="noopener noreferrer"
 className="group relative bg-white border border-slate-200 rounded-xl p-3 hover:shadow-md transition-shadow"
 >
 <div className="aspect-video bg-slate-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
 <span className="material-symbols-outlined text-slate-300 text-5xl group-hover:scale-110 transition-transform">description</span>
 </div>
 <p className="text-sm font-bold text-slate-900 truncate">{piece.nom}</p>
 <p className="text-xs text-slate-500 mt-0.5 capitalize">{piece.type}</p>
 </a>
 ))
 ) : (
 <p className="text-slate-400 italic">Aucun document joint.</p>
 )}
 </div>
 </section>

 {/* Timeline */}
 <Card className="p-6">
 <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800">
 <span className="material-symbols-outlined text-primary">history</span>
 Historique du dossier
 </h3>
 <div className="relative flex flex-col gap-6 ml-3">
 <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-200"></div>
 {demande.historique && demande.historique.length > 0 ? (
 demande.historique.map((h, i) => (
 <div key={i} className="relative pl-8">
 <div className={`absolute left-[-5px] top-1.5 size-2.5 rounded-full ${getStatusColor(h.statut)}`}></div>
 <p className="text-sm font-bold text-slate-900">{h.action || h.statut}</p>
 <p className="text-xs text-slate-500 mt-0.5">
 {new Date(h.date).toLocaleString()} | {h.auteur || 'Agent'}
 </p>
 {h.message && <p className="text-xs text-slate-600 mt-1 italic">"{h.message}"</p>}
 </div>
 ))
 ) : (
 <div className="relative pl-8">
 <div className="absolute left-[-5px] top-1.5 size-2.5 rounded-full bg-success"></div>
 <p className="text-sm font-bold text-slate-900">Dossier reçu et enregistré</p>
 <p className="text-xs text-slate-500 mt-0.5">
 {new Date(demande.createdAt).toLocaleString()} | Système automatique
 </p>
 </div>
 )}
 </div>
 </Card>
 </div>

 {/* Right Column: Actions */}
 <div className="w-full lg:w-96 shrink-0 space-y-6">
 <div className="sticky top-24">
  <Card className="p-8 shadow-xl border-slate-200 bg-white relative overflow-hidden">
  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-0"></div>
  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 relative z-10">
  <span className="material-symbols-outlined text-primary text-3xl">gavel</span>
  Décision Administrative
  </h3>
  
  <div className="space-y-6 relative z-10">
  {demande.statut === 'EN_ATTENTE' && (
  <Button 
  className="w-full py-8 flex flex-col items-center justify-center gap-3 rounded-2xl shadow-lg shadow-primary/20"
  onClick={() => handleAction(agentService.prendreEnCharge)}
  loading={actionLoading}
  >
  <span className="material-symbols-outlined text-3xl">pan_tool</span>
  <span className="font-black text-lg uppercase tracking-wider">Accepter la charge</span>
  <span className="text-xs opacity-80 font-medium">Assigner ce dossier à mon poste</span>
  </Button>
  )}

  {(demande.statut === 'EN_COURS' || demande.statut === 'DOCUMENTS_MANQUANTS') && (
  <>
  <Button 
  variant="success"
  className="w-full py-6 flex flex-col items-center justify-center gap-1 rounded-2xl shadow-xl shadow-green-500/20 group"
  onClick={() => handleAction(agentService.validerDemande, notesAgent)}
  loading={actionLoading}
  >
  <span className="material-symbols-outlined text-4xl mb-1 group-hover:scale-110 transition-transform">verified_user</span>
  <span className="font-black text-xl uppercase tracking-widest">Valider & Signer</span>
  <span className="text-[10px] font-black uppercase text-white/80">Délivrer le document final</span>
  </Button>

  <div className="flex items-center gap-4 py-2">
  <div className="h-px bg-slate-100 flex-1"></div>
  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ou</span>
  <div className="h-px bg-slate-100 flex-1"></div>
  </div>

  <div className="space-y-4">
  <div className="relative group">
  <textarea 
  className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white text-sm placeholder:text-slate-400 min-h-[120px] transition-all outline-none"
  placeholder="Expliquez précisément le motif du refus..."
  value={rejectMotif}
  onChange={(e) => setRejectMotif(e.target.value)}
  />
  <div className="absolute right-3 top-3 opacity-20"><span className="material-symbols-outlined">edit_note</span></div>
  </div>
  <Button 
  variant="danger"
  className="w-full py-4 flex items-center justify-center gap-3 font-black uppercase tracking-wider rounded-xl shadow-lg shadow-red-500/10"
  onClick={handleReject}
  loading={actionLoading}
  >
  <span className="material-symbols-outlined">cancel</span>
  Réfuser le Dossier
  </Button>
  </div>
  </>
  )}

  {demande.statut === 'VALIDEE' && (
 <div className="p-4 bg-green-50 text-green-700 rounded-xl flex flex-col items-center text-center gap-2">
 <span className="material-symbols-outlined text-4xl">check_circle</span>
 <p className="font-bold">Demande validée</p>
 {demande.documentPDF && (
 <Button 
 variant="outline"
 className="mt-2 text-xs"
 onClick={() => window.open(demande.documentPDF, '_blank')}
 >
 Voir le document généré
 </Button>
 )}
 </div>
 )}

 {demande.statut === 'REJETEE' && (
 <div className="p-4 bg-red-50 text-red-700 rounded-xl flex flex-col items-center text-center gap-2">
 <span className="material-symbols-outlined text-4xl">cancel</span>
 <p className="font-bold">Demande rejetée</p>
 {demande.motifRejet && <p className="text-sm mt-2 font-medium">Motif: {demande.motifRejet}</p>}
 </div>
 )}

  <div className="pt-6 border-t border-slate-100 space-y-4">
  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
  <span className="material-symbols-outlined text-amber-500">warning</span>
  <p className="text-[11px] font-bold text-slate-500 leading-tight">
  Attention: Cette action est irréversible et sera enregistrée dans les logs d'audit nationaux.
  </p>
  </div>
  </div>
  </div>
  </Card>

 {/* Agent Notes */}
 <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
 <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Notes de l'agent</h4>
 {isEditingNotes ? (
 <div className="space-y-2">
 <textarea 
 className="w-full p-2 text-xs border rounded-lg focus:ring-primary/20"
 value={notesAgent}
 onChange={(e) => setNotesAgent(e.target.value)}
 autoFocus
 />
 <div className="flex gap-2">
 <Button size="xs"onClick={() => setIsEditingNotes(false)}>Enregistrer</Button>
 <Button size="xs"variant="ghost"onClick={() => setIsEditingNotes(false)}>Annuler</Button>
 </div>
 </div>
 ) : (
 <>
 <p className="text-xs text-slate-600 italic">
 {notesAgent || '"Aucune note pour le moment."'}
 </p>
 <button 
 className="mt-3 text-primary text-xs font-bold flex items-center gap-1 hover:underline"
 onClick={() => setIsEditingNotes(true)}
 >
 <span className="material-symbols-outlined text-sm">edit</span>
 Modifier la note
 </button>
 </>
 )}
 </div>
 </div>
 </div>
 </div>
 </main>
 </Layout>
 );
};

export default AgentDetailDemandePage;
