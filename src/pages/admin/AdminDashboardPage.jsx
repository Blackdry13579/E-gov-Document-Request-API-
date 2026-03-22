import React from 'react';
import Layout from '../../components/layout/Layout';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const PRIMARY = '#002395';

const barData = [
  { name: 'Lundi',    vol: 1200 },
  { name: 'Mardi',    vol: 1900 },
  { name: 'Mercredi', vol: 1500 },
  { name: 'Jeudi',    vol: 2200 },
  { name: 'Vendredi', vol: 2800 },
  { name: 'Samedi',   vol: 1800 },
  { name: 'Dimanche', vol: 3200 },
];

const kpis = [
  { icon: 'assignment',      bg: '#e0f2fe', color: '#0369a1', label: 'Total Demandes',      value: '125,430', trend: '+12%', up: true  },
  { icon: 'pending_actions', bg: '#ffedd5', color: '#c2410c', label: 'Demandes en attente', value: '1,240',   trend: '−0%',  up: null  },
  { icon: 'person_add',      bg: '#dcfce7', color: '#15803d', label: 'Citoyens inscrits',   value: '850,200', trend: '+18%', up: true  },
  { icon: 'support_agent',   bg: '#ede9fe', color: '#7c3aed', label: 'Agents actifs',       value: '450',     trend: '+2%',  up: true  },
];

const activities = [
  {
    icon: 'check_circle', bg: '#dcfce7', color: '#15803d', border: '#22c55e',
    title: 'CNIB Approuvée',
    sub: 'Demande #4521 par Ibrahim T.',
    time: 'Il y a 2 min',
  },
  {
    icon: 'person_add', bg: '#e0f2fe', color: '#0369a1', border: PRIMARY,
    title: 'Nouvel Agent Inscrit',
    sub: 'Agent: Mariam K. (Zone Bobo)',
    time: 'Il y a 15 min',
  },
  {
    icon: 'warning', bg: '#ffedd5', color: '#c2410c', border: '#f97316',
    title: 'Alerte Système',
    sub: 'Latence élevée détectée sur le serveur API',
    time: 'Il y a 45 min',
  },
];

const servers = [
  { name: 'Base de données', statut: 'Stable', ok: true  },
  { name: 'Passerelle API',  statut: 'Stable', ok: true  },
  { name: 'Stockage S3',     statut: 'Lent',   ok: false },
];

const AdminDashboardPage = () => {
  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">

        {/* ── HERO BANNER ─────────────────────────────────────────────── */}
        <div
          className="relative rounded-2xl overflow-hidden h-52 flex items-center px-10"
        >
          {/* Image de fond */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(to right, ${PRIMARY} 0%, rgba(0,35,149,0.75) 50%, transparent 100%)`,
              }}
            />
            <img
              className="w-full h-full object-cover"
              alt="Bâtiment gouvernemental"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJD6t1qtl298dNs8r3r_EXcn1wnrzQqnGdQN4YuBCnpU-3cl7RxaM1wmlj_QF1qmJLLNbzOWH7aLK-ATts8Qv21orhOljD1g4om8xXW3vaZfQazWbNaJHPAlsi7XN8-ekfSmXHT3dGnDN3UD5TrSdELbe3G8uLAF66q2eK385j9oerrjum8czlx7do7RdpA6KRhCqwGJhpN8IpBCxl0B96-65qZHEgLdcivJYYRHs1mSXaTRKAqWstbKhS0NVo4zKsrX9b8p7yOrEf"
            />
          </div>
          <div className="relative z-20 text-white">
            <h2 className="text-3xl font-bold mb-2">Bienvenue, Admin</h2>
            <p className="text-white/80 max-w-lg text-sm leading-relaxed">
              Voici l'état actuel de la plateforme e-Government. Gérez les flux de documents
              et supervisez les activités nationales.
            </p>
          </div>
        </div>

        {/* ── KPI CARDS ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map(({ icon, bg, color, label, value, trend, up }) => (
            <div
              key={label}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: bg }}
                >
                  <span className="material-symbols-outlined text-xl" style={{ color }}>
                    {icon}
                  </span>
                </div>
                <span
                  className="text-sm font-bold flex items-center gap-1"
                  style={{
                    color: up === true ? '#22c55e' : up === false ? '#ef4444' : '#f97316',
                  }}
                >
                  <span className="material-symbols-outlined text-xs">
                    {up === true ? 'trending_up' : up === false ? 'trending_down' : 'horizontal_rule'}
                  </span>
                  {trend}
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium">{label}</p>
              <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
            </div>
          ))}
        </div>

        {/* ── CHARTS + SIDEBAR ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* GAUCHE (2/3) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-900">
                  Volume des demandes (7 derniers jours)
                </h3>
                <select
                  className="bg-slate-50 border border-slate-200 rounded-xl text-sm
                             px-3 py-1.5 outline-none text-slate-700"
                >
                  <option>Hebdomadaire</option>
                  <option>Mensuel</option>
                </select>
              </div>
              <div style={{ height: 256 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} barCategoryGap="30%">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    />
                    <Bar dataKey="vol" radius={[6, 6, 0, 0]} barSize={36}>
                      {barData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={i === barData.length - 1 ? PRIMARY : `${PRIMARY}55`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Dernières Activités */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Dernières Activités</h3>
              </div>
              <div className="p-6 space-y-3">
                {activities.map(({ icon, bg, color, border, title, sub, time }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl
                               transition-colors"
                    style={{ borderLeft: `4px solid ${border}` }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: bg }}
                    >
                      <span
                        className="material-symbols-outlined text-xl"
                        style={{ color }}
                      >
                        {icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                      {time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-5">
                <button
                  className="w-full text-center text-sm font-bold py-3 rounded-xl
                             transition-colors hover:opacity-80"
                  style={{ color: PRIMARY, border: `1px solid rgba(0,35,149,0.2)` }}
                >
                  Voir tout l'historique
                </button>
              </div>
            </div>
          </div>

          {/* DROITE (1/3) */}
          <div className="space-y-6">

            {/* Distribution des Demandes — donut CSS */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-slate-900 mb-6">
                Distribution des Demandes
              </h3>

              {/* Donut via conic-gradient */}
              <div className="relative w-44 h-44 mx-auto mb-6">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(
                      ${PRIMARY}   0%  65%,
                      #22c55e     65%  85%,
                      #f97316     85% 100%
                    )`,
                  }}
                />
                {/* Trou central */}
                <div
                  className="absolute inset-4 bg-white rounded-full flex flex-col
                             items-center justify-center"
                >
                  <span className="text-2xl font-black text-slate-900">100%</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    Total
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'En cours',   pct: '65%', color: PRIMARY    },
                  { label: 'Approuvées', pct: '20%', color: '#22c55e'  },
                  { label: 'Rejetées',   pct: '15%', color: '#f97316'  },
                ].map(({ label, pct, color }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-slate-600">{label}</span>
                    </div>
                    <span className="font-bold text-slate-800">{pct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Technique */}
            <div
              className="rounded-2xl p-6 text-white relative overflow-hidden"
              style={{ backgroundColor: '#1a3a5c' }}
            >
              <div
                className="absolute top-0 right-0 w-28 h-28 rounded-full -mr-14 -mt-14 blur-2xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              />
              <h4 className="text-base font-bold mb-2 relative z-10">Support Technique</h4>
              <p className="text-white/70 text-xs mb-5 relative z-10 leading-relaxed">
                Besoin d'aide pour la maintenance de la plateforme ? Contactez l'équipe IT.
              </p>
              <button
                className="w-full bg-white py-2.5 rounded-xl font-bold flex items-center
                           justify-center gap-2 hover:bg-slate-100 transition-colors
                           relative z-10 text-sm"
                style={{ color: '#1a3a5c' }}
              >
                <span className="material-symbols-outlined text-sm">settings</span>
                Ouvrir un ticket
              </button>
              <span
                className="material-symbols-outlined absolute -bottom-5 -right-5 text-white/10"
                style={{ fontSize: 110 }}
              >
                help
              </span>
            </div>

            {/* Statut des serveurs */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h4 className="text-base font-bold text-slate-900 mb-4">
                Statut des serveurs
              </h4>
              <div className="space-y-3">
                {servers.map(({ name, statut, ok }) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: ok ? '#22c55e' : '#f97316' }}
                      />
                      <span className="text-sm text-slate-700 font-medium">{name}</span>
                    </div>
                    <span
                      className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full"
                      style={ok
                        ? { backgroundColor: '#dcfce7', color: '#15803d' }
                        : { backgroundColor: '#ffedd5', color: '#c2410c' }
                      }
                    >
                      {statut}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;