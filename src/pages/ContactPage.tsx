import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'packages', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', phone: '', service: 'packages', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-brand-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] text-brand-purple font-bold uppercase tracking-[0.2em] block">Concierge Hub</span>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-blue tracking-tight leading-tight">Connect With Us</h1>
          <p className="text-slate-600 font-light text-sm leading-relaxed">
            Reach our luxury travel desk at our Gurgaon office or submit a booking request. A dedicated digital coordinator will reply within 15 minutes.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Phone,
              title: 'Direct Hotlines',
              val1: '+91 99999 99999',
              val2: '+91 88888 88888',
              label: 'WhatsApp Call Enabled'
            },
            {
              icon: Mail,
              title: 'Digital Desks',
              val1: 'concierge@nishthatravel.com',
              val2: 'booking@nishthatravel.com',
              label: 'All communications encrypted'
            },
            {
              icon: Clock,
              title: 'Active Operations',
              val1: 'Monday – Saturday',
              val2: '09:00 AM – 08:00 PM IST',
              label: '24/7 client dispatch backup'
            }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 flex flex-col items-center text-center space-y-4 hover:border-brand-purple transition-all duration-300 shadow-none rounded-none bg-white border border-[#E5E0D8]"
              >
                <div className="w-10 h-10 rounded-none bg-brand-light border border-[#E5E0D8] text-brand-purple flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-brand-blue text-xs uppercase tracking-wider">{card.title}</h4>
                <div className="space-y-1 text-slate-700 text-sm font-semibold">
                  <div>{card.val1}</div>
                  <div>{card.val2}</div>
                </div>
                <span className="text-[10px] text-slate-500 font-normal uppercase tracking-wider block border-t border-[#E5E0D8] pt-3 w-full">
                  {card.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Main Grid: Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card p-8 space-y-6 shadow-none rounded-none bg-white border border-[#E5E0D8]"
          >
            <div className="border-b border-[#E5E0D8] pb-4">
              <h3 className="text-lg font-serif text-brand-blue uppercase tracking-wide">Request Bespoke Consultation</h3>
              <p className="text-slate-500 text-xs mt-1 leading-normal font-light">Submit your parameters to receive a custom flight & package itinerary.</p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-none bg-brand-light border border-[#E5E0D8] flex items-center justify-center mx-auto text-brand-purple animate-pulse">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif text-brand-blue">Request Dispatched</h4>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto font-light leading-relaxed">
                    Thank you. Your bespoke parameters have been successfully queued. A Nishtha Travel coordinator is reviewing details now.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-brand-purple uppercase tracking-[0.15em] block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="glass-input w-full text-xs font-semibold rounded-none focus:border-brand-purple"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-brand-purple uppercase tracking-[0.15em] block">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="glass-input w-full text-xs font-semibold rounded-none focus:border-brand-purple"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-brand-purple uppercase tracking-[0.15em] block">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="glass-input w-full text-xs font-semibold rounded-none focus:border-brand-purple"
                        placeholder="+91 99999 99999"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-brand-purple uppercase tracking-[0.15em] block">Select Service</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="glass-input w-full text-xs font-semibold bg-white cursor-pointer rounded-none focus:border-brand-purple"
                      >
                        <option value="packages">Custom Holiday Packages</option>
                        <option value="flights">First & Business Class Flights</option>
                        <option value="hotels">Luxury Resorts & Sanctuaries</option>
                        <option value="visa">Visa Fast-Track Assistance</option>
                        <option value="b2b">Corporate / B2B Accounts</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-brand-purple uppercase tracking-[0.15em] block">Trip Requirements / Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="glass-input w-full text-xs font-semibold rounded-none focus:border-brand-purple"
                      placeholder="Detail dates, destinations, travelers, flight cabins, or visa assistance..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full rounded-none"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Gurgaon Office and Mock Maps Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Address Details Card */}
            <div className="glass-card p-6 space-y-4 shadow-none rounded-none bg-white border border-[#E5E0D8]">
              <h4 className="text-[9px] font-bold text-brand-purple uppercase tracking-[0.15em]">Nishtha Headquarters</h4>
              
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-serif text-brand-blue text-sm">Gurgaon Corporate Office</h5>
                  <p className="text-slate-600 text-xs mt-1.5 leading-relaxed font-light">
                    H.No. - C 355, Gali No 5, Bhoop Singh Nagar, Jail Road, Near IOC Gas Plant, PO Bhondsi, Gurgaon - 122102
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Action CTA */}
              <div className="border-t border-[#E5E0D8] pt-4">
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-none bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-none"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Interactive Map Preview Card */}
            <div className="glass-card p-4 h-60 relative overflow-hidden bg-brand-light flex items-center justify-center border border-[#E5E0D8] rounded-none shadow-none group">
              {/* Luxury Map Graphic Mockup */}
              <div className="absolute inset-0 z-0 opacity-40">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
                  alt="City Grid Map"
                  className="w-full h-full object-cover grayscale"
                />
              </div>

              {/* Glowing Brand Pointer overlay */}
              <div className="relative z-10 text-center space-y-2">
                <div className="w-12 h-12 rounded-none bg-brand-light border border-brand-purple/40 flex items-center justify-center mx-auto shadow-none animate-bounce">
                  <MapPin className="w-6 h-6 text-brand-purple fill-white" />
                </div>
                <div className="px-3 py-1 rounded-none bg-white shadow-none text-[9px] font-bold text-brand-blue uppercase tracking-widest border border-[#E5E0D8]">
                  Jail Road, Gurgaon
                </div>
              </div>

              <div className="absolute bottom-2 right-2 z-10 px-2 py-1 rounded bg-slate-800/80 text-[8px] font-bold text-white uppercase tracking-wider pointer-events-none">
                Interactive Mockup Map
              </div>
            </div>

            {/* Security Assurance */}
            <div className="glass-card p-5 flex gap-4 items-start bg-white border border-[#E5E0D8] rounded-none shadow-none">
              <ShieldCheck className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.15em]">Secure Communication</h5>
                <p className="text-[10px] text-slate-600 mt-1.5 leading-relaxed font-light">
                  All passport uploads, visa inquiry requests, and itinerary formulations submitted to our Gurgaon desk are protected by enterprise AES-256 cloud encryption protocols.
                </p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
};
