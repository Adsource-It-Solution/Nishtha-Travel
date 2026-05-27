import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, ShieldCheck, Award, ArrowRight, Play, CheckCircle2, Send, Flame } from 'lucide-react';
import { SearchTabs } from '../components/SearchTabs';
import { DestinationCard } from '../components/DestinationCard';
import { PackageCard } from '../components/PackageCard';
import { HotelCard } from '../components/HotelCard';
import { Testimonials } from '../components/Testimonials';
import { AnimatedCounters } from '../components/AnimatedCounters';
import { AIRecommendationSection } from '../components/AIRecommendationSection';
import { OfferBanner } from '../components/OfferBanner';
import { mockDestinations, mockPackages, mockHotels, mockBlogs } from '../data/mockData';

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

  return (
    <div className="relative bg-slate-50">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-20 overflow-hidden border-b border-soft-border">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Maldives Resort"
            className="w-full h-full object-cover brightness-[0.7]"
          />
          {/* Brand Color Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-brand-blue/15 to-slate-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),rgba(245,247,250,0.9))]" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-white backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-brand-purple animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-brand-purple">
              Bespoke Luxury Travel Concierge
            </span>
          </motion.div>

          {/* Large Luxury Typography */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-sans text-brand-blue tracking-tight leading-[1.05]"
            >
              Explore the World's <br />
              <span className="text-gradient-luxury">Most Elite Retreats</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-slate-600 text-xs sm:text-base max-w-2xl mx-auto font-semibold leading-relaxed"
            >
              Curation of ultraluxury overwater sanctuaries, private aviation suites, and customized travel itineraries for the selective globetrotter.
            </motion.p>
          </div>

          {/* Floating Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full pt-4"
          >
            <SearchTabs />
          </motion.div>
        </div>
      </section>

      {/* 2. STATS & WHY CHOOSE US */}
      <section className="py-12 bg-white relative z-10 border-b border-soft-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCounters />
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">Global Curation</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue">Popular Destinations</h2>
            </div>
            
            {/* Filter buttons */}
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
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                    destFilter === opt.id
                      ? 'bg-brand-purple border-transparent text-white font-bold shadow-sm'
                      : 'bg-white border-soft-border text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI RECOMMENDATIONS PLANNER */}
      <AIRecommendationSection />

      {/* 5. TRENDING HOLIDAY PACKAGES */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">Featured Itineraries</span>
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

      {/* 6. SEASONAL PROMO OFFERS & DEALS */}
      <section className="py-24 bg-slate-50 relative border-t border-soft-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs text-brand-purple font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Flame className="w-4 h-4 text-brand-purple" />
              <span>Seasonal Offers</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue">Exclusive Member Promos</h2>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Unlock private flight anomalies, luxury lodge suite vouchers, and corporate holiday price adjustments.
            </p>
          </div>

          <OfferBanner />
        </div>
      </section>

      {/* 7. LUXURY RESORTS & HOTELS */}
      <section className="py-24 bg-white relative border-y border-soft-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-2">
              <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">Concierge Selection</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue">Elite Resorts & Lodges</h2>
            </div>
            <a href="/hotels" className="text-brand-purple text-xs font-extrabold uppercase tracking-widest hover:text-brand-blue transition-colors flex items-center gap-1.5 border border-soft-border bg-slate-50 px-4 py-2.5 rounded-xl">
              <span>View All Hotels</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockHotels.slice(0, 3).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE NISHTHA CONCIERGE */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Media Panel */}
            <div className="relative rounded-3xl overflow-hidden shadow-luxury border border-white aspect-video md:aspect-[4/3] max-h-[500px] group">
              <img
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
                alt="Elite Concierge Advisor"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/30 via-transparent to-transparent" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 rounded-full bg-brand-purple hover:bg-brand-blue text-white flex items-center justify-center shadow-luxury transition-all duration-300 hover:scale-105 active:scale-95 pl-1">
                  <Play className="w-6 h-6 fill-white text-white" />
                </button>
              </div>
            </div>

            {/* Core Values */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">Exclusivity Guaranteed</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-blue leading-tight">The Nishtha Travel Signature</h3>
                <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed mt-2">
                  Unlock access to elite properties, private aviation lanes, luxury upgrades, and 24/7 dedicated travel concierge staff worldwide.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/5 border border-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-brand-blue font-extrabold text-sm uppercase tracking-wide">Full-Refund Protection</h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed mt-1">
                      Enjoy seamless cancellations and flight adjustments up to 24 hours prior to travel, backed by premium partner insurance coverage.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/5 border border-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-brand-blue font-extrabold text-sm uppercase tracking-wide">24/7 Elite Concierge Support</h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed mt-1">
                      A dedicated digital concierge is available through text or WhatsApp at any hour to modify bookings, reserve dinners, or secure fast-track visas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/5 border border-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-brand-blue font-extrabold text-sm uppercase tracking-wide">Elite Membership Upgrade</h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed mt-1">
                      Earn priority points to unlock complimentary lounge access, private yacht charters, free room nights, and luxury transfers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-24 bg-white relative border-t border-soft-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">Client Feedback</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue">Guest Experiences</h2>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Read how selective world travellers design and book their luxury vacations with Nishtha Travel Concierge.
            </p>
          </div>

          <Testimonials />
        </div>
      </section>

      {/* 10. TRAVEL INSPIRATION / BLOGS */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-2">
              <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">Nishtha Journal</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue">Travel Inspiration</h2>
            </div>
            <a href="#" className="text-brand-purple text-xs font-extrabold uppercase tracking-widest hover:text-brand-blue transition-colors flex items-center gap-1.5 border border-soft-border bg-white px-4 py-2.5 rounded-xl shadow-sm">
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="glass-card overflow-hidden flex flex-col h-full group cursor-pointer shadow-sm"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-brand-purple font-bold uppercase tracking-widest block">
                      {blog.date} • {blog.readTime}
                    </span>
                    <h3 className="text-base font-extrabold text-brand-blue group-hover:text-brand-purple transition-colors leading-snug">
                      {blog.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold border-t border-soft-border pt-4">
                    <span>By {blog.author}</span>
                    <span className="text-brand-purple group-hover:text-brand-blue flex items-center gap-1 transition-colors">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. NEWSLETTER & SUBSCRIBING */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-soft-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-card p-8 md:p-16 text-center space-y-8 relative overflow-hidden border-brand-purple/20 shadow-luxury-lg bg-white">
            {/* Absolute gradients */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-4">
              <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">Weekly Dispatch</span>
              <h3 className="text-3xl md:text-5xl font-extrabold text-brand-blue tracking-tight leading-tight">
                Unlock Elite Travel Portfolios
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Join our exclusive mailing list to receive hand-picked deals, flight suite pricing anomalies, luxury villa upgrades, and concierge travel inspirations.
              </p>
            </div>

            <div className="max-w-md mx-auto relative z-10">
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-150 flex items-center justify-center gap-2 text-emerald-700 font-extrabold text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Welcome to Club Nishtha. Check your inbox!</span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your private email"
                      className="glass-input flex-grow placeholder-slate-400 text-xs text-center sm:text-left focus:ring-brand-purple focus:border-brand-purple w-full font-semibold"
                    />
                    <button
                      type="submit"
                      className="btn-gold px-6 py-3.5 shrink-0 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-md w-full sm:w-auto"
                    >
                      <span>Join Elite</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
