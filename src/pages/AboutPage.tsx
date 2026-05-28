import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, HeartHandshake, Award, Sparkles, Globe, Gem } from 'lucide-react';
import { AnimatedCounters } from '../components/AnimatedCounters';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-brand-light relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Cinematic Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-brand-purple/10 border border-brand-purple/20 text-brand-purple"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Our Heritage</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-brand-blue tracking-tight leading-tight"
          >
            Crafting Bespoke <br />
            <span className="text-brand-purple italic">Luxury Experiences</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 font-light text-sm sm:text-base leading-relaxed"
          >
            Established in Gurgaon, Nishtha Travel Concierge Pvt Ltd delivers customized, premium global travel services for discerning travelers who seek exclusivity, adventure, and flawless detail.
          </motion.p>
        </div>

        {/* Brand Narrative / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">Concierge Legacy</span>
            <h2 className="text-3xl font-serif text-brand-blue tracking-tight leading-tight">
              An International Signature of Trust
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              At Nishtha Travel Concierge, we believe that traveling is an art. We are not just a booking agency; we are architectural curators of your journeys. Our dedicated experts collaborate globally to secure private aviation channels, premium suite upgrades, custom yachts, and accelerated visa clearances.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              Whether arranging a honeymoon getaway in the Maldives, an elite business assembly in London, or an adventure through alpine sanctuaries, we manage every detail with complete exclusivity and absolute privacy.
            </p>
            
            <div className="flex gap-4 items-center pt-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-none bg-brand-light border border-[#E5E0D8] text-brand-blue">
                <Gem className="w-5 h-5 text-brand-purple animate-pulse" />
              </div>
              <div>
                <h4 className="font-serif text-brand-blue text-sm">Ultra-Bespoke Standard</h4>
                <p className="text-slate-500 text-xs mt-0.5">Custom itineraries tailor-made from the ground up</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative rounded-none overflow-hidden border border-[#E5E0D8] aspect-[4/3] max-h-[450px]"
          >
            <img
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80"
              alt="Discerning luxury travel concierge advising elite client"
              className="w-full h-full object-cover brightness-[0.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/30 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Counter Stats Section */}
        <div className="py-8 border-y border-[#E5E0D8]">
          <AnimatedCounters />
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs text-brand-purple font-bold uppercase tracking-widest block">Signature Creed</span>
            <h3 className="text-2xl sm:text-3xl font-serif text-brand-blue">What Defines Our Service</h3>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Every itinerary designed by our team is anchored in four core promises to guarantee travel perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Absolute Protection',
                desc: 'Premium coverage, flexible cancellations, and all-day flight delay safeguards keep your travel secure.'
              },
              {
                icon: Compass,
                title: 'Bespoke Curations',
                desc: 'No templates. Every holiday resort and transit suite is hand-picked to match your exact taste.'
              },
              {
                icon: HeartHandshake,
                title: 'Unrivaled Assistance',
                desc: 'Our Gurgaon office and global network supply round-the-clock emergency support, direct by text.'
              },
              {
                icon: Award,
                title: 'Exclusive Access',
                desc: 'Earn invitations to elite lounges, yacht cruises, private villas, and first-class check-in routes.'
              }
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card p-6 flex flex-col items-center text-center space-y-4 hover:border-brand-purple transition-all duration-300 shadow-none rounded-none bg-white border border-[#E5E0D8]"
                >
                  <div className="w-10 h-10 rounded-none bg-brand-light border border-[#E5E0D8] text-brand-purple flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-brand-blue text-sm uppercase tracking-wider">{value.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-light">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Corporate / B2B Concierge Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden bg-brand-blue border border-brand-purple/20 text-white rounded-none shadow-none"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-none bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-brand-purple" />
                <span>B2B & Corporate Accounts</span>
              </span>
              <h3 className="text-2xl md:text-3xl font-serif leading-tight text-white">
                Corporate Jet & Travel Management
              </h3>
              <p className="text-slate-300 text-xs md:text-sm max-w-2xl font-light leading-relaxed">
                Empower your business executives with elite flight suite allocations, fast-tracked corporate visa assistance, priority lounge registrations, and 24/7 billing dispatch from our Gurgaon headquarters.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="/contact"
                className="btn-gold rounded-none"
              >
                Inquire B2B Account
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
