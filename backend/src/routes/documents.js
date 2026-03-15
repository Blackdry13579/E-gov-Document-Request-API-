const express = require('express');
const documentController = require('../controllers/documentController');

const router = express.Router();

router.get('/', documentController.getAllDocuments);
router.get('/:code', documentController.getDocumentByCode);

module.exports = router;
