import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import type { Destination } from '../data/mockData';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="
        group
        relative
        h-[420px]
        overflow-hidden
        rounded-[28px]
        bg-white
        border
        border-[#E5E0D8]
        shadow-lg
      "
    >
      {/* Image Section */}
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-full
          overflow-hidden
          transition-all
          duration-700
          ease-out
          group-hover:h-[35%]
        "
      >
        <img
          src={destination.image}
          alt={destination.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Rating */}
        <div className="absolute top-4 left-4 flex gap-2 z-20">
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#F6F4F3] text-brand-blue flex items-center gap-1 rounded-full">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-600" />
            <span>{destination.rating}</span>
          </span>

          {destination.trending && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white rounded-full">
              Trending
            </span>
          )}
        </div>

        {/* Weather */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs flex items-center gap-1">
          <span>{destination.weather.icon}</span>
          <span>{destination.weather.temp}</span>
        </div>

        {/* Title on Image */}
        <div className="absolute bottom-6 left-6 right-6 transition-all duration-700 group-hover:opacity-0">
          <div className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest mb-2">
            <MapPin className="w-4 h-4" />
            <span>{destination.country}</span>
          </div>

          <h3
            className="text-3xl font-bold text-white"
            style={{
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            }}
          >
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Details Panel */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          bg-white
          px-6
          translate-y-full
          group-hover:translate-y-0
          transition-all
          duration-700
          ease-out
          flex
          flex-col
          justify-between
        "
      >
        <div>
          <div className="flex items-center gap-2 text-black font-bold text-[10px] uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4" />
            {destination.country}
          </div>

          <h3 className="text-2xl font-bold text-gray-900">
            {destination.name}
          </h3>

          <p className="mt-2 text-sm text-slate-600 line-clamp-2">
            {destination.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {destination.highlights.slice(0, 3).map((hl, i) => (
              <span
                key={i}
                className="
                  px-3
                  py-1
                  text-[10px]
                  rounded-full
                  bg-slate-100
                  text-slate-700
                  font-medium
                "
              >
                {hl}
              </span>
            ))}
          </div>
        </div>

        <Link
          to={`/destination/${destination.id}`}
          className="
            mt-3
            w-full
            py-2
            rounded-xl
            bg-[#3B82F6]
            text-white
            text-sm
            font-bold
            uppercase
            tracking-widest
            text-center
            transition-all
            duration-300
            hover:bg-brand-blue
          "
        >
          Explore Itinerary
        </Link>
      </div>
    </motion.div>
  );
};