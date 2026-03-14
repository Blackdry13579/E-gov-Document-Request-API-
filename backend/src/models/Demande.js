const mongoose = require('mongoose');
const Counter = require('./Counter');

/**
 * Schéma Demande (Cœur du système)
 */
const demandeSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      unique: true,
      index: true
    },
    citoyenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "L'ID du citoyen est obligatoire"],
      index: true
    },
    documentTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DocumentType',
      required: [true, 'Le type de document est obligatoire']
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    donnees: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    fichiers: [
      {
        code: { type: String },
        nom: { type: String },
        url: { type: String },
        publicId: { type: String },
        fileType: { type: String }, // renamed from type to avoid ambiguity
        taille: { type: Number },
        uploadLe: { type: Date, default: Date.now }
      }
    ],
    statut: {
      type: String,
      enum: [
        'EN_ATTENTE',
        'EN_COURS',
        'DOCUMENTS_MANQUANTS',
        'VALIDEE',
        'REJETEE',
        'TERMINEE'
      ],
      default: 'EN_ATTENTE',
      index: true
    },
    dateSoumission: {
      type: Date,
      default: Date.now
    },
    datePriseEnCharge: Date,
    dateTraitement: Date,
    motifRejet: String,
    notesAgent: String,
    documentsManquants: [String],
    paiement: {
      montant: { type: Number, required: true },
      methode: {
        type: String,
        enum: ['ORANGE_MONEY', 'MOOV_MONEY', 'GRATUIT'],
        required: true
      },
      statut: {
        type: String,
        enum: ['EN_ATTENTE', 'PAYE', 'REMBOURSE', 'ECHOUE'],
        default: 'EN_ATTENTE'
      },
      telephone: String,
      transactionId: String,
      datePaiement: Date
    },
    modeLivraison: {
      type: String,
      enum: ['NUMERIQUE', 'RETRAIT_MAIRIE', 'LIVRAISON'],
      default: 'NUMERIQUE'
    },
    documentPDF: {
      url: String,
      publicId: String,
      genereLe: Date,
      expireLe: Date
    },
    historique: [
      {
        action: {
          type: String,
          enum: [
            'CREATION',
            'PRISE_EN_CHARGE',
            'DEMANDE_COMPLEMENT',
            'COMPLEMENT_FOURNI',
            'VALIDATION',
            'REJET',
            'PAIEMENT',
            'ANNULATION'
          ]
        },
        date: { type: Date, default: Date.now },
        auteurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        auteurRole: String,
        commentaire: String
      }
    ],
    ipCreation: String
  },
  {
    timestamps: true
  }
);

// Indexes combinés
demandeSchema.index({ citoyenId: 1, statut: 1 });
demandeSchema.index({ dateSoumission: -1 });

/**
 * Génère une référence CDB-YYYY-XXXXXX
 * @returns {Promise<string>}
 */
demandeSchema.statics.generateReference = async function () {
  const year = new Date().getFullYear();
  const counter = await Counter.findOneAndUpdate(
    { id: 'demande_ref' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const sequence = counter.seq.toString().padStart(6, '0');
  return `CDB-${year}-${sequence}`;
};

/**
 * Hook pre-save pour la référence et l'historique initial
 */
demandeSchema.pre('save', async function (next) {
  if (this.isNew) {
    if (!this.reference) {
      this.reference = await this.constructor.generateReference();
    }
    this.historique.push({
      action: 'CREATION',
      auteurId: this.citoyenId,
      auteurRole: 'CITOYEN',
      commentaire: 'Création de la demande'
    });
  }
  next();
});

/**
 * Ajoute une entrée à l'historique
 */
demandeSchema.methods.addToHistorique = function (action, auteur, commentaire) {
  this.historique.push({
    action,
    date: new Date(),
    auteurId: auteur._id,
    auteurRole: auteur.role,
    commentaire
  });
  return this.save();
};

/**
 * Vérifie si la demande peut être modifiée par le citoyen
 */
demandeSchema.methods.canBeModifiedBy = function (user) {
  return (
    this.citoyenId.toString() === user._id.toString() &&
    ['EN_ATTENTE', 'DOCUMENTS_MANQUANTS'].includes(this.statut)
  );
};

/**
 * Vérifie si la demande peut être vue par l'utilisateur
 */
demandeSchema.methods.canBeViewedBy = function (user) {
  // Le citoyen voit sa propre demande
  if (this.citoyenId.toString() === user._id.toString()) return true;
  
  // L'admin voit tout
  if (user.role === 'ADMIN') return true;

  // L'agent voit si c'est son service (à vérifier via populate ou contrôleur)
  return false; 
};

const Demande = mongoose.model('Demande', demandeSchema);

module.exports = Demande;
