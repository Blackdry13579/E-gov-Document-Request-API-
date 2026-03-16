import React, { useState, useEffect } from 'react';
import { documentService } from '../services/documentService';
import Input from './Input';
import Button from './Button';

/**
 * DynamicForm Component
 * Refactored to fetch fields based on documentCode
 * 
 * Props:
 * - documentCode: string (e.g., 'CNIB', 'CASIER_JUDICIAIRE')
 * - onSubmit: function (callback with form data)
 * - loading: boolean (external loading state)
 */
const DynamicForm = ({ documentCode, onSubmit, loading: externalLoading }) => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(false);

  // Fetch document specific fields on mount or code change
  useEffect(() => {
    const fetchFields = async () => {
      if (!documentCode) return;
      
      setFetching(true);
      const result = await documentService.getDocumentByCode(documentCode);
      
      if (result.success) {
        // Assume API returns { champsSpecifiques: [...] }
        const specificFields = result.data.champsSpecifiques || [];
        setFields(specificFields);
        
        // Initialize form data
        const initialData = {};
        specificFields.forEach(f => {
          initialData[f.nom] = f.defaultValue || '';
        });
        setFormData(initialData);
      }
      setFetching(false);
    };

    fetchFields();
  }, [documentCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors = {};
    fields.forEach(field => {
      if (field.obligatoire && !formData[field.nom]) {
        newErrors[field.nom] = field.errorMsg || 'Ce champ est obligatoire';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  if (fetching) return <div className="p-8 text-center">Chargement du formulaire...</div>;
  if (fields.length === 0 && !fetching) return <div className="p-8 text-center text-slate-500">Aucun champ spécifique requis pour ce document.</div>;

  return (
    <form className="dynamic-form" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.nom} className={field.type === 'textarea' ? 'md-col-span-2' : ''}>
            {field.type === 'select' ? (
              <div className="form-group">
                <label className="form-label" htmlFor={field.nom}>
                  {field.label} {field.obligatoire && <span className="text-secondary">*</span>}
                </label>
                <div className="input-wrapper">
                  <select
                    id={field.nom}
                    name={field.nom}
                    className={`form-input ${errors[field.nom] ? 'has-error' : ''}`}
                    value={formData[field.nom] || ''}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    {field.options?.map(opt => (
                      <option key={opt.value || opt} value={opt.value || opt}>
                        {opt.label || opt}
                      </option>
                    ))}
                  </select>
                </div>
                {errors[field.nom] && <p className="form-error">{errors[field.nom]}</p>}
              </div>
            ) : (
              <Input
                id={field.nom}
                name={field.nom}
                label={field.label}
                required={field.obligatoire}
                type={field.type === 'date' ? 'date' : 'text'}
                placeholder={field.placeholder}
                value={formData[field.nom] || ''}
                onChange={handleChange}
                error={errors[field.nom]}
                icon={field.icon}
              />
            )}
          </div>
        ))}
      </div>

      <div className="form-actions mt-8 flex justify-end">
        <Button 
          type="submit" 
          loading={externalLoading}
          className="btn-lg min-w-[200px]"
        >
          Continuer
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
