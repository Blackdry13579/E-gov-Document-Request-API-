import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';
import { 
  Shield, Gavel, Users, Edit3, 
  Copy, Trash2, CheckCircle2, XCircle,
  FileText, Calendar, CreditCard, FolderShared
} from 'lucide-react';

const AdminDetailRolePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRole();
  }, [id]);

  const fetchRole = async () => {
    try {
      setLoading(true);
      const res = await adminService.getRole(id);
      if (res.success) setRole(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const permissions = [
    { module: "Actes de Naissance", icon: <FileText size={18} />, read: true, write: true, val: false },
    { module: "Gestion des Mariages", icon: <Calendar size={18} />, read: true, write: false, val: false },
    { module: "Taxes Municipales", icon: <CreditCard size={18} />, read: true, write: true, val: true },
    { module: "Données Citoyens", icon: <FolderShared size={18} />, read: true, write: false, val: false },
  ];

  if (loading) return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  if (!role) return <div className="p-8 text-center text-red-500 font-bold">Rôle non trouvé.</div>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activePage="systeme" />
      
      <main className="flex-1 ml-72 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/admin/systeme')}>Système</span>
            <span>/</span>
            <span className="text-primary">{role.nom}</span>
          </nav>

          {/* Role Header */}
          <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Shield size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900">{role.nom}</h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter bg-green-50 text-green-600 border border-green-100 mt-1">
                    Rôle Opérationnel
                  </span>
                </div>
              </div>
              <p className="text-slate-500 font-medium max-w-2xl leading-relaxed italic">
                {role.description || "Aucune description fournie pour ce rôle."}
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                <Edit3 size={18} /> Modifier le rôle
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">
                <Copy size={18} /> Dupliquer
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 text-red-600 font-bold text-sm hover:bg-red-50 rounded-xl transition-all">
                <Trash2 size={18} /> Supprimer le rôle
              </button>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Permissions Matrix */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 bg-slate-50/50 border-b border-slate-100">
                  <h3 className="font-black text-slate-800 flex items-center gap-3 uppercase tracking-widest text-sm">
                    <Gavel size={20} className="text-primary" />
                    Matrice des Permissions
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 px-6">
                  {/* Table Header */}
                  <div className="grid grid-cols-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                    <div className="col-span-2 text-left">Module / Ressource</div>
                    <div>Lecture</div>
                    <div>Écriture</div>
                    <div>Validation</div>
                  </div>
                  {/* Permission Rows */}
                  {permissions.map((p, i) => (
                    <div key={i} className="grid grid-cols-5 py-5 items-center text-sm group">
                      <div className="col-span-2 flex items-center gap-3 font-bold text-slate-700 group-hover:text-primary transition-colors">
                        <span className="text-slate-400">{p.icon}</span>
                        {p.module}
                      </div>
                      <div className="flex justify-center"><CheckIcon active={p.read} /></div>
                      <div className="flex justify-center"><CheckIcon active={p.write} /></div>
                      <div className="flex justify-center"><CheckIcon active={p.val} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Assigned Agents Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-black text-slate-800 flex items-center gap-3 uppercase tracking-widest text-sm">
                    <Users size={20} className="text-primary" />
                    Agents Assignés
                  </h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black">12 AGENTS</span>
                </div>
                <div className="p-6 space-y-4">
                  {['Ouedraogo Christophe', 'Sawadogo Karidiatou', 'Traoré Idrissa'].map((name, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-primary/20 transition-all cursor-pointer">
                      <div className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center font-black text-primary text-xs">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Mairie Centrale</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto p-4 bg-slate-50/50 border-t border-slate-100 text-center">
                  <button className="text-primary font-black uppercase text-[10px] tracking-widest hover:underline">
                    Gérer les assignations
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Metadata */}
          <div className="flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-widest pt-4">
            <p>Créé le : 14/03/2023</p>
            <p>Dernière modification : 22/10/2023</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const CheckIcon = ({ active }) => (
  active 
    ? <CheckCircle2 size={20} className="text-green-500 fill-green-50" />
    : <XCircle size={20} className="text-slate-200" />
);

export default AdminDetailRolePage;
