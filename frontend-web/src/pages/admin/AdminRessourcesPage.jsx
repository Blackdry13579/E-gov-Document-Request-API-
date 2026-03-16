import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';
import { 
  Users, FileText, Plus, Search, 
  MoreVertical, Edit2, Shield, Trash2,
  CheckCircle, XCircle, UserPlus, FilePlus
} from 'lucide-react';

const AdminRessourcesPage = () => {
  const [activeTab, setActiveTab] = useState('agents');
  const [agents, setAgents] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'agents') {
        const res = await adminService.getAllUsers({ role: 'AGENT' });
        if (res.success) setAgents(res.data);
      } else {
        const res = await adminService.getAllDocuments();
        if (res.success) setDocuments(res.data);
      }
    } catch (err) {
      setError("Erreur lors de la récupération des ressources.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAgent = async (id) => {
    try {
      const res = await adminService.toggleUserStatus(id);
      if (res.success) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleDocument = async (id) => {
    try {
      const res = await adminService.toggleDocument(id);
      if (res.success) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container flex min-h-screen bg-slate-50">
      <Sidebar activePage="ressources" />
      
      <main className="main-content flex-1 ml-72 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestion des Ressources</h1>
          <p className="text-slate-500 font-medium">Administration centrale des agents de l'État et du catalogue documentaire.</p>
        </header>

        {/* Tabs Navigation */}
        <div className="flex border-b border-slate-200 gap-8 mb-8">
          <button 
            onClick={() => setActiveTab('agents')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${
              activeTab === 'agents' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Users size={18} /> Gestion des Agents
          </button>
          <button 
            onClick={() => setActiveTab('documents')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${
              activeTab === 'documents' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileText size={18} /> Catalogue Documentaire
          </button>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              {activeTab === 'agents' ? <Users className="text-primary" /> : <FileText className="text-primary" />}
              {activeTab === 'agents' ? 'Répertoire des Agents' : 'Tous les Documents Officiels'}
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-md">
              {activeTab === 'agents' ? <UserPlus size={16} /> : <FilePlus size={16} />}
              {activeTab === 'agents' ? 'Nouvel Agent' : 'Nouveau Type de Document'}
            </button>
          </div>

          <div className="p-4 border-b border-slate-100 bg-white">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder={`Rechercher un ${activeTab === 'agents' ? 'agent' : 'document'}...`}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm shadow-inner"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {activeTab === 'agents' ? "Nom de l'Agent" : "Nom du Document"}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {activeTab === 'agents' ? "Service" : "Code / Référence"}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {activeTab === 'agents' ? "Email / Tel" : "Tarif (FCFA)"}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-12 text-slate-400">Chargement des données...</td></tr>
                ) : (
                  activeTab === 'agents' ? (
                    agents.length > 0 ? agents.map(agent => (
                      <tr key={agent._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                              {agent.nom[0]}
                            </div>
                            <span className="font-bold text-slate-800">{agent.prenom} {agent.nom}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{agent.serviceId?.nom || 'Non assigné'}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                          <div>{agent.email}</div>
                          <div>{agent.telephone}</div>
                        </td>
                        <td className="px-6 py-4">
                          {agent.isActive ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full flex items-center w-fit gap-1">
                              <CheckCircle size={10} /> Actif
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded-full flex items-center w-fit gap-1">
                              <XCircle size={10} /> Suspendu
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleToggleAgent(agent._id)}
                            className={`p-2 rounded-lg transition-colors ${agent.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                            title={agent.isActive ? "Suspendre" : "Activer"}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    )) : <tr><td colSpan="5" className="text-center py-12 text-slate-400">Aucun agent trouvé.</td></tr>
                  ) : (
                    documents.length > 0 ? documents.map(doc => (
                      <tr key={doc._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-800">{doc.nom}</td>
                        <td className="px-6 py-4">
                          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono">{doc.code}</span>
                        </td>
                        <td className="px-6 py-4 font-black text-sm text-primary">{doc.prix?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4">
                          {doc.actif ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full w-fit">Disponible</span>
                          ) : (
                            <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded-full w-fit">Indisponible</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors">
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => handleToggleDocument(doc._id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : <tr><td colSpan="5" className="text-center py-12 text-slate-400">Aucun document trouvé.</td></tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ResourceSummary 
            title={activeTab === 'agents' ? "Total Agents" : "Types de Documents"} 
            value={activeTab === 'agents' ? agents.length : documents.length} 
            icon={activeTab === 'agents' ? <Users /> : <FileText />} 
            color="primary"
          />
          <ResourceSummary 
            title={activeTab === 'agents' ? "Agents Actifs" : "Docs Disponibles"} 
            value={activeTab === 'agents' ? agents.filter(a => a.isActive).length : documents.filter(d => d.actif).length} 
            icon={<CheckCircle />} 
            color="green"
          />
          <ResourceSummary 
            title="Dernière Mise à Jour" 
            value={new Date().toLocaleDateString()} 
            icon={<Shield />} 
            color="orange"
          />
        </div>
      </main>
    </div>
  );
};

const ResourceSummary = ({ title, value, icon, color }) => {
  const colors = {
    primary: 'bg-primary text-white border-primary shadow-primary/20',
    green: 'bg-white text-slate-900 border-slate-200 shadow-sm',
    orange: 'bg-white text-slate-900 border-slate-200 shadow-sm',
  };

  return (
    <div className={`p-6 rounded-2xl border flex items-center justify-between shadow-lg transition-transform hover:scale-[1.02] ${colors[color]}`}>
      <div>
        <p className={`text-[10px] uppercase font-black tracking-widest mb-1 ${color === 'primary' ? 'opacity-80' : 'text-slate-500'}`}>
          {title}
        </p>
        <h5 className="text-2xl font-black">{value}</h5>
      </div>
      <div className={`${color === 'primary' ? 'opacity-30' : 'text-primary/20'}`}>
        {React.cloneElement(icon, { size: 40 })}
      </div>
    </div>
  );
};

export default AdminRessourcesPage;
