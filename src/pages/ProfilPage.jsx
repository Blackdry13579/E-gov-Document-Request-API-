import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { useNotif } from '../context/NotifContext';
import { authService } from '../services/authService';

const ProfilPage = () => {
 const { user } = useAuth();
 const { addNotif } = useNotif();
 const [formData, setFormData] = useState({
 nom: user?.nom || '',
 prenom: user?.prenom || '',
 email: user?.email || '',
 telephone: user?.telephone || ''
 });
 const [loading, setLoading] = useState(false);

 const handleChange = (e) => {
 const { name, value } = e.target;
 setFormData(prev => ({ ...prev, [name]: value }));
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 setLoading(true);
 const result = await authService.updateProfile(formData);
 setLoading(false);

 if (result.success) {
 addNotif('Profil mis à jour avec succès.', 'success');
 } else {
 addNotif(result.error, 'danger');
 }
 };

 return (
 <Layout>
 <Navbar title="Mon Profil"/>
 
 <div className="p-8 max-w-4xl mx-auto">
  <div className="mb-12 flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0"></div>
  <div className="size-28 bg-primary text-white rounded-[2rem] flex items-center justify-center text-4xl font-black shadow-xl shadow-primary/20 border-4 border-white relative z-10 transition-transform hover:scale-105">
  {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
  </div>
  <div className="text-center md:text-left relative z-10">
  <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user?.prenom} {user?.nom}</h1>
  <span className="px-2 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase rounded-lg tracking-widest border border-emerald-200">Vérifié</span>
  </div>
  <p className="text-slate-500 font-medium">Numéro d'identité: <span className="text-slate-900 font-bold tracking-widest">{user?.cnib || 'B12345678'}</span></p>
  <p className="text-xs text-slate-400 mt-2 font-black uppercase tracking-tighter italic">Membre depuis {new Date(user?.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
  </div>
  </div>

 <section className="grid gap-8">
 <Card>
 <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
 <span className="material-symbols-outlined text-primary">person</span>
 <h3 className="font-bold text-slate-800">Informations Personnelles</h3>
 </div>
  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
  <div className="space-y-1">
  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nom de famille</label>
  <Input 
  name="nom"
  value={formData.nom} 
  onChange={handleChange} 
  className="bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20"
  />
  </div>
  <div className="space-y-1">
  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Prénom(s)</label>
  <Input 
  name="prenom"
  value={formData.prenom} 
  onChange={handleChange} 
  className="bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20"
  />
  </div>
  <div className="space-y-1">
  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Adresse Email (Identifiant)</label>
  <Input 
  name="email"
  type="email"
  value={formData.email} 
  onChange={handleChange} 
  disabled
  className="bg-slate-100 border-none rounded-xl text-slate-400 font-bold"
  />
  </div>
  <div className="space-y-1">
  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Téléphonique</label>
  <Input 
  name="telephone"
  value={formData.telephone} 
  onChange={handleChange} 
  className="bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20"
  />
  </div>
  
  <div className="md:col-span-2 flex justify-end mt-4 pt-6 border-t border-slate-50">
  <button 
  type="submit"
  disabled={loading}
  className="px-8 py-3 bg-primary text-white text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
  >
  {loading ? 'Mise à jour...' : 'Enregistrer le Profil'}
  </button>
  </div>
  </form>
 </Card>

  <Card className="border-l-4 border-l-secondary p-8">
  <div className="flex items-center gap-3 mb-4">
  <span className="material-symbols-outlined text-secondary text-3xl">shield_lock</span>
  <h3 className="text-xl font-black text-slate-900 tracking-tight">Sécurité des données</h3>
  </div>
  <p className="text-sm text-slate-500 mb-8 max-w-lg">Votre compte est protégé par des protocoles cryptographiques. Pour réinitialiser votre accès, cliquez ci-dessous.</p>
  <button className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-secondary/20 hover:opacity-90 transition-all">
  <span className="material-symbols-outlined text-lg">lock_reset</span>
  Modifier mon mot de passe
  </button>
  </Card>
 </section>
 </div>
 </Layout>
 );
};

export default ProfilPage;
