import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageCard } from '../components/PackageCard';
import { OfferBanner } from '../components/OfferBanner';
import { mockPackages } from '../data/mockData';
import type { Package } from '../data/mockData';
import { Luggage, Check, X } from 'lucide-react';
import { Navbar } from '../components/Navbar';

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
      <Navbar />
      <section className="relative overflow-hidden h-[550px] mb-14">

        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        <div className="relative z-10 h-full flex items-center px-12 md:px-20">

          <div className="max-w-3xl font-['Poppins']">

            <span className="inline-flex px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
              Luxury Holiday Collection
            </span>

            <h1 className="text-6xl md:text-7xl font-bold text-white mt-6 leading-tight">
              Curated Journeys Beyond Imagination
            </h1>

            <p className="text-white/80 text-lg mt-6 max-w-2xl">
              Discover handpicked destinations, luxury resorts,
              private experiences and unforgettable adventures.
            </p>

          </div>

        </div>

      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Search Panel */}
        <section className="relative z-20 -mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-6 md:p-8">

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Plan Your Dream Holiday
                </h2>
                <p className="text-gray-600 mt-2">
                  Share your travel preferences and get a customized holiday package.
                  <span className='text-black text-xl font-bold mx-2'>Enquiry Now</span>
                </p>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                {/* Full Name */}
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border rounded-xl px-4 py-3"
                />

                {/* Mobile */}
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="border rounded-xl px-4 py-3"
                />

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email Address"
                  className="border rounded-xl px-4 py-3"
                />

                {/* City */}
                <input
                  type="text"
                  placeholder="Your City"
                  className="border rounded-xl px-4 py-3"
                />

                {/* Destination */}
                <input
                  type="text"
                  placeholder="Destination"
                  className="border rounded-xl px-4 py-3"
                />

                {/* Departure City */}
                <input
                  type="text"
                  placeholder="Departure City"
                  className="border rounded-xl px-4 py-3"
                />

                {/* Travel Date */}
                <input
                  type="date"
                  className="border rounded-xl px-4 py-3"
                />

                {/* Duration */}
                <input
                  type="text"
                  placeholder="Duration (e.g. 5N/6D)"
                  className="border rounded-xl px-4 py-3"
                />

                {/* Adults */}
                <input
                  type="number"
                  min="1"
                  placeholder="Adults"
                  className="border rounded-xl px-4 py-3"
                />

                {/* Children */}
                <input
                  type="number"
                  min="0"
                  placeholder="Children"
                  className="border rounded-xl px-4 py-3"
                />

                {/* Infants */}
                <input
                  type="number"
                  min="0"
                  placeholder="Infants"
                  className="border rounded-xl px-4 py-3"
                />

                {/* Rooms */}
                <input
                  type="number"
                  min="1"
                  placeholder="Rooms Required"
                  className="border rounded-xl px-4 py-3"
                />

                {/* Budget */}
                <select className="border rounded-xl px-4 py-3">
                  <option>Budget Range</option>
                  <option>₹20,000 - ₹50,000</option>
                  <option>₹50,000 - ₹1,00,000</option>
                  <option>₹1,00,000 - ₹2,00,000</option>
                  <option>₹2,00,000+</option>
                </select>

                {/* Hotel Category */}
                <select className="border rounded-xl px-4 py-3">
                  <option>Hotel Category</option>
                  <option>3 Star</option>
                  <option>4 Star</option>
                  <option>5 Star</option>
                  <option>Luxury Resort</option>
                </select>

                {/* Package Type */}
                <select className="border rounded-xl px-4 py-3">
                  <option>Package Type</option>
                  <option>Family</option>
                  <option>Honeymoon</option>
                  <option>Group Tour</option>
                  <option>Adventure</option>
                  <option>Corporate</option>
                </select>

                {/* Flight Required */}
                <select className="border rounded-xl px-4 py-3">
                  <option>Flight Booking Required?</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>

                {/* Cab Required */}
                <select className="border rounded-xl px-4 py-3">
                  <option>Cab / Sightseeing Required?</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>

                {/* Visa */}
                <select className="border rounded-xl px-4 py-3">
                  <option>Visa Assistance Required?</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>

                {/* Special Occasion */}
                <select className="border rounded-xl px-4 py-3">
                  <option>Special Occasion</option>
                  <option>Honeymoon</option>
                  <option>Anniversary</option>
                  <option>Birthday</option>
                  <option>Family Vacation</option>
                  <option>None</option>
                </select>

                {/* Notes */}
                <textarea
                  rows={4}
                  placeholder="Tell us your requirements, hotel preferences, sightseeing interests, meal preferences, etc."
                  className="border rounded-xl px-4 py-3 lg:col-span-4"
                />

                {/* Submit */}
                <button
                  type="submit"
                  className="lg:col-span-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  Get Free Holiday Quote
                </button>

              </form>
            </div>
          </div>
        </section>

        {/* Offers / Deals Section */}
        <div className="mb-14 mt-10">
          <div className="mb-6 space-y-1">
            {/* <span className="text-xs font-semibold font-['Poppins'] text-indigo-600 uppercase tracking-[0.25em] block mb-2">
              Club Benefits
            </span> */}

            <h3 className="text-2xl font-semibold font-['Poppins'] text-slate-900 leading-tight">
              Active Private Curation Deals
            </h3>
          </div>
          <OfferBanner />
        </div>

        {/* Categories Tab Selector */}
        <div className="mb-12">
          <div
            className="
      flex
      overflow-x-auto
      whitespace-nowrap
      scrollbar-none
      gap-4
      sm:gap-6
      px-4
      sm:px-6
      lg:px-14
      py-2
      bg-white
      rounded-[24px]
      shadow-lg
      border
      border-slate-100
      w-full
      font-['Poppins']
    "
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
            relative
            px-6
            py-3
            rounded-full
            text-sm
            font-medium
            tracking-wide
            transition-all
            duration-300
            shrink-0
            ${isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                    }
          `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePkgCat"
                      className="
                absolute
                inset-0
                rounded-full
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                -z-10
              "
                    />
                  )}

                  <span className="relative z-10">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
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
