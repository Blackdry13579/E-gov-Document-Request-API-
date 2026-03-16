import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';
import { 
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  BadgeCheck, Building2, Briefcase, Mail, Phone, Calendar, 
  Edit3, Trash2, ArrowLeft, Clock, CheckCircle, AlertTriangle,
  TrendingUp, TrendingDown, Activity
} from 'lucide-react';

const AdminDetailAgentPage = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgentData();
  }, [id]);

  const fetchAgentData = async () => {
    try {
      setLoading(true);
      const [agentRes, logsRes] = await Promise.all([
        adminService.getUserById(id),
        adminService.getLogs({ auteurId: id, limit: 5 })
      ]);

      if (agentRes.success) setAgent(agentRes.data);
      if (logsRes.success) setLogs(logsRes.data);
    } catch (err) {
      setError("Erreur lors de la récupération des détails de l'agent.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  if (!agent) return <div className="flex items-center justify-center h-screen text-red-500">Agent introuvable.</div>;

  const chartData = [
    { name: 'Jan', val: 400 },
    { name: 'Feb', val: 600 },
    { name: 'Mar', val: 800 },
    { name: 'Apr', val: 500 },
    { name: 'May', val: 950 },
    { name: 'Jun', val: 700 },
  ];

  return (
    <div className="app-container flex min-h-screen bg-slate-50">
      <Sidebar activePage="ressources" />
      
      <main className="main-content flex-1 ml-72 p-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/admin/dashboard" className="text-slate-500 hover:text-primary transition-colors">Administration</Link>
          <span className="text-slate-400">/</span>
          <Link to="/admin/ressources" className="text-slate-500 hover:text-primary transition-colors">Agents</Link>
          <span className="text-slate-400">/</span>
          <span className="text-primary font-bold">Profil Agent</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="size-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-3xl shadow-inner">
              {agent.nom[0]}{agent.prenom[0]}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-black text-slate-900">{agent.prenom} {agent.nom}</h1>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 ${
                  agent.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <span className={`size-1.5 rounded-full ${agent.isActive ? 'bg-green-600' : 'bg-red-600'}`}></span>
                  {agent.isActive ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">ID: AG-{agent._id.slice(-6).toUpperCase()}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm flex items-center gap-1.5 text-slate-600 font-medium">
                  <Building2 size={16} className="text-primary" /> {agent.serviceId?.nom || 'Non assigné'}
                </span>
                <span className="text-sm flex items-center gap-1.5 text-slate-600 font-medium">
                  <Briefcase size={16} className="text-primary" /> {agent.role}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">
              <Edit3 size={18} /> Modifier
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-100 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-all">
              <Trash2 size={18} /> Désactiver
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
                <h3 className="font-bold text-slate-800">Détails du Profil</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <InfoItem label="Nom Complet" value={`${agent.prenom} ${agent.nom}`} />
                <InfoItem label="Email Professionnel" value={agent.email} />
                <InfoItem label="Téléphone" value={agent.telephone || 'Non renseigné'} />
                <InfoItem label="Date d'Adhésion" value={new Date(agent.createdAt).toLocaleDateString()} />
                <InfoItem label="Service Assigné" value={agent.serviceId?.nom || 'N/A'} />
                <InfoItem label="Code Service" value={agent.serviceId?.code || 'N/A'} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
                <h3 className="font-bold text-slate-800">Activités Récentes</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {logs.length > 0 ? logs.map(log => (
                  <ActivityLine key={log._id} log={log} />
                )) : (
                  <p className="p-6 text-center text-slate-400">Aucune activité enregistrée.</p>
                )}
              </div>
              <div className="p-4 bg-slate-50/50 text-center">
                <button className="text-sm font-bold text-primary hover:underline">Voir tous les logs</button>
              </div>
            </div>
          </div>

          {/* Metrics & Performance */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6">
                <h3 className="font-bold text-slate-800 mb-6 uppercase text-xs tracking-widest text-slate-400">Performance</h3>
                <div className="space-y-6">
                  <MetricItem 
                    label="Traitées" 
                    value="1,284" 
                    sub="Demandes au total" 
                    trend="+12%" 
                    icon={<BadgeCheck className="text-primary" />} 
                  />
                  <MetricItem 
                    label="Temps Moyen" 
                    value="4.2m" 
                    sub="Par demande" 
                    trend="-0.5m" 
                    icon={<Clock className="text-primary" />} 
                    isNegativeTrend
                  />
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-slate-700">Charge actuelle</p>
                    <p className="text-sm font-bold text-primary">82%</p>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
              <Activity className="absolute -right-4 -bottom-4 size-32 opacity-10 rotate-12" />
              <h4 className="font-black text-lg mb-6 tracking-tight">Efficacité Mensuelle</h4>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <Bar dataKey="val" fill="rgba(255,255,255,0.4)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-blue-100 mt-4 leading-relaxed font-medium">
                Cet agent a dépassé ses objectifs mensuels de productivité de 15%.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="font-bold text-slate-800">{value}</p>
  </div>
);

const ActivityLine = ({ log }) => (
  <div className="p-5 flex gap-4 items-start hover:bg-slate-50 transition-colors">
    <div className="size-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
      <Activity size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-slate-800 leading-tight">{log.description}</p>
      <p className="text-xs text-slate-500 mt-0.5">{log.action} • {log.auteurIp}</p>
      <p className="text-[10px] text-slate-400 mt-2 font-black uppercase tracking-tighter">
        {new Date(log.timestamp).toLocaleString()}
      </p>
    </div>
  </div>
);

const MetricItem = ({ label, value, sub, trend, icon, isNegativeTrend }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">{sub}</p>
      </div>
    </div>
    <div className={`text-xs font-black flex items-center gap-0.5 ${isNegativeTrend ? 'text-green-600' : 'text-green-500'}`}>
      {isNegativeTrend ? <TrendingDown size={14} /> : <TrendingUp size={14} />} {trend}
    </div>
  </div>
);

export default AdminDetailAgentPage;
