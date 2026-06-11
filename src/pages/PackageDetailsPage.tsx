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

interface StatCardProps {
  icon: React.ReactNode;
  title: string | number;
  subtitle: string;
}

const StatCard = ({ icon, title, subtitle }: StatCardProps) => {
  return (
    <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl px-6 py-5 min-w-[180px]">
      <div className="flex items-center gap-3 text-white">
        <div className="text-yellow-400">
          {icon}
        </div>

        <div>
          <div className="text-xl font-bold">
            {title}
          </div>

          <div className="text-sm text-white/80">
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

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
        <div className="w-16 h-16 border-4 border-t-yellow-500 border-brand-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-brand-light min-h-screen text-slate-800 relative">

      {/* 1. CINEMATIC HEADER BANNER */}
      <section className="relative min-h-[100vh] lg:min-h-[85vh] overflow-hidden">

        {/* Background */}
        <img
          src={pkg.image}
          alt={pkg.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/60" />

        {/* Top Controls */}
        <div className="absolute top-6 sm:top-8 lg:top-10 left-0 right-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">

            <Link
              to="/packages"
              className="
          bg-white/90
          backdrop-blur-md
          rounded-2xl
          px-4 sm:px-6
          py-3
          shadow-lg
          flex items-center
          gap-2
          text-sm
          font-medium
        "
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`
    w-12 h-12
    sm:w-14 sm:h-14
    rounded-2xl
    backdrop-blur-md
    shadow-lg
    flex
    items-center
    justify-center
    transition-all
    duration-300
    ${isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-slate-700 hover:bg-white'
                }
  `}
            >
              <Heart
                className={`
      w-5 h-5
      transition-all
      duration-300
      ${isLiked ? 'fill-current scale-110' : ''}
    `}
              />
            </button>

          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20">
          <div
            className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        pt-32
        lg:pt-44
        pb-16
      "
          >

            <div className="max-w-4xl">

              {/* Destination Badge */}
              <div
                className="
            inline-flex
            items-center
            gap-2
            bg-white/10
            backdrop-blur-md
            px-4
            py-2
            rounded-full
            mb-6
          "
              >
                <MapPin size={16} />
                <span className="text-sm font-medium">
                  {pkg.destination}, {pkg.country}
                </span>
              </div>

              {/* Heading */}
              <h1
                className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            xl:text-8xl
            font-bold
            leading-[1.05]
            text-white
          "
              >
                {pkg.title}
              </h1>

              {/* Description */}
              <p
                className="
            mt-6
            text-base
            sm:text-lg
            lg:text-xl
            text-white/90
            leading-relaxed
            max-w-3xl
          "
              >
                {details.description}
              </p>

              {/* Stats */}
              <div
                className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            max-w-4xl
          "
              >
                <StatCard
                  icon={<Star />}
                  title={pkg.rating}
                  subtitle="Traveler Reviews"
                />

                <StatCard
                  icon={<Clock />}
                  title={pkg.duration}
                  subtitle="Duration"
                />

                <StatCard
                  icon={<MapPin />}
                  title={pkg.destination}
                  subtitle="Premium Experience"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 2. DETAILS CONTENT GRID */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-2">

            {/* Overview */}
            <div className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100">

              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <MapPin className="text-orange-500" />
                </div>

                <div>
                  <p className="text-slate-500">
                    Destination Overview
                  </p>

                  <h2 className="text-5xl font-bold text-blue-600">
                    About {pkg.title}
                  </h2>
                </div>
              </div>

              <p className="mt-8 text-lg leading-relaxed text-slate-600">
                {details.description}
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-yellow-500">Voyage Curation</h2>
              <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed">
                {details.description}
              </p>

              <div className="grid md:grid-cols-3 gap-5">
                {details.highlights.map((item) => (
                  <div
                    className="bg-[#FAF6EF] rounded-3xl p-8 flex items-center gap-4"
                  >
                    <CheckCircle2 className="text-orange-500" />
                    <span className="font-semibold text-lg">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="space-y-4">
              <div className="bg-white rounded-[30px] p-2 shadow-sm border border-slate-100 flex overflow-x-auto">
                {[
                  { id: 'itinerary', label: 'Itinerary' },
                  { id: 'inclusions', label: 'Inclusions' },
                  { id: 'faqs', label: 'FAQ' },
                  { id: 'enquiry', label: 'Send Enquiry' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
        flex-1 min-w-[150px]
        py-4 px-6
        rounded-[22px]
        text-sm font-semibold
        transition-all duration-300
        ${activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-600 hover:bg-slate-50"
                      }
      `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content: Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  {details.days.map((d) => {
                    const isExpanded = expandedDay === d.day;
                    return (
                      <div
                        key={d.day}
                        className="
    bg-white
    rounded-[32px]
    shadow-sm
    border border-slate-100
    overflow-hidden
  "
                      >
                        <button
                          onClick={() => setExpandedDay(isExpanded ? null : d.day)}
                          className="w-full p-8 text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">

                              <div
                                className="
            w-16 h-16
            rounded-3xl
            bg-orange-500
            text-white
            flex items-center justify-center
            font-bold text-2xl
            shrink-0
          "
                              >
                                {d.day}
                              </div>

                              <div>
                                <p className="text-orange-500 font-semibold text-sm">
                                  Day {d.day}
                                </p>

                                <h3 className="text-2xl font-bold text-blue-600">
                                  {d.title}
                                </h3>
                              </div>
                            </div>

                            <ChevronDown
                              className={`
          w-6 h-6 text-slate-400
          transition-transform duration-300
          ${isExpanded ? "rotate-180" : ""}
        `}
                            />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-8 pb-8">
                                <p className="text-slate-600 text-lg leading-relaxed">
                                  {d.details}
                                </p>
                              </div>
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
                <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Included Section */}
                    <div>
                      <h4 className="text-2xl font-bold text-blue-600 mb-8">
                        Included
                      </h4>

                      <div className="space-y-4">
                        {pkg.includedServices?.map(
                          (service: string, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center gap-4 p-4 rounded-2xl bg-green-50"
                            >
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                <Check className="w-5 h-5 text-green-600" />
                              </div>

                              <span className="text-slate-700 font-medium">
                                Premium {service} accommodations
                              </span>
                            </div>
                          )
                        )}

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-50">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <Check className="w-5 h-5 text-green-600" />
                          </div>

                          <span className="text-slate-700 font-medium">
                            Dedicated destination coordinator desk
                          </span>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-50">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <Check className="w-5 h-5 text-green-600" />
                          </div>

                          <span className="text-slate-700 font-medium">
                            24/7 Travel Assistance
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Excluded Section */}
                    <div>
                      <h4 className="text-2xl font-bold text-red-500 mb-8">
                        Not Included
                      </h4>

                      <div className="space-y-4">

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-50">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <span className="text-red-500 font-bold text-lg">
                              ×
                            </span>
                          </div>

                          <span className="text-slate-700 font-medium">
                            International passport & visa application fees
                          </span>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-50">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <span className="text-red-500 font-bold text-lg">
                              ×
                            </span>
                          </div>

                          <span className="text-slate-700 font-medium">
                            Personal discretionary expenditures
                          </span>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-50">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <span className="text-red-500 font-bold text-lg">
                              ×
                            </span>
                          </div>

                          <span className="text-slate-700 font-medium">
                            Unlisted premium alcohol requests
                          </span>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-50">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <span className="text-red-500 font-bold text-lg">
                              ×
                            </span>
                          </div>

                          <span className="text-slate-700 font-medium">
                            Travel insurance (unless specified)
                          </span>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Tab Content: FAQs */}
              {activeTab === 'faqs' && (
                <div className="space-y-5">
                  {details.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-[28px] p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
                    >
                      <h4 className="text-xl font-bold text-blue-600 mb-4">
                        {faq.question}
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {/* Tab Content: Enquiry Form */}
              {activeTab === 'enquiry' && (
                <form
                  onSubmit={handleSendEnquiry}
                  className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 md:p-10 space-y-8"
                >
                  <div>
                    <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
                      Travel Assistance
                    </span>

                    <h3 className="text-3xl font-bold text-blue-600">
                      Holiday Package Enquiry
                    </h3>

                    <p className="text-slate-500 mt-3 leading-relaxed">
                      Send us your travel preferences and our experts will get back to you
                      with personalized recommendations and quotations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Your Name
                      </label>

                      <input
                        type="text"
                        required
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        required
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Preferred Departure Date
                      </label>

                      <input
                        type="date"
                        value={enquiryDate}
                        onChange={(e) => setEnquiryDate(e.target.value)}
                        className="w-full h-14 px-4 rounded-2xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Travel Requirements
                    </label>

                    <textarea
                      required
                      rows={6}
                      value={enquiryMsg}
                      onChange={(e) => setEnquiryMsg(e.target.value)}
                      placeholder="Tell us about hotel preferences, number of travelers, special requests, additional sightseeing plans, transfers, etc."
                      className="w-full rounded-2xl border border-slate-200 px-4 py-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none resize-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 justify-between items-center border-t border-slate-100 pt-6">

                    <p className="text-sm text-slate-500 max-w-xl">
                      By submitting this enquiry, you agree to be contacted by Nishtha
                      Travel representatives through phone, WhatsApp, or email regarding
                      your travel requirements.
                    </p>

                    <AnimatePresence mode="wait">
                      {enquirySubmitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-3 font-semibold"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Enquiry Submitted</span>
                        </motion.div>
                      ) : (
                        <button
                          type="submit"
                          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all shadow-lg hover:shadow-xl"
                        >
                          <Send size={18} />
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
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[36px] bg-white shadow-xl border border-slate-100">
              {/* Header */}
              <div className="bg-blue-600 text-white p-8">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-4xl font-bold leading-tight mt-5">
                      Book This
                      <br />
                      Journey
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-white/80">
                      Starting From
                    </p>

                    <div className="text-5xl font-bold leading-none mt-2">
                      ₹{pkg.price}
                    </div>

                    <p className="text-sm text-white/80 mt-2">
                      per traveler
                    </p>

                    {pkg.originalPrice && (
                      <p className="text-sm text-white/60 line-through mt-1">
                        ₹{pkg.originalPrice}
                      </p>
                    )}
                  </div>

                </div>
              </div>

              {/* Body */}
              <div className="p-8">

                <div className="space-y-5">

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-slate-700">
                      Luxury Accommodation
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-slate-700">
                      Airport Transfers Included
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-slate-700">
                      Guided Sightseeing
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-slate-700">
                      24/7 Concierge Support
                    </span>
                  </div>

                </div>

                <button
                  onClick={() => setShowBookingModal(true)}
                  className="
          w-full
          mt-8
          bg-orange-500
          hover:bg-orange-600
          text-white
          font-semibold
          py-5
          rounded-2xl
          transition-all
          shadow-lg
        "
                >
                  Reserve Your Spot
                </button>

                {/* Rating Card */}
                <div className="mt-6 bg-slate-50 rounded-3xl p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />
                  </div>

                  <h4 className="text-xl font-bold text-slate-800">
                    {pkg.rating}/5 Traveler Satisfaction
                  </h4>

                  <p className="text-slate-500 text-sm mt-1">
                    Trusted by 10,000+ travelers
                  </p>
                </div>

                {/* Security */}
                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure encrypted booking</span>
                </div>

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
              className="absolute inset-0 bg-black/50"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              className="bg-white border border-[#E5E0D8] p-8 md:p-7 max-w-5xl w-full relative z-10 rounded-none shadow-none"
            >
              {!bookingConfirmed ? (
                <>
                  <div className="flex justify-between items-start pb-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-yellow-500 block">
                        Luxury Reservation
                      </span>

                      <h3 className="text-3xl font-[Playfair_Display] text-brand-blue leading-tight">
                        Reserve Your Journey
                      </h3>

                      <p className="text-sm text-slate-500">
                        Complete your details to confirm this curated experience.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="
      w-10 h-10
      flex items-center justify-center
      text-slate-400
      hover:text-brand-blue
      transition-all
    "
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 mt-6">

                    {/* LEFT COLUMN */}
                    <div className="space-y-6">

                      <div className="bg-blue-500 border border-[#E5E0D8] p-6 rounded-lg">

                        <span className="text-[10px] uppercase tracking-[0.2em] text-white block">
                          Selected Package
                        </span>

                        <h4 className="text-2xl font-[Playfair_Display] text-white mt-2">
                          {pkg.title}
                        </h4>

                        <p className="text-sm text-white/90 mt-2">
                          {pkg.destination} • {pkg.duration}
                        </p>

                        <div className="border-t border-white/20 pt-4 mt-5 space-y-3">

                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">
                              Package Price
                            </span>

                            <span className="font-semibold text-white">
                              ₹{pkg.price}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">
                              Concierge Assistance
                            </span>

                            <span className="font-semibold text-white">
                              Included
                            </span>
                          </div>

                        </div>
                      </div>

                      <div className="bg-brand-light border border-[#E5E0D8] rounded-lg p-6">

                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 block">
                          Total Cost
                        </span>

                        <h3 className="text-4xl font-[Playfair_Display] text-brand-blue mt-2">
                          ₹{pkg.price}
                        </h3>

                        <p className="text-sm text-slate-500 mt-2">
                          Price per traveler including premium support.
                        </p>

                      </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6">

                      <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-yellow-500 block">
                        Traveler Information
                      </label>

                      <input
                        type="text"
                        placeholder="Traveler Name"
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        className="
        w-full
        border
        border-[#E5E0D8]
        bg-white
        px-4
        py-3
        text-sm
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
        bg-white
        px-4
        py-3
        text-sm
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
        bg-white
        px-4
        py-3
        text-sm
        rounded-lg
        focus:border-yellow-500
        focus:outline-none
      "
                      />

                      <div className="grid grid-cols-2 gap-3 pt-4">

                        <button
                          onClick={() => setShowBookingModal(false)}
                          className="
          h-14
          border
          border-[#E5E0D8]
          rounded-lg
          text-slate-600
          font-medium
          hover:bg-brand-light
          transition-all
        "
                        >
                          Cancel
                        </button>

                        <button
                          onClick={handleBookPackage}
                          className="
          h-14
          bg-blue-500
          text-white
          rounded-lg
          font-semibold
          hover:bg-brand-blue
          transition-all
        "
                        >
                          Confirm Package
                        </button>

                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed text-center">
                        Our travel concierge will contact you within 2 hours to finalize your booking.
                      </p>

                    </div>

                  </div>

                  <p className="text-center text-xs text-slate-500 leading-relaxed">
                    Our travel concierge will contact you within 2 hours to finalize your itinerary and booking details.
                  </p>
                </>
              ) : (
                // SUCCESS STATE
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-16 h-16 rounded-none bg-brand-light border border-[#E5E0D8] flex items-center justify-center mx-auto text-yellow-500 animate-pulse">
                    <Check className="w-8 h-8 text-yellow-500 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-Poppins text-brand-blue">Voyage Confirmed</h3>
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
