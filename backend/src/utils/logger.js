/**
 * Logger simple pour le développement et la production
 */
const logger = {
  /**
   * Log d'information
   * @param {string} message 
   */
  info: (message) => {
    console.log(`[${new Date().toISOString()}] [INFO] ${message}`);
  },

  /**
   * Log d'erreur
   * @param {string} message 
   */
  error: (message) => {
    console.error(`[${new Date().toISOString()}] [ERROR] ${message}`);
  },

  /**
   * Log d'avertissement
   * @param {string} message 
   */
  warn: (message) => {
    console.warn(`[${new Date().toISOString()}] [WARN] ${message}`);
  },

  /**
   * Log de debug
   * @param {string} message 
   */
  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${new Date().toISOString()}] [DEBUG] ${message}`);
    }
  }
};

module.exports = logger;
