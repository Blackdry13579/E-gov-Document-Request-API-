/**
 * Wrapper pour les fonctions asynchrones afin d'éviter les try/catch répétitifs
 * @param {Function} fn - Fonction asynchrone à wrapper
 * @returns {Function} Middleware Express
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
