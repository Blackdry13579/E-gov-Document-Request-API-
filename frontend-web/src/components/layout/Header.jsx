import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  if (user.role === 'ADMIN') {
    return (
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-white overflow-hidden border border-slate-100">
            <img 
              alt="Armoiries du Burkina Faso"
              className="h-10 w-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5P7ho7BXYQ-uqZsOLFSBQ8ykUVx2CSEN4P6hUWg_FCNC4G_SO1L62Pple_CIi8D2-1mrcbAkYr9uQJS9MXpQaAHeLeU4Mf2qNZxqZJcqX3lQGbhySzDOI-68JIDBOvWAoo5QfS_pUCq1kPSySDm2usFt9CEE2ACZfjLMZ03ys_mWszFL_1x8lYkNFLMqy3XkQQ0Zk5Da2PTZ4UM8mCJ-0Tb4HEWfubtIz6HugWoX8pHLjEncv9mrZ8YvrOohVSHi8WalE6ZgCw_A"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-primary text-lg font-bold leading-tight tracking-tight uppercase">E-Gov Burkina Faso</h2>
            <span className="text-[10px] text-amber-500 font-bold tracking-[0.2em] uppercase">Administration Centrale</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">BF - Ouagadougou 🇧🇫</span>
          </div>
        </div>
      </header>
    );
  }

  if (user.role === 'CITOYEN') {
    return (
      <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
          <div className="flex flex-col">
            <h2 className="text-slate-900 text-lg font-black tracking-tight uppercase">République du Burkina Faso</h2>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Portail National de l'Administration</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-primary w-64 transition-all"
              placeholder="Rechercher un service..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">{user.prenom} {user.nom}</p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter mt-1">Usager {user.matricule}</p>
              </div>
              <div className="size-10 rounded-full border-2 border-primary/20 p-0.5">
                <div className="size-full rounded-full bg-slate-200 overflow-hidden">
                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC6e0e2UrMWAwQKgJ9BvvuDhdqSW69YID3fSM5NNfDj8NN4sriTpy9fV4aJ0z7B0ClL7Qb_z_VD8SCXbalF9LoUAnh17NreHTKd8spdrA36TdIn3BCY835Y1T6IyKfjGj3lXpYdVNFV4cAdtkor99jfOJY4FTjOC38pNZoTF7oCxUD6UDrHjppq_QmBnexz5DiExGE3-YGAd2K4pbtKgdOT-Q44rCKDVdtvKuCXTcwW5GfF1j_jGSyhVzxstWht1mLhwL96LcHRl5u" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // AGENT Header
  return (
    <header className="h-20 bg-white border-b border-primary/10 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">E-Gov Agent Space</h2>
        <span className="px-2 py-1 bg-primary text-white text-[10px] font-black uppercase rounded">Traitement des Dossiers</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
          <span className="material-symbols-outlined text-emerald-500">online_prediction</span>
          <span className="text-xs font-bold text-slate-600">Poste: {user.service || 'Direction Générale'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
