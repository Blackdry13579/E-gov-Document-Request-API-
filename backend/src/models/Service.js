const mongoose = require('mongoose');

/**
 * Modèle Service (Mairie, Justice, Police, etc.)
 */
const serviceSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom du service est obligatoire'],
      unique: true,
      trim: true
    },
    code: {
      type: String,
      required: [true, 'Le code du service est obligatoire'],
      unique: true,
      uppercase: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    responsable: {
      type: String,
      trim: true
    },
    actif: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Statics
serviceSchema.statics.findActive = function () {
  return this.find({ actif: true });
};

serviceSchema.statics.findByCode = function (code) {
  return this.findOne({ code: code.toUpperCase() });
};

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
