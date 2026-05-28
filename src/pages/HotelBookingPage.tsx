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
    <div className="pt-28 pb-20 min-h-screen bg-brand-light relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="mb-12 space-y-3 text-center md:text-left border-b border-[#E5E0D8] pb-8">
          <span className="text-[10px] text-brand-purple font-bold uppercase tracking-[0.2em] block">02 / The Elite Collection</span>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-blue leading-tight">Luxury Suites & Villas</h1>
          <p className="text-slate-600 text-sm font-light leading-relaxed max-w-xl">
            Discover curated five-star properties, private water villas, and boutique luxury estates with exclusive concierge privileges.
          </p>
        </div>

        {/* Embedded Search Tabs */}
        <div className="mb-12">
          <SearchTabs initialTab="hotels" compact />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. FILTER SIDEBAR (Desktop) */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 hidden lg:block">
            <div className="glass-card p-6 space-y-6 shadow-none">
              <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-blue flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-brand-purple" />
                  <span>Filters</span>
                </h3>
                <button
                  onClick={() => {
                    setSelectedAmenity('all');
                    setMinRating(null);
                  }}
                  className="text-[9px] uppercase tracking-widest font-bold text-brand-purple hover:text-brand-blue transition-colors"
                >
                  Reset All
                </button>
              </div>

              {/* Amenities Selector */}
              <div className="space-y-3">
                <h4 className="text-[9px] font-bold text-brand-purple uppercase tracking-[0.15em]">Premium Amenities</h4>
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
                        className="rounded-none border-[#E5E0D8] bg-white text-brand-purple focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-light">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Star Rating Selector */}
              <div className="space-y-3">
                <h4 className="text-[9px] font-bold text-brand-purple uppercase tracking-[0.15em]">Guest Rating</h4>
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
                        className="rounded-none border-[#E5E0D8] bg-white text-brand-purple focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-light flex items-center gap-1">
                        <span>{opt.label}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Assurance Badge */}
            <div className="glass-card p-5 flex gap-4 items-start bg-white border border-[#E5E0D8] shadow-none">
              <ShieldCheck className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.15em]">Suite Benefits</h4>
                <p className="text-[10px] text-slate-600 mt-1.5 leading-relaxed font-light">
                  Club membership includes early 12:00 PM check-in, late 4:00 PM check-out, and complimentary daily champagne breakfasts.
                </p>
              </div>
            </div>
          </div>

          {/* 2. HOTELS GRID & MAP PANEL */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Hotels Cards Listing */}
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center justify-between bg-white border border-[#E5E0D8] rounded-none p-5 shadow-none">
                <span className="text-[11px] tracking-[0.1em] text-slate-500 uppercase">
                  {loading ? 'Consulting Property Records...' : `${filteredHotels.length} Luxury Properties Curated`}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {loading ? (
                  [...Array(2)].map((_, i) => (
                    <div key={i} className="glass-card overflow-hidden h-[420px] animate-pulse border border-[#E5E0D8] bg-white rounded-none shadow-none">
                      <div className="bg-slate-100 h-60 w-full" />
                      <div className="p-5 space-y-4">
                        <div className="h-4 w-1/3 bg-slate-100" />
                        <div className="h-6 w-2/3 bg-slate-100" />
                        <div className="h-4 w-1/2 bg-slate-100" />
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
                  <div className="glass-card p-16 text-center space-y-4 border-dashed border-[#E5E0D8] bg-white rounded-none shadow-none">
                    <div className="w-12 h-12 rounded-none bg-brand-light flex items-center justify-center mx-auto text-slate-400 border border-[#E5E0D8]">
                      <MapPin className="w-5 h-5 text-brand-purple" />
                    </div>
                    <h4 className="text-base font-serif text-brand-blue">No Properties Found</h4>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto font-light leading-relaxed">
                      Adjust your filters or query to explore alternative luxury resorts in our collection.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Luxury Map Mockup Panel */}
            <div className="md:col-span-5 hidden md:block">
              <div className="glass-card h-full min-h-[500px] sticky top-24 overflow-hidden border border-[#E5E0D8] bg-white rounded-none shadow-none flex flex-col justify-between p-6">
                
                <div className="space-y-1">
                  <span className="text-[9px] text-brand-purple font-bold uppercase tracking-[0.15em] block">Interactive Geography</span>
                  <h4 className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.15em] flex items-center gap-1.5 border-b border-[#E5E0D8] pb-3">
                    <Map className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Property Map Locations</span>
                  </h4>
                </div>

                {/* Map Graphic Canvas */}
                <div className="relative flex-grow my-6 bg-brand-light border border-[#E5E0D8] rounded-none overflow-hidden flex items-center justify-center min-h-[300px]">
                  {/* Decorative background vectors/grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(160,138,114,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(160,138,114,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  
                  <div className="absolute w-56 h-56 rounded-none border border-brand-purple/5 pointer-events-none" />
                  <div className="absolute w-80 h-80 rounded-none border border-brand-purple/5 pointer-events-none" />

                  {/* Hotspots Pin Map */}
                  {!loading && filteredHotels.map((h, idx) => {
                    const leftPos = 25 + idx * 20;
                    const topPos = 30 + (idx % 2) * 25;
                    const isHovered = hoveredHotelPin === h.id;

                    return (
                      <motion.div
                        key={h.id}
                        style={{ left: `${leftPos}%`, top: `${topPos}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
                      >
                        {/* Popover Card */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute bottom-8 w-36 bg-white border border-[#E5E0D8] rounded-none p-3 text-center shadow-none z-25"
                            >
                              <span className="text-[10px] font-serif text-brand-blue block truncate">{h.name}</span>
                              <span className="text-[10px] font-bold text-brand-purple block mt-1">${h.pricePerNight} <span className="text-[8px] font-light text-slate-500">/nt</span></span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Map Pin Point */}
                        <div
                          className={`w-6 h-6 rounded-none flex items-center justify-center transition-all cursor-pointer ${
                            isHovered
                              ? 'bg-brand-blue text-white'
                              : 'bg-white text-brand-purple border border-[#E5E0D8] hover:border-brand-purple'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="text-[9px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-3 border-t border-[#E5E0D8]">
                  <Sparkles className="w-3 h-3 text-brand-purple shrink-0" />
                  <span className="tracking-wide">Coordinates synchronized automatically via elite satellite registers.</span>
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
                      <span className="text-[9px] text-brand-purple font-bold uppercase tracking-[0.15em] block">Suite Selection</span>
                      <h3 className="text-xl font-serif text-brand-blue mt-1">Confirm Reservation</h3>
                    </div>
                    <button
                      onClick={() => setBookingHotel(null)}
                      className="text-slate-400 hover:text-slate-600 p-1 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Summary Box */}
                  <div className="p-5 rounded-none bg-brand-light border border-[#E5E0D8] space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Curated Property</span>
                      <h4 className="font-serif text-brand-blue text-lg leading-tight mt-1">{bookingHotel.name}</h4>
                      <span className="text-xs text-slate-500 mt-0.5 block">{bookingHotel.location}</span>
                    </div>

                    <div className="border-t border-[#E5E0D8] pt-3 mt-3 flex justify-between items-center text-xs text-slate-600 font-light">
                      <span>Rate per night</span>
                      <span className="font-bold text-slate-800">${bookingHotel.pricePerNight}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-600 font-light">
                      <span>Privilege Member Access</span>
                      <span className="text-emerald-700 font-semibold tracking-wider">COMPLIMENTARY</span>
                    </div>
                    <div className="border-t border-[#E5E0D8] pt-3 flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-light uppercase tracking-wider">Est. Cost Per Night</span>
                      <span className="text-xl font-serif text-brand-blue">${bookingHotel.pricePerNight}</span>
                    </div>
                  </div>

                  {/* Inclusions checklist */}
                  <div className="space-y-2 text-[11px] text-slate-600 font-light">
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-brand-purple shrink-0" />
                      <span>Daily gourmet breakfast served in private club lounge.</span>
                    </div>
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-brand-purple shrink-0" />
                      <span>Complimentary water luxury transfers included.</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setBookingHotel(null)}
                      className="btn-navy rounded-none"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmBooking}
                      className="btn-gold rounded-none"
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
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-16 h-16 rounded-none bg-brand-light border border-[#E5E0D8] flex items-center justify-center mx-auto text-brand-purple animate-pulse">
                    <Check className="w-8 h-8 text-brand-purple" />
                  </div>
                  <h3 className="text-2xl font-serif text-brand-blue">Suite Reserved</h3>
                  <p className="text-slate-500 text-xs font-light max-w-xs mx-auto leading-relaxed">
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
