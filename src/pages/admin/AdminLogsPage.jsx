import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import './AdminLogsPage.css';

const AdminLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const handleExport = () => {
  console.log('Exporting logs...');
  alert('Exportation CSV en cours...');
  };

  const handleRefresh = () => {
  console.log('Refreshing logs...');
  alert('Actualisation des logs...');
  };
 return (
 <Layout>
 <div className="flex-1 flex flex-col space-y-8">
 {/* Header Section */}
 <header>
 <div className="flex flex-wrap justify-between items-end gap-6">
 <div className="max-w-2xl">
 <h2 className="text-4xl font-black tracking-tight text-primary mb-2">Logs d'Audit</h2>
 <p className="text-slate-500 text-lg">Historique chronologique complet des actions effectuées sur la plateforme.</p>
 </div>
 <div className="flex gap-3">
  <button 
  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-bold text-sm shadow-sm"
  onClick={handleExport}
  >
  <span className="material-symbols-outlined text-xl">download</span>
  Exporter CSV
  </button>
  <button 
  className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
  onClick={handleRefresh}
  >
  <span className="material-symbols-outlined text-xl">refresh</span>
  Actualiser
  </button>
 </div>
 </div>
 </header>

 {/* Filters Section */}
 <section>
 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6">
  <div className="flex flex-wrap gap-4">
  <div className="flex-1 min-w-[240px]">
  <div className="relative">
  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
  <input 
  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400"
  placeholder="Rechercher une action ou un utilisateur..."
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  />
  </div>
  </div>
  <div className="flex flex-wrap gap-3">
  <select 
  className="flex items-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors text-sm font-medium border-none outline-none"
  value={filterType}
  onChange={(e) => setFilterType(e.target.value)}
  >
  <option value="all">Type d'action</option>
  <option value="auth">Connexion</option>
  <option value="modify">Modification</option>
  <option value="delete">Suppression</option>
  </select>

  <select 
  className="flex items-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors text-sm font-medium border-none outline-none"
  value={filterUser}
  onChange={(e) => setFilterUser(e.target.value)}
  >
  <option value="all">Utilisateurs</option>
  <option value="admin">Administrateurs</option>
  <option value="agent">Agents</option>
  </select>

  <select 
  className="flex items-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors text-sm font-medium border-none outline-none"
  value={filterPeriod}
  onChange={(e) => setFilterPeriod(e.target.value)}
  >
  <option value="all">Période</option>
  <option value="today">Aujourd'hui</option>
  <option value="week">7 derniers jours</option>
  <option value="month">30 derniers jours</option>
  </select>
  </div>
  </div>
 {/* Active Filters Pills (Empty state shown) */}
 </div>
 </section>

 {/* Logs Table Section */}
 <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
 <div className="overflow-x-auto">
 <table className="w-full text-left">
 <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-widest border-b border-slate-100">
 <tr>
 <th className="px-8 py-5">Horodatage</th>
 <th className="px-8 py-5">Utilisateur</th>
 <th className="px-8 py-5">Action</th>
 <th className="px-8 py-5">Module</th>
 <th className="px-8 py-5">Adresse IP</th>
 <th className="px-8 py-5">Statut</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 <tr className="hover:bg-slate-50/50 transition-colors">
 <td className="px-8 py-5">
 <div className="flex flex-col">
 <span className="text-sm font-bold text-slate-900">21 Oct 2023</span>
 <span className="text-xs text-slate-500">14:22:05</span>
 </div>
 </td>
 <td className="px-8 py-5">
 <div className="flex items-center gap-3">
 <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">AD</div>
 <div className="flex flex-col">
 <span className="text-sm font-bold">Admin_Ouaga</span>
 <span className="text-[10px] uppercase text-slate-500 font-medium">Super Admin</span>
 </div>
 </div>
 </td>
 <td className="px-8 py-5">
 <span className="text-sm font-medium">Modification des permissions</span>
 </td>
 <td className="px-8 py-5">
 <span className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-600 border border-slate-200">Utilisateurs</span>
 </td>
 <td className="px-8 py-5">
 <code className="text-xs text-slate-500">192.168.1.105</code>
 </td>
 <td className="px-8 py-5">
 <span className="flex items-center gap-1.5 text- emerald-600 font-bold text-[11px] uppercase">
 <span className="size-1.5 rounded-full bg-emerald-500"></span>
 Succès
 </span>
 </td>
 </tr>
 {/* More log entries could be mapped here */}
 </tbody>
 </table>
 </div>
 {/* Pagination */}
 <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
 <span className="text-sm text-slate-500">Affichage de 1-25 sur 1,240 entrées</span>
 <div className="flex gap-2">
 <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-white transition-colors">Précédent</button>
 <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-white transition-colors">Suivant</button>
 </div>
 </div>
 </section>
 </div>
 </Layout>
 );
};

export default AdminLogsPage;
