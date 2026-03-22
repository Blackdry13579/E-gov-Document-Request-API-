const express = require('express');
const agentController = require('../controllers/agentController');
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/roleGuard');

const router = express.Router();

// Protection et restriction aux agents/superviseurs/admins
router.use(protect);
router.use(restrictTo('AGENT_MAIRIE', 'AGENT_JUSTICE', 'SUPERVISEUR', 'ADMIN'));

router.get('/demandes', agentController.getDemandesAgent);
router.get('/demandes/:id', agentController.getDemandeDetail);
router.put('/demandes/:id/prendre-en-charge', agentController.prendreEnCharge);
router.put('/demandes/:id/valider', agentController.validerDemande);
router.put('/demandes/:id/rejeter', agentController.rejeterDemande);
router.put('/demandes/:id/demander-complement', agentController.demanderComplement);
router.get('/stats', agentController.getStatsAgent);

module.exports = router;
