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

module.exports = router;
