import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
 return (
 <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-white text-slate-900 font-sans">
 <div className="layout-container flex h-full grow flex-col">
 <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-6 py-4 lg:px-20 bg-white/80 backdrop-blur-md sticky top-0 z-50">
 <div className="flex items-center gap-3 group cursor-pointer">
 <div className="flex items-center justify-center size-12 rounded-xl bg-white shadow-md border border-slate-100 transition-transform group-hover:scale-105 overflow-hidden p-1">
 <img alt="Emblème Burkina Faso"className="w-full h-full object-contain"src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Coat_of_arms_of_Burkina_Faso.svg/1200px-Coat_of_arms_of_Burkina_Faso.svg.png"/>
 </div>
 <div className="flex flex-col">
 <div className="flex items-center gap-1.5">
 <span className="text-2xl font-black text-slate-900 tracking-tighter">E-Gov</span>
 <div className="flex gap-0.5">
 <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <div className="h-[2px] w-4 bg-primary/30 rounded-full"></div>
 <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary/80">Burkina Faso</span>
 </div>
 </div>
 </div>
 <div className="flex flex-1 justify-end gap-8 items-center">
 <nav className="hidden md:flex items-center gap-8">
 <Link className="text-slate-600 text-sm font-semibold hover:text-primary transition-colors"to="/">Accueil</Link>
 <Link className="text-slate-600 text-sm font-semibold hover:text-primary transition-colors"to="#">Vos Démarches</Link>
 <Link className="text-slate-600 text-sm font-semibold hover:text-primary transition-colors"to="#">Support</Link>
 </nav>
 <div className="flex gap-3">
 <Link to="/login">
 <button className="hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all">
 <span>Connexion</span>
 </button>
 </Link>
 <Link to="/register">
 <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
 <span>S'inscrire</span>
 </button>
 </Link>
 </div>
 </div>
 </header>

 <main className="flex-1">
 <div className="px-6 lg:px-20 py-12 lg:py-24 bg-gradient-to-b from-white to-slate-50">
 <div className="max-w-7xl mx-auto">
 <div className="grid lg:grid-cols-2 gap-16 items-center">
 <div className="flex flex-col gap-8">
 <div className="flex flex-col gap-6">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
 <span className="relative flex h-2 w-2">
 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
 <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
 </span>
 Service Public Officiel
 </div>
 <h1 className="text-slate-900 text-4xl lg:text-6xl font-black leading-tight tracking-tight">
 Vos services publics en <span className="text-primary">un seul clic</span>
 </h1>
 <p className="text-slate-600 text-lg lg:text-xl font-normal leading-relaxed">
 Obtenez vos documents officiels (CNIB, actes d'état civil, casier judiciaire) en ligne. Une administration moderne et rapide pour tous les citoyens.
 </p>
 </div>
 <div className="flex flex-col gap-3 w-full max-w-lg">
 <div className="relative flex items-center w-full">
 <div className="absolute left-4 text-slate-400">
 <span className="material-symbols-outlined">search</span>
 </div>
 <input className="w-full pl-12 pr-32 py-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm text-slate-900 placeholder:text-slate-400"placeholder="Que recherchez-vous ?"/>
 <button className="absolute right-2 bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all">
 Chercher
 </button>
 </div>
 <p className="text-xs text-slate-500 px-2">Exemples : <span className="text-primary font-medium">Extrait de naissance, Casier judiciaire, IFU</span></p>
 </div>
 </div>
 <div className="relative h-[450px] lg:h-[550px] rounded-2xl overflow-hidden shadow-2xl border border-white">
 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
 <img alt="Monument aux Héros Nationaux à Ouagadougou"className="w-full h-full object-cover"src="https://lh3.googleusercontent.com/aida-public/AB6AXuALoAHQ_CjZkvHjc0-tK2VyGLjcBVfZXu05GmPBg_AC9Ig0TM-VysbaFa2PY8mRtXy1SqlxAMEZoIV55oCsfZO-vRfQ-qpnZumWxtZOeUhmZg2nJt_eCM9TMTXPq_kNg1OnvmuGuh8h5rTb8whEMzzYtdoNMuAHwy_ssmy67UjKTktB6ZmvTSBmwOidrAZCIz7RVwYFjUlOX_n47Na5ex8VnlZRfqxPAvs0_J6SJrURBHfFAhEK2apVqNOv8a-kS5nxSJ_f0VtJ9jL5"/>
 <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/95 backdrop-blur-md p-5 rounded-xl flex items-center gap-4 border border-slate-100 shadow-xl">
 <div className="size-12 rounded-full bg-secondary flex items-center justify-center text-white shrink-0 shadow-lg shadow-secondary/20">
 <span className="material-symbols-outlined">account_balance</span>
 </div>
 <p className="text-sm font-semibold text-slate-800 leading-tight">Le Burkina Faso avance vers une transformation numérique souveraine et inclusive.</p>
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white py-24 px-6 lg:px-20">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-20">
 <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Pourquoi utiliser E-Gov ?</h2>
 <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
 <p className="text-slate-600 max-w-2xl mx-auto text-lg">Gagnez du temps et évitez les déplacements inutiles grâce à notre portail sécurisé.</p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 <div className="group p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary/30 hover:shadow-xl transition-all duration-300">
 <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
 <span className="material-symbols-outlined text-3xl">schedule</span>
 </div>
 <h3 className="text-xl font-bold mb-4 text-slate-900">Gain de temps</h3>
 <p className="text-slate-600 leading-relaxed">Faites vos demandes en 5 minutes depuis chez vous, sans faire la queue dans les bureaux.</p>
 </div>
 <div className="group p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-secondary/30 hover:shadow-xl transition-all duration-300">
 <div className="size-14 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
 <span className="material-symbols-outlined text-3xl">lock_person</span>
 </div>
 <h3 className="text-xl font-bold mb-4 text-slate-900">Sécurité Totale</h3>
 <p className="text-slate-600 leading-relaxed">Vos données personnelles sont protégées par les plus hauts standards de cybersécurité nationaux.</p>
 </div>
 <div className="group p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-accent/30 hover:shadow-xl transition-all duration-300">
 <div className="size-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
 <span className="material-symbols-outlined text-3xl">verified</span>
 </div>
 <h3 className="text-xl font-bold mb-4 text-slate-900">Authenticité</h3>
 <p className="text-slate-600 leading-relaxed">Chaque document numérique possède un code QR infalsifiable pour une vérification immédiate.</p>
 </div>
 </div>
 </div>
 </div>

 <div className="px-6 lg:px-20 py-20 bg-slate-50">
 <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative min-h-[500px] flex items-center shadow-2xl border border-white">
 <img alt="Place de la Nation, Ouagadougou"className="absolute inset-0 w-full h-full object-cover"src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjYiUQz7gPoko5mJSFgjUyO1fhRXXmqpzpAKa1XQZGF3vpGtxbZ3Gbwh6YUCxXd5TpeBSX-CX6otlphBgnrwKNV4yoroHLT6UdDa0MW86rVpxUu9zMztyhOPCdMWPk3XV8iyztU4FuhbfOl5hge-KaoUzvxiEXPEuzHgTgnaxzj6T4hlhmbD74jUA5LWtIJnbmPvE-PrMdDWaaYznc01Ockard5X11I8ygbcXyYHCtP2kid-8Phn8ecbtxUhFyCkjzM3TuUnt4ZHrX"/>
 <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
 <div className="relative z-10 px-8 lg:px-20 max-w-2xl text-white">
 <div className="mb-6 flex gap-2">
 <span className="w-12 h-1 bg-secondary rounded-full"></span>
 <span className="w-4 h-1 bg-white/40 rounded-full"></span>
 </div>
 <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">Une administration au service du Peuple.</h2>
 <p className="text-xl opacity-90 mb-10 leading-relaxed font-light">"L'innovation numérique est le levier de notre développement et de notre indépendance."</p>
 <button className="bg-primary text-white px-8 py-4 rounded-lg font-extrabold shadow-xl hover:bg-primary/90 transition-all flex items-center gap-2 group">
 Découvrir nos missions
 <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
 </button>
 </div>
 </div>
 </div>

 <div className="py-24 px-6 lg:px-20 bg-white">
 <div className="max-w-7xl mx-auto">
 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
 <div className="max-w-xl">
 <h2 className="text-4xl font-black text-slate-900 mb-4">Parcourez nos services</h2>
 <p className="text-slate-600 text-lg">Trouvez rapidement la démarche qu'il vous faut selon votre situation.</p>
 </div>
 <a className="text-primary font-bold flex items-center gap-2 hover:underline transition-all"href="#">Catalogue complet <span className="material-symbols-outlined">chevron_right</span></a>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
 <div className="bg-slate-50 p-8 rounded-2xl flex items-start gap-5 border border-slate-100 hover:border-primary hover:bg-white hover:shadow-lg transition-all group cursor-pointer">
 <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all">
 <span className="material-symbols-outlined text-2xl">badge</span>
 </div>
 <div>
 <h4 className="font-bold text-lg mb-2 text-slate-900">Identité</h4>
 <p className="text-sm text-slate-600 leading-relaxed">Demande de CNIB, Passeport, et renouvellements.</p>
 </div>
 </div>
 <div className="bg-slate-50 p-8 rounded-2xl flex items-start gap-5 border border-slate-100 hover:border-secondary hover:bg-white hover:shadow-lg transition-all group cursor-pointer">
 <div className="size-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
 <span className="material-symbols-outlined text-2xl">family_restroom</span>
 </div>
 <div>
 <h4 className="font-bold text-lg mb-2 text-slate-900">État Civil</h4>
 <p className="text-sm text-slate-600 leading-relaxed">Actes de naissance, de mariage et de décès.</p>
 </div>
 </div>
 <div className="bg-slate-50 p-8 rounded-2xl flex items-start gap-5 border border-slate-100 hover:border-accent hover:bg-white hover:shadow-lg transition-all group cursor-pointer">
 <div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-white transition-all">
 <span className="material-symbols-outlined text-2xl">gavel</span>
 </div>
 <div>
 <h4 className="font-bold text-lg mb-2 text-slate-900">Justice</h4>
 <p className="text-sm text-slate-600 leading-relaxed">Casier judiciaire et Certificat de nationalité.</p>
 </div>
 </div>
 <div className="bg-slate-50 p-8 rounded-2xl flex items-start gap-5 border border-slate-100 hover:border-primary hover:bg-white hover:shadow-lg transition-all group cursor-pointer">
 <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all">
 <span className="material-symbols-outlined text-2xl">storefront</span>
 </div>
 <div>
 <h4 className="font-bold text-lg mb-2 text-slate-900">Entreprise</h4>
 <p className="text-sm text-slate-600 leading-relaxed">Création d'entreprise, IFU et agréments.</p>
 </div>
 </div>
 <div className="bg-slate-50 p-8 rounded-2xl flex items-start gap-5 border border-slate-100 hover:border-secondary hover:bg-white hover:shadow-lg transition-all group cursor-pointer">
 <div className="size-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
 <span className="material-symbols-outlined text-2xl">landscape</span>
 </div>
 <div>
 <h4 className="font-bold text-lg mb-2 text-slate-900">Foncier</h4>
 <p className="text-sm text-slate-600 leading-relaxed">Titres fonciers et autorisations de construire.</p>
 </div>
 </div>
 <div className="bg-slate-50 p-8 rounded-2xl flex items-start gap-5 border border-slate-100 hover:border-accent hover:bg-white hover:shadow-lg transition-all group cursor-pointer">
 <div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent group-hover:text-white transition-all">
 <span className="material-symbols-outlined text-2xl">school</span>
 </div>
 <div>
 <h4 className="font-bold text-lg mb-2 text-slate-900">Éducation</h4>
 <p className="text-sm text-slate-600 leading-relaxed">Diplômes, bourses et concours nationaux.</p>
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="px-6 lg:px-20 py-24 bg-slate-50">
 <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
 <div className="lg:w-1/2 order-2 lg:order-1">
 <h2 className="text-4xl lg:text-5xl font-black mb-8 text-slate-900 leading-tight">Pour tous les Burkinabè, partout.</h2>
 <p className="text-xl text-slate-600 mb-8 leading-relaxed">
 Que vous soyez à Ouagadougou, Bobo-Dioulasso ou à l'étranger, accédez aux services de l'État en toute simplicité. Notre mission est de rendre l'administration plus humaine grâce au digital.
 </p>
 <ul className="flex flex-col gap-5 mb-10">
 <li className="flex items-center gap-4 text-slate-700">
 <div className="bg-primary/10 p-1.5 rounded-full shrink-0">
 <span className="material-symbols-outlined text-primary text-sm font-bold">check</span>
 </div>
 <span className="text-lg">Simple d'utilisation pour tout le monde.</span>
 </li>
 <li className="flex items-center gap-4 text-slate-700">
 <div className="bg-secondary/10 p-1.5 rounded-full shrink-0">
 <span className="material-symbols-outlined text-secondary text-sm font-bold">check</span>
 </div>
 <span className="text-lg">Suivi de vos dossiers par SMS et e-mail.</span>
 </li>
 <li className="flex items-center gap-4 text-slate-700">
 <div className="bg-accent/10 p-1.5 rounded-full shrink-0">
 <span className="material-symbols-outlined text-accent text-sm font-bold">check</span>
 </div>
 <span className="text-lg">Support disponible en plusieurs langues nationales.</span>
 </li>
 </ul>
 <Link to="/register">
 <button className="bg-primary text-white px-10 py-4 rounded-lg font-black shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all text-lg">Créer mon compte citoyen</button>
 </Link>
 </div>
 <div className="lg:w-1/2 order-1 lg:order-2">
 <div className="relative">
 <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
 <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] border border-white">
 <img alt="Paysage urbain moderne de Ouagadougou"className="w-full h-full object-cover"src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqK5mJcGxd9q-Jq9FiLiMmQ46p8kV2bnaZ4i1nE5hVksBnJb59qekufokMWIx1yC83wiETiXnFzvAvt30fRTrf3wrtK5v-ShQf0Hpnq7EnX_g_ypWkzdvvpCDuk_Bk8x7HvfT-HlRv_slAxbXXKYDnYnl4bQ6VIh7wKMHth2JuPyllkv3q-pYmNSfCowD3FX8hUOhgWfEybSVlDJJbmoOjZMmBZ4hAUYeDR9CHsjJNBSFYgJSq1BVy1cMV-qWNYHSsXYhrtRxDJzse"/>
 </div>
 </div>
 </div>
 </div>
 </div>
 </main>

 <footer className="bg-white border-t border-slate-200 px-6 lg:px-20 py-20">
 <div className="max-w-7xl mx-auto">
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
 <div className="col-span-2 lg:col-span-1">
 <div className="flex items-center gap-4 mb-8">
 <img alt="Emblème Burkina Faso"className="h-12 w-auto object-contain"src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Coat_of_arms_of_Burkina_Faso.svg/1200px-Coat_of_arms_of_Burkina_Faso.svg.png"/>
 <div>
 <h2 className="text-xl font-black tracking-tight text-slate-900">E-Gov</h2>
 <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Burkina Faso</p>
 </div>
 </div>
 <p className="text-slate-600 text-sm leading-relaxed mb-8">
 Plateforme numérique officielle du gouvernement pour faciliter les démarches administratives.
 </p>
 </div>
 <div>
 <h3 className="font-bold text-slate-900 mb-6 text-lg tracking-tight">Services</h3>
 <ul className="flex flex-col gap-4">
 <li><a className="text-slate-600 hover:text-primary transition-colors text-sm"href="#">État Civil</a></li>
 <li><a className="text-slate-600 hover:text-primary transition-colors text-sm"href="#">Identité</a></li>
 <li><a className="text-slate-600 hover:text-primary transition-colors text-sm"href="#">Entreprises</a></li>
 <li><a className="text-slate-600 hover:text-primary transition-colors text-sm"href="#">Foncier</a></li>
 <li><a className="text-slate-600 hover:text-primary transition-colors text-sm"href="#">Justice</a></li>
 </ul>
 </div>
 <div>
 <h3 className="font-bold text-slate-900 mb-6 text-lg tracking-tight">Ressources</h3>
 <ul className="flex flex-col gap-4">
 <li><a className="text-slate-600 hover:text-primary transition-colors text-sm"href="#">Tutoriels vidéos</a></li>
 <li><a className="text-slate-600 hover:text-primary transition-colors text-sm"href="#">FAQ (Foire Aux Questions)</a></li>
 <li><a className="text-slate-600 hover:text-primary transition-colors text-sm"href="#">Points relais certifiés</a></li>
 <li><a className="text-slate-600 hover:text-primary transition-colors text-sm"href="#">Textes de lois</a></li>
 </ul>
 </div>
 <div>
 <h3 className="font-bold text-slate-900 mb-6 text-lg tracking-tight">Nous contacter</h3>
 <ul className="flex flex-col gap-4 mb-8">
 <li className="flex items-start gap-3 text-slate-600 text-sm">
 <span className="material-symbols-outlined text-primary text-xl">location_on</span>
 <span>Ouaga 2000, Avenue de l'Indépendance<br />Ouagadougou, Burkina Faso</span>
 </li>
 <li className="flex items-center gap-3 text-slate-600 text-sm">
 <span className="material-symbols-outlined text-primary text-xl">call</span>
 <span>80 00 11 11 (Numéro Vert)</span>
 </li>
 <li className="flex items-center gap-3 text-slate-600 text-sm">
 <span className="material-symbols-outlined text-primary text-xl">mail</span>
 <span>support@egov.bf</span>
 </li>
 </ul>
 </div>
 </div>
 <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
 <p className="text-slate-500 text-sm">© 2024 Gouvernement du Burkina Faso. Tous droits réservés.</p>
 <div className="flex gap-6">
 <a className="text-sm text-slate-500 hover:text-primary transition-colors"href="#">Mentions Légales</a>
 <a className="text-sm text-slate-500 hover:text-primary transition-colors"href="#">Politique de Confidentialité</a>
 <a className="text-sm text-slate-500 hover:text-primary transition-colors"href="#">Accessibilité</a>
 </div>
 </div>
 <div className="mt-8 flex justify-center">
 <div className="flex h-1.5 w-32 rounded-full overflow-hidden">
 <div className="w-1/3 bg-secondary"></div>
 <div className="w-1/3 bg-accent"></div>
 <div className="w-1/3 bg-green-600"></div>
 </div>
 </div>
 </div>
 </footer>
 </div>
 </div>
 );
};

export default LandingPage;
