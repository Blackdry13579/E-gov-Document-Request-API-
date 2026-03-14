# 👥 Guide des Collaborateurs — E-Gov Document

Ce fichier explique à chaque membre de l'équipe comment travailler sur le projet.

---

## 🌿 Branches

```
main          → Production — NE PAS TOUCHER DIRECTEMENT
develop       → Intégration — tout le monde merge ici
│
├── feature/api             → API / Backend
├── feature/database        → Modèles MongoDB + Seeds
├── feature/frontend-web    → React
├── feature/mobile          → Flutter
└── feature/ui-devops       → UI + Déploiement
```

---

## ⚙️ Cloner le projet

```bash
git clone https://github.com/Blackdry13579/E-gov-Document-Request-API-.git
cd E-gov-Document-Request-API-
```

---

## 🔴 PERSONNE 2 — Base de données

**Ta responsabilité :** Modèles Mongoose dans `backend/src/models/`

> ⚠️ Tu travailles EN PREMIER. L'API ne peut pas démarrer sans tes modèles.

```bash
# 1. Se mettre sur ta branche
git checkout feature/database

# 2. Installer les dépendances
cd backend && npm install

# 3. Configurer MongoDB
cp .env.example .env
# Remplir MONGODB_URI avec ton URL MongoDB Atlas

# 4. Tester la connexion
node -e "require('./src/config/database')"
# Doit afficher: ✅ MongoDB connecté
```

**MongoDB Atlas — Obtenir l'URI :**
1. https://cloud.mongodb.com → Créer cluster gratuit (M0)
2. Database Access → Créer utilisateur
3. Network Access → Ajouter `0.0.0.0/0`
4. Connect → Connect your application → Copier l'URI

**Tes fichiers :**
```
backend/src/models/
├── User.js
├── DocumentType.js
├── Demande.js
├── Notification.js
└── AuditLog.js
```

---

## 🔵 PERSONNE 3 — Frontend Web

**Ta responsabilité :** Interface React dans `frontend-web/`

> ⚠️ Utilise uniquement les routes dans `docs/API-CONTRACT.md`. Ne crée jamais tes propres routes.

```bash
# 1. Se mettre sur ta branche
git checkout feature/frontend-web

# 2. Installer les dépendances
cd frontend-web && npm install

# 3. Configurer l'URL API
echo "REACT_APP_API_URL=http://localhost:3000/api" > .env

# 4. Lancer le Mock API (terminal séparé)
cd mock && npm install && node server.js
```

**Envoyer le JWT dans les requêtes :**
```javascript
// Après login
localStorage.setItem('token', response.data.token)

// Dans chaque requête protégée
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
```

**Format réponse API :**
```javascript
{ success: true, data: {...} }      // succès
{ success: false, message: "..." }  // erreur
```

---

## 🟢 PERSONNE 4 — Mobile Flutter

**Ta responsabilité :** Application Flutter dans `frontend-mobile/`

> ⚠️ Les routes API sont IDENTIQUES à celles du web. Référence : `docs/API-CONTRACT.md`

```bash
# 1. Se mettre sur ta branche
git checkout feature/mobile

# 2. Installer les dépendances
cd frontend-mobile && flutter pub get
```

**URL API dans Flutter :**
```dart
// lib/services/api_service.dart
const String baseUrl = 'http://10.0.2.2:3000/api'; // Android émulateur
// const String baseUrl = 'http://localhost:3000/api'; // iOS simulateur
```

> ⚠️ Sur Android émulateur, utiliser `10.0.2.2` et non `localhost`

**Dépendances recommandées :**
```yaml
dependencies:
  dio: ^5.3.0
  flutter_secure_storage: ^9.0.0
  provider: ^6.1.0
```

---

## 🟡 PERSONNE 5 — UI / DevOps

**Ta responsabilité :** Design Figma + Déploiement

```bash
git checkout feature/ui-devops
```

**Déploiement Backend (Render) :**
1. https://render.com → New Web Service
2. Branch: `main` · Build: `cd backend && npm install` · Start: `cd backend && npm start`
3. Ajouter les variables d'environnement depuis `.env.example`

**Déploiement Frontend (Vercel) :**
1. https://vercel.com → New Project → Root: `frontend-web`
2. Variable: `REACT_APP_API_URL=https://votre-api.onrender.com/api`

---

## 🔄 Faire un Pull Request

### ⚠️ Règle importante — MERGE uniquement, pas de rebase
On utilise **git merge** pour synchroniser les branches, **jamais git rebase**.

Pourquoi ? Le rebase réécrit l'historique des commits — si quelqu'un d'autre travaille sur la même branche, ça crée des conflits compliqués. Le merge est plus sûr et l'historique reste lisible pour tout le monde.

```bash
# 1. Se mettre sur ta branche
git checkout feature/ta-branche

# 2. Récupérer les derniers changements de develop
git fetch origin
git merge origin/develop
# Si conflits → les résoudre, puis git add . && git commit

# 3. Pousser ta branche
git push origin feature/ta-branche
```

**Sur GitHub :**
1. Cliquer **"Compare & pull request"**
2. Base: `develop` ← Compare: `feature/ta-branche`
3. Titre clair + description de ce qui a été fait
4. **"Create pull request"** → prévenir le Lead

### Comment résoudre un conflit
```bash
# Après git merge origin/develop, si conflit:
# Git va indiquer les fichiers en conflit

# 1. Ouvrir le fichier en conflit
# Tu verras quelque chose comme:
# <<<<<<< HEAD (ton code)
# ton code ici
# =======
# leur code ici
# >>>>>>> origin/develop

# 2. Garder ce qui est correct, supprimer les marqueurs
# 3. Sauvegarder le fichier

# 4. Marquer comme résolu
git add fichier-en-conflit
git commit -m "fix: résolution conflit merge develop"
git push origin feature/ta-branche
```

---

## 📝 Format des commits

```
feat(scope): description     → nouvelle fonctionnalité
fix(scope): description      → correction de bug
chore(scope): description    → maintenance
docs(scope): description     → documentation

Exemples:
feat(api): route création demande
feat(web): page tableau de bord citoyen
fix(database): validation email unique
```

---

## 🚨 Règles absolues

```
❌ Ne jamais pousser directement sur main ou develop
❌ Ne jamais commiter le fichier .env
❌ Ne jamais inventer des routes API
❌ Ne jamais merger son propre Pull Request
✅ Toujours tirer develop avant de commencer
✅ Toujours tester localement avant de pousser
```

---

*E-Gov Document — Mars 2026*