const express = require('express');
const demandeController = require('../controllers/demandeController');
const { protect } = require('../middleware/auth');
const { restrictTo } = require('../middleware/roleGuard');

const router = express.Router();

// Toutes les routes sont protégées
router.use(protect);

router.get('/', restrictTo('CITOYEN'), demandeController.getMyDemandes);
router.post('/', restrictTo('CITOYEN'), demandeController.createDemande);
router.get('/:reference', demandeController.getDemandeByReference);
router.put('/:reference', restrictTo('CITOYEN'), demandeController.updateDemande);
router.post('/:reference/payer', restrictTo('CITOYEN'), demandeController.payerDemande);

module.exports = router;
