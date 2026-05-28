import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, ChevronRight } from 'lucide-react';
import type { Package } from '../data/mockData';

interface PackageCardProps {
  pkg: Package;
  onBook?: (pkg: Package) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onBook }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-[#E5E0D8] rounded-none overflow-hidden flex flex-col h-full group shadow-[0_4px_16px_rgba(13,19,31,0.02)] hover:border-brand-purple transition-all duration-300"
    >
      {/* Visual Header */}
      <div className="relative h-56 w-full overflow-hidden border-b border-[#E5E0D8]">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 pointer-events-none" />
 
        {/* Rating */}
        <span className="absolute top-4 right-4 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest bg-white border border-[#E5E0D8] text-brand-purple rounded-none flex items-center gap-1 z-10 shadow-sm">
          <Star className="w-3 h-3 fill-brand-purple text-brand-purple" />
          <span>{pkg.rating}</span>
        </span>
 
        {/* Discount Badge */}
        {pkg.discountPercentage && (
          <span className="absolute top-4 left-4 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest bg-red-600 border border-red-600/10 text-white rounded-none z-10">
            Save {pkg.discountPercentage}%
          </span>
        )}
 
        {/* Country Label */}
        <span className="absolute bottom-4 left-4 text-[9px] font-bold uppercase tracking-widest text-brand-purple bg-brand-light px-2.5 py-1 rounded-none border border-[#E5E0D8]">
          {pkg.destination}
        </span>
      </div>
 
      {/* Package details */}
      <div className="p-5 flex-grow flex flex-col justify-between bg-white">
        <div className="space-y-3">
          {/* Duration info */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-serif italic">
            <Clock className="w-3.5 h-3.5 text-brand-purple" />
            <span>{pkg.duration}</span>
          </div>
 
          {/* Title */}
          <Link to={`/package/${pkg.id}`} className="block">
            <h3 className="text-base font-serif font-bold text-brand-blue group-hover:text-brand-purple transition-colors leading-snug line-clamp-2 cursor-pointer">
              {pkg.title}
            </h3>
          </Link>
 
          {/* Included services */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Inclusions</span>
            <div className="flex flex-wrap gap-1">
              {pkg.includedServices.map((service, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-normal text-slate-500 bg-brand-light border border-[#E5E0D8] px-2 py-0.5 rounded-none"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
 
        {/* Divider */}
        <div className="border-t border-[#E5E0D8] my-4 pt-4 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Package price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-brand-blue">${pkg.price}</span>
              {pkg.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-semibold">${pkg.originalPrice}</span>
              )}
              <span className="text-[9px] text-slate-400 font-normal">/person</span>
            </div>
          </div>
 
          <div className="flex gap-2">
            <Link
              to={`/package/${pkg.id}`}
              className="p-2.5 rounded-none bg-brand-light hover:bg-slate-50 border border-[#E5E0D8] text-slate-500 hover:text-brand-purple transition-all flex items-center justify-center shadow-none"
              title="View Itinerary"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
            
            <button
              onClick={() => onBook?.(pkg)}
              className="btn-gold !py-2.5 !px-4 !text-[9px] uppercase tracking-widest rounded-none shadow-none"
            >
              Book Trip
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
