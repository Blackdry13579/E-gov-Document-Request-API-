import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';
import adminService from '../../services/adminService';
import { 
  FileText, Building2, CreditCard, Clock, 
  Globe, Smartphone, Edit3, Plus, Trash2,
  Save, X, Info, ChevronRight, CheckCircle2,
  FileCheck, Shield
} from 'lucide-react';

const AdminAjouterDocumentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [newAttachment, setNewAttachment] = useState('');
  
  const [formData, setFormData] = useState({
    nom: '',
    service: '',
    code: '',
    prix: 0,
    delai: '72h',
    modeDelivrance: 'online',
    piecesRequired: ['Copie CNIB', 'Extrait de naissance'],
    isPublic: true,
    mobilePayment: true,
    eSignature: false,
    description: ''
  });

  useEffect(() => {
    const fetchServices = async () => {
      const res = await adminService.getAllServices();
      if (res.success) setServices(res.data);
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }));
  };

  const addAttachment = () => {
    if (newAttachment.trim()) {
      setFormData(prev => ({
        ...prev,
        piecesRequired: [...prev.piecesRequired, newAttachment.trim()]
      }));
      setNewAttachment('');
    }
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      piecesRequired: prev.piecesRequired.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.nom || !formData.service || !formData.code) {
          alert("Veuillez remplir les informations obligatoires (Nom, Service, Code).");
          return;
      }

      const result = await adminService.createDocument(formData);
      if (result.success) {
        navigate('/admin/ressources');
      } else {
        alert(result.message || "Erreur lors de la création du document.");
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
      <div className="p-8">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-amber-500 pl-6">
          <div>
            <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
               <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/admin/dashboard')}>Système</span>
               <ChevronRight size={12} />
               <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/admin/ressources')}>Documents</span>
               <ChevronRight size={12} />
               <span className="text-primary">Configuration</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">Configuration de Document</h1>
            <p className="text-slate-500 font-medium">Définissez les paramètres légaux et administratifs pour une nouvelle prestation e-gov.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-100 uppercase tracking-wider">
            <Shield size={14} /> Accès Administrateur
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Side */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-0 overflow-hidden border-slate-200">
              <form onSubmit={handleSubmit}>
                <div className="p-8 space-y-8">
                  {/* Section 1: General */}
                  <div className="space-y-6">
                    <h3 className="text-primary text-lg font-bold flex items-center gap-2">
                       <FileText size={20} /> Informations Générales
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input 
                        label="Nom officiel du document"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Ex: Certificat de Nationalité Burkinabè"
                        required
                      />
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700 ml-1">Service Associé</label>
                        <select 
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                          required
                        >
                          <option value="">Sélectionner un service</option>
                          {services.map(s => <option key={s._id} value={s.code}>{s.nom}</option>)}
                        </select>
                      </div>
                      <Input 
                        label="Code de référence (Identifiant unique)"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="Ex: DOC-CNB-2026"
                        required
                      />
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700 ml-1">Délai de délivrance</label>
                        <select 
                          name="delai"
                          value={formData.delai}
                          onChange={handleChange}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                        >
                          <option value="24h">24 Heures</option>
                          <option value="48h">48 Heures</option>
                          <option value="72h">72 Heures</option>
                          <option value="7j">7 Jours Ouvrés</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Section 2: Tarifs & Delivrance */}
                  <div className="space-y-6">
                    <h3 className="text-primary text-lg font-bold flex items-center gap-2">
                       <CreditCard size={20} /> Modalités & Tarifs
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input 
                        label="Coût de la prestation (FCFA)"
                        name="prix"
                        type="number"
                        value={formData.prix}
                        onChange={handleChange}
                        placeholder="0"
                        icon="payments"
                      />
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700 ml-1">Mode de délivrance</label>
                        <select 
                          name="modeDelivrance"
                          value={formData.modeDelivrance}
                          onChange={handleChange}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                        >
                          <option value="online">100% Digital (En ligne)</option>
                          <option value="semi">Semi-ligne (Dépôt en ligne / Retrait physique)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Section 3: Pièces Jointes */}
                  <div className="space-y-6">
                    <h3 className="text-primary text-lg font-bold flex items-center gap-2">
                       <Plus size={20} /> Pièces justificatives requises
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Ajouter un intitulé de pièce (ex: Copie CNIB...)"
                          value={newAttachment}
                          onChange={(e) => setNewAttachment(e.target.value)}
                        />
                        <Button onClick={addAttachment} className="shrink-0 aspect-square p-0 w-12 flex items-center justify-center">
                          <Plus size={20} />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.piecesRequired.map((piece, idx) => (
                          <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600">
                             <FileCheck size={14} className="text-primary" />
                             <span>{piece}</span>
                             <button type="button" onClick={() => removeAttachment(idx)} className="text-slate-400 hover:text-red-500">
                               <Trash2 size={14} />
                             </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Section 4: Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Toggle name="isPublic" label="Visibilité Publique" value={formData.isPublic} onChange={handleChange} />
                    <Toggle name="mobilePayment" label="Paiement Mobile" value={formData.mobilePayment} onChange={handleChange} />
                    <Toggle name="eSignature" label="Signature Électronique" value={formData.eSignature} onChange={handleChange} />
                  </div>
                </div>

                <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                   <Button variant="ghost" className="px-8" onClick={() => navigate('/admin/ressources')}>Annuler</Button>
                   <Button type="submit" loading={loading} className="px-10 flex items-center gap-2">
                     <Save size={18} /> Enregistrer le document
                   </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Preview Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Globe size={16} /> Aperçu Citoyen (Live)
              </h4>
              <Card className="border-none shadow-2xl p-0 overflow-hidden bg-white">
                <div className="p-6 bg-primary text-white space-y-4">
                   <div className="size-12 rounded-2xl bg-white/20 flex items-center justify-center">
                      <FileText size={28} />
                   </div>
                   <div>
                      <h5 className="text-xl font-black leading-tight">{formData.nom || "Nom du document"}</h5>
                      <p className="text-white/60 text-xs font-bold uppercase tracking-wider">{formData.service || "Code Service"}</p>
                   </div>
                </div>
                <div className="p-6 space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <PreviewStat label="Prix" value={`${formData.prix?.toLocaleString() || 0} FCFA`} icon={<CreditCard size={14} />} />
                      <PreviewStat label="Délai" value={formData.delai} icon={<Clock size={14} />} />
                   </div>
                   
                   <div>
                     <p className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Pièces à fournir</p>
                     <ul className="space-y-2">
                        {formData.piecesRequired.length > 0 ? formData.piecesRequired.map((p, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                             <CheckCircle2 size={12} className="text-green-500" /> {p}
                          </li>
                        )) : <li className="text-xs italic text-slate-400">Aucune pièce configurée</li>}
                     </ul>
                   </div>

                   <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                      {formData.mobilePayment && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-700 rounded text-[9px] font-black uppercase">
                           <Smartphone size={10} /> Mobile Pay
                        </div>
                      )}
                      {formData.eSignature && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 rounded text-[9px] font-black uppercase">
                           <Edit3 size={10} /> Signature E.
                        </div>
                      )}
                   </div>
                   
                   <Button variant="primary" className="w-full py-3 text-xs font-black shadow-none pointer-events-none">
                     Commencer la demande
                   </Button>
                </div>
              </Card>
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                 <Info size={16} className="text-primary mt-0.5" />
                 <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                   Cet aperçu correspond à l'affichage du document dans le catalogue public pour les citoyens. 
                   Vérifiez bien les tarifs et les délais avant l'enregistrement.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Toggle = ({ name, label, value, onChange }) => (
  <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100/50 transition-colors">
    <span className="text-xs font-bold text-slate-700">{label}</span>
    <div className="relative inline-flex items-center">
      <input 
        type="checkbox" 
        name={name}
        checked={value}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
    </div>
  </label>
);

const PreviewStat = ({ label, value, icon }) => (
  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
       {icon} <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-xs font-black text-slate-800">{value}</p>
  </div>
);

export default AdminAjouterDocumentPage;
