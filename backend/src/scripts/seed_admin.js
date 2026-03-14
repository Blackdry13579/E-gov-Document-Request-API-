require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const logger = require('../utils/logger');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const adminData = {
      nom: 'Admin',
      prenom: 'System',
      email: 'admin@egov.bf',
      telephone: '77123456',
      password: 'adminpassword123',
      role: 'ADMIN'
    };

    const admin = await User.findOneAndUpdate(
      { email: adminData.email },
      adminData,
      { upsert: true, new: true, runValidators: true }
    );
    
    // On doit forcer le save pour le password car findOneAndUpdate ne hook pas
    admin.password = adminData.password;
    await admin.save();

    logger.info(`✅ Admin créé : ${admin.email}`);
    process.exit(0);
  } catch (error) {
    logger.error(`Erreur Seed Admin : ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
