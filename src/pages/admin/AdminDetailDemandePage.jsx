import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import agentService from '../../services/agentService';
import Loader from '../../components/Loader';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';

// ── CONFIG STATUTS ──────────────────────────────────────────────────────────────
const statutConfig = {
  'EN_ATTENTE': { label: 'EN ATTENTE D\'EXAMEN', bg: '#f1f5f9', color: '#475569', key: 'en_attente' },
  'EN_COURS':   { label: 'EN COURS',             bg: '#dbeafe', color: '#1d4ed8', key: 'en_cours' },
  'VALIDEE':    { label: 'APPROUVÉE',            bg: '#dcfce7', color: '#15803d', key: 'approuvee' },
  'REJETEE':    { label: 'REJETÉE',              bg: '#fee2e2', color: '#b91c1c', key: 'rejetee' },
};

// ── PAGE ─────────────────────────────────────────────────────────────────────
const AdminDetailDemandePage = () => {
  const { user: currentUser } = useAuth();
  const { id } = useParams();
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noteInterne, setNoteInterne] = useState('');
  const [actionFaite, setActionFaite] = useState(null);

  const fetchDetail = async () => {
    setLoading(true);
    
    // Détection des IDs de démo (commençant par CDB-)
    if (id && id.startsWith('CDB-')) {
      setDemande({
        _id: id,
        numeroSuivi: id,
        statut: 'EN_ATTENTE',
        type: "Extrait d'acte de naissance",
        createdAt: new Date().toISOString(),
        citoyenId: {
          nom: 'Ouédraogo',
          prenom: 'Ibrahim',
          email: 'ibrahim.o@email.bf',
          telephone: '+226 70 00 00 00',
          adresse: 'Ouagadougou, Secteur 15',
          dateNaissance: '1990-05-15',
          lieuNaissance: 'Bobo-Dioulasso'
        },
        piecesJointes: [
          { nom: 'Livret de famille', url: '#' },
          { nom: "Ancienne copie d'acte", url: '#' }
        ],
        historique: [
          { action: 'Dépôt de la demande', date: new Date().toISOString(), statut: 'EN_ATTENTE', message: 'Demande soumise par le citoyen' }
        ]
      });
      setLoading(false);
      return;
    }

    const result = await agentService.getDemandeDetail(id);
    if (result.success) {
      setDemande(result.data);
    } else {
      setError(result.error || 'Erreur lors du chargement des détails');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleAction = async (action) => {
    let result;
    if (action === 'Valider') {
      result = await agentService.validerDemande(id, noteInterne);
    } else if (action === 'Rejeter') {
      result = await agentService.rejeterDemande(id, noteInterne);
    } else if (action === 'Demander complément') {
      result = await agentService.demanderComplement(id, ['Documents complémentaires'], noteInterne);
    }

    if (result && result.success) {
      setActionFaite(action);
      fetchDetail(); // Recharger pour voir le nouveau statut
    } else {
      alert(result?.error || 'Une erreur est survenue');
    }
  };

  if (loading) return <Loader fullPage />;
  if (error && !demande) return <div className="p-8"><Alert variant="danger" message={error} /></div>;
  if (!demande) return <div className="p-8">Demande non trouvée</div>;

  const statut = statutConfig[demande.statut] || statutConfig['EN_ATTENTE'];

  // Formatage des données pour le design
  const displayData = {
    id: demande.numeroSuivi || id,
    titre: demande.typeDocumentId?.nom || demande.type || 'Demande de document',
    datesoumission: new Date(demande.createdAt).toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    citoyen: {
      nom: `${demande.citoyenId?.nom || ''} ${demande.citoyenId?.prenom || ''}`.trim() || 'Inconnu',
      dateNaissance: demande.citoyenId?.dateNaissance ? new Date(demande.citoyenId.dateNaissance).toLocaleDateString() : 'N/A',
      lieuNaissance: demande.citoyenId?.lieuNaissance || 'N/A',
      email: demande.citoyenId?.email || 'N/A',
      telephone: demande.citoyenId?.telephone || 'N/A',
      adresse: demande.citoyenId?.adresse || 'N/A',
    },
    justificatifs: (demande.piecesJointes || []).map(p => ({
      nom: p.nom || 'Document',
      fichier: p.nom || 'fichier.pdf',
      taille: 'N/A', // Donnée non disponible dans le modèle actuel
      preview: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/267px-PDF_file_icon.svg.png'
    })),
    historique: (demande.historique || []).map(h => ({
      label: h.action || h.statut,
      date: new Date(h.date).toLocaleString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      description: h.message || `Statut mis à jour : ${h.statut}`,
      couleur: h.statut === 'VALIDEE' ? '#22c55e' : h.statut === 'REJETEE' ? '#ef4444' : '#3b82f6',
      actif: true
    }))
  };

  return (
    <Layout>
      <div style={{ padding: '28px 40px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>

        {/* BREADCRUMB */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 13, color: '#64748b' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#94a3b8' }}>grid_view</span>
          <Link to={currentUser?.role === 'ADMIN' ? "/admin/dashboard" : "/agent/dashboard"} style={{ color: '#64748b', textDecoration: 'none' }}>
            {currentUser?.role === 'ADMIN' ? "Tableau de bord" : "Mon Espace"}
          </Link>
          <span style={{ color: '#cbd5e1' }}>›</span>
          <Link to={currentUser?.role === 'ADMIN' ? "/admin/demandes" : "/agent/demandes"} style={{ color: '#64748b', textDecoration: 'none' }}>
            Demandes
          </Link>
          <span style={{ color: '#cbd5e1' }}>›</span>
          <span style={{ color: '#002395', fontWeight: 700 }}>Détail Demande {displayData.id}</span>
        </nav>

        {/* EN-TÊTE CARD */}
        <div style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '24px 28px', marginBottom: 24, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div>
            {/* Badge statut + ID */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <span style={{ backgroundColor: statut.bg, color: statut.color, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, letterSpacing: '0.05em' }}>
                {statut.label}
              </span>
              <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>ID: {displayData.id}</span>
            </div>
            {/* Titre */}
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
              {displayData.titre}
            </h1>
            {/* Date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 13 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_today</span>
              Soumise le {displayData.datesoumission} par {displayData.citoyen.nom}
            </div>
          </div>
          {/* Boutons */}
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', border: '1.5px solid #e2e8f0', borderRadius: 10, backgroundColor: '#fff', color: '#374151', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>print</span>
              Imprimer
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', border: 'none', borderRadius: 10, backgroundColor: '#1e3a5f', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(30,58,95,0.25)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</span>
              Éditer
            </button>
          </div>
        </div>

        {/* CONTENU PRINCIPAL — 2 colonnes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* COLONNE GAUCHE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* INFORMATIONS CITOYEN */}
            <div style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '24px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#002395' }}>person</span>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Informations Citoyen</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 32px' }}>
                {[
                  { label: 'NOM COMPLET',       value: displayData.citoyen.nom           },
                  { label: 'DATE DE NAISSANCE',  value: displayData.citoyen.dateNaissance },
                  { label: 'LIEU DE NAISSANCE',  value: displayData.citoyen.lieuNaissance },
                  { label: 'EMAIL',              value: displayData.citoyen.email         },
                  { label: 'TÉLÉPHONE',          value: displayData.citoyen.telephone     },
                  { label: 'ADRESSE',            value: displayData.citoyen.adresse       },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 5px 0' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#1e293b', margin: 0 }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* JUSTIFICATIFS */}
            <div style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '24px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#002395' }}>folder</span>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Justificatifs fournis</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {displayData.justificatifs.map((j, idx) => (
                  <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', backgroundColor: '#fafafa' }}>
                    {/* Header fichier */}
                    <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#002395' }}>description</span>
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{j.nom}</p>
                        <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{j.fichier} ({j.taille})</p>
                      </div>
                    </div>
                    {/* Aperçu */}
                    <div style={{ height: 120, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
                      <img src={j.preview} alt={j.nom} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                        onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLONNE DROITE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* TRAITEMENT */}
            <div style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '22px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#002395' }}>gavel</span>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: 0 }}>Traitement</h2>
              </div>

              {/* Feedback action */}
              {actionFaite && (
                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: '#15803d', fontWeight: 500 }}>
                  ✓ Action "{actionFaite}" enregistrée.
                </div>
              )}

              {/* Bouton Valider */}
              <button onClick={() => handleAction('Valider')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '13px 0', border: 'none', borderRadius: 10, backgroundColor: '#16a34a', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 10, boxShadow: '0 2px 8px rgba(22,163,74,0.25)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
                Valider la demande
              </button>

              {/* Bouton Complément */}
              <button onClick={() => handleAction('Demander complément')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '13px 0', border: 'none', borderRadius: 10, backgroundColor: '#f59e0b', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 10, boxShadow: '0 2px 8px rgba(245,158,11,0.25)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>assignment_return</span>
                Demander un complément
              </button>

              {/* Bouton Rejeter */}
              <button onClick={() => handleAction('Rejeter')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '13px 0', border: 'none', borderRadius: 10, backgroundColor: '#ef4444', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(239,68,68,0.25)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>cancel</span>
                Rejeter le dossier
              </button>

              {/* NOTE INTERNE */}
              <div style={{ marginTop: 20 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  NOTE INTERNE
                </p>
                <textarea
                  placeholder="Ajouter une observation..."
                  value={noteInterne}
                  onChange={(e) => setNoteInterne(e.target.value)}
                  rows={4}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#374151', resize: 'vertical', outline: 'none', fontFamily: 'inherit', backgroundColor: '#fafafa', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* HISTORIQUE */}
            <div style={{ backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', padding: '22px 22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#002395' }}>history</span>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: 0 }}>Historique du traitement</h2>
              </div>

              <div style={{ position: 'relative', paddingLeft: 24 }}>
                {/* Ligne verticale */}
                <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, backgroundColor: '#f1f5f9', borderRadius: 2 }} />

                {displayData.historique.map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', marginBottom: idx < demande.historique.length - 1 ? 22 : 0 }}>
                    {/* Point */}
                    <div style={{ position: 'absolute', left: -20, top: 3, width: 12, height: 12, borderRadius: '50%', backgroundColor: item.couleur, border: '2px solid #fff', boxShadow: `0 0 0 2px ${item.couleur}40` }} />
                    {/* Contenu */}
                    {item.actif ? (
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', margin: '0 0 2px 0' }}>{item.label}</p>
                        <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 4px 0' }}>{item.date}</p>
                        <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{item.description}</p>
                      </div>
                    ) : (
                      <p style={{ fontSize: 13, fontStyle: 'italic', color: '#94a3b8', margin: 0 }}>{item.label}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 40, textAlign: 'center', paddingBottom: 20 }}>
          <p style={{ fontSize: 12, color: '#94a3b8' }}>
            © 2023 E-Gov Document · Système de Gestion Dématérialisée de l'État Civil
          </p>
        </div>

      </div>
    </Layout>
  );
};

export default AdminDetailDemandePage;