# E-Gov Document Platform — Frontend Web

Interface citoyenne moderne pour la demande et le suivi de documents administratifs au Burkina Faso.

## 🚀 Technologies

- **Core:** React 18 + Vite
- **Styling:** Tailwind CSS v4 (Design System customisé)
- **Navigation:** React Router 6 (Routes protégées)
- **State Management:** React Context (Auth, Notifications)
- **Icons:** Material Symbols & Lucide React
- **Animations:** Framer Motion

## 📂 Structure du Projet

```text
src/
├── components/     # Composants UI atomiques et Layouts
├── context/        # États globaux (Auth, Notif)
├── pages/          # Pages de l'application
├── services/       # Appels API (Axios)
├── utils/          # Constantes et formateurs
├── App.jsx         # Structure globale
├── Router.jsx      # Configuration des routes
└── index.css       # Design System Tailwind v4
```

## 🛠️ Installation

1. Installer les dépendances :
```bash
npm install
```

2. Configurer les variables d'environnement :
Créer un fichier `.env` à la racine :
```env
VITE_API_URL=http://localhost:3000/api
```

3. Lancer en mode développement :
```bash
npm run dev
```

## ✨ Fonctionnalités Implémentées

- [x] Landing Page Premium
- [x] Authentification complète (Login/Register)
- [x] Gestion des états d'authentification et routes protégées
- [x] Tableau de bord citoyen avec statistiques
- [x] Liste des demandes avec filtres
- [x] Formulaire dynamique multi-étapes pour nouvelle demande
- [x] Chargement de fichiers justificatifs
- [x] Suivi détaillé d'une demande avec historique
- [x] Interface de profil et notifications
- [x] Design System unifié (Burkina Faso Palette)
