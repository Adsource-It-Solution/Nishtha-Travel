import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchTabs } from '../components/SearchTabs';
import { FlightCard } from '../components/FlightCard';
import { mockFlights } from '../data/mockData';
import type { Flight } from '../data/mockData';
import { Filter, ArrowUpDown, ShieldCheck, Plane, CheckCircle2, X } from 'lucide-react';

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
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background designs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="mb-8 space-y-2 text-center md:text-left">
          <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">VIP Aviation Booking</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-blue">First & Business Class Flights</h1>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
            Search, compare, and book private luxury flights and commercial suites with premium sky benefits.
          </p>
        </div>

        {/* Embedded Search Tabs */}
        <div className="mb-10">
          <SearchTabs initialTab="flights" compact />
        </div>

        {/* Layout Grid */}
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
                    setSelectedStops(null);
                    setSelectedClass('all');
                    setSelectedAirline('all');
                  }}
                  className="text-[10px] uppercase tracking-wider font-extrabold text-brand-purple hover:text-brand-blue transition-colors"
                >
                  Reset All
                </button>
              </div>

              {/* Stops Filter */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Transit Stops</h4>
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
                        className="rounded border-soft-border bg-slate-50 text-brand-purple focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Class Filter */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cabin Travel Class</h4>
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
                        className="border-soft-border bg-slate-50 text-brand-purple focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Airline Filter */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aviation Partners</h4>
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
                        className="border-soft-border bg-slate-50 text-brand-purple focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Assurance Badge */}
            <div className="glass-card p-4 flex gap-3 items-start bg-brand-purple/5 border border-brand-purple/10">
              <ShieldCheck className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">Nishtha Flight Protection</h4>
                <p className="text-[9px] text-slate-500 mt-1 leading-relaxed font-semibold">
                  Complimentary 100% cancellation refund & flight rebooking insurance included on all Business and First Class bookings.
                </p>
              </div>
            </div>
          </div>

          {/* 2. FLIGHT LISTINGS PANEL */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Sorting & Stats Bar */}
            <div className="flex items-center justify-between bg-white border border-soft-border rounded-2xl p-4 shadow-sm">
              <span className="text-xs font-bold text-slate-500">
                {loading ? 'Searching...' : `${filteredFlights.length} Flights Found`}
              </span>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-brand-purple" />
                <span className="text-xs text-slate-500 font-bold">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-soft-border text-dark-text rounded-lg text-xs px-2.5 py-1.5 focus:border-brand-purple outline-none cursor-pointer font-bold"
                >
                  <option value="price">Lowest Price</option>
                  <option value="duration">Shortest Duration</option>
                </select>
              </div>
            </div>

            {/* Content Results */}
            <div className="space-y-4">
              {loading ? (
                // SKELETON LOADER CARDS
                [...Array(3)].map((_, i) => (
                  <div key={i} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-pulse shadow-sm border border-soft-border">
                    <div className="flex items-center gap-4 min-w-[200px]">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl" />
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-slate-100 rounded" />
                        <div className="h-3 w-16 bg-slate-100 rounded" />
                      </div>
                    </div>
                    <div className="flex-grow flex items-center justify-between gap-6 max-w-lg">
                      <div className="space-y-2"><div className="h-5 w-12 bg-slate-100 rounded" /><div className="h-3 w-8 bg-slate-100 rounded" /></div>
                      <div className="h-2 flex-grow bg-slate-100 rounded max-w-xs mx-4" />
                      <div className="space-y-2 text-right"><div className="h-5 w-12 bg-slate-100 rounded" /><div className="h-3 w-8 bg-slate-100 rounded" /></div>
                    </div>
                    <div className="h-10 w-28 bg-slate-100 rounded-xl border border-soft-border" />
                  </div>
                ))
              ) : filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} onBook={handleBookFlight} />
                ))
              ) : (
                // EMPTY STATE
                <div className="glass-card p-12 text-center space-y-4 border-dashed border-soft-border shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400 border border-soft-border">
                    <Plane className="w-6 h-6 text-brand-purple" />
                  </div>
                  <h4 className="text-base font-extrabold text-brand-blue uppercase tracking-wider">No Flights Found</h4>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto font-semibold leading-relaxed">
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
                      <span className="text-[10px] text-brand-purple font-bold uppercase tracking-widest block">Review Booking</span>
                      <h3 className="text-xl font-extrabold text-brand-blue mt-1">Flight Itinerary</h3>
                    </div>
                    <button
                      onClick={() => setBookingFlight(null)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Flight Info Summary */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-soft-border space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-brand-blue">{bookingFlight.airlineName}</span>
                      <span className="text-slate-400 font-semibold">{bookingFlight.flightNumber} • {bookingFlight.class}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-y border-soft-border">
                      <div className="text-left">
                        <span className="font-extrabold text-slate-800 text-base block">{bookingFlight.departureCode}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{bookingFlight.departureCity}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] text-slate-400 font-bold">{bookingFlight.duration}</span>
                        <Plane className="w-3.5 h-3.5 text-brand-purple my-0.5 rotate-90" />
                        <span className="text-[9px] font-extrabold text-brand-purple">{bookingFlight.stops === 0 ? 'Non-Stop' : '1 Stop'}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-slate-800 text-base block">{bookingFlight.arrivalCode}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{bookingFlight.arrivalCity}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-1">
                      <span className="text-slate-400 font-semibold">Total Price (incl. tax)</span>
                      <span className="text-base font-extrabold text-brand-blue">${bookingFlight.price}</span>
                    </div>
                  </div>

                  {/* Policies */}
                  <div className="space-y-2 text-xs text-slate-500 font-semibold">
                    <div className="flex gap-2">
                      <span className="text-emerald-600">✓</span>
                      <span>Free priority check-in & lounge access boarding.</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-emerald-600">✓</span>
                      <span>Refundable flight cancellation policy enabled.</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setBookingFlight(null)}
                      className="btn-navy !py-3 !text-xs font-extrabold uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmBooking}
                      className="btn-gold !py-3 !text-xs font-extrabold uppercase tracking-wider"
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
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-sm animate-pulse">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-brand-blue">Booking Confirmed!</h3>
                  <p className="text-slate-500 text-xs font-semibold max-w-xs mx-auto leading-relaxed">
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
