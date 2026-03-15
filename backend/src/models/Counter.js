const mongoose = require('mongoose');

/**
 * Schéma Counter pour la génération de références incrémentales
 */
const counterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
