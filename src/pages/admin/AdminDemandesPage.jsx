import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import agentService from '../../services/agentService';
import adminService from '../../services/adminService';
import Loader from '../../components/Loader';
import { useAuth } from '../../hooks/useAuth';

const demandesDataMock = [
  { id: 'CDB-2026-8812', citoyen: 'Ibrahim Ouédraogo', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAWvlIh7puWGvD1-UOpZknnkzWYkebep5QuwsLA7pVEH6euQ0jJqrboRWhuU46-4ltuMMRRokdJu9OSO6lmbFWPhkVVZfiUEOfL1N3U5r8fa8SC8pJQKZG7fnV_xc36VE5bAl0gv9uDp3bG2tvE1_CVqM9L0Y2titPwyk3ioDbuZxg-qa8xWQH0FNEkkvISjmywlgnKND2iEEqfSFyFIbcGWsVr-Y_S5P14l3dqRkXbNnWdGRoWGUEgNtOKNIVkqQ86GFpkXafr2hY', type: "CNI (Carte d'Identité)", typeKey: 'casier', date: '12 Oct 2023', statutKey: 'en_attente' },
  { id: 'CDB-2026-4421', citoyen: 'Fatimata Sawadogo', avatar: null, type: 'Renouvellement Passeport', typeKey: 'naissance', date: '11 Oct 2023', statutKey: 'approuvee' },
  { id: 'CDB-2026-3109', citoyen: 'Moussa Traoré', avatar: null, type: "Extrait d'Acte de Naissance", typeKey: 'naissance', date: '10 Oct 2023', statutKey: 'en_cours' },
  { id: 'CDB-2026-1150', citoyen: 'Aminata Kaboré', avatar: null, type: 'Acte de Mariage', typeKey: 'mariage', date: '09 Oct 2023', statutKey: 'rejetee' },
  { id: 'CDB-2026-0922', citoyen: 'Seydou Koné', avatar: null, type: 'Casier Judiciaire', typeKey: 'casier', date: '08 Oct 2023', statutKey: 'approuvee' },
];

const getInitiales = (nom) => nom.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
const avatarColors = ['#4f46e5', '#0891b2', '#d97706', '#dc2626', '#059669'];
const getAvatarColor = (nom) => avatarColors[nom.charCodeAt(0) % avatarColors.length];

const statutConfig = {
  en_attente: { label: 'En attente', dot: '#f59e0b', bg: '#fffbeb', color: '#b45309' },
  approuvee:  { label: 'Approuvée',  dot: '#22c55e', bg: '#f0fdf4', color: '#15803d' },
  en_cours:   { label: 'En cours',   dot: '#3b82f6', bg: '#eff6ff', color: '#1d4ed8' },
  rejetee:    { label: 'Rejetée',    dot: '#ef4444', bg: '#fef2f2', color: '#b91c1c' },
};

const Avatar = ({ src, nom }) => {
  const [imgError, setImgError] = useState(false);
  const base = { width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 };
  if (src && !imgError) {
    return (
      <div style={{ ...base, overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
        <img src={src} alt={nom} onError={() => setImgError(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    );
  }
  return <div style={{ ...base, backgroundColor: getAvatarColor(nom), color: '#fff' }}>{getInitiales(nom)}</div>;
};

const StatutBadge = ({ statutKey }) => {
  const cfg = statutConfig[statutKey] || statutConfig.en_attente;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, backgroundColor: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
};

const FilterSelect = ({ value, onChange, label, options }) => (
  <div style={{ position: 'relative' }}>
    <select value={value} onChange={(e) => onChange(e.target.value)} style={{ height: 38, padding: '0 32px 0 12px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, color: '#475569', backgroundColor: '#fff', cursor: 'pointer', outline: 'none', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}>
      <option value="all">{label}</option>
      {options.map(({ v, l }) => <option key={v} value={v}>{l}</option>)}
    </select>
  </div>
);

const AdminDemandesPage = () => {
  const { user } = useAuth();
  const [demandes,      setDemandes]    = useState([]);
  const [loading,       setLoading]     = useState(true);
  const [activeTab,    setActiveTab]    = useState('toutes');
  const [searchTerm,   setSearchTerm]   = useState('');
  const [filterType,   setFilterType]   = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [currentPage,  setCurrentPage]  = useState(1);

  const fetchDemandes = async () => {
    setLoading(true);
    const isAdmin = user?.role === 'ADMIN' || user?.isAdmin;
    const result = isAdmin ? await adminService.getAllDemandes() : await agentService.getDemandesAgent();
    if (result.success) {
      const apiDemandes = result.data.demandes || [];
      if (apiDemandes.length > 0) {
        setDemandes(apiDemandes.map(d => ({
          id: d._id,
          numeroSuivi: d.numeroSuivi,
          citoyen: `${d.citoyenId?.nom || ''} ${d.citoyenId?.prenom || ''}`.trim() || 'Inconnu',
          avatar: null,
          type: d.typeDocumentId?.nom || d.type || 'Document',
          typeKey: d.type?.toLowerCase() || 'autre',
          date: new Date(d.createdAt).toLocaleDateString(),
          statutKey: d.statut === 'VALIDEE' ? 'approuvee' : d.statut === 'REJETEE' ? 'rejetee' : d.statut === 'EN_COURS' ? 'en_cours' : 'en_attente'
        })));
      } else {
        setDemandes(demandesDataMock);
      }
    } else {
      setDemandes(demandesDataMock);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const tabs = [
    { key: 'toutes',     label: 'Toutes',     count: demandes.length },
    { key: 'en_attente', label: 'En attente', count: demandes.filter(d => d.statutKey === 'en_attente').length  },
    { key: 'approuvee',  label: 'Approuvées', count: demandes.filter(d => d.statutKey === 'approuvee').length },
    { key: 'rejetee',    label: 'Rejetées',   count: demandes.filter(d => d.statutKey === 'rejetee').length },
  ];

  const filtered = demandes.filter((d) => {
    const matchTab    = activeTab === 'toutes' || d.statutKey === activeTab;
    const matchSearch = d.citoyen.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (d.numeroSuivi && d.numeroSuivi.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchType   = filterType === 'all'   || d.typeKey   === filterType;
    const matchStatus = filterStatus === 'all' || d.statutKey === filterStatus;
    return matchTab && matchSearch && matchType && matchStatus;
  });

  const hasFilters = filterType !== 'all' || filterStatus !== 'all' || filterPeriod !== 'all' || searchTerm;

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">

        {/* EN-TÊTE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Gestion Globale des Demandes
            </h1>
            <p className="text-slate-500 text-base mt-1 font-medium">
              Supervisez et traitez les demandes de documents civils à travers toutes les régions nationales.
            </p>
          </div>
        </div>

        {/* CARDS STATS (DÉPLACÉES EN HAUT) */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader /></div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 1000 }}>
              {[
                { icon: 'pending_actions', iconBg: '#002395', bg: 'rgba(0,35,149,0.05)',   border: 'rgba(0,35,149,0.1)',   label: "En attente d'action",  value: '42', valueColor: '#002395' },
                { icon: 'task_alt',        iconBg: '#22c55e', bg: 'rgba(34,197,94,0.05)',  border: 'rgba(34,197,94,0.1)',  label: "Traitées aujourd'hui", value: '18', valueColor: '#16a34a' },
                { icon: 'warning',         iconBg: '#f59e0b', bg: 'rgba(245,158,11,0.05)', border: 'rgba(245,158,11,0.1)', label: 'Cas prioritaires',     value: '07', valueColor: '#d97706' },
              ].map(({ icon, iconBg, bg, border, label, value, valueColor }) => (
                <div key={label} style={{ borderRadius: 16, padding: '24px 20px', backgroundColor: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{icon}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: '#64748b', margin: 0, fontWeight: 600 }}>{label}</p>
                    <p style={{ fontSize: 24, fontWeight: 800, color: valueColor, margin: 0 }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* RECHERCHE ET FILTRES (HORS TABLEAU) */}
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-sm w-full">
              <div className="relative w-[350px] shrink-0">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input 
                  type="text" 
                  placeholder="Rechercher par citoyen, ID, numéro de suivi..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <FilterSelect value={filterType} onChange={setFilterType} label="Type de Document"
                  options={[
                    { v: 'naissance',   l: "Extrait Naissance" },
                    { v: 'deces',       l: "Extrait Décès"     },
                    { v: 'mariage',     l: "Extrait Mariage"   },
                    { v: 'nationalite', l: 'Certif. Nationalité' },
                    { v: 'casier',      l: 'Casier Judiciaire'   },
                  ]}
                />
                <FilterSelect value={filterStatus} onChange={setFilterStatus} label="Statut"
                  options={[
                    { v: 'en_attente', l: 'En attente' },
                    { v: 'en_cours',   l: 'En cours'   },
                    { v: 'approuvee',  l: 'Approuvée'  },
                    { v: 'rejetee',    l: 'Rejetée'    },
                  ]}
                />
                <FilterSelect value={filterPeriod} onChange={setFilterPeriod} label="Période"
                  options={[
                    { v: 'today', l: "Aujourd'hui"   },
                    { v: 'week',  l: 'Cette semaine' },
                    { v: 'month', l: 'Ce mois'       },
                  ]}
                />
                {hasFilters && (
                  <button 
                    onClick={() => { setFilterType('all'); setFilterStatus('all'); setFilterPeriod('all'); setSearchTerm(''); }}
                    className="px-3 py-2 text-red-500 text-xs font-bold hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                    Effacer
                  </button>
                )}
              </div>
            </div>

            {/* TABLEAU CARD */}
            <div style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>

              {/* ONGLETS SEULEMENT */}
              <div className="px-6 border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
                {tabs.map(({ key, label, count }) => {
                  const isActive = activeTab === key;
                  return (
                    <button 
                      key={key} 
                      onClick={() => setActiveTab(key)} 
                      className={`py-4 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${isActive ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                      {label}
                      {count !== null && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* TABLEAU */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                  <colgroup>
                    <col style={{ width: '160px' }} /><col style={{ width: '200px' }} />
                    <col style={{ width: '220px' }} /><col style={{ width: '130px' }} />
                    <col style={{ width: '140px' }} /><col style={{ width: '70px'  }} />
                  </colgroup>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc' }}>
                      {['ID DEMANDE', 'CITOYEN', 'TYPE DE DOCUMENT', 'DATE', 'STATUT', ''].map((col, i) => (
                        <th key={i} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length > 0 ? filtered.map((d, idx) => (
                      <tr key={d.id}
                        style={{ borderBottom: idx < filtered.length - 1 ? '1px solid #f8fafc' : 'none', transition: 'background 0.1s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#002395' }}>{d.numeroSuivi || d.id}</span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Avatar src={d.avatar} nom={d.citoyen} />
                            <span style={{ fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{d.citoyen}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{ display: 'inline-block', backgroundColor: '#f1f5f9', color: '#475569', fontSize: 12, fontWeight: 500, padding: '4px 10px', borderRadius: 6 }}>
                            {d.type}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: 13, color: '#64748b', whiteSpace: 'nowrap' }}>{d.date}</td>
                        <td style={{ padding: '16px 20px' }}><StatutBadge statutKey={d.statutKey} /></td>
                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                          <Link to={`${user?.role === 'ADMIN' ? '/admin' : '/agent'}/demandes/${d.id}`} title="Voir le détail"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-blue-50 hover:border-primary hover:text-primary transition-all text-decoration-none"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</span>
                          </Link>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={6} style={{ padding: '48px 0', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>Aucune demande trouvée.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <div style={{ padding: '14px 24px', backgroundColor: '#fafafa', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
                  Affichage de <strong>1</strong> à <strong>{filtered.length}</strong> sur <strong>{demandes.length}</strong> demandes
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                    style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: currentPage === 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentPage === 1 ? '#cbd5e1' : '#475569' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button key={page} onClick={() => setCurrentPage(page)}
                      style={{ width: 32, height: 32, borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, backgroundColor: currentPage === page ? '#002395' : '#fff', color: currentPage === page ? '#fff' : '#475569', border: currentPage === page ? 'none' : '1px solid #e2e8f0' }}>
                      {page}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage((p) => p + 1)}
                    style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </Layout>
  );
};

export default AdminDemandesPage;