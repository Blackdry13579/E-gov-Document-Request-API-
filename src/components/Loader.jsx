import React from 'react';

/**
 * Reusable Loader Component
 */
const Loader = ({ 
 size = 'md', 
 color = 'primary', 
 className 
}) => {
 const sizes = {
 sm: 'size-6',
 md: 'size-10',
 lg: 'size-16',
 };

 const colors = {
 primary: 'text-primary',
 white: 'text-white',
 slate: 'text-slate-400',
 };

 return (
 <div className={`flex items-center justify-center ${className}`}>
 <span className={`material-symbols-outlined animate-spin ${sizes[size]} ${colors[color]}`}>
 progress_activity
 </span>
 </div>
 );
};

export default Loader;
