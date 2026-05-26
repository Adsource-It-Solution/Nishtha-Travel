import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchTabs } from '../components/SearchTabs';
import { HotelCard } from '../components/HotelCard';
import { mockHotels } from '../data/mockData';
import type { Hotel } from '../data/mockData';
import { Map, Filter, ShieldCheck, MapPin, Sparkles, X, Check } from 'lucide-react';

export const HotelBookingPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedAmenity, setSelectedAmenity] = useState<string>('all');
  const [minRating, setMinRating] = useState<number | null>(null);
  const [hoveredHotelPin, setHoveredHotelPin] = useState<string | null>(null);
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHotels(mockHotels);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filtering Logic
  const filteredHotels = hotels.filter((hotel) => {
    if (selectedAmenity !== 'all' && !hotel.amenities.includes(selectedAmenity)) return false;
    if (minRating !== null && hotel.rating < minRating) return false;
    return true;
  });

  const handleBookHotel = (hotel: Hotel) => {
    setBookingHotel(hotel);
  };

  const confirmBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingHotel(null);
    }, 3000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background designs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="mb-8 space-y-2 text-center md:text-left">
          <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">The Elite Collection</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-blue">Luxury Suites & Villas</h1>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
            Discover curated 5-star properties, private water villas, and boutique luxury estates with Club Member rates.
          </p>
        </div>

        {/* Embedded Search Tabs */}
        <div className="mb-10">
          <SearchTabs initialTab="hotels" compact />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. FILTER SIDEBAR (Desktop) */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 hidden lg:block">
            <div className="glass-card p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-soft-border pb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-blue flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-purple" />
                  <span>Filters</span>
                </h3>
                <button
                  onClick={() => {
                    setSelectedAmenity('all');
                    setMinRating(null);
                  }}
                  className="text-[10px] uppercase tracking-wider font-extrabold text-brand-purple hover:text-brand-blue transition-colors"
                >
                  Reset All
                </button>
              </div>

              {/* Amenities Selector */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Premium Amenities</h4>
                <div className="space-y-2">
                  {[
                    { label: 'All Amenities', value: 'all' },
                    { label: 'Private Pool', value: 'Private Pool' },
                    { label: 'Overwater Villa', value: 'Overwater Villa' },
                    { label: 'Infinity Pool', value: 'Infinity Pool' },
                    { label: 'Spa Wellness', value: 'Spa' },
                    { label: 'Butlers Service', value: 'Butlers' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group text-slate-600 hover:text-brand-purple">
                      <input
                        type="radio"
                        name="amenity-group"
                        checked={selectedAmenity === opt.value}
                        onChange={() => setSelectedAmenity(opt.value)}
                        className="border-soft-border bg-slate-50 text-brand-purple focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Star Rating Selector */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Guest Rating</h4>
                <div className="space-y-2">
                  {[
                    { label: '4.9+ Outstanding', value: 4.9 },
                    { label: '4.8+ Exceptional', value: 4.8 },
                    { label: '4.7+ Excellent', value: 4.7 },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group text-slate-600 hover:text-brand-purple">
                      <input
                        type="checkbox"
                        checked={minRating === opt.value}
                        onChange={() => setMinRating(minRating === opt.value ? null : opt.value)}
                        className="rounded border-soft-border bg-slate-50 text-brand-purple focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-semibold flex items-center gap-1">
                        <span>{opt.label}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Assurance Badge */}
            <div className="glass-card p-4 flex gap-3 items-start bg-brand-purple/5 border border-brand-purple/10">
              <ShieldCheck className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">Suite Benefits</h4>
                <p className="text-[9px] text-slate-500 mt-1 leading-relaxed font-semibold">
                  Club membership includes early 12:00 PM check-in, late 4:00 PM check-out, and complimentary daily champagne breakfasts.
                </p>
              </div>
            </div>
          </div>

          {/* 2. HOTELS GRID & MAP PANEL */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Hotels Cards Listing */}
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center justify-between bg-white border border-soft-border rounded-2xl p-4 shadow-sm">
                <span className="text-xs font-bold text-slate-500">
                  {loading ? 'Searching Properties...' : `${filteredHotels.length} Luxury Properties Found`}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {loading ? (
                  [...Array(2)].map((_, i) => (
                    <div key={i} className="glass-card overflow-hidden h-[420px] animate-pulse border border-soft-border shadow-sm">
                      <div className="bg-slate-100 h-60 w-full" />
                      <div className="p-5 space-y-4">
                        <div className="h-4 w-1/3 bg-slate-100 rounded" />
                        <div className="h-6 w-2/3 bg-slate-100 rounded" />
                        <div className="h-4 w-1/2 bg-slate-100 rounded" />
                      </div>
                    </div>
                  ))
                ) : filteredHotels.length > 0 ? (
                  filteredHotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      onMouseEnter={() => setHoveredHotelPin(hotel.id)}
                      onMouseLeave={() => setHoveredHotelPin(null)}
                    >
                      <HotelCard hotel={hotel} onBook={handleBookHotel} />
                    </div>
                  ))
                ) : (
                  <div className="glass-card p-12 text-center space-y-4 border-dashed border-soft-border shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400 border border-soft-border">
                      <MapPin className="w-6 h-6 text-brand-purple" />
                    </div>
                    <h4 className="text-base font-extrabold text-brand-blue uppercase tracking-wider">No Properties Found</h4>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto font-semibold leading-relaxed">
                      Adjust your filters or query to explore alternative luxury resorts in our collection.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Luxury Map Mockup Panel */}
            <div className="md:col-span-5 hidden md:block">
              <div className="glass-card h-full min-h-[500px] sticky top-24 overflow-hidden border border-soft-border shadow-sm flex flex-col justify-between p-6">
                
                <div className="space-y-1">
                  <span className="text-[10px] text-brand-purple font-bold uppercase tracking-widest block">Interactive Geography</span>
                  <h4 className="text-xs font-bold text-brand-blue uppercase tracking-wider flex items-center gap-1.5">
                    <Map className="w-4 h-4 text-brand-purple" />
                    <span>Property Map Locations</span>
                  </h4>
                </div>

                {/* Map Graphic Canvas */}
                <div className="relative flex-grow my-6 bg-slate-50 border border-soft-border rounded-2xl overflow-hidden flex items-center justify-center min-h-[300px]">
                  {/* Decorative background vectors/grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,67,148,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,67,148,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  
                  <div className="absolute w-56 h-56 rounded-full border border-brand-purple/5 pointer-events-none animate-pulse-slow" />
                  <div className="absolute w-80 h-80 rounded-full border border-brand-purple/5 pointer-events-none" />

                  {/* Hotspots Pin Map */}
                  {!loading && filteredHotels.map((h, idx) => {
                    const leftPos = 25 + idx * 20;
                    const topPos = 30 + (idx % 2) * 25;
                    const isHovered = hoveredHotelPin === h.id;

                    return (
                      <motion.div
                        key={h.id}
                        style={{ left: `${leftPos}%`, top: `${topPos}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center animate-float-slow"
                      >
                        {/* Popover Card */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute bottom-7 w-32 bg-white border border-brand-purple/20 rounded-xl p-2 text-center shadow-lg z-25"
                            >
                              <span className="text-[9px] font-extrabold text-brand-blue block truncate">{h.name}</span>
                              <span className="text-[10px] font-extrabold text-brand-purple block mt-0.5">${h.pricePerNight}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Map Pin Point */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                            isHovered
                              ? 'bg-brand-purple text-white scale-110 shadow-brand-glow'
                              : 'bg-white text-brand-purple border border-soft-border hover:border-brand-purple'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="text-[9px] text-slate-400 text-center flex items-center justify-center gap-1 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple animate-pulse" />
                  <span>Pins reflect luxury coordinates automatically synchronized.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. BOOKING MODAL PANEL */}
      <AnimatePresence>
        {bookingHotel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!bookingConfirmed) setBookingHotel(null);
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
                      <span className="text-[10px] text-brand-purple font-bold uppercase tracking-widest block">Suite Selection</span>
                      <h3 className="text-xl font-extrabold text-brand-blue mt-1">Confirm Reservation</h3>
                    </div>
                    <button
                      onClick={() => setBookingHotel(null)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-soft-border space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Property</span>
                      <h4 className="font-extrabold text-brand-blue text-base leading-tight mt-0.5">{bookingHotel.name}</h4>
                      <span className="text-xs text-slate-400 font-semibold">{bookingHotel.location}</span>
                    </div>

                    <div className="border-t border-soft-border pt-3 mt-3 flex justify-between items-center text-xs text-slate-600 font-semibold">
                      <span>Rate per night</span>
                      <span className="font-bold text-slate-800">${bookingHotel.pricePerNight}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-600 font-semibold">
                      <span>Member Benefits Package</span>
                      <span className="text-emerald-600 font-bold">Included</span>
                    </div>
                    <div className="border-t border-soft-border pt-3 flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-bold">Total Estimated Cost</span>
                      <span className="text-base font-extrabold text-brand-blue">${bookingHotel.pricePerNight}</span>
                    </div>
                  </div>

                  {/* Inclusions checklist */}
                  <div className="space-y-2 text-xs text-slate-500 font-semibold">
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Complimentary private lounge breakfast daily.</span>
                    </div>
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Free seaplane / speedboat transfer coordination.</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setBookingHotel(null)}
                      className="btn-navy !py-3 !text-xs font-extrabold uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmBooking}
                      className="btn-gold !py-3 !text-xs font-extrabold uppercase tracking-wider"
                    >
                      Confirm Suite
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
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-brand-blue animate-bounce">Suite Reserved!</h3>
                  <p className="text-slate-500 text-xs font-semibold max-w-xs mx-auto leading-relaxed">
                    Your luxury lodging has been reserved. You can view reservation vouchers inside your Nishtha Member Profile.
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
