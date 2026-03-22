const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
const logger = require('../utils/logger');

/**
 * Connexion à la base de données MongoDB Atlas
 * @async
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    logger.info(`✅ MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Erreur de connexion MongoDB : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
