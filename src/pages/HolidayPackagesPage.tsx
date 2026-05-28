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
    <div className="pt-28 pb-20 min-h-screen bg-brand-light relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="mb-12 space-y-3 text-center md:text-left border-b border-[#E5E0D8] pb-8">
          <span className="text-[10px] text-brand-purple font-bold uppercase tracking-[0.2em] block">03 / Curated Voyages</span>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-blue leading-tight">All-Inclusive Holiday Packages</h1>
          <p className="text-slate-600 text-sm font-light leading-relaxed max-w-xl">
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
            <span className="text-[9px] text-brand-purple font-bold uppercase tracking-[0.15em] block mb-1">Club Benefits</span>
            <h3 className="text-base font-serif text-brand-blue">Active Private Curation Deals</h3>
          </div>
          <OfferBanner />
        </div>

        {/* Categories Tab Selector */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-[#E5E0D8] pb-4 justify-start">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${
                  isActive
                    ? 'text-brand-purple bg-white border border-[#E5E0D8] border-b-transparent'
                    : 'text-slate-500 hover:text-brand-purple'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activePkgCat"
                    className="absolute -bottom-[5px] left-0 right-0 h-[2px] bg-brand-purple z-10"
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
              <div key={i} className="glass-card overflow-hidden h-[420px] animate-pulse border border-[#E5E0D8] bg-white rounded-none shadow-none">
                <div className="bg-slate-100 h-56 w-full" />
                <div className="p-5 space-y-4">
                  <div className="h-4 w-1/3 bg-slate-100" />
                  <div className="h-6 w-2/3 bg-slate-100" />
                  <div className="h-4 w-1/2 bg-slate-100" />
                </div>
              </div>
            ))
          ) : filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onBook={handleBookPkg} />
            ))
          ) : (
            <div className="col-span-full glass-card p-16 text-center space-y-4 border-dashed border-[#E5E0D8] bg-white rounded-none shadow-none">
              <div className="w-12 h-12 rounded-none bg-brand-light flex items-center justify-center mx-auto text-slate-400 border border-[#E5E0D8]">
                <Luggage className="w-5 h-5 text-brand-purple" />
              </div>
              <h4 className="text-base font-serif text-brand-blue">No Curated Packages Available</h4>
              <p className="text-slate-500 text-xs max-w-sm mx-auto font-light leading-relaxed">
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
              className="absolute inset-0 bg-[#09131F]/40 backdrop-blur-[2px]"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="bg-white border border-[#E5E0D8] p-8 md:p-10 max-w-md w-full relative z-10 space-y-6 rounded-none shadow-none"
            >
              {!bookingConfirmed ? (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-brand-purple font-bold uppercase tracking-[0.15em] block">Package Selection</span>
                      <h3 className="text-xl font-serif text-brand-blue mt-1">Book Curated Voyage</h3>
                    </div>
                    <button
                      onClick={() => setBookingPkg(null)}
                      className="text-slate-400 hover:text-slate-600 p-1 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Summary Box */}
                  <div className="p-5 rounded-none bg-brand-light border border-[#E5E0D8] space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Selected Itinerary</span>
                      <h4 className="font-serif text-brand-blue text-lg leading-tight mt-1">{bookingPkg.title}</h4>
                      <span className="text-xs text-slate-500 mt-1 block">{bookingPkg.destination} • {bookingPkg.duration}</span>
                    </div>

                    <div className="border-t border-[#E5E0D8] pt-3 mt-3 flex justify-between items-center text-xs text-slate-600 font-light">
                      <span>Rate per person</span>
                      <span className="font-bold text-slate-800">${bookingPkg.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-600 font-light">
                      <span>Elite Inclusions Package</span>
                      <span className="text-brand-purple font-bold tracking-wider">COMPLIMENTARY</span>
                    </div>
                    <div className="border-t border-[#E5E0D8] pt-3 flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-light uppercase tracking-wider">Total Package Cost</span>
                      <span className="text-xl font-serif text-brand-blue">${bookingPkg.price}</span>
                    </div>
                  </div>

                  {/* Inclusions checklist */}
                  <div className="space-y-2 text-[11px] text-slate-600 font-light">
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-brand-purple shrink-0" />
                      <span>Coordinated VIP transfers & private itineraries.</span>
                    </div>
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-brand-purple shrink-0" />
                      <span>Dedicated concierge desk support available 24/7.</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setBookingPkg(null)}
                      className="btn-navy rounded-none"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmBooking}
                      className="btn-gold rounded-none"
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
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-16 h-16 rounded-none bg-brand-light border border-[#E5E0D8] flex items-center justify-center mx-auto text-brand-purple animate-pulse">
                    <Check className="w-8 h-8 text-brand-purple animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-serif text-brand-blue">Voyage Confirmed</h3>
                  <p className="text-slate-500 text-xs font-light max-w-xs mx-auto leading-relaxed">
                    Your luxury package is confirmed. We will reach out within 2 hours to coordinate flight timings and bespoke tour selections from our concierge desk.
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
