/**
 * Validation des variables d'environnement obligatoires
 * @throws {Error} Si une variable obligatoire est manquante
 */
const validateEnv = () => {
  const requiredEnv = [
    'PORT',
    'MONGODB_URI',
    'JWT_SECRET',
    'JWT_EXPIRE',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'FRONTEND_URL',
    'NODE_ENV'
  ];

  const missingEnv = requiredEnv.filter((env) => !process.env[env]);

  if (missingEnv.length > 0) {
    throw new Error(
      `Variables d'environnement manquantes : ${missingEnv.join(', ')}`
    );
  }
};

module.exports = validateEnv;
