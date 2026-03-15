const express = require('express');
const adminController = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/roleGuard');

const router = express.Router();

// Routes réservées aux ADMIN
router.use(protect);
router.use(restrictTo('ADMIN'));

router.get('/stats', adminController.getStatsGlobales);
router.get('/demandes', adminController.getAllDemandes);
router.get('/users', adminController.getAllUsers);
router.post('/users', adminController.createUser);
router.put('/users/:id/toggle', adminController.toggleUserStatus);
router.get('/logs', adminController.getAuditLogs);

// GESTION DYNAMIQUE SERVICES
router.get('/services', adminController.getAllServices);
router.post('/services', adminController.createService);
router.put('/services/:id', adminController.updateService);
router.delete('/services/:id', adminController.deleteService);

// GESTION DYNAMIQUE RÔLES
router.get('/roles', adminController.getAllRoles);
router.post('/roles', adminController.createRole);
router.put('/roles/:id', adminController.updateRole);
router.delete('/roles/:id', adminController.deleteRole);

// GESTION DYNAMIQUE DOCUMENTS
router.post('/documents', adminController.createDocument);
router.put('/documents/:id', adminController.updateDocument);
router.delete('/documents/:id', adminController.toggleDocument);

module.exports = router;
