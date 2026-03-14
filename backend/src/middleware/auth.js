const User = require('../models/User');
const AppError = require('../utils/AppError');
const { verifyToken } = require('../utils/jwt');
const asyncHandler = require('./asyncHandler');

/**
 * Middleware pour authentifier les requêtes via JWT
 */
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Extraire le token du header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Veuillez vous connecter pour accéder à cette ressource', 401));
  }

  // 2. Vérifier le token
  const decoded = verifyToken(token);

  // 3. Chercher l'utilisateur
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("L'utilisateur appartenant à ce token n'existe plus", 401)
    );
  }

  // 4. Vérifier si le compte est actif
  if (!currentUser.isActive) {
    return next(new AppError('Ce compte a été désactivé', 403));
  }

  // 5. Attacher l'utilisateur à la requête
  req.user = currentUser;
  next();
});
