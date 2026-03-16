import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import adminService from '../../services/adminService';
import { 
  FileText, ShieldCheck, Clock, CheckCircle, 
  CreditCard, Info, Edit3, Printer, 
  ArrowLeft, QrCode, BookOpen, AlertCircle
} from 'lucide-react';

const AdminDetailDocumentPage = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocData();
  }, [id]);

  const fetchDocData = async () => {
    try {
      setLoading(true);
      const res = await adminService.getDocumentById(id);
      if (res.success) setDoc(res.data);
    } catch (err) {
      setError("Erreur lors de la récupération du document.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  if (!doc) return <div className="flex items-center justify-center h-screen text-red-500">Document introuvable.</div>;

  return (
    <div className="app-container flex min-h-screen bg-slate-50">
      <Sidebar activePage="ressources" />
      
      <main className="main-content flex-1 ml-72 p-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-sm font-medium">
          <Link to="/admin/ressources" className="text-slate-500 hover:text-primary transition-colors">Documents</Link>
          <span className="text-slate-400">/</span>
          <span className="text-primary font-bold">{doc.nom}</span>
        </nav>

        {/* Header Title Area */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">{doc.nom}</h1>
              <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                doc.actif ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {doc.actif ? 'Actif' : 'Inactif'}
              </span>
            </div>
            <p className="text-slate-500 text-lg">
              Code: <span className="font-mono text-primary font-bold">{doc.code}</span> | 
              Service: <span className="text-gov-blue font-semibold uppercase ml-1">{doc.service}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
              <Printer size={18} /> Imprimer
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
              <Edit3 size={18} /> Modifier le document
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DocStatCard 
            label="Demandes Totales" 
            value="12,450" 
            trend="+12.5%" 
            icon={<FileText className="text-blue-600" />} 
            bgColor="bg-blue-50"
          />
          <DocStatCard 
            label="Délai Moyen" 
            value="18 heures" 
            trend="-4h" 
            icon={<Clock className="text-orange-600" />} 
            bgColor="bg-orange-50"
          />
          <DocStatCard 
            label="Taux d'Approbation" 
            value="94.2%" 
            trend="Stable" 
            icon={<ShieldCheck className="text-green-600" />} 
            bgColor="bg-green-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <h3 className="text-xl font-bold text-slate-800">Informations Générales</h3>
                <Info size={18} className="text-slate-300" />
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <DetailField label="Service Responsable" value={doc.nomService || doc.service} sub="Direction Générale" />
                <DetailField label="Maintenance Technique" value="ANPTIC" sub="Support E-Gov Fase" />
                
                <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-primary">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Coût de délivrance</label>
                  <p className="text-2xl font-black text-primary">{doc.prix?.toLocaleString() || 0} FCFA</p>
                  <p className="text-xs text-slate-500">Payable via Mobile Money ou Carte</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-blue-600">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Délai Contractuel</label>
                  <p className="text-2xl font-black text-blue-600">{doc.delaiStandard || '24'} Heures</p>
                  <p className="text-xs text-slate-500">À compter de la validation du paiement</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30">
                <h3 className="text-xl font-bold text-slate-800">Pièces justificatives requises</h3>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {doc.champsRequis?.length > 0 ? doc.champsRequis.map((champ, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="bg-blue-900 text-white size-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{champ.label}</p>
                        <p className="text-sm text-slate-500">Type: {champ.type} | Format requis numérique</p>
                      </div>
                      <CheckCircle className="ml-auto text-green-500" size={20} />
                    </li>
                  )) : (
                    <li className="text-slate-500 italic p-4 text-center">Aucune pièce spécifique configurée.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-6 uppercase text-xs tracking-widest">Activité Récente</h4>
              <div className="space-y-6">
                <RecentAction 
                  title="Mise à jour du coût" 
                  desc={`Le coût est passé à ${doc.prix} FCFA`} 
                  time="Il y a 2 jours" 
                  color="bg-primary"
                />
                <RecentAction 
                  title="Vérification active" 
                  desc="API de vérification CNIB connectée" 
                  time="Il y a 1 mois" 
                  color="bg-green-500"
                />
              </div>
              <button className="w-full mt-8 py-3 text-primary font-bold text-sm border-t border-slate-100 hover:bg-slate-50 transition-all">
                Voir l'historique complet
              </button>
            </div>

            <div className="bg-blue-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2">Guide de Procédure</h4>
                <p className="text-blue-200 mb-6 text-sm">Consultez les protocoles officiels de validation pour ce document.</p>
                <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                  <BookOpen size={16} /> Manuel d'Instruction
                </button>
              </div>
              <FileText className="absolute -right-4 -bottom-4 size-32 opacity-10 rotate-12" />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Qr Code de Config</p>
              <div className="size-32 bg-slate-50 mx-auto rounded-xl flex items-center justify-center mb-4 border border-slate-100">
                <QrCode size={48} className="text-slate-300" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">Scanner pour accéder à la configuration de ce document.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const DocStatCard = ({ label, value, trend, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${bgColor}`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <span className={`text-xs font-bold flex items-center gap-1 ${trend.startsWith('+') ? 'text-green-600' : 'text-slate-400'}`}>
        {trend}
      </span>
    </div>
    <p className="text-slate-500 font-medium text-sm mb-1">{label}</p>
    <p className="text-2xl font-black text-slate-900">{value}</p>
  </div>
);

const DetailField = ({ label, value, sub }) => (
  <div>
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{label}</label>
    <p className="text-lg font-bold text-slate-800 leading-tight">{value}</p>
    {sub && <p className="text-sm text-slate-500">{sub}</p>}
  </div>
);

const RecentAction = ({ title, desc, time, color }) => (
  <div className="flex gap-4">
    <div className={`size-2 rounded-full mt-2 shrink-0 ${color}`}></div>
    <div>
      <p className="text-sm font-bold text-slate-800">{title}</p>
      <p className="text-xs text-slate-500">{desc}</p>
      <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase">{time}</p>
    </div>
  </div>
);

export default AdminDetailDocumentPage;
