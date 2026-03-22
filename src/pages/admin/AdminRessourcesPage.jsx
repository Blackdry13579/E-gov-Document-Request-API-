import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

// ── Helpers avatars ──────────────────────────────────────────────────────────
const avatarColors = ['#4f46e5', '#0891b2', '#d97706', '#dc2626', '#059669'];
const getAvatarColor = (nom) => avatarColors[nom.charCodeAt(0) % avatarColors.length];
const getInitiales   = (nom) => nom.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

// ── Données Agents ───────────────────────────────────────────────────────────
const agentsData = [
  { id: 1, nom: 'Diallo Mamadou',      role: 'Agent Mairie',    service: 'Mairie Centrale Ouagadougou', matricule: 'AG-74829-BF', actif: true  },
  { id: 2, nom: 'Ouédraogo Fatimata',  role: 'Agent Police',    service: 'Police Nationale - Bobo',     matricule: 'AG-63104-BF', actif: true  },
  { id: 3, nom: 'Savadogo Issa',       role: 'Agent Justice',   service: "Ministère de l'Économie",     matricule: 'AG-51203-BF', actif: false },
  { id: 4, nom: 'Kaboré Aminata',      role: 'Agent Mairie',    service: 'Mairie de Bobo-Dioulasso',    matricule: 'AG-44712-BF', actif: true  },
];

// ── Données Documents ────────────────────────────────────────────────────────
const documentsData = [
  { id: 1, nom: 'CNIB',               desc: "Carte Nationale d'Identité", service: 'ONI',                      cout: '2 500',   delai: '72 Heures', actif: true  },
  { id: 2, nom: 'Passeport Ordinaire', desc: 'Document de voyage',         service: 'DGPC',                     cout: '50 000',  delai: '15 Jours',  actif: true  },
  { id: 3, nom: 'Casier Judiciaire',   desc: 'Extrait de casier',          service: 'Ministère de la Justice',  cout: '500',     delai: '48 Heures', actif: true  },
  { id: 4, nom: 'Permis de Construire',desc: 'Secteur Urbain',             service: 'Mairie / Urbanisme',       cout: 'Variable',delai: '30 Jours',  actif: false },
];

// ── Composant badge statut ───────────────────────────────────────────────────
const Badge = ({ actif, label }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '4px 12px', borderRadius: 999,
    fontSize: 11, fontWeight: 700,
    backgroundColor: actif ? '#dcfce7' : '#fee2e2',
    color: actif ? '#15803d' : '#dc2626',
  }}>
    <span style={{
      width: 6, height: 6, borderRadius: '50%',
      backgroundColor: actif ? '#22c55e' : '#ef4444',
      flexShrink: 0,
    }} />
    {label || (actif ? 'Actif' : 'Inactif')}
  </span>
);

// ── Composant card stat ──────────────────────────────────────────────────────
const StatCard = ({ icon, iconColor, iconBg, label, value, trend, primary }) => (
  <div style={{
    flex: 1, padding: '20px 24px', borderRadius: 16,
    backgroundColor: primary ? '#002395' : '#fff',
    border: primary ? 'none' : '1px solid #e2e8f0',
    boxShadow: primary ? '0 4px 16px rgba(0,35,149,0.25)' : '0 1px 4px rgba(0,0,0,0.06)',
    display: 'flex', flexDirection: 'column', gap: 12,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        backgroundColor: primary ? 'rgba(255,255,255,0.15)' : iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span className="material-symbols-outlined" style={{ color: primary ? '#fff' : iconColor, fontSize: 20 }}>
          {icon}
        </span>
      </div>
      {trend && (
        <span style={{
          fontSize: 11, fontWeight: 700,
          color: primary ? 'rgba(255,255,255,0.7)' : '#22c55e',
        }}>
          {trend}
        </span>
      )}
    </div>
    <div>
      <p style={{ fontSize: 12, fontWeight: 600, color: primary ? 'rgba(255,255,255,0.6)' : '#94a3b8', marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ fontSize: 28, fontWeight: 900, color: primary ? '#fff' : '#0f172a', lineHeight: 1 }}>
        {value}
      </p>
    </div>
  </div>
);

// ── Bouton Actions (œil + poubelle) ─────────────────────────────────────────
const ActionButtons = ({ detailTo, onDelete }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
    <Link
      to={detailTo}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#002395', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 17 }}>visibility</span>
      Détail
    </Link>
    <span style={{ color: '#e2e8f0', userSelect: 'none' }}>|</span>
    <button
      onClick={onDelete}
      style={{ display: 'inline-flex', alignItems: 'center', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 17 }}>delete</span>
    </button>
  </div>
);

// ── Page ─────────────────────────────────────────────────────────────────────
const AdminRessourcesPage = () => {
  const [activeTab,   setActiveTab]   = useState('agents');
  const [searchTerm,  setSearchTerm]  = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const isAgents = activeTab === 'agents';

  const handleDelete = (id, type) => {
    if (window.confirm('Confirmer la suppression ?')) console.log(`Delete ${type} #${id}`);
  };

  const filteredAgents = agentsData.filter((a) =>
    a.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredDocs = documentsData.filter((d) =>
    d.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">

        {/* ── TITRE ─────────────────────────────────────────────────── */}
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Gestion des Agents &amp; Documents
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Administration centrale des agents de l'État et du catalogue documentaire officiel.
          </p>
        </div>

        {/* ── ONGLETS ───────────────────────────────────────────────── */}
        <div className="flex border-b border-slate-200 gap-8">
          {[
            { id: 'agents',    icon: 'groups',      label: 'Gestion des Agents'    },
            { id: 'documents', icon: 'folder_open', label: 'Gestion des Documents' },
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSearchTerm(''); setCurrentPage(1); }}
              className="pb-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-all"
              style={activeTab === id
                ? { borderColor: '#002395', color: '#002395' }
                : { borderColor: 'transparent', color: '#64748b' }}
            >
              <span className="material-symbols-outlined text-lg">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* ── STATS AGENTS ──────────────────────────────────────────── */}
        {isAgents && (
          <div style={{ display: 'flex', gap: 16 }}>
            <StatCard icon="badge"           iconColor="#002395" iconBg="rgba(0,35,149,0.1)"   label="Total Agents"  value="1,420" trend="+2%"  primary={true}  />
            <StatCard icon="how_to_reg"      iconColor="#15803d" iconBg="#dcfce7"               label="Agents Actifs" value="1,385" trend="+1%"  primary={false} />
            <StatCard icon="pending_actions" iconColor="#d97706" iconBg="#fef3c7"               label="En Attente"    value="35"    trend="+5"   primary={false} />
          </div>
        )}

        {/* ── STATS DOCUMENTS ───────────────────────────────────────── */}
        {!isAgents && (
          <div style={{ display: 'flex', gap: 16 }}>
            <StatCard icon="folder_open"     iconColor="#002395" iconBg="rgba(0,35,149,0.1)"   label="Total Documents"   value="27"  trend="+0%"  primary={true}  />
            <StatCard icon="task_alt"        iconColor="#15803d" iconBg="#dcfce7"               label="Documents Actifs"  value="24"  trend="+0%"  primary={false} />
            <StatCard icon="fiber_new"       iconColor="#d97706" iconBg="#fef3c7"               label="Nouveaux (30j)"    value="2"   trend="+2"   primary={false} />
          </div>
        )}

        {/* ── TABLEAU ───────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {/* Header tableau */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f1f5f9',
            backgroundColor: '#fafbff',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
          }}>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                {isAgents ? 'Répertoire des Agents' : 'Catalogue des Documents'}
              </h4>
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                {isAgents
                  ? 'Gérez les comptes agents de l\'administration publique'
                  : 'Gérez la liste officielle des documents administratifs'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Recherche */}
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{
                  position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 17, color: '#94a3b8', pointerEvents: 'none',
                }}>search</span>
                <input
                  style={{
                    paddingLeft: 34, paddingRight: 14, height: 38, borderRadius: 10,
                    border: '1.5px solid #e2e8f0', backgroundColor: '#fff',
                    fontSize: 13, color: '#334155', outline: 'none', width: 220, boxSizing: 'border-box',
                  }}
                  placeholder={isAgents ? 'Rechercher un agent...' : 'Rechercher un document...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Bouton ajouter */}
              <Link
                to={isAgents ? '/admin/agents/nouveau' : '/admin/documents/nouveau'}
                style={{
                  height: 38, display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '0 16px', borderRadius: 10,
                  backgroundColor: '#002395', color: '#fff',
                  fontWeight: 700, fontSize: 13, textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,35,149,0.25)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  {isAgents ? 'person_add' : 'add'}
                </span>
                + {isAgents ? 'Nouvel Agent' : 'Nouveau Document'}
              </Link>
            </div>
          </div>

          {/* ── TABLE AGENTS ────────────────────────────────────────── */}
          {isAgents && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                    {["Nom de l'Agent", 'Rôle', 'Service', 'Matricule', 'Statut', 'Actions'].map((col, i) => (
                      <th key={i} style={{
                        padding: '12px 20px', fontSize: 11, fontWeight: 700,
                        color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em',
                        textAlign: i >= 4 ? 'center' : 'left', whiteSpace: 'nowrap',
                      }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map(({ id, nom, role, service, matricule, actif }) => (
                    <tr key={id} style={{ borderBottom: '1px solid #f8fafc' }} className="hover:bg-slate-50/60 transition-colors">
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                            backgroundColor: getAvatarColor(nom),
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontSize: 12, fontWeight: 700,
                          }}>
                            {getInitiales(nom)}
                          </div>
                          <span style={{ fontWeight: 600, color: '#1e293b', fontSize: 13 }}>{nom}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          fontSize: 12, fontWeight: 600,
                          color: '#002395', backgroundColor: 'rgba(0,35,149,0.07)',
                          padding: '3px 10px', borderRadius: 999,
                        }}>{role}</span>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: 13, color: '#64748b' }}>{service}</td>
                      <td style={{ padding: '16px 20px', fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>{matricule}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <Badge actif={actif} />
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <ActionButtons detailTo={`/admin/agents/${id}`} onDelete={() => handleDelete(id, 'agent')} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── TABLE DOCUMENTS ─────────────────────────────────────── */}
          {!isAgents && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                    {['Nom du Document', 'Service Responsable', 'Coût (FCFA)', 'Délai', 'Statut', 'Actions'].map((col, i) => (
                      <th key={i} style={{
                        padding: '12px 20px', fontSize: 11, fontWeight: 700,
                        color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em',
                        textAlign: i >= 4 ? 'center' : 'left', whiteSpace: 'nowrap',
                      }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredDocs.map(({ id, nom, desc, service, cout, delai, actif }) => (
                    <tr key={id} style={{ borderBottom: '1px solid #f8fafc' }} className="hover:bg-slate-50/60 transition-colors">
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                            backgroundColor: 'rgba(0,35,149,0.07)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <span className="material-symbols-outlined" style={{ color: '#002395', fontSize: 20 }}>description</span>
                          </div>
                          <div>
                            <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 14, margin: 0 }}>{nom}</p>
                            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, marginTop: 2 }}>{desc}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: 13, color: '#64748b' }}>{service}</td>
                      <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{cout}</td>
                      <td style={{ padding: '16px 20px', fontSize: 13, color: '#64748b' }}>{delai}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <Badge actif={actif} label={actif ? 'Actif' : 'Inactif'} />
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <ActionButtons detailTo={`/admin/documents/${id}`} onDelete={() => handleDelete(id, 'document')} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── PAGINATION ────────────────────────────────────────── */}
          <div style={{
            padding: '14px 24px', borderTop: '1px solid #f1f5f9',
            backgroundColor: '#fafbff',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>
              Affichage de 1 à {isAgents ? filteredAgents.length : filteredDocs.length} sur {isAgents ? '1 420 agents' : '27 documents'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                style={{ height: 34, padding: '0 12px', borderRadius: 8, border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
              >
                Précédent
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    border: currentPage === p ? 'none' : '1px solid #e2e8f0',
                    backgroundColor: currentPage === p ? '#002395' : '#fff',
                    color: currentPage === p ? '#fff' : '#475569',
                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                style={{ height: 34, padding: '0 12px', borderRadius: 8, border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
              >
                Suivant
              </button>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default AdminRessourcesPage;