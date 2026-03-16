import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';
import { 
  Search, Filter, Calendar, Download, 
  ChevronLeft, ChevronRight, RefreshCw,
  ShieldCheck, AlertTriangle, Info,
  User, Database, Globe
} from 'lucide-react';

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    query: '',
    type: '',
    module: ''
  });

  useEffect(() => {
    fetchLogs();
  }, [page, filters]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await adminService.getLogs({ page, ...filters });
      if (res.success) {
        setLogs(res.data.logs || []);
        setTotal(res.data.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container flex min-h-screen bg-slate-50">
      <Sidebar activePage="logs" />
      
      <main className="main-content flex-1 ml-72 p-8 flex flex-col">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-end gap-6 mb-4">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">Journaux d'Audit</h2>
              <p className="text-lg text-slate-500 font-medium tracking-tight">Trabilité complète des actions effectuées sur le système E-Gov.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">
                <Download size={18} /> Exporter CSV
              </button>
              <button onClick={fetchLogs} className="p-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-800 transition-all">
                <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
        </header>

        {/* Filters bar */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Rechercher par utilisateur, action ou IP..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
                value={filters.query}
                onChange={(e) => setFilters({...filters, query: e.target.value})}
              />
            </div>
            <div className="flex gap-3">
              <FilterSelect label="Module" icon={<Database size={14} />} />
              <FilterSelect label="Utilisateur" icon={<User size={14} />} />
              <FilterSelect label="Période" icon={<Calendar size={14} />} />
            </div>
          </div>
        </section>

        {/* Logs Table */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col mb-8">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Horodatage</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Utilisateur</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Module</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Source</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Résultat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  Array(8).fill(0).map((_, i) => <SkeletonRow key={i} />)
                ) : logs.length > 0 ? logs.map(log => (
                  <tr key={log._id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-5 text-xs font-bold text-slate-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('fr-FR')}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center font-black text-[10px]">
                          {log.user?.nom?.[0] || 'S'}{log.user?.prenom?.[0] || 'Y'}
                        </div>
                        <span className="text-sm font-black text-slate-800">{log.user?.email || "Système"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-slate-600 italic">
                      {log.action}
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-500 tracking-wider">
                        {log.module}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-xs font-mono text-slate-400 flex items-center gap-2">
                       <Globe size={12} /> {log.ip || "Local"}
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge success={log.status === 'success'} />
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="6" className="p-20 text-center text-slate-400 italic font-medium">Aucun log trouvé pour cette recherche.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Page <span className="text-primary">{page}</span> sur {Math.ceil(total/10) || 1}
            </span>
            <div className="flex gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="size-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-50"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                disabled={logs.length < 10}
                onClick={() => setPage(page + 1)}
                className="size-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatusBadge = ({ success }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
    success ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
  }`}>
    {success ? <ShieldCheck size={14} /> : <AlertTriangle size={14} />}
    {success ? 'Succès' : 'Échec'}
  </span>
);

const FilterSelect = ({ label, icon }) => (
  <button className="flex items-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors text-xs font-black uppercase tracking-widest border border-transparent hover:border-slate-200">
    {icon} <span>{label}</span>
  </button>
);

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-5"><div className="h-4 w-32 bg-slate-100 rounded"></div></td>
    <td className="px-6 py-5"><div className="flex items-center gap-3"><div className="size-8 rounded-lg bg-slate-100"></div><div className="h-4 w-24 bg-slate-100 rounded"></div></div></td>
    <td className="px-6 py-5"><div className="h-4 w-40 bg-slate-100 rounded"></div></td>
    <td className="px-6 py-5"><div className="h-5 w-16 bg-slate-100 rounded-full"></div></td>
    <td className="px-6 py-5"><div className="h-4 w-20 bg-slate-100 rounded"></div></td>
    <td className="px-6 py-5"><div className="h-6 w-20 bg-slate-100 rounded-lg"></div></td>
  </tr>
);

export default AdminLogsPage;
