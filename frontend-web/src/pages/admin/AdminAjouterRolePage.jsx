import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import adminService from '../../services/adminService';
import { 
  ShieldCheck, Info, Lock, Save, X, 
  ChevronRight, Building2, Eye, Edit3, 
  CheckCircle2, Trash2, Shield
} from 'lucide-react';

const AdminAjouterRolePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  
  const [formData, setFormData] = useState({
    nom: '',
    serviceId: '',
    description: '',
    permissions: {
      etat_civil: { read: true, write: false, validate: false, delete: false },
      identite: { read: false, write: false, validate: false, delete: false },
      fiscalite: { read: false, write: false, validate: false, delete: false },
      users: { read: false, write: false, validate: false, delete: false }
    }
  });

  useEffect(() => {
    const fetchServices = async () => {
      const res = await adminService.getAllServices();
      if (res.success) setServices(res.data);
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (module, permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [permission]: !prev.permissions[module][permission]
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.nom || !formData.serviceId) {
        alert("Veuillez remplir les informations obligatoires (Nom du rôle, Département).");
        return;
      }

      const result = await adminService.createRole(formData);
      if (result.success) {
        navigate('/admin/systeme');
      } else {
        alert(result.message || "Erreur lors de la création du rôle.");
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const modules = [
    { key: 'etat_civil', label: 'État Civil', desc: 'Actes de naissance, mariage, décès' },
    { key: 'identite', label: 'Identité Nationale', desc: 'CNIB, Passeports, Cartes consulaires' },
    { key: 'fiscalite', label: 'Fiscalité & Taxes', desc: 'Paiements en ligne, déclarations' },
    { key: 'users', label: 'Gestion des Utilisateurs', desc: 'Création de comptes agents' }
  ];

  return (
    <Layout>
      <div className="p-8 max-w-5xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
               <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/admin/dashboard')}>Accueil</span>
               <ChevronRight size={12} />
               <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/admin/systeme')}>Système</span>
               <ChevronRight size={12} />
               <span className="text-primary">Ajouter un Rôle</span>
            </nav>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Ajouter un Nouveau Rôle</h1>
            <p className="text-slate-500 font-medium">Définissez les privilèges et les limites d'accès pour les agents de l'administration publique.</p>
          </div>
          <Button type="submit" form="role-form" loading={loading} className="px-8 shadow-xl shadow-primary/20">
            Enregistrer le Rôle
          </Button>
        </header>

        <form id="role-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: General Info */}
          <Card className="p-0 overflow-hidden border-slate-200">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Info size={18} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">1. Informations Générales</h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input 
                label="Nom du Rôle"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="ex: Agent Mairie, Superviseur DSI"
                required
              />
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">Département (Service)</label>
                <select 
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                  required
                >
                  <option value="">Sélectionner un service</option>
                  {services.map(s => <option key={s._id} value={s._id}>{s.nom}</option>)}
                </select>
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">Description du Rôle</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                  placeholder="Décrivez brièvement les responsabilités liées à ce rôle..."
                  rows="3"
                />
              </div>
            </div>
          </Card>

          {/* Section 2: Matrix */}
          <Card className="p-0 overflow-hidden border-slate-200">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Lock size={18} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">2. Matrice des Permissions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Module Système</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Lecture</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Écriture</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Validation</th>
                    <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Suppression</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {modules.map(mod => (
                    <tr key={mod.key} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-bold text-slate-800">{mod.label}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{mod.desc}</p>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <PermissionCheck 
                          checked={formData.permissions[mod.key].read} 
                          onChange={() => handlePermissionChange(mod.key, 'read')} 
                        />
                      </td>
                      <td className="px-4 py-5 text-center">
                        <PermissionCheck 
                          checked={formData.permissions[mod.key].write} 
                          onChange={() => handlePermissionChange(mod.key, 'write')} 
                        />
                      </td>
                      <td className="px-4 py-5 text-center">
                        <PermissionCheck 
                          checked={formData.permissions[mod.key].validate} 
                          onChange={() => handlePermissionChange(mod.key, 'validate')} 
                        />
                      </td>
                      <td className="px-4 py-5 text-center">
                        <PermissionCheck 
                          checked={formData.permissions[mod.key].delete} 
                          onChange={() => handlePermissionChange(mod.key, 'delete')} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <footer className="flex items-center justify-end gap-4 pb-12">
            <Button variant="ghost" className="px-8" onClick={() => navigate('/admin/systeme')}>Annuler</Button>
            <Button type="submit" loading={loading} className="px-10">Créer le Rôle</Button>
          </footer>
        </form>
      </div>
    </Layout>
  );
};

const PermissionCheck = ({ checked, onChange }) => (
  <button 
    type="button"
    onClick={onChange}
    className={`size-6 rounded-lg border-2 flex items-center justify-center transition-all ${
      checked ? 'bg-primary border-primary text-white shadow-md' : 'bg-white border-slate-200 text-transparent hover:border-primary/40'
    }`}
  >
    <CheckCircle2 size={16} strokeWidth={3} />
  </button>
);

export default AdminAjouterRolePage;
