import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const AdminStatistiquesPage = () => {
  const [dateRange, setDateRange] = useState('30days');

  const handleExport = () => {
    alert('Génération du rapport en cours...');
  };

  const barData = [
    { label: 'Acte Naiss.', value: 1.5, pct: 40 },
    { label: 'Passeport',   value: 4.2, pct: 85 },
    { label: 'CNI',         value: 2.8, pct: 60 },
    { label: 'Casier Jud.', value: 1.1, pct: 30 },
    { label: 'Mariage',     value: 3.5, pct: 75 },
  ];

  const deptData = [
    { label: 'Police Nationale',    pct: 45, count: '378,946', color: '#002395' },
    { label: 'Mairie / Etat Civil', pct: 32, count: '269,472', color: '#10b981' },
    { label: 'Justice',             pct: 23, count: '193,685', color: '#f59e0b' },
  ];

  const regionData = [
    { region: 'Centre (Ouagadougou)', service: 'Mairie',  dossiers: '124,502', delai: '2.1 jours', statut: 'Optimal',        ok: true  },
    { region: 'Hauts-Bassins (Bobo)', service: 'Police',  dossiers: '89,230',  delai: '3.4 jours', statut: 'Optimal',        ok: true  },
    { region: 'Nord (Ouahigouya)',    service: 'Justice',  dossiers: '45,112',  delai: '5.8 jours', statut: 'Retard Détecté', ok: false },
  ];

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">

        {/* ── HEADER ──────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Statistiques Avancées
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Métriques de performance en temps réel des services gouvernementaux du Burkina Faso.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <select
              className="h-10 px-4 bg-white border border-slate-200 rounded-xl
                         text-sm font-bold shadow-sm cursor-pointer text-slate-700"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Aujourd'hui</option>
              <option value="7days">Derniers 7 jours</option>
              <option value="30days">Derniers 30 jours</option>
              <option value="year">Cette année</option>
            </select>
            <button
              onClick={handleExport}
              className="h-10 flex items-center gap-2 px-4 text-white rounded-xl text-sm font-bold"
              style={{ backgroundColor: '#002395', boxShadow: '0 4px 12px rgba(0,35,149,0.25)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
              Exporter le rapport
            </button>
          </div>
        </div>

        {/* ── KPI CARDS ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'description', iconBg: 'rgba(0,35,149,0.1)', iconColor: '#002395', badge: '+12.4%', badgeOk: true,  label: 'Total Demandes',   value: '842,103'  },
            { icon: 'timer',       iconBg: '#fef3c7',            iconColor: '#d97706', badge: '-0.8j',  badgeOk: true,  label: 'Traitement Moyen', value: '3.2 Jours' },
            { icon: 'person_add',  iconBg: '#e0e7ff',            iconColor: '#4f46e5', badge: '+5.2%', badgeOk: true,  label: 'Nouveaux Usagers', value: '14,290'    },
            { icon: 'check_circle',iconBg: '#ffe4e6',            iconColor: '#f43f5e', badge: 'Stable', badgeOk: null,  label: 'Taux de Réussite', value: '98.4%'     },
          ].map(({ icon, iconBg, iconColor, badge, badgeOk, label, value }) => (
            <div key={label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
              <div className="flex justify-between items-center mb-1">
                <span className="p-2 rounded-lg" style={{ backgroundColor: iconBg }}>
                  <span className="material-symbols-outlined" style={{ color: iconColor, fontSize: 22 }}>{icon}</span>
                </span>
                {badgeOk !== null
                  ? <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-600">{badge}</span>
                  : <span className="px-2 py-0.5 rounded text-xs font-bold text-slate-400">{badge}</span>
                }
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
              <p className="text-3xl font-black text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        {/* ── GRAPHIQUES ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Bar chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col" style={{ height: '400px' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-slate-900">Délai de traitement par document (Jours)</h3>
              <button className="text-slate-400"><span className="material-symbols-outlined">more_vert</span></button>
            </div>
            <div className="flex-1 flex items-end justify-between gap-3 px-2 pb-8">
              {barData.map(({ label, value, pct }) => (
                <div key={label} className="flex flex-col items-center flex-1 gap-2 group">
                  <div className="w-full flex flex-col justify-end" style={{ height: '240px' }}>
                    <div
                      className="relative w-full rounded-t-lg flex items-end justify-center transition-all"
                      style={{ height: `${pct}%`, backgroundColor: 'rgba(0,35,149,0.15)' }}
                    >
                      <div className="w-2/3 rounded-t-lg" style={{ height: '75%', backgroundColor: '#002395' }} />
                      <div className="absolute -top-7 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {value}j
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 text-center uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demandes par département */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col" style={{ height: '400px' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-slate-900">Demandes par Département</h3>
              <div className="text-xs text-slate-500">Total: 842k</div>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-8">
              {deptData.map(({ label, pct, count, color }) => (
                <div key={label} className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      {label}
                    </span>
                    <span className="text-slate-600">{pct}% ({count})</span>
                  </div>
                  <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 italic">
              * Données mises à jour toutes les 15 minutes.
            </div>
          </div>
        </div>

        {/* ── COURBE CROISSANCE ────────────────────────────────────────── */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900">Croissance Mensuelle des Inscriptions</h3>
              <p className="text-sm text-slate-500 mt-1">Tendance de l'adhésion numérique des citoyens sur l'exercice fiscal.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{ backgroundColor: 'rgba(0,35,149,0.05)', borderColor: 'rgba(0,35,149,0.1)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#002395' }} />
                <span className="text-xs font-bold" style={{ color: '#002395' }}>2023</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="text-xs font-bold text-slate-500">2022 (Préc.)</span>
              </div>
            </div>
          </div>
          <div style={{ height: '256px', width: '100%', position: 'relative' }}>
            <svg style={{ width: '100%', height: '100%', overflow: 'visible' }} preserveAspectRatio="none" viewBox="0 0 1000 200">
              <defs>
                <linearGradient id="areaGrad2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%"   stopColor="#002395" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#002395" stopOpacity="0"   />
                </linearGradient>
              </defs>
              <path d="M0,180 L100,160 L200,170 L300,140 L400,150 L500,120 L600,130 L700,100 L800,110 L900,80 L1000,90"
                fill="none" stroke="#94a3b8" strokeDasharray="4,4" strokeWidth="2" />
              <path d="M0,160 L100,130 L200,110 L300,90 L400,110 L500,70 L600,60 L700,40 L800,30 L900,10 L1000,5 L1000,200 L0,200 Z"
                fill="url(#areaGrad2)" />
              <path d="M0,160 L100,130 L200,110 L300,90 L400,110 L500,70 L600,60 L700,40 L800,30 L900,10 L1000,5"
                fill="none" stroke="#002395" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="500"  cy="70" r="5" fill="#002395" stroke="white" strokeWidth="2" />
              <circle cx="1000" cy="5"  r="5" fill="#002395" stroke="white" strokeWidth="2" />
            </svg>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              {['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABLEAU ANALYSES RÉGIONALES ─────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Dernières Analyses Régionales</h3>
            <button className="text-sm font-bold" style={{ color: '#002395' }}>Voir tout</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
                <tr>
                  <th className="px-6 py-4 tracking-wider">Région</th>
                  <th className="px-6 py-4 tracking-wider">Service Principal</th>
                  <th className="px-6 py-4 tracking-wider">Dossiers Actifs</th>
                  <th className="px-6 py-4 tracking-wider">Délai d'exécution</th>
                  <th className="px-6 py-4 tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {regionData.map(({ region, service, dossiers, delai, statut, ok }) => (
                  <tr key={region} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{region}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{service}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{dossiers}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{delai}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-bold w-fit">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ok ? '#10b981' : '#f59e0b' }} />
                        <span style={{ color: ok ? '#059669' : '#d97706' }}>{statut}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default AdminStatistiquesPage;