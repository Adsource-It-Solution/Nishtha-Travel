import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Luggage, Plus, Trash2, Key, Save, AlertCircle, CheckCircle } from 'lucide-react';

interface ItineraryDay {
  day: number;
  title: string;
  details: string;
}

export const AdminPackagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('nishtha-admin');
  const [isAuthorized, setIsAuthorized] = useState(true);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [destination, setPkgDestination] = useState('');
  const [country, setCountry] = useState('');
  const [duration, setDuration] = useState('5 Days, 4 Nights');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('luxury');
  const [tourType, setTourType] = useState('Group Tour');
  const [featuresInput, setFeaturesInput] = useState('Private Pool, Resort Stay, Butler Service');
  const [inclusionsInput, setInclusionsInput] = useState('Flight, Hotel, Guided tours, Airport Transfer');
  const [itineraryDesc, setItineraryDesc] = useState('');
  
  // Itinerary Days State
  const [days, setDays] = useState<ItineraryDay[]>([
    { day: 1, title: 'Arrival & Welcome Briefing', details: 'Touchdown and receive VIP escort transfer. Check into your premium resort, followed by sunset cocktails.' }
  ]);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleAddDay = () => {
    setDays([...days, { day: days.length + 1, title: '', details: '' }]);
  };

  const handleRemoveDay = (index: number) => {
    const newDays = days.filter((_, i) => i !== index).map((d, i) => ({
      ...d,
      day: i + 1
    }));
    setDays(newDays);
  };

  const handleDayChange = (index: number, field: 'title' | 'details', value: string) => {
    const newDays = [...days];
    newDays[index][field] = value;
    setDays(newDays);
  };

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'nishtha-admin') {
      setIsAuthorized(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid administrative passcode credentials');
    }
  };

  const handlePublishPackage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !destination || !price || !duration || !itineraryDesc) {
      setErrorMsg('Please fill out all required fields: Title, Destination, Price, Duration, and Itinerary Overview.');
      return;
    }

    // Prepare arrays
    const features = featuresInput.split(',').map(s => s.trim()).filter(Boolean);
    const includedServices = inclusionsInput.split(',').map(s => s.trim()).filter(Boolean);

    // Validate days
    const incompleteDay = days.find(d => !d.title || !d.details);
    if (incompleteDay) {
      setErrorMsg(`Please fill out the details for Day ${incompleteDay.day}.`);
      return;
    }

    const payload = {
      title,
      destination,
      country,
      duration,
      price: Number(price),
      image: image || undefined,
      category,
      tourType,
      features,
      includedServices,
      itinerary: {
        description: itineraryDesc,
        highlights: features, // Using features as highlights for simplicity
        days,
        faqs: [
          { question: "Is this tour package customizable?", answer: "Yes, every day itinerary details can be tailormade by our destination concierge desk." }
        ]
      }
    };

    fetch(`${apiUrl}/api/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-passcode': passcode
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.message || 'Verification failed') });
        }
        return res.json();
      })
      .then(data => {
        setSuccessMsg(`Package "${data.title}" has been successfully published to the GDS collection!`);
        setErrorMsg('');
        // Reset form
        setTitle('');
        setPkgDestination('');
        setCountry('');
        setPrice('');
        setImage('');
        setItineraryDesc('');
        setDays([{ day: 1, title: 'Arrival & Welcome Briefing', details: 'Touchdown and receive VIP escort transfer. Check into your premium resort, followed by sunset cocktails.' }]);
        
        setTimeout(() => {
          setSuccessMsg('');
          navigate('/packages');
        }, 3000);
      })
      .catch(err => {
        console.error('Error creating package:', err);
        setErrorMsg(err.message || 'There was an error communicating with the server.');
      });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[280px] bg-slate-900 overflow-hidden flex items-center justify-center pt-10">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 to-brand-purple/90" />
        <div className="relative z-10 text-center max-w-2xl px-6">
          <Luggage className="w-10 h-10 text-yellow-400 mx-auto" />
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 font-serif">Admin Concierge Desk</h1>
          <p className="text-white/70 text-xs sm:text-sm mt-2">Publish customized itineraries and packages directly to nishtha-travel GDS databases.</p>
        </div>
      </section>

      {/* Auth wrapper */}
      <section className="mt-12 max-w-4xl mx-auto px-6">
        {!isAuthorized ? (
          <div className="bg-white border border-[#E5E0D8] rounded-[24px] p-8 max-w-md mx-auto shadow-luxury">
            <div className="text-center mb-6">
              <Key className="w-8 h-8 text-brand-purple mx-auto mb-2" />
              <h3 className="text-lg font-bold text-slate-800 font-serif">Administrative Verification</h3>
              <p className="text-xs text-slate-500 mt-1">Please enter your assigned administrative passcode to modify itineraries.</p>
            </div>
            
            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Admin Passcode"
                className="glass-input px-4 py-3 w-full text-center text-xs font-semibold focus:border-brand-purple focus:outline-none"
              />
              {errorMsg && (
                <div className="text-red-600 text-xs flex items-center gap-1.5 justify-center font-medium">
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}
              <button type="submit" className="btn-navy w-full rounded-xl">Verify Passcode</button>
            </form>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handlePublishPackage} className="space-y-8">
            
            {/* Success/Error Alerts */}
            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-2xl flex items-center gap-3 font-bold text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-5 rounded-2xl flex items-center gap-3 font-bold text-sm animate-pulse">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Specifications */}
            <div className="bg-white border border-[#E5E0D8] rounded-[24px] p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-serif">Package Specifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Package Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Scenic Himachal Luxury Tour"
                    className="glass-input px-4 py-3 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Destination City/Region</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setPkgDestination(e.target.value)}
                    placeholder="e.g. Manali & Shimla"
                    className="glass-input px-4 py-3 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. India"
                    className="glass-input px-4 py-3 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Duration</label>
                    <input
                      type="text"
                      required
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 5 Days, 4 Nights"
                      className="glass-input px-4 py-3 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Price (INR / Person)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 18500"
                      className="glass-input px-4 py-3 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="glass-input px-4 py-3 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple bg-white cursor-pointer"
                  >
                    <option value="luxury">Ultra Luxury</option>
                    <option value="honeymoon">Honeymoon Romantic</option>
                    <option value="adventure">Adventure Sports</option>
                    <option value="domestic">Heritage & Domestic</option>
                    <option value="international">International Escape</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tour Configuration</label>
                  <input
                    type="text"
                    value={tourType}
                    onChange={(e) => setTourType(e.target.value)}
                    placeholder="e.g. Private Custom Tour, Group Tour"
                    className="glass-input px-4 py-3 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Banner Image URL</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... (optional)"
                    className="glass-input px-4 py-3 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Features and Inclusions */}
            <div className="bg-white border border-[#E5E0D8] rounded-[24px] p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-serif">Inclusions & Highlights</h3>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Package Highlights (Comma separated)</label>
                  <input
                    type="text"
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    placeholder="e.g. Private pool, Butler service, Helicopter tour"
                    className="glass-input px-4 py-3 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Inclusions details (Comma separated)</label>
                  <input
                    type="text"
                    value={inclusionsInput}
                    onChange={(e) => setInclusionsInput(e.target.value)}
                    placeholder="e.g. Hotel stay, transfers, 3 meals, entry tickets"
                    className="glass-input px-4 py-3 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Itinerary Overview & Daily Details */}
            <div className="bg-white border border-[#E5E0D8] rounded-[24px] p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 font-serif">Voyage Itinerary Builder</h3>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Itinerary Description Overview</label>
                  <textarea
                    required
                    rows={3}
                    value={itineraryDesc}
                    onChange={(e) => setItineraryDesc(e.target.value)}
                    placeholder="Provide a general summary of what makes this holiday package spectacular..."
                    className="glass-input px-4 py-3 w-full text-xs font-semibold focus:outline-none focus:border-brand-purple resize-none"
                  />
                </div>

                {/* Day listings */}
                <div className="space-y-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daily Schedule Breakdown</span>
                    <button
                      type="button"
                      onClick={handleAddDay}
                      className="flex items-center gap-1 text-xs text-brand-purple font-bold hover:underline focus:outline-none"
                    >
                      <Plus size={16} />
                      <span>Add Next Day</span>
                    </button>
                  </div>

                  {days.map((day, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-[#E5E0D8] rounded-xl relative space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="bg-brand-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          Day {day.day}
                        </span>
                        {days.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDay(idx)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <input
                          type="text"
                          required
                          value={day.title}
                          onChange={(e) => handleDayChange(idx, 'title', e.target.value)}
                          placeholder={`Day ${day.day} Title (e.g. Scenic Drive to Manali)`}
                          className="glass-input px-4 py-2.5 w-full text-xs font-semibold focus:outline-none bg-white focus:border-brand-purple"
                        />
                        <textarea
                          required
                          rows={2}
                          value={day.details}
                          onChange={(e) => handleDayChange(idx, 'details', e.target.value)}
                          placeholder={`Day ${day.day} Details (explain coordinates, sightseeing activities, meals, hotel info...)`}
                          className="glass-input px-4 py-2.5 w-full text-xs font-semibold focus:outline-none bg-white focus:border-brand-purple resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Save bar */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/packages')}
                className="px-6 py-3 border border-slate-350 text-slate-600 rounded-xl font-bold uppercase tracking-wider text-xs bg-white hover:bg-slate-50"
              >
                Discard
              </button>
              <button
                type="submit"
                className="btn-gold flex items-center justify-center gap-2 rounded-xl !py-3.5 !px-8 text-xs uppercase tracking-wider font-extrabold"
              >
                <Save className="w-4 h-4" />
                <span>Publish GDS Itinerary</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
