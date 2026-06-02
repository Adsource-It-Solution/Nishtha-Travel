import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, PhoneCall, Search } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Flights', path: '/flights' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Holiday Packages', path: '/packages' },
    // { name: 'Visa Services', path: '/visa' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen
          ? 'bg-white border-b border-[#E5E0D8] py-3 shadow-sm'
          : 'bg-brand-light/90 backdrop-blur-sm py-4 border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-1 flex-col ml-10">

              {/* TOP ROW */}
              <div className="flex items-center justify-between gap-8 pb-2">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                  <div className="relative flex items-center justify-center w-12 h-12 bg-white transition-all border border-[#E5E0D8] rounded-none">
                    <img
                      src="/favicon.svg"
                      alt="Nishtha Travel Logo"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-extrabold tracking-[0.1em] font-sans text-blue-900 group-hover:text-brand-blue transition-colors block leading-tight">
                      NISHTHA TRAVELS
                    </span>
                    <span className="text-[8px] block font-bold tracking-[0.2em] uppercase text-purple-600 -mt-0.5 leading-none">
                      Concierge PVT. LTD.
                    </span>
                  </div>
                </Link>

                {/* Search */}
                <div className="flex-1 max-w-4xl">
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Find Your Perfect Tour Package"
                      className="
            w-full
            h-14
            rounded-full
            bg-[#F4F4F4]
            border
            border-gray-200
            pl-14
            pr-6
            text-base
            outline-none
            focus:border-brand-purple
          "
                    />
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-8">
                  <button className="font-semibold flex items-center gap-2">
                    🌐 EN
                  </button>

                  <Link
                    to="/dashboard"
                    className="
          bg-black
          text-white
          px-4
          py-2
          rounded-2xl
          font-semibold
          hover:bg-gray-900
          transition-all
        "
                  >
                    Login
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#E5E0D8]" />

              {/* BOTTOM ROW */}
              <div className="flex items-center justify-between h-14">

                <nav className="flex items-center gap-10">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;

                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`relative font-semibold transition-colors ${isActive
                          ? 'text-brand-blue'
                          : 'text-gray-700 hover:text-brand-blue'
                          }`}
                      >
                        {link.name}

                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute -bottom-5 left-0 right-0 h-[2px] bg-brand-blue"
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* WhatsApp Card */}
                <div className="flex items-center h-full mt-2 border-green-600 pl-8 border-x-2 border-b-2 px-4">

                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 text-green-600" />
                  </div>

                  <div className="ml-4">
                    <p className="text-sm text-green-600">
                      WhatsApp
                    </p>

                    <p className="font-bold text-lg text-green-600">
                      +91 99999 99999
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-brand-purple p-2 focus:outline-none transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-b border-[#E5E0D8] overflow-hidden shadow-sm"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2.5 text-xs font-extrabold tracking-wider uppercase transition-all rounded-none ${isActive
                        ? 'bg-[#FDFBF7] text-brand-purple border-l-2 border-brand-purple pl-3'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-brand-blue'
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-[#E5E0D8] flex flex-col gap-2.5 px-4">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 py-1.5 text-xs font-bold text-slate-600 hover:text-brand-blue transition-colors"
                  >
                    <User className="w-4 h-4 text-brand-purple" />
                    <span>Lounge Member Hub</span>
                  </Link>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 py-1.5 text-xs font-bold text-slate-600 hover:text-brand-blue transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-brand-purple" />
                    <span>WhatsApp Concierge</span>
                  </a>
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="btn-gold w-full mt-2 !py-2.5 !text-[10px] text-center font-bold tracking-wider rounded-none"
                  >
                    Book Journey
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
