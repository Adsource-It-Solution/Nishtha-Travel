import React, { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { motion, } from 'framer-motion';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, } from 'firebase/auth';
import { Mail, Lock, Phone, ShieldCheck, Chrome, UserPlus, LogIn } from 'lucide-react';

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
<div className="flex items-center  justify-center p-8 pt-4 lg:p-8">

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="
      w-full
      max-w-xl
      bg-white
      rounded-[36px]
      border
      border-[#E6CFB7]/30
      shadow-[0_25px_60px_rgba(37,99,235,0.08)]
      p-10
      bg-yellow-500/20
    "
  >
        {/* Header logo/tag */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 flex flex-row mb-4">
             <img
                      src="/logo.png"
                      alt="Nishtha Travel Logo"
                      className="w-24 h-16 object-contain"
                    />
            <img
                      src="/favicon.png"
                      alt="Nishtha Travel Logo"
                      className="w-56 h-16 object-contain"
                    />
          </div>

          <h2 className="text-4xl font-bold font-poppins text-slate-900">
            {isSignUp ? "Create Your Account" : "Welcome Back"}
          </h2>

          <p className="mt-3 text-slate-600 font-roboto">
            {isSignUp
              ? "Join Nishtha Travel to manage bookings, itineraries and travel rewards."
              : "Sign in to access your bookings and upcoming journeys."}
          </p>
        </div>

        {/* Auth Method Selector */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={() => setAuthMethod("email")}
            className={`
      h-12
      rounded-2xl
      font-medium
      transition-all

      ${authMethod === "email"
                ? "bg-[#2563EB] text-white"
                : "bg-[#F8FAFC] border border-slate-200"
              }
    `}
          >
            Email
          </button>

          <button
            onClick={() => setAuthMethod("phone")}
            className={`
      h-12
      rounded-2xl
      font-medium
      transition-all

      ${authMethod === "phone"
                ? "bg-[#2563EB] text-white"
                : "bg-[#F8FAFC] border border-slate-200"
              }
    `}
          >
            OTP Login
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
                className="
w-full
h-14
pl-12
pr-4
rounded-2xl
border
border-slate-200
bg-white
focus:outline-none
focus:border-[#2563EB]
focus:ring-4
focus:ring-[#2563EB]/10
transition-all
"/>
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
                className="
w-full
h-14
pl-12
pr-4
rounded-2xl
border
border-slate-200
bg-white
focus:outline-none
focus:border-[#2563EB]
focus:ring-4
focus:ring-[#2563EB]/10
transition-all
"/>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
  w-full
  h-14
  rounded-2xl
  bg-[#F97316]
  hover:bg-orange-600
  text-white
  font-semibold
  flex
  items-center
  justify-center
  gap-2
  transition-all
  shadow-lg
">
              {loading ? 'Authenticating...' : isSignUp ? (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
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
                className="
w-full
h-14
pl-12
pr-4
rounded-2xl
border
border-slate-200
bg-white
focus:outline-none
focus:border-[#2563EB]
focus:ring-4
focus:ring-[#2563EB]/10
transition-all
"/>
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
                  className="
w-full
h-14
pl-12
pr-4
rounded-2xl
border
border-slate-200
bg-white
focus:outline-none
focus:border-[#2563EB]
focus:ring-4
focus:ring-[#2563EB]/10
transition-all
"/>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
w-full
h-14
rounded-2xl
bg-[#F97316]
hover:bg-orange-600
text-white
font-semibold
transition-all
shadow-lg
" >
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
          className="
w-full
h-14
rounded-2xl
border
border-slate-500
hover:bg-slate-50
flex
items-center
justify-center
gap-3
font-medium
">
          <Chrome className="w-4 h-4" />
          <span>Authenticate with Google</span>
        </button>

        {/* Toggle sign in / sign up */}
        <div className="mt-8 pt-6 border-t text-center">

          <p className="text-slate-500">
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>

          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className="
      mt-2
      text-[#2563EB]
      font-semibold
      hover:underline
    "
          >
            {isSignUp
              ? "Sign In"
              : "Create Account"}
          </button>

        </div>
      </motion.div>
    </div>
  );
};
