import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-[#E5E0D8] rounded-none overflow-hidden flex flex-col h-full group shadow-[0_4px_16px_rgba(13,19,31,0.02)] hover:border-brand-purple transition-all duration-300"
    >
      {/* Hotel Images Gallery Panel */}
      <div className="relative h-60 w-full overflow-hidden border-b border-[#E5E0D8]">
        <img
          src={hotel.images[activeImageIdx]}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />
 
        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 pointer-events-none" />
 
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-none bg-white border border-[#E5E0D8] flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-white transition-all z-10 shadow-sm"
        >
          <Heart className={`w-4 h-4 transition-all ${isLiked ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
        </button>
 
        {/* Discount Badge */}
        {hotel.discountTag && (
          <span className="absolute top-4 left-4 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-brand-purple text-brand-blue rounded-none flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>{hotel.discountTag}</span>
          </span>
        )}
 
        {/* Gallery Dots */}
        {hotel.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10">
            {hotel.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx(idx);
                }}
                className={`w-3 h-1 rounded-none transition-all ${
                  activeImageIdx === idx ? 'bg-brand-purple w-5' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
 
      {/* Hotel Info Content */}
      <div className="p-5 flex-grow flex flex-col justify-between bg-white">
        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-brand-purple" />
            <span>{hotel.location}</span>
          </div>
 
          {/* Hotel Name */}
          <Link to={`/hotel/${hotel.id}`} className="block">
            <h3 className="text-base font-serif font-bold text-brand-blue group-hover:text-brand-purple transition-colors leading-snug cursor-pointer">
              {hotel.name}
            </h3>
          </Link>
 
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-0.5 text-brand-purple font-bold bg-brand-light px-2 py-0.5 border border-[#E5E0D8]">
              <Star className="w-3 h-3 fill-brand-purple text-brand-purple" />
              {hotel.rating}
            </span>
            <span className="text-slate-400 font-normal">({hotel.reviewsCount} reviews)</span>
          </div>
        </div>
 
        {/* Divider */}
        <div className="border-t border-[#E5E0D8] my-4 pt-4">
          {/* Amenities Grid */}
          <div className="flex flex-wrap gap-1 mb-4">
            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[9px] font-medium text-slate-500 bg-brand-light border border-[#E5E0D8] px-2 py-0.5 rounded-none"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-[9px] font-medium text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded-none border border-brand-purple/20">
                +{hotel.amenities.length - 3} More
              </span>
            )}
          </div>
 
          {/* Price & Book Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Price per night</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-brand-blue">${hotel.pricePerNight}</span>
                {hotel.originalPricePerNight && (
                  <span className="text-xs text-slate-400 line-through font-semibold">${hotel.originalPricePerNight}</span>
                )}
              </div>
            </div>
 
            <div className="flex gap-2">
              <Link
                to={`/hotel/${hotel.id}`}
                className="px-4 py-2.5 bg-brand-light hover:bg-[#E5E0D8]/40 border border-[#E5E0D8] text-[9px] uppercase tracking-widest font-bold text-slate-600 hover:text-brand-purple transition-all flex items-center justify-center shadow-none rounded-none"
              >
                Details
              </Link>
              <button
                onClick={() => onBook?.(hotel)}
                className="btn-gold !py-2.5 !px-4 !text-[9px] uppercase tracking-widest rounded-none"
              >
                <span>Book Suite</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
