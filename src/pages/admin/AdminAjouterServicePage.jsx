import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import './AdminAjouterServicePage.css';

const AdminAjouterServicePage = () => {
 return (
 <Layout>
 <div className="max-w-4xl mx-auto w-full">
 {/* Breadcrumb and Header */}
 <div className="mb-8">
 <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4 uppercase tracking-widest">
 <Link to="/admin/systeme">Système</Link>
 <span className="material-symbols-outlined text-xs text-slate-300">chevron_right</span>
 <span className="font-bold text-primary">Ajouter un Service</span>
 </nav>
 <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ajouter un Nouveau Service</h2>
 <p className="text-slate-500 mt-2">Configurez un nouveau point d'entrée administratif pour les citoyens burkinabè.</p>
 </div>

 {/* Form Card */}
 <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
 <form className="p-8 space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Service Name */}
 <div className="col-span-2 space-y-2">
 <label className="block text-sm font-semibold text-slate-700">Nom du Service</label>
 <input className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"placeholder="Ex: Demande de Certificat de Nationalité"type="text"/>
 </div>
 {/* Category */}
 <div className="space-y-2">
 <label className="block text-sm font-semibold text-slate-700">Catégorie</label>
 <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
 <option value="">Sélectionner une catégorie</option>
 <option value="identity">Identité & Citoyenneté</option>
 <option value="civil">État Civil</option>
 <option value="justice">Justice</option>
 <option value="health">Santé</option>
 <option value="education">Éducation</option>
 <option value="tax">Impôts & Taxes</option>
 </select>
 </div>
 {/* Responsible Department */}
 <div className="space-y-2">
 <label className="block text-sm font-semibold text-slate-700">Ministère / Département Responsable</label>
 <input className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"placeholder="Ex: Ministère de la Justice"type="text"/>
 </div>
 {/* Description */}
 <div className="col-span-2 space-y-2">
 <label className="block text-sm font-semibold text-slate-700">Description du Service</label>
 <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"placeholder="Décrivez brièvement le but du service et les documents requis..."rows="4"></textarea>
 </div>
 {/* Status Toggle */}
 <div className="col-span-2 flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
 <div className="flex flex-col">
 <span className="text-sm font-bold text-slate-700">Statut du Service</span>
 <span className="text-xs text-slate-500">Activer ou désactiver immédiatement la visibilité du service</span>
 </div>
 <label className="relative inline-flex items-center cursor-pointer">
 <input className="sr-only peer"defaultChecked type="checkbox"value=""/>
 <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
 </label>
 </div>
 </div>
 {/* Action Buttons */}
 <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
 <button className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"type="button"onClick={() => window.history.back()}>
 Annuler
 </button>
 <button className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"type="submit">
 <span className="material-symbols-outlined text-lg">save</span>
 Créer le Service
 </button>
 </div>
 </form>
 </div>

 {/* Footer Info */}
 <div className="mt-8 flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
 <span className="material-symbols-outlined text-primary">info</span>
 <div>
 <h4 className="text-sm font-bold text-primary">Information</h4>
 <p className="text-xs text-slate-600 mt-1">Une fois créé, le service sera soumis à une validation technique avant d'être publié sur le portail public citoyen.</p>
 </div>
 </div>
 </div>
 </Layout>
 );
};

export default AdminAjouterServicePage;
