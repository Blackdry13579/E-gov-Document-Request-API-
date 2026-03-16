import React from 'react';
import { cn } from './Button';

/**
 * Reusable Input Component
 */
const Input = React.forwardRef(({ 
  className, 
  label, 
  error, 
  icon, 
  ...props 
}, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-bold text-slate-700 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">{icon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          className={cn(
            'w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm transition-all focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none disabled:bg-slate-50 disabled:text-slate-500',
            icon && 'pl-11',
            error && 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/5',
            className
          )}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-xs font-semibold text-rose-500 ml-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
