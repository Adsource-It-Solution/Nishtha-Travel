import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Heart, ArrowLeft, CheckCircle2, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { mockHotels } from '../data/mockData';

// Custom descriptions & room configurations for each elite resort
const hotelSpecs: Record<string, {
  tagline: string;
  description: string;
  rooms: { name: string; size: string; price: number; view: string }[];
  inclusions: string[];
}> = {
  'hotel-1': {
    tagline: "Soneva Fushi — Kunfunadhoo Island, Maldives",
    description: "Nestled in the Baa Atoll UNESCO Biosphere Reserve, Soneva Fushi is an elite island sanctuary where nature meets sustainable luxury. Featuring expansive private overwater villas, award-winning reef access, and dedicated butler coordination.",
    rooms: [
      { name: "Overwater Villa Suite with Slide", size: "240 sqm", price: 1200, view: "Ocean Horizon View" },
      { name: "Beachfront Reserve Villa (2-Bedroom)", size: "410 sqm", price: 1850, view: "Private Lagoon View" },
      { name: "Sunset Ocean Pavilion Suite", size: "180 sqm", price: 950, view: "Sunset Reef View" }
    ],
    inclusions: ["Round-trip Seaplane Coordination", "Daily Gourmet Champagne Breakfast", "Complimentary 60-min Ayurvedic Spa Therapy", "Unlimited Non-motorized Water Sports"]
  },
  'hotel-2': {
    tagline: "Le Sirenuse — Positano, Amalfi Coast, Italy",
    description: "An iconic luxury destination floating above the sparkling blue waters of the Positano bay. Le Sirenuse offers traditional terracotta tiling, Michelin-starred outdoor dining, custom vintage Riva speedboat charters, and historical garden courtyards.",
    rooms: [
      { name: "Executive Sea View Terrace Suite", size: "75 sqm", price: 1450, view: "Positano Bay Cliffside View" },
      { name: "Classic Italian Garden Suite", size: "60 sqm", price: 980, view: "Private Citrus Garden View" },
      { name: "Sirenuse Prestige Balcony Room", size: "55 sqm", price: 1200, view: "Mediterranean Sunset View" }
    ],
    inclusions: ["Private Airport Chauffeur from Naples", "Complimentary Riva Boat Sunset Excursion", "Welcome Bottle of vintage Spumante", "Daily buffet breakfast on the terrace"]
  },
  'hotel-3': {
    tagline: "Aman Tokyo — Otemachi, Tokyo, Japan",
    description: "A sanctuary at the top of the Tokyo skyline. Aman Tokyo harmonizes traditional Japanese wood and washi paper aesthetics with sky-high infinity pools, pristine Zen lounges, traditional tea ceremonies, and unparalleled access to the imperial gardens.",
    rooms: [
      { name: "Imperial Suite (Skyline View)", size: "150 sqm", price: 1100, view: "Tokyo Tower & Garden View" },
      { name: "Premier Aman Suite", size: "120 sqm", price: 920, view: "Mount Fuji Sky View" },
      { name: "Deluxe King Room", size: "80 sqm", price: 750, view: "Metropolitan Tokyo View" }
    ],
    inclusions: ["Imperial tea ceremony class credentials", "Access to 33rd Floor Wellness Lounge & Spa", "Daily seasonal fruit basket delivery", "Late 4:00 PM check-out privileges"]
  }
};

export const HotelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const hotel = mockHotels.find((h) => h.id === id) || mockHotels[0];
  const specs = hotelSpecs[hotel.id] || {
    tagline: `${hotel.name} — Luxury Sanctuary Collection`,
    description: `Indulge in a premium stay at ${hotel.name}. Positioned beautifully in ${hotel.location}, this curated property features outstanding customer service, elite amenities, and absolute comfort under Nishtha Concierge registry.`,
    rooms: [
      { name: "Deluxe Executive King Suite", size: "85 sqm", price: hotel.pricePerNight, view: "Panoramic Curation View" },
      { name: "Premium Garden Pavilion Room", size: "65 sqm", price: Math.round(hotel.pricePerNight * 0.8), view: "Boutique Garden View" }
    ],
    inclusions: ["Daily Gourmet Breakfast Buffet", "Early Check-in Privileges", "24/7 dedicated butler support line"]
  };

  const activeRoom = specs.rooms[selectedRoomIdx] || specs.rooms[0];

  const handleBookHotel = () => {
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
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/30 via-transparent to-brand-light" />
 
        {/* Back navigation & Actions */}
        <div className="absolute top-28 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link
              to="/hotels"
              className="flex items-center gap-2 px-4 py-2 rounded-none bg-white border border-[#E5E0D8] hover:bg-brand-light text-xs font-bold uppercase tracking-widest transition-all shadow-none text-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-brand-purple" />
              <span>Back Hotels</span>
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
              <span>{hotel.location}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-medium font-serif text-brand-blue tracking-tight leading-tight max-w-3xl">
              {hotel.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm pt-2">
              <span className="flex items-center gap-1 font-bold bg-brand-purple/10 text-brand-purple px-3 py-1 rounded-none border border-brand-purple/20">
                <Star className="w-4 h-4 fill-brand-purple text-brand-purple" />
                {hotel.rating} Rating ({hotel.reviewsCount} reviews)
              </span>
              {hotel.discountTag && (
                <span className="flex items-center gap-1 bg-white border border-[#E5E0D8] px-3 py-1 rounded-none text-brand-purple font-semibold text-xs tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{hotel.discountTag}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. DETAILS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-brand-purple">Sanctuary Profile</h2>
              <h3 className="text-lg sm:text-xl font-serif text-brand-blue">{specs.tagline}</h3>
              <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed">
                {specs.description}
              </p>

              {/* Amenities Grid */}
              <div className="space-y-3 pt-6 border-t border-[#E5E0D8]">
                <h4 className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Resort Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-light text-slate-700 bg-white border border-[#E5E0D8] px-4 py-2 rounded-none"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Suite Config Options */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-brand-purple">Available Suites & Penthouses</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {specs.rooms.map((room, idx) => {
                  const isSelected = selectedRoomIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedRoomIdx(idx)}
                      className={`cursor-pointer p-6 bg-white border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-none ${
                        isSelected ? 'border-brand-purple bg-brand-light/20' : 'border-[#E5E0D8] hover:border-brand-purple/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <h4 className="font-serif text-brand-blue text-base font-semibold">{room.name}</h4>
                        <p className="text-slate-500 text-xs font-light">{room.size} • {room.view}</p>
                      </div>
                      <div className="flex items-center gap-4 self-end sm:self-auto">
                        <span className="text-lg font-serif text-brand-blue font-semibold">${room.price} <span className="text-[9px] text-slate-400 font-sans tracking-normal">/nt</span></span>
                        <div className={`w-4 h-4 rounded-none border flex items-center justify-center ${isSelected ? 'border-brand-purple bg-brand-purple' : 'border-[#E5E0D8]'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 bg-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-brand-purple">Exclusive Concierge Inclusions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specs.inclusions.map((inc, idx) => (
                  <div key={idx} className="flex gap-3 items-center bg-white border border-[#E5E0D8] p-4 rounded-none">
                    <Check className="w-4 h-4 text-brand-purple shrink-0" />
                    <span className="text-xs font-light text-slate-700">{inc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Checkout Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="glass-card p-6 md:p-8 space-y-6 border border-[#E5E0D8] bg-white rounded-none shadow-none">
              <div>
                <span className="text-[9px] text-brand-purple font-bold uppercase tracking-[0.15em] block">Suite Reservation</span>
                <h4 className="font-serif text-brand-blue text-lg leading-tight mt-1">Nishtha Private Rates</h4>
                <p className="text-[10px] text-slate-500 mt-1 font-light leading-relaxed">
                  Club member rates synchronized with instant resort confirmations.
                </p>
              </div>

              {/* Price Details */}
              <div className="border-y border-[#E5E0D8] py-4 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-600 font-light">
                  <span>Selected Cabin/Suite</span>
                  <span className="font-semibold text-slate-800 text-[10px] uppercase truncate max-w-[150px]">{activeRoom.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 font-light">
                  <span>Privilege Spa Vouchers</span>
                  <span className="font-semibold text-slate-800">Included</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 font-light">
                  <span>Gurgaon Lounge Concierge Fee</span>
                  <span className="text-emerald-700 font-semibold tracking-wider">COMPLIMENTARY</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Price Per Night</span>
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-serif text-brand-blue">${activeRoom.price}</span>
                    <span className="text-[10px] text-slate-400 font-sans font-bold">USD</span>
                  </div>
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
                    <h5 className="font-serif text-brand-blue text-sm font-semibold">Suite Confirmed</h5>
                    <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                      Your booking has been completed. Check details in your Nishtha dashboard lounge.
                    </p>
                  </motion.div>
                ) : (
                  <button
                    onClick={handleBookHotel}
                    className="btn-gold w-full py-4 text-[10px] uppercase tracking-widest font-bold rounded-none shadow-none"
                  >
                    Confirm Suite Reservation
                  </button>
                )}
              </AnimatePresence>

              {/* Security Assurance */}
              <div className="text-[9px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-2 border-t border-[#E5E0D8]">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-purple" />
                <span>Encrypted booking network.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
