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
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{
    y: -6,
    transition: { duration: 0.3 },
  }}
  className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300"
>
  {/* Top Ribbon */}
  {flight.discountBadge && (
    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold px-4 py-1 rounded-bl-2xl z-10">
      {flight.discountBadge}
    </div>
  )}

  <div className="p-8">
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">

      {/* Airline */}
      <div className="flex items-center gap-4 min-w-[220px]">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Plane className="w-7 h-7 text-white" />
        </div>

        <div>
          <h3 className="font-bold text-lg text-slate-900">
            {flight.airlineName}
          </h3>

          <p className="text-sm text-slate-500">
            {flight.flightNumber}
          </p>

          <span className="inline-flex mt-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-medium">
            {flight.class}
          </span>
        </div>
      </div>

      {/* Flight Route */}
      <div className="flex-1 w-full max-w-3xl">

        <div className="flex items-center justify-between">

          {/* Departure */}
          <div>
            <p className="text-xl font-bold text-slate-900">
              {flight.departureTime}
            </p>

            <h4 className="text-xl font-semibold text-indigo-600">
              {flight.departureCode}
            </h4>

            <p className="text-sm text-slate-500">
              {flight.departureCity}
            </p>
          </div>

          {/* Timeline */}
          <div className="flex-1 px-8">

            <div className="text-center mb-2">
              <span className="text-sm font-medium text-slate-500">
                {flight.duration}
              </span>
            </div>

            <div className="relative flex items-center">

              <div className="h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full w-full" />

              <div className="absolute left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
                <Plane className="w-4 h-4 text-indigo-600 rotate-90" />
              </div>
            </div>

            <div className="text-center mt-2">
              <span
                className={`text-xs font-semibold ${
                  flight.stops === 0
                    ? "text-emerald-600"
                    : "text-orange-500"
                }`}
              >
                {flight.stops === 0
                  ? "Non Stop"
                  : `${flight.stops} Stop`}
              </span>
            </div>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <p className="text-xl font-bold text-slate-900">
              {flight.arrivalTime}
            </p>

            <h4 className="text-xl font-semibold text-indigo-600">
              {flight.arrivalCode}
            </h4>

            <p className="text-sm text-slate-500">
              {flight.arrivalCity}
            </p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="min-w-[220px]">

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6">

          <p className="text-xs uppercase tracking-widest text-slate-400">
            Starting From
          </p>

          <div className="mt-2">
            <span className="text-2xl font-bold">
              ₹{flight.price}
            </span>
          </div>

          <p
            className={`mt-2 text-sm ${
              flight.refundable
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {flight.refundable
              ? "✓ Refundable"
              : "✕ Non Refundable"}
          </p>

          <button
            onClick={() => onBook?.(flight)}
            className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-semibold transition-all"
          >
            Book Now
          </button>
        </div>
      </div>

    </div>
  </div>
</motion.div>
  );
};
