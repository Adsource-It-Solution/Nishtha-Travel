import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Heart, ArrowLeft, CheckCircle2, ChevronDown, Clock, ShieldCheck, Check } from 'lucide-react';
import { mockPackages } from '../data/mockData';

// Detailed custom itineraries for each package to make mock details fully rich
const packageItineraries: Record<string, {
  description: string;
  highlights: string[];
  days: { day: number; title: string; details: string }[];
  faqs: { question: string; answer: string }[];
}> = {
  'pkg-1': {
    description: "Indulge in a sensory retreat where the azure ocean meets unmatched luxury. Maldives Overwater Sanctuary packages provide exclusive access to private seaplanes, water villas with slide amenities, personal butler service, and guided reef snorkeling excursions.",
    highlights: ["Private Seaplane Transfers", "Unlimited Overwater Spa Sessions", "Undersea Fine Dining Reservation", "Guided Marine Snorkeling", "Personal 24/7 Island Host"],
    days: [
      { day: 1, title: "Private Seaplane Arrival & Sunset Dinner", details: "Arrive at Malé Airport and board a chartered seaplane to the resort. Enjoy a sunset candlelit dinner on the beach." },
      { day: 2, title: "Reef Excursion & Marine Biologist Tour", details: "Snorkel in the crystalline house reef accompanied by a dedicated marine biologist, identifying sea turtles and coral restoration fields." },
      { day: 3, title: "Undersea Gastronomy & Sunset Yoga", details: "Dine five meters below the surface at our award-winning undersea restaurant. Followed by a relaxing private yoga session at dusk." },
      { day: 4, title: "Sandbank Picnic & Lagoon Spa", details: "Sail on a luxury yacht to a private, sandbank islet for a curated gourmet picnic. Enjoy a signature spa treatment in the afternoon." },
      { day: 5, title: "Leisure Morning & Departure", details: "Enjoy breakfast in your private pool. Board the return seaplane to Malé for your international flight home." }
    ],
    faqs: [
      { question: "Is the international flight included?", answer: "This package covers domestic transfers (seaplane). International flights can be booked separately or added via our flight desk." },
      { question: "What is the policy for butler service?", answer: "A personal butler is assigned to your water villa upon arrival and is reachable 24/7 via mobile messenger." }
    ]
  },
  'pkg-2': {
    description: "Discover cliffside splendor and Italian romance. This Amalfi Coast package presents curated stays at historic Positano hotels, private Riva speedboat excursions to Capri, private vineyard tastings, and chauffeured transport.",
    highlights: ["Historic Cliffside Accommodation", "Private Riva Speedboat to Capri", "Michelin-Star Dining Access", "Private Lemon Grove Cooking Class", "Chauffeured Executive Mercedes Transfers"],
    days: [
      { day: 1, title: "Naples to Positano Private Escort", details: "Your private chauffeur welcomes you at Naples Airport. Check-in to your cliffside suite with panoramic Mediterranean views." },
      { day: 2, title: "Capri & Blue Grotto Riva Cruise", details: "Board a private Riva yacht. Cruise past the Faraglioni rocks, explore the Blue Grotto, and enjoy lunch on Capri island." },
      { day: 3, title: "Lemon Grove Culinary Masterclass", details: "Join a local chef in a historic terraced lemon grove. Prepare traditional handmade pasta and sample local limoncello." },
      { day: 4, title: "Ravello Gardens & Concert Evening", details: "Visit the serene Villa Cimbrone gardens in Ravello. Attend an exclusive sunset classical concert overlooking the coast." },
      { day: 5, title: "Path of the Gods Guided Trek", details: "Hike the legendary Path of the Gods trail with a private guide, capturing the most breathtaking panoramic photography." },
      { day: 6, title: "Amalfi Vineyards Wine Tasting", details: "Spend the day touring boutique vineyards situated on volcanic slopes. Taste vintage wines paired with cured cheeses." },
      { day: 7, title: "Farewell & Departure Transfer", details: "Chauffeured transit back to Naples Airport for your departure flight." }
    ],
    faqs: [
      { question: "Can we extend our stay to Rome?", answer: "Absolutely. Our concierge team specializes in tailored extensions and can seamlessly coordinate hotel and high-speed rail transfers." },
      { question: "Is yacht fuel included in the price?", answer: "Yes, all private yacht charters include fuel, crew, insurance, and complimentary snacks." }
    ]
  },
  'pkg-3': {
    description: "Step into a timeless painting. Kyoto Autumn Serenity showcases traditional Ryokan stays, authentic Kaiseki banquets, guided Zen garden strolls, and private tea ceremony credentials.",
    highlights: ["Traditional Premium Ryokan Lodging", "Authentic Multi-Course Kaiseki Dinners", "First-Class Shinkansen Bullet Train", "Private Kyoto Temple Tours", "Traditional Geisha Tea Ceremony Access"],
    days: [
      { day: 1, title: "Kyoto Arrival & Ryokan Welcoming", details: "Arrive via bullet train. Check-in to a luxury Ryokan. Savor a multi-course Kaiseki dinner served in your room." },
      { day: 2, title: "Golden Pavilion & Bamboo Grove Guided Stroll", details: "Explore Kinkaku-ji (Golden Pavilion) and wander the towering bamboo pathways of Arashiyama with a private local historian." },
      { day: 3, title: "Zen Garden Meditation & Tea Ceremony", details: "Participate in a private tea ceremony in a historic wooden teahouse, followed by guided meditation at Ryoan-ji." },
      { day: 4, title: "Fushimi Inari Shrine & Gion Evening walk", details: "Walk under the thousands of vermilion torii gates at Fushimi Inari. Walk through historic Gion with a culture specialist." },
      { day: 5, title: "Uji Matcha Field Daytrip", details: "Travel to Uji, the cradle of Japanese green tea. Tour organic tea fields and learn traditional matcha grinding techniques." },
      { day: 6, title: "Departure", details: "Transfer to Kyoto Station for your departure or onward travel to Tokyo." }
    ],
    faqs: [
      { question: "Are shoes permitted in the Ryokan?", answer: "No, guests must remove outdoor footwear at the entry hall. Indoor slippers are provided, and tatami mats are walked on in socks." }
    ]
  }
};

export const PackageDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'faqs'>('itinerary');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [isLiked, setIsLiked] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const pkg = mockPackages.find((p) => p.id === id) || mockPackages[0];
  const details = packageItineraries[pkg.id] || {
    description: `Embark on a curated voyage to ${pkg.destination}. Experience hand-selected accommodations, exclusive local coordinates, and seamless transitions under the guidance of Nishtha Travel Concierge.`,
    highlights: ["Curated Accommodation", "Luxury Ground Transportation", "Bespoke Activities & Guides", "24/7 Concierge Protection"],
    days: [
      { day: 1, title: "Arrival & VIP Meet & Greet", details: `Touchdown in ${pkg.destination}. Private airport transfer to your luxury suite. Sunset cocktails and overview briefing.` },
      { day: 2, title: "Guided Exploration & Local Discovery", details: "Embark on a customized tour of key historical landmarks, led by an expert local guide." },
      { day: 3, title: "Curated Activity & Leisure Evening", details: "Spend the day enjoying curated recreational excursions or relax in luxury resort spas." },
      { day: 4, title: "Departure", details: "Private chauffeur transfer to the international terminal for your onward journey." }
    ],
    faqs: [
      { question: "Is this itinerary customizable?", answer: "Yes, every detail of this package can be customized by our concierge desk. Get in touch to tailor dates, transfers, or suites." }
    ]
  };

  const handleBookPackage = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
    }, 4000);
  };

  return (
    <div className="bg-brand-light min-h-screen text-slate-800 relative">
      
      {/* 1. CINEMATIC HEADER BANNER */}
      <div className="relative h-[60vh] w-full overflow-hidden border-b border-[#E5E0D8]">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/30 via-transparent to-brand-light" />
 
        {/* Back navigation & Actions */}
        <div className="absolute top-28 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-none bg-white border border-[#E5E0D8] hover:bg-brand-light text-xs font-bold uppercase tracking-widest transition-all shadow-none text-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-brand-purple" />
              <span>Back Explore</span>
            </Link>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 rounded-none bg-white border border-[#E5E0D8] flex items-center justify-center text-slate-500 hover:text-red-500 transition-all shadow-none"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500 scale-105' : ''}`} />
            </button>
          </div>
        </div>

        {/* Destination Metadata Title */}
        <div className="absolute bottom-10 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-3">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-brand-purple font-bold font-serif text-xs sm:text-sm uppercase tracking-[0.2em]">
              <MapPin className="w-4 h-4" />
              <span>{pkg.destination}, {pkg.country}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-medium font-serif text-brand-blue tracking-tight leading-tight max-w-3xl">
              {pkg.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm pt-2">
              <span className="flex items-center gap-1 font-bold bg-brand-purple/10 text-brand-purple px-3 py-1 rounded-none border border-brand-purple/20">
                <Star className="w-4 h-4 fill-brand-purple text-brand-purple" />
                {pkg.rating} Rating
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-[#E5E0D8] px-3 py-1 rounded-none text-slate-600 shadow-none font-semibold">
                <Clock className="w-4 h-4 text-brand-purple" />
                <span>{pkg.duration}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DETAILS CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-brand-purple">Voyage Curation</h2>
              <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed">
                {details.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {details.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white border border-[#E5E0D8] p-4 rounded-none">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wide">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="space-y-6">
              <div className="flex border-b border-[#E5E0D8] gap-8">
                {[
                  { id: 'itinerary', label: 'Itinerary' },
                  { id: 'inclusions', label: 'Inclusions' },
                  { id: 'faqs', label: 'FAQs' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative pb-3 text-xs font-bold uppercase tracking-[0.15em] transition-all ${
                      activeTab === tab.id ? 'text-brand-purple font-bold' : 'text-slate-500 hover:text-brand-purple'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-purple"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content: Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  {details.days.map((d) => {
                    const isExpanded = expandedDay === d.day;
                    return (
                      <div key={d.day} className="bg-white border border-[#E5E0D8] rounded-none overflow-hidden">
                        <button
                          onClick={() => setExpandedDay(isExpanded ? null : d.day)}
                          className="w-full flex items-center justify-between p-5 text-left font-serif text-brand-blue"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-bold font-sans uppercase tracking-[0.15em] text-brand-purple bg-brand-light px-2.5 py-1 border border-[#E5E0D8]">
                              Day {d.day}
                            </span>
                            <span className="font-semibold text-sm sm:text-base">{d.title}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="p-5 pt-0 border-t border-[#E5E0D8] text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                                {d.details}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab Content: Inclusions */}
              {activeTab === 'inclusions' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-[#E5E0D8] p-8">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-brand-blue uppercase tracking-widest border-b border-[#E5E0D8] pb-2">Included Privileges</h4>
                    {pkg.includedServices.map((service, idx) => (
                      <div key={idx} className="flex gap-2 items-center text-xs text-slate-600 font-light">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Premium {service} accommodations</span>
                      </div>
                    ))}
                    <div className="flex gap-2 items-center text-xs text-slate-600 font-light">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Dedicated destination coordinator desk</span>
                    </div>
                  </div>

                  <div className="space-y-3 mt-6 sm:mt-0">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#E5E0D8] pb-2">Excluded Parameters</h4>
                    <div className="flex gap-2 items-center text-xs text-slate-400 font-light">
                      <span className="text-red-500 font-bold">×</span>
                      <span>International passport & visa application fees</span>
                    </div>
                    <div className="flex gap-2 items-center text-xs text-slate-400 font-light">
                      <span className="text-red-500 font-bold">×</span>
                      <span>Personal discretionary expenditures</span>
                    </div>
                    <div className="flex gap-2 items-center text-xs text-slate-400 font-light">
                      <span className="text-red-500 font-bold">×</span>
                      <span>Unlisted premium alcohol requests</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content: FAQs */}
              {activeTab === 'faqs' && (
                <div className="space-y-4">
                  {details.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white border border-[#E5E0D8] p-6 rounded-none">
                      <h4 className="font-serif text-brand-blue text-sm sm:text-base font-semibold">{faq.question}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed mt-2">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Sticky Checkout Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="glass-card p-6 md:p-8 space-y-6 border border-[#E5E0D8] bg-white rounded-none shadow-none">
              <div>
                <span className="text-[9px] text-brand-purple font-bold uppercase tracking-[0.15em] block">Itinerary Curation</span>
                <h4 className="font-serif text-brand-blue text-lg leading-tight mt-1">Nishtha Member Rate</h4>
                <p className="text-[10px] text-slate-500 mt-1 font-light leading-relaxed">
                  Select coordinates, customize transfers, and synchronize with your club dashboard.
                </p>
              </div>

              {/* Price Details */}
              <div className="border-y border-[#E5E0D8] py-4 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-600 font-light">
                  <span>Elite Cabin Flight Transfer</span>
                  <span className="font-semibold text-slate-800">Included</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 font-light">
                  <span>Luxury Villa Bookings</span>
                  <span className="font-semibold text-slate-800">Included</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 font-light">
                  <span>Gurgaon Lounge Concierge Fee</span>
                  <span className="text-emerald-700 font-semibold tracking-wider">WAIVED</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Estimated Cost</span>
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-serif text-brand-blue">${pkg.price}</span>
                    <span className="text-[10px] text-slate-400 font-sans font-bold">USD</span>
                  </div>
                  {pkg.originalPrice && (
                    <span className="text-xs text-slate-400 line-through font-semibold block">${pkg.originalPrice}</span>
                  )}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {bookingConfirmed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-5 bg-brand-light border border-[#E5E0D8] text-center space-y-3"
                  >
                    <CheckCircle2 className="w-8 h-8 text-brand-purple mx-auto animate-pulse" />
                    <h5 className="font-serif text-brand-blue text-sm font-semibold">Voyage Booked</h5>
                    <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                      Your parameters have been logged. We've synchronized this request with your Nishtha Concierge Dashboard.
                    </p>
                  </motion.div>
                ) : (
                  <button
                    onClick={handleBookPackage}
                    className="btn-gold w-full py-4 text-[10px] uppercase tracking-widest font-bold rounded-none shadow-none"
                  >
                    Confirm Curated Voyage
                  </button>
                )}
              </AnimatePresence>

              {/* Security Assurance */}
              <div className="text-[9px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-2 border-t border-[#E5E0D8]">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-purple" />
                <span>Encrypted using AES-256 protocols.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
