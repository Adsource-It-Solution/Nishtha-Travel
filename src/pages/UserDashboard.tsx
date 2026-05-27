import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Heart, Wallet, Bell, Settings, Award, MapPin, CheckCircle2, ShieldCheck, Mail, Phone, Save, Gift } from 'lucide-react';
import { mockHotels, mockFlights } from '../data/mockData';
import { Link } from 'react-router-dom';

type ActiveTab = 'bookings' | 'wishlist' | 'wallet' | 'settings' | 'notifications';

export const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bookings');

  // Settings profile state
  const [profileName, setProfileName] = useState('Alexander Mercer');
  const [profileEmail, setProfileEmail] = useState('alex.mercer@club-aura.com');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 720-AURA');
  const [passportNum, setPassportNum] = useState('US982740A');
  const [showSettingsSuccess, setShowSettingsSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSettingsSuccess(true);
    setTimeout(() => setShowSettingsSuccess(false), 3000);
  };

  const menuItems = [
    { id: 'bookings', label: 'My Bookings', icon: Briefcase },
    { id: 'wishlist', label: 'Saved Trips', icon: Heart },
    { id: 'wallet', label: 'Wallet & Rewards', icon: Wallet },
    { id: 'settings', label: 'Club Settings', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 2 },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-midnight text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header summary card */}
        <div className="glass-card p-6 md:p-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 border-gold-500/20 shadow-luxury">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-midnight font-extrabold text-2xl shadow-luxury">
              AM
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h1 className="text-xl md:text-2xl font-bold text-white">{profileName}</h1>
                <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider bg-gold-500 text-midnight font-bold">
                  Gold Member
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Club ID: #AURA-9824 • Member since 2024</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-8">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">Wallet Balance</span>
              <span className="text-xl font-bold text-white mt-1 block">$1,420 <span className="text-xs text-gold-500">USD</span></span>
            </div>
            <div className="w-[1px] bg-white/5" />
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">Aura Loyalty Points</span>
              <span className="text-xl font-bold text-white mt-1 block">24,500 <span className="text-xs text-gold-500">Pts</span></span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Dashboard Left Sidebar Tabs Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <div className="glass-card p-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ActiveTab)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all focus:outline-none ${isActive
                        ? 'bg-gold-500 text-midnight shadow-gold-glow'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${isActive ? 'bg-midnight text-gold-500' : 'bg-red-500 text-white'}`}>
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
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Upcoming Bookings</h2>

                  {/* Booking Card 1 (Hotel) */}
                  <div className="glass-card p-6 flex flex-col md:flex-row justify-between gap-6 border-l-4 border-l-gold-500">
                    <div className="space-y-4 flex-grow">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-gold-500/10 text-gold-500 border border-gold-500/20">
                          Resort Stay
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">Confirmation: #MLE-89240</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{mockHotels[0].name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-gold-500" />
                          <span>{mockHotels[0].location}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 max-w-sm">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">Check-in</span>
                          <span className="text-xs text-white font-bold block mt-0.5">June 15, 2026</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">Check-out</span>
                          <span className="text-xs text-white font-bold block mt-0.5">June 25, 2026</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/5 md:pl-6 min-w-[120px]">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-emerald-400 font-bold block">✓ Status: Confirmed</span>
                        <span className="text-xs text-slate-400 block mt-1">2 Guests • 1 Room</span>
                      </div>
                      <button className="btn-navy !py-2 !px-4 !text-[10px] uppercase font-bold tracking-wider">
                        Voucher
                      </button>
                    </div>
                  </div>

                  {/* Booking Card 2 (Flight) */}
                  <div className="glass-card p-6 flex flex-col md:flex-row justify-between gap-6 border-l-4 border-l-blue-500">
                    <div className="space-y-4 flex-grow">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          Aviation Flight
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">Booking: #LHR-QR704</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{mockFlights[1].airlineName}</h3>
                        <div className="flex items-center gap-4 mt-2 py-2 border-y border-white/5 max-w-md">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block leading-none">Depart</span>
                            <span className="text-base font-extrabold text-white block mt-1">{mockFlights[1].departureCode}</span>
                            <span className="text-[10px] text-slate-400 block">{mockFlights[1].departureCity}</span>
                          </div>
                          <div className="flex-grow flex flex-col items-center px-4 relative">
                            <span className="text-[9px] text-slate-400 font-semibold">{mockFlights[1].duration}</span>
                            <div className="w-full h-[1px] bg-slate-700 relative my-1">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold-500" />
                            </div>
                            <span className="text-[9px] text-gold-500 font-bold uppercase">1 Stop</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block leading-none">Arrive</span>
                            <span className="text-base font-extrabold text-white block mt-1">{mockFlights[1].arrivalCode}</span>
                            <span className="text-[10px] text-slate-400 block">{mockFlights[1].arrivalCity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/5 md:pl-6 min-w-[120px]">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-emerald-400 font-bold block">✓ Status: Confirmed</span>
                        <span className="text-xs text-slate-400 block mt-1">2 Passengers • Business</span>
                      </div>
                      <button className="btn-navy !py-2 !px-4 !text-[10px] uppercase font-bold tracking-wider">
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
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Saved Collections</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mock Saved Item 1 */}
                    <div className="glass-card overflow-hidden group">
                      <div className="h-44 relative">
                        <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80" alt="Resort" className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-navy-950/80 backdrop-blur-sm flex items-center justify-center text-red-500">
                          <Heart className="w-4 h-4 fill-red-500" />
                        </span>
                      </div>
                      <div className="p-4 space-y-3">
                        <span className="text-[9px] text-gold-500 font-bold uppercase tracking-widest block">Hotel</span>
                        <h4 className="font-bold text-white text-base truncate">{mockHotels[1].name}</h4>
                        <p className="text-slate-400 text-xs truncate">{mockHotels[1].location}</p>
                        <div className="flex justify-between items-center border-t border-white/5 pt-3">
                          <span className="text-base font-extrabold text-gold-500">${mockHotels[1].pricePerNight}<span className="text-[10px] text-slate-400 font-medium">/Ngt</span></span>
                          <button className="btn-gold !py-2 !px-4 !text-[10px]">Book Suite</button>
                        </div>
                      </div>
                    </div>

                    {/* Mock Saved Item 2 */}
                    <div className="glass-card overflow-hidden group">
                      <div className="h-44 relative">
                        <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80" alt="Destination" className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-navy-950/80 backdrop-blur-sm flex items-center justify-center text-red-500">
                          <Heart className="w-4 h-4 fill-red-500" />
                        </span>
                      </div>
                      <div className="p-4 space-y-3">
                        <span className="text-[9px] text-gold-500 font-bold uppercase tracking-widest block">Destination</span>
                        <h4 className="font-bold text-white text-base truncate">Amalfi Coast, Positano</h4>
                        <p className="text-slate-400 text-xs truncate">Italy, Southern Europe</p>
                        <div className="flex justify-between items-center border-t border-white/5 pt-3">
                          <span className="text-xs font-semibold text-slate-300">Itinerary Available</span>
                          <Link to="/destination/dest-2" className="btn-navy !py-2 !px-4 !text-[10px]">Explore</Link>
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
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Aura Premium Club Wallet</h2>

                  {/* Rewards tier progress card */}
                  <div className="glass-card p-6 md:p-8 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 text-gold-500/10"><Award className="w-24 h-24" /></div>
                    <div className="space-y-2">
                      <span className="text-[10px] text-gold-500 font-bold uppercase tracking-widest block">Rewards Status</span>
                      <h3 className="text-2xl font-bold font-serif text-white">Gold Tier Membership</h3>
                      <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                        You are 5,500 points away from unlocking **Platinum Tier** and receiving complimentary private jet upgrades.
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-gold-500">Gold (24,500 Pts)</span>
                        <span className="text-slate-400">Platinum (30,000 Pts)</span>
                      </div>
                      <div className="w-full h-2 bg-navy-950 border border-white/5 rounded-full overflow-hidden">
                        <div className="w-[81%] h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full" />
                      </div>
                    </div>

                    {/* Benefits List */}
                    <div className="border-t border-white/5 pt-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex gap-2.5 items-start">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-white">Unlimited Lounge Access</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Free entries for member + 1 guest at airport lounges.</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-white">24/7 Dedicated Concierge</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Direct chat access to luxury travel agents.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vouchers and Credit Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Club card */}
                    <div className="glass-card p-6 h-48 bg-gradient-to-br from-navy-950 via-navy-900 to-gold-950/20 border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-lg">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Aura Gold Pass</span>
                        <Award className="w-6 h-6 text-gold-500" />
                      </div>
                      <div className="text-lg font-mono font-bold tracking-widest text-slate-100">
                        * * * *   * * * *   * * * *   8924
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 block leading-none">Club Holder</span>
                          <span className="text-xs font-bold text-white mt-1 block leading-none">{profileName}</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-500">Exp: 12/28</span>
                      </div>
                    </div>

                    {/* Aura Credits */}
                    <div className="glass-card p-6 h-48 flex flex-col justify-between relative overflow-hidden shadow-lg border-gold-500/10">
                      <div>
                        <span className="text-[10px] text-gold-500 font-bold uppercase tracking-widest block">Available Credits</span>
                        <h4 className="text-3xl font-extrabold text-white mt-1">$1,420.00</h4>
                        <span className="text-[10px] text-slate-400">Valid on flights, hotels, and tours.</span>
                      </div>
                      <button className="btn-gold !py-2.5 !text-[10px] w-full flex items-center justify-center gap-1.5">
                        <Gift className="w-3.5 h-3.5" />
                        <span>Redeem Gift Cards</span>
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
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Account Credentials & Profile</h2>

                  <form onSubmit={handleSaveSettings} className="glass-card p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Full Name</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className="glass-input pl-12 w-full text-sm font-semibold"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={profileEmail}
                            onChange={(e) => setProfileEmail(e.target.value)}
                            className="glass-input pl-12 w-full text-sm font-semibold"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Phone Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={profilePhone}
                            onChange={(e) => setProfilePhone(e.target.value)}
                            className="glass-input pl-12 w-full text-sm font-semibold"
                          />
                        </div>
                      </div>

                      {/* Passport Number */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Passport Coordinates</label>
                        <div className="relative">
                          <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={passportNum}
                            onChange={(e) => setPassportNum(e.target.value)}
                            className="glass-input pl-12 w-full text-sm font-semibold"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6 mt-6">
                      <span className="text-[10px] text-slate-400 max-w-sm leading-normal">
                        Passport credentials are encrypted using SHA-256 protocols and stored locally to facilitate rapid flight bookings.
                      </span>

                      <div className="flex gap-3 w-full sm:w-auto">
                        <button
                          type="submit"
                          className="btn-gold !py-3 w-full sm:w-auto flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider text-xs"
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
                        className="fixed bottom-20 right-4 md:right-8 bg-emerald-600 text-white border border-emerald-500 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 text-xs font-bold uppercase tracking-wider"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Profile updated successfully!</span>
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
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">Aura Concierge Notifications</h2>

                  <div className="glass-card p-4 flex gap-4 items-start border-l-4 border-l-gold-500">
                    <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider">Flight Upgrade Opportunity</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        As a Gold Club member, you are eligible to upgrade your upcoming flight QR-704 to London (LHR) to First Class Suites for only 4,000 points. Check voucher panel.
                      </p>
                      <span className="text-[10px] text-slate-500 block mt-2">2 hours ago</span>
                    </div>
                  </div>

                  <div className="glass-card p-4 flex gap-4 items-start border-l-4 border-l-blue-500">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider">Monthly Club Statement</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Your monthly statement is ready. You have successfully accrued 4,200 points on dining, spa, and lodging experiences this month.
                      </p>
                      <span className="text-[10px] text-slate-500 block mt-2">1 day ago</span>
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
