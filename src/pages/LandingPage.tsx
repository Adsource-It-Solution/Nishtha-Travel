import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Send,
} from 'lucide-react';
import "swiper/css";
import "swiper/css/navigation";
import { SearchTabs } from '../components/SearchTabs';
import { DestinationCard } from '../components/DestinationCard';
import { PackageCard } from '../components/PackageCard';
import { Testimonials } from '../components/Testimonials';
import { AnimatedCounters } from '../components/AnimatedCounters';
import { mockDestinations, mockPackages, mockCabs, type Cab } from '../data/mockData';
import { Navbar } from '../components/Navbar';
import { lazy } from "react";
import { CabCard } from '../components/CabCards';

const TravelSignatureSection = lazy(
  () => import("../components/NishtaChosse")
);

export const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [destFilter, setDestFilter] = useState<'all' | 'luxury' | 'beach' | 'mountains'>('all');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const filteredDestinations = destFilter === 'all'
    ? mockDestinations
    : mockDestinations.filter(d => d.category === destFilter);

    const [cabs, setCabs] = useState<Cab[]>([]);
      const [loading, setLoading] = useState(true);
      const [selectedFilter,] = useState<'all' | 'luxury' | 'suv' | 'coach'>('all');
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
    <div>
      <Navbar />
      <div className="relative bg-slate-50">

        <section className="relative flex items-center justify-center pt-16 lg:pt-48 overflow-hidden border-b border-soft-border">

          <div className="absolute inset-0">
            <picture>
              <source
                media="(max-width: 1023px)"
                srcSet="/mobile-image.jpg"
              />

              <img
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=80"
                alt="Luxury Maldives Resort"
                className="w-full h-full object-cover object-center brightness-[0.7]"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-brand-blue/15 to-slate-50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),rgba(245,247,250,0.9))]" />
          </div>

          <div className="max-w-[1423px] mx-auto px-6 lg:px-10 relative z-10 flex flex-col space-y-10">
            <div className="space-y-4 max-w-4xl lg:-ml-20">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] text-left"
              >
                Travel Farther,
                <br />
                Experience Deeper,
                <br />
                Live Better.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-white/90 text-sm sm:text-lg max-w-2xl leading-relaxed text-left"
              >
                Explore extraordinary destinations crafted into unforgettable
                experiences around the globe.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full pb-10"
            >
              <SearchTabs />
            </motion.div>

          </div>
        </section>

        <section className="py-24 bg-slate-50 relative">
          <div className="max-w-[1423px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                {/* <span className="text-xs text-yellow-500 font-bold uppercase tracking-widest block">Global Curation</span> */}
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue">Popular Destinations</h2>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Destinations' },
                  { id: 'luxury', label: 'Luxury' },
                  { id: 'beach', label: 'Tropical Beach' },
                  { id: 'mountains', label: 'Alpine Peaks' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setDestFilter(opt.id as any)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${destFilter === opt.id
                      ? 'bg-yellow-500 border-transparent text-white font-bold shadow-sm'
                      : 'bg-white border-soft-border text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
              {filteredDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="min-w-[290px] sm:min-w-[380px] flex-shrink-0 snap-start"
                >
                  <DestinationCard destination={dest} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-18 bg-white relative mb-4">
          <div className="max-w-[1423px] mx-auto px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              {/* <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">Featured Itineraries</span> */}
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue">Trending Travel Packages</h2>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Curated packages combining luxury lodges, custom local tours, private charters, and elite wellness spa treatments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mockPackages.slice(0, 3).map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
                <section className="py-24 bg-slate-50 relative">
          <div className="max-w-[1423px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
              <div className="max-w-2xl">
                <h2 className="mt-4 text-5xl font-bold text-brand-blue">
                  Executive Fleet Collection
                </h2>
                <p className="mt-4 text-slate-500">
                  Luxury chauffeur-driven vehicles for airport transfers,
                  employee transportation, corporate mobility and outstation journeys.
                </p>
              </div>
              <Link
                to="/cabs"
                className="
              btn-gold
              flex
              items-center
              gap-2
            "
              >
                View Full Fleet
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-hide">
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
                {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-[28px] border border-[#E5E0D8] h-[280px] animate-pulse" />
            ))}
          </div>
        ) : filteredCabs.slice(0, 5).map((cab) => (
                  <div
                    key={cab.id}
                    className="
        min-w-[280px]
        sm:min-w-[320px]
        lg:min-w-[340px]
        flex-shrink-0
        snap-start
      "
                  >
                    <CabCard cab={cab} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="h-[800px]" />}>
          <TravelSignatureSection />
        </Suspense>

        {/* 2. STATS & WHY CHOOSE US */}
        <section className="py-12 bg-white relative z-10 border-b border-soft-border shadow-sm">
          <div className="max-w-[1423px] mx-auto px-6 lg:px-10">
            <AnimatedCounters />
          </div>
        </section>

        <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="mt-6 text-5xl md:text-7xl font-black text-brand-blue leading-tight">
                Guest Experiences
              </h2>
              <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Discover how travelers across the globe trust
                Nishtha Travel to craft unforgettable luxury journeys.
              </p>
              {/* Stats */}
              <div className="flex justify-center gap-10 mt-12 flex-wrap">
                <div>
                  <h3 className="text-4xl font-black text-brand-blue">
                    4.9★
                  </h3>
                  <p className="text-slate-500">
                    Average Rating
                  </p>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-brand-blue">
                    2,500+
                  </h3>
                  <p className="text-slate-500">
                    Happy Travelers
                  </p>
                </div>
                <div>
                  <h3 className="text-4xl font-black text-brand-blue">
                    65+
                  </h3>
                  <p className="text-slate-500">
                    Countries Covered
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-20">
              <Testimonials />
            </div>
          </div>
        </section>

        <section className="relative py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1502920917128-1aa500764ce7"
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/85 to-brand-purple/90" />
          </div>

          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[40px] p-10 md:p-20 shadow-2xl">
              <div className="flex justify-center">
                <span className="px-5 py-2 rounded-full bg-yellow-400 text-black font-bold text-xs uppercase tracking-[3px]">
                  Weekly Luxury Dispatch
                </span>
              </div>

              <div className="text-center mt-8 max-w-4xl mx-auto">
                <h2 className="text-white font-black text-4xl md:text-6xl leading-tight">
                  Unlock Elite Travel
                  <span className="block text-yellow-300">
                    Portfolios & Hidden Deals
                  </span>
                </h2>
                <p className="text-white/80 text-lg md:text-xl mt-6 leading-relaxed">
                  Join thousands of luxury travelers receiving
                  exclusive flight pricing anomalies, premium villa upgrades,
                  private tour opportunities and concierge travel inspiration.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-14">
                <div className="text-center">
                  <div className="text-white font-black text-3xl">
                    15K+
                  </div>
                  <div className="text-white/70 text-sm mt-1">
                    Subscribers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-white font-black text-3xl">
                    250+
                  </div>
                  <div className="text-white/70 text-sm mt-1">
                    Weekly Deals
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-white font-black text-3xl">
                    24/7
                  </div>
                  <div className="text-white/70 text-sm mt-1">
                    Concierge Support
                  </div>
                </div>
              </div>

              <div className="max-w-2xl mx-auto mt-14">
                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-5 flex items-center justify-center gap-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                      <span className="text-white font-semibold">
                        Welcome to Club Nishtha. Check your inbox.
                      </span>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubscribe}
                      className="flex flex-col md:flex-row gap-4"
                    >
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="
                  flex-1
                  px-6
                  py-5
                  rounded-2xl
                  bg-white/15
                  border
                  border-white/20
                  text-white
                  placeholder:text-white/50
                  backdrop-blur-lg
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-400
                "
                      />
                      <button
                        type="submit"
                        className="
                  px-10
                  py-5
                  rounded-2xl
                  bg-yellow-400
                  hover:bg-yellow-300
                  text-black
                  font-bold
                  transition-all
                  duration-300
                  hover:scale-105
                  flex
                  items-center
                  gap-2
                  justify-center
                "
                      >
                        Join Elite
                        <Send className="w-5 h-5" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-center text-white/60 text-sm mt-8">
                No spam. Unsubscribe anytime. Premium travel insights only.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
