import React from 'react';

/**
 * Main Application Component
 * This component will handle the primary routing once the router is setup.
 * For now, it serves as the entry point for the landing page.
 */
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation placeholder */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 lg:px-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
             <span className="material-symbols-outlined">description</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 tracking-tighter">E-Gov</span>
            <span className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-primary/80">Burkina Faso</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Accueil</a>
          <a href="#" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Vos Démarches</a>
          <a href="#" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Support</a>
        </nav>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-bold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
            Connexion
          </button>
          <button className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            S'inscrire
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="px-6 py-20 bg-gradient-to-b from-white to-slate-50 lg:px-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Plateforme Officielle
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Gérez vos documents administratifs <span className="text-primary italic">en un clic.</span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              La plateforme moderne pour demander, suivre et recevoir vos actes officiels en toute sécurité depuis chez vous.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group">
                Commencer une demande
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
                Comment ça marche ?
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-100">
        &copy; {new Date().getFullYear()} E-Gov Burkina Faso. Tous droits réservés.
      </footer>
    </div>
  );
}

export default App;
