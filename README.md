<div align="center">

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Burkina_Faso.svg/1200px-Flag_of_Burkina_Faso.svg.png" width="80" alt="Drapeau Burkina Faso"/>

# 🏛️ E-Gov Document Request Platform

### Plateforme numérique de demande de documents administratifs
**République du Burkina Faso**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org) [![Express](https://img.shields.io/badge/Express-4.18+-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com) [![MongoDB](https://img.shields.io/badge/MongoDB-7+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com) [![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org) [![Flutter](https://img.shields.io/badge/Flutter-3+-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev) [![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE) [![Status](https://img.shields.io/badge/Status-En%20développement-orange?style=flat-square)]() [![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)]()

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

## 👥 Rôles du système (Dynamiques)

Le système utilise désormais une architecture de rôles **basée sur la base de données**, permettant une extension infinie :

```
🧑 Citoyen          → Crée des demandes, paie, suit et télécharge ses documents
👮 Agents           → Traitent les demandes (Mairie, Justice, Police, etc.)
💼 Superviseurs    → Gestion d'équipe et statistiques de service
🔧 Administrateur    → Gestion des services, des rôles et configuration globale
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
| **Frontend Web** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | Interface web moderne |
| **Mobile** | ![Flutter](https://img.shields.io/badge/-Flutter-02569B?logo=flutter&logoColor=white) | Application mobile |
| **Fichiers** | ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?logo=cloudinary&logoColor=white) | Upload & stockage fichiers |
| **Paiement** | ![Orange Money](https://img.shields.io/badge/-Orange%20Money-FF6600?logoColor=white) ![Moov Money](https://img.shields.io/badge/-Moov%20Money-00A651?logoColor=white) | Intégration API de paiement |

</div>

---

## 🏗️ Architecture du projet

```
E-gov-Document-Request-API/
│
├── 🔴 backend/              → API REST (NodeJS/Express)
│   └── src/
│       ├── config/          → MongoDB, Seeds & Migration logic
│       ├── models/          → 8 modèles (User, Service, Role, Demande...)
│       ├── controllers/     → Administration, Agent, Documents logic
│       ├── routes/          → Endpoints API versionnés
│       ├── middleware/       → RoleGuard dynamiques & Auth
│       └── scripts/         → Scripts de seeding & utils
│
├── 🔵 frontend-web/         → Interface React (Vite)
│   ├── src/pages/agent/     → Dashboard & Gestion demandes Agent
│   ├── src/pages/citoyen/   → Suivi & Confirmation Citoyen
│   └── src/services/        → Services API (Axios bundle)
│
├── 🟢 frontend-mobile/      → Application Flutter
├── 📦 common/               → Constantes partagées
└── 📚 docs/                 → Documentation technique & MCD
```

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
