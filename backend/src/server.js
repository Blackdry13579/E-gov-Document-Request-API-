require('dotenv').config();
const validateEnv = require('./config/env');

// Valider les variables d'environnement au démarrage
try {
  validateEnv();
} catch (error) {
  console.error(`❌ Erreur de configuration : ${error.message}`);
  process.exit(1);
}

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const compression = require('compression');
const connectDB = require('./config/database');
const seedAll = require('./config/seeds');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

// Connexion à la base de données
const startServer = async () => {
  await connectDB();
  await seedAll();
};
startServer();

const app = express();

// Middlewares de sécurité
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// Middlewares de base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Configuration CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

// Rate limiting global
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes
  message: {
    success: false,
    message: 'Trop de requêtes, veuillez réessayer plus tard.'
  }
});
app.use('/api/', limiter);

// Rate limiting spécifique aux auth
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    success: false,
    message: 'Trop de tentatives de connexion, veuillez patienter une minute.'
  }
});
app.use('/api/auth/', authLimiter);

// Route Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API E-Gov OK',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const demandeRoutes = require('./routes/demandes');
const agentRoutes = require('./routes/agent');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');
const notificationRoutes = require('./routes/notifications');

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/demandes', demandeRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/notifications', notificationRoutes);

// Gestion 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `La route ${req.originalUrl} n'existe pas.`
  });
});

// Gestionnaire d'erreurs centralisé
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(
    `🚀 Serveur démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`
  );
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection : ${err.message}`);
  server.close(() => process.exit(1));
});
