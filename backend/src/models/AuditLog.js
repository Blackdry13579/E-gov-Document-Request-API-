const mongoose = require('mongoose');

/**
 * Schéma AuditLog (Immuable)
 */
const auditLogSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now,
      index: true
    },
    action: {
      type: String,
      required: true
    },
    categorie: {
      type: String,
      enum: ['AUTH', 'DEMANDE', 'PAIEMENT', 'ADMIN', 'SYSTEME'],
      required: true
    },
    auteurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },
    auteurEmail: String,
    auteurRole: String,
    auteurIp: String,
    cibleType: {
      type: String,
      enum: ['Demande', 'User', 'DocumentType', 'Service', 'Role', 'Systeme']
    },
    cibleId: mongoose.Schema.Types.ObjectId,
    cibleReference: String,
    description: String,
    statut: {
      type: String,
      enum: ['SUCCES', 'ECHEC', 'REFUSE'],
      default: 'SUCCES'
    },
    details: mongoose.Schema.Types.Mixed
  },
  {
    timestamps: false,
    versionKey: false
  }
);

// Indexes
auditLogSchema.index({ timestamp: -1 });
auditLogSchema.index({ auteurId: 1, timestamp: -1 });
auditLogSchema.index({ cibleType: 1, cibleId: 1 });

/**
 * Crée un log d'audit
 * Seule façon de créer un log car le modèle est destiné à être en lecture seule ensuite
 */
auditLogSchema.statics.createLog = function (data) {
  return this.create(data);
};

// Empêcher les mises à jour et suppressions (Immuabilité simulée)
auditLogSchema.pre('save', function (next) {
  if (!this.isNew) {
    return next(new Error('Modification interdite sur les logs d\'audit'));
  }
  next();
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
