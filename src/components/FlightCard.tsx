import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import type { Flight } from '../data/mockData';

interface FlightCardProps {
  flight: Flight;
  onBook?: (flight: Flight) => void;
}


interface FlightCardProps {
  flight: Flight;
  onBook?: (flight: Flight) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onBook }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-purple transition-all duration-300 shadow-none border border-[#E5E0D8]"
    >
      {/* Airline Branding */}
      <div className="flex items-center gap-4 min-w-[200px]">
        {flight.airlineLogo ? (
          <div className="w-12 h-12 bg-white rounded-none border border-[#E5E0D8] flex items-center justify-center p-2">
            <span className="text-[10px] font-bold text-brand-purple tracking-widest">{flight.airlineName.slice(0, 3).toUpperCase()}</span>
          </div>
        ) : (
          <div className="w-12 h-12 rounded-none bg-brand-light flex items-center justify-center border border-[#E5E0D8] text-brand-purple">
            <Plane className="w-5 h-5" />
          </div>
        )}
        <div>
          <h4 className="font-serif text-brand-blue text-base leading-tight">{flight.airlineName}</h4>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">{flight.flightNumber} • {flight.class}</span>
        </div>
      </div>

      {/* Flight Schedule & Stops Line */}
      <div className="flex-grow flex items-center justify-between gap-6 max-w-lg">
        {/* Departure */}
        <div className="text-left">
          <span className="text-sm font-semibold text-slate-800 block leading-tight">{flight.departureTime}</span>
          <span className="text-2xl font-light tracking-wide text-brand-blue block leading-tight my-1">{flight.departureCode}</span>
          <span className="text-[10px] text-slate-500 font-normal uppercase tracking-wider block">{flight.departureCity}</span>
        </div>

        {/* Duration / Stops graphic */}
        <div className="flex-grow flex flex-col items-center px-4 relative">
          <span className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">{flight.duration}</span>

          <div className="w-full flex items-center relative py-2">
            <div className="w-1 h-1 bg-[#E5E0D8]" />
            <div className="flex-grow h-[1px] border-t border-[#E5E0D8] relative flex justify-center">
              {flight.stops > 0 && (
                <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-purple border border-white" />
              )}
            </div>
            <Plane className="w-3.5 h-3.5 text-brand-purple/60 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
            <div className="w-1 h-1 bg-brand-purple" />
          </div>

          <span className={`text-[9px] uppercase font-bold tracking-widest ${flight.stops === 0 ? 'text-emerald-700' : 'text-brand-purple'}`}>
            {flight.stops === 0 ? 'Non-Stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
          </span>
        </div>

        {/* Arrival */}
        <div className="text-right">
          <span className="text-sm font-semibold text-slate-800 block leading-tight">{flight.arrivalTime}</span>
          <span className="text-2xl font-light tracking-wide text-slate-500 block leading-tight my-1">{flight.arrivalCode}</span>
          <span className="text-[10px] text-slate-500 font-normal uppercase tracking-wider block">{flight.arrivalCity}</span>
        </div>
      </div>

      {/* Pricing & Booking CTA */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#E5E0D8] md:pl-6 min-w-[160px]">
        <div className="text-left md:text-right">
          {flight.discountBadge && (
            <span className="inline-block px-2.5 py-0.5 rounded-none text-[8px] font-bold uppercase tracking-widest bg-brand-purple/10 text-brand-purple border border-brand-purple/20 mb-1.5">
              {flight.discountBadge}
            </span>
          )}
          <div className="flex items-baseline gap-1 justify-end">
            <span className="text-2xl font-serif text-brand-blue">${flight.price}</span>
            <span className="text-[9px] text-slate-500 font-semibold tracking-widest">USD</span>
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-widest block mt-1 ${flight.refundable ? 'text-emerald-700' : 'text-slate-400'}`}>
            {flight.refundable ? '✓ Refundable' : '× Non-Refundable'}
          </span>
        </div>

        <button
          onClick={() => onBook?.(flight)}
          className="btn-gold !py-2.5 !px-5 !text-[9px] uppercase tracking-[0.18em] font-bold shadow-none rounded-none"
        >
          Book Flight
        </button>
      </div>
    </motion.div>
  );
};
