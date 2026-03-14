<div align="center">

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Burkina_Faso.svg/1200px-Flag_of_Burkina_Faso.svg.png" width="80" alt="Drapeau Burkina Faso"/>

# 🏛️ E-Gov Document Request Platform

### Plateforme numérique de demande de documents administratifs
**République du Burkina Faso**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.18+-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Flutter](https://img.shields.io/badge/Flutter-3+-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-En%20développement-orange?style=flat-square)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)]()

</div>

---

## 📖 À propos

**E-Gov Document** est une plateforme e-gouvernement qui permet aux citoyens burkinabè de demander leurs documents administratifs **entièrement en ligne**, sans file d'attente, sans déplacement.

Le citoyen remplit un formulaire, uploade ses pièces justificatives, paie via **Orange Money** ou **Moov Money**, et reçoit son document officiel en PDF directement sur son compte.

---

## 📄 Documents disponibles

| # | Document | Service | Délai |
|---|----------|---------|-------|
| 1 | 📋 Extrait acte de naissance | Mairie | 2 jours |
| 2 | 💍 Extrait acte de mariage | Mairie | 3 jours |
| 3 | 🕊️ Acte de décès | Mairie | 1 jour |
| 4 | ⚖️ Casier judiciaire B3 | Justice | 2 jours |
| 5 | 🇧🇫 Certificat de nationalité | Justice | 5 jours |

---

## 👥 Rôles du système

```
🧑 Citoyen          → Crée des demandes, paie, suit et télécharge ses documents
👮 Agent Mairie      → Traite les demandes d'état civil (naissance, mariage, décès)
⚖️  Agent Justice    → Traite les demandes judiciaires (casier, nationalité)
👔 Superviseur       → Supervise les agents de son service
🔧 Administrateur    → Gestion globale, stats, configuration système
```

---

## 🔄 Workflow d'une demande

```
📝 Citoyen remplit     💳 Paiement          👮 Agent traite
   le formulaire    →  Orange/Moov Money  →  la demande
        │                                        │
        ▼                                        ▼
   📁 Upload                           ✅ VALIDÉE → PDF généré
   des pièces                          ❌ REJETÉE → motif envoyé
   justificatives                      📎 COMPLÉMENT → docs manquants
```

---

## 🛠️ Stack technique

<div align="center">

| Couche | Technologie | Usage |
|--------|------------|-------|
| **API** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) | Serveur REST API |
| **Base de données** | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/-Mongoose-880000?logoColor=white) | Stockage données |
| **Auth** | ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white) ![bcrypt](https://img.shields.io/badge/-bcrypt-003A70?logoColor=white) | Authentification sécurisée |
| **Frontend Web** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) | Interface web |
| **Mobile** | ![Flutter](https://img.shields.io/badge/-Flutter-02569B?logo=flutter&logoColor=white) | Application mobile |
| **Fichiers** | ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?logo=cloudinary&logoColor=white) | Upload & stockage fichiers |
| **Paiement** | ![Orange Money](https://img.shields.io/badge/-Orange%20Money-FF6600?logoColor=white) ![Moov Money](https://img.shields.io/badge/-Moov%20Money-00A651?logoColor=white) | Paiement mobile |
| **Déploiement** | ![Render](https://img.shields.io/badge/-Render-46E3B7?logo=render&logoColor=black) ![Vercel](https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white) | Hébergement |

</div>

---

## 🏗️ Architecture du projet

```
E-gov-Document-Request-API/
│
├── 🔴 backend/              → API REST (NodeJS/Express)
│   └── src/
│       ├── config/          → MongoDB, Cloudinary, variables env
│       ├── models/          → 5 modèles Mongoose
│       ├── controllers/     → Logique métier
│       ├── routes/          → Endpoints API
│       ├── middleware/       → Auth JWT, rôles, validation
│       ├── utils/           → JWT, email, PDF, logger
│       └── templates/       → Templates documents officiels ⏳
│
├── 🔵 frontend-web/         → Interface React
├── 🟢 frontend-mobile/      → Application Flutter
├── 📦 common/               → Constantes et utilitaires partagés
├── 🎭 mock/                 → Mock API pour développement
└── 📚 docs/                 → Documentation technique
```

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- Git
- Compte [MongoDB Atlas](https://cloud.mongodb.com) (gratuit)
- Compte [Cloudinary](https://cloudinary.com) (gratuit)

### Installation

```bash
# 1. Cloner le projet
git clone https://github.com/Blackdry13579/E-gov-Document-Request-API-.git
cd E-gov-Document-Request-API-

# 2. Installer les dépendances backend
cd backend
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Remplir les variables dans .env

# 4. Démarrer le serveur
npm run dev
# API disponible sur http://localhost:3000
```

### Tester que l'API fonctionne
```bash
curl http://localhost:3000/api/health
# → { "success": true, "message": "API E-Gov OK" }

curl http://localhost:3000/api/documents
# → Liste des 5 documents disponibles
```

### Utiliser le Mock API (sans backend)
```bash
cd mock
npm install
node server.js
# Mock disponible sur http://localhost:3000
```

---

## 🔐 Variables d'environnement

Copier `.env.example` en `.env` et remplir :

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=votre_secret_min_32_caracteres
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=http://localhost:3001
```

---

## 📡 API — Endpoints principaux

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Inscription citoyen |
| `POST` | `/api/auth/login` | ❌ | Connexion |
| `GET` | `/api/documents` | ❌ | Liste des 5 documents |
| `POST` | `/api/demandes` | ✅ JWT | Créer une demande |
| `GET` | `/api/demandes` | ✅ JWT | Mes demandes |
| `POST` | `/api/demandes/:ref/payer` | ✅ JWT | Payer une demande |
| `PUT` | `/api/agent/demandes/:id/valider` | ✅ Agent | Valider une demande |
| `GET` | `/api/admin/stats` | ✅ Admin | Statistiques globales |

> Documentation complète : [`docs/API-CONTRACT.md`](./docs/API-CONTRACT.md)

---

## 🌿 Branches de développement

| Branche | Responsable | Contenu |
|---------|-------------|---------|
| `main` | — | Production uniquement |
| `develop` | — | Intégration |
| `feature/api` | Lead | Backend / API |
| `feature/database` | Personne 2 | Modèles MongoDB |
| `feature/frontend-web` | Personne 3 | Interface React |
| `feature/mobile` | Personne 4 | Application Flutter |
| `feature/ui-devops` | Personne 5 | UI + Déploiement |

> Guide complet pour collaborateurs : [`CONTRIBUTING.md`](./CONTRIBUTING.md)

---

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| [`docs/API-CONTRACT.md`](./docs/API-CONTRACT.md) | Toutes les routes avec exemples JSON |
| [`docs/DATABASE-SCHEMA.md`](./docs/DATABASE-SCHEMA.md) | Schémas MongoDB détaillés |
| [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) | Guide de déploiement |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Guide pour les collaborateurs |

---

## 🔒 Sécurité

- ✅ Authentification JWT
- ✅ Mots de passe hashés (bcrypt)
- ✅ Rate limiting (100 req/15min)
- ✅ Headers sécurisés (Helmet)
- ✅ Protection injections NoSQL
- ✅ CORS configuré
- ✅ Validation de tous les inputs

---

<div align="center">

**Fait avec ❤️ pour le Burkina Faso 🇧🇫**

*Projet académique — Mars 2026*

</div>