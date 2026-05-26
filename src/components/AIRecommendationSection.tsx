import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Map, Compass, CheckCircle2, ChevronRight } from 'lucide-react';

interface AIPlan {
  title: string;
  sub: string;
  hotel: string;
  dining: string;
  day1: string;
  day2: string;
  day3: string;
}

const AI_PLANS: Record<string, AIPlan> = {
  'europe-romantic-royal': {
    title: "Amalfi Coast & Capri Dream",
    sub: "6-Day Coastal Serenade for two",
    hotel: "Le Sirenuse, Positano (Private Balcony Suite)",
    dining: "Da Adolfo Beach Club & Michelin-Starred La Sponda",
    day1: "Arrival by private Mercedes, check-in, sunset couples message.",
    day2: "Private Riva speed yacht cruise to Capri and the Blue Grotto.",
    day3: "Private cooking masterclass in Ravello followed by a hike down Path of the Gods."
  },
  'asia-wellness-ultra': {
    title: "Kyoto & Hakone Spiritual Retreat",
    sub: "7-Day Zen immersion & private Hot Springs",
    hotel: "Aman Kyoto & Ryokan Gora Kadan",
    dining: "Private Gion Kaiseki banquet & traditional Buddhist Shojin Ryori",
    day1: "Check-in at Ryokan, soak in active hot springs baths, premium Kaiseki feast.",
    day2: "Private sunrise bamboo forest guided walk, tea ceremony with Zen master.",
    day3: "Bullet train VIP cabin transfer to Tokyo, evening skyline helicopter tour."
  },
  'tropical-adventure-royal': {
    title: "Maldives Private Island Escape",
    sub: "5-Day Marine Discovery & Luxury Sanctuary",
    hotel: "One&Only Reethi Rah (Overwater Pool Villa)",
    dining: "Ithaa Undersea Restaurant & private beach candlelit BBQ",
    day1: "Seaplane arrival, private butler unpacking, sunset dolphin charter.",
    day2: "Private coral reef snorkeling with marine biologist, underwater photography.",
    day3: "Sandbank gourmet picnic lunch via private speed charter, reef spa treatment."
  },
  'alpine-adventure-ultra': {
    title: "Swiss Alps Heli-Ski & Wellness",
    sub: "6-Day Alpine Expedition & Thermal Spa",
    hotel: "The Chedi Andermatt (Deluxe Fireplace Suite)",
    dining: "Chesa Veglia Swiss Fondue & Asian-Alpine Fusion Dining",
    day1: "VIP Glacier Express arrival, check-in, cozy fireplace dinner.",
    day2: "Private Heli-Skiing session on Glacier 3000, alpine photography.",
    day3: "Thermal bath wellness recovery, fine-wine tasting in private humidor room."
  }
};

export const AIRecommendationSection: React.FC = () => {
  const [region, setRegion] = useState('tropical');
  const [style, setStyle] = useState('adventure');
  const [budget, setBudget] = useState('royal');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<AIPlan | null>(null);

  const handleGenerate = () => {
    setLoading(true);
    setPlan(null);
    setTimeout(() => {
      const key = `${region}-${style}-${budget}`;
      const generatedPlan = AI_PLANS[key] || AI_PLANS['tropical-adventure-royal'];
      setPlan(generatedPlan);
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-slate-100 border-y border-soft-border">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/5 text-brand-purple border border-brand-purple/10 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Concierge Intelligence</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-blue tracking-tight">
            Design Your Perfect Escape
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
            Our AI Travel Intelligence engine synthesizes elite destinations, 5-star properties, and bespoke itineraries to match your unique state of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 glass-card p-6 md:p-8 space-y-6">
            <h3 className="text-base font-extrabold text-brand-blue flex items-center gap-2 uppercase tracking-wider">
              <Compass className="w-5 h-5 text-brand-purple" />
              <span>Selection Engine</span>
            </h3>

            {/* Region Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Where do you want to fly?</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'tropical', label: '🌴 Tropical' },
                  { id: 'europe', label: '🏛️ Europe' },
                  { id: 'asia', label: '⛩️ Asia' },
                  { id: 'alpine', label: '🏔️ Alpine' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setRegion(opt.id)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold text-center border transition-all ${
                      region === opt.id
                        ? 'bg-brand-blue border-transparent text-white font-extrabold shadow-brand-glow'
                        : 'bg-white border-soft-border text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Travel Experience</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'adventure', label: '⚡ Adventure' },
                  { id: 'wellness', label: '🧘 Wellness' },
                  { id: 'romantic', label: '🌹 Romantic' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setStyle(opt.id)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold text-center border transition-all ${
                      style === opt.id
                        ? 'bg-brand-blue border-transparent text-white font-extrabold shadow-brand-glow'
                        : 'bg-white border-soft-border text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Elite Tier</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'ultra', label: '💎 Ultra Luxury' },
                  { id: 'royal', label: '👑 Royal Suite' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setBudget(opt.id)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold text-center border transition-all ${
                      budget === opt.id
                        ? 'bg-brand-blue border-transparent text-white font-extrabold shadow-brand-glow'
                        : 'bg-white border-soft-border text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-gold w-full py-4 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Consulting Nishtha AI...' : 'Generate Itinerary'}</span>
            </button>
          </div>

          {/* Results Plan Display Panel */}
          <div className="lg:col-span-7 h-full min-h-[460px] flex flex-col">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-8 flex flex-col items-center justify-center text-center flex-grow min-h-[460px]"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full border-2 border-brand-purple/20 border-t-brand-purple animate-spin mx-auto" />
                    <Sparkles className="w-6 h-6 text-brand-purple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-blue mb-2">Analyzing Travel Dynamics</h4>
                  <p className="text-slate-500 text-xs font-medium max-w-xs leading-relaxed">
                    Accessing global luxury inventories, premium aviation schedules, and booking algorithms...
                  </p>
                </motion.div>
              )}

              {!loading && !plan && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card p-8 flex flex-col items-center justify-center text-center flex-grow border-dashed border-soft-border min-h-[460px]"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-purple/5 border border-brand-purple/10 flex items-center justify-center mb-6 text-brand-purple">
                    <Map className="w-8 h-8 text-brand-purple" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-blue mb-2">Configure Your Journey</h4>
                  <p className="text-slate-500 text-xs font-medium max-w-sm leading-relaxed">
                    Select your preferred region, travel style, and luxury tier to compile a tailored, API-ready travel preview immediately.
                  </p>
                </motion.div>
              )}

              {!loading && plan && (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                  className="glass-card p-6 md:p-8 flex-grow flex flex-col justify-between border-brand-purple/20 shadow-luxury-lg min-h-[460px]"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-start border-b border-soft-border pb-4">
                      <div>
                        <span className="text-[10px] text-brand-purple font-bold uppercase tracking-widest block">AI Curated Luxury Trip</span>
                        <h4 className="text-xl font-extrabold text-brand-blue mt-1 leading-snug">{plan.title}</h4>
                        <span className="text-xs text-slate-400 font-semibold">{plan.sub}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] bg-brand-purple/5 text-brand-purple px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-brand-purple/10 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>99.8% Match</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Lodging & Dining */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-soft-border">
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Recommended Lodging</span>
                          <span className="text-xs font-bold text-dark-text block">{plan.hotel}</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-soft-border">
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Elite Gastronomy</span>
                          <span className="text-xs font-bold text-dark-text block">{plan.dining}</span>
                        </div>
                      </div>

                      {/* Day to Day itinerary */}
                      <div className="space-y-3">
                        <span className="text-[10px] uppercase tracking-wider text-brand-purple font-bold block pb-1">Itinerary Flow</span>
                        
                        <div className="space-y-2.5">
                          <div className="flex gap-3">
                            <span className="text-xs font-bold text-brand-purple bg-brand-purple/5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
                            <p className="text-xs text-slate-600"><span className="font-extrabold text-brand-blue">Day 1:</span> {plan.day1}</p>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-xs font-bold text-brand-purple bg-brand-purple/5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
                            <p className="text-xs text-slate-600"><span className="font-extrabold text-brand-blue">Day 2:</span> {plan.day2}</p>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-xs font-bold text-brand-purple bg-brand-purple/5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
                            <p className="text-xs text-slate-600"><span className="font-extrabold text-brand-blue">Day 3:</span> {plan.day3}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-soft-border pt-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-400 font-semibold">
                      *Estimated starting package rate from <strong className="text-brand-blue">$2,190/person</strong>.
                    </span>
                    <button className="btn-gold text-xs font-extrabold uppercase tracking-wider px-6 py-3 w-full sm:w-auto flex items-center justify-center gap-1.5 active:scale-95">
                      <span>Reserve Custom Plan</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
