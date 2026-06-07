import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { motion } from 'framer-motion';
import { Key, User, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('admin@nishtha-travels.com');
  const [password, setPassword] = useState('AdminSecurePassword123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const payload = {
      identifier,
      password
    };

    fetch(`${apiUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.message || 'Unauthorized login attempt') });
        }
        return res.json();
      })
      .then(data => {
        setSuccessMsg('Administrative access granted. Redirecting to dashboard...');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminToken', data.token);
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      })
      .catch(err => {
        console.error('Admin login error:', err);
        setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center pt-24 pb-12 px-6 relative">
      <Navbar />

      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-[#E5E0D8] rounded-[28px] p-8 relative z-10 shadow-luxury"
      >
        <div className="text-center mb-8">
          <Key className="w-10 h-10 text-brand-purple mx-auto mb-2" />
          <h2 className="text-2xl font-serif text-brand-blue font-bold">Admin Concierge Login</h2>
          <p className="text-xs text-slate-500 mt-1">Please log in to manage client travel requirements and itineraries.</p>
        </div>

        {errorMsg && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-4 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-1.5">
            <AlertCircle size={14} />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 text-xs font-semibold rounded-xl text-center flex items-center justify-center gap-1.5">
            <CheckCircle size={14} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="relative">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider absolute top-2 left-4">Email / Phone</label>
            <User className="w-4 h-4 text-slate-400 absolute left-4 top-7" />
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin@nishtha-travels.com"
              className="glass-input pl-10 pt-7 pb-2 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none"
            />
          </div>

          <div className="relative">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider absolute top-2 left-4">Password</label>
            <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-7" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="glass-input pl-10 pt-7 pb-2 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-4 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Verifying Session...' : 'Authorize Administrative Access'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
