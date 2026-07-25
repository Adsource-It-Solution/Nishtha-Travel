import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { CheckCircle2, Shield, Calendar, Clock, MapPin, Send, Star, User, Briefcase } from 'lucide-react';
import { mockCabs } from '../data/mockData';

interface Cab {
  id: string;
  name: string;
  type: string;
  category: string;
  image: string;
  pricePerKm: number;
  basePrice: number;
  capacity: number;
  luggage: number;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
}

export const CabDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cab, setCab] = useState<Cab | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking Form State
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('2026-06-15');
  const [time, setTime] = useState('12:00');
  const [tripType, setTripType] = useState<'airport' | 'outstation' | 'local'>('airport');
  const [passengerName, setPassengerName] = useState('Alexander Mercer');
  const [passengerPhone, setPassengerPhone] = useState('+91 99999 88888');
  const [passengerEmail, setPassengerEmail] = useState('alex.mercer@nishtha-concierge.com');
  const [notes, setNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingResponse, setBookingResponse] = useState<any>(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${apiUrl}/api/cabs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Cab not found");
        return res.json();
      })
      .then((data) => {
        const cabObj = data.success ? data.data : data;
        setCab(cabObj);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(
          "API cab not found. Using mock cab data.",
          err
        );

        const mockCab = mockCabs.find(
          (cab) => cab.id === id
        );

        if (mockCab) {
          setCab(mockCab);
        }

        setLoading(false);
      });
  }, [id, apiUrl]);

  const handleBookCab = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickup || !dropoff || !passengerName || !passengerPhone) {
      alert('Please fill out all required booking fields');
      return;
    }

    const bookingPayload = {
      bookingType: 'Cab',
      itemId: cab?.id || id,
      bookingDetails: {
        cabName: cab?.name,
        pickup,
        dropoff,
        date,
        time,
        tripType,
        passengerName,
        passengerPhone,
        passengerEmail,
        notes,
        pricePerKm: cab?.pricePerKm,
        basePrice: cab?.basePrice
      },
      totalAmount: cab?.basePrice || 1200,
      startDate: new Date(`${date}T${time}`),
      endDate: new Date(`${date}T${time}`)
    };

    fetch(`${apiUrl}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {})
      },
      body: JSON.stringify(bookingPayload)
    })
      .then(res => res.json())
      .then(data => {
        const booking = data.success ? data.data : data;
        setBookingResponse({
          ...booking,
          confirmationCode: booking.bookingReference || 'NTB-CONFIRMED'
        });
        setBookingConfirmed(true);
        setTimeout(() => {
          setBookingConfirmed(false);
          navigate('/dashboard');
        }, 4000);
      })
      .catch(err => {
        console.error('Error submitting cab booking:', err);
        alert('There was an error booking your cab. Please try again.');
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-brand-purple border-brand-blue rounded-full animate-spin" />
      </div>
    );
  }

  if (!cab) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold font-serif text-slate-800">Cab Option Not Found</h2>
        <Link to="/cabs" className="mt-4 btn-navy">Back to Cabs Fleet</Link>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-slate-50 text-slate-900 relative font-[Roboto]">
      <Navbar />

      {/* Cinematic Header Banner */}
      <div className="relative h-[75vh] overflow-hidden">
        <img
          src={cab.image}
          alt={cab.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 pb-16">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-md text-brand-blue text-sm font-semibold">
              {cab.type.charAt(0).toUpperCase() + cab.type.slice(1)}
            </span>

            <h1
              className=" mt-4 text-5xl md:text-7xl font-bold text-white font-[Poppins]"
            >
              {cab.name}
            </h1>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white/90 backdrop-blur px-5 py-3 rounded-2xl flex flex-row gap-2 items-center justify-center">
                <Star className='text-yellow-500 text-[16px]' /> <span>
                  {cab.rating} Rating</span>
              </div>

              <div className="bg-white/90 backdrop-blur px-5 py-3 rounded-2xl flex flex-row gap-2 items-center justify-center">
                <User className='text-brand-blue text-[16px]' /> {cab.capacity} Passengers
              </div>

              <div className="bg-white/90 backdrop-blur px-5 py-3 rounded-2xl flex flex-row gap-2 items-center justify-center">
                <Briefcase className='text-emerald-500 text-[16px]' /> {cab.luggage} Bags
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Details */}
          <div className="lg:col-span-7 space-y-12">

            {/* Description */}
            <div className="space-y-4">
              <h2 className=" text-3xl font-bold text-brand-blue font-[Poppins]">
                Vehicle Overview</h2>
              <p className="mt-4 text-slate-600 leading-8 text-lg">
                {cab.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6">
                {cab.features.map((feature, idx) => (
                  <div key={idx} className="bg-orange-50 rounded-2xl p-5 flex items-center gap-4 shadow-md hover:-translate-y-1 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold font-[Poppins] text-slate-800">
                      {feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel safety standards */}
            <div className="bg-blue-700 rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <Shield className="w-48 h-48" />
              </div>
              <h4 className="text-3xl font-bold font-[Poppins]">Executive Safety Protocols</h4>
              <p className="text-slate-300 text-xs leading-relaxed font-light">
                Our luxury cab program incorporates live vehicle coordinates reporting, active SOS alarm desk integrations, and automatic flight schedule delays check-in. Rest assured, your transfer is monitored continuously.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8 font-[Poppins]">

                <div className="bg-white/10 p-4 rounded-2xl">
                  Live Tracking
                </div>

                <div className="bg-white/10 p-4 rounded-2xl">
                  SOS Support
                </div>

                <div className="bg-white/10 p-4 rounded-2xl">
                  Flight Monitoring
                </div>

              </div>
            </div>
            <div
              className="bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100"
            >
              <div className="space-y-6">

                {/* Premium Badge */}
                <div className="flex items-center justify-between">

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100">
                    {/* <Sparkles className="w-4 h-4 text-orange-500" /> */}

                    <span className="text-xs font-semibold text-orange-600">
                      Premium Transfer
                    </span>
                  </div>

                  <div className="px-3 py-2 rounded-xl bg-yellow-50 border border-yellow-200">
                    <span className="text-xs font-semibold text-yellow-700">
                      24/7 Support
                    </span>
                  </div>

                </div>

                {/* Heading */}
                <div>

                  <h2 className="text-3xl font-bold text-brand-blue font-[Poppins] leading-tight">
                    Book Your Ride
                  </h2>

                  <p className="mt-3 text-slate-600 text-sm leading-7 font-[Roboto]">
                    Reserve your chauffeur-driven transfer with
                    real-time trip monitoring, verified drivers,
                    airport assistance and premium travel support.
                  </p>

                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-3">

                  <div className="bg-slate-50 rounded-2xl p-3 text-center">
                    <p className="text-lg font-bold text-blue-700">
                      ₹{cab.basePrice}
                    </p>

                    <p className="text-xs text-slate-500">
                      Base Fare
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-3 text-center">
                    <p className="text-lg font-bold text-orange-500">
                      {cab.capacity}
                    </p>

                    <p className="text-xs text-slate-500">
                      Seats
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-3 text-center">
                    <p className="text-lg font-bold text-yellow-500">
                      {cab.rating}
                    </p>

                    <p className="text-xs text-slate-500">
                      Rating
                    </p>
                  </div>

                </div>

                {/* Trust Bar */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100">

                  <Shield className="w-5 h-5 text-blue-700 shrink-0" />

                  <p className="text-xs text-blue-700 font-medium">
                    Licensed chauffeurs, live GPS tracking,
                    airport monitoring and secure booking.
                  </p>

                </div>

              </div>
            </div>
          </div>

          {/* Right Booking Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="glass-card p-6 md:p-8 space-y-6 border border-[#E5E0D8] bg-white rounded-2xl shadow-luxury">

              {/* Heading */}
              <div>
                <h2 className="font-[Poppins] text-brand-blue text-2xl font-bold leading-tight mt-1">Request Private For Cabs</h2>
                <p className="font-[Poppins] text-[10px] text-slate-500 mt-1 font-light leading-relaxed">
                  Fill in your travel coordinates. Our desk will assign your cabs and send vehicle credentials.
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleBookCab} className="space-y-6">

                {/* Trip Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3 font-[Poppins]">
                    Select Trip Type
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    {(['airport', 'outstation', 'local'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTripType(type)}
                        className={`h-14 rounded-2xl text-sm font-semibold transition-all duration-300 font-[Poppins]
          ${tripType === type
                            ? 'bg-yellow-500 text-white shadow-lg scale-[1.02]'
                            : 'bg-slate-100 text-slate-600 hover:bg-orange-50'
                          }`}
                      >
                        {type === 'airport'
                          ? 'Airport'
                          : type === 'outstation'
                            ? 'Outstation'
                            : 'Local'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pickup */}
                <div>
                  <label className="block text-sm font-medium font-[Poppins] text-slate-700 mb-2">
                    Pickup Location
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-700" />

                    <input
                      type="text"
                      required
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="Airport, Hotel or Address"
                      className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Dropoff */}
                <div>
                  <label className="block text-sm font-medium font-[Poppins] text-slate-700 mb-2">
                    Destination
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-700" />

                    <input
                      type="text"
                      required
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      placeholder="Enter destination"
                      className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Date Time */}
                <div className="grid md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium font-[Poppins]s text-slate-700 mb-2">
                      Travel Date
                    </label>

                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-700" />

                      <input
                        type="date"
                        value={date}
                        required
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium font-[Poppins] text-slate-700 mb-2">
                      Pickup Time
                    </label>

                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-700" />

                      <input
                        type="time"
                        value={time}
                        required
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none"
                      />
                    </div>
                  </div>

                </div>

                {/* Contact Information */}
                <div className="bg-slate-50 rounded-3xl px-5 border border-slate-200">

                  <h3 className="font-[Poppins] text-lg font-semibold font-[Poppins] text-blue-700 mb-4">
                    Passenger Information
                  </h3>

                  <div className="space-y-4">

                    <input
                      type="text"
                      value={passengerName}
                      required
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full h-14 rounded-2xl border border-slate-200 px-4 text-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none"
                    />

                    <div className="grid md:grid-cols-2 gap-4">

                      <input
                        type="text"
                        value={passengerPhone}
                        required
                        onChange={(e) => setPassengerPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="h-14 rounded-2xl border border-slate-200 px-4 text-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none"
                      />

                      <input
                        type="email"
                        value={passengerEmail}
                        required
                        onChange={(e) => setPassengerEmail(e.target.value)}
                        placeholder="Email Address"
                        className="h-14 rounded-2xl border border-slate-200 px-4 text-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none"
                      />

                    </div>

                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Special instructions, flight number, luggage details..."
                      className="w-full rounded-2xl border border-slate-200 p-4 text-sm resize-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <AnimatePresence mode="wait">
                  {bookingConfirmed ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-green-50 border border-green-200 rounded-3xl p-6 text-center"
                    >
                      <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />

                      <h3 className="font-[Poppins] text-xl font-bold text-green-700">
                        Booking Confirmed
                      </h3>

                      <p className="text-slate-600 mt-2">
                        Confirmation Code:
                        <span className="font-bold ml-2">
                          {bookingResponse?.confirmationCode}
                        </span>
                      </p>
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      className=" w-full h-16 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 "
                    >
                      <Send className="w-5 h-5" />
                      Reserve Luxury Transfer
                    </button>
                  )}
                </AnimatePresence>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
