import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchTabs } from '../components/SearchTabs';
import { HotelCard } from '../components/HotelCard';
import { mockHotels } from '../data/mockData';
import type { Hotel } from '../data/mockData';
import { ShieldCheck, MapPin, X } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const HotelBookingPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedAmenity, setSelectedAmenity] = useState<string>('all');
  const [minRating, setMinRating] = useState<number | null>(null);
  const [hoveredHotelPin, setHoveredHotelPin] = useState<string | null>(null);
  const [bookingConfirmed,] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryDate, setEnquiryDate] = useState('');

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


  return (
    <div className="pt-28 pb-20 min-h-screen bg-brand-light relative">
      <Navbar />
      {/* Page Header */}
      <section className="relative overflow-hidden h-[520px]">

        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />

        <div className="relative z-10 h-full flex items-center px-10 md:px-20">

          <div className="max-w-3xl">

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
              ✨ Luxury Hotel Collection
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-white mt-6 leading-tight">
              Discover Extraordinary Stays
            </h1>

            <p className="text-white/80 text-lg mt-6 max-w-2xl">
              Explore curated resorts, beachfront villas,
              luxury suites and unforgettable experiences.
            </p>

          </div>

        </div>

      </section>
      <div className="max-w-7xl mx-auto relative z-10">


        {/* Embedded Search Tabs */}
        <div className="mb-12">
          <SearchTabs initialTab="hotels" compact />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 mb-14">

            {[
              ["50K+", "Luxury Hotels"],
              ["180+", "Destinations"],
              ["4.9★", "Guest Rating"],
              ["24/7", "Concierge"]
            ].map(([value, label]) => (
              <div
                key={label}
                className="
        bg-white
        rounded-3xl
        p-8
        text-center
        shadow-lg
        border border-slate-100
      "
              >
                <h3 className="text-4xl font-bold text-indigo-600">
                  {value}
                </h3>

                <p className="text-slate-500 mt-2">
                  {label}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* 1. FILTER SIDEBAR (Desktop) */}
          <div className={`lg:col-span-3 space-y-6 lg:sticky lg:top-24 font-['Poppins'] ${showMobileFilters
            ? 'fixed inset-0 z-50 bg-[#09131F]/45 backdrop-blur-[2px] p-4 flex items-center justify-center'
            : 'hidden lg:block'
            }`}>

            {/* FILTER CARD */}
            <div
              className="
      bg-white
      rounded-[32px]
      p-8
      shadow-[0_15px_50px_rgba(0,0,0,0.08)]
      border
      border-slate-100
      backdrop-blur-xl
      w-full
      max-w-md
      relative
    "
            >
              {/* Close Button for mobile */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="lg:hidden absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-650"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-indigo-600 font-semibold">
                    Hotel Filters
                  </span>

                  <h3 className="text-2xl font-semibold text-slate-900 mt-2">
                    Refine Search
                  </h3>
                </div>

                <button
                  onClick={() => {
                    setSelectedAmenity('all');
                    setMinRating(null);
                  }}
                  className="
          text-xs
          font-medium
          text-indigo-600
          hover:text-indigo-800
          transition
        "
                >
                  Reset
                </button>
              </div>

              {/* AMENITIES */}
              <div className="mb-10">
                <h4 className="text-sm font-semibold text-blue-500 mb-3">
                  Premium Amenities
                </h4>

                <div className="space-y-3">

                  {[
                    { label: 'All Amenities', value: 'all' },
                    { label: 'Private Pool', value: 'Private Pool' },
                    { label: 'Overwater Villa', value: 'Overwater Villa' },
                    { label: 'Infinity Pool', value: 'Infinity Pool' },
                    { label: 'Spa Wellness', value: 'Spa' },
                    { label: 'Butlers Service', value: 'Butlers' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="
              flex
              items-center
              justify-between
              px-3
              rounded-2xl
              hover:bg-slate-50
              cursor-pointer
              transition-all
            "
                    >
                      <span className="text-sm text-slate-700 font-medium">
                        {opt.label}
                      </span>

                      <input
                        type="radio"
                        name="amenity-group"
                        checked={selectedAmenity === opt.value}
                        onChange={() => setSelectedAmenity(opt.value)}
                        className="
                w-4
                h-4
                accent-indigo-600
              "
                      />
                    </label>
                  ))}

                </div>
              </div>

              {/* RATINGS */}
              <div>
                <h4 className="text-sm font-semibold text-blue-500 mb-2">
                  Guest Rating
                </h4>

                <div className="space-y-3">

                  {[
                    { label: '4.9+ Outstanding', value: 4.9 },
                    { label: '4.8+ Exceptional', value: 4.8 },
                    { label: '4.7+ Excellent', value: 4.7 },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="
              flex
              items-center
              justify-between
              px-3
              rounded-2xl
              hover:bg-slate-50
              cursor-pointer
              transition-all
            "
                    >
                      <span className="text-sm text-slate-700 font-medium">
                        {opt.label}
                      </span>

                      <input
                        type="checkbox"
                        checked={minRating === opt.value}
                        onChange={() =>
                          setMinRating(
                            minRating === opt.value ? null : opt.value
                          )
                        }
                        className="
                w-4
                h-4
                accent-indigo-600
              "
                      />
                    </label>
                  ))}

                </div>
              </div>
            </div>

            {/* BENEFITS CARD */}
            <div
              className="
      relative
      overflow-hidden
      rounded-[32px]
      p-7
      bg-gradient-to-br
      from-indigo-600
      via-purple-600
      to-indigo-900
      text-white
      shadow-[0_15px_50px_rgba(79,70,229,0.35)]
    "
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div
                  className="
          w-14
          h-14
          rounded-2xl
          bg-white/20
          backdrop-blur-md
          flex
          items-center
          justify-center
          mb-5
        "
                >
                  <ShieldCheck className="w-7 h-7" />
                </div>

                <h4 className="text-xl font-semibold mb-3">
                  Premium Benefits
                </h4>

                <p className="text-sm text-white/85 leading-relaxed">
                  Enjoy early check-in, late checkout,
                  complimentary breakfast,
                  luxury concierge access,
                  and exclusive resort privileges.
                </p>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/70">
                    Member Exclusive
                  </span>
                </div>
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

                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="
                    lg:hidden
                    bg-white
                    border
                    border-slate-200
                    px-4
                    py-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-700
                    hover:bg-slate-50
                    transition-all
                  "
                >
                  Filter
                </button>
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
                      <HotelCard
                        hotel={hotel}
                        onBook={(hotel) => {
                          setSelectedHotel(hotel);
                          setShowBookingModal(true);
                        }}
                      />
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

            {/* Luxury Destination Map */}
            <div className="md:col-span-5 hidden md:block">
              <div
                className="
                    sticky
                    top-24
                    overflow-hidden
                    rounded-[32px]
                    bg-white
                    shadow-[0_15px_50px_rgba(0,0,0,0.08)]
                    border
                    border-slate-100
                    min-h-[850px]
    "
              >

                {/* Header */}
                <div className="p-7 border-b border-slate-100">

                  <span className="text-xs uppercase tracking-[0.25em] text-indigo-600 font-semibold">
                    Luxury Destinations
                  </span>

                  <h3 className="text-2xl font-semibold text-slate-900 mt-2">
                    Explore on Map
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    Discover premium properties across the world's
                    most exclusive destinations.
                  </p>

                </div>

                {/* MAP AREA */}
                <div className="relative h-[650px] overflow-hidden">

                  {/* Background Image */}
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
                    alt=""
                    className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50" />

                  {/* Decorative Glow */}
                  <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />

                  {/* HOTEL PINS */}
                  {!loading &&
                    filteredHotels.map((h, idx) => {
                      const leftPos = 20 + idx * 18;
                      const topPos = 25 + (idx % 3) * 18;

                      const isHovered = hoveredHotelPin === h.id;

                      return (
                        <motion.div
                          key={h.id}
                          style={{
                            left: `${leftPos}%`,
                            top: `${topPos}%`,
                          }}
                          className="
                absolute
                -translate-x-1/2
                -translate-y-1/2
                z-20
              "
                        >
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="
                      absolute
                      bottom-12
                      left-1/2
                      -translate-x-1/2
                      w-52
                      rounded-2xl
                      bg-white
                      p-4
                      shadow-2xl
                    "
                              >
                                <h4 className="font-semibold text-slate-900 truncate">
                                  {h.name}
                                </h4>

                                <p className="text-xs text-slate-500 mt-1">
                                  {h.location}
                                </p>

                                <div className="flex items-center justify-between mt-3">

                                  <span className="text-sm font-bold text-indigo-600">
                                    ₹{h.pricePerNight}
                                  </span>

                                  <span className="text-xs text-slate-400">
                                    per night
                                  </span>

                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Animated Pulse */}
                          <span
                            className="
                  absolute
                  inset-0
                  rounded-full
                  bg-indigo-500
                  animate-ping
                  opacity-30
                "
                          />

                          {/* Pin */}
                          <div
                            className={`
                  w-12
                  h-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  shadow-xl
                  transition-all
                  duration-300
                  ${isHovered
                                ? 'bg-indigo-600 scale-125 text-white'
                                : 'bg-white text-indigo-600'
                              }
                `}
                          >
                            <MapPin size={20} />
                          </div>

                        </motion.div>
                      );
                    })}
                </div>

                {/* Footer Stats */}
                <div className="p-6 border-t border-slate-100">

                  <div className="grid grid-cols-3 gap-4">

                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-slate-900">
                        {filteredHotels.length}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Hotels
                      </p>
                    </div>

                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-slate-900">
                        180+
                      </h4>
                      <p className="text-xs text-slate-500">
                        Cities
                      </p>
                    </div>

                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-slate-900">
                        ★ 4.9
                      </h4>
                      <p className="text-xs text-slate-500">
                        Rating
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      <AnimatePresence>
  {showBookingModal && selectedHotel && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          if (!bookingConfirmed) {
            setShowBookingModal(false);
          }
        }}
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 12 }}
        className="
          bg-white
          border
          border-[#E5E0D8]
          p-8
          md:p-7
          max-w-5xl
          w-full
          relative
          z-10
        "
      >
        {!bookingConfirmed ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-start pb-2">

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-yellow-500 block">
                  Luxury Hotel Reservation
                </span>

                <h3 className="text-3xl font-[Playfair_Display] text-brand-blue leading-tight">
                  Reserve Your Stay
                </h3>

                <p className="text-sm text-slate-500">
                  Complete your details to confirm your luxury accommodation.
                </p>
              </div>

              <button
                onClick={() => setShowBookingModal(false)}
                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-brand-blue"
              >
                ✕
              </button>

            </div>

            {/* Layout */}
            <div className="grid md:grid-cols-2 gap-8 mt-6">

              {/* LEFT */}
              <div className="space-y-6">

                <div className="overflow-hidden rounded-lg">

                  <img
                    src={selectedHotel.images[0]}
                    alt={selectedHotel.name}
                    className="w-full h-64 object-cover"
                  />

                </div>

                <div className="bg-blue-500 p-6 rounded-lg">

                  <span className="text-[10px] uppercase tracking-[0.2em] text-white block">
                    Selected Hotel
                  </span>

                  <h4 className="text-2xl font-[Playfair_Display] text-white mt-2">
                    {selectedHotel.name}
                  </h4>

                  <p className="text-sm text-white/90 mt-2">
                    {selectedHotel.location}
                  </p>

                  <div className="border-t border-white/20 pt-4 mt-5 space-y-3">

                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">
                        Hotel Rating
                      </span>

                      <span className="font-semibold text-white">
                        ⭐ {selectedHotel.rating}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">
                        Reviews
                      </span>

                      <span className="font-semibold text-white">
                        {selectedHotel.reviewsCount}
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              <div className="space-y-6">
                
                <div className="bg-brand-light border border-[#E5E0D8] rounded-lg p-6">

                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 block">
                    Starting Price
                  </span>

                  <h3 className="text-4xl font-[Playfair_Display] text-brand-blue mt-2">
                    ₹{selectedHotel.pricePerNight}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    Per night including premium hotel support.
                  </p>

                </div>

                <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-yellow-500 block">
                  Guest Information
                </label>

                <input
                  type="text"
                  placeholder="Guest Name"
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  className="
                    w-full
                    border
                    border-[#E5E0D8]
                    px-4
                    py-3
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
                    px-4
                    py-3
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
                    px-4
                    py-3
                    rounded-lg
                    focus:border-yellow-500
                    focus:outline-none
                  "
                />

                <div className="grid grid-cols-2 gap-3">

                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="
                      h-14
                      border
                      border-[#E5E0D8]
                      rounded-lg
                      text-slate-600
                    "
                  >
                    Cancel
                  </button>

                  <button
                    className="
                      h-14
                      bg-blue-500
                      text-white
                      rounded-lg
                      font-semibold
                    "
                  >
                    Confirm Stay
                  </button>

                </div>

                <p className="text-xs text-slate-500 text-center">
                  Our hospitality concierge will contact you within 2 hours to
                  finalize your reservation.
                </p>

              </div>

            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-3xl font-[Playfair_Display] text-brand-blue">
              Reservation Confirmed
            </h3>

            <p className="text-slate-500 mt-4">
              Your luxury hotel stay request has been received successfully.
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
