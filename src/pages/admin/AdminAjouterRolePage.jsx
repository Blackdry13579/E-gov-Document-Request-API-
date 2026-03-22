import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import './AdminAjouterRolePage.css';

const AdminAjouterRolePage = () => {
 return (
 <Layout>
 <div className="max-w-5xl mx-auto w-full">
 {/* Breadcrumb and Header */}
 <div className="mb-8">
 <nav className="flex items-center gap-2 text-slate-400 text-sm mb-4 uppercase tracking-widest">
 <Link to="/admin/dashboard">Accueil</Link>
 <span className="text-slate-400 text-sm">/</span>
 <Link to="/admin/systeme">Configuration</Link>
 <span className="text-slate-400 text-sm">/</span>
 <span className="text-primary font-bold">Ajouter un Nouveau Rôle</span>
 </nav>
 <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ajouter un Nouveau Rôle</h2>
 <p className="text-slate-500 mt-2">Définissez les privilèges et les limites d'accès pour les agents de l'administration publique.</p>
 </div>

 <form className="space-y-8">
 {/* Section: General Info */}
 <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
 <div className="p-6 border-b border-slate-100 bg-slate-50/50">
 <h3 className="font-bold text-lg flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">info</span>
 Informations Générales
 </h3>
 </div>
 <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="flex flex-col gap-2">
 <label className="text-sm font-bold text-slate-700">Nom du Rôle</label>
 <input className="w-full rounded-xl border border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 bg-white transition-all"placeholder="ex: Agent Mairie, Superviseur DSI"type="text"/>
 </div>
 <div className="flex flex-col gap-2">
 <label className="text-sm font-bold text-slate-700">Département</label>
 <select className="w-full rounded-xl border border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 bg-white transition-all">
 <option>Administration Territoriale</option>
 <option>Finances Publiques</option>
 <option>Santé & Social</option>
 <option>Sécurité</option>
 </select>
 </div>
 <div className="flex flex-col gap-2 md:col-span-2">
 <label className="text-sm font-bold text-slate-700">Description du Rôle</label>
 <textarea className="w-full rounded-xl border border-slate-200 focus:ring-primary focus:border-primary px-4 py-3 bg-white transition-all"placeholder="Décrivez brièvement les responsabilités liées à ce rôle..."rows="3"></textarea>
 </div>
 </div>
 </section>

 {/* Section: Permissions Checklist */}
 <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
 <div className="p-6 border-b border-slate-100 bg-slate-50/50">
 <h3 className="font-bold text-lg flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">lock_open</span>
 Matrice des Permissions
 </h3>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-slate-50">
 <th className="px-8 py-4 text-xs font-black uppercase tracking-wider text-slate-500">Module Système</th>
 <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500 text-center">Lecture</th>
 <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500 text-center">Écriture</th>
 <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500 text-center">Validation</th>
 <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-slate-500 text-center">Suppression</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {/* Row 1 */}
 <tr className="hover:bg-slate-50 transition-colors">
 <td className="px-8 py-5">
 <p className="font-bold text-slate-900">État Civil</p>
 <p className="text-xs text-slate-500">Actes de naissance, mariage, décès</p>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"defaultChecked type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 </tr>
 {/* Row 2 */}
 <tr className="hover:bg-slate-50 transition-colors">
 <td className="px-8 py-5">
 <p className="font-bold text-slate-900">Identité Nationale</p>
 <p className="text-xs text-slate-500">CNIB, Passeports, Cartes consulaires</p>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"defaultChecked type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"defaultChecked type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 </tr>
 {/* Row 3 */}
 <tr className="hover:bg-slate-50 transition-colors">
 <td className="px-8 py-5">
 <p className="font-bold text-slate-900">Fiscalité & Taxes</p>
 <p className="text-xs text-slate-500">Paiements en ligne, déclarations</p>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 </tr>
 {/* Row 4 */}
 <tr className="hover:bg-slate-50 transition-colors">
 <td className="px-8 py-5">
 <p className="font-bold text-slate-900">Gestion des Utilisateurs</p>
 <p className="text-xs text-slate-500">Création de comptes agents</p>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 <td className="px-4 py-5 text-center">
 <input className="rounded text-primary focus:ring-primary size-5 cursor-pointer"type="checkbox"/>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </section>

 {/* Actions */}
 <div className="flex items-center justify-end gap-4 pb-12">
 <button className="px-8 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"type="button"onClick={() => window.history.back()}>
 Annuler
 </button>
 <button className="px-10 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"type="submit">
 Créer le Rôle
 </button>
 </div>
 </form>
 </div>
 </Layout>
 );
};

export default AdminAjouterRolePage;
