import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Briefcase, Shield, ArrowRight } from "lucide-react";
import type { Cab } from "../data/mockData";

interface CabCardProps {
    cab: Cab;
}

export const CabCard = ({ cab }: CabCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.35 }}
            className="
    group
    bg-white
    rounded-[24px] sm:rounded-[32px]
    overflow-hidden
    border
    border-[#E5E0D8]
    shadow-sm
    hover:shadow-2xl
    transition-all
    duration-500
    max-w-[320px] sm:max-w-[380px]
    mx-auto
  "
        >
            <div className="relative overflow-hidden">
               <img
  src={cab.image}
  alt={cab.name}
  className="
    h-56 sm:h-72
    w-full
    object-cover
    group-hover:scale-110
    transition-transform
    duration-700
  "
/>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* <span
                    className="
          absolute
          top-4
          right-4
          bg-yellow-400
          text-black
          text-[10px]
          font-bold
          uppercase
          px-3
          py-2
          rounded-full
        "
                >
                    {cab.rate}
                </span> */}
            </div>

            <div className="px-5 sm:px-7 pb-2">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-yellow-500">
                    {cab.type}
                </span>

                <h3 className="mt-3 text-2xl font-bold text-brand-blue">
                    {cab.name}
                </h3>

                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                    {cab.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                    <div className="text-center">
                        <Users className="w-5 h-5 mx-auto text-[#F97316]" />
                        <p className="text-xs mt-2">{cab.capacity}</p>
                    </div>

                    <div className="text-center">
                        <Briefcase className="w-5 h-5 mx-auto text-[#333333]" />
                        <p className="text-xs mt-2">{cab.luggage}</p>
                    </div>

                    <div className="text-center">
                        <Shield className="w-5 h-5 mx-auto text-emerald-500" />
                        <p className="text-xs mt-2">VIP</p>
                    </div>
                </div>

                <Link
                    to={`/cab/${cab.id}`}
                    className="
            mt-7
            flex
            items-center
            justify-center
            gap-2
            bg-blue-500
            hover:bg-brand-blue
            text-white
            py-4
            rounded-2xl
            font-bold
            uppercase
            tracking-wider
            text-xs
            transition-all
          "
                >
                    Book Cabs Here
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
};