import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Heart, Wallet, Bell, Settings, Award, MapPin, CheckCircle2, ShieldCheck, Mail, Phone, Save, Gift, Check } from 'lucide-react';
import { mockHotels, mockFlights } from '../data/mockData';
import { Link } from 'react-router-dom';

type ActiveTab = 'bookings' | 'wishlist' | 'wallet' | 'settings' | 'notifications';

export const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bookings');

  // Settings profile state
  const [profileName, setProfileName] = useState('Alexander Mercer');
  const [profileEmail, setProfileEmail] = useState('alex.mercer@nishtha-concierge.com');
  const [profilePhone, setProfilePhone] = useState('+91 99999 88888');
  const [passportNum, setPassportNum] = useState('IN892740B');
  const [showSettingsSuccess, setShowSettingsSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSettingsSuccess(true);
    setTimeout(() => setShowSettingsSuccess(false), 3000);
  };

  const menuItems = [
    { id: 'bookings', label: 'Curated Itineraries', icon: Briefcase },
    { id: 'wishlist', label: 'Saved Collections', icon: Heart },
    { id: 'wallet', label: 'Concierge Wallet', icon: Wallet },
    { id: 'settings', label: 'Profile Settings', icon: Settings },
    { id: 'notifications', label: 'Inbox', icon: Bell, badge: 2 },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-brand-light text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header summary card */}
        <div className="glass-card p-6 md:p-8 mb-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-none">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-none bg-brand-blue flex items-center justify-center text-brand-purple font-serif text-2xl">
              AM
            </div>
            <div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h1 className="text-xl md:text-2xl font-serif text-brand-blue">{profileName}</h1>
                <span className="px-2.5 py-0.5 rounded-none text-[8px] uppercase tracking-[0.2em] bg-brand-purple/10 text-brand-purple border border-brand-purple/20 font-bold">
                  Gold Member
                </span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1.5">Club ID: #NC-9824 • Gurgaon Lounge Member</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-8">
            <div className="text-center">
              <span className="text-[9px] text-slate-500 uppercase tracking-[0.15em] font-bold block">Wallet Balance</span>
              <span className="text-xl font-serif text-brand-blue mt-1 block">$1,420 <span className="text-[10px] text-slate-400 font-sans tracking-widest">USD</span></span>
            </div>
            <div className="w-[1px] bg-[#E5E0D8]" />
            <div className="text-center">
              <span className="text-[9px] text-slate-500 uppercase tracking-[0.15em] font-bold block">Concierge Points</span>
              <span className="text-xl font-serif text-brand-blue mt-1 block">24,500 <span className="text-[10px] text-slate-400 font-sans tracking-widest">Pts</span></span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Dashboard Left Sidebar Tabs Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <div className="glass-card p-4 flex flex-row overflow-x-auto whitespace-nowrap gap-2 scrollbar-none lg:flex-col lg:space-y-1 shadow-none">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ActiveTab)}
                    className={`flex items-center justify-between px-4 py-3 rounded-none text-[10px] font-bold uppercase tracking-[0.15em] transition-all focus:outline-none shrink-0 lg:w-full ${isActive
                        ? 'bg-brand-blue text-white'
                        : 'text-slate-600 hover:bg-brand-purple/5 hover:text-brand-purple'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-none text-[9px] font-bold ${isActive ? 'bg-white text-brand-blue' : 'bg-brand-purple text-white'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dashboard Right Tabs Content Display Panel */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">

              {/* Tab Content: Bookings */}
              {activeTab === 'bookings' && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h2 className="text-base font-serif text-brand-blue uppercase tracking-widest border-b border-[#E5E0D8] pb-3">Curated Reservations</h2>

                  {/* Booking Card 1 (Hotel) */}
                  <div className="glass-card p-6 flex flex-col md:flex-row justify-between gap-6 border-l-2 border-l-brand-purple shadow-none">
                    <div className="space-y-4 flex-grow">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-none text-[8px] font-bold uppercase tracking-[0.2em] bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                          Resort Stay
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold tracking-wider">Confirmation: #MLE-89240</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-serif text-brand-blue">{mockHotels[0].name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-purple" />
                          <span>{mockHotels[0].location}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 max-w-sm">
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Arrival</span>
                          <span className="text-xs text-brand-blue font-bold block mt-0.5">June 15, 2026</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Departure</span>
                          <span className="text-xs text-brand-blue font-bold block mt-0.5">June 25, 2026</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#E5E0D8] md:pl-6 min-w-[140px]">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">✓ Confirmed</span>
                        <span className="text-[10px] text-slate-500 block mt-1">2 Guests • 1 Suite</span>
                      </div>
                      <button className="btn-navy rounded-none !py-2 !px-4">
                        Voucher
                      </button>
                    </div>
                  </div>

                  {/* Booking Card 2 (Flight) */}
                  <div className="glass-card p-6 flex flex-col md:flex-row justify-between gap-6 border-l-2 border-l-brand-blue shadow-none">
                    <div className="space-y-4 flex-grow">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-none text-[8px] font-bold uppercase tracking-[0.2em] bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                          Aviation Flight
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold tracking-wider">Itinerary: #LHR-QR704</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-serif text-brand-blue">{mockFlights[1].airlineName}</h3>
                        <div className="flex items-center gap-6 mt-3 py-3 border-y border-[#E5E0D8] max-w-md">
                          <div>
                            <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Depart</span>
                            <span className="text-base font-serif text-brand-blue block mt-1">{mockFlights[1].departureCode}</span>
                            <span className="text-[10px] text-slate-500 block">{mockFlights[1].departureCity}</span>
                          </div>
                          <div className="flex-grow flex flex-col items-center px-4 relative">
                            <span className="text-[9px] text-slate-500 uppercase tracking-widest">{mockFlights[1].duration}</span>
                            <div className="w-full h-[1px] bg-[#E5E0D8] relative my-1">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-purple" />
                            </div>
                            <span className="text-[9px] text-brand-purple font-bold uppercase tracking-wider">1 Stop</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Arrive</span>
                            <span className="text-base font-serif text-brand-blue block mt-1">{mockFlights[1].arrivalCode}</span>
                            <span className="text-[10px] text-slate-500 block">{mockFlights[1].arrivalCity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#E5E0D8] md:pl-6 min-w-[140px]">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">✓ Confirmed</span>
                        <span className="text-[10px] text-slate-500 block mt-1">2 Passengers • Business</span>
                      </div>
                      <button className="btn-navy rounded-none !py-2 !px-4">
                        Boarding Pass
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab Content: Wishlist */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h2 className="text-base font-serif text-brand-blue uppercase tracking-widest border-b border-[#E5E0D8] pb-3">Saved Curation</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mock Saved Item 1 */}
                    <div className="glass-card overflow-hidden group bg-white border border-[#E5E0D8] shadow-none rounded-none">
                      <div className="h-44 relative">
                        <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80" alt="Resort" className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 w-8 h-8 rounded-none bg-brand-blue/90 flex items-center justify-center text-brand-purple">
                          <Heart className="w-4 h-4 fill-brand-purple" />
                        </span>
                      </div>
                      <div className="p-5 space-y-3">
                        <span className="text-[9px] text-brand-purple font-bold uppercase tracking-widest block">Hotel</span>
                        <h4 className="font-serif text-brand-blue text-base truncate">{mockHotels[1].name}</h4>
                        <p className="text-slate-500 text-xs truncate">{mockHotels[1].location}</p>
                        <div className="flex justify-between items-center border-t border-[#E5E0D8] pt-3">
                          <span className="text-base font-serif text-brand-blue">${mockHotels[1].pricePerNight}<span className="text-[10px] text-slate-500 font-sans tracking-normal"> /Ngt</span></span>
                          <button className="btn-gold !py-2 !px-4 rounded-none !text-[9px]">Book Suite</button>
                        </div>
                      </div>
                    </div>

                    {/* Mock Saved Item 2 */}
                    <div className="glass-card overflow-hidden group bg-white border border-[#E5E0D8] shadow-none rounded-none">
                      <div className="h-44 relative">
                        <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80" alt="Destination" className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 w-8 h-8 rounded-none bg-brand-blue/90 flex items-center justify-center text-brand-purple">
                          <Heart className="w-4 h-4 fill-brand-purple" />
                        </span>
                      </div>
                      <div className="p-5 space-y-3">
                        <span className="text-[9px] text-brand-purple font-bold uppercase tracking-widest block">Destination</span>
                        <h4 className="font-serif text-brand-blue text-base truncate">Amalfi Coast, Positano</h4>
                        <p className="text-slate-500 text-xs truncate">Italy, Southern Europe</p>
                        <div className="flex justify-between items-center border-t border-[#E5E0D8] pt-3">
                          <span className="text-xs text-slate-500 uppercase tracking-wider">Itinerary Active</span>
                          <Link to="/destination/dest-2" className="btn-navy !py-2 !px-4 rounded-none !text-[9px]">Explore</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab Content: Wallet */}
              {activeTab === 'wallet' && (
                <motion.div
                  key="wallet"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h2 className="text-base font-serif text-brand-blue uppercase tracking-widest border-b border-[#E5E0D8] pb-3">Premium Privileges</h2>

                  {/* Rewards tier progress card */}
                  <div className="glass-card p-8 space-y-6 relative overflow-hidden bg-white border border-[#E5E0D8] shadow-none rounded-none">
                    <div className="absolute top-0 right-0 p-4 text-brand-purple/5 pointer-events-none"><Award className="w-24 h-24" /></div>
                    <div className="space-y-2">
                      <span className="text-[9px] text-brand-purple font-bold uppercase tracking-widest block">Rewards Status</span>
                      <h3 className="text-2xl font-serif text-brand-blue">Gold Tier Membership</h3>
                      <p className="text-slate-600 text-xs max-w-md leading-relaxed font-light font-sans">
                        You are 5,500 points away from unlocking Platinum Tier and receiving complimentary private suite upgrades globally.
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs tracking-wider">
                        <span className="text-brand-purple font-bold">Gold (24,500 Pts)</span>
                        <span className="text-slate-400">Platinum (30,000 Pts)</span>
                      </div>
                      <div className="w-full h-1.5 bg-brand-light border border-[#E5E0D8] rounded-none overflow-hidden">
                        <div className="w-[81%] h-full bg-brand-purple rounded-none" />
                      </div>
                    </div>

                    {/* Benefits List */}
                    <div className="border-t border-[#E5E0D8] pt-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex gap-3 items-start">
                        <CheckCircle2 className="w-4 h-4 text-brand-purple mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider">Unlimited Lounge Access</h4>
                          <p className="text-[10px] text-slate-500 mt-1 font-light leading-relaxed">Free entries for member + 1 guest at airport lounges.</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start">
                        <CheckCircle2 className="w-4 h-4 text-brand-purple mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider">24/7 Gurgaon Concierge Desk</h4>
                          <p className="text-[10px] text-slate-500 mt-1 font-light leading-relaxed">Direct phone and chat access to luxury travel agents.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vouchers and Credit Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Club card */}
                    <div className="glass-card p-6 h-48 bg-brand-blue border border-brand-purple/20 relative overflow-hidden flex flex-col justify-between shadow-none rounded-none">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-purple">Nishtha Member Card</span>
                        <Award className="w-5 h-5 text-brand-purple" />
                      </div>
                      <div className="text-lg font-mono font-bold tracking-widest text-brand-purple/80">
                        * * * *   * * * *   * * * *   8924
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[8px] uppercase tracking-wider text-slate-400 block leading-none">Club Holder</span>
                          <span className="text-xs font-bold text-white mt-1 block leading-none">{profileName}</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400">Exp: 12/28</span>
                      </div>
                    </div>

                    {/* Credits */}
                    <div className="glass-card p-6 h-48 bg-white border border-[#E5E0D8] rounded-none shadow-none flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] text-brand-purple font-bold uppercase tracking-widest block">Available Credits</span>
                        <h4 className="text-3xl font-serif text-brand-blue mt-1.5">$1,420.00</h4>
                        <span className="text-[10px] text-slate-500 font-light block mt-1">Valid on flights, luxury suites, and curated packages.</span>
                      </div>
                      <button className="btn-gold !py-2.5 rounded-none flex items-center justify-center gap-1.5 !text-[9px]">
                        <Gift className="w-3.5 h-3.5" />
                        <span>Redeem Gift Coordinates</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab Content: Settings */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h2 className="text-base font-serif text-brand-blue uppercase tracking-widest border-b border-[#E5E0D8] pb-3">Account Credentials & Profile</h2>

                  <form onSubmit={handleSaveSettings} className="glass-card p-6 md:p-8 space-y-6 bg-white border border-[#E5E0D8] rounded-none shadow-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Full Name</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className="glass-input pl-12 w-full text-xs font-semibold rounded-none focus:border-brand-purple"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={profileEmail}
                            onChange={(e) => setProfileEmail(e.target.value)}
                            className="glass-input pl-12 w-full text-xs font-semibold rounded-none focus:border-brand-purple"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Phone Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={profilePhone}
                            onChange={(e) => setProfilePhone(e.target.value)}
                            className="glass-input pl-12 w-full text-xs font-semibold rounded-none focus:border-brand-purple"
                          />
                        </div>
                      </div>

                      {/* Passport Number */}
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Passport Coordinates</label>
                        <div className="relative">
                          <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={passportNum}
                            onChange={(e) => setPassportNum(e.target.value)}
                            className="glass-input pl-12 w-full text-xs font-semibold rounded-none focus:border-brand-purple"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5E0D8] pt-6 mt-6">
                      <span className="text-[10px] text-slate-500 max-w-sm leading-normal font-light font-sans">
                        Passport credentials are encrypted using SHA-256 concierge protocols and stored securely to facilitate rapid aviation ticketing.
                      </span>

                      <div className="flex gap-3 w-full sm:w-auto">
                        <button
                          type="submit"
                          className="btn-gold w-full sm:w-auto flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider text-[10px] rounded-none"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Settings</span>
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Settings notification popup */}
                  <AnimatePresence>
                    {showSettingsSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="fixed bottom-20 right-4 md:right-8 bg-brand-blue text-white border border-[#E5E0D8] px-6 py-4 rounded-none shadow-none z-50 text-[10px] uppercase tracking-widest font-bold"
                      >
                        <Check className="w-4 h-4 text-brand-purple" />
                        <span>Profile updated successfully</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Tab Content: Notifications */}
              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h2 className="text-base font-serif text-brand-blue uppercase tracking-widest border-b border-[#E5E0D8] pb-3">Concierge Desk Inbox</h2>

                  <div className="glass-card p-5 flex gap-4 bg-white border border-[#E5E0D8] border-l-2 border-l-brand-purple rounded-none shadow-none items-start">
                    <div className="w-8 h-8 rounded-none bg-brand-purple/10 flex items-center justify-center text-brand-purple shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-blue text-xs uppercase tracking-wider">Flight Upgrade Opportunity</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-light">
                        As a Gold privileges member, you are eligible to upgrade your upcoming flight QR-704 to London (LHR) to First Class Suites for only 4,000 points. Check voucher panel.
                      </p>
                      <span className="text-[9px] text-slate-400 block mt-2.5">2 hours ago</span>
                    </div>
                  </div>

                  <div className="glass-card p-5 flex gap-4 bg-white border border-[#E5E0D8] border-l-2 border-l-brand-blue rounded-none shadow-none items-start">
                    <div className="w-8 h-8 rounded-none bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-blue text-xs uppercase tracking-wider">Monthly Club Statement</h4>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-light font-sans">
                        Your monthly statement is ready. You have successfully accrued 4,200 loyalty coordinates on dining, wellness spa, and curated lodging experiences this month.
                      </p>
                      <span className="text-[9px] text-slate-400 block mt-2.5">1 day ago</span>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};
