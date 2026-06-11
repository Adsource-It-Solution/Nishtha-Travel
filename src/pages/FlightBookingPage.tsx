import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchTabs } from '../components/SearchTabs';
import { FlightCard } from '../components/FlightCard';
import { mockFlights } from '../data/mockData';
import type { Flight } from '../data/mockData';
import {
  ShieldCheck, Plane, CheckCircle2, X, BadgeDollarSign,
  CalendarCheck2,
  Headphones,
} from 'lucide-react';

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

  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryDate, setEnquiryDate] = useState('');

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
      <Navbar />

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
            <div className={`lg:col-span-3 ${showMobileFilters
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
              className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="bg-white border border-[#E5E0D8] p-8 md:p-10 max-w-6xl w-full relative z-10 space-y-6 rounded-none shadow-none"
            >
              {!bookingConfirmed ? (
                <>
                  <div className="flex justify-between items-start pb-2">

                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-yellow-500 block">
                        Luxury Flight Reservation
                      </span>

                      <h3 className="text-3xl font-Poppins text-brand-blue leading-tight">
                        Reserve Your Flight
                      </h3>

                      <p className="text-sm text-slate-500">
                        Complete your details to confirm this premium air journey.
                      </p>
                    </div>

                    <button
                      onClick={() => setBookingFlight(null)}
                      className="
        w-10 h-10
        flex items-center justify-center
        text-slate-400
        hover:text-brand-blue
        transition-all
      "
                    >
                      <X className="w-5 h-5" />
                    </button>

                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mt-6">
                    {/* LEFT COLUMN */}
                    <div className="space-y-6">
                      <div className="bg-blue-500 border border-[#E5E0D8] p-6 rounded-lg">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white block">
                          Selected Flight
                        </span>
                        <h4 className="text-2xl font-Poppins text-white mt-2">
                          {bookingFlight.airlineName}
                        </h4>
                        <p className="text-sm text-white/90 mt-2">
                          {bookingFlight.flightNumber} • {bookingFlight.class}
                        </p>
                        <div className="border-t border-white/20 pt-4 mt-5 space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-white/70">
                                Departure
                              </p>
                              <h5 className="text-xl font-semibold text-white">
                                {bookingFlight.departureCode}
                              </h5>
                              <p className="text-xs text-white/70">
                                {bookingFlight.departureCity}
                              </p>
                            </div>
                            <Plane className="w-5 h-5 text-white rotate-90" />
                            <div className="text-right">
                              <p className="text-xs text-white/70">
                                Arrival
                              </p>
                              <h5 className="text-xl font-semibold text-white">
                                {bookingFlight.arrivalCode}
                              </h5>
                              <p className="text-xs text-white/70">
                                {bookingFlight.arrivalCity}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">
                              Duration
                            </span>
                            <span className="font-semibold text-white">
                              {bookingFlight.duration}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">
                              Stops
                            </span>
                            <span className="font-semibold text-white">
                              {bookingFlight.stops === 0 ? 'Non Stop' : `${bookingFlight.stops} Stop`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-brand-light border border-[#E5E0D8] rounded-lg p-6">

                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 block">
                          Total Fare
                        </span>

                        <h3 className="text-4xl font-Poppins text-brand-blue mt-2">
                          ₹{bookingFlight.price}
                        </h3>

                        <p className="text-sm text-slate-500 mt-2">
                          Includes premium support and booking assistance.
                        </p>

                      </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6">

                      <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-yellow-500 block">
                        Traveler Information
                      </label>

                      <input
                        type="text"
                        placeholder="Traveler Name"
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        className="
          w-full
          border
          border-[#E5E0D8]
          bg-white
          px-4
          py-3
          text-sm
          rounded-lg
          focus:border-yellow-500
          focus:outline-none
        "
                      />

                      <input
                        type="text"
                        placeholder="Mobile Number"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="
          w-full
          border
          border-[#E5E0D8]
          bg-white
          px-4
          py-3
          text-sm
          rounded-lg
          focus:border-yellow-500
          focus:outline-none
        "
                      />

                      <input
                        type="date"
                        value={enquiryDate}
                        onChange={(e) => setEnquiryDate(e.target.value)}
                        className="
          w-full
          border
          border-[#E5E0D8]
          bg-white
          px-4
          py-3
          text-sm
          rounded-lg
          focus:border-yellow-500
          focus:outline-none
        "
                      />

                      <div className="bg-brand-light border border-[#E5E0D8] rounded-lg p-4 space-y-2">

                        <div className="flex gap-2 text-sm">
                          <span className="text-green-600">✓</span>
                          <span>Priority Check-In Included</span>
                        </div>

                        <div className="flex gap-2 text-sm">
                          <span className="text-green-600">✓</span>
                          <span>Premium Travel Support</span>
                        </div>

                        <div className="flex gap-2 text-sm">
                          <span className="text-green-600">✓</span>
                          <span>Flexible Rebooking Assistance</span>
                        </div>

                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          onClick={() => setBookingFlight(null)}
                          className="
            h-14
            border
            border-[#E5E0D8]
            rounded-lg
            text-slate-600
            font-medium
            hover:bg-brand-light
            transition-all
          "
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmBooking}
                          className="
            h-14
            bg-blue-500
            text-white
            rounded-lg
            font-semibold
            hover:bg-brand-blue
            transition-all
          "
                        >
                          Confirm Flight
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed text-center">
                        Our travel concierge will contact you shortly to finalize your flight booking.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                // SUCCESS STATE
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-16 h-16 rounded-none bg-brand-light border border-[#E5E0D8] flex items-center justify-center mx-auto text-yellow-500 animate-pulse">
                    <CheckCircle2 className="w-8 h-8 text-yellow-500 animate-bounce" />
                  </div>

                  <h3 className="text-2xl font-Poppins text-brand-blue">
                    Flight Confirmed
                  </h3>

                  <p className="text-slate-500 text-xs font-light max-w-xs mx-auto leading-relaxed">
                    Your flight booking has been confirmed successfully. Reservation details have been sent to our concierge team and will be shared with you shortly.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
};
