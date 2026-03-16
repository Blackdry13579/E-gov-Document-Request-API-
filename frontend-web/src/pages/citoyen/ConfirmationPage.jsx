import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';

const ConfirmationPage = () => {
  const location = useLocation();
  const demande = location.state?.demande;

  if (!demande) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout>
      <Navbar title="Confirmation" />
      
      <div className="p-8 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="confirmation-content max-w-md w-full text-center">
          <div className="success-animation mb-8">
            <div className="size-24 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto border-4 border-success/20">
              <span className="material-symbols-outlined text-6xl">check_circle</span>
            </div>
          </div>

          <h1 className="text-3xl font-black text-slate-900 mb-4">Demande Transmise !</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Votre demande de <span className="text-slate-900 font-bold">{demande.documentType?.nom}</span> a été enregistrée avec succès sous le numéro :
          </p>

          <Card className="bg-slate-50 border-dashed border-2 border-slate-200 py-6 mb-10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Référence de suivi</p>
            <h2 className="text-2xl font-mono font-black text-primary select-all">
              {demande.numeroSuivi || demande._id?.substring(0, 8).toUpperCase()}
            </h2>
          </Card>

          <div className="info-box bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex gap-4 text-left mb-10">
            <span className="material-symbols-outlined text-primary">info</span>
            <p className="text-sm text-slate-600">
              Vous recevrez une notification par email et SMS à chaque étape du traitement. Vous pouvez suivre l'avancement dans votre espace personnel.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/dashboard">
              <Button variant="primary" size="lg" className="w-full">Retour au tableau de bord</Button>
            </Link>
            <Link to="/demandes">
              <Button variant="ghost" className="w-full">Consulter mes demandes</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmationPage;
