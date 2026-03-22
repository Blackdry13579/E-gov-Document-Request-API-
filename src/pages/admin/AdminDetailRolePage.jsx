import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

// Données mock
const roleData = {
  nom: 'Agent Mairie',
  badge: 'Rôle Opérationnel',
  description:
    "Ce rôle est dédié à la gestion opérationnelle des actes d'état civil et des services de proximité au niveau communal. Il permet l'accueil des citoyens, l'enregistrement des demandes et le suivi des dossiers municipaux.",
  permissions: [
    { icon: 'description',  module: 'Actes de Naissance',   lecture: true,  ecriture: true,  validation: false },
    { icon: 'calendar_month', module: 'Gestion des Mariages', lecture: true,  ecriture: false, validation: false },
    { icon: 'receipt_long', module: 'Taxes Municipales',    lecture: true,  ecriture: true,  validation: true  },
    { icon: 'folder_shared', module: 'Données Citoyens',    lecture: true,  ecriture: false, validation: false },
  ],
  agents: [
    { initiales: 'OC', nom: 'Ouedraogo Christophe', mairie: 'Mairie Ouaga 2000'  },
    { initiales: 'SK', nom: 'Sawadogo Karidiatou',  mairie: 'Mairie Bogodogo'    },
    { initiales: 'TI', nom: 'Traoré Idrissa',       mairie: 'Mairie de Bobo'     },
    { initiales: 'BK', nom: 'Boni Koulsouma',       mairie: 'District Kadiogo'   },
  ],
  totalAgents: 12,
  creeLeInfo: 'Créé le : 14/03/2023 par Admin_Sys',
  modifInfo:  'Dernière modification : 22/10/2023 · 10:45',
};

// Icône check ou minus selon la permission
const PermIcon = ({ active }) =>
  active ? (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full"
      style={{ backgroundColor: '#22c55e' }}
    >
      <span className="material-symbols-outlined text-white" style={{ fontSize: 14 }}>
        check
      </span>
    </span>
  ) : (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full"
      style={{ backgroundColor: '#e2e8f0' }}
    >
      <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 14 }}>
        remove
      </span>
    </span>
  );

const AdminDetailRolePage = () => {
  const { id } = useParams();

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">

        {/* ── BREADCRUMB ──────────────────────────────────────────────── */}
        <nav className="flex text-sm text-slate-500 gap-2 items-center uppercase tracking-widest">
          <Link className="hover:text-slate-800 transition-colors" to="/admin/dashboard">
            Accueil
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link className="hover:text-slate-800 transition-colors" to="/admin/systeme">
            Rôles
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-bold" style={{ color: '#002395' }}>Agent Mairie</span>
        </nav>

        {/* ── HERO CARD ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">

            {/* Icône + nom + badge + description */}
            <div className="flex items-start gap-5 flex-1">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(0,35,149,0.08)' }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#002395', fontSize: 30 }}
                >
                  badge
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-3xl font-black text-slate-900">{roleData.nom}</h2>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: '#dcfce7', color: '#15803d' }}
                  >
                    {roleData.badge}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                  {roleData.description}
                </p>
              </div>
            </div>

            {/* Boutons actions */}
            <div className="flex flex-col gap-2 shrink-0 min-w-[160px]">
              <button
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5
                           text-white rounded-xl font-bold text-sm"
                style={{
                  backgroundColor: '#002395',
                  boxShadow: '0 4px 12px rgba(0,35,149,0.3)',
                }}
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                Modifier
              </button>
              <button
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5
                           border border-slate-200 text-slate-700 rounded-xl font-bold
                           text-sm hover:bg-slate-50 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                Dupliquer
              </button>
              <button
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5
                           rounded-xl font-bold text-sm hover:bg-red-50 transition-colors"
                style={{ color: '#ef4444' }}
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Supprimer
              </button>
            </div>
          </div>
        </div>

        {/* ── GRID : Matrice + Agents ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Matrice des Permissions (2/3) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 20 }}>
                  security
                </span>
                <h3 className="text-lg font-bold text-slate-900">Matrice des Permissions</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                    <tr>
                      <th className="px-8 py-4">Module / Ressource</th>
                      <th className="px-6 py-4 text-center">Lecture</th>
                      <th className="px-6 py-4 text-center">Écriture</th>
                      <th className="px-6 py-4 text-center">Validation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {roleData.permissions.map(({ icon, module, lecture, ecriture, validation }) => (
                      <tr key={module} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <span
                              className="material-symbols-outlined text-slate-400"
                              style={{ fontSize: 18 }}
                            >
                              {icon}
                            </span>
                            <span className="font-bold text-sm text-slate-900">{module}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <PermIcon active={lecture} />
                        </td>
                        <td className="px-6 py-5 text-center">
                          <PermIcon active={ecriture} />
                        </td>
                        <td className="px-6 py-5 text-center">
                          <PermIcon active={validation} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Agents Assignés (1/3) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 20 }}>
                  group
                </span>
                <h3 className="font-bold text-slate-900">Agents Assignés</h3>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: 'rgba(0,35,149,0.08)', color: '#002395' }}
              >
                {roleData.totalAgents} Agents
              </span>
            </div>

            {/* Liste agents */}
            <div className="divide-y divide-slate-100">
              {roleData.agents.map(({ initiales, nom, mairie }) => (
                <div
                  key={nom}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center
                               text-slate-500 text-xs font-black shrink-0"
                    style={{ backgroundColor: '#f1f5f9' }}
                  >
                    {initiales}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{nom}</p>
                    <p className="text-xs text-slate-400">{mairie}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Voir tous */}
            <div className="px-6 py-4 border-t border-slate-100 text-center">
              <button
                className="text-sm font-bold hover:underline"
                style={{ color: '#002395' }}
              >
                Voir tous les agents
              </button>
            </div>
          </div>
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>{roleData.creeLeInfo}</span>
          <span>{roleData.modifInfo}</span>
        </div>

      </div>
    </Layout>
  );
};

export default AdminDetailRolePage;