import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Car, ShieldCheck, HelpCircle } from 'lucide-react';
import { mockCabs } from "../data/mockData";

interface Cab {
  id: string;
  name: string;
  type: string;
  category: string;
  image: string;
  pricePerKm: number;
  basePrice: number;
  capacity: number;
  luggage: number;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
}

export const CabsPage: React.FC = () => {
  const [cabs, setCabs] = useState<Cab[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'luxury' | 'suv' | 'coach'>('all');
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // useEffect(() => {
  //   fetch(`${apiUrl}/api/cabs`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setCabs(data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error('Error fetching cabs:', err);
  //       setLoading(false);
  //     });
  // }, [apiUrl]);
  useEffect(() => {
    fetch(`${apiUrl}/api/cabs`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCabs(data);
        } else {
          setCabs(mockCabs);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cabs:", err);

        // fallback to mock data
        setCabs(mockCabs);
        setLoading(false);
      });
  }, [apiUrl]);

  const filteredCabs = selectedFilter === 'all'
    ? cabs
    : cabs.filter(c => c.category === selectedFilter);

  return (
    <div className="min-h-screen bg-brand-light pb-24">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[480px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2000"
          alt="Luxury Cab Service"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest">
              Nishtha Ground Concierge
            </span>
            <h1 className="mt-5 text-4xl sm:text-6xl font-bold text-white font-serif leading-tight">
              Bespoke Luxury Transfers
            </h1>
            <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed">
              Arrive in style. Experience private executive rides, hourly concierge chauffeur hire, and inter-state travel with India's premium vehicle fleet.
            </p>
          </div>
        </div>
      </section>

      {/* Floating search */}
      <section className="relative z-20 -mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-6 md:p-8">

            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Book Your Cab
              </h2>
              <p className="text-gray-600 mt-2">
                Fill in your trip details and we'll get back to you shortly.
              </p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Pickup Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Drop Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drop Location
                </label>
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Pickup Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Pickup Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Time
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Trip Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trip Type
                </label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3">
                  <option>One Way</option>
                  <option>Round Trip</option>
                </select>
              </div>

              {/* Cab Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cab Type
                </label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3">
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Innova</option>
                  <option>Tempo Traveller</option>
                </select>
              </div>

              {/* Passenger Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passengers
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="No. of passengers"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              {/* Phone */}
              <div className="md:col-span-2 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 lg:col-span-2 flex items-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition"
                >
                  Book Cab Now
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="pt-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-wider text-xs">Our Luxury Fleet</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-serif">Choose Your Executive Ride</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Fleet' },
              { id: 'luxury', label: 'Luxury Sedan' },
              { id: 'suv', label: 'Premium SUV' },
              { id: 'coach', label: 'Executive Coach' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${selectedFilter === opt.id
                  ? 'bg-yellow-500 border-transparent text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-[28px] border border-[#E5E0D8] h-[280px] animate-pulse" />
            ))}
          </div>
        ) : filteredCabs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredCabs.map(cab => (
              <motion.div
                key={cab.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="
    bg-white
    rounded-[32px]
    overflow-hidden
    border
    border-slate-200
    shadow-sm
    hover:shadow-2xl
    transition-all
    duration-500
  "
              >
                {/* Image Section */}
                <div className="relative h-[280px] overflow-hidden">

                  <img
                    src={cab.image}
                    alt={cab.name}
                    className="
        w-full
        h-full
        object-cover
        transition-transform
        duration-700
        hover:scale-105
        border-b-2
      "
                  />

                  {/* Category Badge */}
                  <div
                    className="
        absolute
        top-5
        right-5
        bg-[#FACC15]
        text-black
        px-5
        py-2
        rounded-full
        text-sm
        font-bold
      "
                  >
                    {cab.category}
                  </div>

                  {/* Featured Badge */}
                  <div
                    className=" absolute top-20 right-5 bg-[#F97316] text-white px-5 py-2 rounded-full text-sm font-bold"
                  >
                    Premium
                  </div>

                  {/* Rating */}
                  <div
                    className=" absolute bottom-5 left-5 bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                  >
                    <span className="text-yellow-500">★</span>

                    <span className="font-bold text-slate-900">
                      {cab.rating}
                    </span>

                    <span className="text-slate-500 text-xs">
                      ({cab.reviewsCount})
                    </span>
                  </div>

                </div>

                {/* Content */}
                <div className="p-7">

                  <h3
                    className=" text-2xl font-bold text-brand-blue leading-tight mb-4"
                  >
                    {cab.name}
                  </h3>

                  <p
                    className=" text-slate-600 text-sm leading-7 mb-5"
                  >
                    {cab.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">

                    {cab.features.slice(0, 4).map((feature) => (
                      <span
                        key={feature}
                        className=" px-3 py-1.5 bg-blue-50 text-brand-blue rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}

                  </div>

                  {/* Specs */}
                  <div
                    className=" flex justify-between items-center border-y border-slate-100 py-4 mb-6"
                  >
                    <div className="text-center">
                      <p className="text-xs text-slate-400">Seats</p>
                      <p className="font-bold">{cab.capacity}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-slate-400">Bags</p>
                      <p className="font-bold">{cab.luggage}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-slate-400">Rate</p>
                      <p className="font-bold text-[#F97316]">
                        ₹{cab.pricePerKm}/km
                      </p>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs text-slate-400">
                        Starting From
                      </p>

                      <h4 className="text-3xl font-bold text-slate-900">
                        ₹{cab.basePrice}
                      </h4>
                    </div>

                    <Link
                      to={`/cab/${cab.id}`}
                      className="l bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-2xl font-bold transition-all "
                    >
                      Book Now
                    </Link>

                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#E5E0D8] rounded-[28px]">
            <Car className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800 mt-4 font-serif">No Cabs Available</h3>
            <p className="text-slate-500 text-sm mt-1">Adjust filters or try again later.</p>
          </div>
        )}
      </section>

      {/* Safety benefits */}
      <section className="mt-24 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 text-white rounded-[36px] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Car className="w-80 h-80" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-yellow-400">
                <ShieldCheck size={28} />
              </div>
              <h4 className="text-lg font-bold font-serif">Verified Elite Chauffeurs</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                All drivers undergo extensive background screening, navigation training, and language certifications.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-yellow-400">
                <Car size={28} />
              </div>
              <h4 className="text-lg font-bold font-serif">Sanitized Luxury Fleet</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Vehicles are detailed and sanitized before every reservation. Complimentary water and reading material are provided.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-yellow-400">
                <HelpCircle size={28} />
              </div>
              <h4 className="text-lg font-bold font-serif">24/7 Concierge Tracking</h4>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Our operations team tracks all routes in real-time, providing immediate flight adjustment coordination and safety updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
