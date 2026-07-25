import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  ShieldCheck
} from "lucide-react";

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@nishtha-travels.com');
  const [password, setPassword] = useState('');
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
      email,
      password
    };

    fetch(`${apiUrl}/api/auth/admin/login`, {
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
      .then((response) => {
        console.log("Login Response:", response);

        const token = response.data?.token;
        const user = response.data?.user;

        if (!token) {
          throw new Error("Token not received from backend.");
        }

        localStorage.setItem("adminToken", token);
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminUser", JSON.stringify(user));

        setSuccessMsg("Administrative access granted. Redirecting...");
        setTimeout(() => navigate("/admin/dashboard"), 1500);
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
    <div className=" bg-gradient-to-br from-[#F7F5F2] via-white to-[#FFF7E7] relative overflow-hidden">
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-blue-200 rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-[120px] opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-16">
        <div
          className="grid lg:grid-cols-2 bg-white rounded-[35px] mt-8 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.08)] border border-gray-100">
          {/* left side  */}
          <div className="hidden lg:flex flex-1 py-5 lg:py-3 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50">

            {/* Decorative Blur */}
            <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl" />

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 flex flex-col justify-center w-full px-16 py-16"
            >

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white shadow-md border border-blue-100 rounded-full px-4 py-2 w-fit">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                  Secure Admin Access
                </span>
              </div>

              {/* Icon */}
              <div className='flex justify-center'>

                <div className="mt-4 size-20 flex items-center justify-center">
                  <img src="/logo.png" alt="Nishtha Travels" className="size-13 rounded-full" />
                </div>
              </div>

              {/* Heading */}
              <h1 className="mt-2 text-4xl font-bold leading-tight text-slate-900">
                <span className="block text-blue-600">
                  Travel Admin Login Portal
                </span>
              </h1>

            </motion.div>

          </div>

          {/* right side  */}
          <div className="flex w-full flex-1 items-center justify-center px-8 lg:px-16 py-12">
            <div className="w-full max-w-lg">

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

              <form onSubmit={handleAdminLogin} className="space-y-8">
                <div className="relative">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider absolute top-2 left-4">Email / Phone</label>
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-7" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className="glass-input pl-10 pt-7 pb-2 w-full text-xs font-semibold focus:border-yellow-500 focus:outline-none rounded-lg"
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
                    placeholder=" Password"
                    className="glass-input pl-10 pt-7 pb-2 w-full text-xs font-semibold focus:border-yellow-500 focus:outline-none rounded-lg"
                  />

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 rounded-lg hover:bg-brand-blue hover:text-white py-4 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Verifying Login' : 'Admin Login'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
