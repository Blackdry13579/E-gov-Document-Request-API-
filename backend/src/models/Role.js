const mongoose = require('mongoose');

/**
 * Modèle Role (Agent Mairie, Agent Justice, etc.)
 */
const roleSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom du rôle est obligatoire'],
      trim: true
    },
    code: {
      type: String,
      required: [true, 'Le code du rôle est obligatoire'],
      unique: true,
      uppercase: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Le service associé est obligatoire']
    },
    permissions: [
      {
        type: String
      }
    ],
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
roleSchema.statics.findActive = function () {
  return this.find({ actif: true }).populate('serviceId');
};

roleSchema.statics.findByCode = function (code) {
  return this.findOne({ code: code.toUpperCase() });
};

roleSchema.statics.findByService = function (serviceId) {
  return this.find({ serviceId, actif: true });
};

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
