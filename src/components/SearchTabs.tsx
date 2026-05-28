import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Hotel, Luggage, MapPin, Calendar, Users, Search, ArrowRightLeft, } from 'lucide-react';

type TabType = 'flights' | 'hotels' | 'packages';

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

  // Search States - Hotels
  const [hotelLoc, setHotelLoc] = useState('London');
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-06-15');
  const [hotelCheckOut, setHotelCheckOut] = useState('2026-06-25');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [showHotelDropdown, setShowHotelDropdown] = useState(false);

  // Search States - Packages
  const [pkgDestination, setPkgDestination] = useState('Amalfi Coast, Italy');
  const [pkgDate, setPkgDate] = useState('2026-07');
  const [pkgCategory, setPkgCategory] = useState('luxury');

  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/flights?from=${encodeURIComponent(flightFrom)}&to=${encodeURIComponent(flightTo)}&dep=${flightDepDate}&ret=${flightRetDate}&class=${flightClass}&passengers=${passengers}`);
  };

  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/hotels?loc=${encodeURIComponent(hotelLoc)}&in=${hotelCheckIn}&out=${hotelCheckOut}&guests=${guests}`);
  };

  const handlePackageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/packages?dest=${encodeURIComponent(pkgDestination)}&date=${pkgDate}&cat=${pkgCategory}`);
  };

  const swapLocations = () => {
    setFlightFrom(flightTo);
    setFlightTo(flightFrom);
  };

  return (
    <div className={`w-full ${compact ? '' : 'max-w-6xl mx-auto px-4'}`}>
      {/* Tab Buttons */}
      <div className="flex gap-2 mb-4 justify-center sm:justify-start">
        {(['flights', 'hotels', 'packages'] as TabType[]).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-none text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                isActive
                  ? 'bg-brand-purple border-transparent text-white shadow-none font-bold'
                  : 'bg-white border-[#E5E0D8] text-slate-600 hover:bg-brand-light hover:border-brand-purple'
              }`}
            >
              {tab === 'flights' && <Plane className="w-4 h-4" />}
              {tab === 'hotels' && <Hotel className="w-4 h-4" />}
              {tab === 'packages' && <Luggage className="w-4 h-4" />}
              <span>{tab}</span>
            </button>
          );
        })}
      </div>
 
      {/* Booking Form Card */}
      <div className="glass-card p-6 md:p-8 relative shadow-sm rounded-none border border-[#E5E0D8] bg-white">
 
        {/* Flight Booking Panel */}
        {activeTab === 'flights' && (
          <form onSubmit={handleFlightSearch} className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E0D8] pb-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFlightType('roundtrip')}
                  className={`px-3 py-1.5 rounded-none text-[9px] font-bold uppercase tracking-widest transition-all border ${
                    flightType === 'roundtrip'
                      ? 'bg-brand-purple text-white border-brand-purple'
                      : 'bg-white border-[#E5E0D8] text-slate-500 hover:border-brand-purple'
                  }`}
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  onClick={() => setFlightType('oneway')}
                  className={`px-3 py-1.5 rounded-none text-[9px] font-bold uppercase tracking-widest transition-all border ${
                    flightType === 'oneway'
                      ? 'bg-brand-purple text-white border-brand-purple'
                      : 'bg-white border-[#E5E0D8] text-slate-500 hover:border-brand-purple'
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
                  className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-700 bg-white border border-[#E5E0D8] px-4 py-2 rounded-none transition-all hover:bg-brand-light"
                >
                  <Users className="w-3.5 h-3.5 text-brand-purple" />
                  <span>{passengers} Traveler{passengers > 1 ? 's' : ''}, {flightClass}</span>
                </button>
 
                {showFlightDropdown && (
                  <div className="absolute right-0 mt-2 w-72 p-4 bg-white border border-[#E5E0D8] rounded-none shadow-md z-20 space-y-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Travelers</label>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700 font-serif italic lowercase">adults / kids</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setPassengers(Math.max(1, passengers - 1))}
                            className="w-8 h-8 rounded-none bg-slate-50 border border-[#E5E0D8] hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm"
                          >
                            -
                          </button>
                          <span className="w-4 text-center text-xs font-extrabold text-brand-blue">{passengers}</span>
                          <button
                            type="button"
                            onClick={() => setPassengers(passengers + 1)}
                            className="w-8 h-8 rounded-none bg-slate-50 border border-[#E5E0D8] hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Cabin Class</label>
                      <div className="grid grid-cols-1 gap-1">
                        {(['Economy', 'Business', 'First Class'] as const).map((cls) => (
                          <button
                            key={cls}
                            type="button"
                            onClick={() => {
                              setFlightClass(cls);
                              setShowFlightDropdown(false);
                            }}
                            className={`text-left px-3 py-2 rounded-none text-xs font-bold transition-all ${
                              flightClass === cls
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
                <label className="absolute top-2 left-4 text-[10px] font-serif italic text-stone-500 lowercase tracking-wide">from</label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="text"
                    value={flightFrom}
                    onChange={(e) => setFlightFrom(e.target.value)}
                    className="glass-input pl-10 pt-7 pb-2 w-full font-bold text-xs text-dark-text focus:outline-none rounded-none"
                    placeholder="Departure airport"
                  />
                </div>
              </div>
 
              {/* Swap Button */}
              <div className="lg:col-span-1 flex justify-center -my-2 lg:my-0">
                <button
                  type="button"
                  onClick={swapLocations}
                  className="w-10 h-10 rounded-none bg-white hover:bg-brand-light hover:border-brand-purple border border-[#E5E0D8] flex items-center justify-center text-slate-500 transition-all duration-300 shadow-sm animate-none"
                >
                  <ArrowRightLeft className="w-4 h-4 rotate-90 lg:rotate-0" />
                </button>
              </div>
 
              {/* Destination Input */}
              <div className="lg:col-span-3 relative">
                <label className="absolute top-2 left-4 text-[10px] font-serif italic text-stone-500 lowercase tracking-wide">to</label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="text"
                    value={flightTo}
                    onChange={(e) => setFlightTo(e.target.value)}
                    className="glass-input pl-10 pt-7 pb-2 w-full font-bold text-xs text-dark-text focus:outline-none rounded-none"
                    placeholder="Arrival destination"
                  />
                </div>
              </div>
 
              {/* Dates */}
              <div className="lg:col-span-3 grid grid-cols-2 gap-2">
                <div className="relative">
                  <label className="absolute top-2 left-3.5 text-[10px] font-serif italic text-stone-500 lowercase tracking-wide">depart</label>
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-7 pointer-events-none" />
                  <input
                    type="date"
                    value={flightDepDate}
                    onChange={(e) => setFlightDepDate(e.target.value)}
                    className="glass-input pl-9 pr-1 pt-7 pb-2 w-full text-[10px] font-bold text-dark-text focus:outline-none rounded-none"
                  />
                </div>
                {flightType === 'roundtrip' ? (
                  <div className="relative">
                    <label className="absolute top-2 left-3.5 text-[10px] font-serif italic text-stone-500 lowercase tracking-wide">return</label>
                    <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-7 pointer-events-none" />
                    <input
                      type="date"
                      value={flightRetDate}
                      onChange={(e) => setFlightRetDate(e.target.value)}
                      className="glass-input pl-9 pr-1 pt-7 pb-2 w-full text-[10px] font-bold text-dark-text focus:outline-none rounded-none"
                    />
                  </div>
                ) : (
                  <div className="bg-brand-light border border-[#E5E0D8] rounded-none flex items-center justify-center text-[9px] font-bold uppercase tracking-wider text-slate-400 select-none h-[54px] mt-1">
                    One-way trip
                  </div>
                )}
              </div>
 
              {/* Submit Button */}
              <div className="lg:col-span-2">
                <button type="submit" className="btn-gold w-full py-4 h-full rounded-none font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>
        )}
 
        {/* Hotel Booking Panel */}
        {activeTab === 'hotels' && (
          <form onSubmit={handleHotelSearch} className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E0D8] pb-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Elite Collection Hotels & Lodges
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowHotelDropdown(!showHotelDropdown)}
                  className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-700 bg-white border border-[#E5E0D8] px-4 py-2 rounded-none transition-all hover:bg-slate-50"
                >
                  <Users className="w-3.5 h-3.5 text-brand-purple" />
                  <span>{guests} Guest{guests > 1 ? 's' : ''}, {rooms} Room{rooms > 1 ? 's' : ''}</span>
                </button>
 
                {showHotelDropdown && (
                  <div className="absolute right-0 mt-2 w-72 p-4 bg-white border border-[#E5E0D8] rounded-none shadow-md z-20 space-y-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Guests</label>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700 font-serif italic lowercase">guests</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            className="w-8 h-8 rounded-none bg-slate-50 border border-[#E5E0D8] hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm"
                          >
                            -
                          </button>
                          <span className="w-4 text-center text-xs font-extrabold text-brand-blue">{guests}</span>
                          <button
                            type="button"
                            onClick={() => setGuests(guests + 1)}
                            className="w-8 h-8 rounded-none bg-slate-50 border border-[#E5E0D8] hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rooms</label>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700 font-serif italic lowercase">rooms</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setRooms(Math.max(1, rooms - 1))}
                            className="w-8 h-8 rounded-none bg-slate-50 border border-[#E5E0D8] hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm"
                          >
                            -
                          </button>
                          <span className="w-4 text-center text-xs font-extrabold text-brand-blue">{rooms}</span>
                          <button
                            type="button"
                            onClick={() => setRooms(rooms + 1)}
                            className="w-8 h-8 rounded-none bg-slate-50 border border-[#E5E0D8] hover:bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm"
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
                <label className="absolute top-2 left-4 text-[10px] font-serif italic text-stone-500 lowercase tracking-wide">where to?</label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="text"
                    value={hotelLoc}
                    onChange={(e) => setHotelLoc(e.target.value)}
                    className="glass-input pl-10 pt-7 pb-2 w-full font-bold text-xs text-dark-text focus:outline-none rounded-none"
                    placeholder="Enter city or luxury property name"
                  />
                </div>
              </div>
 
              {/* Dates */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-2">
                <div className="relative">
                  <label className="absolute top-2 left-3.5 text-[10px] font-serif italic text-stone-500 lowercase tracking-wide">check-in</label>
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-7 pointer-events-none" />
                  <input
                    type="date"
                    value={hotelCheckIn}
                    onChange={(e) => setHotelCheckIn(e.target.value)}
                    className="glass-input pl-9 pr-1 pt-7 pb-2 w-full text-[10px] font-bold text-dark-text focus:outline-none rounded-none"
                  />
                </div>
                <div className="relative">
                  <label className="absolute top-2 left-3.5 text-[10px] font-serif italic text-stone-500 lowercase tracking-wide">check-out</label>
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-7 pointer-events-none" />
                  <input
                    type="date"
                    value={hotelCheckOut}
                    onChange={(e) => setHotelCheckOut(e.target.value)}
                    className="glass-input pl-9 pr-1 pt-7 pb-2 w-full text-[10px] font-bold text-dark-text focus:outline-none rounded-none"
                  />
                </div>
              </div>
 
              {/* Submit */}
              <div className="lg:col-span-3">
                <button type="submit" className="btn-gold w-full py-4 h-full rounded-none font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>
        )}
 
        {/* Packages Booking Panel */}
        {activeTab === 'packages' && (
          <form onSubmit={handlePackageSearch} className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E0D8] pb-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Curated Luxury Itineraries & Tour Packages
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-600">
                  <span>Category:</span>
                  <select
                    value={pkgCategory}
                    onChange={(e) => setPkgCategory(e.target.value)}
                    className="bg-white border border-[#E5E0D8] text-dark-text rounded-none px-3 py-1 outline-none font-bold cursor-pointer text-[10px]"
                  >
                    <option value="luxury">Luxury</option>
                    <option value="honeymoon">Honeymoon</option>
                    <option value="adventure">Adventure</option>
                    <option value="international">International</option>
                    <option value="domestic">Domestic</option>
                  </select>
                </div>
              </div>
            </div>
 
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* Destination */}
              <div className="lg:col-span-5 relative">
                <label className="absolute top-2 left-4 text-[10px] font-serif italic text-stone-500 lowercase tracking-wide">destination</label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="text"
                    value={pkgDestination}
                    onChange={(e) => setPkgDestination(e.target.value)}
                    className="glass-input pl-10 pt-7 pb-2 w-full font-bold text-xs text-dark-text focus:outline-none rounded-none"
                    placeholder="Where would you like to explore?"
                  />
                </div>
              </div>
 
              {/* Month of Travel */}
              <div className="lg:col-span-4 relative">
                <label className="absolute top-2 left-4 text-[10px] font-serif italic text-stone-500 lowercase tracking-wide">travel period</label>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-7 pointer-events-none" />
                  <input
                    type="month"
                    value={pkgDate}
                    onChange={(e) => setPkgDate(e.target.value)}
                    className="glass-input pl-10 pt-7 pb-2 w-full font-bold text-xs text-dark-text focus:outline-none rounded-none"
                  />
                </div>
              </div>
 
              {/* Submit */}
              <div className="lg:col-span-3">
                <button type="submit" className="btn-gold w-full py-4 h-full rounded-none font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
