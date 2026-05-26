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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass-card overflow-hidden flex flex-col h-full group shadow-sm border border-soft-border"
    >
      {/* Visual Header */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/30 pointer-events-none" />

        {/* Rating */}
        <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 border border-soft-border backdrop-blur-sm text-brand-purple rounded-lg flex items-center gap-1 z-10 shadow-sm">
          <Star className="w-3 h-3 fill-brand-purple text-brand-purple" />
          <span>{pkg.rating}</span>
        </span>

        {/* Discount Badge */}
        {pkg.discountPercentage && (
          <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-500 border border-red-500/20 backdrop-blur-sm text-white rounded-lg z-10 shadow-md">
            Save {pkg.discountPercentage}%
          </span>
        )}

        {/* Country Label */}
        <span className="absolute bottom-4 left-4 text-[9px] font-bold uppercase tracking-widest text-brand-purple bg-brand-purple/5 px-2.5 py-1 rounded border border-brand-purple/20 backdrop-blur-sm">
          {pkg.destination}
        </span>
      </div>

      {/* Package details */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          {/* Duration info */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
            <Clock className="w-3.5 h-3.5 text-brand-purple" />
            <span>{pkg.duration}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-extrabold text-brand-blue group-hover:text-brand-purple transition-colors leading-snug line-clamp-2">
            {pkg.title}
          </h3>

          {/* Included services */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Inclusions</span>
            <div className="flex flex-wrap gap-1">
              {pkg.includedServices.map((service, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-bold text-slate-500 bg-slate-50 border border-soft-border px-2 py-0.5 rounded"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-soft-border my-4 pt-4 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Package price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-brand-blue">${pkg.price}</span>
              {pkg.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-semibold">${pkg.originalPrice}</span>
              )}
              <span className="text-[9px] text-slate-400 font-bold">/person</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/destination/dest-1`}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-soft-border text-slate-500 hover:text-brand-purple transition-all flex items-center justify-center shadow-sm"
              title="View Itinerary"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
            
            <button
              onClick={() => onBook?.(pkg)}
              className="btn-gold !py-2.5 !px-4 !text-[10px] uppercase tracking-wider font-extrabold shadow-sm active:scale-95"
            >
              Book Trip
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
