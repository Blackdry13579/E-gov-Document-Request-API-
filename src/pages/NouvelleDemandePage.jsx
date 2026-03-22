import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import DynamicForm from '../components/DynamicForm';
import { documentService } from '../services/documentService';
import { demandeService } from '../services/demandeService';
import { useNotif } from '../context/NotifContext';

const NouvelleDemandePage = () => {
 const [docTypes, setDocTypes] = useState([]);
 const [selectedDoc, setSelectedDoc] = useState(null);
 const [loading, setLoading] = useState(false);
 const [fetchingTypes, setFetchingTypes] = useState(true);
 const { addNotif } = useNotif();
 const navigate = useNavigate();

 useEffect(() => {
 const fetchTypes = async () => {
 setFetchingTypes(true);
 const result = await documentService.getAllTypes();
 if (result.success) {
 setDocTypes(result.data || []);
 }
 setFetchingTypes(false);
 };
 fetchTypes();
 }, []);

 const handleDocSelect = (doc) => {
 setSelectedDoc(doc);
 };

 const handleFormSubmit = async (formData) => {
 setLoading(true);
 const payload = {
 documentTypeCode: selectedDoc.code,
 champsSpecifiques: formData
 };

 const result = await demandeService.create(payload);
 setLoading(false);

 if (result.success) {
 addNotif('Votre demande a été soumise avec succès !', 'success');
 navigate('/demandes/confirmation', { state: { demande: result.data } });
 } else {
 addNotif(result.error, 'danger');
 }
 };

 return (
 <Layout>
 <Navbar title="Nouvelle Demande"/>
 
 <div className="p-8 max-w-5xl mx-auto">
 {!selectedDoc ? (
  <div className="selection-step animate-fade-in">
  <div className="mb-12 text-center">
  <h1 className="text-4xl font-black text-slate-900 tracking-tight">De quel document avez-vous besoin ?</h1>
  <p className="text-slate-500 mt-2 font-medium max-w-2xl mx-auto">Sélectionnez le type de document administratif pour commencer votre procédure de demande en ligne sécurisée.</p>
  </div>

 {fetchingTypes ? (
 <div className="grid md-grid-cols-2 gap-6">
 {[1, 2, 3, 4].map(i => (
 <Card key={i} className="h-32 bg-slate-100 animate-pulse border-none"></Card>
 ))}
 </div>
 ) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {docTypes.map((doc) => (
  <Card 
  key={doc.code} 
  hover 
  className="cursor-pointer group flex flex-col items-center gap-4 p-8 text-center border-2 border-transparent hover:border-primary/20 hover:shadow-xl transition-all"
  onClick={() => handleDocSelect(doc)}
  >
  <div className="size-20 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
  <span className="material-symbols-outlined text-4xl">{doc.icon || 'description'}</span>
  </div>
  <div>
  <h3 className="font-bold text-slate-900 mb-2 text-lg">{doc.nom}</h3>
  <p className="text-xs text-slate-500 leading-relaxed">{doc.description || `Effectuez votre demande de ${doc.nom} en toute simplicité.`}</p>
  </div>
  <div className="mt-4 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest group-hover:bg-primary/10 group-hover:text-primary transition-colors">
  Commencer
  </div>
  </Card>
  ))}
  </div>
 )}
 </div>
 ) : (
  <div className="form-step animate-fade-in">
  <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
  <div>
  <button 
  onClick={() => setSelectedDoc(null)} 
  className="group text-slate-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors mb-4"
  >
  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
  Changer de document
  </button>
  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{selectedDoc.nom}</h1>
  <p className="text-slate-500 mt-1 font-medium">Veuillez renseigner les informations complémentaires pour le traitement de votre dossier.</p>
  </div>
  <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
  <div className="flex flex-col items-end">
  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Étape actuelle</span>
  <span className="text-xs font-bold text-slate-700">Formulaire de Saisie</span>
  </div>
  <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center">
  <span className="text-xs font-black text-primary">1/2</span>
  </div>
  </div>
  </div>

 <Card className="p-8">
 <DynamicForm 
 documentCode={selectedDoc.code} 
 onSubmit={handleFormSubmit}
 loading={loading}
 />
 </Card>
 </div>
 )}
 </div>
 </Layout>
 );
};

export default NouvelleDemandePage;
