import React from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

/**
 * Reusable Alert component
 * @param {Object} props
 * @param {'success' | 'error' | 'danger' | 'warning' | 'info'} props.variant - Alert style
 * @param {string} props.message - Message to display
 * @param {Function} [props.onClose] - Optional close handler
 */
const Alert = ({ variant = 'info', message, onClose }) => {
  // Map 'error' or 'danger' to red styles
  const type = variant === 'error' ? 'danger' : variant;

  const variants = {
    success: 'bg-green-50 text-green-700 border-green-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-orange-50 text-orange-700 border-orange-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const icons = {
    success: 'check_circle',
    danger: 'error',
    warning: 'warning',
    info: 'info',
  };

  return (
    <div className={clsx(
      'flex items-start gap-3 p-4 rounded-xl border animate-in fade-in slide-in-from-top-2',
      variants[type]
    )}>
      <span className="material-symbols-outlined shrink-0 mt-0.5">
        {icons[type]}
      </span>
      <div className="flex-1 text-sm font-medium leading-relaxed">
        {message}
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default Alert;
