import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  Send,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">

      {/* World Map */}
       <div
    className="absolute inset-0 z-99"
    style={{
      backgroundImage: "url('/footer-bg.webp')",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "80%",
      opacity: 1,
    }}
  />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/20" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px]" />

      <div className="relative z-10">

        {/* TOP CTA */}
        {/* <div className="max-w-7xl mx-auto px-6 pt-20">

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-[40px] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">

            <div>
              <span className="uppercase tracking-[4px] text-white/80 text-xs font-bold">
                Travel With Confidence
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
                Ready For Your Next Adventure?
              </h2>

              <p className="text-white/80 mt-3 max-w-xl">
                Discover curated luxury vacations,
                premium travel experiences and
                unforgettable journeys with Nishtha Travel.
              </p>
            </div>

            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all">
              Start Planning
            </button>

          </div>
        </div> */}

        {/* MAIN FOOTER */}
        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-5 gap-12">

            {/* BRAND */}
            <div className="lg:col-span-2">

              <Link
                to="/"
                className="flex items-center gap-4"
              >
                <div className=" flex items-center justify-center">
                  <img
                      src="/logo.png"
                      alt="Nishtha Travel Logo"
                      className="w-24 h-16 object-contain"
                    />
                </div>

                <div>
                  <h3 className="text-[24px] font-extrabold tracking-[0.1em] font-sans text-white group-hover:text-brand-blue transition-colors block leading-tight">
                    NISHTHA TRAVEL
                  </h3>

                  <span className="text-[16px] block font-bold tracking-[0.2em] uppercase text-purple-600 -mt-0.5 leading-none">
                    Concierge PVT. LTD.
                  </span>
                </div>
              </Link>

              <p className="text-slate-400 mt-6 max-w-md leading-relaxed">
                Nishtha Travel Concierge specializes
                in luxury travel experiences, premium
                holiday packages, international tours,
                visa facilitation and bespoke travel planning.
              </p>

              {/* Social */}
              <div className="flex gap-4 mt-8">

                {[Instagram, Facebook, Twitter, Globe].map(
                  (Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="
                      w-11 h-11
                      rounded-full
                      bg-white/5
                      border
                      border-white/10
                      hover:bg-yellow-400
                      hover:text-black
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                    "
                    >
                      <Icon size={18} />
                    </a>
                  )
                )}

              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-6">
                Services
              </h4>

              <ul className="space-y-4 text-slate-400">
                <li><Link to="/flights">Luxury Flights</Link></li>
                <li><Link to="/hotels">Premium Hotels</Link></li>
                <li><Link to="/packages">Holiday Packages</Link></li>
                <li><Link to="/about">Corporate Travel</Link></li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-6">
                Company
              </h4>

              <ul className="space-y-4 text-slate-400">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><a href="#">Travel Journal</a></li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>

              <h4 className="text-white font-bold uppercase tracking-wider mb-6">
                Contact
              </h4>

              <div className="space-y-4 text-slate-400">

                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span>
                    Gurgaon, Haryana, India
                  </span>
                </div>

                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <span>+91 99999 99999</span>
                </div>

                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <span>info@nishthatravel.com</span>
                </div>

              </div>

              {/* Newsletter */}
              <div className="mt-8">

                <form
                  onSubmit={handleSubscribe}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    required
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Your Email"
                    className="
                      flex-1
                      bg-white/5
                      border
                      border-white/10
                      rounded-full
                      px-5
                      py-3
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                    "
                  />

                  <button
                    type="submit"
                    className="
                      bg-yellow-400
                      text-black
                      rounded-full
                      px-5
                      py-3
                      font-bold
                    "
                  >
                    <Send size={18} />
                  </button>
                </form>

                {subscribed && (
                  <p className="text-green-400 text-sm mt-3">
                    ✓ Successfully subscribed
                  </p>
                )}
              </div>

            </div>

          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">

            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Nishtha Travel Concierge.
              All rights reserved.
            </p>

            <div className="flex gap-6 text-slate-500 text-sm">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Support</a>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};