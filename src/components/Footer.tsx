import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Globe, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-white border-t border-soft-border pt-16 pb-8 relative overflow-hidden">
      {/* Decorative radial gradients for luxury atmosphere */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-white to-slate-100 shadow-luxury group-hover:scale-105 transition-all border border-soft-border">
                <img
                  src="/favicon.svg"
                  alt="Nishtha Travel Logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <span className="text-sm font-extrabold tracking-wider font-sans text-brand-blue group-hover:text-brand-purple transition-colors block leading-tight">
                  NISHTHA
                </span>
                <span className="text-[8px] block font-semibold tracking-[0.18em] uppercase text-brand-purple -mt-0.5 leading-none">
                  Travel Concierge
                </span>
              </div>
            </Link>
            <p className="text-slate-500 text-xs max-w-sm leading-relaxed font-medium">
              Nishtha Travel Concierge Pvt Ltd is an international premier luxury concierge, crafting elite global flight suites, custom-tailored holiday tours, and visa facilitation services.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-50 border border-soft-border hover:border-brand-purple/50 hover:bg-brand-purple/5 text-slate-500 hover:text-brand-purple flex items-center justify-center transition-all shadow-sm">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-50 border border-soft-border hover:border-brand-purple/50 hover:bg-brand-purple/5 text-slate-500 hover:text-brand-purple flex items-center justify-center transition-all shadow-sm">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-50 border border-soft-border hover:border-brand-purple/50 hover:bg-brand-purple/5 text-slate-500 hover:text-brand-purple flex items-center justify-center transition-all shadow-sm">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-50 border border-soft-border hover:border-brand-purple/50 hover:bg-brand-purple/5 text-slate-500 hover:text-brand-purple flex items-center justify-center transition-all shadow-sm">
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick links - Travel */}
          <div>
            <h4 className="text-dark-text font-bold text-xs uppercase tracking-wider mb-5">Premium Services</h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <Link to="/flights" className="text-slate-500 hover:text-brand-purple transition-colors">Book Luxury Flights</Link>
              </li>
              <li>
                <Link to="/hotels" className="text-slate-500 hover:text-brand-purple transition-colors">Elite Resorts & Lodges</Link>
              </li>
              <li>
                <Link to="/packages" className="text-slate-500 hover:text-brand-purple transition-colors">Holiday Packages</Link>
              </li>
              <li>
                <Link to="/visa" className="text-slate-500 hover:text-brand-purple transition-colors">Visa Services</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-500 hover:text-brand-purple transition-colors">Corporate Travel</Link>
              </li>
            </ul>
          </div>

          {/* Quick links - Company */}
          <div>
            <h4 className="text-dark-text font-bold text-xs uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <Link to="/about" className="text-slate-500 hover:text-brand-purple transition-colors">About Story</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-500 hover:text-brand-purple transition-colors">Contact Hub</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-500 hover:text-brand-purple transition-colors">Lounge Access</Link>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-purple transition-colors">Luxury Journal</a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-brand-purple transition-colors">Privacy Guarantee</a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-5">
            <h4 className="text-dark-text font-bold text-xs uppercase tracking-wider">Office Details</h4>
            <div className="space-y-3 text-xs text-slate-500 font-semibold leading-relaxed">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                <span>
                  H.No. - C 355, Gali No 5, Bhoop Singh Nagar, Jail Road, Near IOC Gas Plant, PO Bhondsi, Gurgaon - 122102
                </span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-brand-purple shrink-0" />
                <span>+91 99999 99999</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-brand-purple shrink-0" />
                <span>concierge@nishthatravel.com</span>
              </div>
            </div>
            
            {/* Direct Newsletter inside footer */}
            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="flex gap-1.5 max-w-xs">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Private Email Dispatch"
                  className="bg-slate-50 border border-soft-border rounded-lg px-3 py-1.5 text-xs text-dark-text placeholder-slate-400 focus:outline-none focus:border-brand-purple w-full"
                />
                <button type="submit" className="p-2 rounded-lg bg-brand-blue hover:bg-brand-purple text-white transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <span className="text-[10px] text-emerald-500 font-bold block mt-1.5">✓ Dispatched successfully!</span>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-soft-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] font-semibold text-slate-400">
          <div>
            <span>© {new Date().getFullYear()} Nishtha Travel Concierge Pvt Ltd. All Rights Reserved.</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-purple transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Gurgaon Administration</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
