require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const logger = require('../utils/logger');

const seedAgent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const agentEmail = 'agent_mairie@egov.bf';
    let agent = await User.findOne({ email: agentEmail });

    if (agent) {
      await User.deleteOne({ _id: agent._id });
      logger.info('Ancien agent supprimé pour réinitialisation');
    }

    agent = await User.create({
      nom: 'Agent',
      prenom: 'Mairie 1',
      email: agentEmail,
      telephone: '60123456',
      password: 'agentpassword123',
      role: 'AGENT_MAIRIE',
      service: 'mairie'
    });
    
    logger.info(`✅ Agent Mairie créé (avec hash) : ${agent.email}`);
    process.exit(0);
  } catch (error) {
    logger.error(`Erreur Seed Agent : ${error.message}`);
    process.exit(1);
  }
};

seedAgent();
