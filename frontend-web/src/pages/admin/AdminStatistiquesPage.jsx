import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, FileText, TrendingUp, Clock, 
  Download, RefreshCw, Filter, Calendar,
  ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';

const COLORS = ['#003366', '#ec5b13', '#10b981', '#f59e0b', '#6366f1'];

const AdminStatistiquesPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await adminService.getStats();
      if (res.success) setStats(res.data);
    } catch (err) {
      setError("Erreur lors de la récupération des statistiques.");
    } finally {
      setLoading(false);
    }
  };

  const lineData = [
    { name: 'Lun', val: 40 },
    { name: 'Mar', val: 30 },
    { name: 'Mer', val: 65 },
    { name: 'Jeu', val: 45 },
    { name: 'Ven', val: 90 },
    { name: 'Sam', val: 20 },
    { name: 'Dim', val: 15 },
  ];

  const pieData = [
    { name: 'Mairie', value: 400 },
    { name: 'Police', value: 300 },
    { name: 'Justice', value: 200 },
    { name: 'Impôts', value: 100 },
  ];

  if (loading) return <div className="flex items-center justify-center h-screen">Chargement...</div>;

  return (
    <div className="app-container flex min-h-screen bg-slate-50">
      <Sidebar activePage="statistiques" />
      
      <main className="main-content flex-1 ml-72 p-8">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-end gap-6 mb-8">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Statistiques Avancées</h2>
            <p className="text-lg text-slate-500 font-medium">Analyse globale de la performance et de l'utilisation de la plateforme.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50">
              <Download size={18} /> Exporter PDF
            </button>
            <button onClick={fetchStats} className="p-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-800 transition-all">
              <RefreshCw size={20} />
            </button>
          </div>
        </header>

        {/* Filters bar */}
        <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-sm font-bold text-slate-600">
            <Calendar size={16} /> <span>Derniers 30 jours</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-sm font-bold text-slate-600">
            <Filter size={16} /> <span>Tous les départements</span>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest cursor-pointer hover:underline">
            <Activity size={14} /> Voir les logs en direct
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Citoyens Inscrits" 
            value={stats?.totalUsers || 0} 
            trend="+12%" 
            isUp={true} 
            icon={<Users className="text-blue-600" />}
          />
          <StatCard 
            title="Demandes Totales" 
            value={stats?.totalDemands || 0} 
            trend="+5.4%" 
            isUp={true} 
            icon={<FileText className="text-orange-600" />}
          />
          <StatCard 
            title="Taux de Complétion" 
            value="89%" 
            trend="-1.2%" 
            isUp={false} 
            icon={<TrendingUp className="text-green-600" />}
          />
          <StatCard 
            title="Temps de Traitement" 
            value="2.4j" 
            trend="-0.5j" 
            isUp={true} 
            icon={<Clock className="text-purple-600" />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-wide">Évolution des demandes</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#003366" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#003366" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="val" stroke="#003366" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-wide">Répartition / Service</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-sm font-bold text-slate-600">{d.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900 px-2 py-0.5 bg-slate-50 rounded italic">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, trend, isUp, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-primary/20 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div className={`flex items-center gap-1 text-xs font-black ${isUp ? 'text-green-500' : 'text-red-500'}`}>
        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </div>
    </div>
    <div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-3xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

export default AdminStatistiquesPage;
