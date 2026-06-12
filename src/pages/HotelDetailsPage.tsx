import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Heart, ArrowLeft, CheckCircle2, ShieldCheck, Check, Sparkles, Camera } from 'lucide-react';
import { mockHotels, type Hotel } from '../data/mockData';


export const HotelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [bookingConfirmed,] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryDate, setEnquiryDate] = useState('');

  const hotel = mockHotels.find((h) => h.id === id) || mockHotels[0];

  return (
    <div className="bg-brand-light min-h-screen text-slate-800 relative">
      <div className="relative h-[95vh] w-full overflow-hidden">
        {/* Background Image */}
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Top Controls */}
        <div className="absolute top-10 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <Link
              to="/hotels"
              className="
          flex items-center gap-2
          bg-white/90
          backdrop-blur-md
          px-5 py-3
          rounded-2xl
          shadow-lg
          hover:bg-white
          transition-all
        "
            >
              <ArrowLeft className="w-4 h-4 text-blue-700" />
              <span className="font-medium text-slate-700">
                Back To Hotels
              </span>
            </Link>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="
          w-14 h-14
          rounded-2xl
          bg-white/90
          backdrop-blur-md
          shadow-lg
          flex items-center justify-center
          hover:bg-white
          transition-all
        "
            >
              <Heart
                className={`
            w-6 h-6 transition-all
            ${isLiked
                    ? 'fill-red-500 text-red-500'
                    : 'text-slate-500'}
          `}
              />
            </button>

          </div>
        </div>

        {/* Main Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 pb-16">

            {/* Location Badge */}
            <div className="
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-full
        bg-orange-500/20
        backdrop-blur-md
        border
        border-orange-300/30
      ">
              <MapPin className="w-4 h-4 text-orange-300" />
              <span className="text-orange-100 text-sm font-semibold">
                {hotel.location}
              </span>
            </div>

            {/* Hotel Name */}
            <h1 className="
        mt-5
        text-5xl
        md:text-7xl
        lg:text-8xl
        font-bold
        font-[Poppins]
        text-white
        leading-tight
        max-w-5xl
      ">
              {hotel.name}
            </h1>

            {/* Description */}
            <p
              className="
    mt-5
    max-w-3xl
    text-white/80
    text-lg
    leading-8
  "
            >
              {hotel.description}
            </p>

            {/* Stats Cards */}
            <div className="flex flex-wrap gap-4 mt-8">

              <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-semibold">
                    {hotel.rating}
                  </span>
                </div>

                <p className="text-white/70 text-sm mt-1">
                  {hotel.reviewsCount} Reviews
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">
                    ₹{hotel.pricePerNight}
                  </span>
                </div>

                <p className="text-white/70 text-sm mt-1">
                  Starting Per Night
                </p>
              </div>

              {hotel.originalPricePerNight && (
                <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-white line-through">
                      ₹{hotel.originalPricePerNight}
                    </span>
                  </div>

                  <p className="text-white/70 text-sm mt-1">
                    Original Rate
                  </p>
                </div>
              )}

              {hotel.featured && (
                <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-400" />
                    <span className="text-white font-semibold">
                      Featured
                    </span>
                  </div>

                  <p className="text-white/70 text-sm mt-1">
                    Premium Property
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
      {/* 2. DETAILS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-start">
          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-10">

            {/* HOTEL OVERVIEW */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm">

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Luxury Resort Profile
                  </p>

                  <h2 className="text-3xl font-bold text-blue-700 font-[Poppins]">
                    About This Property
                  </h2>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-blue-700 font-[Poppins] mb-4">
                {hotel.name}
              </h3>

              <p className="text-slate-600 leading-8 text-base">
                Located in {hotel.location}, {hotel.name} offers a premium hospitality
                experience with exceptional comfort, elegant accommodations, and
                thoughtfully curated amenities. Guests enjoy highly rated service,
                world-class facilities, and a relaxing atmosphere designed for both
                leisure and business travelers.
              </p>

              <p className="text-slate-600 leading-8 text-base mt-4">
                Rated {hotel.rating} stars by {hotel.reviewsCount} verified guests,
                this property features modern conveniences and luxury touches that
                create a memorable stay. Whether you're planning a short getaway or
                an extended vacation, the hotel provides everything needed for a
                comfortable and enjoyable experience.
              </p>

            </div>


            {/* Gallery  */}
            <div className='border-b bprder-slate-500 pb-4'>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-orange-500" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Visual Experience
                  </p>

                  <h2 className="text-3xl font-bold text-blue-700 font-[Poppins]">
                    Property Gallery
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">

                {hotel.images.map((image, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-[24px]"
                  >
                    <img
                      src={image}
                      alt={`${hotel.name} ${idx + 1}`}
                      className="
            w-full
            h-64
            object-cover
            hover:scale-110
            transition-all
            duration-700
          "
                    />
                  </div>
                ))}

              </div>
            </div>
            {/* AMENITIES */}
            <div>

              <div className="flex items-center gap-3 mb-6">

                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                  <Check className="w-5 h-5 text-orange-500" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Premium Facilities
                  </p>

                  <h2 className="text-3xl font-bold text-blue-700 font-[Poppins]">
                    Resort Amenities
                  </h2>
                </div>

              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                {hotel.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
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
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />

                    <span className="font-medium text-slate-800">
                      {amenity}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>
          {/* Sticky Checkout Sidebar */}
          <div className="lg:col-span-5 lg:top-28">
            <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100">

              {/* Header */}
              <div className="bg-blue-700 p-8 text-white">

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
                  Luxury Stay
                </span>

                <h3 className="mt-4 text-3xl font-bold font-[Poppins]">
                  Reserve Suite
                </h3>

                <p className="mt-2 text-blue-100 text-sm leading-relaxed">
                  Secure your preferred accommodation with exclusive concierge benefits.
                </p>

                <div className="flex items-center gap-3">

                  <span className="text-3xl font-bold text-blue-700">
                    ₹{hotel.pricePerNight}
                  </span>

                  {hotel.originalPricePerNight && (
                    <span className="text-slate-400 line-through">
                      ₹{hotel.originalPricePerNight}
                    </span>
                  )}

                </div>

              </div>

              {/* Content */}
              <div className="p-8">

                {/* Hotel Details */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">

                  <p className="text-xs uppercase tracking-[0.15em] text-slate-500 font-semibold">
                    Selected Hotel
                  </p>

                  <h4 className="mt-2 text-xl font-bold text-blue-700 font-[Poppins]">
                    {hotel.name}
                  </h4>

                  <p className="mt-2 text-slate-500 text-sm">
                    {hotel.location}
                  </p>

                  {hotel.featured && (
                    <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
                      Featured Property
                    </span>
                  )}

                </div>

                {/* Amenities */}
                <div className="mt-6">

                  <h5 className="text-sm font-semibold text-slate-700 mb-4">
                    Property Amenities
                  </h5>

                  <div className="space-y-3">

                    {hotel.amenities.slice(0, 6).map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-orange-500" />

                        <span className="text-slate-700">
                          {amenity}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>

                {/* Pricing */}
                <div className="mt-8 bg-brand-light rounded-2xl p-6 border border-[#E5E0D8]">

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">
                      Hotel Rate
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹{hotel.pricePerNight}
                    </span>
                  </div>

                  {hotel.originalPricePerNight && (
                    <div className="flex justify-between items-center mt-3">

                      <span className="text-slate-600">
                        Original Price
                      </span>

                      <span className="line-through text-slate-400">
                        ₹{hotel.originalPricePerNight}
                      </span>

                    </div>
                  )}

                  <div className="flex justify-between items-center mt-3">

                    <span className="text-slate-600">
                      Guest Reviews
                    </span>

                    <span className="font-semibold text-slate-800">
                      {hotel.reviewsCount}
                    </span>

                  </div>

                  <div className="border-t border-[#E5E0D8] mt-4 pt-4 flex justify-between items-center">

                    <span className="font-semibold text-slate-700">
                      Total Per Night
                    </span>

                    <div className="text-right">

                      <span className="text-4xl font-bold text-blue-700 font-[Poppins]">
                        ₹{hotel.pricePerNight}
                      </span>

                      <p className="text-xs text-slate-500">
                        per night
                      </p>

                    </div>

                  </div>

                </div>

                {/* Rating Card */}
                <div className="mt-6 bg-white border border-slate-100 rounded-2xl p-5">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-slate-500">
                        Guest Rating
                      </p>

                      <h4 className="text-2xl font-bold text-blue-700 mt-1">
                        {hotel.rating}
                      </h4>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-slate-500">
                        Reviews
                      </p>

                      <h4 className="text-xl font-semibold text-slate-700 mt-1">
                        {hotel.reviewsCount}
                      </h4>
                    </div>

                  </div>

                </div>

                {/* CTA */}
                <AnimatePresence mode="wait">

                  {bookingConfirmed ? (

                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="
          mt-8
          bg-green-50
          border
          border-green-100
          rounded-2xl
          p-6
          text-center
        "
                    >
                      <CheckCircle2 className="w-12 h-12 mx-auto text-green-500" />

                      <h4 className="mt-4 text-lg font-bold text-green-700">
                        Reservation Confirmed
                      </h4>

                      <p className="mt-2 text-sm text-slate-600">
                        Your hotel reservation has been successfully submitted.
                      </p>

                    </motion.div>

                  ) : (

                    <button
                      onClick={() => {
                        setSelectedHotel(hotel);
                        setShowBookingModal(true);
                      }}
                      className="
          mt-8
          w-full
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
                      Reserve Your Stay
                    </button>

                  )}

                </AnimatePresence>

                {/* Trust */}
                <div className="mt-6 p-4 bg-slate-50 rounded-2xl text-center">

                  <div className="flex justify-center mb-2">
                    <ShieldCheck className="w-5 h-5 text-blue-700" />
                  </div>

                  <p className="text-sm font-semibold text-slate-700">
                    Secure Reservation System
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Encrypted booking process with instant confirmation.
                  </p>

                </div>

              </div>

            </div>

          </div>


        </div>
        {/* ROOM OPTIONS */}
        <div className='mb-6'>

          <div className="flex items-center gap-3 mb-6">

            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Star className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Luxury Accommodation
              </p>

              <h2 className="text-3xl font-bold text-blue-700 font-[Poppins]">
                Available Suites
              </h2>
            </div>

          </div>

          <div className="space-y-5">

            {/* Hotel Information Card */}
            <div
              className="
      bg-white
      rounded-[28px]
      shadow-sm
      hover:shadow-lg
      transition-all
      p-6
      border border-slate-200
    "
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">

                <div>

                  <div className="flex items-center gap-3">

                    <div
                      className="
              w-12 h-12
              rounded-2xl
              bg-orange-500
              text-white
              flex
              items-center
              justify-center
            "
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </div>

                    <div>

                      <h4 className="text-xl font-bold text-blue-700 font-[Poppins]">
                        {hotel.name}
                      </h4>

                      <p className="text-slate-500 mt-1">
                        {hotel.location}
                      </p>

                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">

                    {hotel.featured && (
                      <span
                        className="
                inline-flex
                px-3
                py-1
                rounded-full
                bg-orange-50
                text-orange-500
                text-xs
                font-semibold
              "
                      >
                        Featured Property
                      </span>
                    )}

                    {hotel.discountTag && (
                      <span
                        className="
                inline-flex
                px-3
                py-1
                rounded-full
                bg-green-50
                text-green-600
                text-xs
                font-semibold
              "
                      >
                        {hotel.discountTag}
                      </span>
                    )}

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-slate-500 text-sm">
                    Starting From
                  </p>

                  <h3 className="text-4xl font-bold text-blue-700 font-[Poppins]">
                    ₹{hotel.pricePerNight}
                  </h3>

                  {hotel.originalPricePerNight && (
                    <p className="text-slate-400 line-through mt-1">
                      ₹{hotel.originalPricePerNight}
                    </p>
                  )}

                  <p className="text-slate-500 text-sm mt-1">
                    per night
                  </p>

                </div>

              </div>
            </div>

            {/* Rating Card */}
            <div
              className="
      bg-white
      rounded-[28px]
      shadow-sm
      hover:shadow-lg
      transition-all
      p-6
      border border-slate-200
    "
            >
              <div className="flex items-center justify-between">

                <div>
                  <h4 className="text-xl font-bold text-blue-700 font-[Poppins]">
                    Guest Reviews
                  </h4>

                  <p className="text-slate-500 mt-2">
                    Trusted by travelers worldwide.
                  </p>
                </div>

                <div className="text-right">

                  <div className="flex items-center gap-2 justify-end">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />

                    <span className="text-3xl font-bold text-blue-700">
                      {hotel.rating}
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm mt-1">
                    {hotel.reviewsCount} Reviews
                  </p>

                </div>

              </div>
            </div>

          </div>
        </div>
        {/* INCLUSIONS */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">
                Premium Benefits
              </p>
              <h2 className="text-3xl font-bold text-blue-700 font-[Poppins]">
                Exclusive Inclusions
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotel.amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="
        bg-white
        rounded-[28px]
        p-6
        shadow-sm
        hover:shadow-lg
        transition-all
        border
        border-slate-100
      "
              >
                <div
                  className="
          w-14 h-14
          rounded-2xl
          bg-orange-50
          flex
          items-center
          justify-center
          mb-4
        "
                >
                  <Check className="w-6 h-6 text-orange-500" />
                </div>

                <h3 className="font-bold text-lg text-blue-700">
                  {amenity}
                </h3>

                <p className="mt-2 text-slate-600 text-sm leading-7">
                  Premium access to {amenity.toLowerCase()} throughout your stay.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showBookingModal && selectedHotel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!bookingConfirmed) {
                  setShowBookingModal(false);
                }
              }}
              className="absolute inset-0 bg-black/50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              className="
                            bg-white
                            border
                            border-[#E5E0D8]
                            p-8
                            md:p-7
                            max-w-5xl
                            w-full
                            relative
                            z-10
                          "
            >
              {!bookingConfirmed ? (
                <>
                  {/* Header */}
                  <div className="flex justify-between items-start pb-2">

                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-yellow-500 block">
                        Luxury Hotel Reservation
                      </span>

                      <h3 className="text-3xl font-[Playfair_Display] text-brand-blue leading-tight">
                        Reserve Your Stay
                      </h3>

                      <p className="text-sm text-slate-500">
                        Complete your details to confirm your luxury accommodation.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-brand-blue"
                    >
                      ✕
                    </button>

                  </div>

                  {/* Layout */}
                  <div className="grid md:grid-cols-2 gap-8 mt-6">

                    {/* LEFT */}
                    <div className="space-y-6">

                      <div className="overflow-hidden rounded-lg">

                        <img
                          src={selectedHotel.images[0]}
                          alt={selectedHotel.name}
                          className="w-full h-64 object-cover"
                        />

                      </div>

                      <div className="bg-blue-500 p-6 rounded-lg">

                        <span className="text-[10px] uppercase tracking-[0.2em] text-white block">
                          Selected Hotel
                        </span>

                        <h4 className="text-2xl font-[Playfair_Display] text-white mt-2">
                          {selectedHotel.name}
                        </h4>

                        <p className="text-sm text-white/90 mt-2">
                          {selectedHotel.location}
                        </p>

                        <div className="border-t border-white/20 pt-4 mt-5 space-y-3">

                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">
                              Hotel Rating
                            </span>

                            <span className="font-semibold text-white">
                              ⭐ {selectedHotel.rating}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">
                              Reviews
                            </span>

                            <span className="font-semibold text-white">
                              {selectedHotel.reviewsCount}
                            </span>
                          </div>

                        </div>

                      </div>

                    </div>

                    <div className="space-y-6">

                      <div className="bg-brand-light border border-[#E5E0D8] rounded-lg p-6">

                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 block">
                          Starting Price
                        </span>

                        <h3 className="text-4xl font-[Playfair_Display] text-brand-blue mt-2">
                          ₹{selectedHotel.pricePerNight}
                        </h3>

                        <p className="text-sm text-slate-500 mt-2">
                          Per night including premium hotel support.
                        </p>

                      </div>

                      <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-yellow-500 block">
                        Guest Information
                      </label>

                      <input
                        type="text"
                        placeholder="Guest Name"
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        className="
                                      w-full
                                      border
                                      border-[#E5E0D8]
                                      px-4
                                      py-3
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
                                      px-4
                                      py-3
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
                                      px-4
                                      py-3
                                      rounded-lg
                                      focus:border-yellow-500
                                      focus:outline-none
                                    "
                      />

                      <div className="grid grid-cols-2 gap-3">

                        <button
                          onClick={() => setShowBookingModal(false)}
                          className="
                                        h-14
                                        border
                                        border-[#E5E0D8]
                                        rounded-lg
                                        text-slate-600
                                      "
                        >
                          Cancel
                        </button>

                        <button
                          className="
                                        h-14
                                        bg-blue-500
                                        text-white
                                        rounded-lg
                                        font-semibold
                                      "
                        >
                          Confirm Stay
                        </button>

                      </div>

                      <p className="text-xs text-slate-500 text-center">
                        Our hospitality concierge will contact you within 2 hours to
                        finalize your reservation.
                      </p>

                    </div>

                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <h3 className="text-3xl font-[Playfair_Display] text-brand-blue">
                    Reservation Confirmed
                  </h3>

                  <p className="text-slate-500 mt-4">
                    Your luxury hotel stay request has been received successfully.
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
