import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import adminService from '../../services/adminService';
import Loader from '../../components/Loader';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';

const activitiesMock = [
  {
    icon: 'check_circle',
    iconBg: '#002395',
    iconColor: '#fff',
    title: 'Validation dossier Passeport #89201',
    sub: 'Demande approuvée • Module Identification',
    time: 'Il y a 12 min • Aujourd\'hui',
  },
  {
    icon: 'login',
    iconBg: '#f1f5f9',
    iconColor: '#64748b',
    title: 'Connexion système établie',
    sub: 'Authentifié via Poste WP-442',
    time: 'Il y a 3 h • Aujourd\'hui',
  },
  {
    icon: 'warning',
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    title: 'Dossier escaladé au superviseur',
    sub: 'Dossier #REQ-7712 — documents insuffisants',
    time: '16:45 • Hier',
  },
  {
    icon: 'task_alt',
    iconBg: '#dcfce7',
    iconColor: '#15803d',
    title: '12 demandes CNI traitées en série',
    sub: 'Traitement rapide — SLA respecté à 100%',
    time: '10:30 • Hier',
  },
];

const AdminDetailAgentPage = () => {
  const { user: currentUser } = useAuth();
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('informations');

  const fetchAgent = async () => {
    setLoading(true);
    
    // Mock fallback pour ID de démo
    if (id && id.startsWith('AG-')) {
      setAgent({
        _id: id,
        nom: 'Traoré',
        prenom: 'Moussa',
        email: 'm.traore@police.gov.bf',
        telephone: '+226 25 30 00 00',
        role: 'Officier',
        status: 'actif',
        serviceId: { nom: 'Police Nationale - Bureau des Passeports' },
        createdAt: '2024-03-12T10:00:00Z',
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdtOy6PEFUZMZAzJoiwspRYjaBhaqYe15u3XtOWxnPHqYZqaGsTjRxrhJGCEbgb8TMdUSA4B5yU8M37poOqBSD-Kr_4OeCRdGRpC4fAWDGRRONZ4kLBicG6pKuYi02nPkBQak7PV-lhnWKF7-7f54hevbPIAZaEECtu_PFP27Ej-9xtyFx6yElK8lRS1pOug4sEak6I9uk3-O6qjnWi3fq4P3j6vT7BARgEU1-GNtyi1SKaxL9vHAP-rMr62rzms_DoMXm4H4GMkDo"
      });
      setLoading(false);
      return;
    }

    const result = await adminService.getUserById(id);
    if (result.success) {
      setAgent(result.data);
    } else {
      // Si l'API échoue (ex: 403), on vérifie si c'est le profil de l'utilisateur actuel
      if (currentUser?._id === id) {
        setAgent(currentUser);
      } else {
        setError(result.error || 'Erreur lors du chargement de l\'agent');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAgent();
  }, [id]);

  if (loading) return <Loader fullPage />;
  if (error && !agent) return <div className="p-8"><Alert variant="danger" message={error} /></div>;
  if (!agent) return <div className="p-8">Agent non trouvé</div>;

  const agentName = `${agent.prenom || ''} ${agent.nom || ''}`.trim();
  const agentStatus = agent.status === 'actif' || agent.status === 'ACTIVE' ? 'Actif' : 'Inactif';
  const statusColor = agentStatus === 'Actif' ? '#15803d' : '#94a3b8';
  const statusBg = agentStatus === 'Actif' ? '#dcfce7' : '#f1f5f9';
  const dotColor = agentStatus === 'Actif' ? '#22c55e' : '#cbd5e1';

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">

        {/* ── BREADCRUMB ──────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/admin/dashboard" className="hover:text-slate-800 transition-colors">
            Administration
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link to="/admin/ressources" className="hover:text-slate-800 transition-colors">
            Agents
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-semibold text-slate-800">Agent Profile</span>
        </nav>

        {/* ── HERO CARD ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            {/* Avatar + infos */}
            <div className="flex items-center gap-5">
              <div
                className="w-24 h-24 rounded-2xl overflow-hidden shrink-0"
                style={{ border: '2px solid #e2e8f0' }}
              >
                <img
                  src={agent.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(agentName) + "&background=random"}
                  alt={agentName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-slate-900">{agentName}</h1>
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full
                               text-xs font-bold"
                    style={{ backgroundColor: statusBg, color: statusColor }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: dotColor }}
                    />
                    {agentStatus}
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-2">ID: {agent.numeroSuivi || agent._id}</p>
                <div className="flex items-center gap-4">
                  <span className="text-sm flex items-center gap-1.5 text-slate-600">
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#002395' }}>
                      apartment
                    </span>
                    {agent.serviceId?.nom || 'Non assigné'}
                  </span>
                  <span className="text-sm flex items-center gap-1.5 text-slate-600">
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#002395' }}>
                      work
                    </span>
                    {agent.role || 'Agent'}
                  </span>
                </div>
              </div>
            </div>

            {/* Boutons actions (Visibles SEULEMENT pour Admin) */}
            {currentUser?.role === 'ADMIN' && (
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm
                             transition-colors hover:bg-slate-100"
                  style={{ backgroundColor: '#f1f5f9', color: '#334155' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
                   Edit Information
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm
                             border transition-colors hover:bg-slate-50"
                  style={{ borderColor: '#e2e8f0', color: '#334155' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>swap_horiz</span>
                  Change Role
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm
                             transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>block</span>
                  Deactivate
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── GRID 2 COLONNES ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* COLONNE GAUCHE (2/3) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Profile Details */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100">
                <h3 className="font-bold text-lg text-slate-900">Profile Details</h3>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  { label: 'Full Name',         value: agentName                          },
                  { label: 'Email Address',     value: agent.email                        },
                  { label: 'Phone Number',      value: agent.telephone || 'N/A'            },
                  { label: 'Date of Joining',   value: new Date(agent.createdAt).toLocaleDateString() },
                  { label: 'Assigned Service',  value: agent.serviceId?.nom || 'N/A'      },
                  { label: 'Professional Role', value: agent.role || 'Agent'              },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                      {label}
                    </p>
                    <p className="text-sm font-bold text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-900">Activités Récentes</h3>
                <button
                  className="text-sm font-bold hover:underline"
                  style={{ color: '#002395' }}
                >
                  Voir tout
                </button>
              </div>
              <div className="p-8 space-y-5">
                {activitiesMock.map(({ icon, iconBg, iconColor, title, sub, time }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50
                               transition-colors"
                  >
                    {/* Icône */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: iconBg }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 18, color: iconColor }}
                      >
                        {icon}
                      </span>
                    </div>
                    {/* Texte */}
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                    </div>
                    {/* Temps */}
                    <p className="text-[11px] text-slate-400 font-medium whitespace-nowrap shrink-0">
                      {time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLONNE DROITE (1/3) */}
          <div className="space-y-6">

            {/* Performance */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-6">Performance</h3>

              {/* Demandes traitées */}
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(0,35,149,0.08)' }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#002395', fontSize: 20 }}>
                    description
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">1,284</span>
                    <span className="text-xs font-bold text-green-500">↑ 12%</span>
                  </div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mt-0.5">
                    Requests Processed
                  </p>
                </div>
              </div>

              {/* Temps moyen */}
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#f1f5f9' }}
                >
                  <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: 20 }}>
                    timer
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">4.2m</span>
                    <span className="text-xs font-bold text-green-500">↓ 0.5m</span>
                  </div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mt-0.5">
                    Avg. Proc. Time
                  </p>
                </div>
              </div>

              {/* Workload */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700">Current Workload</span>
                  <span className="text-sm font-black text-slate-900">82%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: '82%', backgroundColor: '#002395' }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">14 pending items in queue</p>
              </div>
            </div>

            {/* Monthly Efficiency */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{ backgroundColor: '#1a3a5c' }}
            >
              <h3 className="font-bold text-base mb-4">Monthly Efficiency</h3>

              {/* Mini bar chart CSS */}
              <div className="flex items-end gap-2 h-20 mb-4">
                {[40, 60, 45, 70, 55, 85, 100, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i === 6
                        ? '#fff'
                        : 'rgba(255,255,255,0.25)',
                    }}
                  />
                ))}
              </div>

              <p className="text-xs text-white/70 leading-relaxed">
                Agent {agent.nom} a dépassé ses objectifs mensuels d'efficacité de traitement de{' '}
                <span className="text-white font-bold">15%</span>.
              </p>
            </div>

            {/* Sécurité & Accès */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h4 className="font-bold text-sm text-slate-900 mb-4">Sécurité &amp; Accès</h4>
              <div className="space-y-3">
                {[
                  { label: 'Double Auth (2FA)', value: 'Actif', ok: true   },
                  { label: 'Permissions',       value: 'Niveau 3 - Édition', ok: null },
                  { label: 'Dernier Chg. MP',  value: '24 Fév 2024', ok: null },
                ].map(({ label, value, ok }) => (
                  <div key={label} className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span
                      className="font-bold"
                      style={{ color: ok === true ? '#22c55e' : '#334155' }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <button
                className="w-full mt-5 py-2.5 rounded-xl text-sm font-bold transition-colors
                           hover:opacity-90"
                style={{ backgroundColor: '#f1f5f9', color: '#334155' }}
              >
                Réinitialiser Accès
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDetailAgentPage;