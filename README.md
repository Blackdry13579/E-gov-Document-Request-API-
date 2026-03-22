# 🏛️ E-Gov Document Platform — Frontend Web

> **Interface citoyenne et agent** pour la modernisation des services administratifs au Burkina Faso.

---

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

## 🌟 Présentation

Ce dépôt contient l'intégralité de la partie **Frontend Web** de la plateforme E-Gov Document. Conçu avec une approche **Pixel Perfect** et une expérience utilisateur fluide, il permet aux citoyens de soumettre et suivre leurs demandes de documents administratifs en toute simplicité.

### ✨ Points Forts
- 🎨 **Design System Unique** : Inspiré par les couleurs nationales du Burkina Faso.
- 📱 **Fully Responsive** : Une expérience optimisée du mobile au desktop.
- ⚡ **Performance** : Build ultra-rapide avec Vite et gestion d'état optimisée.
- 🔐 **Sécurité** : Routes protégées et gestion rigoureuse des jetons d'authentification.

---

## 📂 Structure du Projet

```text
.
├── src/
│   ├── components/     # Composants UI (Header, Sidebar, Button, etc.)
│   ├── context/        # Contextes React (Auth, Notifications)
│   ├── pages/          # Pages de l'application (Citoyen & Agent)
│   ├── services/       # Couche de communication avec l'API
│   ├── utils/          # Fonctions utilitaires et constantes
│   └── App.jsx         # Point d'entrée principal
├── public/             # Assets statiques
└── index.html          # Template HTML principal
```

---

## 🚀 Installation & Lancement

### 1. Prérequis
- Node.js (v18+)
- npm ou yarn

### 2. Configuration
Clonez le dépôt et installez les dépendances :
```bash
npm install
```

Créez un fichier `.env` à la racine :
```env
VITE_API_URL=votre_url_api_ici
```

### 3. Développement
Lancez le serveur de développement :
```bash
npm run dev
```

---

## 🛠️ Stack Technique

| Technologie | Usage |
| :--- | :--- |
| **React 18** | Bibliothèque UI principale |
| **Vite** | Outil de build et serveur de dev |
| **Tailwind CSS** | Framework CSS utilitaire |
| **React Router** | Gestion de la navigation |
| **Axios** | Client HTTP pour l'API |
| **Lucide React** | Bibliothèque d'icônes modern |

---

## 📈 État d'avancement

- [x] Authentification (Login / Inscription)
- [x] Dashboard Citoyen
- [x] Dashboard Agent
- [x] Gestion des demandes (Liste, Détails, Création)
- [x] Système de notifications en temps réel
- [x] Profil utilisateur et paramètres

---

> [!NOTE]
> Ce projet fait partie d'une solution globale incluant un Backend Node.js et une application Mobile Flutter.
