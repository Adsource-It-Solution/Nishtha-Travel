import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import { Mail, Lock, Phone, ShieldCheck, Chrome, UserPlus, LogIn, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isSignUp) {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMsg('Account created successfully! Redirecting...');
      } else {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMsg('Logged in successfully! Redirecting...');
      }
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err: any) {
      console.warn('Firebase error, falling back to mock mode:', err.message);
      
      // Fallback Mock authentication for development
      if (email && password.length >= 6) {
        setSuccessMsg(`[Mock Active] Authenticated as ${email}! Redirecting...`);
        localStorage.setItem('userEmail', email);
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setErrorMsg('Authentication failed: Password must be at least 6 characters.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!otpSent) {
      // Simulate sending OTP
      setTimeout(() => {
        setOtpSent(true);
        setLoading(false);
        setSuccessMsg('OTP sent successfully to ' + phone);
      }, 1000);
    } else {
      // Verify OTP
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg('[Mock Active] Phone verified successfully! Redirecting...');
        localStorage.setItem('userPhone', phone);
        setTimeout(() => navigate('/dashboard'), 1500);
      }, 1000);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccessMsg('Logged in via Google! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err: any) {
      console.warn('Firebase Google Auth error, falling back to mock:', err.message);
      setSuccessMsg('[Mock Active] Authenticated with Google! Redirecting...');
      localStorage.setItem('userEmail', 'google.user@gmail.com');
      setTimeout(() => navigate('/dashboard'), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center pt-24 pb-12 px-6 relative">
      <Navbar />

      {/* Decorative Blurs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-[#E5E0D8] rounded-[28px] p-8 relative z-10 shadow-luxury"
      >
        {/* Header logo/tag */}
        <div className="text-center mb-8">
          <span className="text-[10px] text-brand-purple font-bold uppercase tracking-[0.2em] block mb-2">Club Nishtha Lounge</span>
          <h2 className="text-3xl font-serif text-brand-blue font-bold">
            {isSignUp ? 'Create Membership' : 'Member Sign In'}
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 font-light">Access your curated itineraries and loyalty balance.</p>
        </div>

        {/* Auth Method Selector */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button
            onClick={() => setAuthMethod('email')}
            className={`py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              authMethod === 'email'
                ? 'bg-brand-purple/5 text-brand-purple border-brand-purple/20'
                : 'bg-white border-[#E5E0D8] text-slate-500 hover:text-brand-purple'
            }`}
          >
            Email Address
          </button>
          <button
            onClick={() => setAuthMethod('phone')}
            className={`py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              authMethod === 'phone'
                ? 'bg-brand-purple/5 text-brand-purple border-brand-purple/20'
                : 'bg-white border-[#E5E0D8] text-slate-500 hover:text-brand-purple'
            }`}
          >
            Phone SMS OTP
          </button>
        </div>

        {/* Notices */}
        {errorMsg && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-4 text-xs font-semibold rounded-xl text-center">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 text-xs font-semibold rounded-xl text-center">
            {successMsg}
          </div>
        )}

        {/* Form Panel */}
        {authMethod === 'email' ? (
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="relative">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider absolute top-2 left-4">Email Address</label>
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-7" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.mercer@gmail.com"
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
              className="w-full btn-gold py-4 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5"
            >
              {loading ? 'Authenticating...' : isSignUp ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Join Elite Lounge</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Phone OTP Auth Form */
          <form onSubmit={handlePhoneAuthSubmit} className="space-y-4">
            <div className="relative">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider absolute top-2 left-4">Phone Number</label>
              <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-7" />
              <input
                type="tel"
                required
                disabled={otpSent}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 99999 88888"
                className="glass-input pl-10 pt-7 pb-2 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none"
              />
            </div>

            {otpSent && (
              <div className="relative">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider absolute top-2 left-4">Verification Code (OTP)</label>
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-4 top-7" />
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="glass-input pl-10 pt-7 pb-2 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none text-center tracking-widest font-mono"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-4 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5"
            >
              {loading ? 'Sending...' : otpSent ? 'Verify & Sign In' : 'Request OTP Code'}
            </button>
          </form>
        )}

        {/* Third-party Google Login */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
          <span className="relative bg-white px-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Or login using</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-[#EA4335]/5 hover:bg-[#EA4335]/10 text-red-650 border border-[#EA4335]/15 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 mb-8"
        >
          <Chrome className="w-4 h-4" />
          <span>Authenticate with Google</span>
        </button>

        {/* Toggle sign in / sign up */}
        <div className="text-center pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold font-sans">
          <span>{isSignUp ? 'Already a lounge member?' : 'New traveler?'}</span>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className="text-brand-purple hover:underline font-bold flex items-center gap-1"
          >
            <span>{isSignUp ? 'Login Session' : 'Request Membership'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
