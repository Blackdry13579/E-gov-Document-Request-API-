import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import adminService from '../../services/adminService';
import { 
  User, Mail, Phone, Building2, Key, Shield, 
  Camera, Save, X, RefreshCw, CheckCircle2,
  Briefcase, Fingerprint, Lock
} from 'lucide-react';

const AdminAjouterAgentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    serviceId: '',
    subService: '',
    role: '',
    grade: '',
    matricule: '',
    password: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, rolesRes] = await Promise.all([
          adminService.getAllServices(),
          adminService.getAllRoles()
        ]);
        if (servicesRes.success) setServices(servicesRes.data);
        if (rolesRes.success) setRoles(rolesRes.data);
      } catch (err) {
        console.error("Erreur lors du chargement des données initiales:", err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
    let pass = "";
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password: pass }));
    setGeneratedPassword(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Basic validation
      if (!formData.email || !formData.nom || !formData.matricule || !formData.password) {
          alert("Veuillez remplir tous les champs obligatoires.");
          return;
      }

      const result = await adminService.createAgent({
        ...formData,
        role: formData.role || 'AGENT' // Default to AGENT if not selected
      });

      if (result.success) {
        setShowSuccessModal(true);
      } else {
        alert(result.message || "Erreur lors de la création de l'agent.");
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/admin/ressources');
  };

  if (initialLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-5xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/admin/dashboard')}>Accueil</span>
              <span>/</span>
              <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/admin/ressources')}>Agents</span>
              <span>/</span>
              <span className="text-primary">Nouveau</span>
            </nav>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ajouter un Nouvel Agent</h1>
            <p className="text-slate-500 font-medium">Créez un compte sécurisé pour un agent de l'administration publique.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
            <Shield size={16} className="text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-wider">Portail Sécurisé</span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Informations Personnelles */}
          <Card className="p-0 overflow-hidden border-slate-200">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <User size={18} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">1. Informations Personnelles</h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="relative group">
                  <div className="size-24 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300 group-hover:border-primary transition-colors cursor-pointer">
                    <Camera size={32} className="text-slate-400 group-hover:text-primary" />
                  </div>
                  <button type="button" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                    <RefreshCw size={14} />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Photo de profil</p>
                  <p className="text-xs text-slate-500 font-medium">PNG, JPG jusqu'à 2MB. Format carré recommandé.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <Input 
                  label="Prénom" 
                  name="prenom" 
                  value={formData.prenom} 
                  onChange={handleChange} 
                  placeholder="Ex: Moussa" 
                  required
                />
                <Input 
                  label="Nom de famille" 
                  name="nom" 
                  value={formData.nom} 
                  onChange={handleChange} 
                  placeholder="Ex: Ouédraogo" 
                  required
                />
              </div>

              <Input 
                label="Email professionnel" 
                name="email" 
                type="email"
                value={formData.email} 
                onChange={handleChange} 
                placeholder="m.ouedraogo@egov.bf" 
                icon="mail"
                required
              />

              <Input 
                label="Téléphone" 
                name="telephone" 
                value={formData.telephone} 
                onChange={handleChange} 
                placeholder="70 00 00 00" 
                icon="phone"
              />
            </div>
          </Card>

          {/* Section 2: Affectation Administrative */}
          <Card className="p-0 overflow-hidden border-slate-200">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Building2 size={18} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">2. Affectation Administrative</h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">Ministère / Institution</label>
                <select 
                  name="serviceId" 
                  value={formData.serviceId} 
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm transition-all focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none"
                  required
                >
                  <option value="">Sélectionner une institution</option>
                  {services.map(s => <option key={s._id} value={s._id}>{s.nom}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">Service / Département</label>
                <select 
                  name="subService" 
                  value={formData.subService} 
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm transition-all focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none"
                >
                  <option value="">Sélectionner un service</option>
                  <option value="direction">Direction Générale</option>
                  <option value="accueil">Unité d'Accueil</option>
                  <option value="technique">Service Technique</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">Rôle d'accès</label>
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm transition-all focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none"
                  required
                >
                  <option value="">Sélectionner un rôle</option>
                  {roles.map(r => <option key={r._id} value={r.nom}>{r.nom}</option>)}
                  <option value="AGENT">Agent Standard</option>
                  <option value="SUPERVISEUR">Superviseur</option>
                </select>
              </div>

              <Input 
                label="Grade / Fonction" 
                name="grade" 
                value={formData.grade} 
                onChange={handleChange} 
                placeholder="Ex: Inspecteur principal" 
                icon="work"
              />
            </div>
          </Card>

          {/* Section 3: Identifiants */}
          <Card className="p-0 overflow-hidden border-slate-200">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Key size={18} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">3. Identifiants de connexion</h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input 
                label="Matricule" 
                name="matricule" 
                value={formData.matricule} 
                onChange={handleChange} 
                placeholder="Ex: AG-74829-BF" 
                icon="fingerprint"
                required
              />

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">Mot de passe temporaire</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="text" 
                    name="password"
                    value={formData.password}
                    readOnly
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-24 py-2.5 text-sm font-mono text-slate-600 outline-none cursor-default"
                  />
                  <button 
                    type="button" 
                    onClick={generatePassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-lg hover:bg-primary/20 transition-all"
                  >
                    Générer
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight ml-1">Le mot de passe sera envoyé par email sécurisé.</p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 pb-12">
            <Button 
              variant="ghost" 
              className="px-8" 
              onClick={() => navigate('/admin/ressources')}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              loading={loading}
              className="px-10 flex items-center gap-2"
            >
              <Save size={18} /> Créer le compte
            </Button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <Card className="w-full max-w-md p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Agent Créé avec Succès !</h2>
            <p className="text-slate-500 mb-6">Le compte a été configuré. Voici les identifiants temporaires :</p>
            
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Identifiant</span>
                <span className="font-mono font-bold text-slate-800">{formData.matricule}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Mot de passe</span>
                <span className="font-mono font-bold text-primary bg-primary/5 px-2 py-1 rounded">{generatedPassword}</span>
              </div>
            </div>

            <Button onClick={handleCloseModal} className="w-full py-4 text-lg">
              Terminer & fermer
            </Button>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default AdminAjouterAgentPage;
