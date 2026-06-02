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
                <span className="text-sm font-extrabold tracking-[0.1em] font-sans text-brand-blue group-hover:text-brand-purple transition-colors block leading-tight">
                  NISHTHA
                </span>
                <span className="text-[8px] block font-bold tracking-[0.2em] uppercase text-brand-purple -mt-0.5 leading-none">
                  Travel Concierge
                </span>
              </div>
            </Link>

            {/* Desktop Center Section */}
            <div className="hidden lg:flex flex-col flex-1 min-w-0 px-6 xl:px-10">
              {/* Title */}
             

              {/* Search Bar */}
              <div className="w-full flex justify-center">
                <div className="relative w-full max-w-2xl xl:max-w-3xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations, hotels, flights, holiday packages..."
                    className="w-full h-11 xl:h-12 pl-11 pr-28 border border-[#E5E0D8] bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-brand-purple transition-all duration-300"
                  />

                  <button
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 xl:h-9 px-4 xl:px-5 bg-brand-purple text-white text-[10px] xl:text-xs font-bold uppercase tracking-wider hover:bg-brand-blue transition-all duration-300"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="flex justify-center my-4">
                <div className="w-full max-w-3xl border-t border-[#E5E0D8]" />
              </div>
              {/* Navigation Links */}
              <nav className="flex flex-wrap items-center justify-center gap-x-6 xl:gap-x-8 gap-y-2 mt-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="relative py-1 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.15em] transition-colors whitespace-nowrap"
                    >
                      <span
                        className={
                          isActive
                            ? 'text-brand-purple'
                            : 'text-slate-600 hover:text-brand-blue'
                        }
                      >
                        {link.name}
                      </span>

                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brand-purple"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <div
                className="text-center gap-2 px-4 py-2 rounded-none bg-white border border-[#E5E0D8] hover:border-brand-purple text-xs font-bold text-slate-700 transition-all duration-300">
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='flex gap-2 text-center pb-2'
                >
                  <PhoneCall className="w-3.5 h-3.5 text-green-600" />
                  <h2 className="tracking-wide text-green-600">Watsapp Call</h2>

                </a>
                <h2 className="tracking-wide text-green-600 text-sm">+91 99999 99999</h2>
              </div>
              <Link to="/dashboard" className="btn-gold !px-4 !py-2 !text-[10px] uppercase tracking-[0.18em] font-bold rounded-none">
                Lounge Hub
              </Link>
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
