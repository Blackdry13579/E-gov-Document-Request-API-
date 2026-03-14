const multer = require('multer');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middleware/asyncHandler');

// Configuration Multer
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Format de fichier non autorisé (Seuls JPG, PNG et PDF sont acceptés)', 400), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

/**
 * Upload un fichier vers Cloudinary
 */
const uploadFile = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new AppError('Veuillez fournir un fichier', 400));

  // Conversion buffer vers base64 pour Cloudinary (ou utiliser upload_stream)
  const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  
  const result = await uploadToCloudinary(base64File, `e-gov-docs/${req.user._id}`);

  res.status(200).json({
    success: true,
    data: {
      url: result.secure_url,
      publicId: result.public_id,
      type: req.file.mimetype,
      taille: req.file.size
    }
  });
});

/**
 * Supprimer un fichier de Cloudinary
 */
const deleteFile = asyncHandler(async (req, res, next) => {
  const { publicId } = req.body;
  if (!publicId) return next(new AppError('publicId est obligatoire', 400));

  await deleteFromCloudinary(publicId);

  res.status(200).json({
    success: true,
    message: 'Fichier supprimé avec succès'
  });
});

module.exports = {
  upload,
  uploadFile,
  deleteFile
};
