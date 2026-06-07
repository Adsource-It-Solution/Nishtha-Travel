import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Hotel, MapPin, Calendar, Users, Search, ArrowRightLeft } from 'lucide-react';
import TrainIcon from '@mui/icons-material/Train';

type TabType = 'flights' | 'trains' | 'hotels';

interface SearchTabsProps {
  initialTab?: TabType;
  compact?: boolean;
}

export const SearchTabs: React.FC<SearchTabsProps> = ({ initialTab = 'flights', compact = false }) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const navigate = useNavigate();

  // Search States - Flights
  const [flightType, setFlightType] = useState<'oneway' | 'roundtrip'>('roundtrip');
  const [flightFrom, setFlightFrom] = useState('New Delhi (DEL)');
  const [flightTo, setFlightTo] = useState('London (LHR)');
  const [flightDepDate, setFlightDepDate] = useState('2026-06-15');
  const [flightRetDate, setFlightRetDate] = useState('2026-06-25');
  const [flightClass, setFlightClass] = useState<'Economy' | 'Business' | 'First Class'>('Business');
  const [passengers, setPassengers] = useState(2);
  const [showFlightDropdown, setShowFlightDropdown] = useState(false);

  // Search States - Trains
  const [trainFrom, setTrainFrom] = useState('New Delhi (NDLS)');
  const [trainTo, setTrainTo] = useState('Mumbai Central (MMCT)');
  const [trainDate, setTrainDate] = useState('2026-06-15');
  const [trainClass, setTrainClass] = useState('all');

  // Search States - Hotels
  const [hotelLoc, setHotelLoc] = useState('London');
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-06-15');
  const [hotelCheckOut, setHotelCheckOut] = useState('2026-06-25');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [showHotelDropdown, setShowHotelDropdown] = useState(false);

  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/flights?from=${encodeURIComponent(flightFrom)}&to=${encodeURIComponent(flightTo)}&dep=${flightDepDate}&ret=${flightRetDate}&class=${flightClass}&passengers=${passengers}`);
  };

  const handleTrainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/trains?from=${encodeURIComponent(trainFrom)}&to=${encodeURIComponent(trainTo)}&date=${trainDate}&class=${trainClass}`);
  };

  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/hotels?loc=${encodeURIComponent(hotelLoc)}&in=${hotelCheckIn}&out=${hotelCheckOut}&guests=${guests}`);
  };

  const swapLocations = () => {
    setFlightFrom(flightTo);
    setFlightTo(flightFrom);
  };

  const swapTrainLocations = () => {
    setTrainFrom(trainTo);
    setTrainTo(trainFrom);
  };

  return (
    <div className={`w-full ${compact ? '' : 'max-w-6xl mx-auto px-4'}`}>
      {/* Tab Buttons */}
      <div className="relative top-8 z-20 flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 w-full overflow-x-auto scrollbar-none pb-2">
        {[
          { id: 'flights', label: 'Flights', icon: Plane },
          { id: 'trains', label: 'Trains', icon: TrainIcon },
          { id: 'hotels', label: 'Hotels', icon: Hotel }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center justify-center gap-1.5 px-4 py-2 my-2 mx-1.5 rounded-full border transition-all duration-300 font-semibold text-[11px] sm:text-sm shrink-0 ${active
                ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                : 'bg-white text-gray-800 border-gray-200 hover:border-blue-400'
                }`}
            >
              <Icon className="w-4 h-4 sm:w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Booking Form Card */}
      <div className="glass-card p-6 md:p-8 relative shadow-luxury rounded-lg z-0">

        {/* Flight Booking Panel */}
        {activeTab === 'flights' && (
          <form onSubmit={handleFlightSearch} className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-soft-border pb-4">
              <div className="flex gap-2 my-2">
                <button
                  type="button"
                  onClick={() => setFlightType('roundtrip')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${flightType === 'roundtrip'
                    ? 'bg-brand-purple/5 text-yellow-500 border-yellow-500/20'
                    : 'bg-white border-soft-border text-slate-500 hover:text-yellow-500'
                    }`}
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  onClick={() => setFlightType('oneway')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${flightType === 'oneway'
                    ? 'bg-yellow-500/5 text-yellow-500 border-brand-purple/20'
                    : 'bg-white border-soft-border text-slate-500 hover:text-yellow-500'
                    }`}
                >
                  One Way
                </button>
              </div>

              {/* Class & Passenger Dropdown Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowFlightDropdown(!showFlightDropdown)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-white border border-soft-border px-4 py-2 rounded-xl transition-all hover:bg-slate-50"
                >
                  <Users className="w-3.5 h-3.5 text-yellow-500" />
                  <span>{passengers} Traveler{passengers > 1 ? 's' : ''}, {flightClass}</span>
                </button>

                {showFlightDropdown && (
                  <div className="absolute right-0 mt-2 w-72 p-4 bg-white border border-soft-border rounded-xl shadow-2xl z-20 space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Travelers</label>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700">Adults / Kids</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setPassengers(Math.max(1, passengers - 1))}
                            className="w-8 h-8 rounded-lg bg-slate-50 border border-soft-border hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm"
                          >
                            -
                          </button>
                          <span className="w-4 text-center text-xs font-extrabold text-brand-blue">{passengers}</span>
                          <button
                            type="button"
                            onClick={() => setPassengers(passengers + 1)}
                            className="w-8 h-8 rounded-lg bg-slate-50 border border-soft-border hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cabin Class</label>
                      <div className="grid grid-cols-1 gap-1">
                        {(['Economy', 'Business', 'First Class'] as const).map((cls) => (
                          <button
                            key={cls}
                            type="button"
                            onClick={() => {
                              setFlightClass(cls);
                              setShowFlightDropdown(false);
                            }}
                            className={`text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${flightClass === cls
                              ? 'bg-brand-blue text-white font-extrabold'
                              : 'text-slate-600 hover:bg-slate-50'
                              }`}
                          >
                            {cls}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Grid Search Inputs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* Departure Input */}
              <div className="lg:col-span-3 relative">
                <label className="absolute top-2 left-4 text-[9px] font-bold text-slate-600 uppercase tracking-wider">From</label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="text"
                    value={flightFrom}
                    onChange={(e) => setFlightFrom(e.target.value)}
                    className="glass-input pl-10 pt-7 pb-2 w-full font-bold text-xs text-dark-text focus:outline-none"
                    placeholder="Departure airport"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="lg:col-span-1 flex justify-center -my-2 lg:my-0">
                <button
                  type="button"
                  onClick={swapLocations}
                  className="w-10 h-10 rounded-full bg-slate-50 hover:bg-brand-purple hover:text-white border border-soft-border flex items-center justify-center text-slate-500 transition-all duration-300 shadow-sm"
                >
                  <ArrowRightLeft className="w-4 h-4 rotate-90 lg:rotate-0" />
                </button>
              </div>

              {/* Destination Input */}
              <div className="lg:col-span-3 relative">
                <label className="absolute top-2 left-4 text-[9px] font-bold text-slate-600 uppercase tracking-wider">To</label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="text"
                    value={flightTo}
                    onChange={(e) => setFlightTo(e.target.value)}
                    className="glass-input pl-10 pt-7 pb-2 w-full font-bold text-xs text-dark-text focus:outline-none"
                    placeholder="Arrival destination"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="lg:col-span-3 grid grid-cols-2 gap-2">
                <div className="relative">
                  <label className="absolute top-2 left-3.5 text-[9px] font-bold text-slate-600 uppercase tracking-wider">Depart</label>
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-7 pointer-events-none" />
                  <input
                    type="date"
                    value={flightDepDate}
                    onChange={(e) => setFlightDepDate(e.target.value)}
                    className="glass-input pl-9 pr-1 pt-7 pb-2 w-full text-[10px] font-bold text-dark-text focus:outline-none"
                  />
                </div>
                {flightType === 'roundtrip' ? (
                  <div className="relative">
                    <label className="absolute top-2 left-3.5 text-[9px] font-bold text-slate-600 uppercase tracking-wider">Return</label>
                    <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-7 pointer-events-none" />
                    <input
                      type="date"
                      value={flightRetDate}
                      onChange={(e) => setFlightRetDate(e.target.value)}
                      className="glass-input pl-9 pr-1 pt-7 pb-2 w-full text-[10px] font-bold text-dark-text focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-soft-border rounded-xl flex items-center justify-center text-[10px] font-bold text-slate-400 select-none">
                    One-way trip
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="lg:col-span-2">
                <button type="submit" className="btn-gold w-full py-4 h-full font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Search className="w-4 h-4" />
                  <span>Search Flights</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Train Booking Panel */}
        {activeTab === 'trains' && (
          <form onSubmit={handleTrainSearch} className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-soft-border pb-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Elite Rail Journeys & Luxury Cabins
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  <span>Class:</span>
                  <select
                    value={trainClass}
                    onChange={(e) => setTrainClass(e.target.value)}
                    className="bg-white border border-soft-border text-dark-text rounded-lg px-3 py-1 focus:border-brand-purple outline-none font-bold cursor-pointer text-[10px]"
                  >
                    <option value="all">All Classes</option>
                    <option value="SL">Sleeper (SL)</option>
                    <option value="1A">First AC (1A)</option>
                    <option value="2A">Second AC (2A)</option>
                    <option value="3A">Third AC (3A)</option>
                    <option value="EC">Executive Chair Car (EC)</option>
                    <option value="CC">AC Chair Car (CC)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* From Train */}
              <div className="lg:col-span-4 relative">
                <label className="absolute top-2 left-4 text-[9px] font-bold text-slate-600 uppercase tracking-wider">From Station</label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="text"
                    value={trainFrom}
                    onChange={(e) => setTrainFrom(e.target.value)}
                    className="glass-input pl-10 pt-7 pb-2 w-full font-bold text-xs text-dark-text focus:outline-none"
                    placeholder="Departure city or station"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="lg:col-span-1 flex justify-center -my-2 lg:my-0">
                <button
                  type="button"
                  onClick={swapTrainLocations}
                  className="w-10 h-10 rounded-full bg-slate-50 hover:bg-brand-purple hover:text-white border border-soft-border flex items-center justify-center text-slate-500 transition-all duration-300 shadow-sm"
                >
                  <ArrowRightLeft className="w-4 h-4 rotate-90 lg:rotate-0" />
                </button>
              </div>

              {/* To Train */}
              <div className="lg:col-span-4 relative">
                <label className="absolute top-2 left-4 text-[9px] font-bold text-slate-600 uppercase tracking-wider">To Station</label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="text"
                    value={trainTo}
                    onChange={(e) => setTrainTo(e.target.value)}
                    className="glass-input pl-10 pt-7 pb-2 w-full font-bold text-xs text-dark-text focus:outline-none"
                    placeholder="Destination station"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="lg:col-span-2 relative">
                <label className="absolute top-2 left-4 text-[9px] font-bold text-slate-600 uppercase tracking-wider">Travel Date</label>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="date"
                    value={trainDate}
                    onChange={(e) => setTrainDate(e.target.value)}
                    className="glass-input pl-10 pt-7 pb-2 w-full font-bold text-xs text-dark-text focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="lg:col-span-1">
                <button type="submit" className="btn-gold w-full py-4 h-full font-extrabold text-xs uppercase tracking-wider flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Hotel Booking Panel */}
        {activeTab === 'hotels' && (
          <form onSubmit={handleHotelSearch} className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-soft-border pb-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Elite Collection Hotels & Lodges
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowHotelDropdown(!showHotelDropdown)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-white border border-soft-border px-4 py-2 rounded-xl transition-all hover:bg-slate-50"
                >
                  <Users className="w-3.5 h-3.5 text-slate-600" />
                  <span>{guests} Guest{guests > 1 ? 's' : ''}, {rooms} Room{rooms > 1 ? 's' : ''}</span>
                </button>

                {showHotelDropdown && (
                  <div className="absolute right-0 mt-2 w-72 p-4 bg-white border border-soft-border rounded-xl shadow-2xl z-20 space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Guests</label>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700">Number of Guests</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            className="w-8 h-8 rounded-lg bg-slate-50 border border-soft-border hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm"
                          >
                            -
                          </button>
                          <span className="w-4 text-center text-xs font-extrabold text-brand-blue">{guests}</span>
                          <button
                            type="button"
                            onClick={() => setGuests(guests + 1)}
                            className="w-8 h-8 rounded-lg bg-slate-50 border border-soft-border hover:bg-slate-100 flex items-center justify-center font-bold text-slate-650 text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rooms</label>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700">Rooms Required</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setRooms(Math.max(1, rooms - 1))}
                            className="w-8 h-8 rounded-lg bg-slate-50 border border-soft-border hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm"
                          >
                            -
                          </button>
                          <span className="w-4 text-center text-xs font-extrabold text-brand-blue">{rooms}</span>
                          <button
                            type="button"
                            onClick={() => setRooms(rooms + 1)}
                            className="w-8 h-8 rounded-lg bg-slate-50 border border-soft-border hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* Destination */}
              <div className="lg:col-span-5 relative">
                <label className="absolute top-2 left-4 text-[9px] font-bold text-slate-600 uppercase tracking-wider">Where To?</label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="text"
                    value={hotelLoc}
                    onChange={(e) => setHotelLoc(e.target.value)}
                    className="glass-input pl-10 pt-7 pb-2 w-full font-bold text-xs text-dark-text focus:outline-none"
                    placeholder="Enter city or luxury property name"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-2">
                <div className="relative">
                  <label className="absolute top-2 left-3.5 text-[9px] font-bold text-slate-600 uppercase tracking-wider">Check-In</label>
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-7 pointer-events-none" />
                  <input
                    type="date"
                    value={hotelCheckIn}
                    onChange={(e) => setHotelCheckIn(e.target.value)}
                    className="glass-input pl-9 pr-1 pt-7 pb-2 w-full text-[10px] font-bold text-dark-text focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <label className="absolute top-2 left-3.5 text-[9px] font-bold text-slate-600 uppercase tracking-wider">Check-Out</label>
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-7 pointer-events-none" />
                  <input
                    type="date"
                    value={hotelCheckOut}
                    onChange={(e) => setHotelCheckOut(e.target.value)}
                    className="glass-input pl-9 pr-1 pt-7 pb-2 w-full text-[10px] font-bold text-dark-text focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="lg:col-span-3">
                <button type="submit" className="btn-gold w-full py-4 h-full font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Search className="w-4 h-4" />
                  <span>Search Hotels</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
