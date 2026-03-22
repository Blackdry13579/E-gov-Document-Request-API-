import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotif } from '../context/NotifContext';
import { validateForm } from '../utils/validators';
import Input from '../components/Input';
import Button from '../components/Button';

const RegisterPage = () => {
 const { register } = useAuth();
 const { addNotif } = useNotif();
 const navigate = useNavigate();
 
 const [formData, setFormData] = useState({
 nom: '',
 prenom: '',
 email: '',
 telephone: '',
 password: '',
 confirmPassword: '',
 cnib: ''
 });
 
 const [errors, setErrors] = useState({});
 const [loading, setLoading] = useState(false);

 const handleChange = (e) => {
 const { name, value } = e.target;
 setFormData(prev => ({ ...prev, [name]: value }));
 };

 const handleSubmit = async (e) => {
 e.preventDefault();
 
 // Validate
 const rules = {
 nom: { required: true },
 prenom: { required: true },
 email: { required: true, type: 'email' },
 telephone: { required: true, type: 'tel' },
 password: { required: true, type: 'password' },
 cnib: { required: true }
 };

 const { isValid, errors: validationErrors } = validateForm(formData, rules);
 
 if (formData.password !== formData.confirmPassword) {
 validationErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
 }

 if (!isValid || Object.keys(validationErrors).length > 0) {
 setErrors(validationErrors);
 return;
 }

 setLoading(true);
 const result = await register(formData);
 setLoading(false);

 if (result.success) {
 addNotif('Compte créé avec succès !', 'success');
 navigate('/dashboard');
 } else {
 addNotif(result.error, 'danger');
 }
 };

 return (
 <div className="auth-page register-page flex min-h-screen bg-slate-100 p-4 md:p-8 items-center justify-center">
 <main className="auth-card bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md-flex-row w-full max-w-6xl min-h-[800px]">
 
 {/* Left Side - Hero */}
 <section className="auth-hero md:w-5/12 relative hidden md-block bg-cover bg-center"style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJ_XyHL8pUXDOhTBoIOjpmfc-_fRraL-w577XRMzLYIxj7KCRIBcgUL78RJpufVJ46onhU2xaLZVc5FBzVDU9LbicqxryYSKytyh-K22lU3IBUBgYD_6Ll_WnIWKm44YgTysDwC4pSuFHLUHWtnXaFPU5GG_japKgBq6j3vrHengqkrpeXhFq1rEkGEqaRkBE3WBdXwV3ccQXuTcc-T7HDMSiNoJrMN5DJPRemVt0_0CisCZ_hc-3XHc1CXr3B7NEtoSu7vHp7fsQ')` }}>
 <div className="absolute inset-0 gradient-overlay flex flex-col justify-between p-12 text-white">
 <div className="hero-top">
 <div className="flex items-start gap-4">
 <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQXJybPNH4004ieJqy4yv_yu4-5EpOcSBSaOO_Hfn2Wj4YVRi-8XLAKhL6-XyL5A5sJK2Vutu2I6n13d96zWO5fvJ9PuiFacQ1QuvgWfxI-zSzWMUlEjw_y78QS0UNrzcx4D_yUORISSC3Asa6rus9dnL4ljwWwlroq8B0ZSYT-yPHMr0f-onXHJ2n04vyiPngxuSlYfv47ysGJO7jN-ltxiaK25fIqnnZh2rXmSZSVMpDIyXR3x1hd1A9bzZVc3hD7av06Lqz-rc"alt="Emblem"className="w-16"/>
 </div>
 <div className="brand-text">
 <p className="text-xs font-bold tracking-widest text-yellow-400 uppercase">République du</p>
 <h2 className="text-2xl font-bold">Burkina Faso</h2>
 </div>
 </div>
 </div>

 <div className="hero-bottom mb-12">
 <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">Portail Officiel des Documents</h1>
 <p className="text-lg text-blue-50/80 max-w-sm">Accédez à vos services administratifs en toute sécurité. Simple, rapide et transparent.</p>
 <div className="flex gap-2 mt-8">
 <span className="h-1.5 w-10 bg-yellow-400 rounded-full"></span>
 <span className="h-1.5 w-4 bg-white/30 rounded-full"></span>
 <span className="h-1.5 w-4 bg-white/30 rounded-full"></span>
 </div>
 </div>
 </div>
 </section>

 {/* Right Side - Form */}
 <section className="auth-form-container md:w-7/12 w-full p-8 md:p-16 flex flex-col overflow-y-auto">
 <div className="form-header mb-10 flex items-center gap-4">
 <div className="w-12 h-12 bg-deep-blue rounded-2xl flex items-center justify-center shadow-lg">
 <span className="material-symbols-outlined text-white">description</span>
 </div>
 <div>
 <h3 className="text-xl font-bold text-deep-blue">E-GOV <span className="text-secondary">DOC</span></h3>
 <p className="text-[10px] tracking-widest font-bold text-slate-500 uppercase">Portail National</p>
 </div>
 </div>

 <div className="form-intro mb-8">
 <h2 className="text-3xl font-bold text-slate-800">Créer un compte</h2>
 <p className="text-slate-500">Inscrivez-vous pour accéder à vos services administratifs en ligne.</p>
 </div>

 <form onSubmit={handleSubmit} className="space-y-5">
 <div className="grid md-grid-cols-2 gap-5">
 <Input 
 label="Nom"
 name="nom"
 placeholder="Ex: Sawadogo"
 value={formData.nom} 
 onChange={handleChange} 
 error={errors.nom}
 icon="person"
 />
 <Input 
 label="Prénom"
 name="prenom"
 placeholder="Ex: Jean"
 value={formData.prenom} 
 onChange={handleChange} 
 error={errors.prenom}
 icon="person"
 />
 </div>

 <Input 
 label="Email"
 name="email"
 type="email"
 placeholder="votre@email.com"
 value={formData.email} 
 onChange={handleChange} 
 error={errors.email}
 icon="mail"
 />

 <div className="grid md-grid-cols-2 gap-5">
 <Input 
 label="Numéro CNIB"
 name="cnib"
 placeholder="BXXXXXXXX"
 value={formData.cnib} 
 onChange={handleChange} 
 error={errors.cnib}
 icon="badge"
 />
 <Input 
 label="Téléphone"
 name="telephone"
 type="tel"
 placeholder="8 chiffres"
 value={formData.telephone} 
 onChange={handleChange} 
 error={errors.telephone}
 icon="call"
 />
 </div>

 <div className="grid md-grid-cols-2 gap-5">
 <Input 
 label="Mot de passe"
 name="password"
 type="password"
 placeholder="••••••••"
 value={formData.password} 
 onChange={handleChange} 
 error={errors.password}
 icon="lock"
 />
 <Input 
 label="Confirmer"
 name="confirmPassword"
 type="password"
 placeholder="••••••••"
 value={formData.confirmPassword} 
 onChange={handleChange} 
 error={errors.confirmPassword}
 icon="verified_user"
 />
 </div>

 <Button type="submit"variant="primary"size="lg"className="w-full mt-4 py-4"loading={loading}>
 Créer mon compte
 </Button>
 </form>

 <p className="mt-8 text-center text-slate-600">
 Déjà un compte ? <Link to="/login"className="text-deep-blue font-bold hover:underline">Se connecter</Link>
 </p>
 </section>
 </main>
 </div>
 );
};

export default RegisterPage;
