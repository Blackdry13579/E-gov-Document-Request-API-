const cloudinary = require('cloudinary').v2;

/**
 * Configuration de Cloudinary
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload un fichier vers Cloudinary
 * @param {string} file - Chemin du fichier ou base64
 * @param {string} folder - Dossier de destination
 * @param {Object} options - Options supplémentaires
 * @returns {Promise<Object>} Résultat de l'upload
 */
const uploadToCloudinary = async (file, folder, options = {}) => {
  return await cloudinary.uploader.upload(file, {
    folder,
    ...options
  });
};

/**
 * Supprime un fichier de Cloudinary
 * @param {string} publicId - ID public du média
 * @returns {Promise<Object>} Résultat de la suppression
 */
const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary
};
