import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, MapPin, Sparkles } from 'lucide-react';
import type { Hotel } from '../data/mockData';

interface HotelCardProps {
  hotel: Hotel;
  onBook?: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onBook }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass-card overflow-hidden flex flex-col h-full group shadow-sm border border-soft-border"
    >
      {/* Hotel Images Gallery Panel */}
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={hotel.images[activeImageIdx]}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/30 pointer-events-none" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 border border-soft-border backdrop-blur-sm flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-white transition-all z-10 shadow-sm"
        >
          <Heart className={`w-4 h-4 transition-all ${isLiked ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
        </button>

        {/* Discount Badge */}
        {hotel.discountTag && (
          <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-brand-purple text-white rounded-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>{hotel.discountTag}</span>
          </span>
        )}

        {/* Gallery Dots */}
        {hotel.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {hotel.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImageIdx === idx ? 'bg-brand-purple w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hotel Info Content */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-brand-purple" />
            <span>{hotel.location}</span>
          </div>

          {/* Hotel Name */}
          <h3 className="text-base font-extrabold text-brand-blue group-hover:text-brand-purple transition-colors leading-snug">
            {hotel.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-0.5 text-brand-purple font-bold bg-brand-purple/5 px-2 py-0.5 rounded border border-brand-purple/10">
              <Star className="w-3 h-3 fill-brand-purple text-brand-purple" />
              {hotel.rating}
            </span>
            <span className="text-slate-400">({hotel.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-soft-border my-4 pt-4">
          {/* Amenities Grid */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-soft-border px-2 py-1 rounded-lg"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-[10px] font-bold text-brand-purple bg-brand-purple/5 px-2 py-1 rounded-lg border border-brand-purple/10">
                +{hotel.amenities.length - 3} More
              </span>
            )}
          </div>

          {/* Price & Book Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Price per night</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-brand-blue">${hotel.pricePerNight}</span>
                {hotel.originalPricePerNight && (
                  <span className="text-xs text-slate-400 line-through font-semibold">${hotel.originalPricePerNight}</span>
                )}
              </div>
            </div>

            <button
              onClick={() => onBook?.(hotel)}
              className="btn-gold !py-2 !px-4 !text-[10px] uppercase tracking-wider font-extrabold shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <span>Book Suite</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
