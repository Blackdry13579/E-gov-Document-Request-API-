import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotif } from '../context/NotifContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title }) => {
 const { user } = useAuth();
 const { unreadCount } = useNotif();
 const navigate = useNavigate();

 return (
 <header className="dashboard-navbar flex items-center justify-between px-8 py-5 bg-white border-b border-slate-100 sticky top-0 z-30">
 <div className="navbar-left">
 <h2 className="text-xl font-bold text-slate-800">{title}</h2>
 </div>

 <div className="navbar-right flex items-center gap-6">
 <div className="search-minimal relative hidden sm:block">
 <input 
 type="text"
 placeholder="Rechercher..."
 className="bg-slate-50 border-none rounded-full py-2 px-10 text-sm focus:ring-1 ring-primary/20 w-64"
 />
 <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
 </div>

 <div className="icon-actions flex items-center gap-4 border-l border-slate-100 pl-6">
 <div 
 className="relative cursor-pointer hover:bg-slate-50 p-2 rounded-full transition-all"
 onClick={() => navigate('/notifications')}
 >
 <span className="material-symbols-outlined text-slate-600">notifications</span>
 {unreadCount > 0 && (
 <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
 {unreadCount}
 </span>
 )}
 </div>
 
 <div className="user-profile-mini flex items-center gap-3 cursor-pointer p-1 pr-3 hover:bg-slate-50 rounded-full transition-all">
 <div className="size-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
 {user?.nom?.charAt(0)}{user?.prenom?.charAt(0)}
 </div>
 <div className="hidden lg:block text-left">
 <p className="text-sm font-bold text-slate-800 leading-tight">{user?.prenom} {user?.nom}</p>
 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{user?.role}</p>
 </div>
 </div>
 </div>
 </div>
 </header>
 );
};

export default Navbar;
