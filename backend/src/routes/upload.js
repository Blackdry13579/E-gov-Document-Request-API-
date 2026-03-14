const express = require('express');
const { upload, uploadFile, deleteFile } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', upload.single('file'), uploadFile);
router.delete('/', deleteFile);

module.exports = router;
