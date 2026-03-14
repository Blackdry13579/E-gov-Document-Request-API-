/**
 * Générateur de PDF pour les documents administratifs
 * Utilise Puppeteer pour convertir les templates HTML en PDF
 * ⏳ STUB — Les templates HTML seront ajoutés dans src/templates/documents/
 * npm install puppeteer
 */

const path = require('path');
const logger = require('./logger');

// Chemin vers les templates (sera utilisé quand les templates seront fournis)
const TEMPLATES_DIR = path.join(__dirname, '../templates/documents');

/**
 * Remplace les variables {{clé}} dans un template HTML par les valeurs fournies
 * @param {string} template - Contenu HTML du template
 * @param {Object} variables - Clés/valeurs à injecter
 * @returns {string} HTML avec variables remplacées
 */
const injectVariables = (template, variables) => {
  let output = template;
  for (const key in variables) {
    const value = variables[key] !== undefined && variables[key] !== null ? variables[key] : '';
    const regex = new RegExp(`{{${key}}}`, 'g');
    output = output.replace(regex, value);
  }
  return output;
};

/**
 * Génère un PDF à partir d'un template HTML et des données de la demande
 * ⏳ STUB — Retourne une URL simulée jusqu'à ce que les templates soient fournis
 * @param {Object} demande - La demande validée (avec toutes ses données)
 * @param {Object} agent - L'agent qui a validé (nom, prénom, service)
 * @returns {Promise<Object>}
 */
const generateDocumentPDF = async (demande, agent) => {
  logger.info(`[PDF STUB] Génération simulée pour demande ${demande.reference}`);

  // Simulation d'un délai de génération
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    url: `https://res.cloudinary.com/egov/documents/${demande.reference}.pdf`,
    publicId: `documents/${demande.reference}`,
    genereLe: new Date(),
    expireLe: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // +6 mois
  };
};

module.exports = { generateDocumentPDF, injectVariables };
