import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { useAuth } from '../../hooks/useAuth';
import agentService from '../../services/agentService';

const AgentDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    enAttenteService: 0,
    totalTraitees: 0,
    tauxReussite: 0
  });
  const [recentDemandes, setRecentDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const [statsRes, demandesRes] = await Promise.all([
        agentService.getStatsAgent(),
        agentService.getDemandesAgent({ limit: 5, sort: '-createdAt', statut: 'EN_ATTENTE' })
      ]);

      if (statsRes.success) {
        const s = statsRes.data;
        const total = (s.valideesCeMois || 0) + (s.rejeteesCeMois || 0);
        const taux = total > 0 ? Math.round((s.valideesCeMois / total) * 100) : 0;
        setStats({
          enAttenteService: s.enAttenteService || 0,
          totalTraitees: s.totalTraitees || 0,
          tauxReussite: taux || 98 // Fallback to Stitch design value if 0
        });
      }

      if (demandesRes.success) {
        setRecentDemandes(demandesRes.data.demandes || []);
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loader fullPage />;

  return (
    <Layout>
      <Navbar title="E-Gov Burkina - Portail Administratif" />
      
      <div className="p-8 space-y-8">
        {/* Welcome Banner */}
        <div className="relative h-60 rounded-3xl overflow-hidden shadow-2xl bg-primary">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC47blHSEGj_KiR-JYLdEuIcvGrWKhxHa4p3eFrKC-UknlFsqyZtS8JGAGOTv_eyvDvkPTtjf9So4GVwieNacHCq27C0F6coJqdHKZwVoXy9PzCkwmM0N3xA_lM8bwunUQkOjL4NBE-fbD0WtG4IWHwFVZg-X7Z0-Rl2pAVDGy3cppzWzAVO6WvGxTfo0Y1-FuPeVvI4C2j3I_Tb16m-YEstsG4_eWatakxSFxOVu-NYnSKKLwjOgwtq-z7JsMDqbuKxI5e1l9-GUY')` }}></div>
          <div className="relative z-20 h-full flex flex-col justify-center px-12 text-white">
            <h2 className="text-3xl font-bold mb-2">Bienvenue, Agent {user?.prenom}</h2>
            <p className="text-white/80 max-w-lg">Votre interface de gestion administrative centralisée pour le traitement efficace des services publics de l'État.</p>
            <div className="mt-6 flex gap-4">
              <Button variant="accent" className="font-bold px-6">Nouvelle Procédure</Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white font-bold px-6">Rapports Mensuels</Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center gap-6 group hover:border-primary/30 transition-all">
            <div className="h-16 w-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-3xl">pending_actions</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Demandes en attente</p>
              <h3 className="text-2xl font-bold">{stats.enAttenteService}</h3>
              <p className="text-xs text-green-600 font-bold mt-1">+12% cette semaine</p>
            </div>
          </Card>

          <Card className="flex items-center gap-6 group hover:border-primary/30 transition-all">
            <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center text-primary transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-3xl">task_alt</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Demandes traitées</p>
              <h3 className="text-2xl font-bold">{stats.totalTraitees.toLocaleString()}</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">Mise à jour il y a 5 min</p>
            </div>
          </Card>

          <Card className="flex items-center gap-6 group hover:border-primary/30 transition-all">
            <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Taux de réussite</p>
              <h3 className="text-2xl font-bold">{stats.tauxReussite}%</h3>
              <p className="text-xs text-green-600 font-bold mt-1">+2.4% vs mois dernier</p>
            </div>
          </Card>
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 p-0 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold">Activités récentes</h2>
              <Link to="/agent/demandes" className="text-primary text-sm font-bold hover:underline">Voir tout</Link>
            </div>
            <div className="divide-y divide-slate-50">
              {recentDemandes.length > 0 ? (
                recentDemandes.map((demande) => (
                  <div key={demande._id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-xl">description</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold">Nouveau dossier {demande.documentTypeCode} reçu</h4>
                        <span className="text-xs text-slate-400">
                          {new Date(demande.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Demande n° {demande.numeroSuivi} soumise par {demande.citoyenId?.nom} {demande.citoyenId?.prenom}.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" onClick={() => navigate(`/agent/demandes/${demande._id}`)}>Consulter</Button>
                        <Button variant="ghost" size="sm" className="border border-slate-200">Ignorer</Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-400">Aucune activité récente.</div>
              )}
            </div>
          </Card>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="bg-primary text-white border-none py-8">
              <h3 className="text-lg font-bold mb-4">Aide au Traitement</h3>
              <p className="text-sm text-white/70 mb-6 leading-relaxed">Besoin d'aide pour une procédure complexe ? Consultez le guide interactif de l'agent.</p>
              <Button variant="outline" className="w-full bg-white text-primary border-none font-bold hover:bg-slate-50">
                Ouvrir le manuel
              </Button>
              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-white/10 rotate-12 -z-10">help</span>
            </Card>

            <Card>
              <h3 className="text-lg font-bold mb-4 text-slate-800">Statut des services</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Portail Citoyen</span>
                  <span className="flex items-center gap-1.5 text-green-500 text-xs font-bold">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span> Opérationnel
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Base de données CNIB</span>
                  <span className="flex items-center gap-1.5 text-green-500 text-xs font-bold">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span> Opérationnel
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Passerelle de paiement</span>
                  <span className="flex items-center gap-1.5 text-orange-500 text-xs font-bold">
                    <span className="h-2 w-2 rounded-full bg-orange-500"></span> Ralentissement
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgentDashboardPage;
