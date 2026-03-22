import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/Loader';
import { useAuth } from '../../hooks/useAuth';
import agentService from '../../services/agentService';

const AgentDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ enAttenteService: 0, totalTraitees: 0, tauxReussite: 0 });
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
          enAttenteService: s.enAttenteService || 124,
          totalTraitees: s.totalTraitees || 1450,
          tauxReussite: taux || 98
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

  // Activités mock si pas de données API
  const activitesMock = [
    {
      _id: '1',
      icon: 'description',
      iconBg: '#e8f4fd',
      iconColor: '#1a5276',
      titre: 'Nouveau dossier CNIB reçu',
      description: 'Demande n° 2024-BF-00982 soumise par Moussa Traoré (Ouagadougou).',
      temps: 'Il y a 10 min',
      actions: true,
    },
    {
      _id: '2',
      icon: 'check_circle',
      iconBg: '#e8f8f0',
      iconColor: '#16a34a',
      titre: 'Casier Judiciaire validé',
      description: 'La vérification des antécédents pour le dossier n° 2024-BF-00871 est terminée.',
      temps: 'Il y a 1h',
      actions: false,
    },
    {
      _id: '3',
      icon: 'system_update',
      iconBg: '#fef9e7',
      iconColor: '#d97706',
      titre: 'Mise à jour du système',
      description: 'Le portail E-Gov a été mis à jour avec les nouveaux formulaires fonciers.',
      temps: 'Il y a 3h',
      actions: false,
    },
  ];

  const activites = recentDemandes.length > 0
    ? recentDemandes.map((d) => ({
        _id: d._id,
        icon: 'description',
        iconBg: '#e8f4fd',
        iconColor: '#1a5276',
        titre: `Nouveau dossier ${d.typeDocumentId?.nom || d.documentTypeCode || d.type || 'Document'} reçu`,
        description: `Demande n° ${d.numeroSuivi} soumise par ${d.citoyenId?.nom || ''} ${d.citoyenId?.prenom || ''}.`,
        temps: new Date(d.createdAt).toLocaleDateString(),
        actions: true,
        demandeId: d._id,
      }))
    : activitesMock;

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">

        {/* ── BANNER HERO ─────────────────────────────────────────────── */}
        <div style={{
          position: 'relative', height: 220, borderRadius: 20,
          overflow: 'hidden', marginBottom: 28,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}>
          {/* Image fond */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC47blHSEGj_KiR-JYLdEuIcvGrWKhxHa4p3eFrKC-UknlFsqyZtS8JGAGOTv_eyvDvkPTtjf9So4GVwieNacHCq27C0F6coJqdHKZwVoXy9PzCkwmM0N3xA_lM8bwunUQkOjL4NBE-fbD0WtG4IWHwFVZg-X7Z0-Rl2pAVDGy3cppzWzAVO6WvGxTfo0Y1-FuPeVvI4C2j3I_Tb16m-YEstsG4_eWatakxSFxOVu-NYnSKKLwjOgwtq-z7JsMDqbuKxI5e1l9-GUY')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.5,
          }} />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #1a3a5c 40%, rgba(26,58,92,0.6) 100%)',
          }} />
          {/* Contenu */}
          <div style={{
            position: 'relative', zIndex: 2,
            height: '100%', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', padding: '0 40px',
          }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 8px 0' }}>
              Bienvenue, Agent {user?.prenom || 'Sawadogo'}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', maxWidth: 480, margin: '0 0 20px 0', lineHeight: 1.6 }}>
              Votre interface de gestion administrative centralisée pour le traitement efficace des services publics de l'État.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{
                padding: '10px 22px', border: 'none', borderRadius: 8,
                backgroundColor: '#f59e0b', color: '#fff',
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}>
                Nouvelle Procédure
              </button>
              <button style={{
                padding: '10px 22px', border: '1.5px solid rgba(255,255,255,0.3)',
                borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}>
                Rapports Mensuels
              </button>
            </div>
          </div>
        </div>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
          {/* Demandes en attente */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: '#f97316' }}>pending_actions</span>
            </div>
            <div>
              <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 2px 0', fontWeight: 500 }}>Demandes en attente</p>
              <h3 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>{stats.enAttenteService.toLocaleString()}</h3>
              <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 700, margin: 0 }}>+12% cette semaine</p>
            </div>
          </div>

          {/* Demandes traitées */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: '#3b82f6' }}>task_alt</span>
            </div>
            <div>
              <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 2px 0', fontWeight: 500 }}>Demandes traitées</p>
              <h3 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>{stats.totalTraitees.toLocaleString()}</h3>
              <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, margin: 0 }}>Mise à jour il y a 5 min</p>
            </div>
          </div>

          {/* Taux de réussite */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: '#22c55e' }}>verified</span>
            </div>
            <div>
              <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 2px 0', fontWeight: 500 }}>Taux de réussite</p>
              <h3 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>{stats.tauxReussite}%</h3>
              <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 700, margin: 0 }}>+2.4% vs mois dernier</p>
            </div>
          </div>
        </div>

        {/* ── CONTENU PRINCIPAL ────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>

          {/* ACTIVITÉS RÉCENTES */}
          <div style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            {/* Header */}
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Activités récentes</h2>
              <Link to="/agent/demandes" style={{ fontSize: 13, fontWeight: 700, color: '#002395', textDecoration: 'none' }}>
                Voir tout
              </Link>
            </div>

            {/* Items */}
            {activites.map((activite, idx) => (
              <div key={activite._id} style={{
                padding: '20px 24px',
                borderBottom: idx < activites.length - 1 ? '1px solid #f8fafc' : 'none',
                display: 'flex', alignItems: 'flex-start', gap: 14,
              }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {/* Icône */}
                <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: activite.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: activite.iconColor }}>{activite.icon}</span>
                </div>

                {/* Contenu */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: 0 }}>{activite.titre}</h4>
                    <span style={{ fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: 12 }}>{activite.temps}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 12px 0', lineHeight: 1.5 }}>{activite.description}</p>

                  {/* Boutons action */}
                  {activite.actions && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => navigate(activite.demandeId ? `/agent/demandes/${activite.demandeId}` : '/agent/demandes')}
                        style={{ padding: '7px 16px', border: 'none', borderRadius: 8, backgroundColor: '#002395', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                      >
                        Consulter
                      </button>
                      <button style={{ padding: '7px 16px', border: '1px solid #e2e8f0', borderRadius: 8, backgroundColor: '#fff', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                        Ignorer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* COLONNE DROITE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* AIDE AU TRAITEMENT */}
            <div style={{ backgroundColor: '#1a3a5c', borderRadius: 14, padding: '24px 22px', boxShadow: '0 4px 16px rgba(26,58,92,0.2)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 10px 0' }}>Aide au Traitement</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '0 0 20px 0', lineHeight: 1.6 }}>
                Besoin d'aide pour une procédure complexe ? Consultez le guide interactif de l'agent.
              </p>
              <button style={{ width: '100%', padding: '11px 0', border: 'none', borderRadius: 10, backgroundColor: '#fff', color: '#1a3a5c', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Ouvrir le manuel
              </button>
            </div>

            {/* STATUT DES SERVICES */}
            <div style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '22px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 18px 0' }}>Statut des services</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Portail Citoyen',       statut: 'Opérationnel',  couleur: '#22c55e' },
                  { label: 'Base de données CNIB',  statut: 'Opérationnel',  couleur: '#22c55e' },
                  { label: 'Passerelle de paiement', statut: 'Ralentissement', couleur: '#f97316' },
                ].map(({ label, statut, couleur }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{label}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: couleur }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: couleur, flexShrink: 0 }} />
                      {statut}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
};

export default AgentDashboardPage;