const AppError = require('../utils/AppError');

/**
 * Restreint l'accès aux rôles spécifiés (Compatibilité)
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role) && !req.user.isAdmin) {
      return next(new AppError('Accès refusé — rôle insuffisant', 403));
    }
    next();
  };
};

/**
 * Vérifie si l'utilisateur est un agent (ou admin)
 */
exports.checkIsAgent = (req, res, next) => {
  if (!req.user.isAgent && !req.user.isAdmin) {
    return next(new AppError('Accès réservé aux agents de l\'État', 403));
  }
  next();
};

/**
 * Vérifie si l'utilisateur est un administrateur
 */
exports.checkIsAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new AppError('Accès réservé aux administrateurs système', 403));
  }
  next();
};

/**
 * Middleware pour vérifier si un agent a le droit d'accéder à une demande
 * basé sur son serviceId
 */
exports.checkService = (req, res, next) => {
  // Cette logique est appelée après avoir chargé la demande
  // req.demande doit être présent (chargé par un middleware ou le controller)
  if (req.user.isAdmin) return next();

  if (!req.demande) {
    return next(); // Si pas de demande chargée, on laisse passer (check sera fait plus tard)
  }

  const documentTypeServiceId = req.demande.documentType?.serviceId;
  const agentServiceId = req.user.serviceId;

  if (!agentServiceId || !documentTypeServiceId || agentServiceId.toString() !== documentTypeServiceId.toString()) {
    return next(new AppError('Accès refusé — Ce dossier ne relève pas de votre service', 403));
  }

  next();
};
