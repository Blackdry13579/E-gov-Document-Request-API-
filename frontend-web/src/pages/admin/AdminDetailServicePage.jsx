import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';
import { 
  Building2, User, Mail, MapPin, 
  Edit3, Download, FolderOpen, Badge, 
  Plus, MoreVertical, FileText, Briefcase,
  ExternalLink, CheckCircle
} from 'lucide-react';

const AdminDetailServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [docs, setDocs] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServiceData();
  }, [id]);

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      const res = await adminService.getServiceById(id);
      if (res.success) {
        setService(res.data);
        // Fetch related data
        const [docsRes, agentsRes] = await Promise.all([
          adminService.getAllDocuments(),
          adminService.getAllUsers({ serviceId: id, role: 'AGENT' })
        ]);
        
        if (docsRes.success) {
          // Filter documents by service code or name
          setDocs(docsRes.data.filter(d => d.service === res.data.code));
        }
        if (agentsRes.success) setAgents(agentsRes.data);
      }
    } catch (err) {
      setError("Erreur lors de la récupération du service.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  if (!service) return <div className="flex items-center justify-center h-screen text-red-500">Service introuvable.</div>;

  return (
    <div className="app-container flex min-h-screen bg-slate-50">
      <Sidebar activePage="systeme" />
      
      <main className="main-content flex-1 ml-72 p-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-sm text-slate-500">
          <Link to="/admin/systeme" className="hover:text-primary transition-colors">Services</Link>
          <ExternalLink size={12} />
          <span className="text-primary font-bold">{service.nom}</span>
        </nav>

        {/* Hero Detail Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="size-32 rounded-2xl bg-primary/10 flex items-center justify-center p-6 border border-primary/5 shadow-inner">
              <Building2 size={64} className="text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{service.nom}</h2>
                <p className="text-lg text-slate-500 font-medium">{service.description || "Description non fournie."}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <HeroInfoBox label="Code Service" value={service.code} icon={<Badge className="text-primary" />} />
                <HeroInfoBox label="Statut" value={service.actif ? "ACTIF" : "INACTIF"} icon={<CheckCircle className={service.actif ? "text-green-500" : "text-amber-500"} />} />
                <HeroInfoBox label="Localisation" value="Ouagadougou, Zone des Ministères" icon={<MapPin className="text-primary" />} />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-48">
              <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                <Edit3 size={18} /> Modifier
              </button>
              <button className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <Download size={18} /> Exporter
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Managed Documents */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                <FolderOpen className="text-primary" size={20} /> Documents gérés
              </h3>
              <span className="text-xs font-black text-primary bg-primary/10 px-2 py-1 rounded-full">{docs.length}</span>
            </div>
            <div className="divide-y divide-slate-50">
              {docs.length > 0 ? docs.map(doc => (
                <div key={doc._id} className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileText className="text-primary/40" size={20} />
                    <div>
                      <p className="font-bold text-slate-800">{doc.nom}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{doc.code}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    doc.actif ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {doc.actif ? 'Actif' : 'Rév.'}
                  </span>
                </div>
              )) : (
                <p className="p-8 text-center text-slate-400 italic">Aucun document rattaché à ce service.</p>
              )}
            </div>
            <div className="p-4 bg-slate-50/50 text-center border-t border-slate-100">
              <button className="text-xs font-black text-primary hover:underline uppercase tracking-widest flex items-center gap-2 mx-auto">
                <Plus size={14} /> Ajouter un type de document
              </button>
            </div>
          </section>

          {/* Attached Agents */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                <User className="text-primary" size={20} /> Agents rattachés
              </h3>
              <button className="text-primary text-xs font-black hover:underline uppercase tracking-widest">Gérer l'équipe</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-3 whitespace-nowrap">Agent</th>
                    <th className="px-6 py-3 whitespace-nowrap">Poste</th>
                    <th className="px-6 py-3 whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {agents.length > 0 ? agents.map(agent => (
                    <tr key={agent._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                            {agent.nom[0]}{agent.prenom[0]}
                          </div>
                          <span className="font-bold text-slate-800 whitespace-nowrap">{agent.prenom} {agent.nom}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600 truncate max-w-[150px]">{agent.role}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-300 hover:text-primary transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="3" className="p-8 text-center text-slate-400 italic">Aucun agent pour ce service.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const HeroInfoBox = ({ label, value, icon }) => (
  <div className="flex items-center gap-3">
    <div className="size-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <div>
      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-0.5">{label}</p>
      <p className="font-black text-slate-700 leading-tight">{value}</p>
    </div>
  </div>
);

export default AdminDetailServicePage;
