import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Luggage, ClipboardList, Plus, Trash2, Save, FileText, CheckCircle, Mail, Phone, Calendar, MapPin, AlertCircle } from 'lucide-react';

interface ItineraryDay {
  day: number;
  title: string;
  details: string;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'requirements' | 'publish'>('requirements');
  const [authorized, setAuthorized] = useState(false);

  // Requirement Enquiries state
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(true);

  // Itinerary Day Publisher States
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
  const [days, setDays] = useState<ItineraryDay[]>([
    { day: 1, title: 'Arrival & Welcome Briefing', details: 'Touchdown and receive VIP escort transfer. Check into your premium resort, followed by sunset cocktails.' }
  ]);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Check administrative authorization
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (authorized && activeTab === 'requirements') {
      fetchEnquiries();
    }
  }, [authorized, activeTab]);

  const fetchEnquiries = () => {
    setEnquiriesLoading(true);
    fetch(`${apiUrl}/api/enquiries`)
      .then(res => res.json())
      .then(data => {
        // Sort newest first
        setEnquiries(data.reverse());
        setEnquiriesLoading(false);
      })
      .catch(err => {
        console.error('Error fetching enquiries:', err);
        setEnquiriesLoading(false);
      });
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    // Send PUT status request to backend GDS
    // Since our backend saves directly, we update server state and fetch again
    const payload = { status: newStatus };
    fetch(`${apiUrl}/api/enquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(() => {
        fetchEnquiries();
      })
      .catch(err => {
        console.error('Error updating status:', err);
      });
  };

  // Itinerary publishers
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

  const handlePublishPackage = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!title || !destination || !price || !duration || !itineraryDesc) {
      setErrorMsg('Required parameters missing: Title, Destination, Price, Duration, Itinerary.');
      return;
    }

    const incompleteDay = days.find(d => !d.title || !d.details);
    if (incompleteDay) {
      setErrorMsg(`Day ${incompleteDay.day} information is incomplete.`);
      return;
    }

    const payload = {
      title,
      destination,
      country: country || 'Unknown',
      duration,
      price: Number(price),
      image: image || undefined,
      category,
      tourType,
      features: featuresInput.split(',').map(s => s.trim()).filter(Boolean),
      includedServices: inclusionsInput.split(',').map(s => s.trim()).filter(Boolean),
      itinerary: {
        description: itineraryDesc,
        highlights: featuresInput.split(',').map(s => s.trim()).filter(Boolean),
        days,
        faqs: [{ question: "Is this package customizable?", answer: "Yes, our luxury concierges tailormake this according to your requirements." }]
      }
    };

    const adminToken = localStorage.getItem('adminToken') || 'nishtha-admin';

    fetch(`${apiUrl}/api/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-passcode': adminToken
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Could not publish package. Check credentials.');
        return res.json();
      })
      .then(data => {
        setSuccessMsg(`Travel Package "${data.title}" successfully published!`);
        // Reset form
        setTitle('');
        setPkgDestination('');
        setCountry('');
        setPrice('');
        setImage('');
        setItineraryDesc('');
        setDays([{ day: 1, title: 'Arrival & Welcome Briefing', details: 'Touchdown and receive VIP escort transfer. Check into your premium resort, followed by sunset cocktails.' }]);
        setTimeout(() => setSuccessMsg(''), 3000);
      })
      .catch(err => {
        console.error('Error creating package:', err);
        setErrorMsg(err.message || 'Error publishing package.');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <Navbar />

      <section className="relative h-[260px] bg-slate-900 overflow-hidden flex items-center justify-center pt-12">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 to-brand-purple/95" />
        <div className="relative z-10 text-center px-6 space-y-2 max-w-xl">
          <Luggage className="w-10 h-10 text-yellow-400 mx-auto" />
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">Admin Concierge Panel</h1>
          <p className="text-white/70 text-xs sm:text-sm">Manage user travel requirements, enquiries, and Holiday Package itineraries.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-8 flex justify-between items-center flex-wrap gap-4 border-b border-slate-200 pb-2">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('requirements')}
            className={`flex items-center gap-2 pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'requirements'
                ? 'border-brand-purple text-brand-purple font-bold'
                : 'border-transparent text-slate-500 hover:text-brand-purple'
              }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Travel Requirements ({enquiries.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('publish')}
            className={`flex items-center gap-2 pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'publish'
                ? 'border-brand-purple text-brand-purple font-bold'
                : 'border-transparent text-slate-500 hover:text-brand-purple'
              }`}
          >
            <Plus className="w-4 h-4" />
            <span>Publish Holiday Package</span>
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs font-bold text-red-600 hover:underline uppercase tracking-wider"
        >
          Logout Session
        </button>
      </div>

      <section className="max-w-6xl mx-auto px-6 mt-8">

        {activeTab === 'requirements' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-serif text-brand-blue">Active Client Enquiries</h2>
              <button onClick={fetchEnquiries} className="text-xs text-brand-purple font-bold hover:underline">Refresh List</button>
            </div>

            {enquiriesLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-white border border-slate-200 h-40 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : enquiries.length > 0 ? (
              <div className="space-y-6">
                {enquiries.map((enq) => {
                  const isPackage = enq.packageId && enq.packageId !== 'general';
                  const isCab = enq.cabId;

                  return (
                    <div key={enq.id} className="bg-white border border-[#E5E0D8] rounded-[24px] p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-4 flex-grow">
                        {/* Tags */}
                        <div className="flex items-center gap-2.5 flex-wrap">
                          {isCab ? (
                            <span className="px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em] bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Chauffeur Requirement
                            </span>
                          ) : isPackage ? (
                            <span className="px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em] bg-yellow-50 text-yellow-750 border border-yellow-200">
                              Holiday Package Enquiry
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em] bg-blue-50 text-brand-blue border border-blue-200">
                              General Enquiry
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-semibold">ID: #{enq.id.substring(4, 10)}</span>
                          <span className="text-[10px] text-slate-400">• Submitted: {new Date(enq.submittedAt).toLocaleDateString()}</span>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-slate-900 font-serif">
                            {isCab ? `Cab Fleet Reservation: ${enq.cabName}` : isPackage ? `Bespoke Voyage: ${enq.packageName}` : 'General Inquiry'}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-slate-100 py-3.5 text-xs text-slate-650">
                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block">Client Coordinates</span>
                            <div className="font-bold flex items-center gap-1.5 text-slate-900">
                              <span>{enq.name}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <Mail size={12} />
                              <span>{enq.email}</span>
                            </div>
                            {enq.phone && (
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                <Phone size={12} />
                                <span>{enq.phone}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block">Travel Details</span>
                            {isCab ? (
                              <>
                                <div className="font-semibold text-slate-900 flex items-start gap-1">
                                  <MapPin size={12} className="mt-0.5 shrink-0 text-brand-purple" />
                                  <span>{enq.pickup} → {enq.dropoff}</span>
                                </div>
                                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                                  <Calendar size={12} />
                                  <span>{enq.date} at {enq.time} ({enq.tripType} transfer)</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="font-semibold text-slate-900 flex items-center gap-1">
                                  <Calendar size={12} className="text-brand-purple" />
                                  <span>Preferred Date: {enq.travelDate || 'Flexible'}</span>
                                </div>
                                {isPackage && <span className="text-[11px] text-slate-550">Destination: {enq.message.split('Guests:')[0] || ''}</span>}
                              </>
                            )}
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold block">Special Requirements / Message</span>
                            <p className="text-[11px] leading-relaxed italic text-slate-600 line-clamp-3">
                              "{enq.message || 'No additional notes provided.'}"
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="md:border-l border-slate-100 md:pl-6 min-w-[150px] flex flex-col justify-center items-start md:items-end gap-3">
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase tracking-widest block mb-1">Status</span>
                          <select
                            value={enq.status || 'Pending'}
                            onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                            className="bg-white border border-[#E5E0D8] text-xs font-bold rounded-lg px-3 py-1.5 focus:border-brand-purple focus:outline-none cursor-pointer"
                          >
                            <option value="Pending Review">Pending Review</option>
                            <option value="Contacted Client">Contacted Client</option>
                            <option value="Quote Sent">Quote Sent</option>
                            <option value="Closed / Done">Closed / Done</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-[#E5E0D8] rounded-[24px] p-16 text-center">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-xl font-bold text-slate-800 mt-4 font-serif">No Requirements Received</h3>
                <p className="text-slate-500 text-sm mt-1">When clients request cabs or package quotes, they will appear here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'publish' && (
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handlePublishPackage} className="space-y-8">

              {successMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-2xl flex items-center gap-3 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-5 rounded-2xl flex items-center gap-3 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

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

              {/* Itinerary */}
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
                            placeholder={`Day ${day.day} Title`}
                            className="glass-input px-4 py-2.5 w-full text-xs font-semibold focus:outline-none bg-white focus:border-brand-purple"
                          />
                          <textarea
                            required
                            rows={2}
                            value={day.details}
                            onChange={(e) => handleDayChange(idx, 'details', e.target.value)}
                            placeholder={`Day ${day.day} Details`}
                            className="glass-input px-4 py-2.5 w-full text-xs font-semibold focus:outline-none bg-white focus:border-brand-purple resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="btn-gold flex items-center justify-center gap-2 rounded-xl !py-3.5 !px-8 text-xs uppercase tracking-wider font-extrabold"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish GDS Itinerary</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};
