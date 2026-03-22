import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const AdminAjouterAgentPage = () => {
  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">

        {/* ── HEADER ──────────────────────────────────────────────────── */}
        <header className="mb-8">
          <nav className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-4 uppercase tracking-widest">
            <Link className="hover:text-slate-600 transition-colors" to="/admin/dashboard">Accueil</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <Link className="hover:text-slate-600 transition-colors" to="/admin/systeme">Système</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <Link className="hover:text-slate-600 transition-colors" to="/admin/ressources">Agents</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span style={{ color: '#002395' }}>Nouveau</span>
          </nav>

          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Ajouter un Nouvel Agent
              </h2>
              <p className="text-slate-500 mt-1">
                Créez un compte sécurisé pour un agent de l'administration publique.
              </p>
            </div>
            <div
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border"
              style={{
                backgroundColor: 'rgba(0,35,149,0.05)',
                borderColor: 'rgba(0,35,149,0.1)',
              }}
            >
              <span className="material-symbols-outlined" style={{ color: '#002395', fontSize: 20 }}>
                verified_user
              </span>
              <span className="text-xs font-bold uppercase" style={{ color: '#002395' }}>
                Portail Sécurisé
              </span>
            </div>
          </div>
        </header>

        {/* ── FORMULAIRE ──────────────────────────────────────────────── */}
        <form className="space-y-8">

          {/* ── SECTION 1 ───────────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="material-symbols-outlined" style={{ color: '#002395' }}>person</span>
              <h3 className="text-lg font-bold text-slate-800">1. Informations Personnelles</h3>
            </div>

            <div className="p-8">
              {/* Photo upload — dimensions fixes avec inline styles */}
              <div className="flex items-center gap-6 pb-6 mb-6 border-b border-slate-100">
                {/* Cercle photo : 96×96px strict */}
                <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
                  <div
                    style={{
                      width: 96, height: 96,
                      borderRadius: '50%',
                      backgroundColor: '#f1f5f9',
                      border: '2px dashed #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 36, color: '#94a3b8' }}>
                      add_a_photo
                    </span>
                  </div>
                  {/* Bouton edit superposé en bas à droite */}
                  <button
                    type="button"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: '#002395',
                      color: '#fff',
                      border: '2px solid #fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>edit</span>
                  </button>
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-700">Photo de profil</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    PNG, JPG jusqu'à 2MB. Format carré recommandé.
                  </p>
                </div>
              </div>

              {/* Champs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nom complet</label>
                  <input
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm
                               text-slate-900 outline-none focus:border-blue-400 bg-white"
                    placeholder="Ex: Moussa Ouédraogo"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email professionnel</label>
                  <input
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm
                               text-slate-900 outline-none focus:border-blue-400 bg-white"
                    placeholder="m.ouedraogo@egov.bf"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Téléphone</label>
                  <div className="relative">
                    <span
                      className="absolute inset-y-0 left-0 pl-4 flex items-center
                                 text-slate-500 font-medium text-sm pointer-events-none"
                    >
                      +226
                    </span>
                    <input
                      className="w-full h-12 pl-14 rounded-xl border border-slate-200 text-sm
                                 text-slate-900 outline-none focus:border-blue-400 bg-white"
                      placeholder="XX XX XX XX"
                      type="tel"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── SECTION 2 ───────────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="material-symbols-outlined" style={{ color: '#002395' }}>account_balance</span>
              <h3 className="text-lg font-bold text-slate-800">2. Affectation Administrative</h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Ministère / Institution</label>
                <select className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm
                                   text-slate-900 outline-none bg-white focus:border-blue-400">
                  <option value="">Sélectionner une institution</option>
                  <option>Ministère de l'Économie et des Finances</option>
                  <option>Ministère de la Justice</option>
                  <option>Ministère de la Défense</option>
                  <option>Ministère de l'Administration Territoriale</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Service / Département</label>
                <select className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm
                                   text-slate-900 outline-none bg-white focus:border-blue-400">
                  <option value="">Sélectionner un service</option>
                  <option>Mairie</option>
                  <option>Police Nationale</option>
                  <option>Gendarmerie Nationale</option>
                  <option>Tribunal de Grande Instance</option>
                  <option>Douanes</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Rôle d'accès</label>
                <select className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm
                                   text-slate-900 outline-none bg-white focus:border-blue-400">
                  <option value="agent">Agent d'exécution</option>
                  <option value="supervisor">Superviseur</option>
                  <option value="admin">Administrateur Système</option>
                  <option value="director">Directeur de service</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Grade / Fonction</label>
                <input
                  className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm
                             text-slate-900 outline-none focus:border-blue-400 bg-white"
                  placeholder="Ex: Inspecteur principal"
                  type="text"
                />
              </div>
            </div>
          </section>

          {/* ── SECTION 3 ───────────────────────────────────────────── */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <span className="material-symbols-outlined" style={{ color: '#002395' }}>security</span>
              <h3 className="text-lg font-bold text-slate-800">3. Identifiants de connexion</h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Matricule</label>
                <input
                  className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm
                             text-slate-900 outline-none focus:border-blue-400 bg-white"
                  placeholder="Ex: AG-74829-BF"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Mot de passe temporaire</label>
                <div className="relative">
                  <input
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm
                               text-slate-500 cursor-not-allowed bg-slate-50"
                    readOnly
                    type="password"
                    value="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center font-bold
                               text-xs uppercase hover:underline"
                    style={{ color: '#002395' }}
                  >
                    Générer
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">
                  Le mot de passe sera envoyé par email sécurisé.
                </p>
              </div>
            </div>
          </section>

          {/* ── BOUTONS ─────────────────────────────────────────────── */}
          <div className="flex items-center justify-end gap-4 pt-2 pb-8">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-3.5 rounded-xl border border-slate-200 text-slate-600
                         font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-10 py-3.5 rounded-xl text-white font-bold text-sm
                         flex items-center gap-2 transition-all hover:opacity-90"
              style={{
                backgroundColor: '#002395',
                boxShadow: '0 4px 12px rgba(0,35,149,0.25)',
              }}
            >
              <span className="material-symbols-outlined">save</span>
              Créer le compte
            </button>
          </div>
        </form>

        {/* ── FOOTER INSTITUTIONNEL ───────────────────────────────────── */}
        <footer className="pb-12 flex flex-col items-center gap-3 opacity-40 hover:opacity-60 transition-opacity cursor-default">
          <div className="text-center">
            <p className="text-xs font-black tracking-widest uppercase text-slate-600">
              Unité • Progrès • Justice
            </p>
            <p className="text-[10px] font-medium text-slate-500">République du Burkina Faso</p>
          </div>
        </footer>

      </div>
    </Layout>
  );
};

export default AdminAjouterAgentPage;