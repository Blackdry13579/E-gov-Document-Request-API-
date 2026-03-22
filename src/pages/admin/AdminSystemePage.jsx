import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const rolesData = [
  { id: 1, nom: 'Super Administrateur', desc: 'Accès complet au système',       dept: 'Administration Centrale', deptColor: '#4f46e5', deptBg: '#ede9fe', users: 5   },
  { id: 2, nom: 'Agent Mairie',         desc: "Gestion de l'état civil",         dept: 'État Civil',              deptColor: '#0891b2', deptBg: '#e0f2fe', users: 120 },
  { id: 3, nom: 'Agent Police',         desc: "Documents d'identité (CNIB)",     dept: 'Identité Nationale',      deptColor: '#059669', deptBg: '#dcfce7', users: 85  },
  { id: 4, nom: 'Agent Justice',        desc: 'Casiers judiciaires',             dept: 'Services Judiciaires',    deptColor: '#d97706', deptBg: '#fef3c7', users: 40  },
  { id: 5, nom: 'Agent Immigration',    desc: 'Visas et cartes de résident',     dept: 'Immigration et Visas',    deptColor: '#db2777', deptBg: '#fce7f3', users: 30  },
];

const servicesData = [
  { id: 1, nom: "Service d'État Civil", ministere: 'MATDS'    },
  { id: 2, nom: 'Direction des Impôts', ministere: 'MINEFID'  },
  { id: 3, nom: 'Casier Judiciaire',    ministere: 'Justice'  },
  { id: 4, nom: 'Passeports & Visas',   ministere: 'Sécurité' },
];

// Toggle switch propre
const Toggle = ({ value, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!value)}
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: 44,
      height: 24,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      backgroundColor: value ? '#002395' : '#cbd5e1',
      transition: 'background-color 0.2s',
      flexShrink: 0,
    }}
  >
    <span
      style={{
        position: 'absolute',
        width: 18,
        height: 18,
        borderRadius: '50%',
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s',
        transform: value ? 'translateX(22px)' : 'translateX(3px)',
      }}
    />
  </button>
);

// ── Formulaire Nouveau Rôle ──────────────────────────────────────────────────
const FormulaireNouveauRole = () => {
  const [nom,         setNom]         = useState('');
  const [dept,        setDept]        = useState('');
  const [description, setDescription] = useState('');
  const [actif,       setActif]       = useState(true);

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: 16,
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      overflow: 'hidden',
    }}>
      {/* Header card */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid #f1f5f9',
        backgroundColor: '#fafbff',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 40, height: 40,
          borderRadius: 12,
          backgroundColor: '#002395',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 20 }}>add</span>
        </div>
        <div>
          <p style={{ fontWeight: 800, fontSize: 15, color: '#0f172a', margin: 0 }}>Nouveau Rôle</p>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, marginTop: 2 }}>Créer un accès personnalisé</p>
        </div>
      </div>

      {/* Corps du formulaire */}
      <div style={{ padding: '24px' }}>

        {/* Nom */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Nom du rôle
          </label>
          <input
            style={{
              width: '100%', height: 42, borderRadius: 10,
              border: '1.5px solid #e2e8f0', padding: '0 14px',
              fontSize: 14, color: '#0f172a', outline: 'none',
              backgroundColor: '#fff', boxSizing: 'border-box',
            }}
            placeholder="Ex: Agent Douanes"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            type="text"
          />
        </div>

        {/* Département */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Département
          </label>
          <select
            style={{
              width: '100%', height: 42, borderRadius: 10,
              border: '1.5px solid #e2e8f0', padding: '0 14px',
              fontSize: 14, color: '#0f172a', outline: 'none',
              backgroundColor: '#fff', boxSizing: 'border-box', cursor: 'pointer',
            }}
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          >
            <option value="">Sélectionner...</option>
            <option>Administration Centrale</option>
            <option>État Civil</option>
            <option>Identité Nationale</option>
            <option>Services Judiciaires</option>
            <option>Immigration et Visas</option>
            <option>Douanes</option>
          </select>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Description
          </label>
          <textarea
            style={{
              width: '100%', borderRadius: 10,
              border: '1.5px solid #e2e8f0', padding: '10px 14px',
              fontSize: 14, color: '#0f172a', outline: 'none',
              backgroundColor: '#fff', boxSizing: 'border-box',
              resize: 'none', fontFamily: 'inherit',
            }}
            placeholder="Description du rôle..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Toggle actif */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', borderRadius: 10,
          backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
          marginBottom: 20,
        }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#334155', margin: 0 }}>Rôle actif</p>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, marginTop: 2 }}>Visible par les agents</p>
          </div>
          <Toggle value={actif} onChange={setActif} />
        </div>

        {/* Bouton créer */}
        <button
          type="button"
          style={{
            width: '100%', height: 44, borderRadius: 10,
            backgroundColor: '#002395', color: '#fff',
            border: 'none', fontWeight: 700, fontSize: 14,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 14px rgba(0,35,149,0.3)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span>
          Créer le rôle
        </button>
      </div>
    </div>
  );
};

// ── Formulaire Nouveau Service ───────────────────────────────────────────────
const FormulaireNouveauService = () => {
  const [nom,         setNom]         = useState('');
  const [code,        setCode]        = useState('');
  const [ministere,   setMinistere]   = useState('');
  const [description, setDescription] = useState('');
  const [actif,       setActif]       = useState(true);

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: 16,
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid #f1f5f9',
        backgroundColor: '#fafbff',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          backgroundColor: '#002395',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 20 }}>add</span>
        </div>
        <div>
          <p style={{ fontWeight: 800, fontSize: 15, color: '#0f172a', margin: 0 }}>Nouveau Service</p>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, marginTop: 2 }}>Ajouter un service public</p>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {[
          { label: 'Nom du service', placeholder: 'Ex: Police Nationale', value: nom, onChange: setNom, type: 'text' },
          { label: 'Code',           placeholder: 'Ex: POLICE',           value: code, onChange: (v) => setCode(v.toUpperCase()), type: 'text' },
          { label: 'Ministère responsable', placeholder: 'Ex: Min. de la Sécurité', value: ministere, onChange: setMinistere, type: 'text' },
        ].map(({ label, placeholder, value, onChange, type }) => (
          <div key={label} style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              {label}
            </label>
            <input
              style={{
                width: '100%', height: 42, borderRadius: 10,
                border: '1.5px solid #e2e8f0', padding: '0 14px',
                fontSize: 14, color: '#0f172a', outline: 'none',
                backgroundColor: '#fff', boxSizing: 'border-box',
              }}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              type={type}
            />
          </div>
        ))}

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Description
          </label>
          <textarea
            style={{
              width: '100%', borderRadius: 10,
              border: '1.5px solid #e2e8f0', padding: '10px 14px',
              fontSize: 14, color: '#0f172a', outline: 'none',
              backgroundColor: '#fff', boxSizing: 'border-box',
              resize: 'none', fontFamily: 'inherit',
            }}
            placeholder="Description du service..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', borderRadius: 10,
          backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', marginBottom: 20,
        }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#334155', margin: 0 }}>Service actif</p>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, marginTop: 2 }}>Disponible sur la plateforme</p>
          </div>
          <Toggle value={actif} onChange={setActif} />
        </div>

        <button
          type="button"
          style={{
            width: '100%', height: 44, borderRadius: 10,
            backgroundColor: '#002395', color: '#fff',
            border: 'none', fontWeight: 700, fontSize: 14,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 14px rgba(0,35,149,0.3)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span>
          Créer le service
        </button>
      </div>
    </div>
  );
};

// ── Page principale ──────────────────────────────────────────────────────────
const AdminSystemePage = () => {
  const [activeTab, setActiveTab] = useState('roles');

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-6">

        {/* ── ONGLETS ──────────────────────────────────────────────────── */}
        <div className="flex border-b border-slate-200 gap-8">
          {[
            { id: 'services', icon: 'apps', label: 'Gestion des Services' },
            { id: 'roles',    icon: 'key',  label: 'Rôles et Permissions' },
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
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

        {/* ── LAYOUT : 2 colonnes ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── COLONNE GAUCHE (2/3) ──────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Titre section */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                {activeTab === 'roles'
                  ? 'Gestion du Système — Rôles & Permissions'
                  : 'Gestion du Système — Services Publics'}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {activeTab === 'roles'
                  ? "Gérez les niveaux d'accès des agents de l'administration publique."
                  : 'Gérez les services publics disponibles sur la plateforme.'}
              </p>
            </div>

            {/* ── TABLEAU RÔLES ────────────────────────────────────── */}
            {activeTab === 'roles' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Nom du Rôle</th>
                      <th className="px-6 py-4">Département</th>
                      <th className="px-6 py-4 text-center">Utilisateurs</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rolesData.map(({ id, nom, desc, dept, deptColor, deptBg, users }) => (
                      <tr key={id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-5">
                          <p className="font-bold text-slate-900">{nom}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-bold"
                            style={{ backgroundColor: deptBg, color: deptColor }}
                          >
                            {dept}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center font-bold text-slate-900 text-base">
                          {users}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <Link
                            to={`/admin/roles/${id}`}
                            className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline"
                            style={{ color: '#002395' }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 17 }}>visibility</span>
                            Détail
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── TABLEAU SERVICES (sans colonne Statut) ───────────── */}
            {activeTab === 'services' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Nom du Service</th>
                      <th className="px-6 py-4">Ministère</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {servicesData.map(({ id, nom, ministere }) => (
                      <tr key={id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">{nom}</td>
                        <td className="px-6 py-4 text-slate-500">{ministere}</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            to={`/admin/services/${id}`}
                            className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline"
                            style={{ color: '#002395' }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 17 }}>visibility</span>
                            Détail
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── APERÇU GLOBAL — sous le tableau, sobre ───────────── */}
            {activeTab === 'roles' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <h3 className="text-lg font-black text-slate-900 mb-8">Aperçu Global</h3>

                <div className="mb-8">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Utilisateurs Totaux
                  </p>
                  <p className="text-5xl font-black text-slate-900">280</p>
                </div>

                <div className="mb-8">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
                    Répartition des Accès
                  </p>
                  <div className="space-y-5">
                    {[
                      { label: 'Lecture Seule',        pct: 65, color: '#002395' },
                      { label: 'Édition / Validation', pct: 25, color: '#10b981' },
                      { label: 'Admin Système',         pct: 10, color: '#f59e0b' },
                    ].map(({ label, pct, color }) => (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-slate-700">{label}</span>
                          <span className="font-bold text-slate-900">{pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
                    Actions Récentes
                  </p>
                  <div className="space-y-5">
                    {[
                      { icon: 'history',    title: 'Mise à jour rôle "Agent Mairie"',   date: 'Il y a 2 heures par Ibrahim T.' },
                      { icon: 'person_add', title: 'Nouveau rôle "Agent Justice" créé',  date: 'Hier à 16:45 par Admin'          },
                    ].map(({ icon, title, date }) => (
                      <div key={title} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-slate-500" style={{ fontSize: 17 }}>{icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-tight">{title}</p>
                          <p className="text-xs text-slate-400 mt-1.5">{date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Aperçu Services */}
            {activeTab === 'services' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-slate-900 text-lg">Aperçu des Rôles</h3>
                  <button className="text-xs font-bold hover:underline" style={{ color: '#002395' }}>Voir tout</button>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: 'admin_panel_settings', label: 'Super Administrateur', sub: 'Accès Total',       count: '04', primary: true  },
                    { icon: 'person_edit',           label: 'Gestionnaire Service', sub: 'Accès Ministériel', count: '42', primary: true  },
                    { icon: 'visibility',            label: 'Consultant Audit',     sub: 'Lecture Seule',     count: '12', primary: false },
                  ].map(({ icon, label, sub, count, primary }) => (
                    <div key={label} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                             style={{ backgroundColor: primary ? 'rgba(0,35,149,0.1)' : '#f1f5f9' }}>
                          <span className="material-symbols-outlined text-lg"
                                style={{ color: primary ? '#002395' : '#64748b' }}>{icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{label}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">{sub}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── COLONNE DROITE — Formulaire (1/3) ────────────────────── */}
          <div className="lg:col-span-1">
            {activeTab === 'roles'
              ? <FormulaireNouveauRole />
              : <FormulaireNouveauService />
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminSystemePage;