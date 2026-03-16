import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

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
      { path: '/agent/profil', icon: 'person', label: 'Mon Profil' },
    ],
    ADMIN: [
      { path: '/admin/dashboard', icon: 'dashboard', label: 'Tableau de bord' },
      { path: '/admin/demandes', icon: 'description', label: 'Demandes' },
      { path: '/admin/ressources', icon: 'inventory_2', label: 'Agents + Documents' },
      { path: '/admin/systeme', icon: 'account_balance', label: 'Services + Rôles' },
      { path: '/admin/statistiques', icon: 'analytics', label: 'Statistiques' },
      { path: '/admin/logs', icon: 'history', label: 'Historique Global' },
      { path: '/admin/profil', icon: 'person', label: 'Mon Profil' },
    ]
  };

  const getMenu = () => {
    if (!user) return [];
    if (user.role === 'CITOYEN') return menuConfig.CITOYEN;
    if (user.role === 'ADMIN') return menuConfig.ADMIN;
    if (user.role.startsWith('AGENT_') || user.role === 'SUPERVISEUR') return menuConfig.AGENT;
    return [];
  };

  const menuItems = getMenu();

  return (
    <aside className="sidebar fixed-left flex flex-col bg-deep-blue text-white w-72 min-h-screen">
      <div className="sidebar-header p-8 flex items-center gap-4">
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQXJybPNH4004ieJqy4yv_yu4-5EpOcSBSaOO_Hfn2Wj4YVRi-8XLAKhL6-XyL5A5sJK2Vutu2I6n13d96zWO5fvJ9PuiFacQ1QuvgWfxI-zSzWMUlEjw_y78QS0UNrzcx4D_yUORISSC3Asa6rus9dnL4ljwWwlroq8B0ZSYT-yPHMr0f-onXHJ2n04vyiPngxuSlYfv47ysGJO7jN-ltxiaK25fIqnnZh2rXmSZSVMpDIyXR3x1hd1A9bzZVc3hD7av06Lqz-rc" alt="Emblem" className="w-8" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">E-GOV</h1>
          <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Burkina Faso</p>
        </div>
      </div>

      <nav className="sidebar-nav flex-1 px-4 mt-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                isActive ? 'bg-white/10 text-white shadow-soft' : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-semibold text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer p-6 border-t border-white/5">
        <button 
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-300 hover:bg-red-500/10 transition-all font-semibold text-sm"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
