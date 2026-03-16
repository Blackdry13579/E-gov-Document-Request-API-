import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';
import { 
  Settings, Shield, Plus, Search, 
  Building2, Key, Info, Activity,
  CheckCircle, AlertTriangle, Edit2, Trash2
} from 'lucide-react';

const AdminSystemePage = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'services') {
        const res = await adminService.getAllServices();
        if (res.success) setServices(res.data);
      } else {
        const res = await adminService.getAllRoles();
        if (res.success) setRoles(res.data);
      }
    } catch (err) {
      setError("Erreur lors de la récupération des données système.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === true || status === 'ACTIF' || status === 'Stable') {
      return (
        <span className="flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> ACTIF
        </span>
      );
    }
    return (
      <span className="flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> INACTIF
      </span>
    );
  };

  return (
    <div className="app-container flex min-h-screen bg-slate-50">
      <Sidebar activePage="systeme" />
      
      <main className="main-content flex-1 ml-72 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Configuration Système</h1>
          <p className="text-slate-500 font-medium">Gérez la structure administrative et les habilitations de sécurité.</p>
        </header>

        {/* Tabs Navigation */}
        <div className="flex border-b border-slate-200 gap-8 mb-8">
          <button 
            onClick={() => setActiveTab('services')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${
              activeTab === 'services' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Building2 size={18} /> Gestion des Services
          </button>
          <button 
            onClick={() => setActiveTab('roles')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${
              activeTab === 'roles' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Key size={18} /> Rôles & Permissions
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main List Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                {activeTab === 'services' ? 'Catalogue des Services Publics' : 'Habilitations et Rôles'}
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition-all shadow-md">
                <Plus size={16} /> {activeTab === 'services' ? 'Nouveau Service' : 'Nouveau Rôle'}
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                      <th className="px-6 py-4">{activeTab === 'services' ? 'Nom du Service' : 'Nom du Rôle'}</th>
                      <th className="px-6 py-4">{activeTab === 'services' ? 'Code / Ministère' : 'Description'}</th>
                      <th className="px-6 py-4 text-center">Statut</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 uppercase">
                    {loading ? (
                      <tr><td colSpan="4" className="text-center py-12 text-slate-400">Chargement...</td></tr>
                    ) : (
                      activeTab === 'services' ? (
                        services.length > 0 ? services.map(service => (
                          <tr key={service._id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-800">{service.nom}</td>
                            <td className="px-6 py-4 text-slate-500">{service.code}</td>
                            <td className="px-6 py-4 flex justify-center">{getStatusBadge(service.actif)}</td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-primary font-bold hover:underline">Modifier</button>
                            </td>
                          </tr>
                        )) : <tr><td colSpan="4" className="text-center py-12 text-slate-400">Aucun service trouvé.</td></tr>
                      ) : (
                        roles.length > 0 ? roles.map(role => (
                          <tr key={role._id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-800">{role.nom}</td>
                            <td className="px-6 py-4 text-slate-500 text-xs normal-case">{role.description}</td>
                            <td className="px-6 py-4 flex justify-center">{getStatusBadge(role.actif)}</td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-primary font-bold hover:underline">Détails</button>
                            </td>
                          </tr>
                        )) : <tr><td colSpan="4" className="text-center py-12 text-slate-400">Aucun rôle trouvé.</td></tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Activity size={18} className="text-primary" /> État du Système
              </h3>
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Disponibilité</p>
                  <p className="text-2xl font-black text-primary">99.9%</p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-green-600">
                    <CheckCircle size={12} /> Tous les services sont en ligne
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Dernière Audit</p>
                  <p className="text-sm font-bold text-slate-800">Il y a 2 heures</p>
                  <p className="text-[10px] text-slate-400">Par admin_ouaga_central</p>
                </div>

                <div className="p-4 rounded-xl bg-primary text-white shadow-lg overflow-hidden relative">
                  <Shield className="absolute -right-4 -bottom-4 size-24 opacity-10 rotate-12" />
                  <p className="font-bold mb-2">Sécurité</p>
                  <p className="text-xs text-blue-100">Protocole de chiffrement TLS 1.3 activé sur tous les endpoints.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Info size={18} className="text-primary" /> Aide Rapide
              </h3>
              <ul className="space-y-3">
                <li className="text-xs text-slate-600 flex gap-2">
                  <div className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                  Chaque rôle doit être rattaché à au moins une permission.
                </li>
                <li className="text-xs text-slate-600 flex gap-2">
                  <div className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                  La désactivation d'un service désactive tous les agents y étant liés.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSystemePage;
