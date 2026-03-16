import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Activity, Users, FileText, CreditCard, 
  TrendingUp, AlertTriangle, CheckCircle, Clock 
} from 'lucide-react';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, logsRes] = await Promise.all([
        adminService.getStatsGlobales(),
        adminService.getLogs({ limit: 5 })
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (logsRes.success) setLogs(logsRes.data);
      
    } catch (err) {
      setError("Erreur lors de la récupération des données du tableau de bord.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Chargement...</div>;

  // Transform data for charts
  const statutData = stats?.demandes?.parStatut.map(s => ({
    name: s._id,
    value: s.count
  })) || [];

  const serviceData = stats?.demandes?.parService.map(s => ({
    name: s._id,
    value: s.count
  })) || [];

  const COLORS = ['#1a5275', '#22c55e', '#f97316', '#ef4444', '#8b5cf6'];

  return (
    <div className="app-container flex min-h-screen bg-slate-50">
      <Sidebar activePage="dashboard" />
      
      <main className="main-content flex-1 ml-72 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Tableau de Bord</h1>
          <p className="text-slate-500">Aperçu global de l'activité de la plateforme</p>
        </header>

        {/* Hero Card */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-48 flex items-center px-10 bg-primary text-white shadow-xl">
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
              alt="Architecture" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Bienvenue, Administrateur</h2>
            <p className="text-blue-100 max-w-lg">Supervisez les demandes nationales et gérez les ressources gouvernementales en temps réel.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Demandes" 
            value={statutData.reduce((acc, curr) => acc + curr.value, 0)} 
            icon={<FileText />} 
            trend="+12%" 
            color="blue"
          />
          <StatCard 
            title="Collecte Totale" 
            value={`${stats?.paiements?.totalCollecte?.toLocaleString()} FCFA`} 
            icon={<CreditCard />} 
            trend="+5%" 
            color="green"
          />
          <StatCard 
            title="Citoyens Inscrits" 
            value={stats?.utilisateurs?.citoyens || 0} 
            icon={<Users />} 
            trend="+18%" 
            color="purple"
          />
          <StatCard 
            title="Demandes Actives" 
            value={statutData.find(s => s.name === 'EN_COURS')?.value || 0} 
            icon={<Activity />} 
            trend="Stable" 
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Volume par Service</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="value" fill="#1a5275" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Activités Récentes</h3>
              <div className="space-y-4">
                {logs.length > 0 ? logs.map((log) => (
                  <ActivityItem key={log._id} log={log} />
                )) : (
                  <p className="text-slate-500 text-center py-4">Aucune activité récente.</p>
                )}
              </div>
              <button className="w-full mt-6 py-2 text-primary font-semibold text-sm hover:underline">
                Voir tout l'historique
              </button>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Répartition des Statuts</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statutData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Santé du Système</h3>
              <div className="space-y-4">
                <SystemStatus name="Base de données" status="Stable" color="green" />
                <SystemStatus name="Passerelle API" status="Stable" color="green" />
                <SystemStatus name="Stockage S3" status="Stable" color="green" />
              </div>
            </div>

            <div className="bg-primary p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-bold mb-2 text-lg">Support Technique</h4>
                <p className="text-sm text-blue-100 mb-4">Assistance prioritaire pour la maintenance système.</p>
                <button className="bg-white text-primary px-6 py-2.5 rounded-xl text-sm font-bold shadow-soft hover:bg-slate-50 transition-all flex items-center gap-2">
                  Ouvrir un ticket
                </button>
              </div>
              <Activity className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 rotate-12" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors[color] || colors.blue}`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <span className={`text-sm font-bold flex items-center gap-1 ${trend.startsWith('+') ? 'text-green-500' : 'text-slate-400'}`}>
          <TrendingUp size={14} /> {trend}
        </span>
      </div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
  );
};

const ActivityItem = ({ log }) => {
  const getIcon = () => {
    if (log.action.includes('USER')) return <Users className="text-primary" />;
    if (log.action.includes('DOC') || log.action.includes('DEMANDE')) return <FileText className="text-green-500" />;
    return <Activity className="text-orange-500" />;
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-slate-100 rounded-lg">
          {getIcon()}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{log.description}</p>
          <p className="text-xs text-slate-500">{log.auteurEmail} • {log.auteurRole}</p>
        </div>
      </div>
      <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
        <Clock size={12} /> {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};

const SystemStatus = ({ name, status, color }) => (
  <div className="flex items-center justify-between p-1">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full bg-${color}-500 animate-pulse`}></div>
      <span className="text-sm font-medium text-slate-700">{name}</span>
    </div>
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-${color}-50 text-${color}-600`}>
      {status}
    </span>
  </div>
);

export default AdminDashboardPage;
