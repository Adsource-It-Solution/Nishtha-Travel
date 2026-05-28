import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ShieldCheck, Award, ArrowRight, Play, CheckCircle2, Send} from 'lucide-react';
import { SearchTabs } from '../components/SearchTabs';
import { DestinationCard } from '../components/DestinationCard';
import { PackageCard } from '../components/PackageCard';
import { HotelCard } from '../components/HotelCard';
import { Testimonials } from '../components/Testimonials';
import { AnimatedCounters } from '../components/AnimatedCounters';
// import { AIRecommendationSection } from '../components/AIRecommendationSection';
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
    <div className="relative bg-brand-light" id="top">
      {/* 1. CINEMATIC ASYMMETRICAL HERO */}
      <section className="relative min-h-screen overflow-hidden bg-[#fdfbf7]">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1800&q=80"
            alt="Luxury Travel"
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/80 via-brand-blue/40 to-transparent" />

          {/* Bottom Blur + Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32">
            {/* Blur Layer */}
            <div className="absolute inset-0 backdrop-blur-[4px]" />

            {/* Fade Into Page Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7]/85 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex flex-col justify-center">

          <div className="max-w-3xl space-y-8 mb-24">

            {/* Tagline */}
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-brand-purple bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              01 / BESPOKE CONCIERGE
            </span>

            {/* Heading */}
            <h1 className="text-white font-serif leading-[1.05] text-5xl md:text-7xl lg:text-8xl">
              The Art of <br />
              <span className="italic font-normal">
                Bespoke Sanctuary
              </span>{" "}
              Travel
            </h1>

            {/* Description */}
            <p className="text-white/90 max-w-2xl text-base md:text-lg leading-relaxed">
              Nishtha Travel Concierge curates ultra-luxury overwater
              sanctuaries, private aviation suites, and customized global
              itineraries. Designed for the discerning globetrotter seeking
              timeless comfort.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-5 items-center">

              <a
                href="#destinations"
                className="btn-gold rounded-xl"
              >
                Explore Destinations
              </a>

              <a
                href="/about"
                className="flex items-center gap-2 text-white font-medium border-b border-white pb-1 hover:text-brand-purple transition-all duration-300"
              >
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* 2. BOOKING DESK */}
      <section className="py-12 bg-white border-b border-[#E5E0D8] relative z-20">
        <div className="max-w-7xl mx-auto">
          <SearchTabs />
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS */}
      <section className="py-24 bg-brand-light relative" id="destinations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              {/* <span className="text-[11px] text-brand-purple font-bold uppercase tracking-[0.25em] font-serif block"> Global Curation</span> */}
              <h2 className="text-3xl md:text-5xl font-medium font-serif text-brand-blue tracking-tight">Popular Destinations</h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'all', label: 'All Destinations' },
                { id: 'luxury', label: 'Luxury' },
                { id: 'beach', label: 'Tropical Beach' },
                { id: 'mountains', label: 'Alpine Peaks' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDestFilter(opt.id as any)}
                  className={`px-4 py-2 rounded-none text-[9px] font-bold uppercase tracking-widest transition-all border ${destFilter === opt.id
                      ? 'bg-brand-purple border-transparent text-white shadow-none font-bold'
                      : 'bg-white border-[#E5E0D8] text-slate-600 hover:bg-brand-light hover:border-brand-purple'
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

      {/* 5. TRENDING HOLIDAY PACKAGES */}
      <section className="py-24 bg-white relative border-t border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            {/* <span className="text-[11px] text-brand-purple font-bold uppercase tracking-[0.25em] font-serif block">03 / Featured Itineraries</span> */}
            <h2 className="text-3xl md:text-5xl font-medium font-serif text-brand-blue tracking-tight">Trending Travel Packages</h2>
            <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
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
      <section className="py-24 bg-brand-light relative border-t border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            {/* <span className="text-[11px] text-brand-purple font-bold uppercase tracking-[0.25em] font-serif flex items-center justify-center gap-1.5">
              <Flame className="w-4 h-4 text-brand-purple" />
              <span>04 / Seasonal Offers</span>
            </span> */}
            <h2 className="text-3xl md:text-5xl font-medium font-serif text-brand-blue tracking-tight">Exclusive Member Promos</h2>
            <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
              Unlock private flight anomalies, luxury lodge suite vouchers, and corporate holiday price adjustments.
            </p>
          </div>

          <OfferBanner />
        </div>
      </section>

      {/* 7. LUXURY RESORTS & HOTELS */}
      <section className="py-24 bg-white relative border-y border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-2">
              {/* <span className="text-[11px] text-brand-purple font-bold uppercase tracking-[0.25em] font-serif block">05 / Concierge Selection</span> */}
              <h2 className="text-3xl md:text-5xl font-medium font-serif text-brand-blue tracking-tight">Elite Resorts & Lodges</h2>
            </div>
            <a href="/hotels" className="text-brand-purple text-[10px] font-bold uppercase tracking-widest hover:text-brand-blue transition-colors flex items-center gap-1.5 border border-[#E5E0D8] bg-white px-4 py-2.5 rounded-none">
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
      <section className="py-24 bg-brand-light relative border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Media Panel */}
            <div className="relative rounded-none overflow-hidden border border-[#E5E0D8] p-2 bg-white aspect-video md:aspect-[4/3] max-h-[500px] group shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
                alt="Elite Concierge Advisor"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 rounded-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 via-transparent to-transparent" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 rounded-none bg-brand-blue hover:bg-brand-purple text-white flex items-center justify-center border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 pl-1">
                  <Play className="w-6 h-6 fill-white text-white" />
                </button>
              </div>
            </div>

            {/* Core Values */}
            <div className="space-y-8">
              <div className="space-y-3">
                {/* <span className="text-[11px] text-brand-purple font-bold uppercase tracking-[0.25em] font-serif block">06 / Signature Protection</span> */}
                <h3 className="text-3xl md:text-4xl font-medium font-serif text-brand-blue leading-tight">The Nishtha Travel Signature</h3>
                <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed mt-2">
                  Unlock access to elite properties, private aviation lanes, luxury upgrades, and 24/7 dedicated travel concierge staff worldwide.
                </p>
              </div>


              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-none bg-white border border-[#E5E0D8] text-brand-purple flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-brand-blue font-serif font-bold text-sm tracking-wide">Full-Refund Protection</h4>
                    <p className="text-slate-500 text-xs font-normal leading-relaxed mt-1">
                      Enjoy seamless cancellations and flight adjustments up to 24 hours prior to travel, backed by premium partner insurance coverage.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-none bg-white border border-[#E5E0D8] text-brand-purple flex items-center justify-center shrink-0 shadow-sm">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-brand-blue font-serif font-bold text-sm tracking-wide">24/7 Elite Concierge Support</h4>
                    <p className="text-slate-500 text-xs font-normal leading-relaxed mt-1">
                      A dedicated digital concierge is available through text or WhatsApp at any hour to modify bookings, reserve dinners, or secure fast-track visas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-none bg-white border border-[#E5E0D8] text-brand-purple flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-brand-blue font-serif font-bold text-sm tracking-wide">Elite Membership Upgrade</h4>
                    <p className="text-slate-500 text-xs font-normal leading-relaxed mt-1">
                      Earn priority points to unlock complimentary lounge access, private yacht charters, free room nights, and luxury transfers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & WHY CHOOSE US */}
      <section className="py-12 bg-white relative z-10 border-b border-[#E5E0D8] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCounters />
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-24 bg-white relative border-t border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            {/* <span className="text-[11px] text-brand-purple font-bold uppercase tracking-[0.25em] font-serif block">07 / Guest Reviews</span> */}
            <h2 className="text-3xl md:text-5xl font-medium font-serif text-brand-blue tracking-tight">Guest Experiences</h2>
            <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
              Read how selective world travellers design and book their luxury vacations with Nishtha Travel Concierge.
            </p>
          </div>

          <Testimonials />
        </div>
      </section>

      {/* 10. TRAVEL INSPIRATION / BLOGS */}
      <section className="py-24 bg-brand-light relative border-t border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-2">
              {/* <span className="text-[11px] text-brand-purple font-bold uppercase tracking-[0.25em] font-serif block">08 / Journal</span> */}
              <h2 className="text-3xl md:text-5xl font-medium font-serif text-brand-blue tracking-tight">Travel Inspiration</h2>
            </div>
            <a href="#" className="text-brand-purple text-[10px] font-bold uppercase tracking-widest hover:text-brand-blue transition-colors flex items-center gap-1.5 border border-[#E5E0D8] bg-white px-4 py-2.5 rounded-none shadow-sm">
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/journal/${blog.id}`}
                className="block h-full group"
              >
                <div
                  className="bg-white border border-[#E5E0D8] rounded-none overflow-hidden flex flex-col h-full cursor-pointer shadow-[0_4px_16px_rgba(13,19,31,0.02)] transition-all duration-300 hover:border-brand-purple"
                >
                  <div className="relative h-48 w-full overflow-hidden border-b border-[#E5E0D8]">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[9px] text-brand-purple font-bold uppercase tracking-widest block">
                        {blog.date} • {blog.readTime}
                      </span>
                      <h3 className="text-base font-serif font-bold text-brand-blue group-hover:text-brand-purple transition-colors leading-snug">
                        {blog.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-normal border-t border-[#E5E0D8] pt-4">
                      <span className="font-serif italic">By {blog.author}</span>
                      <span className="text-brand-purple group-hover:text-brand-blue flex items-center gap-1 transition-colors text-[10px] font-bold uppercase tracking-widest">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. NEWSLETTER & SUBSCRIBING */}
      <section className="py-24 bg-brand-light relative overflow-hidden border-t border-[#E5E0D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 md:p-16 text-center space-y-8 relative overflow-hidden border border-[#E5E0D8] bg-white rounded-none shadow-[0_4px_24px_rgba(13,19,31,0.03)]">
            <div className="max-w-2xl mx-auto space-y-4">
              {/* <span className="text-[11px] text-brand-purple font-bold uppercase tracking-[0.25em] font-serif block">09 / Weekly Dispatch</span> */}
              <h3 className="text-3xl md:text-5xl font-medium font-serif text-brand-blue tracking-tight leading-tight">
                Unlock Elite Travel Portfolios
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">
                Join our exclusive mailing list to receive hand-picked deals, flight suite pricing anomalies, luxury villa upgrades, and concierge travel inspirations.
              </p>
            </div>

            <div className="max-w-md mx-auto relative z-10">
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-none bg-emerald-50 border border-emerald-100 flex items-center justify-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Welcome to Club Nishtha. Check your inbox.</span>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your private email address"
                      className="glass-input flex-grow placeholder-slate-400 text-xs text-center sm:text-left w-full font-normal rounded-none"
                    />
                    <button
                      type="submit"
                      className="btn-gold px-6 py-3.5 shrink-0 flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest rounded-none w-full sm:w-auto"
                    >
                      <span>Join Elite</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
