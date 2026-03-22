const Demande = require('../models/Demande');
const User = require('../models/User');
const Service = require('../models/Service');
const Role = require('../models/Role');
const DocumentType = require('../models/DocumentType');
const AuditLog = require('../models/AuditLog');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Statistiques globales pour le dashboard admin
 */
const getStatsGlobales = asyncHandler(async (req, res, _next) => {
  // 1. Stats demandes par statut
  const statsStatut = await Demande.aggregate([
    { $group: { _id: '$statut', count: { $sum: 1 } } }
  ]);

  // 2. Stats par service
  const statsService = await Demande.aggregate([
    {
      $lookup: {
        from: 'documenttypes',
        localField: 'documentTypeId',
        foreignField: '_id',
        as: 'docType'
      }
    },
    { $unwind: '$docType' },
    { $group: { _id: '$docType.service', count: { $sum: 1 } } }
  ]);

  // 3. Total paiements
  const statsPaiement = await Demande.aggregate([
    { $match: { 'paiement.statut': 'PAYE' } },
    { $group: { _id: null, total: { $sum: '$paiement.montant' } } }
  ]);

  // 4. Utilisateurs
  const totalCitoyens = await User.countDocuments({ role: 'CITOYEN' });

  res.status(200).json({
    success: true,
    data: {
      demandes: {
        parStatut: statsStatut,
        parService: statsService
      },
      paiements: {
        totalCollecte: statsPaiement.length > 0 ? statsPaiement[0].total : 0
      },
      utilisateurs: {
        citoyens: totalCitoyens
      }
    }
  });
});

/**
 * Gérer les agents (création)
 */
const createUser = asyncHandler(async (req, res, next) => {
  const { nom, prenom, email, telephone, roleId, serviceId, password, isAdmin = false } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new AppError('Cet email est déjà utilisé', 400));

  const passwordTemp = password || Math.random().toString(36).slice(-8);
  
  let roleCode = 'CITOYEN';
  let isAgent = false;

  if (roleId) {
    const roleObj = await Role.findById(roleId);
    if (!roleObj) return next(new AppError('Rôle spécifié invalide', 400));
    roleCode = roleObj.code;
    isAgent = true;
  }

  const newUser = await User.create({
    nom,
    prenom,
    email,
    telephone,
    password: passwordTemp,
    role: roleCode,
    roleId: isAgent ? roleId : null,
    serviceId: isAgent ? serviceId : null,
    isAgent,
    isAdmin
  });

  await AuditLog.createLog({
    action: 'CREATION_USER',
    categorie: 'ADMIN',
    auteurId: req.user._id,
    auteurEmail: req.user.email,
    auteurRole: req.user.role,
    auteurIp: req.ip,
    cibleType: 'User',
    cibleId: newUser._id,
    description: `Création du compte ${roleCode} pour ${email}`
  });

  console.log(`[EMAIL SIM] Credentials pour ${email}: Password = ${passwordTemp}`);

  res.status(201).json({
    success: true,
    data: newUser,
    passwordTemp: password === undefined ? passwordTemp : undefined
  });
});

/**
 * Liste de tous les utilisateurs
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.role) filter.role = req.query.role;
  if (req.query.service) filter.service = req.query.service;
  if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';
  if (req.query.isAgent !== undefined) filter.isAgent = req.query.isAgent === 'true';
  if (req.query.isAdmin !== undefined) filter.isAdmin = req.query.isAdmin === 'true';

  const total = await User.countDocuments(filter);
  const users = await User.find(filter)
    .populate('serviceId')
    .populate('roleId')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: users.length,
    total,
    totalPages: Math.ceil(total / limit),
    data: users
  });
});

/**
 * Obtenir un utilisateur par son ID
 */
const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .populate('roleId')
    .populate('serviceId');
    
  if (!user) return next(new AppError('Utilisateur non trouvé', 404));

  res.status(200).json({ success: true, data: user });
});

/**
 * Mettre à jour un utilisateur
 */
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) return next(new AppError('Utilisateur non trouvé', 404));

  await AuditLog.createLog({
    action: 'UPDATE_USER',
    categorie: 'ADMIN',
    auteurId: req.user._id,
    cibleType: 'User',
    cibleId: user._id,
    description: `Mise à jour de l'utilisateur ${user.email}`
  });

  res.status(200).json({ success: true, data: user });
});

/**
 * Activer / Désactiver un compte
 */
const toggleUserStatus = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('Utilisateur non trouvé', 404));

  user.isActive = !user.isActive;
  await user.save({ validateBeforeSave: false });

  await AuditLog.createLog({
    action: 'MODIFICATION_USER',
    categorie: 'ADMIN',
    auteurId: req.user._id,
    auteurEmail: req.user.email,
    auteurRole: req.user.role,
    auteurIp: req.ip,
    cibleType: 'User',
    cibleId: user._id,
    description: `Changement statut isActive pour ${user.email} -> ${user.isActive}`
  });

  res.status(200).json({
    success: true,
    message: `Compte ${user.isActive ? 'activé' : 'désactivé'}`,
    isActive: user.isActive
  });
});

/**
 * Consulter les logs d'audit
 */
const getAuditLogs = asyncHandler(async (req, res, _next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = (page - 1) * limit;

  const logs = await AuditLog.find()
    .populate('auteurId', 'nom prenom role')
    .sort('-timestamp')
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: logs.length,
    data: logs
  });
});

/**
 * Récupérer toutes les demandes (Gestion globale admin)
 */
const getAllDemandes = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  // Construction du filtre
  const filter = {};
  if (req.query.statut) filter.statut = req.query.statut;
  
  // Filtre par service (nécessite un lookup si on filtre sur DocumentType)
  // Utilisons une approche simple d'abord
  if (req.query.documentType) filter.documentTypeId = req.query.documentType;
  
  // Filtre par dates
  if (req.query.dateDebut || req.query.dateFin) {
    filter.dateSoumission = {};
    if (req.query.dateDebut) filter.dateSoumission.$gte = new Date(req.query.dateDebut);
    if (req.query.dateFin) filter.dateSoumission.$lte = new Date(req.query.dateFin);
  }

  // Si filtrage par service, on doit d'abord trouver les IDs des documents de ce service
  if (req.query.service) {
    const serviceDocs = await DocumentType.find({ service: req.query.service }).select('_id');
    const docTypeIds = serviceDocs.map(d => d._id);
    filter.documentTypeId = { $in: docTypeIds };
  }

  const total = await Demande.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  const demandes = await Demande.find(filter)
    .populate('citoyenId', 'nom prenom email')
    .populate('documentTypeId', 'code nom service')
    .populate('agentId', 'nom prenom')
    .sort({ dateSoumission: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: demandes.length,
    total,
    totalPages,
    currentPage: page,
    data: demandes
  });
});

/**
 * SERVICES CRUD
 */
const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort('nom');
  res.status(200).json({ success: true, data: services });
});

const getServiceById = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) return next(new AppError('Service non trouvé', 404));
  res.status(200).json({ success: true, data: service });
});


const createService = asyncHandler(async (req, res, next) => {
  const { nom, code, description, responsable } = req.body;
  
  const existing = await Service.findByCode(code);
  if (existing) return next(new AppError('Un service avec ce code existe déjà', 400));

  const service = await Service.create({ nom, code, description, responsable });

  await AuditLog.createLog({
    action: 'CREATE_SERVICE',
    categorie: 'ADMIN',
    auteurId: req.user._id,
    cibleType: 'Service',
    cibleId: service._id,
    description: `Création du service ${nom} (${code})`
  });

  res.status(201).json({ success: true, data: service });
});

const updateService = asyncHandler(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!service) return next(new AppError('Service non trouvé', 404));

  await AuditLog.createLog({
    action: 'UPDATE_SERVICE',
    categorie: 'ADMIN',
    auteurId: req.user._id,
    cibleType: 'Service',
    cibleId: service._id,
    description: `Mise à jour du service ${service.nom}`
  });

  res.status(200).json({ success: true, data: service });
});

const deleteService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) return next(new AppError('Service non trouvé', 404));

  service.actif = false;
  await service.save();

  await AuditLog.createLog({
    action: 'DELETE_SERVICE',
    categorie: 'ADMIN',
    auteurId: req.user._id,
    cibleType: 'Service',
    cibleId: service._id,
    description: `Désactivation du service ${service.nom}`
  });

  res.status(200).json({ success: true, message: 'Service désactivé' });
});

/**
 * ROLES CRUD
 */
const getAllRoles = asyncHandler(async (req, res, _next) => {
  const roles = await Role.find().populate('serviceId', 'nom code');
  res.status(200).json({ success: true, data: roles });
});

const createRole = asyncHandler(async (req, res, next) => {
  const { nom, code, serviceId, permissions, description } = req.body;

  const existing = await Role.findByCode(code);
  if (existing) return next(new AppError('Un rôle avec ce code existe déjà', 400));

  const role = await Role.create({ nom, code, serviceId, permissions, description });

  await AuditLog.createLog({
    action: 'CREATE_ROLE',
    categorie: 'ADMIN',
    auteurId: req.user._id,
    cibleType: 'Role',
    cibleId: role._id,
    description: `Création du rôle ${nom} (${code})`
  });

  res.status(201).json({ success: true, data: role });
});

const updateRole = asyncHandler(async (req, res, _next) => {
  const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!role) return next(new AppError('Rôle non trouvé', 404));
  
  await AuditLog.createLog({
    action: 'UPDATE_ROLE',
    categorie: 'ADMIN',
    auteurId: req.user._id,
    cibleType: 'Role',
    cibleId: role._id,
    description: `Mise à jour du rôle ${role.nom}`
  });
  res.status(200).json({ success: true, data: role });
});

const deleteRole = asyncHandler(async (req, res, next) => {
  const role = await Role.findById(req.params.id);
  if (!role) return next(new AppError('Rôle non trouvé', 404));
  role.actif = false;
  await role.save();

  await AuditLog.createLog({
    action: 'DELETE_ROLE',
    categorie: 'ADMIN',
    auteurId: req.user._id,
    cibleType: 'Role',
    cibleId: role._id,
    description: `Désactivation du rôle ${role.nom}`
  });
  res.status(200).json({ success: true, message: 'Rôle désactivé' });
});

/**
 * DOCUMENTS CRUD
 */
const getAllDocuments = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.serviceId) filter.service = req.query.serviceId;
  if (req.query.categorie) filter.categorie = req.query.categorie;
  if (req.query.actif !== undefined) filter.actif = req.query.actif === 'true';

  const documents = await DocumentType.find(filter).sort('nom');
  res.status(200).json({ success: true, count: documents.length, data: documents });
});

const createDocument = asyncHandler(async (req, res, next) => {
  const existing = await DocumentType.findOne({ code: req.body.code });
  if (existing) return next(new AppError('Un document avec ce code existe déjà', 400));

  const documentType = await DocumentType.create(req.body);

  await AuditLog.createLog({
    action: 'CREATE_DOCUMENT',
    categorie: 'ADMIN',
    auteurId: req.user._id,
    cibleType: 'DocumentType',
    cibleId: documentType._id,
    description: `Création du document ${documentType.nom || documentType.code}`
  });

  res.status(201).json({ success: true, data: documentType });
});

const getDocumentById = asyncHandler(async (req, res, next) => {
  const documentType = await DocumentType.findById(req.params.id);
  if (!documentType) return next(new AppError('Document non trouvé', 404));
  res.status(200).json({ success: true, data: documentType });
});

const updateDocument = asyncHandler(async (req, res, next) => {
  const documentType = await DocumentType.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!documentType) return next(new AppError('Document non trouvé', 404));
  res.status(200).json({ success: true, data: documentType });
});

const toggleDocument = asyncHandler(async (req, res, next) => {
  const dt = await DocumentType.findById(req.params.id);
  if (!dt) return next(new AppError('Document non trouvé', 404));
  dt.actif = !dt.actif;
  await dt.save();
  res.status(200).json({ success: true, data: dt });
});

module.exports = {
  getStatsGlobales,
  getAllDemandes,
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  toggleUserStatus,
  getAuditLogs,
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
  createDocument,
  getDocumentById,
  updateDocument,
  toggleDocument
};

module.exports = {
  getStatsGlobales,
  getAllDemandes,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  toggleUserStatus,
  getAuditLogs,
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
  getAllDocuments,
  createDocument,
  getDocumentById,
  updateDocument,
  toggleDocument
};
