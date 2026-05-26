import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchTabs } from '../components/SearchTabs';
import { PackageCard } from '../components/PackageCard';
import { OfferBanner } from '../components/OfferBanner';
import { mockPackages } from '../data/mockData';
import type { Package } from '../data/mockData';
import { Luggage, Check, X } from 'lucide-react';

export const HolidayPackagesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookingPkg, setBookingPkg] = useState<Package | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPackages(mockPackages);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredPackages = selectedCategory === 'all'
    ? packages
    : packages.filter(pkg => pkg.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'luxury', label: 'Ultra Luxury' },
    { id: 'honeymoon', label: 'Honeymoon' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'domestic', label: 'Heritage & Domestic' },
    { id: 'international', label: 'International Escapes' }
  ];

  const handleBookPkg = (pkg: Package) => {
    setBookingPkg(pkg);
  };

  const confirmBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingPkg(null);
    }, 3000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background designs */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="mb-8 space-y-2 text-center md:text-left">
          <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">Curated Voyages</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-blue">All-Inclusive Holiday Packages</h1>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
            Bespoke tours pairing luxury accommodation, curated private activities, and custom flight solutions.
          </p>
        </div>

        {/* Search Panel */}
        <div className="mb-14">
          <SearchTabs initialTab="packages" compact />
        </div>

        {/* Offers / Deals Section */}
        <div className="mb-16">
          <div className="mb-6 space-y-1">
            <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block mb-1">Club Benefits</span>
            <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wider">Active Deals & Vouchers</h3>
          </div>
          <OfferBanner />
        </div>

        {/* Categories Tab Selector */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-soft-border pb-4 justify-start">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'text-brand-purple bg-brand-purple/5'
                    : 'text-slate-400 hover:text-brand-purple hover:bg-slate-100'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activePkgCat"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-blue to-brand-purple rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="glass-card overflow-hidden h-[420px] animate-pulse border border-soft-border shadow-sm bg-white">
                <div className="bg-slate-100 h-56 w-full" />
                <div className="p-5 space-y-4">
                  <div className="h-4 w-1/3 bg-slate-100 rounded" />
                  <div className="h-6 w-2/3 bg-slate-100 rounded" />
                  <div className="h-4 w-1/2 bg-slate-100 rounded" />
                </div>
              </div>
            ))
          ) : filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onBook={handleBookPkg} />
            ))
          ) : (
            <div className="col-span-full glass-card p-16 text-center space-y-4 border-dashed border-soft-border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400 border border-soft-border">
                <Luggage className="w-6 h-6 text-brand-purple" />
              </div>
              <h4 className="text-base font-extrabold text-brand-blue uppercase tracking-wider">No Packages Available</h4>
              <p className="text-slate-500 text-xs max-w-sm mx-auto font-semibold leading-relaxed">
                No active all-inclusive packages found matching this category. Please adjust filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingPkg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!bookingConfirmed) setBookingPkg(null);
              }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="glass-card p-6 md:p-8 max-w-md w-full relative z-10 space-y-6 shadow-2xl border border-brand-purple/20 bg-white"
            >
              {!bookingConfirmed ? (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-brand-purple font-bold uppercase tracking-widest block">Package Selection</span>
                      <h3 className="text-xl font-extrabold text-brand-blue mt-1">Book Premium Voyage</h3>
                    </div>
                    <button
                      onClick={() => setBookingPkg(null)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-soft-border space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Package Title</span>
                      <h4 className="font-extrabold text-brand-blue text-base leading-tight mt-0.5">{bookingPkg.title}</h4>
                      <span className="text-xs text-slate-400 font-semibold">{bookingPkg.destination} • {bookingPkg.duration}</span>
                    </div>

                    <div className="border-t border-soft-border pt-3 mt-3 flex justify-between items-center text-xs text-slate-600 font-semibold">
                      <span>Rate per person</span>
                      <span className="font-bold text-slate-800">${bookingPkg.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-600 font-semibold">
                      <span>Elite Inclusions Package</span>
                      <span className="text-emerald-600 font-bold">Enabled</span>
                    </div>
                    <div className="border-t border-soft-border pt-3 flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-bold">Total Package Cost</span>
                      <span className="text-base font-extrabold text-brand-blue">${bookingPkg.price}</span>
                    </div>
                  </div>

                  {/* Inclusions checklist */}
                  <div className="space-y-2 text-xs text-slate-500 font-semibold">
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Coordinated transfers & activities included.</span>
                    </div>
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Dedicated concierge available 24/7.</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setBookingPkg(null)}
                      className="btn-navy !py-3 !text-xs font-extrabold uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmBooking}
                      className="btn-gold !py-3 !text-xs font-extrabold uppercase tracking-wider"
                    >
                      Confirm Package
                    </button>
                  </div>
                </>
              ) : (
                // SUCCESS STATE
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-sm animate-pulse">
                    <Check className="w-8 h-8 text-emerald-600 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-brand-blue">Voyage Confirmed!</h3>
                  <p className="text-slate-500 text-xs font-semibold max-w-xs mx-auto leading-relaxed">
                    Your luxury package is confirmed. We will reach out within 2 hours to coordinate flight timings and bespoke tour selections from our Gurgaon desk.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
