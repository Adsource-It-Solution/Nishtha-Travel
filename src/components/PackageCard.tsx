import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  ArrowLeftRight,
  ArrowUpRight,
  Star,
  Sparkles,
} from 'lucide-react';

import type { Package } from '../data/mockData';

interface PackageCardProps {
  pkg: Package;
  onBook?: (pkg: Package) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        group
        bg-white
        rounded-[28px]
        border
        border-[#E5E0D8]
        overflow-hidden
        h-full
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-500
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden pb-0">
        <div className="relative h-[300px] rounded-[22px] overflow-hidden">

          {/* Image */}
          <img
            src={pkg.image}
            alt={pkg.title}
            className="
              w-full
              h-full
              object-cover
              transition-all
              duration-700
              group-hover:scale-110
            "
          />

          {/* Sparkle Sweep */}
          <div
            className="
              absolute
              inset-0
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-500
            "
          >
            <div
              className="
                absolute
                -left-40
                top-0
                h-full
                w-32
                rotate-12
                bg-white/30
                blur-xl
                group-hover:left-[120%]
                transition-all
                duration-1000
              "
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-5 right-5 flex flex-col gap-2">
            <span className="bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full">
              Group Tour
            </span>

            {pkg.featured && (
              <span className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="absolute bottom-5 left-5">
            <span className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {pkg.rating}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* Title */}
        <h3
          className="
            text-[16px]
            lg:text-[20px]
            font-bold
            text-[#0F172A]
            leading-tight
            mb-3
            group-hover:text-blue-600
            transition-colors
          "
        >
          <Link to={`/package/${pkg.id}`} className="block">
            <h3 className="text-[16px]
            lg:text-[16px]
            font-bold
            text-[#0F172A]
            leading-tight cursor-pointer">
              {pkg.title}
            </h3>
          </Link>
        </h3>

        {/* Meta */}
        <div className="flex items-center flex-wrap gap-3 text-gray-600 font-medium mb-8">

          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className='text-[14px]'>{pkg.destination}</span>
          </div>

          <ArrowLeftRight className="w-4 h-4" />

          <span className='text-[14px]'>{pkg.duration}</span>
        </div>

        {/* Price Row */}
        <div className="flex items-end justify-between mb-3">
          <Link
            to={`/package/${pkg.id}`}
            className="
            bg-[#2F80ED]
            hover:bg-blue-700
            text-white
            px-4
            py-2
            rounded-2xl
            font-bold
            flex
            items-center
            gap-2
            transition-all
            cursor-pointer
  "
          >
            Book Now
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className="text-right">
            <p className="text-gray-500 text-[12px] font-semibold">
              per person
            </p>

            <div className="text--[24px] font-extrabold text-[#111827]">
              ₹{pkg.price}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-5" />

        {/* Bottom Features */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Experience</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center text-xs">
              +
            </div>
            <span>Inclusion</span>
          </div>

        </div>
      </div>
    </motion.div>
  );
};