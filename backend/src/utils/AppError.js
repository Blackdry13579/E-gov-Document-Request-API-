/**
 * Classe d'erreur personnalisée pour l'application
 */
class AppError extends Error {
  /**
   * @param {string} message - Message d'erreur
   * @param {number} statusCode - Code statut HTTP
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
