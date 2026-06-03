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
  const [activeImageIdx,] = useState(0);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="
    bg-white
    rounded-[32px]
    overflow-hidden
    shadow-xl
    hover:shadow-2xl
    border border-slate-100
    group
    transition-all
    duration-300
  "
    >
      {/* IMAGE SECTION */}
      <div className="relative h-[320px] overflow-hidden">

        <img
          src={hotel.images[activeImageIdx]}
          alt={hotel.name}
          className="
        w-full
        h-full
        object-cover
        group-hover:scale-110
        transition-transform
        duration-700
      "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Luxury Badge */}
        {hotel.discountTag && (
          <div className="
        absolute
        top-5
        left-5
        px-4
        py-2
        rounded-full
        bg-white/90
        backdrop-blur-md
        text-xs
        font-semibold
        flex
        items-center
        gap-2
      ">
            <Sparkles size={14} />
            {hotel.discountTag}
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="
        absolute
        top-5
        right-5
        w-12
        h-12
        rounded-full
        bg-white/90
        backdrop-blur-md
        flex
        items-center
        justify-center
      "
        >
          <Heart
            className={`
          w-5 h-5
          ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-700'}
        `}
          />
        </button>

        {/* Bottom Overlay */}
        <div className="absolute bottom-6 left-6 right-6">

          <div className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-2xl
        p-5
      ">
            <div className="flex justify-between items-start">

              <div>
                <p className="text-white/80 text-sm flex items-center gap-2">
                  <MapPin size={14} />
                  {hotel.location}
                </p>

                <h3 className="text-white text-2xl font-bold mt-2">
                  {hotel.name}
                </h3>
              </div>

              <div className="
            bg-white
            rounded-xl
            px-3
            py-2
            text-center
          ">
                <div className="flex items-center gap-1">
                  <Star
                    className="fill-yellow-400 text-yellow-400"
                    size={14}
                  />
                  <span className="font-bold">
                    {hotel.rating}
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  {hotel.reviewsCount}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="p-8">

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {hotel.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="
            px-3
            py-1.5
            rounded-full
            bg-slate-100
            text-slate-700
            text-xs
            font-medium
          "
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">

          <div>
            <p className="text-slate-400 text-sm">
              Starting from
            </p>

            <div className="flex items-center gap-2">

              <span className="text-3xl font-bold text-slate-900">
                ₹{hotel.pricePerNight}
              </span>

              {hotel.originalPricePerNight && (
                <span className="line-through text-slate-400">
                  ₹{hotel.originalPricePerNight}
                </span>
              )}
            </div>

            <p className="text-slate-500 text-sm">
              per night
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              to={`/hotel/${hotel.id}`}
              className="
            px-5
            py-3
            rounded-xl
            border
            border-slate-200
            hover:bg-slate-50
            font-medium
          "
            >
              View
            </Link>

            <button
              onClick={() => onBook?.(hotel)}
              className="
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            text-white
            font-semibold
            hover:shadow-lg
          "
            >
              Reserve
            </button>

          </div>

        </div>

      </div>
    </motion.div>
  );
};
