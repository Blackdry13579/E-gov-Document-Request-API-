import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Top Header */}
      <header className="main-header border-b backdrop-blur sticky-top">
        <div className="container flex justify-between items-center py-4">
          <div className="logo-group flex items-center gap-3">
            <div className="emblem-container bg-white shadow-md border rounded-xl p-1 overflow-hidden size-12 flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQXJybPNH4004ieJqy4yv_yu4-5EpOcSBSaOO_Hfn2Wj4YVRi-8XLAKhL6-XyL5A5sJK2Vutu2I6n13d96zWO5fvJ9PuiFacQ1QuvgWfxI-zSzWMUlEjw_y78QS0UNrzcx4D_yUORISSC3Asa6rus9dnL4ljwWwlroq8B0ZSYT-yPHMr0f-onXHJ2n04vyiPngxuSlYfv47ysGJO7jN-ltxiaK25fIqnnZh2rXmSZSVMpDIyXR3x1hd1A9bzZVc3hD7av06Lqz-rc" 
                alt="Burkina Faso Emblem"
                className="size-full object-contain"
              />
            </div>
            <div className="brand flex flex-col">
              <span className="text-2xl font-black text-slate-900 tracking-tighter">E-Gov</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">Burkina Faso</span>
            </div>
          </div>
          
          <nav className="nav-links hidden md-flex items-center gap-8">
            <Link to="/" className="text-slate-600 text-sm font-semibold hover:text-primary">Accueil</Link>
            <Link to="#" className="text-slate-600 text-sm font-semibold hover:text-primary">Vos Démarches</Link>
            <Link to="#" className="text-slate-600 text-sm font-semibold hover:text-primary">Support</Link>
          </nav>

          <div className="auth-actions flex gap-3">
            <Link to="/login">
              <Button variant="outline" className="hidden sm-flex min-w-[120px]">Connexion</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" className="min-w-[120px]">S'inscrire</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section py-24 bg-slate-50">
          <div className="container grid lg:grid-cols-2 gap-16 items-center">
            <div className="hero-content flex flex-col gap-8">
              <div className="badge-official inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                Service Public Officiel
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight text-slate-900 tracking-tight">
                Vos services publics en <span className="text-primary">un seul clic</span>
              </h1>
              <p className="text-slate-600 text-lg lg:text-xl leading-relaxed">
                Obtenez vos documents officiels (CNIB, actes d'état civil, casier judiciaire) en ligne. Une administration moderne et rapide pour tous les citoyens.
              </p>
              
              <div className="search-box relative max-w-lg w-full mt-4">
                <Input 
                  placeholder="Que recherchez-vous ?" 
                  icon="search"
                  className="mb-0"
                />
                <Button className="absolute-right-button">Chercher</Button>
              </div>
              <p className="text-xs text-slate-500 mt-2">Exemples : <span className="text-primary font-medium">Extrait de naissance, IFU</span></p>
            </div>
            
            <div className="hero-image-container relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-white border">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALoAHQ_CjZkvHjc0-tK2VyGLjcBVfZXu05GmPBg_AC9Ig0TM-VysbaFa2PY8mRtXy1SqlxAMEZoIV55oCsfZO-vRfQ-qpnZumWxtZOeUhmZg2nJt_eCM9TMTXPq_kNg1OnvmuGuh8h5rTb8whEMzzYtdoNMuAHwy_ssmy67UjKTktB6ZmvTSBmwOidrAZCIz7RVwYFjUlOX_n47Na5ex8VnlZRfqxPAvs0_J6SJrURBHfFAhEK2apVqNOv8a-kS5nxSJ_f0VtJ9jL5"
                alt="Burkina Faso Landmark"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur p-5 rounded-xl border border-slate-100 shadow-xl flex items-center gap-4">
                <div className="size-12 rounded-full bg-secondary flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-tight">
                  Le Burkina Faso avance vers une transformation numérique souveraine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="features-section py-24 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Pourquoi utiliser E-Gov ?</h2>
              <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
            </div>
            
            <div className="grid md-grid-cols-3 gap-8 text-center">
              <div className="feature-card p-8 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-3xl">schedule</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Gain de temps</h3>
                <p className="text-slate-600 text-sm">Fini les files d'attente. Vos démarches se font en quelques minutes depuis chez vous.</p>
              </div>
              
              <div className="feature-card p-8 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="size-14 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Sécurisé</h3>
                <p className="text-slate-600 text-sm">Vos données personnelles et paiements sont protégés par les standards de l'État.</p>
              </div>

              <div className="feature-card p-8 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="size-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Transparent</h3>
                <p className="text-slate-600 text-sm">Suivez l'avancement de votre dossier en temps réel avec des notifications par SMS.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="main-footer bg-slate-900 text-white py-12">
        <div className="container text-center">
          <p className="text-slate-400 text-sm">© 2024 République du Burkina Faso - Direction Générale de la Modernisation.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
