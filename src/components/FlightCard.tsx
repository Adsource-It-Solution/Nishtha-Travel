import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import type { Flight } from '../data/mockData';

interface FlightCardProps {
  flight: Flight;
  onBook?: (flight: Flight) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onBook }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-purple/20 hover:shadow-luxury-lg transition-all duration-300 shadow-sm border border-soft-border"
    >
      {/* Airline Branding */}
      <div className="flex items-center gap-4 min-w-[200px]">
        {flight.airlineLogo ? (
          <div className="w-12 h-12 bg-slate-50 rounded-xl border border-soft-border flex items-center justify-center p-2">
            <span className="text-xs font-extrabold text-brand-purple">{flight.airlineName.slice(0, 3).toUpperCase()}</span>
          </div>
        ) : (
          <div className="w-12 h-12 rounded-xl bg-brand-purple/5 flex items-center justify-center border border-brand-purple/10 text-brand-purple">
            <Plane className="w-6 h-6" />
          </div>
        )}
        <div>
          <h4 className="font-extrabold text-brand-blue text-sm leading-tight">{flight.airlineName}</h4>
          <span className="text-xs text-slate-400 font-semibold">{flight.flightNumber} • {flight.class}</span>
        </div>
      </div>

      {/* Flight Schedule & Stops Line */}
      <div className="flex-grow flex items-center justify-between gap-6 max-w-lg">
        {/* Departure */}
        <div className="text-left">
          <span className="text-base font-extrabold text-slate-800 block leading-tight">{flight.departureTime}</span>
          <span className="text-xl font-extrabold tracking-wider text-brand-blue block leading-tight">{flight.departureCode}</span>
          <span className="text-xs text-slate-400 font-semibold block">{flight.departureCity}</span>
        </div>

        {/* Duration / Stops graphic */}
        <div className="flex-grow flex flex-col items-center px-4 relative">
          <span className="text-[9px] text-slate-400 font-bold mb-1">{flight.duration}</span>
          
          <div className="w-full flex items-center relative py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <div className="flex-grow h-[1px] bg-slate-300 border-dashed border-t border-slate-300 relative flex justify-center">
              {flight.stops > 0 && (
                <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-purple border border-white shadow" />
              )}
            </div>
            <Plane className="w-3.5 h-3.5 text-brand-purple absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
          </div>
          
          <span className={`text-[9px] uppercase font-extrabold tracking-wider ${flight.stops === 0 ? 'text-emerald-600' : 'text-brand-soft'}`}>
            {flight.stops === 0 ? 'Non-Stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
          </span>
        </div>

        {/* Arrival */}
        <div className="text-right">
          <span className="text-base font-extrabold text-slate-800 block leading-tight">{flight.arrivalTime}</span>
          <span className="text-xl font-extrabold tracking-wider text-slate-500 block leading-tight">{flight.arrivalCode}</span>
          <span className="text-xs text-slate-400 font-semibold block">{flight.arrivalCity}</span>
        </div>
      </div>

      {/* Pricing & Booking CTA */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-soft-border md:pl-6 min-w-[150px]">
        <div className="text-left md:text-right">
          {flight.discountBadge && (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-wider bg-brand-purple/5 text-brand-purple border border-brand-purple/10 mb-1.5">
              {flight.discountBadge}
            </span>
          )}
          <div className="flex items-baseline gap-1 justify-end">
            <span className="text-xl font-extrabold text-brand-blue">${flight.price}</span>
            <span className="text-[9px] text-slate-400 font-bold">USD</span>
          </div>
          <span className={`text-[9px] font-extrabold uppercase tracking-wider block mt-0.5 ${flight.refundable ? 'text-emerald-600' : 'text-slate-400'}`}>
            {flight.refundable ? '✓ Refundable' : '× Non-Refundable'}
          </span>
        </div>

        <button
          onClick={() => onBook?.(flight)}
          className="btn-gold !py-2 !px-4 !text-[10px] uppercase tracking-wider font-extrabold shadow-sm active:scale-95"
        >
          Book Flight
        </button>
      </div>
    </motion.div>
  );
};
