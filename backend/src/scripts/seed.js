require('dotenv').config();
const mongoose = require('mongoose');
const DocumentType = require('../models/DocumentType');
const logger = require('../utils/logger');

const documentTypes = [
  {
    code: 'NAISSANCE',
    nom: 'Extrait acte de naissance',
    description: 'Document officiel attestant de la naissance d\'un citoyen.',
    categorie: 'ETAT_CIVIL',
    service: 'mairie',
    frais: 500,
    delaiJours: 2,
    ordreAffichage: 1,
    champsSpecifiques: [
      { nom: 'nomPere', label: 'Nom du père', type: 'text', obligatoire: true },
      { nom: 'prenomPere', label: 'Prénom du père', type: 'text', obligatoire: true },
      { nom: 'nomMere', label: 'Nom de la mère', type: 'text', obligatoire: true },
      { nom: 'prenomMere', label: 'Prénom de la mère', type: 'text', obligatoire: true },
      { nom: 'maternite', label: 'Maternité / Lieu de naissance', type: 'text', obligatoire: true },
      { nom: 'typeCopie', label: 'Type de copie', type: 'select', obligatoire: true, options: ['Extrait simple', 'Copie intégrale'] }
    ],
    justificatifs: [
      { code: 'CNI', nom: 'CNI', description: 'Carte Nationale d\'Identité', obligatoire: true },
      { code: 'LIVRET_FAMILLE', nom: 'Livret de famille', description: 'Optionnel', obligatoire: false }
    ]
  },
  {
    code: 'MARIAGE',
    nom: 'Extrait acte de mariage',
    description: 'Document officiel attestant de l\'union matrimoniale.',
    categorie: 'ETAT_CIVIL',
    service: 'mairie',
    frais: 300,
    delaiJours: 3,
    ordreAffichage: 2,
    champsSpecifiques: [
      { nom: 'nomEpoux', label: 'Nom de l\'époux', type: 'text', obligatoire: true },
      { nom: 'prenomEpoux', label: 'Prénom de l\'époux', type: 'text', obligatoire: true },
      { nom: 'nomEpouse', label: 'Nom de l\'épouse (jeune fille)', type: 'text', obligatoire: true },
      { nom: 'prenomEpouse', label: 'Prénom de l\'épouse', type: 'text', obligatoire: true },
      { nom: 'dateMariage', label: 'Date du mariage', type: 'date', obligatoire: true },
      { nom: 'lieuMariage', label: 'Lieu du mariage', type: 'text', obligatoire: true },
      { nom: 'numeroActe', label: 'Numéro d\'acte', type: 'text', obligatoire: false },
      { nom: 'anneeRegistre', label: 'Année du registre', type: 'text', obligatoire: false }
    ],
    justificatifs: [
      { code: 'CNI', nom: 'CNI', description: 'Carte Nationale d\'Identité', obligatoire: true },
      { code: 'LIVRET_FAMILLE', nom: 'Livret de famille', description: 'Optionnel', obligatoire: false }
    ]
  },
  {
    code: 'DECES',
    nom: 'Acte de décès',
    description: 'Document officiel attestant du décès d\'une personne.',
    categorie: 'ETAT_CIVIL',
    service: 'mairie',
    frais: 0,
    delaiJours: 1,
    ordreAffichage: 3,
    champsSpecifiques: [
      { nom: 'nomDefunt', label: 'Nom du défunt', type: 'text', obligatoire: true },
      { nom: 'prenomDefunt', label: 'Prénom du défunt', type: 'text', obligatoire: true },
      { nom: 'dateDeces', label: 'Date du décès', type: 'date', obligatoire: true },
      { nom: 'lieuDeces', label: 'Lieu du décès', type: 'text', obligatoire: true },
      { nom: 'heureDeces', label: 'Heure du décès', type: 'text', obligatoire: false },
      { nom: 'nomDeclarant', label: 'Nom du déclarant', type: 'text', obligatoire: true },
      { nom: 'prenomDeclarant', label: 'Prénom du déclarant', type: 'text', obligatoire: true },
      { nom: 'lienDefunt', label: 'Lien avec le défunt', type: 'select', obligatoire: true, options: ['Parent', 'Conjoint', 'Enfant', 'Autre'] }
    ],
    justificatifs: [
      { code: 'CNI_DECLARANT', nom: 'CNI Déclarant', description: 'Obligatoire', obligatoire: true },
      { code: 'CERTIFICAT_MEDICAL', nom: 'Certificat médical', description: 'Constat de décès', obligatoire: true },
      { code: 'CNI_DEFUNT', nom: 'CNI Défunt', description: 'Optionnel', obligatoire: false }
    ]
  },
  {
    code: 'CASIER',
    nom: 'Casier judiciaire B3',
    description: 'Extrait du casier judiciaire bulletin n°3.',
    categorie: 'JUDICIAIRE',
    service: 'justice',
    frais: 1000,
    delaiJours: 2,
    ordreAffichage: 4,
    champsSpecifiques: [
      { nom: 'nip', label: 'NIP', type: 'text', obligatoire: false },
      { nom: 'usage', label: 'Usage du casier', type: 'select', obligatoire: true, options: ['Emploi', 'Concours', 'Voyage', 'Études', 'Mariage', 'Autre'] }
    ],
    justificatifs: [
      { code: 'ACTE_NAISSANCE', nom: 'Acte de naissance', description: 'Obligatoire', obligatoire: true },
      { code: 'CNI', nom: 'CNI', description: 'Obligatoire', obligatoire: true }
    ]
  },
  {
    code: 'NATIONALITE',
    nom: 'Certificat de nationalité',
    description: 'Document attestant de la nationalité burkinabè.',
    categorie: 'JUDICIAIRE',
    service: 'justice',
    frais: 900,
    delaiJours: 5,
    ordreAffichage: 5,
    champsSpecifiques: [
      { nom: 'modeObtention', label: 'Mode d\'obtention', type: 'select', obligatoire: true, options: ['Né au Burkina', 'Par filiation', 'Par mariage', 'Naturalisation'] },
      { nom: 'nomPere', label: 'Nom du père', type: 'text', obligatoire: true },
      { nom: 'prenomPere', label: 'Prénom du père', type: 'text', obligatoire: true },
      { nom: 'lieuNaissancePere', label: 'Lieu de naissance du père', type: 'text', obligatoire: true },
      { nom: 'nomMere', label: 'Nom de la mère', type: 'text', obligatoire: true },
      { nom: 'prenomMere', label: 'Prénom de la mère', type: 'text', obligatoire: true },
      { nom: 'lieuNaissanceMere', label: 'Lieu de naissance de la mère', type: 'text', obligatoire: true }
    ],
    justificatifs: [
      { code: 'ACTE_NAISSANCE_DEMANDEUR', nom: 'Acte de naissance demandeur', description: 'Obligatoire', obligatoire: true },
      { code: 'ACTE_PARENT_BF', nom: 'Acte de naissance parent BF', description: 'Obligatoire', obligatoire: true }
    ]
  }
];

const seedDocuments = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('Connexion DB pour seeding...');

    for (const dt of documentTypes) {
      await DocumentType.findOneAndUpdate({ code: dt.code }, dt, { upsert: true, new: true });
      logger.info(`Seed: ${dt.code} OK`);
    }

    logger.info('✅ Seeding terminé avec succès');
    process.exit(0);
  } catch (error) {
    logger.error(`Erreur Seeding : ${error.message}`);
    process.exit(1);
  }
};

seedDocuments();
