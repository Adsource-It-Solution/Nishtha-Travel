import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchTabs } from '../components/SearchTabs';
import { FlightCard } from '../components/FlightCard';
import { mockFlights } from '../data/mockData';
import type { Flight } from '../data/mockData';
import { Filter, ShieldCheck, Plane, CheckCircle2, X } from 'lucide-react';

export const FlightBookingPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedStops, setSelectedStops] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedAirline, setSelectedAirline] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');
  const [bookingFlight, setBookingFlight] = useState<Flight | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    // Mimic API Fetch loading animation
    const timer = setTimeout(() => {
      setFlights(mockFlights);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filter & Sort Logic
  const filteredFlights = flights
    .filter((flight) => {
      if (selectedStops !== null && flight.stops !== selectedStops) return false;
      if (selectedClass !== 'all' && flight.class !== selectedClass) return false;
      if (selectedAirline !== 'all' && flight.airlineName !== selectedAirline) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      const getMins = (dur: string) => {
        const h = parseInt(dur.split('h')[0]) || 0;
        const m = parseInt(dur.split('h')[1]?.split('m')[0]) || 0;
        return h * 60 + m;
      };
      return getMins(a.duration) - getMins(b.duration);
    });

  const handleBookFlight = (flight: Flight) => {
    setBookingFlight(flight);
  };

  const confirmBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingFlight(null);
    }, 3000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-brand-light relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Page Header */}
        <div className="mb-12 space-y-3 text-center md:text-left border-b border-[#E5E0D8] pb-8">
          <span className="text-[10px] text-brand-purple font-bold uppercase tracking-[0.2em] block">01 / Curated Aviation</span>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-blue leading-tight">First & Business Class Flights</h1>
          <p className="text-slate-600 text-sm font-light leading-relaxed max-w-xl">
            Search, compare, and secure premium commercial suites and private aviation with elite lounge benefits.
          </p>
        </div>

        {/* Embedded Search Tabs */}
        <div className="mb-12">
          <SearchTabs initialTab="flights" compact />
        </div>

        {/* Layout Grid */}
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
                    setSelectedStops(null);
                    setSelectedClass('all');
                    setSelectedAirline('all');
                  }}
                  className="text-[9px] uppercase tracking-widest font-bold text-brand-purple hover:text-brand-blue transition-colors"
                >
                  Reset All
                </button>
              </div>

              {/* Stops Filter */}
              <div className="space-y-3">
                <h4 className="text-[9px] font-bold text-brand-purple uppercase tracking-[0.15em]">Transit Stops</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Non-stop Only', value: 0 },
                    { label: '1 Stop', value: 1 },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group text-slate-600 hover:text-brand-purple">
                      <input
                        type="checkbox"
                        checked={selectedStops === opt.value}
                        onChange={() => setSelectedStops(selectedStops === opt.value ? null : opt.value)}
                        className="rounded-none border-[#E5E0D8] bg-white text-brand-purple focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-light">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Class Filter */}
              <div className="space-y-3">
                <h4 className="text-[9px] font-bold text-brand-purple uppercase tracking-[0.15em]">Cabin Travel Class</h4>
                <div className="space-y-2">
                  {[
                    { label: 'All Cabin Classes', value: 'all' },
                    { label: 'First Class', value: 'First Class' },
                    { label: 'Business Class', value: 'Business' },
                    { label: 'Economy', value: 'Economy' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group text-slate-600 hover:text-brand-purple">
                      <input
                        type="radio"
                        name="class-group"
                        checked={selectedClass === opt.value}
                        onChange={() => setSelectedClass(opt.value)}
                        className="rounded-none border-[#E5E0D8] bg-white text-brand-purple focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-light">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Airline Filter */}
              <div className="space-y-3">
                <h4 className="text-[9px] font-bold text-brand-purple uppercase tracking-[0.15em]">Aviation Partners</h4>
                <div className="space-y-2">
                  {[
                    { label: 'All Airlines', value: 'all' },
                    { label: 'Emirates', value: 'Emirates' },
                    { label: 'Qatar Airways', value: 'Qatar Airways' },
                    { label: 'Singapore Airlines', value: 'Singapore Airlines' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group text-slate-600 hover:text-brand-purple">
                      <input
                        type="radio"
                        name="airline-group"
                        checked={selectedAirline === opt.value}
                        onChange={() => setSelectedAirline(opt.value)}
                        className="rounded-none border-[#E5E0D8] bg-white text-brand-purple focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-light">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Assurance Badge */}
            <div className="glass-card p-5 flex gap-4 items-start bg-white border border-[#E5E0D8] shadow-none">
              <ShieldCheck className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.15em]">Nishtha Flight Protection</h4>
                <p className="text-[10px] text-slate-600 mt-1.5 leading-relaxed font-light">
                  Complimentary cancellation protection & flexible itinerary rebooking included with all Business and First Class reservations.
                </p>
              </div>
            </div>
          </div>

          {/* 2. FLIGHT LISTINGS PANEL */}
          <div className="lg:col-span-9 space-y-6">

            {/* Sorting & Stats Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-[#E5E0D8] rounded-none p-5 shadow-none gap-4">
              <span className="text-[11px] tracking-[0.1em] text-slate-500 uppercase">
                {loading ? 'Consulting Aviation Schedules...' : `${filteredFlights.length} Available Curated Flights`}
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-[11px] text-slate-500 uppercase tracking-[0.1em]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-b border-[#E5E0D8] text-brand-blue rounded-none text-xs pb-1 focus:border-brand-purple focus:outline-none cursor-pointer tracking-wider font-semibold"
                >
                  <option value="price">Lowest Fare First</option>
                  <option value="duration">Shortest Duration</option>
                </select>
              </div>
            </div>

            {/* Content Results */}
            <div className="space-y-4">
              {loading ? (
                // SKELETON LOADER CARDS
                [...Array(3)].map((_, i) => (
                  <div key={i} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-pulse shadow-none border border-[#E5E0D8] bg-white rounded-none">
                    <div className="flex items-center gap-4 min-w-[200px]">
                      <div className="w-12 h-12 bg-slate-100" />
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-slate-100" />
                        <div className="h-3 w-16 bg-slate-100" />
                      </div>
                    </div>
                    <div className="flex-grow flex items-center justify-between gap-6 max-w-lg">
                      <div className="space-y-2"><div className="h-5 w-12 bg-slate-100" /><div className="h-3 w-8 bg-slate-100" /></div>
                      <div className="h-2 flex-grow bg-slate-100 max-w-xs mx-4" />
                      <div className="space-y-2 text-right"><div className="h-5 w-12 bg-slate-100" /><div className="h-3 w-8 bg-slate-100" /></div>
                    </div>
                    <div className="h-10 w-28 bg-slate-100" />
                  </div>
                ))
              ) : filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} onBook={handleBookFlight} />
                ))
              ) : (
                // EMPTY STATE
                <div className="glass-card p-16 text-center space-y-4 border-dashed border-[#E5E0D8] shadow-none bg-white rounded-none">
                  <div className="w-12 h-12 rounded-none bg-brand-light flex items-center justify-center mx-auto text-slate-400 border border-[#E5E0D8]">
                    <Plane className="w-5 h-5 text-brand-purple" />
                  </div>
                  <h4 className="text-base font-serif text-brand-blue">No Curated Flights Available</h4>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto font-light leading-relaxed">
                    No active flights match your filter parameters. Please reset filters or modify airport selections.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOOKING SUMMARY MODAL PANEL */}
      <AnimatePresence>
        {bookingFlight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!bookingConfirmed) setBookingFlight(null);
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
                      <span className="text-[9px] text-brand-purple font-bold uppercase tracking-[0.15em] block">Review Luxury Booking</span>
                      <h3 className="text-xl font-serif text-brand-blue mt-1">Flight Itinerary</h3>
                    </div>
                    <button
                      onClick={() => setBookingFlight(null)}
                      className="text-slate-400 hover:text-slate-600 p-1 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Flight Info Summary */}
                  <div className="p-5 rounded-none bg-brand-light border border-[#E5E0D8] space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-brand-blue uppercase tracking-widest text-[10px]">{bookingFlight.airlineName}</span>
                      <span className="text-slate-500 font-medium tracking-wider text-[10px]">{bookingFlight.flightNumber} • {bookingFlight.class}</span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-y border-[#E5E0D8]">
                      <div className="text-left">
                        <span className="font-serif text-brand-blue text-lg block">{bookingFlight.departureCode}</span>
                        <span className="text-[10px] text-slate-500 font-light uppercase tracking-wider block mt-0.5">{bookingFlight.departureCity}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest">{bookingFlight.duration}</span>
                        <Plane className="w-3.5 h-3.5 text-brand-purple my-1 rotate-90" />
                        <span className="text-[9px] font-bold text-brand-purple uppercase tracking-widest">{bookingFlight.stops === 0 ? 'Non-Stop' : '1 Stop'}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-slate-600 text-lg block">{bookingFlight.arrivalCode}</span>
                        <span className="text-[10px] text-slate-500 font-light uppercase tracking-wider block mt-0.5">{bookingFlight.arrivalCity}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-1">
                      <span className="text-slate-500 font-light uppercase tracking-wider">Total Est. Price</span>
                      <span className="text-xl font-serif text-brand-blue">${bookingFlight.price}</span>
                    </div>
                  </div>

                  {/* Policies */}
                  <div className="space-y-2 text-[11px] text-slate-600 font-light">
                    <div className="flex gap-2">
                      <span className="text-brand-purple">✓</span>
                      <span>Complimentary priority check-in & lounge access.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-brand-purple">✓</span>
                      <span>Flexible rebooking protection program active.</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setBookingFlight(null)}
                      className="btn-navy rounded-none"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmBooking}
                      className="btn-gold rounded-none"
                    >
                      Confirm Book
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
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-brand-blue">Booking Confirmed</h3>
                  <p className="text-slate-500 text-xs font-light max-w-xs mx-auto leading-relaxed">
                    Your flight reservation details have been stored. We've synchronized this trip with your Nishtha Member Dashboard.
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
