import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

const AdminProfilPage = () => {
  const [activeTab, setActiveTab] = useState('informations');

  return (
    <Layout>
      <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto w-full">

        {/* ── TITRE SEUL (sans breadcrumb) ──────────────────────────── */}
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Profil de l'Administrateur
          </h1>
          <p className="text-slate-500 mt-2">
            Gérez vos informations personnelles et surveillez vos activités de gestion
            au sein du portail ministériel.
          </p>
        </div>

        {/* ── CARTE PROFIL ───────────────────────────────────────────── */}
        <div
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6
                     flex flex-col md:flex-row gap-8 items-start"
        >
          {/* Photo */}
          <div className="relative shrink-0">
            <div
              className="w-32 h-32 rounded-2xl bg-slate-100 overflow-hidden"
              style={{ border: '2px solid rgba(0,35,149,0.2)' }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxU2DD_5t_oDLKEylasr11k3mfI-Wox0MFTDN9mAEwhxh1Xo9kThO61Hekw6Wm0ApLSBF4tBcvB-C9dJMpqN31C-KnlLJzHBwGjG-iJ7cS3EFtqJAV4E1fpLuPMoqPewmS6izP7cb7g9aVTK3XkxnSwJLSGCxYmq9h6AKpB2I1cVH3JUSEECCV5MNeBfJGvZyLCc4BlWNbt2d40VZc9AOGOoCk86uR9y0qMZ0lJkruqhlgV-a9ZxltQA-25mCyPY45gri2y6OQmdw"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl flex
                         items-center justify-center text-white"
              style={{ backgroundColor: '#002395' }}
            >
              <span className="material-symbols-outlined text-sm">photo_camera</span>
            </button>
          </div>

          {/* Infos */}
          <div className="flex-1 space-y-5">
            {/* Nom + bouton modifier */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  M. l'Administrateur en Titre
                </h3>
                <p className="font-medium flex items-center gap-1 mt-1"
                   style={{ color: '#002395' }}>
                  <span className="material-symbols-outlined text-base">domain</span>
                  Ministère de la Transition Digitale
                </p>
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium
                           text-sm shrink-0"
                style={{ backgroundColor: 'rgba(0,35,149,0.1)', color: '#002395' }}
              >
                <span className="material-symbols-outlined text-lg">edit</span>
                <span>Modifier le profil</span>
              </button>
            </div>

            {/* Méta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <span className="material-symbols-outlined text-slate-400">history</span>
                <span>Dernière connexion: 24/05/2024 à 09:15</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <span className="material-symbols-outlined text-slate-400">location_on</span>
                <span>Ouagadougou, Burkina Faso</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ONGLETS (sans Statistiques) ─────────────────────────────── */}
        <div className="border-b border-slate-200">
          <div className="flex gap-8">
            {[
              { id: 'informations', icon: 'info', label: 'Informations' },
              { id: 'acces', icon: 'key', label: 'Accès & Rôles' },
            ].map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="pb-4 text-sm font-bold border-b-2 flex items-center gap-2
                           transition-colors"
                style={
                  activeTab === id
                    ? { borderColor: '#002395', color: '#002395' }
                    : { borderColor: 'transparent', color: '#64748b' }
                }
              >
                <span className="material-symbols-outlined text-lg">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENU: Informations ─────────────────────────────────── */}
        {activeTab === 'informations' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Colonne gauche (2/3) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Détails Personnels */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h4 className="text-lg font-bold text-slate-900 mb-8">
                  Détails Personnels
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Nom Complet
                    </p>
                    <p className="font-medium text-slate-900 text-base">
                      Ouedraogo Moussa Abdoulaye
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Matricule
                    </p>
                    <p className="font-medium text-slate-900 text-base">
                      MTD-2024-ADM01
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Email Professionnel
                    </p>
                    <p className="font-medium text-slate-900 text-base">
                      m.ouedraogo@digital.bf
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Téléphone
                    </p>
                    <p className="font-medium text-slate-900 text-base">
                      +226 25 30 00 00
                    </p>
                  </div>
                </div>
              </div>

              {/* Activités Récentes */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h4 className="text-lg font-bold text-slate-900 mb-6">
                  Activités Récentes
                </h4>

                {/* Timeline */}
                <div className="relative">
                  {/* Ligne verticale */}
                  <div
                    className="absolute left-3 top-4 bottom-4 w-px"
                    style={{ backgroundColor: '#e2e8f0' }}
                  />

                  <div className="space-y-6">
                    {[
                      {
                        title: 'Mise à jour des privilèges utilisateur',
                        date: "Aujourd'hui, 08:30 • ID Action: #8821",
                        primary: true,
                      },
                      {
                        title: 'Validation du rapport mensuel',
                        date: 'Hier, 16:45 • ID Action: #8815',
                        primary: false,
                      },
                      {
                        title: 'Changement du mot de passe root',
                        date: '22 Mai 2024, 11:20 • ID Action: #8802',
                        primary: false,
                      },
                    ].map(({ title, date, primary }) => (
                      <div key={title} className="flex items-start gap-5 pl-10 relative">
                        {/* Dot */}
                        <div
                          className="absolute left-0 w-6 h-6 rounded-full border-4
                                     border-white flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: primary
                              ? 'rgba(0,35,149,0.15)'
                              : '#e2e8f0',
                            top: '2px',
                          }}
                        >
                          <div
                            className="rounded-full"
                            style={{
                              width: primary ? '8px' : '6px',
                              height: primary ? '8px' : '6px',
                              backgroundColor: primary ? '#002395' : '#94a3b8',
                            }}
                          />
                        </div>

                        {/* Texte */}
                        <div>
                          <p className="text-sm font-bold text-slate-900">{title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite (1/3) */}
            <div className="space-y-6">

              {/* Analytics bleu */}
              <div
                className="rounded-2xl p-6 text-white space-y-6"
                style={{
                  backgroundColor: '#002395',
                  boxShadow: '0 10px 25px rgba(0,35,149,0.2)',
                }}
              >
                <h4 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">analytics</span>
                  Gestion Analytics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Actions ce mois', value: '154' },
                    { label: 'Erreurs résolues', value: '12' },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >
                      <p className="text-xs mb-1" style={{ opacity: 0.7 }}>{label}</p>
                      <p className="text-2xl font-black">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span>Utilisation des ressources</span>
                    <span>64%</span>
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    <div className="h-full bg-white" style={{ width: '64%' }} />
                  </div>
                </div>
              </div>

              {/* Sécurité du Compte */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200
                              p-6 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  SÉCURITÉ DU COMPTE
                </h4>

                {/* 2FA */}
                <div className="flex items-center justify-between p-3 rounded-xl
                                bg-green-50 border border-green-100">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-600">
                      verified
                    </span>
                    <div>
                      <p className="text-xs font-bold text-green-900">2FA Activé</p>
                      <p className="text-[10px] text-green-700">Via Application Auth</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-green-600">
                    check_circle
                  </span>
                </div>

                {/* Dernier audit */}
                <div
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(0,35,149,0.05)',
                    border: '1px solid rgba(0,35,149,0.1)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#002395' }}
                    >
                      security_update_warning
                    </span>
                    <div>
                      <p className="font-medium text-sm" style={{ color: '#002395' }}>
                        Dernier audit
                      </p>
                      <p className="text-[10px]" style={{ color: 'rgba(0,35,149,0.7)' }}>
                        Il y a 3 jours
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-[10px] font-bold underline"
                    style={{ color: '#002395' }}
                  >
                    Relancer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTENU: Accès & Rôles ───────────────────────────────── */}
        {activeTab === 'acces' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200
                          p-12 text-center text-slate-400">
            <span className="material-symbols-outlined text-5xl block mb-3">key</span>
            <p className="font-semibold">Accès &amp; Rôles</p>
            <p className="text-sm mt-1">Gestion des permissions et rôles.</p>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default AdminProfilPage;