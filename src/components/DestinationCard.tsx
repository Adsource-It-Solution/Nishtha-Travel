import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import type { Destination } from '../data/mockData';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative h-[420px] rounded-none overflow-hidden border border-[#E5E0D8] cursor-pointer bg-brand-blue"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradients Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/50 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
      </div>

      {/* Tags / Badges */}
      <div className="absolute top-4 left-4 flex gap-1.5">
        <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-brand-purple text-brand-blue rounded-none flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 fill-brand-blue text-brand-blue" />
          <span>{destination.rating}</span>
        </span>
        {destination.trending && (
          <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-white/15 border border-white/10 text-white rounded-none">
            Trending
          </span>
        )}
      </div>

      {/* Weather Indicator */}
      <div className="absolute top-4 right-4 bg-brand-blue/85 border border-[#E5E0D8]/10 rounded-none px-2 py-1 text-[10px] font-semibold flex items-center gap-1.5 text-white">
        <span>{destination.weather.icon}</span>
        <span>{destination.weather.temp}</span>
      </div>

      {/* Card Contents */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
        <div className="flex items-center gap-1 text-brand-purple font-bold text-[10px] uppercase tracking-[0.15em]">
          <MapPin className="w-3.5 h-3.5" />
          <span>{destination.country}</span>
        </div>

        <h3 className="text-xl font-medium font-serif text-white group-hover:text-brand-purple transition-colors leading-tight">
          {destination.name}
        </h3>

        <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
          {destination.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 pt-1">
          {destination.highlights.slice(0, 3).map((hl, i) => (
            <span key={i} className="text-[9px] bg-white/5 border border-white/5 px-2 py-0.5 rounded-none text-slate-400">
              {hl}
            </span>
          ))}
        </div>

        {/* Button CTA */}
        <Link
          to={`/destination/${destination.id}`}
          className="mt-2 w-full py-2.5 rounded-none bg-white/10 hover:bg-brand-purple hover:text-brand-blue border border-white/20 hover:border-transparent text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-white/15"
        >
          <span>Explore Itinerary</span>
        </Link>
      </div>
    </motion.div>
  );
};
