import React, { useState } from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { useNotif } from '../context/NotifContext';
import { authService } from '../services/authService';

const ProfilPage = () => {
  const { user } = useAuth();
  const { addNotif } = useNotif();
  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || '',
    telephone: user?.telephone || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await authService.updateProfile(formData);
    setLoading(false);

    if (result.success) {
      addNotif('Profil mis à jour avec succès.', 'success');
    } else {
      addNotif(result.error, 'danger');
    }
  };

  return (
    <Layout>
      <Navbar title="Mon Profil" />
      
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-10 flex items-center gap-6">
          <div className="size-24 bg-primary text-white rounded-3xl flex items-center justify-center text-4xl font-black shadow-xl">
            {user?.nom?.charAt(0)}{user?.prenom?.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{user?.prenom} {user?.nom}</h1>
            <p className="text-slate-500 font-medium">Citoyen · Membre depuis {new Date(user?.createdAt).getFullYear()}</p>
          </div>
        </div>

        <section className="grid gap-8">
          <Card>
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="font-bold text-slate-800">Informations Personnelles</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md-grid-cols-2 gap-6">
              <Input 
                label="Nom" 
                name="nom" 
                value={formData.nom} 
                onChange={handleChange} 
              />
              <Input 
                label="Prénom" 
                name="prenom" 
                value={formData.prenom} 
                onChange={handleChange} 
              />
              <Input 
                label="Email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                disabled
              />
              <Input 
                label="Téléphone" 
                name="telephone" 
                value={formData.telephone} 
                onChange={handleChange} 
              />
              
              <div className="md-col-span-2 flex justify-end mt-4">
                <Button type="submit" loading={loading} className="min-w-[150px]">
                  Enregistrer les modifications
                </Button>
              </div>
            </form>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-secondary">security</span>
              <h3 className="font-bold text-slate-800">Sécurité</h3>
            </div>
            <p className="text-sm text-slate-500 mb-6">Pour modifier votre mot de passe, un code de vérification sera envoyé à votre adresse email.</p>
            <Button variant="outline">Modifier le mot de passe</Button>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default ProfilPage;
