import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, PhoneCall, Search, MessageCircle, ArrowRight, User2 } from 'lucide-react';
import { mockHotels, mockPackages, mockCabs } from '../data/mockData';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const tempSuggestions: any[] = [];

    // Filter Hotels
    mockHotels.forEach(h => {
      if (h.location.toLowerCase().includes(query) || h.name.toLowerCase().includes(query)) {
        tempSuggestions.push({
          title: h.name,
          subtitle: `Hotel in ${h.location} • ₹${h.pricePerNight}/night`,
          type: 'hotel',
          path: `/hotel/${h.id}`
        });
      }
    });

    // Filter Packages
    mockPackages.forEach(p => {
      if (p.destination.toLowerCase().includes(query) || p.title.toLowerCase().includes(query)) {
        tempSuggestions.push({
          title: p.title,
          subtitle: `Package to ${p.destination} • ${p.duration} • $${p.price}`,
          type: 'package',
          path: `/package/${p.id}`
        });
      }
    });

    // Filter Cabs
    mockCabs.forEach(c => {
      if (c.name.toLowerCase().includes(query) || c.type.toLowerCase().includes(query)) {
        tempSuggestions.push({
          title: c.name,
          subtitle: `Cab Ride • ${c.category} • ₹${c.basePrice} base`,
          type: 'cab',
          path: `/cab/${c.id}`
        });
      }
    });

    // Filter special page keywords
    if ('flight'.includes(query) || 'plane'.includes(query) || 'aviation'.includes(query)) {
      tempSuggestions.push({
        title: 'Flight Bookings',
        subtitle: 'Search & reserve premium flights',
        type: 'page',
        path: '/flights'
      });
    }
    if ('train'.includes(query) || 'rail'.includes(query) || 'irctc'.includes(query)) {
      tempSuggestions.push({
        title: 'Train Tickets',
        subtitle: 'Search routes & check PNR availability',
        type: 'page',
        path: '/trains'
      });
    }
    if ('profile'.includes(query) || 'dashboard'.includes(query) || 'booking'.includes(query) || 'history'.includes(query)) {
      tempSuggestions.push({
        title: 'User Dashboard',
        subtitle: 'Manage your itineraries & profile settings',
        type: 'page',
        path: '/dashboard'
      });
    }

    setSuggestions(tempSuggestions.slice(0, 8));
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();

    if (query.includes('train') || query.includes('rail') || query.includes('irctc')) {
      navigate('/trains');
      setSearchQuery('');
      setSuggestions([]);
      return;
    }
    if (query.includes('flight') || query.includes('plane') || query.includes('aviation')) {
      navigate('/flights');
      setSearchQuery('');
      setSuggestions([]);
      return;
    }
    if (query.includes('profile') || query.includes('dashboard') || query.includes('wallet') || query.includes('booking') || query.includes('history')) {
      navigate('/dashboard');
      setSearchQuery('');
      setSuggestions([]);
      return;
    }
    if (query.includes('cab') || query.includes('taxi') || query.includes('car')) {
      navigate('/cabs');
      setSearchQuery('');
      setSuggestions([]);
      return;
    }
    if (query.includes('hotel') || query.includes('resort') || query.includes('stay')) {
      navigate('/hotels');
      setSearchQuery('');
      setSuggestions([]);
      return;
    }
    if (query.includes('package') || query.includes('tour') || query.includes('holiday')) {
      navigate('/packages');
      setSearchQuery('');
      setSuggestions([]);
      return;
    }

    navigate(`/packages?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
    setSuggestions([]);
  };


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
    { name: 'Trains', path: '/trains' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Holiday Packages', path: '/packages' },
    { name: 'Cabs', path: '/cabs' },
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
          ? 'bg-white border-b border-[#E5E0D8] py-2 lg:py-3 shadow-sm'
          : 'bg-brand-light/90 backdrop-blur-sm py-2 lg:py-4 border-b border-transparent'
          }`}
      >
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-1 flex-col ml-10">

              {/* TOP ROW */}
              <div className="flex items-center justify-between gap-8 pb-2">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                  <div className="relative flex items-center justify-center w-16 h-14 transition-all">
                    <img
                      src="/logo.png"
                      alt="Nishtha Travel Logo"
                      className="w-24 h-16 object-contain"
                    />
                  </div>
                  <div>
                    <img
                      src="/favicon.png"
                      alt="Nishtha Travel Logo"
                      className="w-56 h-16 object-contain"
                    />
                  </div>
                </Link>

                {/* Search */}
                <div className="flex-1 max-w-3xl relative">
                  <form onSubmit={handleSearchSubmit} className="relative">
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
                  </form>

                  {/* Suggestions Popover */}
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-16 left-0 right-0 bg-white border border-slate-200 rounded-[24px] shadow-2xl z-50 max-h-96 overflow-y-auto overflow-x-hidden p-2"
                      >
                        {suggestions.map((item, index) => (
                          <Link
                            key={index}
                            to={item.path}
                            onClick={() => {
                              setSearchQuery('');
                              setSuggestions([]);
                            }}
                            className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 rounded-xl transition-all duration-200"
                          >
                            <div className="flex-1 min-w-0 pr-4">
                              <span className="text-slate-800 font-bold block text-sm truncate font-poppins">{item.title}</span>
                              <span className="text-slate-500 text-xs mt-0.5 block truncate font-roboto font-light">{item.subtitle}</span>
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0
                              ${item.type === 'page' ? 'bg-blue-50 text-blue-600' :
                                item.type === 'hotel' ? 'bg-purple-50 text-purple-600' :
                                item.type === 'package' ? 'bg-yellow-50 text-yellow-600' :
                                'bg-emerald-50 text-emerald-600'
                              }
                            `}>
                              {item.type}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-8">
                  {/* <button className="font-semibold flex items-center gap-2">
                    🌐 EN
                  </button> */}

                  <Link
                    to="/login"
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
                <div className="flex items-center h-full mt-2  pl-8  px-4">

                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 text-green-600" />
                  </div>

                  <div className="ml-4">
                    <p className="text-sm text-green-600">
                      WhatsApp
                    </p>

                    <div className="font-bold text-lg text-green-600 flex flex-row gap-2">
                      <a href="tel:+919718216528" className="">
                        9718216528
                      </a>
                      <div className='border-l-2' />
                      <a href="tel:+919718566528" className="">
                        9718566528
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Mobile Layout (Logo & Menu Button) */}
            <div className="lg:hidden flex items-center justify-between w-full">

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB]/10 to-[#F97316]/10 flex items-center justify-center border border-[#2563EB]/10">
                  <img
                    src="/logo.png"
                    alt="Nishtha Travel"
                    className="w-8 h-8 object-contain"
                  />
                </div>

                <div>
                  <img
                    src="/favicon.png"
                    alt="Nishtha Travel"
                    className="w-36 h-auto object-contain"
                  />
                </div>
              </Link>

              {/* Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="
      w-11
      h-11
      rounded-2xl
      bg-white
      border
      border-slate-200
      shadow-sm
      flex
      items-center
      justify-center
      text-[#2563EB]
      hover:bg-[#2563EB]
      hover:text-white
      transition-all
    "
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile menu Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="
        lg:hidden
        bg-white
        rounded-b-[32px]
        border-b
        border-slate-200
        shadow-2xl
        overflow-hidden
      "
            >
              <div className="p-5">

                {/* Links */}
                <div className="space-y-2">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;

                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                  flex
                  items-center
                  justify-between
                  px-5
                  py-4
                  rounded-2xl
                  transition-all

                  ${isActive
                            ? "bg-[#2563EB] text-white shadow-lg"
                            : "bg-[#F8FAFC] hover:bg-[#EFF6FF] text-slate-700"
                          }
                `}
                      >
                        <span className="font-medium">
                          {link.name}
                        </span>

                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 border-t pt-6">
                  <div className="grid grid-cols-2 gap-3">
                    {/* <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                p-4
                flex
                flex-col
                items-center
                gap-2
                hover:border-[#2563EB]
                transition-all
              "
                    >
                      <User className="w-5 h-5 text-[#2563EB]" />
                      <span className="text-xs font-medium">
                        Dashboard
                      </span>
                    </Link> */}
                    <a
                      href="https://wa.me/919718216528"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                bg-white
                border
                border-slate-200
                rounded-2xl
                p-4
                flex
                flex-col
                items-center
                gap-2
                hover:border-[#25D366]
                transition-all
              "
                    >
                      <MessageCircle className="w-5 h-5 text-[#25D366]" />
                      <span className="text-xs font-medium">
                        WhatsApp
                      </span>
                    </a>
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="
              bg-white
                border
                border-slate-200
                rounded-2xl
                p-4
                flex
                flex-col
                items-center
                gap-2
                hover:border-[#25D366]
                transition-all
            "
                    >
                      <User2 className='text-orange-500 w-5 h-5' />
                      <span className="text-xs font-medium">Book Your Journey</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
