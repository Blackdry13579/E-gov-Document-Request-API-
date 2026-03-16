const Service = require('../models/Service');
const Role = require('../models/Role');
const User = require('../models/User');
const DocumentType = require('../models/DocumentType');
const logger = require('../utils/logger');

const servicesData = [
  { nom: 'Mairie', code: 'MAIRIE', description: 'Services d\'état civil (naissance, mariage, décès)', responsable: 'Ministère de l\'Administration Territoriale' },
  { nom: 'Justice', code: 'JUSTICE', description: 'Services judiciaires (casier, nationalité)', responsable: 'Ministère de la Justice' }
];

const rolesData = {
  MAIRIE: [
    { nom: 'Agent d\'État Civil', code: 'AGENT_MAIRIE', description: 'Traite les actes de naissance, mariage et décès', permissions: ['READ_DEMANDE', 'VALIDATE_DEMANDE', 'REJECT_DEMANDE'] },
    { nom: 'Superviseur Mairie', code: 'SUPERVISEUR_MAIRIE', description: 'Supervise les agents de la mairie', permissions: ['READ_DEMANDE', 'READ_STATS', 'MANAGE_AGENTS'] }
  ],
  JUSTICE: [
    { nom: 'Agent Judiciaire', code: 'AGENT_JUSTICE', description: 'Traite les casiers judiciaires et certificats de nationalité', permissions: ['READ_DEMANDE', 'VALIDATE_DEMANDE', 'REJECT_DEMANDE'] },
    { nom: 'Superviseur Justice', code: 'SUPERVISEUR_JUSTICE', description: 'Supervise les agents de la justice', permissions: ['READ_DEMANDE', 'READ_STATS', 'MANAGE_AGENTS'] }
  ]
};

const documentTypesData = [
  { code: 'NAISSANCE', nom: 'Extrait acte de naissance', description: 'Document officiel attestant de la naissance d\'un citoyen.', categorie: 'ETAT_CIVIL', serviceCode: 'MAIRIE', frais: 500, delaiJours: 2, ordreAffichage: 1 },
  { code: 'MARIAGE', nom: 'Extrait acte de mariage', description: 'Document officiel attestant de l\'union matrimoniale.', categorie: 'ETAT_CIVIL', serviceCode: 'MAIRIE', frais: 300, delaiJours: 3, ordreAffichage: 2 },
  { code: 'DECES', nom: 'Acte de décès', description: 'Document officiel attestant du décès d\'une personne.', categorie: 'ETAT_CIVIL', serviceCode: 'MAIRIE', frais: 0, delaiJours: 1, ordreAffichage: 3 },
  { code: 'CASIER', nom: 'Casier judiciaire B3', description: 'Extrait du casier judiciaire bulletin n°3.', categorie: 'JUDICIAIRE', serviceCode: 'JUSTICE', frais: 1000, delaiJours: 2, ordreAffichage: 4 },
  { code: 'NATIONALITE', nom: 'Certificat de nationalité', description: 'Document attestant de la nationalité burkinabè.', categorie: 'JUDICIAIRE', serviceCode: 'JUSTICE', frais: 900, delaiJours: 5, ordreAffichage: 5 }
];

/**
 * Migration & Seeding Automatique
 */
const seedAll = async () => {
  try {
    // 1. SERVICES
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      logger.info('🚀 Seeding des services...');
      await Service.insertMany(servicesData);
    }

    // 2. RÔLES
    const roleCount = await Role.countDocuments();
    if (roleCount === 0) {
      logger.info('🚀 Seeding des rôles...');
      const services = await Service.find();
      for (const s of services) {
        if (rolesData[s.code]) {
          const roles = rolesData[s.code].map(r => ({ ...r, serviceId: s._id }));
          await Role.insertMany(roles);
        }
      }
    }

    // 3. MIGRATION UTILISATEURS (ONE-TIME)
    const usersToMigrate = await User.find({ isAgent: false, isAdmin: false, role: { $ne: 'CITOYEN' } });
    if (usersToMigrate.length > 0) {
      logger.info(`🔌 Migration de ${usersToMigrate.length} utilisateurs...`);
      const roles = await Role.find();
      const services = await Service.find();

      for (const user of usersToMigrate) {
        if (user.role === 'ADMIN') {
          user.isAdmin = true;
        } else if (user.role.startsWith('AGENT_')) {
          user.isAgent = true;
          const serviceCode = user.role.split('_')[1]; // MAIRIE ou JUSTICE
          const service = services.find(s => s.code === serviceCode);
          const role = roles.find(r => r.code === user.role);
          if (service) user.serviceId = service._id;
          if (role) user.roleId = role._id;
        } else if (user.role === 'SUPERVISEUR') {
          user.isAgent = true;
          // Par défaut on cherche un rôle superviseur (à affiner selon les données réelles)
          const role = roles.find(r => r.code.startsWith('SUPERVISEUR_'));
          if (role) {
            user.roleId = role._id;
            user.serviceId = role.serviceId;
          }
        }
        await user.save({ validateBeforeSave: false });
      }
    }

    // 4. DOCUMENTS (SEED + MIGRATION)
    const docCount = await DocumentType.countDocuments();
    if (docCount === 0) {
      logger.info('🚀 Seeding des types de documents...');
      const services = await Service.find();
      const docsToInsert = documentTypesData.map(d => {
        const service = services.find(s => s.code === d.serviceCode);
        return { ...d, serviceId: service ? service._id : null };
      });
      await DocumentType.insertMany(docsToInsert);
    } else {
      // Migration des documents existants sans serviceId
      const docsToMigrate = await DocumentType.find({ serviceId: { $exists: false } });
      if (docsToMigrate.length > 0) {
        logger.info(`📄 Migration de ${docsToMigrate.length} types de documents...`);
        const services = await Service.find();
        for (const doc of docsToMigrate) {
          let sCode = 'MAIRIE';
          if (['CASIER', 'NATIONALITE'].includes(doc.code)) sCode = 'JUSTICE';
          const service = services.find(s => s.code === sCode);
          if (service) {
            doc.serviceId = service._id;
            await doc.save();
          }
        }
      }
    }

    // 5. ADMIN PAR DÉFAUT
    const adminExistant = await User.findOne({ isAdmin: true });
    if (!adminExistant) {
      await User.create({
        nom: 'Admin',
        prenom: 'Principal',
        email: 'admin@egov.bf',
        password: 'Admin@2026', // sera hashé par le hook pre-save
        telephone: '70000000',
        role: 'ADMIN',
        isAdmin: true,
        isAgent: false
      });
      logger.info('✅ Admin par défaut créé: admin@egov.bf / Admin@2026');
    }

    logger.info('✅ Seeding & Migration terminé');
  } catch (error) {
    logger.error(`❌ Erreur Seeding : ${error.message}`);
  }
};

module.exports = seedAll;
