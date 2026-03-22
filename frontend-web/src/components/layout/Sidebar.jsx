import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

const Sidebar = () => {
 const { user, logout } = useAuth();
 const [isOpen, setIsOpen] = useState(false);

 const menuConfig = {
 CITOYEN: [
 { path: '/dashboard', icon: 'dashboard', label: 'Tableau de bord' },
 { path: '/demandes', icon: 'description', label: 'Mes Demandes' },
 { path: '/notifications', icon: 'notifications', label: 'Notifications' },
 { path: '/profil', icon: 'person', label: 'Mon Profil' },
 ],
 AGENT: [
 { path: '/agent/dashboard', icon: 'dashboard', label: 'Tableau de bord' },
 { path: '/agent/demandes', icon: 'content_paste', label: 'Liste des demandes' },
 { path: '/agent/archives', icon: 'archive', label: 'Archives' },
 { path: `/admin/agents/${user?._id}`, icon: 'person', label: 'Mon Profil' },
 ],
 ADMIN: [
 { path: '/admin/dashboard', icon: 'dashboard', label: 'Tableau de bord' },
 { path: '/admin/demandes', icon: 'assignment', label: 'Demandes' },
 { path: '/admin/ressources', icon: 'group', label: 'Agents + Documents' },
 { path: '/admin/systeme', icon: 'account_balance', label: 'Services + Rôles' },
 { path: '/admin/statistiques', icon: 'trending_up', label: 'Statistiques' },
 { path: '/admin/logs', icon: 'history', label: 'Historique Global' },
 { path: '/admin/profil', icon: 'person', label: 'Mon Profil' },
 ]
 };

 const getMenu = () => {
 if (!user) return [];
 if (user.role === 'ADMIN') return menuConfig.ADMIN;
 if (user.role === 'CITOYEN') return menuConfig.CITOYEN;
 if (user.role.startsWith('AGENT_') || user.role === 'SUPERVISEUR') return menuConfig.AGENT;
 return [];
 };

 const menuItems = getMenu();

 return (
 <>
 <button 
 onClick={() => setIsOpen(true)}
 className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-slate-700 focus:outline-none"
 >
 <span className="material-symbols-outlined">menu</span>
 </button>

 {isOpen && (
 <div 
 className="lg:hidden fixed inset-0 bg-black/50 z-40"
 onClick={() => setIsOpen(false)}
 />
 )}

 <aside className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
 <div className="sidebar-logo">
 {user?.role === 'CITOYEN' ? (
 <div className="flex flex-col items-center w-full py-4 gap-2">
 <img 
 alt="Sceau National Burkina Faso"
 className="h-24 w-auto drop-shadow-md"
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5P7ho7BXYQ-uqZsOLFSBQ8ykUVx2CSEN4P6hUWg_FCNC4G_SO1L62Pple_CIi8D2-1mrcbAkYr9uQJS9MXpQaAHeLeU4Mf2qNZxqZJcqX3lQGbhySzDOI-68JIDBOVWAoo5QfS_pUCq1kPSySDm2usFt9CEE2ACZfjLMZ03ys_mWszFL_1x8lYkNFLMqy3XkQQ0Zk5Da2PTZ4UM8mCJ-0Tb4HEWfubtIz6HugWoX8pHLjEncv9mrZ8YvrOohVSHi8WalE6ZgCw_A"
 />
 <div className="text-center">
 <p className="text-[10px] font-black tracking-widest text-primary uppercase">Unité • Progrès • Justice</p>
 </div>
 </div>
 ) : (
 <>
 <div className="bg-primary p-2 rounded-lg text-white">
 <span className="material-symbols-outlined">account_balance</span>
 </div>
 <h1 className="text-xl font-bold text-primary tracking-tight">E-Gov BF</h1>
 </>
 )}
 </div>

 <nav className="sidebar-nav space-y-1 mt-4">
 {menuItems.map((item) => (
 <NavLink
 key={item.path}
 to={item.path}
 onClick={() => setIsOpen(false)}
 className={({ isActive }) => 
 `sidebar-link ${isActive ? 'active' : ''}`
 }
 >
 <span className="material-symbols-outlined">{item.icon}</span>
 <span>{item.label}</span>
 </NavLink>
 ))}
 </nav>

 <div className="sidebar-footer">
 {user && (
 <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
 <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/20">
 {user.avatar ? (
 <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
 ) : (
 <span className="text-xs uppercase font-black">{user.prenom?.[0]}{user.nom?.[0]}</span>
 )}
 </div>
 <div className="flex flex-col min-w-0">
 <p className="text-sm font-bold text-slate-800 truncate">{user.prenom}</p>
 <p className="text-[10px] text-primary font-black uppercase tracking-tighter">{user.role}</p>
 </div>
 </div>
 )}
 <div className="my-4 border-t border-slate-200"/>
 <button 
 onClick={logout}
 className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all font-semibold text-sm"
 >
 <span className="material-symbols-outlined text-sm">logout</span>
 <span>Déconnexion</span>
 </button>
 </div>
 </aside>
 </>
 );
};

export default Sidebar;
