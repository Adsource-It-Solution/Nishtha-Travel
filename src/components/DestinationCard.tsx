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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative h-[420px] overflow-hidden border border-[#E5E0D8] bg-brand-blue shadow-sm"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Blur Layer */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Strong Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/80 via-40% to-brand-blue/10" />
      </div>

      {/* Rating / Tags */}
      <div className="absolute top-4 left-4 flex gap-2 z-20">
        <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-brand-purple text-brand-blue flex items-center gap-1 shadow-md">
          <Star className="w-3 h-3 fill-brand-blue text-brand-blue" />
          <span>{destination.rating}</span>
        </span>

        {destination.trending && (
          <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md border border-white/20 text-white">
            Trending
          </span>
        )}
      </div>

      {/* Weather */}
      <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 text-[10px] font-semibold flex items-center gap-1.5 text-white">
        <span>{destination.weather.icon}</span>
        <span>{destination.weather.temp}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 z-20">

        {/* Country */}
        <div className="flex items-center gap-1 text-brand-purple font-bold text-[10px] uppercase tracking-[0.15em]">
          <MapPin className="w-3.5 h-3.5" />
          <span>{destination.country}</span>
        </div>

        {/* Destination Name */}
        <h3
          className="
            text-2xl
            font-medium
            font-serif
            text-white
            leading-tight
            transition-colors
            group-hover:text-brand-purple
          "
          style={{
            textShadow: '0 2px 12px rgba(0,0,0,0.55)',
          }}
        >
          {destination.name}
        </h3>

        {/* Description */}
        <p
          className="text-slate-200 text-sm line-clamp-2 leading-relaxed"
          style={{
            textShadow: '0 1px 8px rgba(0,0,0,0.45)',
          }}
        >
          {destination.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1 pt-1">
          {destination.highlights.slice(0, 3).map((hl, i) => (
            <span
              key={i}
              className="
                text-[9px]
                bg-black/30
                backdrop-blur-md
                border
                border-white/10
                px-2
                py-1
                text-slate-200
              "
            >
              {hl}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to={`/destination/${destination.id}`}
          className="
            mt-2
            w-full
            py-3
            bg-white/15
            backdrop-blur-md
            border
            border-white/20
            text-white
            text-[10px]
            font-bold
            uppercase
            tracking-widest
            flex
            items-center
            justify-center
            gap-2
            transition-all
            duration-300
            hover:bg-brand-purple
            hover:text-brand-blue
            hover:border-transparent
          "
        >
          <span>Explore Itinerary</span>
        </Link>

      </div>
    </motion.div>
  );
};