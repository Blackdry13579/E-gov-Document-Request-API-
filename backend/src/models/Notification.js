const mongoose = require('mongoose');

/**
 * Schéma Notification
 */
const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    demandeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Demande',
      required: true
    },
    type: {
      type: String,
      enum: [
        'DEMANDE_RECUE',
        'PRISE_EN_CHARGE',
        'DOCUMENTS_MANQUANTS',
        'VALIDEE',
        'REJETEE',
        'PAIEMENT_RECU'
      ],
      required: true
    },
    titre: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    lue: {
      type: Boolean,
      default: false,
      index: true
    },
    dateLecture: Date,
    donnees: {
      reference: String,
      statut: String
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

// Indexes
notificationSchema.index({ userId: 1, lue: 1 });
notificationSchema.index({ userId: 1, createdAt: -1 });

/**
 * Crée une notification pour une demande
 */
notificationSchema.statics.createForDemande = function (
  userId,
  demandeId,
  type,
  titre,
  message,
  donnees
) {
  return this.create({
    userId,
    demandeId,
    type,
    titre,
    message,
    donnees
  });
};

/**
 * Marque toutes les notifications d'un utilisateur comme lues
 */
notificationSchema.statics.markAllAsRead = function (userId) {
  return this.updateMany(
    { userId, lue: false },
    { lue: true, dateLecture: new Date() }
  );
};

/**
 * Compte les notifications non lues
 */
notificationSchema.statics.getUnreadCount = function (userId) {
  return this.countDocuments({ userId, lue: false });
};

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
