const mongoose = require('mongoose');

/**
 * Schéma DocumentType (Configuration des services disponibles)
 */
const documentTypeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Le code est obligatoire'],
      unique: true,
      uppercase: true,
      trim: true
    },
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire']
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire']
    },
    categorie: {
      type: String,
      enum: ['ETAT_CIVIL', 'JUDICIAIRE'],
      required: [true, 'La catégorie est obligatoire']
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Le service associé est obligatoire']
    },
    frais: {
      type: Number,
      required: [true, 'Les frais sont obligatoires'],
      min: 0
    },
    delaiJours: {
      type: Number,
      required: [true, 'Le délai est obligatoire'],
      min: 1
    },
    actif: {
      type: Boolean,
      default: true
    },
    ordreAffichage: {
      type: Number,
      default: 0
    },
    champsSpecifiques: [
      {
        nom: String,
        label: String,
        type: {
          type: String,
          enum: ['text', 'date', 'select', 'number', 'textarea']
        },
        obligatoire: Boolean,
        options: [String],
        placeholder: String
      }
    ],
    justificatifs: [
      {
        code: String,
        nom: String,
        description: String,
        obligatoire: Boolean,
        maxSizeMB: {
          type: Number,
          default: 5
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Indexes
documentTypeSchema.index({ code: 1 }, { unique: true });
documentTypeSchema.index({ actif: 1 });
documentTypeSchema.index({ service: 1 });

/**
 * Trouve les types de documents actifs triés
 * @returns {Query}
 */
documentTypeSchema.statics.findActive = function () {
  return this.find({ actif: true }).sort({ ordreAffichage: 1 });
};

/**
 * Trouve un type de document par son code
 * @param {string} code 
 * @returns {Query}
 */
documentTypeSchema.statics.findByCode = function (code) {
  return this.findOne({ code: code.toUpperCase(), actif: true });
};

/**
 * Trouve les types de documents par service
 * @param {string} service 
 * @returns {Query}
 */
documentTypeSchema.statics.findByService = function (service) {
  return this.find({ service, actif: true });
};

/**
 * Hook post-save pour insérer les données initiales si la collection est vide
 */
documentTypeSchema.post('save', async function (doc, next) {
  // Cette logique sera déclenchée après la première insertion manuelle ou via un script de seed
  next();
});

const DocumentType = mongoose.model('DocumentType', documentTypeSchema);

module.exports = DocumentType;
