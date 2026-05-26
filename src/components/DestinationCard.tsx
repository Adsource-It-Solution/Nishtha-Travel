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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative h-[420px] rounded-2xl overflow-hidden shadow-luxury border border-white/5 cursor-pointer"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradients Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-r from-gold-950/20 via-transparent to-transparent opacity-40" />
      </div>

      {/* Tags / Badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-midnight rounded-lg shadow-gold-glow flex items-center gap-1">
          <Star className="w-3 h-3 fill-midnight" />
          <span>{destination.rating}</span>
        </span>
        {destination.trending && (
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-lg">
            Trending
          </span>
        )}
      </div>

      {/* Weather Indicator */}
      <div className="absolute top-4 right-4 bg-navy-950/70 border border-white/5 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 text-white">
        <span>{destination.weather.icon}</span>
        <span>{destination.weather.temp}</span>
      </div>

      {/* Card Contents */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
        <div className="flex items-center gap-1 text-gold-500 font-semibold text-xs uppercase tracking-widest">
          <MapPin className="w-3.5 h-3.5" />
          <span>{destination.country}</span>
        </div>
        
        <h3 className="text-2xl font-bold font-serif text-white group-hover:text-gold-300 transition-colors leading-tight">
          {destination.name}
        </h3>
        
        <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed">
          {destination.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {destination.highlights.slice(0, 3).map((hl, i) => (
            <span key={i} className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-slate-400">
              {hl}
            </span>
          ))}
        </div>

        {/* Button CTA */}
        <Link
          to={`/destination/${destination.id}`}
          className="mt-2 w-full py-2.5 rounded-xl bg-white/5 hover:bg-gold-500 hover:text-midnight border border-white/10 hover:border-transparent text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-white/10"
        >
          <span>Explore Itinerary</span>
        </Link>
      </div>
    </motion.div>
  );
};
