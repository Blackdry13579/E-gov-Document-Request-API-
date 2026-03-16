import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotif } from '../context/NotifContext';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
  const { login } = useAuth();
  const { addNotif } = useNotif();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    const result = await login(formData);
    setLoading(false);

    if (result.success) {
      addNotif('Connexion réussie !', 'success');
      const role = result.data.user.role;
      if (role === 'CITOYEN') navigate('/dashboard');
      else if (role.startsWith('AGENT_') || role === 'SUPERVISEUR') navigate('/agent/dashboard');
      else if (role === 'ADMIN') navigate('/admin/dashboard');
    } else {
      addNotif(result.error, 'danger');
    }
  };

  return (
    <div className="auth-page login-page flex min-h-screen bg-slate-100 p-4 md:p-8 items-center justify-center">
      <main className="auth-card bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md-flex-row w-full max-w-5xl min-h-[600px]">
        
        {/* Left Side - Hero (Same style as Register) */}
        <section className="auth-hero md:w-1/2 relative hidden md-block bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJ_XyHL8pUXDOhTBoIOjpmfc-_fRraL-w577XRMzLYIxj7KCRIBcgUL78RJpufVJ46onhU2xaLZVc5FBzVDU9LbicqxryYSKytyh-K22lU3IBUBgYD_6Ll_WnIWKm44YgTysDwC4pSuFHLUHWtnXaFPU5GG_japKgBq6j3vrHengqkrpeXhFq1rEkGEqaRkBE3WBdXwV3ccQXuTcc-T7HDMSiNoJrMN5DJPRemVt0_0CisCZ_hc-3XHc1CXr3B7NEtoSu7vHp7fsQ')` }}>
          <div className="absolute inset-0 gradient-overlay flex flex-col justify-between p-12 text-white">
            <div className="hero-top flex items-start gap-4">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQXJybPNH4004ieJqy4yv_yu4-5EpOcSBSaOO_Hfn2Wj4YVRi-8XLAKhL6-XyL5A5sJK2Vutu2I6n13d96zWO5fvJ9PuiFacQ1QuvgWfxI-zSzWMUlEjw_y78QS0UNrzcx4D_yUORISSC3Asa6rus9dnL4ljwWwlroq8B0ZSYT-yPHMr0f-onXHJ2n04vyiPngxuSlYfv47ysGJO7jN-ltxiaK25fIqnnZh2rXmSZSVMpDIyXR3x1hd1A9bzZVc3hD7av06Lqz-rc" alt="Emblem" className="w-16" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Portail Citoyen</p>
                <h2 className="text-2xl font-bold">E-Gov</h2>
              </div>
            </div>

            <div className="hero-bottom">
               <h1 className="text-4xl font-bold leading-tight mb-4">Content de vous revoir !</h1>
               <p className="text-blue-50/80">Connectez-vous pour continuer vos démarches en toute sécurité.</p>
            </div>
          </div>
        </section>

        {/* Right Side - Form */}
        <section className="auth-form-container md:w-1/2 w-full p-12 md:p-16 flex flex-col justify-center">
          <div className="form-header mb-10 flex items-center gap-4">
             <div className="w-12 h-12 bg-deep-blue rounded-2xl flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white">fingerprint</span>
             </div>
             <h3 className="text-2xl font-bold text-deep-blue tracking-tight">Connexion</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Email" 
              name="email" 
              type="email"
              placeholder="votre@email.com" 
              value={formData.email} 
              onChange={handleChange} 
              icon="mail"
              required
            />

            <div className="space-y-2">
              <Input 
                label="Mot de passe" 
                name="password" 
                type="password"
                placeholder="••••••••" 
                value={formData.password} 
                onChange={handleChange} 
                icon="lock"
                required
              />
              <div className="flex justify-end">
                <Link to="#" className="text-xs text-primary font-semibold hover:underline">Mot de passe oublié ?</Link>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full py-4 mt-2" loading={loading}>
              Se connecter
            </Button>
          </form>

          <p className="mt-10 text-center text-slate-600">
            Nouveau ici ? <Link to="/register" className="text-deep-blue font-bold hover:underline">Créer un compte</Link>
          </p>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
