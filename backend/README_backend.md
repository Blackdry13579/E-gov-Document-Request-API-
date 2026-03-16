# E-Gov Document API — Burkina Faso

API REST sécurisée pour la gestion des demandes de documents administratifs en ligne.

## Stack Technique
- **Logic**: Node.js 22+, Express 4.18
- **Database**: MongoDB 7+, Mongoose 7
- **Auth**: JWT (JSON Web Tokens)
- **Files**: Cloudinary
- **Security**: Helmet, CORS, Rate Limiting, MongoSanitize, HPP

## Installation

1. Cloner le projet
2. Installer les dépendances :
   ```bash
   cd backend
   npm install
   ```
3. Configuration :
   ```bash
   cp .env.example .env
   # Renseigner les variables dans .env
   ```
4. Seeding & Migration (Automatique) :
   Les services, rôles et documents sont automatiquement créés/migrés au premier démarrage.
   Pour forcer un seed manuel (optionnel) :
   ```bash
   # Optionnel : node src/config/seeds.js (si configuré pour export direct)
   ```
5. Lancer en mode développement :
   ```bash
   npm run dev
   ```

## Routes API

### Authentification (`/api/auth`)
| Méthode | Path | Description | Access |
|---------|------|-------------|--------|
| POST | /register | Inscription citoyen | Public |
| POST | /login | Connexion | Public |
| GET | /me | Profil actuel | Privé |
| PUT | /me | Update profil | Privé |
| PUT | /me/password | Changement MDP | Privé |

### Documents (`/api/documents`)
| Méthode | Path | Description | Access |
|---------|------|-------------|--------|
| GET | / | Liste types documents | Public |
| GET | /:code | Détail d'un type | Public |

### Demandes (`/api/demandes`)
| Méthode | Path | Description | Access |
|---------|------|-------------|--------|
| GET | / | Mes demandes | Citoyen |
| POST | / | Créer demande | Citoyen |
| GET | /:reference | Détail demande | Citoyen/Staff |
| PUT | /:reference | Compléter demande | Citoyen |
| POST | /:reference/payer| Payer demande | Citoyen |

### Espace Agent (`/api/agent`)
| Méthode | Path | Description | Access |
|---------|------|-------------|--------|
| GET | /demandes | Demandes du service | Agent/Staff |
| PUT | /demandes/:id/prendre-en-charge | Traiter | Agent/Staff |
| PUT | /demandes/:id/valider | Valider (génère PDF) | Agent/Staff |
| PUT | /demandes/:id/rejeter | Rejeter | Agent/Staff |
| GET | /stats | Stats agent | Agent/Staff |

### Administration (`/api/admin`)
| Méthode | Path | Description | Access |
|---------|------|-------------|--------|
| GET | /stats | Dashboard global | Admin |
| GET | /users | Gestion utilisateurs | Admin |
| POST | /users | Création Agent/Admin | Admin |
| GET | /services | Gérer les services | Admin |
| GET | /roles | Gérer les rôles | Admin |
| POST | /documents | Ajouter document | Admin |
| GET | /logs | Audit Logs | Admin |

## Sécurité & Robustesse
- **Standardisation** : Toutes les réponses suivent le format `{ success: true, data: {...} }`.
- **Validation** : `express-validator` pour tous les inputs critiques.
- **Erreurs** : Gestion centralisée via `AppError` et `errorHandler`.
- **Logs** : Traçabilité totale des actions sensibles dans `AuditLog`.

## Templates & PDF
Le générateur de PDF (`pdfGenerator.js`) est actuellement un stub qui simule la génération par Cloudinary. Les templates HTML sont localisés dans `src/templates/documents/`.
