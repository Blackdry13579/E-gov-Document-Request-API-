import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import adminService from '../../services/adminService';
import { 
  Building2, Info, Save, X, 
  ChevronRight, LayoutGrid, FileText,
  CheckCircle2, AlertCircle
} from 'lucide-react';

const AdminAjouterServicePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nom: '',
    code: '', // Generating a code from name likely
    categorie: '',
    institution: '',
    description: '',
    actif: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.nom || !formData.categorie || !formData.institution) {
        alert("Veuillez remplir les informations obligatoires (Nom, Catégorie, Institution).");
        return;
      }

      // Generate a code if not present (simple slug)
      const serviceData = {
        ...formData,
        code: formData.nom.toUpperCase().replace(/\s+/g, '_').substring(0, 10) + Math.floor(Math.random() * 100)
      };

      const result = await adminService.createService(serviceData);
      if (result.success) {
        navigate('/admin/systeme');
      } else {
        alert(result.message || "Erreur lors de la création du service.");
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        <header className="mb-10">
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
             <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/admin/dashboard')}>Système</span>
             <ChevronRight size={12} />
             <span className="text-primary">Ajouter un Service</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Ajouter un Nouveau Service</h1>
          <p className="text-slate-500 font-medium">Configurez un nouveau point d'entrée administratif pour les citoyens burkinabè.</p>
        </header>

        <Card className="p-0 overflow-hidden border-slate-200">
          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Service Name */}
                <div className="md:col-span-2">
                  <Input 
                    label="Nom du Service"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Ex: Demande de Certificat de Nationalité"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Catégorie</label>
                  <select 
                    name="categorie"
                    value={formData.categorie}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="ID">Identité & Citoyenneté</option>
                    <option value="EC">État Civil</option>
                    <option value="JU">Justice</option>
                    <option value="SA">Santé</option>
                    <option value="ED">Éducation</option>
                    <option value="TX">Impôts & Taxes</option>
                  </select>
                </div>

                {/* Responsible Institution */}
                <Input 
                  label="Ministère / Institution Responsable"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Ex: Ministère de la Justice"
                  required
                />

                {/* Description */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Description du Service</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                    placeholder="Décrivez brièvement le but du service et les documents requis..."
                    rows="4"
                  />
                </div>

                {/* Status Toggle */}
                <div className="md:col-span-2">
                  <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">Statut du Service</span>
                      <span className="text-xs text-slate-500">Activer ou désactiver immédiatement la visibilité du service</span>
                    </div>
                    <div className="relative inline-flex items-center">
                      <input 
                        type="checkbox" 
                        name="actif"
                        checked={formData.actif}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Info Note */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <Info size={18} className="text-primary mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-primary">Note :</span> Une fois créé, le service sera soumis à une validation technique avant d'être publié sur le portail public citoyen.
                </p>
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <Button variant="ghost" className="px-8" onClick={() => navigate('/admin/systeme')}>Annuler</Button>
              <Button type="submit" loading={loading} className="px-10 flex items-center gap-2">
                <Save size={18} /> Créer le Service
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminAjouterServicePage;
