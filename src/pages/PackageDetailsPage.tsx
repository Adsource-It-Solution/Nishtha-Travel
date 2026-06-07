import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Heart, ArrowLeft, CheckCircle2, ChevronDown, Clock, ShieldCheck, Check, Send } from 'lucide-react';
import { mockPackages } from '../data/mockData';

interface ItineraryDay {
  day: number;
  title: string;
  details: string;
}

interface PackageDetails {
  description: string;
  highlights: string[];
  days: ItineraryDay[];
  faqs: { question: string; answer: string }[];
}

export const PackageDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Package details states
  const [pkg, setPkg] = useState<any>(null);
  const [details, setDetails] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Tabs / UI states
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'faqs' | 'enquiry'>('itinerary');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingResponse, setBookingResponse] = useState<any>(null);

  // Enquiry Form State
  const [enquiryName, setEnquiryName] = useState('Alexander Mercer');
  const [enquiryEmail, setEnquiryEmail] = useState('alex.mercer@nishtha-concierge.com');
  const [enquiryPhone, setEnquiryPhone] = useState('+91 99999 88888');
  const [enquiryDate, setEnquiryDate] = useState('2026-06-15');
  const [enquiryMsg, setEnquiryMsg] = useState('');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // 1. Find package base properties from mockData as immediate placeholder
    const basePkg = mockPackages.find((p) => p.id === id);
    
    // 2. Fetch full details from the backend
    setLoading(true);
    fetch(`${apiUrl}/api/packages/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Package details not found in database');
        return res.json();
      })
      .then(data => {
        setPkg(data);
        setDetails(data.itinerary);
        setLoading(false);
      })
      .catch(err => {
        console.warn('Fallback to local mock package details:', err);
        // Fallback locally
        if (basePkg) {
          setPkg(basePkg);
          // Load a default mock itinerary
          setDetails({
            description: `Embark on a curated voyage to ${basePkg.destination}. Experience hand-selected accommodations, exclusive local coordinates, and seamless transitions under the guidance of Nishtha Travel Concierge.`,
            highlights: basePkg.features || ["Curated Accommodation", "Luxury Ground Transportation", "Bespoke Activities & Guides", "24/7 Concierge Protection"],
            days: [
              { day: 1, title: "Arrival & VIP Meet & Greet", details: `Touchdown in ${basePkg.destination}. Private airport transfer to your luxury suite. Sunset cocktails and overview briefing.` },
              { day: 2, title: "Guided Exploration & Local Discovery", details: "Embark on a customized tour of key historical landmarks, led by an expert local guide." },
              { day: 3, title: "Curated Activity & Leisure Evening", details: "Spend the day enjoying curated recreational excursions or relax in luxury resort spas." },
              { day: 4, title: "Departure", details: "Private chauffeur transfer to the international terminal for your onward journey." }
            ],
            faqs: [
              { question: "Is this itinerary customizable?", answer: "Yes, every detail of this package can be customized by our concierge desk. Get in touch to tailor dates, transfers, or suites." }
            ]
          });
        }
        setLoading(false);
      });
  }, [id, apiUrl]);

  const handleBookPackage = () => {
    if (!pkg) return;

    const payload = {
      packageId: pkg.id,
      packageTitle: pkg.title,
      destination: pkg.destination,
      duration: pkg.duration,
      price: pkg.price,
      passengerName: enquiryName,
      passengerEmail: enquiryEmail,
      passengerPhone: enquiryPhone,
      travelDate: enquiryDate
    };

    fetch(`${apiUrl}/api/bookings/package`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        setBookingResponse(data);
        setBookingConfirmed(true);
        setTimeout(() => {
          setBookingConfirmed(false);
          setShowBookingModal(false);
          navigate('/dashboard');
        }, 4000);
      })
      .catch(err => {
        console.error('Error booking package:', err);
        alert('There was an error booking your package. Please try again.');
      });
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryEmail || !enquiryMsg) {
      alert('Please fill out all required enquiry fields');
      return;
    }

    const payload = {
      name: enquiryName,
      email: enquiryEmail,
      phone: enquiryPhone,
      travelDate: enquiryDate,
      message: enquiryMsg,
      packageId: pkg?.id,
      packageName: pkg?.title
    };

    fetch(`${apiUrl}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response error');
        return res.json();
      })
      .then(() => {
        setEnquirySubmitted(true);
        setEnquiryMsg('');
        setTimeout(() => setEnquirySubmitted(false), 5000);
      })
      .catch(err => {
        console.error('Error sending enquiry:', err);
        alert('Could not submit enquiry at this moment. Please try again.');
      });
  };

  if (loading || !pkg || !details) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-brand-purple border-brand-blue rounded-full animate-spin" />
      </div>
    );
  }

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
              to="/packages"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E0D8] hover:bg-brand-light text-xs font-bold uppercase tracking-widest transition-all text-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-brand-purple" />
              <span>Back Explore</span>
            </Link>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 bg-white border border-[#E5E0D8] flex items-center justify-center text-slate-500 hover:text-red-500 transition-all"
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
              <span className="flex items-center gap-1 font-bold bg-brand-purple/10 text-brand-purple px-3 py-1 border border-brand-purple/20">
                <Star className="w-4 h-4 fill-brand-purple text-brand-purple" />
                {pkg.rating} Rating
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-[#E5E0D8] px-3 py-1 text-slate-605 font-semibold">
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
                  <div key={idx} className="flex items-center gap-3 bg-white border border-[#E5E0D8] p-4">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wide">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="space-y-6">
              <div className="flex border-b border-[#E5E0D8] gap-8 overflow-x-auto whitespace-nowrap scrollbar-none pb-px">
                {[
                  { id: 'itinerary', label: 'Itinerary' },
                  { id: 'inclusions', label: 'Inclusions' },
                  { id: 'faqs', label: 'FAQs' },
                  { id: 'enquiry', label: 'Send Enquiry' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative pb-3 text-xs font-bold uppercase tracking-[0.15em] transition-all shrink-0 ${
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
                      <div key={d.day} className="bg-white border border-[#E5E0D8] overflow-hidden">
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
                              <p className="p-5 pt-0 border-t border-[#E5E0D8] text-slate-650 text-xs sm:text-sm font-light leading-relaxed">
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
                    {pkg.includedServices && pkg.includedServices.map((service: string, idx: number) => (
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
                    <div key={idx} className="bg-white border border-[#E5E0D8] p-6">
                      <h4 className="font-serif text-brand-blue text-sm sm:text-base font-semibold">{faq.question}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed mt-2">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab Content: Enquiry Form */}
              {activeTab === 'enquiry' && (
                <form onSubmit={handleSendEnquiry} className="bg-white border border-[#E5E0D8] p-6 sm:p-8 space-y-4">
                  <h4 className="font-serif text-brand-blue text-base font-bold border-b border-slate-100 pb-2">Holiday Package Enquiry</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light mb-4">
                    Send us your preferred details. Our concierge agent will reply with custom quotes and upgrades within 2 hours.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        required
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        className="glass-input px-4 py-2.5 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        className="glass-input px-4 py-2.5 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                      <input
                        type="text"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="glass-input px-4 py-2.5 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Preferred Date of Departure</label>
                      <input
                        type="date"
                        value={enquiryDate}
                        onChange={(e) => setEnquiryDate(e.target.value)}
                        className="glass-input px-4 py-2.5 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Your message & Custom Requirements</label>
                    <textarea
                      required
                      rows={4}
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      placeholder="Specify customized hotel star requests, private transfers requests, extra day plans, etc."
                      className="glass-input px-4 py-2.5 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-light max-w-[60%]">
                      By submitting, you agree to allow Nishtha Travel representatives to coordinate via phone call/email.
                    </span>

                    <AnimatePresence mode="wait">
                      {enquirySubmitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Enquiry Submitted</span>
                        </motion.div>
                      ) : (
                        <button
                          type="submit"
                          className="btn-gold flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-bold"
                        >
                          <Send size={14} />
                          <span>Send Enquiry</span>
                        </button>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
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
                    <span className="text-2xl font-serif text-brand-blue">₹{pkg.price}</span>
                    <span className="text-[10px] text-slate-400 font-sans font-bold">INR</span>
                  </div>
                  {pkg.originalPrice && (
                    <span className="text-xs text-slate-400 line-through font-semibold block">₹{pkg.originalPrice}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="btn-gold w-full py-4 text-[10px] uppercase tracking-widest font-bold rounded-none shadow-none text-center block"
              >
                Confirm Curated Voyage
              </button>

              {/* Security Assurance */}
              <div className="text-[9px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-2 border-t border-[#E5E0D8]">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-purple" />
                <span>Encrypted using AES-256 protocols.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Booking Modal Overlay */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!bookingConfirmed) setShowBookingModal(false);
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
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
                      onClick={() => setShowBookingModal(false)}
                      className="text-slate-400 hover:text-slate-655 p-1"
                    >
                      ×
                    </button>
                  </div>

                  {/* Summary Box */}
                  <div className="p-5 bg-brand-light border border-[#E5E0D8] space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Selected Itinerary</span>
                      <h4 className="font-serif text-brand-blue text-lg leading-tight mt-1">{pkg.title}</h4>
                      <span className="text-xs text-slate-500 mt-1 block">{pkg.destination} • {pkg.duration}</span>
                    </div>

                    <div className="border-t border-[#E5E0D8] pt-3 mt-3 flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-light">Rate per person</span>
                      <span className="font-bold text-slate-800">₹{pkg.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-1">
                      <span className="text-slate-500 font-light uppercase tracking-wider">Total Package Cost</span>
                      <span className="text-xl font-serif text-brand-blue">₹{pkg.price}</span>
                    </div>
                  </div>

                  {/* Personal details inputs for quick checkout */}
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Traveler Checkout Info</label>
                    <input
                      type="text"
                      placeholder="Traveler Name"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="glass-input px-3 py-2 w-full text-xs font-semibold focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Mobile Number"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="glass-input px-3 py-2 w-full text-xs font-semibold focus:outline-none"
                      />
                      <input
                        type="date"
                        placeholder="Travel Date"
                        value={enquiryDate}
                        onChange={(e) => setEnquiryDate(e.target.value)}
                        className="glass-input px-3 py-2 w-full text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="btn-navy rounded-none"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBookPackage}
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
                    Your luxury package booking is confirmed. Reservation code: <strong>{bookingResponse?.confirmationCode}</strong>. We will reach out within 2 hours to coordinate flight timings and bespoke tour selections from our concierge desk.
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
