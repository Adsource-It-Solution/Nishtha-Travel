import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { SearchTabs } from '../components/SearchTabs';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Train, CheckCircle2, X, BadgeCheck, Ticket, CreditCard, Headphones, RefreshCcw, TrainFront, Search, Users, MapPinned } from "lucide-react";

interface TrainOption {
  id: string;
  name: string;
  number: string;
  departureCity: string;
  departureCode: string;
  arrivalCity: string;
  arrivalCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  classes: string[];
  pricing: Record<string, number>;
}

export const TrainsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trains, setTrains] = useState<TrainOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Search Params
  const queryParams = new URLSearchParams(location.search);
  const searchFrom = queryParams.get('from') || 'New Delhi';
  const searchTo = queryParams.get('to') || 'Mumbai Central';
  const searchDate = queryParams.get('date') || '2026-06-15';

  // Booking states
  const [selectedTrain, setSelectedTrain] = useState<TrainOption | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('1A');
  const [passengerName, setPassengerName] = useState('Alexander Mercer');
  const [passengerAge, setPassengerAge] = useState('32');
  const [seatPreference, setSeatPreference] = useState('Window');
  const [mealPreference, setMealPreference] = useState('Veg');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingResponse, setBookingResponse] = useState<any>(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/api/trains/search?from=${encodeURIComponent(searchFrom)}&to=${encodeURIComponent(searchTo)}&date=${searchDate}`)
      .then(res => res.json())
      .then(data => {
        setTrains(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error searching trains:', err);
        setLoading(false);
      });
  }, [searchFrom, searchTo, searchDate, apiUrl]);

  const handleOpenBooking = (train: TrainOption, cls: string) => {
    setSelectedTrain(train);
    setSelectedClass(cls);
  };

  const handleConfirmTrainBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTrain) return;

    const payload = {
      trainId: selectedTrain.id,
      trainName: selectedTrain.name,
      trainNumber: selectedTrain.number,
      departureCity: selectedTrain.departureCity,
      departureCode: selectedTrain.departureCode,
      arrivalCity: selectedTrain.arrivalCity,
      arrivalCode: selectedTrain.arrivalCode,
      departureTime: selectedTrain.departureTime,
      arrivalTime: selectedTrain.arrivalTime,
      duration: selectedTrain.duration,
      class: selectedClass,
      ticketPrice: selectedTrain.pricing[selectedClass],
      passengerName,
      passengerAge: Number(passengerAge),
      seatPreference,
      mealPreference,
      travelDate: searchDate
    };

    fetch(`${apiUrl}/api/bookings/train`, {
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
          setSelectedTrain(null);
          navigate('/dashboard');
        }, 4000);
      })
      .catch(err => {
        console.error('Error booking train:', err);
        alert('There was an error booking your train ticket. Please try again.');
      });
  };

  const trainBookingSteps = [
    {
      step: "01",
      icon: Search,
      title: "Search Your Route",
      description:
        "Enter your departure city, destination, and travel date to find available trains."
    },
    {
      step: "02",
      icon: Train,
      title: "Choose Your Train",
      description:
        "Compare timings, journey duration, and seat classes to select the best train."
    },
    {
      step: "03",
      icon: Users,
      title: "Add Passenger Details",
      description:
        "Fill in traveler information including name, age, gender, and berth preferences."
    },
    {
      step: "04",
      icon: CreditCard,
      title: "Secure Payment",
      description:
        "Pay safely using UPI, Credit Card, Debit Card, Net Banking, or Wallets."
    },
    {
      step: "05",
      icon: Ticket,
      title: "Receive E-Ticket",
      description:
        "Get instant booking confirmation and e-ticket directly on email and mobile."
    },
    {
      step: "06",
      icon: MapPinned,
      title: "Track Your Journey",
      description:
        "Check PNR status, train schedules, and journey updates before departure."
    }
  ];

  const trainBenefits = [
    {
      icon: Ticket,
      title: "Instant Ticket Confirmation",
      description:
        "Book train tickets quickly with real-time seat availability and confirmation."
    },
    {
      icon: CreditCard,
      title: "Secure Online Payments",
      description:
        "Pay safely using UPI, Cards, Net Banking and popular wallets."
    },
    {
      icon: ShieldCheck,
      title: "Free Cancellation Options",
      description:
        "Flexible cancellation policies with quick refunds on eligible bookings."
    },
    {
      icon: Headphones,
      title: "24×7 Travel Assistance",
      description:
        "Dedicated support team available for bookings and travel-related queries."
    },
    {
      icon: RefreshCcw,
      title: "Fast Refund Processing",
      description:
        "Get faster refund updates and hassle-free cancellation management."
    },
    {
      icon: TrainFront,
      title: "Live Train Tracking",
      description:
        "Track train schedules, delays and platform updates in real time."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[480px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2000"
          alt="Premium Rail Booking"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest">
              Nishtha Rail Desk
            </span>
            <h1 className="mt-5 text-4xl sm:text-6xl font-bold text-white font-poppins leading-tight">
              Book Train Tickets Across India
            </h1>
            <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed">
              Search routes, compare fares, choose your preferred class,
              and book train tickets quickly and securely.
            </p>
          </div>
        </div>
      </section>

      {/* Floating search */}
      <section className="relative z-20 -mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-4 md:p-8">
            <SearchTabs initialTab="trains" compact />
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="pt-20 max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <span className="text-blue-600 font-semibold uppercase tracking-wider text-xs">Available Schedules</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-poppins">
            Trains from {searchFrom} to {searchTo}
          </h2>
          <p className="text-slate-500 text-xs mt-1.5 font-semibold">Travel Date: {searchDate}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main List */}
          <div className="lg:col-span-9 space-y-6">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-[24px] border border-slate-200 h-40 animate-pulse" />
              ))
            ) : trains.length > 0 ? (
              trains.map(train => (
                <div
                  key={train.id}
                  className="bg-white border border-[#E5E0D8] rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between gap-6"
                >
                  {/* Train details */}
                  <div className="flex-grow space-y-4">
                    <div className="flex items-center gap-3">
                      <Train className="w-5 h-5 text-brand-purple" />
                      <h3 className="text-lg font-bold text-slate-900 font-poppins">{train.name}</h3>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-md">
                        #{train.number}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 py-4 border-y border-slate-100 max-w-xl">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Depart</span>
                        <span className="text-base font-poppins text-brand-blue block mt-1">{train.departureTime}</span>
                        <span className="text-[10px] text-slate-500 block">{train.departureCity} ({train.departureCode})</span>
                      </div>
                      <div className="flex-grow flex flex-col items-center px-4 relative">
                        <span className="text-[9px] text-slate-550 uppercase tracking-widest">{train.duration}</span>
                        <div className="w-full h-[1px] bg-slate-200 relative my-1">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-purple rounded-full" />
                        </div>
                        <span className="text-[9px] text-brand-purple font-bold uppercase tracking-wider">Direct</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Arrive</span>
                        <span className="text-base font-poppins text-brand-blue block mt-1">{train.arrivalTime}</span>
                        <span className="text-[10px] text-slate-500 block">{train.arrivalCity} ({train.arrivalCode})</span>
                      </div>
                    </div>
                  </div>

                  {/* Classes and Rates */}
                  <div className="md:border-l border-slate-100 md:pl-6 min-w-[220px] flex flex-col justify-center space-y-2.5">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Available Classes</span>
                    <div className="grid grid-cols-2 gap-2">
                      {train.classes.map(cls => (
                        <button
                          key={cls}
                          onClick={() => handleOpenBooking(train, cls)}
                          className="bg-white hover:bg-slate-50 border border-[#E5E0D8] rounded-xl p-2.5 text-left transition-all duration-200 group"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-700">{cls}</span>
                            <span className="text-[9px] text-emerald-600 font-bold">Available</span>
                          </div>
                          <span className="text-sm font-bold text-slate-900 block mt-1 font-poppins">
                            ₹{train.pricing[cls]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-[#E5E0D8] rounded-[24px] p-16 text-center">
                <Train className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-xl font-bold text-slate-800 mt-4 font-poppins">No Trains Scheduled</h3>
                <p className="text-slate-500 text-sm mt-1">
                  We could not find any active train services matching this route for {searchDate}.
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar Benefits */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-[24px] space-y-4">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
              <h4 className="font-bold text-brand-blue font-poppins">VIP Lounge Access</h4>
              <p className="text-xs text-slate-650 leading-relaxed font-light">
                All First Class (1A) and Executive Cabins (EC) bookings include complimentary entry to Executive Railway Lounges with buffet catering and private work pods.
              </p>
            </div>
            <div className="bg-[#E6CFB7]/20 border border-[#E5E0D8] p-6 rounded-[24px] space-y-4">
              <BadgeCheck className="w-8 h-8 text-yellow-500" />
              <h4 className="font-bold text-brand-blue font-poppins">Catering Curations</h4>
              <p className="text-xs text-slate-650 leading-relaxed font-light">
                Select your gourmet regional breakfast, lunch, or continental options directly. Included with all executive tickets booked via Club Nishtha.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="mt-5 text-4xl md:text-5xl font-bold font-poppins text-slate-900">
              Why Choose Us
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-slate-600 font-roboto">
              Experience seamless booking, secure payments and reliable support for every train journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainBenefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-7 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center mb-5">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold font-poppins text-slate-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed font-roboto">
                    {item.description}
                  </p>

                  <div className="mt-5 h-1 w-16 rounded-full bg-[#F97316]" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2
              className="mt-5 text-4xl md:text-5xl font-bold font-poppins text-slate-900"
            >
              How To Book Train Tickets
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-slate-600 font-roboto">
              Book your train journey in just a few simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {trainBookingSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.step}
                  className="relative bg-[#F8FAFC] rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all"
                >
                  <span
                    className="absolute top-5 right-5 text-5xl font-bold text-[#2563EB]/10">
                    {step.step}
                  </span>

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold font-poppins text-slate-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 font-roboto leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-6 h-1 w-20 bg-[#F97316] rounded-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Booking Form Dialog */}
      <AnimatePresence>
        {selectedTrain && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!bookingConfirmed) setSelectedTrain(null);
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              className="bg-white border border-[#E5E0D8] p-8 md:p-10 max-w-md w-full relative z-10 space-y-6 rounded-2xl shadow-luxury"
            >
              {!bookingConfirmed ? (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-brand-purple font-bold uppercase tracking-[0.15em] block">IRCTC / GDS Ticket Entry</span>
                      <h3 className="text-xl font-poppins text-brand-blue mt-1">Passenger Details</h3>
                    </div>
                    <button
                      onClick={() => setSelectedTrain(null)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-700">{selectedTrain.name}</span>
                      <span className="text-slate-500 font-semibold">#{selectedTrain.number}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-xs text-slate-500 font-light">
                      <span>Route: {selectedTrain.departureCode} → {selectedTrain.arrivalCode}</span>
                      <span>Class: {selectedClass}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-light">Fare Price</span>
                      <span className="font-bold text-slate-800">₹{selectedTrain.pricing[selectedClass]}</span>
                    </div>
                  </div>

                  {/* Input Fields */}
                  <form onSubmit={handleConfirmTrainBooking} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Passenger Full Name</label>
                      <input
                        type="text"
                        required
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        className="glass-input px-4 py-2.5 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1 space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Age</label>
                        <input
                          type="number"
                          required
                          value={passengerAge}
                          onChange={(e) => setPassengerAge(e.target.value)}
                          className="glass-input px-4 py-2.5 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none"
                        />
                      </div>
                      <div className="col-span-1 space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Berth Preference</label>
                        <select
                          value={seatPreference}
                          onChange={(e) => setSeatPreference(e.target.value)}
                          className="glass-input px-3 py-2.5 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none bg-white cursor-pointer"
                        >
                          <option value="Window">Window Seat</option>
                          <option value="Lower">Lower Berth</option>
                          <option value="Middle">Middle Berth</option>
                          <option value="Upper">Upper Berth</option>
                          <option value="Side Lower">Side Lower</option>
                        </select>
                      </div>
                      <div className="col-span-1 space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Meal Preference</label>
                        <select
                          value={mealPreference}
                          onChange={(e) => setMealPreference(e.target.value)}
                          className="glass-input px-3 py-2.5 w-full text-xs font-semibold focus:border-brand-purple focus:outline-none bg-white cursor-pointer"
                        >
                          <option value="Veg">Vegetarian</option>
                          <option value="Non-Veg">Non-Vegetarian</option>
                          <option value="None">No Meals</option>
                        </select>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setSelectedTrain(null)}
                        className="btn-navy rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-gold rounded-xl"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                // Success state
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-brand-purple animate-pulse">
                    <CheckCircle2 className="w-8 h-8 text-brand-purple" />
                  </div>
                  <h3 className="text-2xl font-poppins text-brand-blue">Ticket Reserved</h3>
                  <p className="text-slate-500 text-xs font-light max-w-xs mx-auto leading-relaxed">
                    Your train ticket booking is confirmed. Reservation code: <strong>{bookingResponse?.confirmationCode}</strong>. We have saved this booking to your member lounge hub.
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
