import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { ArrowLeft, Users, Briefcase, CheckCircle2, Shield, Calendar, Clock, MapPin, Sparkles, Send } from 'lucide-react';
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
      setCab(data);
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

    const payload = {
      cabId: cab?.id,
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
    };

    fetch(`${apiUrl}/api/bookings/cab`, {
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
    <div className="bg-brand-light min-h-screen text-slate-800 relative">
      <Navbar />

      {/* Cinematic Header Banner */}
      <div className="relative h-[55vh] w-full overflow-hidden border-b border-[#E5E0D8]">
        <img
          src={cab.image}
          alt={cab.name}
          className="w-full h-full object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/30 via-transparent to-brand-light" />

        {/* Back and Action Buttons */}
        <div className="absolute top-28 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link
              to="/cabs"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E0D8] hover:bg-brand-light text-xs font-bold uppercase tracking-widest transition-all text-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-brand-purple" />
              <span>Back to Fleet</span>
            </Link>
          </div>
        </div>

        {/* Vehicle Metadata Header */}
        <div className="absolute bottom-10 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <div className="flex items-center gap-1.5 text-brand-purple font-bold text-xs sm:text-sm uppercase tracking-[0.2em]">
              <Sparkles className="w-4 h-4" />
              <span>{cab.type}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-medium font-serif text-brand-blue tracking-tight leading-tight max-w-3xl">
              {cab.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm pt-2">
              <span className="flex items-center gap-1 font-bold bg-brand-purple/10 text-brand-purple px-3 py-1 border border-brand-purple/20">
                ★ {cab.rating} Rating
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-[#E5E0D8] px-3 py-1 text-slate-650 font-semibold">
                <Users className="w-4 h-4 text-brand-purple" />
                <span>Up to {cab.capacity} Guests</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-[#E5E0D8] px-3 py-1 text-slate-650 font-semibold">
                <Briefcase className="w-4 h-4 text-brand-purple" />
                <span>{cab.luggage} Bags</span>
              </span>
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
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-brand-purple">Vehicle Overview</h2>
              <p className="text-slate-650 font-light text-sm sm:text-base leading-relaxed">
                {cab.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6">
                {cab.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white border border-[#E5E0D8] p-4 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel safety standards */}
            <div className="bg-brand-blue text-white p-8 rounded-[28px] space-y-4 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <Shield className="w-48 h-48" />
              </div>
              <h4 className="text-lg font-bold font-serif">Executive Safety Protocols</h4>
              <p className="text-slate-300 text-xs leading-relaxed font-light">
                Our luxury cab program incorporates live vehicle coordinates reporting, active SOS alarm desk integrations, and automatic flight schedule delays check-in. Rest assured, your transfer is monitored continuously.
              </p>
            </div>
          </div>

          {/* Right Booking Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="glass-card p-6 md:p-8 space-y-6 border border-[#E5E0D8] bg-white rounded-2xl shadow-luxury">
              
              {/* Heading */}
              <div>
                <span className="text-[9px] text-brand-purple font-bold uppercase tracking-[0.15em] block">Cab Booking Form</span>
                <h4 className="font-serif text-brand-blue text-lg leading-tight mt-1">Request Private Chauffeur</h4>
                <p className="text-[10px] text-slate-500 mt-1 font-light leading-relaxed">
                  Fill in your travel coordinates. Our desk will assign your chauffeur and send vehicle credentials.
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleBookCab} className="space-y-4">
                {/* Trip type selector */}
                <div className="grid grid-cols-3 gap-2">
                  {(['airport', 'outstation', 'local'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTripType(type)}
                      className={`py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border ${
                        tripType === type
                          ? 'bg-brand-purple/5 text-yellow-500 border-yellow-500/20'
                          : 'bg-white border-[#E5E0D8] text-slate-500 hover:text-yellow-500'
                      }`}
                    >
                      {type === 'airport' ? 'Airport Transfer' : type === 'outstation' ? 'Outstation' : 'Local Hourly'}
                    </button>
                  ))}
                </div>

                {/* Pickup Address */}
                <div className="relative">
                  <label className="absolute top-2 left-4 text-[9px] font-bold text-slate-500 uppercase tracking-wider">Pickup Location</label>
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup terminal, hotel, or address"
                    className="glass-input pl-10 pt-7 pb-2 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none"
                  />
                </div>

                {/* Dropoff Address */}
                <div className="relative">
                  <label className="absolute top-2 left-4 text-[9px] font-bold text-slate-500 uppercase tracking-wider">Dropoff Location</label>
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Enter destination terminal, hotel, or address"
                    className="glass-input pl-10 pt-7 pb-2 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <label className="absolute top-2 left-3.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider">Date</label>
                    <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-7 pointer-events-none" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="glass-input pl-9 pr-1 pt-7 pb-2 w-full text-[10px] font-bold focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <label className="absolute top-2 left-3.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider">Time</label>
                    <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-7 pointer-events-none" />
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="glass-input pl-9 pr-1 pt-7 pb-2 w-full text-[10px] font-bold focus:outline-none"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 my-2" />

                {/* Passenger Info */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Passenger Contact Details</label>
                  <input
                    type="text"
                    required
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    placeholder="Lead Passenger Full Name"
                    className="glass-input px-4 py-3 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      placeholder="Mobile Number"
                      className="glass-input px-4 py-3 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      value={passengerEmail}
                      onChange={(e) => setPassengerEmail(e.target.value)}
                      placeholder="Email Address"
                      className="glass-input px-4 py-3 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional instructions (flight number, bag details...)"
                    rows={2}
                    className="glass-input px-4 py-2 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none resize-none mt-2"
                  />
                </div>

                {/* Booking button */}
                <div className="pt-2">
                  <AnimatePresence mode="wait">
                    {bookingConfirmed ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-5 bg-brand-light border border-[#E5E0D8] text-center space-y-3 rounded-xl"
                      >
                        <CheckCircle2 className="w-8 h-8 text-brand-purple mx-auto animate-pulse" />
                        <h5 className="font-serif text-brand-blue text-sm font-semibold">Booking Confirmed</h5>
                        <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                          Your reservation code is <strong>{bookingResponse?.confirmationCode}</strong>. We have saved this trip to your member dashboard.
                        </p>
                      </motion.div>
                    ) : (
                      <button
                        type="submit"
                        className="btn-gold w-full py-4 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 rounded-xl"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Reserve Luxury Transfer</span>
                      </button>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
