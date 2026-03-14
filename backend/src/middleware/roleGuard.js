const AppError = require('../utils/AppError');

/**
 * Restreint l'accès aux rôles spécifiés
 * @param  {...string} roles - Liste des rôles autorisés
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Accès refusé — rôle insuffisant', 403)
      );
    }
    next();
  };
};

/**
 * Middleware pour vérifier si un agent a le droit d'accéder à une demande
 * (Vérification par service: mairie ou justice)
 */
exports.checkService = (req, res, next) => {
  // Cette logique sera précisée lors de l'implémentation des controllers de demandes
  // Elle pourra charger la demande et comparer documentTypeId.service avec req.user.service
  next();
};
