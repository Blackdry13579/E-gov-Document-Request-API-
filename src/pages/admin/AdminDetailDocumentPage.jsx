import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import './AdminDetailDocumentPage.css';

const AdminDetailDocumentPage = () => {
 return (
 <Layout>
 <div className="max-w-7xl mx-auto w-full">
 {/* Breadcrumbs */}
 <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-6">
 <Link className="hover:text-primary transition-colors" to="/admin/dashboard">Accueil</Link>
 <span className="material-symbols-outlined text-xs">chevron_right</span>
 <Link className="hover:text-primary transition-colors" to="/admin/ressources">Gestion documents</Link>
 <span className="material-symbols-outlined text-xs">chevron_right</span>
 <span className="text-slate-900">Casier Judiciaire B3</span>
 </nav>

 {/* Page Title Area */}
 <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
 <div className="space-y-2">
 <div className="flex items-center gap-3">
 <h1 className="text-4xl font-black text-slate-900 tracking-tight">Casier Judiciaire B3</h1>
 <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase">Actif</span>
 </div>
 <p className="text-slate-500 text-lg">Code: <span className="font-mono text-primary font-bold">DOC-BF-CJ-B3</span> | Catégorie: <span className="text-gov-blue font-semibold">Actes Judiciaires</span></p>
 </div>
 <div className="flex gap-3">
 <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
 <span className="material-symbols-outlined text-lg">print</span> Imprimer
 </button>
 <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:opacity-90 transition-all">
 <span className="material-symbols-outlined text-lg">edit</span> Modifier le document
 </button>
 </div>
 </div>

 {/* Stats Overview */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
 <div className="flex justify-between items-start mb-4">
 <div className="p-3 bg-gov-blue/10 text-gov-blue rounded-xl">
 <span className="material-symbols-outlined">analytics</span>
 </div>
 <span className="text-emerald-600 text-sm font-bold flex items-center gap-1">
 <span className="material-symbols-outlined text-sm font-bold">trending_up</span> +12.5%
 </span>
 </div>
 <p className="text-slate-500 font-medium mb-1">Demandes totales (Mensuel)</p>
 <p className="text-3xl font-black text-slate-900">12,450</p>
 </div>
 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
 <div className="flex justify-between items-start mb-4">
 <div className="p-3 bg-primary/10 text-primary rounded-xl">
 <span className="material-symbols-outlined">timer</span>
 </div>
 <span className="text-emerald-600 text-sm font-bold flex items-center gap-1">
 <span className="material-symbols-outlined text-sm font-bold">fast_forward</span> -4h
 </span>
 </div>
 <p className="text-slate-500 font-medium mb-1">Délai moyen de traitement</p>
 <p className="text-3xl font-black text-slate-900">18 heures</p>
 </div>
 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
 <div className="flex justify-between items-start mb-4">
 <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
 <span className="material-symbols-outlined">verified</span>
 </div>
 <span className="text-emerald-600 text-sm font-bold flex items-center gap-1">
 <span className="material-symbols-outlined text-sm font-bold">check_circle</span> stable
 </span>
 </div>
 <p className="text-slate-500 font-medium mb-1">Taux d'approbation</p>
 <p className="text-3xl font-black text-slate-900">94.2%</p>
 </div>
 </div>

 {/* Detail Cards */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {/* Main Info Card */}
 <div className="lg:col-span-2 space-y-8">
 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
 <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
 <h3 className="text-xl font-bold text-slate-800">Informations Générales</h3>
 <span className="material-symbols-outlined text-slate-300">info</span>
 </div>
 <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
 <div>
 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Service Responsable</label>
 <p className="text-lg font-semibold text-slate-800">Ministère de la Justice et des Droits Humains</p>
 <p className="text-sm text-slate-500">Direction Générale des Affaires Judiciaires</p>
 </div>
 <div>
 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Service Technique</label>
 <p className="text-lg font-semibold text-slate-800">ANPTIC</p>
 <p className="text-sm text-slate-500">Support E-Gov Faso</p>
 </div>
 <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-primary">
 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Coût de délivrance</label>
 <p className="text-2xl font-black text-primary">500 FCFA</p>
 <p className="text-xs text-slate-500">Payable via Mobile Money ou Carte</p>
 </div>
 <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-gov-blue">
 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Délai Contractuel</label>
 <p className="text-2xl font-black text-gov-blue">24 Heures</p>
 <p className="text-xs text-slate-500">À compter de la validation du paiement</p>
 </div>
 </div>
 </div>
 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
 <div className="px-8 py-6 border-b border-slate-100">
 <h3 className="text-xl font-bold text-slate-800">Pièces justificatives requises</h3>
 </div>
 <div className="p-8">
 <ul className="space-y-4">
 <li className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
 <div className="bg-gov-blue text-white size-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0">1</div>
 <div>
 <p className="font-bold text-slate-800">Copie légalisée du Certificat de Nationalité</p>
 <p className="text-sm text-slate-500">Format numérique (PDF/JPG) - Moins de 2 Mo</p>
 </div>
 <span className="material-symbols-outlined ml-auto text-emerald-600">check_circle</span>
 </li>
 <li className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
 <div className="bg-gov-blue text-white size-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0">2</div>
 <div>
 <p className="font-bold text-slate-800">Copie de l'Acte de Naissance</p>
 <p className="text-sm text-slate-500">Original scanné lisible requis</p>
 </div>
 <span className="material-symbols-outlined ml-auto text-emerald-600">check_circle</span>
 </li>
 <li className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
 <div className="bg-gov-blue text-white size-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0">3</div>
 <div>
 <p className="font-bold text-slate-800">Pièce d'Identité (CNIB ou Passeport)</p>
 <p className="text-sm text-slate-500">En cours de validité uniquement</p>
 </div>
 <span className="material-symbols-outlined ml-auto text-emerald-600">check_circle</span>
 </li>
 </ul>
 </div>
 </div>
 </div>

 {/* Sidebar Content */}
 <div className="space-y-8">
 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
 <h4 className="font-bold text-slate-800 mb-6">Activité Récente</h4>
 <div className="space-y-6">
 <div className="flex gap-4">
 <div className="size-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
 <div>
 <p className="text-sm font-bold">Mise à jour du coût</p>
 <p className="text-xs text-slate-500">Le coût est passé de 300 à 500 FCFA</p>
 <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">Il y a 2 jours</p>
 </div>
 </div>
 <div className="flex gap-4">
 <div className="size-2 bg-gov-blue rounded-full mt-2 flex-shrink-0"></div>
 <div>
 <p className="text-sm font-bold">Nouveau champ ajouté</p>
 <p className="text-xs text-slate-500">Ajout du numéro de téléphone obligatoire</p>
 <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">Il y a 1 semaine</p>
 </div>
 </div>
 <div className="flex gap-4">
 <div className="size-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
 <div>
 <p className="text-sm font-bold">Validation automatique active</p>
 <p className="text-xs text-slate-500">Mise en place de l'API de vérification CNIB</p>
 <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">Il y a 1 mois</p>
 </div>
 </div>
 </div>
 <button className="w-full mt-8 py-2 text-primary font-bold text-sm border-t border-slate-100 hover:bg-slate-50 transition-colors">
 Voir tout l'historique
 </button>
 </div>
 <div className="bg-gov-blue rounded-2xl p-6 text-white relative overflow-hidden">
 <div className="relative z-10">
 <h4 className="font-bold text-lg mb-2">Aide & Guide Admin</h4>
 <p className="text-white/60 mb-6 text-sm">Consultez les procédures de validation pour les administrateurs de la Justice.</p>
 <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
 <span className="material-symbols-outlined text-sm">book</span> Guide de procédure
 </button>
 </div>
 {/* Abstract pattern background */}
 <div className="absolute -right-4 -bottom-4 size-32 opacity-10">
 <span className="material-symbols-outlined text-[120px]">account_balance</span>
 </div>
 </div>
 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
 <p className="text-slate-400 text-xs font-bold uppercase mb-4">Qr Code de Configuration</p>
 <div className="size-32 bg-slate-100 mx-auto rounded-xl flex items-center justify-center mb-4">
 <span className="material-symbols-outlined text-4xl text-slate-300">qr_code_2</span>
 </div>
 <p className="text-sm text-slate-500 leading-tight">Scanner pour accéder à la configuration mobile de ce service.</p>
 </div>
 </div>
 </div>

 {/* Footer Assistance */}
 <div className="mt-12 flex justify-center items-center gap-6 text-slate-400 text-xs">
 <div className="flex items-center gap-1">
 <span className="material-symbols-outlined text-sm">help_outline</span>
 Besoin d'aide ? Consulter le guide d'administration
 </div>
 <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
 <div className="text-primary font-bold uppercase tracking-widest">Portail National de l'Administration Electronique</div>
 </div>
 </div>
 </Layout>
 );
};

export default AdminDetailDocumentPage;
