import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import authService from '../../services/authService';
import { 
  User, Shield, Activity, MapPin, 
  History, Mail, Phone, Edit3, 
  Camera, CheckCircle, AlertCircle,
  BarChart2, LogOut, Info, Key
} from 'lucide-react';

const AdminProfilPage = () => {
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching profile or use authService
    const user = authService.getCurrentUser();
    if (user) {
      setAdmin({
        ...user,
        matricule: 'MTD-2024-ADM01',
        department: 'Ministère de la Transition Digitale',
        location: 'Ouagadougou, Burkina Faso',
        lastLogin: '24/05/2024 à 09:15',
        activities: [
          { id: 1, action: "Mise à jour des privilèges utilisateur", time: "Aujourd'hui, 08:30" },
          { id: 2, action: "Validation du rapport mensuel", time: "Hier, 16:45" },
          { id: 3, action: "Changement du mot de passe root", time: "22 Mai 2024, 11:20" }
        ],
        stats: {
          actions: 154,
          resolved: 12,
          usage: 64
        }
      });
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen bg-slate-50 font-black text-primary">CHARGEMENT DU PROFIL SÉCURISÉ...</div>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activePage="profile" />
      
      <main className="flex-1 ml-72 p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Breadcrumb + Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
              <span>Portail Admin</span>
              <span className="text-slate-300">/</span>
              <span className="text-primary">Mon Profil</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Paramètres du Compte</h2>
          </div>

          {/* Profile Header Card */}
          <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="h-32 bg-[#003366] relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            </div>
            <div className="px-8 pb-8 flex flex-col md:flex-row gap-8 items-end -mt-12 relative z-10">
              <div className="relative group">
                <div className="size-32 rounded-2xl bg-white p-1 shadow-lg border border-slate-100 overflow-hidden">
                  <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center text-primary">
                    <User size={64} strokeWidth={1} />
                  </div>
                </div>
                <button className="absolute -bottom-2 -right-2 size-8 bg-primary text-white rounded-lg flex items-center justify-center border-4 border-white hover:scale-110 transition-transform">
                  <Camera size={14} />
                </button>
              </div>
              <div className="flex-1 space-y-2 pb-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{admin?.nom} {admin?.prenom}</h3>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <Shield size={16} /> <span>{admin?.role} • {admin?.department}</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-primary/5 text-primary rounded-xl font-bold text-sm hover:bg-primary/10 transition-all">
                    <Edit3 size={18} /> Modifier le profil
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <div className="flex gap-8 border-b border-slate-200">
            <TabButton active={activeTab === 'info'} onClick={() => setActiveTab('info')} label="Général" icon={<Info size={18} />} />
            <TabButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} label="Sécurité" icon={<Key size={18} />} />
            <TabButton active={activeTab === 'activity'} onClick={() => setActiveTab('activity')} label="Activité" icon={<Activity size={18} />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'info' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
                    <h4 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                      <span className="w-8 h-1 bg-primary"></span> Informations Personnelles
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <ProfileField label="Email Professionnel" value={admin?.email} icon={<Mail size={16} />} />
                      <ProfileField label="Téléphone" value={admin?.telephone || "+226 -- -- -- --"} icon={<Phone size={16} />} />
                      <ProfileField label="Identifiant" value={admin?.matricule} icon={<User size={16} />} />
                      <ProfileField label="Bureau Local" value={admin?.location} icon={<MapPin size={16} />} />
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'activity' && (
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h4 className="text-lg font-black text-slate-900 uppercase tracking-widest">Journal des actions</h4>
                  <div className="space-y-6">
                    {admin?.activities.map((act, idx) => (
                      <div key={idx} className="flex gap-4 relative">
                        {idx !== admin.activities.length - 1 && (
                          <div className="absolute left-[15px] top-8 bottom-[-24px] w-0.5 bg-slate-100"></div>
                        )}
                        <div className="size-8 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center shrink-0 z-10">
                          <div className="size-2 rounded-full bg-primary/40"></div>
                        </div>
                        <div className="flex-1 pb-6">
                          <p className="font-bold text-slate-800">{act.action}</p>
                          <p className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-1">
                            <History size={12} /> {act.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === 'security' && (
                <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <h4 className="text-lg font-black text-slate-900 uppercase tracking-widest">Accès & Sécurité</h4>
                   <div className="grid grid-cols-1 gap-4">
                      <SecurityAction 
                        title="Authentification à 2 facteurs (2FA)" 
                        desc="Ajoutez une couche de sécurité supplémentaire à votre compte."
                        status="Activé"
                        on={true}
                      />
                      <SecurityAction 
                        title="Dernier changement de mot de passe" 
                        desc="Il est recommandé de changer votre mot de passe tous les 90 jours."
                        status="Il y a 12 jours"
                      />
                   </div>
                </section>
              )}
            </div>

            {/* Right Column (Widgets) */}
            <div className="space-y-6">
              {/* Analytics Card */}
              <div className="bg-[#003366] p-8 rounded-3xl text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 size-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
                <h4 className="text-lg font-black mb-6 flex items-center gap-3">
                  <BarChart2 size={24} className="text-primary-light" />
                  <span>Dashboard Stats</span>
                </h4>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                    <p className="text-xs font-bold text-blue-200 uppercase tracking-tighter mb-1">Actions (Mois)</p>
                    <p className="text-3xl font-black">{admin?.stats.actions}</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                    <p className="text-xs font-bold text-blue-200 uppercase tracking-tighter mb-1">Résolus</p>
                    <p className="text-3xl font-black">{admin?.stats.resolved}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-blue-200">
                    <span>Performance Système</span>
                    <span>{admin?.stats.usage}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white transition-all duration-1000" style={{ width: `${admin?.stats.usage}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Vigilance Sécurité</h5>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 border border-green-100 text-green-700">
                   <div className="size-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <CheckCircle size={20} />
                   </div>
                   <div>
                      <p className="text-sm font-black italic">Session Protégée</p>
                      <p className="text-[10px] font-bold opacity-80 italic">Aucune menace détectée</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600">
                   <div className="size-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <LogOut size={20} />
                   </div>
                   <div>
                      <p className="text-sm font-black italic underline cursor-pointer">Déconnexion forcé</p>
                      <p className="text-[10px] font-bold opacity-80 italic">Fermer partout ailleurs</p>
                   </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const TabButton = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`pb-4 text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-all border-b-2 ${
      active ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
    }`}
  >
    {icon} <span>{label}</span>
  </button>
);

const ProfileField = ({ label, value, icon }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
      {icon} {label}
    </label>
    <p className="text-slate-900 font-bold group-hover:text-primary transition-colors">{value || 'Non renseigné'}</p>
  </div>
);

const SecurityAction = ({ title, desc, status, on }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
    <div>
      <p className="text-sm font-black text-slate-800">{title}</p>
      <p className="text-xs text-slate-500 font-medium">{desc}</p>
    </div>
    <div className="text-right">
      <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded ${on ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
        {status}
      </span>
    </div>
  </div>
);

export default AdminProfilPage;
