import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const piecesDefaut = [
  { id: 1, nom: 'CNIB / Passeport',      desc: 'Copie numérisée obligatoire', checked: true  },
  { id: 2, nom: 'Ancien Acte',           desc: 'Pour renouvellement',          checked: false },
  { id: 3, nom: 'Timbre Fiscal',         desc: 'Version numérique',            checked: false },
  { id: 4, nom: 'Justificatif de Domicile', desc: 'Facture SONABEL/ONEA',      checked: false },
];

const AdminAjouterDocumentPage = () => {
  const [nomDoc,      setNomDoc]      = useState('');
  const [service,     setService]     = useState('');
  const [cout,        setCout]        = useState('');
  const [delai,       setDelai]       = useState('');
  const [mode,        setMode]        = useState('online');
  const [pieces,      setPieces]      = useState(piecesDefaut);
  const [visibilite,  setVisibilite]  = useState(false);
  const [paiement,    setPaiement]    = useState(true);
  const [signature,   setSignature]   = useState(true);

  const togglePiece = (id) =>
    setPieces((prev) => prev.map((p) => p.id === id ? { ...p, checked: !p.checked } : p));

  // Toggle switch
  const Toggle = ({ value, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      style={{ backgroundColor: value ? '#002395' : '#e2e8f0' }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
        style={{ transform: value ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  );

  return (
    <Layout>
      <div className="p-6 md:p-10 w-full max-w-7xl mx-auto">

        {/* ── BREADCRUMB ──────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-6 uppercase tracking-widest">
          <Link className="hover:text-slate-600 transition-colors" to="/admin/systeme">Système</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link className="hover:text-slate-600 transition-colors" to="/admin/ressources">
            Gestion des documents
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span style={{ color: '#002395' }}>Nouveau document</span>
        </nav>

        {/* ── TITRE + BOUTONS ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Ajouter un Nouveau Document
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Configurez un nouveau type de document officiel pour le portail citoyen.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700
                         font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white
                         font-bold text-sm transition-all hover:opacity-90"
              style={{
                backgroundColor: '#002395',
                boxShadow: '0 4px 12px rgba(0,35,149,0.25)',
              }}
            >
              <span className="material-symbols-outlined text-lg">save</span>
              Enregistrer le document
            </button>
          </div>
        </div>

        {/* ── GRID : Formulaire + Sidebar ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Formulaire (2/3) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Informations Générales */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h3
                className="text-lg font-bold mb-6 flex items-center gap-2"
                style={{ color: '#002395' }}
              >
                <span className="material-symbols-outlined">info</span>
                Informations Générales
              </h3>

              {/* Nom du document */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nom du Document
                </label>
                <input
                  className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm
                             text-slate-900 outline-none focus:border-blue-400 transition-all"
                  placeholder="ex: Extrait d'acte de naissance"
                  value={nomDoc}
                  onChange={(e) => setNomDoc(e.target.value)}
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Service associé */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Associé
                  </label>
                  <select
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm
                               text-slate-900 outline-none bg-white focus:border-blue-400 transition-all"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">Sélectionner un service</option>
                    <option value="mairie">Mairie / État Civil</option>
                    <option value="justice">Justice</option>
                    <option value="police">Police Nationale</option>
                    <option value="immigration">Immigration</option>
                  </select>
                </div>

                {/* Coût */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Coût (FCFA)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-12 rounded-xl border border-slate-200 px-4 pr-16 text-sm
                                 text-slate-900 outline-none focus:border-blue-400 transition-all"
                      placeholder="ex: 500"
                      value={cout}
                      onChange={(e) => setCout(e.target.value)}
                      type="number"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400
                                     font-bold text-xs">
                      FCFA
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Délai */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Délai de Délivrance Estimé
                  </label>
                  <input
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm
                               text-slate-900 outline-none focus:border-blue-400 transition-all"
                    placeholder="ex: 48 Heures"
                    value={delai}
                    onChange={(e) => setDelai(e.target.value)}
                    type="text"
                  />
                </div>

                {/* Mode délivrance */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mode de Délivrance
                  </label>
                  <div className="flex items-center gap-6 h-12">
                    {[
                      { v: 'online', l: 'En ligne'     },
                      { v: 'semi',   l: 'Semi-en ligne' },
                    ].map(({ v, l }) => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mode"
                          value={v}
                          checked={mode === v}
                          onChange={() => setMode(v)}
                          className="accent-blue-700"
                        />
                        <span className="text-sm font-medium text-slate-700">{l}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pièces Jointes Requises */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h3
                className="text-lg font-bold mb-2 flex items-center gap-2"
                style={{ color: '#002395' }}
              >
                <span className="material-symbols-outlined">attach_file</span>
                Pièces Jointes Requises
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Sélectionnez les documents que l'usager doit fournir pour sa demande.
              </p>

              {/* Grille de checkboxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                {pieces.map(({ id, nom, desc, checked }) => (
                  <div
                    key={id}
                    onClick={() => togglePiece(id)}
                    className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer
                               transition-all hover:bg-slate-50"
                    style={{
                      borderColor: checked ? '#002395' : '#e2e8f0',
                      backgroundColor: checked ? 'rgba(0,35,149,0.03)' : '#fff',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        backgroundColor: checked ? '#002395' : '#fff',
                        border: checked ? 'none' : '2px solid #cbd5e1',
                      }}
                    >
                      {checked && (
                        <span className="material-symbols-outlined text-white" style={{ fontSize: 14 }}>
                          check
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{nom}</p>
                      <p className="text-xs text-slate-400">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ajouter une pièce */}
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-bold hover:opacity-75 transition-opacity"
                style={{ color: '#002395' }}
              >
                <span className="material-symbols-outlined">add_circle</span>
                Ajouter un nouveau type de pièce
              </button>
            </div>
          </div>

          {/* ── SIDEBAR DROITE (1/3) ──────────────────────────────────── */}
          <div className="space-y-5">

            {/* Aperçu Citoyen */}
            <div
              className="rounded-2xl p-6 text-white space-y-4"
              style={{ backgroundColor: '#002395' }}
            >
              <h3 className="text-lg font-black">Aperçu Citoyen</h3>
              <div
                className="rounded-xl p-4 space-y-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  Document
                </p>
                <p className="font-black text-lg leading-tight">
                  {nomDoc || 'Nom du document...'}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Coût</span>
                  <span className="font-bold">
                    {cout ? `${parseInt(cout).toLocaleString('fr-FR')} FCFA` : '--- FCFA'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Délai</span>
                  <span className="font-bold">{delai || '---'}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    Public
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    Numérique
                  </span>
                </div>
              </div>
            </div>

            {/* Statut du Document */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900">Statut du Document</h3>

              {[
                { label: 'Visibilité publique',    value: visibilite,  onChange: setVisibilite  },
                { label: 'Activer le paiement mobile', value: paiement, onChange: setPaiement },
                { label: 'Signature électronique', value: signature,   onChange: setSignature   },
              ].map(({ label, value, onChange }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">{label}</span>
                  <Toggle value={value} onChange={onChange} />
                </div>
              ))}

              {/* Info box */}
              <div
                className="mt-2 p-3 rounded-xl flex items-start gap-3"
                style={{ backgroundColor: 'rgba(0,35,149,0.05)', border: '1px solid rgba(0,35,149,0.1)' }}
              >
                <span
                  className="material-symbols-outlined shrink-0"
                  style={{ color: '#002395', fontSize: 18 }}
                >
                  lightbulb
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Les documents en ligne nécessitent une validation préalable de la Direction Générale
                  des Services Numériques (DGSN).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-center items-center gap-6 text-slate-400 text-xs">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">help_outline</span>
            Besoin d'aide ? Consulter le guide d'administration
          </div>
          <div className="w-1 h-1 bg-slate-300 rounded-full" />
          <div className="font-bold" style={{ color: '#002395' }}>
            Portail National de l'Administration Electronique
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default AdminAjouterDocumentPage;