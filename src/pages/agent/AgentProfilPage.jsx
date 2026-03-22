import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Alert from '../../components/ui/Alert';
import Badge from '../../components/Badge';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import agentService from '../../services/agentService';
import uploadService from '../../services/uploadService';

const AgentProfilPage = () => {
 const { user, setUser } = useAuth();
 const [loading, setLoading] = useState(true);
 const [stats, setStats] = useState(null);
 const [error, setError] = useState(null);
 const [success, setSuccess] = useState(null);
 const [updateLoading, setUpdateLoading] = useState(false);

 // States for password change
 const [pwdForm, setPwdForm] = useState({
 currentPassword: '',
 newPassword: '',
 confirmPassword: ''
 });
 const [showPwdModal, setShowPwdModal] = useState(false);

 useEffect(() => {
 const fetchData = async () => {
 setLoading(true);
 const [userRes, statsRes] = await Promise.all([
 authService.getMe(),
 agentService.getStatsAgent()
 ]);

 if (userRes.success) setUser(userRes.data);
 if (statsRes.success) setStats(statsRes.data);
 
 setLoading(false);
 };
 fetchData();
 }, [setUser]);

 const handlePhotoUpload = async (e) => {
 const file = e.target.files[0];
 if (!file) return;

 setUpdateLoading(true);
 const uploadRes = await uploadService.uploadFile(file);
 if (uploadRes.success) {
 const updateRes = await authService.updateProfil({ photo: uploadRes.data.url });
 if (updateRes.success) {
 setUser(updateRes.data.user || updateRes.data);
 setSuccess('Photo de profil mise à jour');
 } else {
 setError(updateRes.error);
 }
 } else {
 setError(uploadRes.error);
 }
 setUpdateLoading(false);
 };

 const handlePasswordChange = async (e) => {
 e.preventDefault();
 if (pwdForm.newPassword !== pwdForm.confirmPassword) {
 setError('Les mots de passe ne correspondent pas');
 return;
 }
 if (pwdForm.newPassword.length < 6) {
 setError('Le mot de passe doit contenir au moins 6 caractères');
 return;
 }

 setUpdateLoading(true);
 const res = await authService.updatePassword({
 currentPassword: pwdForm.currentPassword,
 newPassword: pwdForm.newPassword
 });

 if (res.success) {
 setSuccess('Mot de passe mis à jour avec succès');
 setShowPwdModal(false);
 setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
 } else {
 setError(res.error);
 }
 setUpdateLoading(false);
 };

 if (loading) return <Loader fullPage />;

 return (
 <Layout>
 <Navbar title="Mon Profil Professionnel"/>
 
 <div className="p-8 space-y-8 max-w-5xl mx-auto">
 {(error || success) && (
 <Alert 
 variant={error ? 'danger' : 'success'} 
 message={error || success} 
 onClose={() => { setError(null); setSuccess(null); }} 
 />
 )}

  {/* Profile Hero Banner */}
  <div className="relative rounded-3xl overflow-hidden shadow-xl">
  <div className="h-48 bg-gradient-to-r from-primary via-primary/90 to-blue-600 relative">
  <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)',backgroundSize: '10px 10px'}}></div>
  <div className="absolute top-4 right-4 flex gap-2">
  <span className="px-3 py-1 bg-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-sm border border-white/20">Agent Accrédité</span>
  </div>
  </div>
  <div className="bg-white px-8 pb-8">
  <div className="flex flex-col md:flex-row gap-6 items-end md:items-start -mt-16 relative">
  <div className="relative group shrink-0">
  <div className="size-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
  <img 
  className="w-full h-full object-cover"
  src={user?.photo || `https://ui-avatars.com/api/?name=${user?.prenom}+${user?.nom}&background=1B4F72&color=fff&size=200`}
  alt="Profil"
  />
  </div>
  <label className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform">
  <span className="material-symbols-outlined text-sm">photo_camera</span>
  <input type="file" className="hidden" onChange={handlePhotoUpload} accept="image/*" disabled={updateLoading} />
  </label>
  </div>
  <div className="flex-1 pt-4 md:pt-20 text-center md:text-left">
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
  <div>
  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{user?.prenom} {user?.nom}</h2>
  <p className="text-primary font-bold mt-1 uppercase tracking-wider text-sm">{user?.role?.replace('_', ' ')}</p>
  <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
  <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-slate-200">
  Matricule: {user?.matricule || 'AD-5542-BF'}
  </span>
  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
  ● Actif
  </span>
  </div>
  </div>
  <button onClick={() => setShowPwdModal(true)} className="px-6 py-3 bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all">
  Modifier le mot de passe
  </button>
  </div>
  </div>
  </div>
  </div>
  </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {/* Main Info */}
 <div className="lg:col-span-2 space-y-6">
 <Card className="p-0 overflow-hidden">
 <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
 <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
 <span className="material-symbols-outlined text-primary">badge</span>
 Informations de Service
 </h3>
 </div>
 <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
 {[
 { label:"Service", value: user?.service?.nom || user?.service || 'N/A' },
 { label:"Poste", value: user?.role?.replace('_', ' ') || 'Agent' },
 { label:"E-mail professionnel", value: user?.email },
 { label:"Date d'embauche", value: user?.dateEmbauche ? new Date(user.dateEmbauche).toLocaleDateString() : 'Non renseignée' },
 { label:"Lieu d'affectation", value: user?.lieuAffectation || 'Ouagadougou, BF' },
 { label:"Matricule", value: user?.matricule || 'AD-5542-BF' }
 ].map((item, idx) => (
 <div key={idx} className="space-y-1 group relative">
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
 <p className="text-sm font-semibold text-slate-700 bg-slate-50/50 p-2 rounded border border-transparent group-hover:border-slate-200 transition-all">
 {item.value}
 <span className="material-symbols-outlined text-[14px] text-slate-300 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">lock</span>
 </p>
 </div>
 ))}
 </div>
 <div className="px-6 py-4 bg-amber-50 border-t border-amber-100 italic text-[11px] text-amber-700 flex items-center gap-2">
 <span className="material-symbols-outlined text-sm">info</span>
 Ces informations sont gérées par l'administrateur. Contactez votre responsable pour toute modification.
 </div>
 </Card>

 <Card className="p-6">
 <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800">
 <span className="material-symbols-outlined text-primary">analytics</span>
 Statistiques de Performance
 </h3>
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dossiers traités</p>
 <p className="text-2xl font-black text-primary">{stats?.totalTraitees || 0}</p>
 </div>
 <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">En attente (Service)</p>
 <p className="text-2xl font-black text-orange-600">{stats?.enAttenteService || 0}</p>
 </div>
 </div>
 </Card>
 </div>

 {/* Side Panel */}
 <div className="space-y-6">
 <Card className="bg-primary/5 border-primary/10 p-6 relative overflow-hidden group">
 <div className="relative z-10">
 <h4 className="font-bold text-primary mb-2">Qualité de service</h4>
 <p className="text-xs text-slate-600 leading-relaxed mb-4">Votre taux de précision actuel est basé sur les retours citoyens et la conformité des dossiers.</p>
 <div className="flex items-center gap-2">
 <span className="text-3xl font-black text-primary">98%</span>
 <span className="text-[10px] font-bold text-green-600 uppercase">Excellent</span>
 </div>
 </div>
 <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-primary/5 select-none pointer-events-none transition-transform group-hover:scale-110">military_tech</span>
 </Card>

 <Card className="p-6 border-dashed border-2 flex flex-col items-center justify-center text-center gap-3">
 <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
 <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
 </div>
 <div>
 <p className="text-xs font-bold text-slate-700">Sécurité du compte</p>
 <p className="text-[10px] text-slate-400 mt-1">Dernière connexion: {new Date().toLocaleDateString()}</p>
 </div>
 <Button variant="ghost"size="sm"className="text-[10px] text-primary"onClick={() => setShowPwdModal(true)}>
 Changer le mot de passe
 </Button>
 </Card>
 </div>
 </div>

 {/* Password Modal */}
 {showPwdModal && (
 <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
 <Card className="w-full max-w-md shadow-2xl scale-in">
 <div className="p-6 border-b border-slate-50 flex justify-between items-center">
 <h3 className="text-xl font-bold text-slate-800">Changer le mot de passe</h3>
 <button onClick={() => setShowPwdModal(false)} className="text-slate-400 hover:text-slate-600">
 <span className="material-symbols-outlined">close</span>
 </button>
 </div>
 <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
 <div className="space-y-1">
 <label className="text-xs font-bold text-slate-500 uppercase">Mot de passe actuel</label>
 <input 
 type="password"
 className="w-full p-3 rounded-xl border border-slate-200 focus:ring-primary/20"
 required
 value={pwdForm.currentPassword}
 onChange={(e) => setPwdForm({...pwdForm, currentPassword: e.target.value})}
 />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-bold text-slate-500 uppercase">Nouveau mot de passe</label>
 <input 
 type="password"
 className="w-full p-3 rounded-xl border border-slate-200 focus:ring-primary/20"
 required
 value={pwdForm.newPassword}
 onChange={(e) => setPwdForm({...pwdForm, newPassword: e.target.value})}
 />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-bold text-slate-500 uppercase">Confirmer le mot de passe</label>
 <input 
 type="password"
 className="w-full p-3 rounded-xl border border-slate-200 focus:ring-primary/20"
 required
 value={pwdForm.confirmPassword}
 onChange={(e) => setPwdForm({...pwdForm, confirmPassword: e.target.value})}
 />
 </div>
 <Button type="submit"className="w-full"loading={updateLoading}>
 Mettre à jour le mot de passe
 </Button>
 </form>
 </Card>
 </div>
 )}
 </div>
 </Layout>
 );
};

export default AgentProfilPage;
