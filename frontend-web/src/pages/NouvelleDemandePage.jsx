import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
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
      <Navbar title="Nouvelle Demande" />
      
      <div className="p-8 max-w-5xl mx-auto">
        {!selectedDoc ? (
          <div className="selection-step animate-fade-in">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900">Quel document souhaitez-vous ?</h1>
              <p className="text-slate-500">Sélectionnez le type de document pour commencer votre demande.</p>
            </div>

            {fetchingTypes ? (
              <div className="grid md-grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="h-32 bg-slate-100 animate-pulse border-none"></Card>
                ))}
              </div>
            ) : (
              <div className="grid md-grid-cols-2 gap-6">
                {docTypes.map((doc) => (
                  <Card 
                    key={doc.code} 
                    hover 
                    className="cursor-pointer group flex items-start gap-4 p-6"
                    onClick={() => handleDocSelect(doc)}
                  >
                    <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                      <span className="material-symbols-outlined">{doc.icon || 'description'}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-1">{doc.nom}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{doc.description || `Demandez votre ${doc.nom} en quelques clics.`}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="form-step animate-fade-in">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <button 
                  onClick={() => setSelectedDoc(null)} 
                  className="text-primary text-sm font-bold flex items-center gap-1 hover:underline mb-2"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Changer de document
                </button>
                <h1 className="text-2xl font-bold text-slate-900">{selectedDoc.nom}</h1>
                <p className="text-slate-500">Veuillez remplir les informations requises ci-dessous.</p>
              </div>
              <div className="status-indicator flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Étape de saisie</span>
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
