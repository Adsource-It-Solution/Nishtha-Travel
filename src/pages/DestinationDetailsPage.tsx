import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Heart, ArrowLeft, Sun, CheckCircle, ChevronDown, HelpCircle, Check, X, CloudSun } from 'lucide-react';
import { mockDestinations, type Destination } from '../data/mockData';

export const DestinationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] =
    useState<'itinerary' | 'inclusions' | 'info'>('itinerary');

  const [expandedDay, setExpandedDay] =
    useState<number | null>(1);

  const [expandedInclusion, setExpandedInclusion] =
    useState<number | null>(1);

  const [isLiked, setIsLiked] = useState(false);

  const [showBookingModal, setShowBookingModal] =
    useState(false);

  const [bookingDes, setBookingDes] = useState<Destination | null>(null);
  const [bookingConfirmed, setBookingConfirmed] =
    useState(false);

  const [travelerName, setTravelerName] = useState("");
  const [travelerEmail, setTravelerEmail] = useState("");
  const [travelerPhone, setTravelerPhone] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [travelDate, setTravelDate] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");


  const destination =
    mockDestinations.find((d) => d.id === id) ||
    mockDestinations[0];

  const handleBookDestination = () => {
    setBookingDes(destination);
    setShowBookingModal(true);
  };

  // const closeBookingModal = () => {
  //   if (!bookingConfirmed) {
  //     setShowBookingModal(false);
  //     setBookingDes(null);
  //   }
  // };

  const confirmBooking = () => {
    setBookingConfirmed(true);

    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingDes(null);
      setShowBookingModal(false);
    }, 3000);
  };

  const toggleDay = (day: number) => {
    setExpandedDay(
      expandedDay === day ? null : day
    );
  };

  const toggleInclusion = (index: number) => {
    setExpandedInclusion(
      expandedInclusion === index ? null : index
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 relative overflow-hidden">

      {/* 1. CINEMATIC HEADER BANNER */}
      <div className="relative h-[80vh] overflow-hidden">

        {/* Hero Image */}
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        {/* Back Button */}
        <div className="absolute top-10 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 flex justify-between">
            <Link to="/" className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-2 py-1 mb-2 sm:mb-2 sm:px-5 sm:py-3 rounded-2xl shadow-lg hover:bg-white transition-all">
              <ArrowLeft className="w-4 h-4 text-blue-700" />
              <span className="font-sm sm:font-medium text-slate-700">Back To Explore</span>
            </Link>
            <button onClick={() => setIsLiked(!isLiked)} className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all">
              <Heart className={`w-6 h-6 transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-500'}`} />
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 pb-16">
            {/* Country Badge */}

            {/* Destination Name */}
            <h1 className="mt-5 text-5xl md:text-7xl font-bold font-[Poppins] text-white leading-tight">
              {destination.name}
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-300/30">
              <MapPin className="w-4 h-4 text-orange-300" />
              <span className="text-orange-100 text-sm font-semibold">{destination.country}</span>
            </div>

            {/* Description */}
            <p className="mt-5 max-w-3xl text-white/80 text-lg leading-8">
              {destination.description}
            </p>

            {/* Stats Cards */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div
                className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10" >
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-semibold">{destination.rating}
                  </span>
                </div>
                <p className="text-white/70 text-sm mt-1">{destination.reviewsCount} Reviews
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">
                    {destination.weather.temp}
                  </span>

                </div>

                <p className="
            text-white/70
            text-sm
            mt-1
          ">
                  {destination.weather.condition}
                </p>

              </div>
              <div
                className="
          bg-white/10
          backdrop-blur-md
          px-5
          py-4
          rounded-2xl
          border
          border-white/10
          "
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <span className="text-white font-semibold">Destination</span>
                </div>
                <p className="text-white/70 text-sm mt-1">
                  Premium Experience
                </p>
              </div>
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
              <div className="bg-white rounded-[32px] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">
                      Destination Overview
                    </p>
                    <h2 className="text-3xl font-bold text-blue-700 font-[Poppins]">
                      About {destination.name}
                    </h2>
                  </div>
                </div>
                <p className="text-slate-600 leading-8 text-base">
                  {destination.description}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

                {destination.highlights.map((hl, i) => (
                  <div
                    key={i}
                    className="
      bg-[#FAF6EF]
      rounded-3xl
      p-5
      flex
      items-center
      gap-3
      shadow-sm
      hover:shadow-md
      transition-all
      "
                  >
                    <CheckCircle
                      className="
        w-5
        h-5
        text-orange-500
        shrink-0
      "
                    />

                    <span className="
      font-medium
      text-slate-800
      ">
                      {hl}
                    </span>

                  </div>
                ))}

              </div>
            </div>
            {/* Content Tabs Navigation */}
            <div className="space-y-4">
              <div className="bg-white rounded-[28px] p-2 shadow-sm mb-8 flex gap-2 overflow-x-auto">

                {[
                  { id: 'itinerary', label: 'Itinerary' },
                  { id: 'inclusions', label: 'Inclusion' },
                  { id: 'info', label: 'FAQ' }
                ].map((tab) => (

                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
        flex-1
        min-w-[140px]
        h-12
        rounded-2xl
        font-semibold
        text-sm
        transition-all

        ${activeTab === tab.id
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'}
      `}
                  >
                    {tab.label}
                  </button>

                ))}
              </div>

              {/* Tab: Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-5">
                  {destination.itinerary.map((item) => {
                    const isExpanded = expandedDay === item.day;
                    return (
                      <div
                        key={item.day}
                        className="bg-white rounded-[28px] shadow-sm overflow-hidden">
                        <button
                          onClick={() => toggleDay(item.day)}
                          className="w-full flex justify-between items-center p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white font-bold flex items-center justify-center">
                              {item.day}
                            </div>
                            <div className="text-left">
                              <p className="text-xs text-orange-500 font-semibold">
                                Day {item.day}
                              </p>
                              <h4 className="text-lg font-bold text-blue-700 font-[Poppins]">
                                {item.title}
                              </h4>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-all ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 text-slate-600 leading-8">
                                {item.details}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab: Inclusion */}
              {activeTab === 'inclusions' && (
                <div className="space-y-5">
                  {destination.inclusions.map((item, index) => {
                    const isExpanded = expandedInclusion === index;

                    return (
                      <div
                        key={index}
                        className="
            bg-white
            rounded-[28px]
            shadow-sm
            overflow-hidden
            hover:shadow-md
            transition-all
          "
                      >
                        <button
                          onClick={() => toggleInclusion(index)}
                          className="w-full flex justify-between items-center p-6"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className="
    w-12
    h-12
    rounded-2xl
    bg-gradient-to-br
    from-orange-400
    to-orange-500
    text-white
    flex
    items-center
    justify-center
  "
                            >
                              <Check className="w-6 h-6" />
                            </div>

                            <div className="text-left">
                              <p className="text-xs text-orange-500 font-semibold uppercase tracking-wider">
                                Included
                              </p>

                              <h4
                                className="
                    text-lg
                    font-bold
                    text-blue-700
                    font-[Poppins]
                  "
                              >
                                {item.title}
                              </h4>
                            </div>
                          </div>

                          <ChevronDown
                            className={`
                w-5
                h-5
                text-slate-400
                transition-all
                duration-300
                ${isExpanded ? 'rotate-180' : ''}
              `}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div
                                className="
                    px-6
                    pb-6
                    text-slate-600
                    leading-8
                  "
                              >
                                {item.description}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
              {/* Tab: FAQs */}
              {activeTab === 'info' && (
                <div className="space-y-5">
                  {destination.faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-[28px] p-6 shadow-sm">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                          <HelpCircle className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-blue-700 font-[Poppins]">{faq.question}</h4>
                          <p className="mt-3 text-slate-600 leading-7">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Sticky Checkout/Booking Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100">
              {/* Price Header */}
              <div className="bg-blue-700 p-8 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
                      Premium Package
                    </span>

                    <h3 className="mt-4 text-3xl font-bold font-[Poppins]">
                      Book This Journey
                    </h3>

                  </div>

                  <div className="text-right">

                    <p className="text-blue-200 text-sm">
                      Starting From
                    </p>
                    <h2 className="text-4xl font-bold font-[Poppins]">
                      ₹{destination.id === 'dest-1' ? '2,499' : '1,850'}
                    </h2>
                    <span className="text-blue-100 text-sm">
                      per traveler
                    </span>
                  </div>
                </div>
              </div>
              {/* Features */}
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <span className="text-slate-700">
                      Luxury Accommodation
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <span className="text-slate-700">
                      Airport Transfers Included
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <span className="text-slate-700">
                      Guided Sightseeing
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <span className="text-slate-700">
                      24/7 Concierge Support
                    </span>
                  </div>
                </div>
                {/* CTA */}
                <button
                  onClick={handleBookDestination}
                  className="
    mt-8
    w-full
    flex
    items-center
    justify-center
    h-14
    rounded-2xl
    bg-orange-500
    hover:bg-orange-600
    text-white
    font-bold
    transition-all
    hover:-translate-y-1
    shadow-lg
  "
                >
                  Reserve Your Spot
                </button>
                {/* Trust */}
                <div className="mt-6 p-4 bg-slate-50 rounded-2xl text-center">
                  <div className="flex justify-center mb-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    4.9/5 Traveler Satisfaction
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Trusted by 10,000+ travelers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!bookingConfirmed) setShowBookingModal(false);
              }}
              className="absolute inset-0 bg-[#09131F]/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="
relative z-10
bg-white
w-full
max-w-7xl
h-[95vh]
rounded-3xl
shadow-2xl
grid
grid-cols-1
"
            >
              {!bookingConfirmed ? (
                <>
                  <div className="grid lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-full">
                      <img
                        src={bookingDes?.image}
                        alt={bookingDes?.name}
                        className="w-full h-[95vh] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09131F] via-[#09131F]/50 to-transparent" />
                      <div className="absolute top-5 right-5">
                        <button
                          onClick={() => setShowBookingModal(false)}
                          className="bg-white/90 p-2 rounded-full"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                        <span className="text-xs uppercase tracking-[0.25em] text-yellow-300">
                          Destination Booking
                        </span>

                        <h2 className="text-5xl font-serif mt-2">
                          {bookingDes?.name}
                        </h2>

                        <p className="text-white/80 mt-2">
                          {bookingDes?.country}
                        </p>

                        <div className="flex items-center gap-2 mt-4">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span>{bookingDes?.rating}</span>
                          <span className="text-white/70">
                            ({bookingDes?.reviewsCount} Reviews)
                          </span>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          {bookingDes?.highlights.slice(0, 3).map((item, index) => (
                            <div
                              key={index}
                              className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="h-full overflow-y-auto p-6 lg:p-6">

                      <div>
                        <span className="text-xs uppercase tracking-[0.2em] text-brand-purple font-bold">
                          Reservation Request
                        </span>

                        <h3 className="text-4xl font-serif text-brand-blue">
                          Plan Your Journey
                        </h3>

                        <p className="text-slate-500">
                          Submit your details and our travel concierge
                          will prepare a personalized itinerary.
                        </p>
                      </div>

                      <div className="space-y-4">

                        <input
                          type="text"
                          placeholder="Full Name"
                          value={travelerName}
                          onChange={(e) => setTravelerName(e.target.value)}
                          className="w-full border border-[#E5E0D8] px-5 py-4 rounded-xl"
                        />

                        <input
                          type="email"
                          placeholder="Email Address"
                          value={travelerEmail}
                          onChange={(e) => setTravelerEmail(e.target.value)}
                          className="w-full border border-[#E5E0D8] px-5 py-4 rounded-xl"
                        />

                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={travelerPhone}
                          onChange={(e) => setTravelerPhone(e.target.value)}
                          className="w-full border border-[#E5E0D8] px-5 py-4 rounded-xl"
                        />

                        <div className="grid md:grid-cols-2 gap-4">

                          <select
                            value={travelers}
                            onChange={(e) => setTravelers(e.target.value)}
                            className="border border-[#E5E0D8] px-5 py-4 rounded-xl"
                          >
                            <option value="1">1 Traveler</option>
                            <option value="2">2 Travelers</option>
                            <option value="3">3 Travelers</option>
                            <option value="4">4 Travelers</option>
                            <option value="5">5+ Travelers</option>
                          </select>

                          <input
                            type="date"
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                            className="border border-[#E5E0D8] px-5 py-4 rounded-xl"
                          />
                        </div>

                        <textarea
                          rows={2}
                          value={specialRequest}
                          onChange={(e) => setSpecialRequest(e.target.value)}
                          placeholder="Special requirements, honeymoon plans, family trip, hotel preferences..."
                          className="w-full border border-[#E5E0D8] px-5 py-4 rounded-xl resize-none"
                        />

                        <div className="bg-brand-light border border-[#E5E0D8] p-5 rounded-xl">
                          <div className="flex items-center gap-3">
                            <CloudSun className="w-5 h-5 text-brand-purple" />
                            <span>
                              Current Weather: {bookingDes?.weather.temp}
                              {" • "}
                              {bookingDes?.weather.condition}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={confirmBooking}
                          className="
      w-full
      h-14
      rounded-xl
      bg-orange-500
      hover:bg-orange-600
      text-white
      font-bold
      transition-all
    "
                        >
                          Submit Reservation Request
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 text-center"
                >
                  <div className="w-20 h-20 mx-auto bg-brand-light border border-[#E5E0D8] flex items-center justify-center">
                    <Check className="w-10 h-10 text-brand-purple" />
                  </div>

                  <h3 className="text-3xl font-serif text-brand-blue mt-6">
                    Journey Reserved
                  </h3>

                  <p className="text-slate-500 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
                    Your destination inquiry has been successfully submitted.
                    Our luxury travel concierge will contact you shortly with
                    a tailored itinerary and exclusive pricing options.
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
