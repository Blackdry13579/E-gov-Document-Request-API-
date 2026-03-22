import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Button from '../../components/Button';

const ConfirmationPage = () => {
 const location = useLocation();
 const demande = location.state?.demande;

 if (!demande) {
 return <Navigate to="/dashboard"replace />;
 }

 return (
 <Layout>
 <Navbar title="Confirmation"/>
 
 <div className="p-8 flex flex-col items-center justify-center min-h-[70vh]">
 <div className="confirmation-content max-w-md w-full text-center">
  <div className="success-animation mb-10 relative">
  <div className="size-32 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto border-4 border-white shadow-xl relative z-10">
  <span className="material-symbols-outlined text-7xl animate-pulse">check_circle</span>
  </div>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 bg-emerald-100/50 rounded-full animate-ping -z-0"></div>
  </div>

 <h1 className="text-3xl font-black text-slate-900 mb-4">Demande Transmise !</h1>
 <p className="text-slate-500 mb-8 leading-relaxed">
 Votre demande de <span className="text-slate-900 font-bold">{demande.documentType?.nom}</span> a été enregistrée avec succès sous le numéro :
 </p>

  <div className="relative group mb-10">
  <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all rounded-3xl"></div>
  <Card className="bg-white border-2 border-slate-100 py-8 relative z-10 overflow-hidden">
  <div className="absolute top-0 left-0 w-1 bg-primary h-full"></div>
  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Référence Unique de Dossier</p>
  <h2 className="text-4xl font-mono font-black text-slate-900 select-all tracking-tighter">
  {demande.numeroSuivi || demande._id?.substring(0, 8).toUpperCase()}
  </h2>
  <div className="mt-4 flex items-center justify-center gap-2 text-primary text-[10px] font-black uppercase tracking-wider">
  <span className="material-symbols-outlined text-sm">content_copy</span>
  Cliquez pour copier
  </div>
  </Card>
  </div>

 <div className="info-box bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex gap-4 text-left mb-10">
 <span className="material-symbols-outlined text-primary">info</span>
 <p className="text-sm text-slate-600">
 Vous recevrez une notification par email et SMS à chaque étape du traitement. Vous pouvez suivre l'avancement dans votre espace personnel.
 </p>
 </div>

  <div className="flex flex-col gap-4">
  <Link to="/dashboard">
  <button className="w-full py-4 bg-primary text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all text-sm">
  Tableau de Bord
  </button>
  </Link>
  <Link to="/demandes">
  <button className="w-full py-4 bg-slate-100 text-slate-600 rounded-xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all text-sm">
  Voir mes demandes
  </button>
  </Link>
  </div>
 </div>
 </div>
 </Layout>
 );
};

export default ConfirmationPage;
