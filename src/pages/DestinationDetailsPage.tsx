import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Heart, ArrowLeft, Sun, CheckCircle, ChevronDown, Utensils, HelpCircle } from 'lucide-react';
import { mockDestinations } from '../data/mockData';

export const DestinationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'itinerary' | 'food' | 'info'>('itinerary');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [isLiked, setIsLiked] = useState(false);

  const destination = mockDestinations.find((d) => d.id === id) || mockDestinations[0];

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 relative overflow-hidden">
      
      {/* 1. CINEMATIC HEADER BANNER */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-brand-blue/15 to-slate-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,rgba(245,247,250,0.95))]" />

        {/* Back navigation & Actions */}
        <div className="absolute top-28 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-soft-border hover:bg-slate-50 text-xs font-bold uppercase tracking-wider transition-all shadow-sm text-slate-700"
            >
              <ArrowLeft className="w-4 h-4 text-brand-purple" />
              <span>Back Explore</span>
            </Link>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 rounded-xl bg-white border border-soft-border flex items-center justify-center text-slate-500 hover:text-red-500 transition-all shadow-sm"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500 scale-105' : ''}`} />
            </button>
          </div>
        </div>

        {/* Destination Metadata Title */}
        <div className="absolute bottom-10 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-3">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-brand-purple font-extrabold text-xs sm:text-sm uppercase tracking-widest">
              <MapPin className="w-4 h-4" />
              <span>{destination.country}</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-brand-blue tracking-tight leading-none">
              {destination.name}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm pt-2">
              <span className="flex items-center gap-1 font-bold bg-brand-purple/5 text-brand-purple px-3 py-1 rounded-full border border-brand-purple/10">
                <Star className="w-4 h-4 fill-brand-purple text-brand-purple" />
                {destination.rating} ({destination.reviewsCount} guest ratings)
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-soft-border px-3 py-1 rounded-full text-slate-600 shadow-sm font-semibold">
                <Sun className="w-4 h-4 text-brand-soft" />
                <span>{destination.weather.temp} • {destination.weather.condition}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PAGE DETAILS CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main info panel */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Highlights overview */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold uppercase tracking-wider text-brand-blue">Destination Profile</h2>
              <p className="text-slate-500 font-semibold text-xs sm:text-sm leading-relaxed">
                {destination.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4">
                {destination.highlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-soft-border p-3.5 rounded-xl shadow-sm">
                    <CheckCircle className="w-4 h-4 text-brand-purple shrink-0" />
                    <span className="text-xs font-bold text-slate-700">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Tabs Navigation */}
            <div className="space-y-6">
              <div className="flex border-b border-soft-border gap-6">
                {[
                  { id: 'itinerary', label: 'Bespoke Itinerary' },
                  { id: 'food', label: 'Local Gastronomy' },
                  { id: 'info', label: 'Assurance & Faq' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative pb-3 text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === tab.id ? 'text-brand-purple font-extrabold' : 'text-slate-400 hover:text-brand-purple'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeDetailsTab"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-brand-blue to-brand-purple rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab: Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  {destination.itinerary.map((item) => {
                    const isExpanded = expandedDay === item.day;
                    return (
                      <div
                        key={item.day}
                        className="glass-card overflow-hidden transition-all duration-300 shadow-sm border border-soft-border bg-white"
                      >
                        <button
                          onClick={() => toggleDay(item.day)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-all focus:outline-none"
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-brand-purple text-white font-extrabold flex items-center justify-center shrink-0 shadow-sm">
                              {item.day}
                            </span>
                            <div>
                              <span className="text-[9px] text-brand-purple font-bold uppercase tracking-widest">Day {item.day} Plan</span>
                              <h4 className="text-sm font-bold text-slate-800 mt-0.5">{item.title}</h4>
                            </div>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 pt-0 border-t border-soft-border text-slate-500 text-xs sm:text-sm leading-relaxed space-y-2 bg-slate-50 font-semibold">
                                <p>{item.details}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab: Gastronomy */}
              {activeTab === 'food' && (
                <div className="space-y-6">
                  {destination.foodExperiences.map((food, i) => (
                    <div key={i} className="glass-card overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 p-4 bg-white border border-soft-border shadow-sm">
                      <div className="md:col-span-4 h-36 rounded-xl overflow-hidden relative border border-soft-border shadow-sm">
                        <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="md:col-span-8 flex flex-col justify-center space-y-2">
                        <span className="text-[9px] text-brand-purple font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5" />
                          <span>Elite Recommendation</span>
                        </span>
                        <h4 className="font-extrabold text-brand-blue text-sm uppercase tracking-wider">{food.name}</h4>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">{food.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: FAQs */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  {destination.faqs.length > 0 ? (
                    destination.faqs.map((faq, i) => (
                      <div key={i} className="p-5 rounded-xl bg-white border border-soft-border shadow-sm space-y-2">
                        <div className="flex gap-2.5 items-start">
                          <HelpCircle className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                          <h4 className="text-brand-blue font-bold text-sm">{faq.question}</h4>
                        </div>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pl-7 font-semibold">{faq.answer}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-8 text-slate-400 text-xs font-bold">
                      Faq data is currently synchronized with the regional tourism board.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Attractions and Maps */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-wider text-brand-blue">Nearby Attractions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.nearbyAttractions.map((att, i) => (
                  <div key={i} className="glass-card p-3.5 flex gap-4 items-center bg-white shadow-sm border border-soft-border">
                    <img src={att.image} alt={att.name} className="w-16 h-16 rounded-xl object-cover border border-soft-border" />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{att.name}</h4>
                      <span className="text-xs text-slate-400 font-bold">{att.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Checkout/Booking Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="glass-card p-6 md:p-8 space-y-6 border border-brand-purple/20 shadow-luxury-lg bg-white">
              <div>
                <span className="text-[10px] text-brand-purple font-bold uppercase tracking-widest block">Bespoke Suite Package</span>
                <h3 className="text-lg font-bold text-brand-blue mt-1">Book This Voyage</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed font-semibold">
                  Secure private seaplanes, luxury suites, gourmet breakfasts, and tour coordinates.
                </p>
              </div>

              {/* Price Details */}
              <div className="border-y border-soft-border py-4 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-600 font-semibold">
                  <span>5-Star Suite (per night)</span>
                  <span className="font-bold text-slate-800">$1,250</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 font-semibold">
                  <span>Charter Seaplane transfer</span>
                  <span className="text-emerald-600 font-bold">Free Upgrade</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 font-semibold">
                  <span>VIP Lounge Protection</span>
                  <span className="text-emerald-600 font-bold">Included</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Starting from</span>
                <span className="text-2xl font-extrabold text-brand-blue">${destination.id === 'dest-1' ? '2,499' : '1,850'}<span className="text-xs text-slate-400 font-bold">/person</span></span>
              </div>

              {/* Book button */}
              <Link to="/packages" className="btn-gold w-full py-4 text-xs font-extrabold uppercase tracking-wider">
                Book This Voyage Now
              </Link>

              {/* Assurances */}
              <div className="text-[9px] text-slate-400 text-center flex items-center justify-center gap-1.5 font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-brand-purple" />
                <span>Price Match Guarantee & VIP Benefits Enabled.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};
