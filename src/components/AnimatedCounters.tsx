import React from 'react';
import { motion } from 'framer-motion';
import { mockTravelStats } from '../data/mockData';
import { Star, Award, Compass, ShieldCheck } from 'lucide-react';

const icons = [Compass, Award, ShieldCheck, Star];

export const AnimatedCounters: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {mockTravelStats.map((stat, idx) => {
        const IconComponent = icons[idx] || Compass;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card p-6 text-center hover:border-brand-yellow-500/20 transition-all duration-300 relative group overflow-hidden"
          >
            {/* Background glowing line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent group-hover:w-2/3 transition-all duration-300" />
            
            <div className="w-10 h-10 rounded-xl bg-yellow-500/5 border border-blue-500/10 text-yellow-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <IconComponent className="w-5 h-5" />
            </div>

            <div className="text-3xl md:text-4xl font-extrabold text-brand-blue tracking-tight leading-none mb-2">
              {stat.value}
            </div>
            
            <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest leading-none">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
