const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middleware/asyncHandler');
const { generateToken } = require('../utils/jwt');
const crypto = require('crypto');

/**
 * Inscription d'un nouveau citoyen
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { nom, prenom, email, telephone, password } = req.body;

  // 1. Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findOne({ 
    $or: [{ email: email.toLowerCase() }, { telephone }] 
  });
  
  if (existingUser) {
    return next(new AppError('Email ou numéro de téléphone déjà utilisé', 400));
  }

  // 2. Créer l'utilisateur
  const newUser = await User.create({
    nom,
    prenom,
    email,
    telephone,
    password,
    role: 'CITOYEN'
  });

  // 3. Générer le token
  const token = generateToken({ id: newUser._id, role: newUser.role });

  // 4. Audit Log
  await AuditLog.createLog({
    action: 'CREATION_COMPTE',
    categorie: 'AUTH',
    auteurId: newUser._id,
    auteurEmail: newUser.email,
    auteurRole: newUser.role,
    auteurIp: req.ip,
    cibleType: 'User',
    cibleId: newUser._id,
    description: 'Inscription d\'un nouveau citoyen'
  });

  // 5. Réponse
  res.status(201).json({
    success: true,
    token,
    user: {
      id: newUser._id,
      nom: newUser.nom,
      prenom: newUser.prenom,
      email: newUser.email,
      telephone: newUser.telephone,
      role: newUser.role
    }
  });
});

/**
 * Connexion utilisateur
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Chercher l'utilisateur avec password
  const user = await User.findByEmail(email);

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Identifiants incorrects', 401));
  }

  // 2. Vérifier si actif
  if (!user.isActive) {
    return next(new AppError('Ce compte est désactivé', 403));
  }

  // 3. Générer token
  const token = generateToken({ id: user._id, role: user.role });

  // 4. Audit Log
  await AuditLog.createLog({
    action: 'LOGIN',
    categorie: 'AUTH',
    auteurId: user._id,
    auteurEmail: user.email,
    auteurRole: user.role,
    auteurIp: req.ip,
    description: 'Connexion réussie'
  });

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role
    }
  });
});

/**
 * Obtenir le profil de l'utilisateur connecté
 */
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
});

/**
 * Mettre à jour le profil (sauf email/password/role)
 */
exports.updateProfil = asyncHandler(async (req, res, next) => {
  const allowedFields = ['nom', 'prenom', 'telephone', 'dateNaissance', 'lieuNaissance', 'adresse'];
  
  const updates = {};
  Object.keys(req.body).forEach(el => {
    if (allowedFields.includes(el)) updates[el] = req.body[el];
  });

  const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: updatedUser
  });
});

/**
 * Mettre à jour le mot de passe
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError('Mot de passe actuel incorrect', 401));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Mot de passe mis à jour avec succès'
  });
});

/**
 * Mot de passe oublié
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    // Sécurité: ne pas révéler si l'email existe
    return res.status(200).json({
      success: true,
      message: 'Email envoyé si le compte existe'
    });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Simulation envoi email
  console.log(`[EMAIL SIM] Reset token pour ${user.email}: ${resetToken}`);

  res.status(200).json({
    success: true,
    message: 'Email envoyé si le compte existe'
  });
});

/**
 * Réinitialiser le mot de passe via token
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Token invalide ou expiré', 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Mot de passe réinitialisé'
  });
});
