import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const PRIMARY = '#1a3a5c';

const AdminDetailServicePage = () => {
  const { id } = useParams();

  const documents = [
    { nom: 'Casier Judiciaire',                   date: '12/10/2023', statut: 'ACTIF',       ok: true  },
    { nom: 'Certificat de Nationalité',            date: '05/10/2023', statut: 'ACTIF',       ok: true  },
    { nom: 'Acte de Mariage (Copies certifiées)',  date: '28/09/2023', statut: 'EN RÉVISION', ok: false },
  ];

  const agents = [
    { initiales: 'IS', bg: '#e0e7ff', color: '#4f46e5', nom: 'Idrissa Sawadogo',   poste: 'Directeur des Affaires Civiles', statut: 'En poste', actif: true  },
    { initiales: 'FK', bg: '#fef3c7', color: '#d97706', nom: 'Fatoumata Koné',     poste: 'Greffière en Chef',              statut: 'En poste', actif: true  },
    { initiales: 'AZ', bg: '#f1f5f9', color: '#64748b', nom: 'Alassane Zoungrana', poste: 'Conseiller Technique',           statut: 'En congé', actif: false },
  ];

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto space-y-6">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link to="/admin/dashboard" className="hover:text-slate-800">Accueil</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link to="/admin/systeme" className="hover:text-slate-800">Ministères</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-semibold text-slate-800">Ministère de la Justice</span>
        </div>

        {/* HERO CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-start gap-6">

            {/* LEFT: Logo only */}
            <div className="w-32 h-32 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden p-3">
              <img
                className="w-full h-full object-contain"
                alt="Logo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlOMkpgGjI1W6SNXZdv23jbKtxKj08yMjXu4JNKLtj4VraLG3P3xqp-t4ztfqSDPH50_XdzadfHu2K2ZK1lxs3UUOlL4sBSzxvOv3C074VtvaJkYf3aIM_rhgQES2NyycuQdkUw5_zVUQg6187-yO5MvaKO8LVV0CS-CREoaS45qWBwoH3JgtwPFuQepXYMv1fmAKpUN8iZAqlywV0txJ6whjZSLQL3mt4VK67PHY66dTqTbvjgesc13N6lil-KQytFE3zfXZWgh4"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

            {/* RIGHT: Title → Subtitle → Meta row → Buttons */}
            <div className="flex-1 space-y-6">

              {/* Title + subtitle */}
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Ministère de la Justice</h1>
                <p className="text-slate-500 mt-1">Garde des Sceaux, des Droits Humains et de la Promotion Civique</p>
              </div>

              {/* Meta info row — horizontal, BELOW the title */}
              <div className="flex flex-wrap gap-16">
                {[
                  { icon: 'person',      label: 'RESPONSABLE',  value: 'Mme. Bibata Nébié/Ouédraogo'    },
                  { icon: 'mail',        label: 'CONTACT',      value: 'contact@justice.gov.bf'          },
                  { icon: 'location_on', label: 'LOCALISATION', value: 'Ouagadougou, Zone des Ministères'},
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl text-slate-500">{icon}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-slate-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  className="px-10 py-3 rounded-xl text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all"
                  style={{ backgroundColor: PRIMARY }}
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  Modifier
                </button>
                <button
                  className="px-10 py-3 rounded-xl text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all"
                  style={{ backgroundColor: '#dc2626' }}
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DOCUMENTS + AGENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Documents gérés */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl" style={{ color: PRIMARY }}>folder</span>
                Documents gérés
              </h3>
              <button className="text-sm font-semibold" style={{ color: PRIMARY }}>Voir tout</button>
            </div>
            <div className="divide-y divide-slate-100">
              {documents.map(({ nom, date, statut, ok }) => (
                <div key={nom} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl text-red-500">description</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{nom}</p>
                      <p className="text-xs text-slate-400">Dernière mise à jour: {date}</p>
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide whitespace-nowrap"
                    style={ok
                      ? { backgroundColor: '#dcfce7', color: '#15803d' }
                      : { backgroundColor: '#fef9c3', color: '#b45309' }}
                  >
                    {statut}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-slate-100">
              <button className="text-sm font-bold flex items-center gap-2" style={{ color: PRIMARY }}>
                <span className="material-symbols-outlined text-base">add</span>
                Ajouter un type de document
              </button>
            </div>
          </div>

          {/* Agents rattachés */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl" style={{ color: PRIMARY }}>group</span>
                Agents rattachés
              </h3>
              <button className="text-sm font-semibold" style={{ color: PRIMARY }}>Gérer l'équipe</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  <th className="px-6 py-3 text-left">Agent</th>
                  <th className="px-6 py-3 text-left">Poste</th>
                  <th className="px-6 py-3 text-left">Statut</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {agents.map(({ initiales, bg, color, nom, poste, statut, actif }) => (
                  <tr key={nom} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center" style={{ backgroundColor: bg, color }}>{initiales}</div>
                        <span className="text-sm font-semibold text-slate-900">{nom}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 max-w-[120px]">{poste}</td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase"
                        style={actif ? { backgroundColor: '#dcfce7', color: '#15803d' } : { backgroundColor: '#f1f5f9', color: '#64748b' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: actif ? '#22c55e' : '#94a3b8' }} />
                        {statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-300 hover:text-slate-600">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-4 flex justify-between items-center text-xs text-slate-400 border-t border-slate-100">
          <span>© 2023 Secrétariat Général du Gouvernement du Burkina Faso</span>
          <div className="flex gap-4">
            <button className="hover:text-slate-600">Support Technique</button>
            <button className="hover:text-slate-600">Mentions Légales</button>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default AdminDetailServicePage;