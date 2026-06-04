import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchTabs } from '../components/SearchTabs';
import { FlightCard } from '../components/FlightCard';
import { mockFlights } from '../data/mockData';
import type { Flight } from '../data/mockData';
import {ShieldCheck, Plane, CheckCircle2, X,   BadgeDollarSign,
  CalendarCheck2,
  Headphones, } from 'lucide-react';

import { Navbar } from '../components/Navbar';

export const FlightBookingPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedStops, setSelectedStops] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedAirline, setSelectedAirline] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');
  const [bookingFlight, setBookingFlight] = useState<Flight | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
  <div className="min-h-screen bg-[#F8FAFC]">
    <Navbar/>

    {/* HERO */}
    <section className="relative h-[650px] overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">

        <div className="max-w-3xl">

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white text-sm font-medium"
          >
            Premium Flight Experiences
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            Fly Smarter,
            <br />
            Travel Better.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-xl text-white/90 max-w-2xl"
          >
            Search, compare and reserve premium flights worldwide with
            exclusive fares and seamless booking experiences.
          </motion.p>

        </div>

      </div>
    </section>

    {/* FLOATING SEARCH CARD */}
    <section className="relative z-20 -mt-28">
      <div className="max-w-7xl mx-auto px-6">

        <div className="
          bg-white
          rounded-[32px]
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          p-4 md:p-8
        ">
          <SearchTabs
            initialTab="flights"
            compact
          />
        </div>

      </div>
    </section>

    {/* MAIN CONTENT */}
    <section className="pt-20 pb-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-wider">
              Available Flights
            </span>

            <h2 className="text-4xl font-bold text-slate-900 mt-2">
              Find Your Perfect Flight
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex gap-3">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="
                lg:hidden
                bg-white
                border
                border-slate-200
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                text-slate-700
                hover:bg-slate-50
                transition-all
              "
            >
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="
                bg-white
                border
                border-slate-200
                rounded-xl
                px-4
                py-3
                text-sm
              "
            >
              <option value="price">Lowest Price</option>
              <option value="duration">Shortest Duration</option>
            </select>

          </div>

        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-12 gap-8">

          {/* SIDEBAR */}
          <div className={`lg:col-span-3 ${
            showMobileFilters
              ? 'fixed inset-0 z-50 bg-[#09131F]/45 backdrop-blur-[2px] p-4 flex items-center justify-center'
              : 'hidden lg:block'
          }`}>

            <div className="
              bg-white
              rounded-[28px]
              shadow-lg
              p-6
              sticky
              top-28
              w-full
              max-w-md
            ">

              <div className="flex items-center justify-between mb-6 relative">
                <h3 className="font-semibold text-lg">
                  Filters
                </h3>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedStops(null);
                      setSelectedClass('all');
                      setSelectedAirline('all');
                    }}
                    className="text-blue-600 text-sm font-medium"
                  >
                    Reset
                  </button>

                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="lg:hidden text-slate-400 hover:text-slate-650 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stops */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">
                  Stops
                </h4>

                <div className="space-y-3">
                  {[0, 1].map((stop) => (
                    <label
                      key={stop}
                      className="flex items-center gap-3"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStops === stop}
                        onChange={() =>
                          setSelectedStops(
                            selectedStops === stop
                              ? null
                              : stop
                          )
                        }
                      />

                      <span>
                        {stop === 0
                          ? 'Non Stop'
                          : '1 Stop'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cabin */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">
                  Cabin Class
                </h4>

                <div className="space-y-3">
                  {[
                    'all',
                    'Economy',
                    'Business',
                    'First Class',
                  ].map((cabin) => (
                    <label
                      key={cabin}
                      className="flex items-center gap-3"
                    >
                      <input
                        type="radio"
                        checked={selectedClass === cabin}
                        onChange={() =>
                          setSelectedClass(cabin)
                        }
                      />

                      <span>{cabin}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Protection Card */}
              <div className="
                bg-blue-50
                rounded-2xl
                p-5
              ">
                <ShieldCheck className="w-8 h-8 text-blue-600" />

                <h4 className="font-semibold mt-3">
                  Flight Protection
                </h4>

                <p className="text-sm text-slate-600 mt-2">
                  Flexible changes and cancellation support.
                </p>
              </div>

            </div>

          </div>

          {/* RESULTS */}
          <div className="lg:col-span-9">

            <div className="mb-6 flex justify-between items-center">

              <h3 className="text-slate-700 font-medium">
                {loading
                  ? 'Searching flights...'
                  : `${filteredFlights.length} Flights Found`}
              </h3>

            </div>

            <div className="space-y-6">

              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="
                      bg-white
                      rounded-[24px]
                      h-40
                      animate-pulse
                    "
                  />
                ))
              ) : filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onBook={handleBookFlight}
                  />
                ))
              ) : (
                <div className="
                  bg-white
                  rounded-[24px]
                  p-16
                  text-center
                ">
                  <Plane className="w-10 h-10 mx-auto text-slate-400" />

                  <h3 className="text-xl font-semibold mt-4">
                    No Flights Found
                  </h3>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>

    {/* BENEFITS */}
    <section className="pb-24">
  <div className="max-w-7xl mx-auto px-6">

    <div className="bg-[#F4F7FF] rounded-[36px] p-12">

      <div className="grid md:grid-cols-4 gap-8">

        {[
          {
            title: "Best Prices",
            icon: BadgeDollarSign,
            description: "Exclusive deals and unbeatable airfare rates."
          },
          {
            title: "Trusted Airlines",
            icon: ShieldCheck,
            description: "Partnered with top-rated airlines worldwide."
          },
          {
            title: "Easy Booking",
            icon: CalendarCheck2,
            description: "Book flights in just a few clicks."
          },
          {
            title: "24/7 Support",
            icon: Headphones,
            description: "Dedicated travel experts available anytime."
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                text-center
                group
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div
                className="
                  w-20
                  h-20
                  rounded-2xl
                  bg-white
                  mx-auto
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  group-hover:shadow-xl
                  transition-all
                "
              >
                <Icon
                  size={34}
                  className="text-indigo-600"
                />
              </div>

              <h4 className="font-bold text-lg text-slate-900 mt-5">
                {item.title}
              </h4>

              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}

      </div>

    </div>

  </div>
</section>

    {/* CTA */}
    <section className="pb-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="
          bg-blue-600
          rounded-[36px]
          p-14
          text-center
          text-white
        ">

          <h2 className="text-4xl font-bold">
            Ready To Reserve Your Next Flight?
          </h2>

          <p className="mt-4 text-white/90">
            Premium flight experiences tailored for every journey.
          </p>

          <button className="
            mt-8
            bg-white
            text-blue-600
            px-8
            py-4
            rounded-full
            font-semibold
          ">
            Book Your Flight
          </button>

        </div>

      </div>
    </section>

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
)};
