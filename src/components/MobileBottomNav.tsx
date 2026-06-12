import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, Plane, Hotel, Luggage } from 'lucide-react';
import { motion } from 'framer-motion';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Flights', path: '/flights', icon: Plane },
    {name: 'Train', path: '/trains', icon: TrainIcon},
    { name: 'Hotels', path: '/hotels', icon: Hotel },
    {name: 'Cab', path: '/cabs', icon: DirectionsCarIcon},
    { name: 'Packages', path: '/packages', icon: Luggage },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-midnight/90 backdrop-blur-lg border-t border-white/5 px-6 py-2 pb-5 flex justify-between items-center shadow-[0_-8px_24px_rgba(0,0,0,0.4)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-1 relative py-1 px-3 text-center transition-all"
          >
            <div className={`p-1 rounded-lg transition-all duration-300 ${
              isActive ? 'text-gold-500 scale-110' : 'text-slate-400'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`text-[10px] uppercase tracking-wider font-medium transition-all ${
              isActive ? 'text-gold-500' : 'text-slate-400'
            }`}>
              {item.name}
            </span>
            {isActive && (
              <motion.div
                layoutId="mobileNavDot"
                className="absolute top-0 w-1.5 h-1.5 rounded-full bg-gold-500"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
};
