/**
 * Global Constants for the E-Gov Platform
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const DOCUMENT_TYPES = {
  CNIB: 'cnib',
  PASSPORT: 'passport',
  EXTRACT: 'ext-naissance',
  CERTIFICATE: 'cert-nationalite',
  CASIER: 'casier-judiciaire'
};

export const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
  completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-700 border-rose-200',
  'ready-for-pickup': 'bg-primary/10 text-primary border-primary/20'
};

/**
 * Format date to French standard
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Format currency to CFA
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(amount);
};
