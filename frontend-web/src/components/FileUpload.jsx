import React from 'react';
import { cn } from './Button';

/**
 * Reusable File Upload component
 */
const FileUpload = ({ label, helper, file, onChange, error }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onChange(selectedFile);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
      
      <div className={cn(
        'relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all',
        file ? 'border-emerald-200 bg-emerald-50/30' : 
        error ? 'border-rose-200 bg-rose-50/30' :
        'border-slate-200 hover:border-primary/40 hover:bg-slate-50'
      )}>
        <input 
          type="file" 
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        
        <div className={cn(
          'size-12 rounded-xl flex items-center justify-center',
          file ? 'bg-emerald-100 text-emerald-600' : 
          error ? 'bg-rose-100 text-rose-600' :
          'bg-slate-100 text-slate-400'
        )}>
          <span className="material-symbols-outlined text-2xl">
            {file ? 'description' : 'upload_file'}
          </span>
        </div>

        <div className="text-center">
          <p className="text-sm font-bold text-slate-700">
            {file ? file.name : 'Cliquez ou glissez un fichier'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {helper || 'PDF, JPG ou PNG (Max 5Mo)'}
          </p>
        </div>

        {file && (
          <div className="absolute top-4 right-4 text-emerald-500 animate-bounce">
            <span className="material-symbols-outlined">verified</span>
          </div>
        )}
      </div>

      {error && <p className="text-xs font-semibold text-rose-500 ml-1">{error}</p>}
    </div>
  );
};

export default FileUpload;
