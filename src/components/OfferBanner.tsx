import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Calendar } from 'lucide-react';
import { mockOffers } from '../data/mockData';

export const OfferBanner: React.FC = () => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'flights' | 'hotels' | 'packages'>('all');

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const filteredOffers = selectedCategory === 'all'
    ? mockOffers
    : mockOffers.filter(offer => offer.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Selection Filter */}
      <div className="flex gap-2 justify-center">
        {(['all', 'flights', 'hotels', 'packages'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${selectedCategory === cat
              ? 'bg-brand-blue border-transparent text-white shadow-sm font-extrabold'
              : 'bg-white border-soft-border text-slate-600 hover:bg-slate-50'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Offers Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredOffers.map((offer) => {
            const isCopied = copiedCodeId === offer.id;
            return (
              // <motion.div
              //   key={offer.id}
              //   layout
              //   initial={{ opacity: 0, scale: 0.95 }}
              //   animate={{ opacity: 1, scale: 1 }}
              //   exit={{ opacity: 0, scale: 0.95 }}
              //   transition={{ duration: 0.3 }}
              //   className="glass-card overflow-hidden flex flex-col justify-between hover:border-brand-purple/20 transition-all duration-300 shadow-sm"
              // >
              //   {/* Visual Header */}
              //   <div className="relative h-40">
              //     <img
              //       src={offer.image}
              //       alt={offer.title}
              //       className="w-full h-full object-cover"
              //     />
              //     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              //     <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-bold uppercase bg-brand-purple text-white rounded">
              //       {offer.discount}
              //     </span>

              //     <div className="absolute bottom-4 left-4 right-4">
              //       <span className="text-[10px] text-brand-soft font-bold uppercase tracking-widest">{offer.category} promo</span>
              //       <h4 className="text-white font-extrabold text-base leading-tight mt-1 line-clamp-1">{offer.title}</h4>
              //     </div>
              //   </div>

              //   {/* Offer description */}
              //   <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
              //     <p className="text-slate-500 text-xs font-semibold leading-relaxed line-clamp-2">
              //       {offer.description}
              //     </p>

              //     <div className="space-y-3 pt-2">
              //       {/* Expiry Date */}
              //       <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
              //         <Calendar className="w-3.5 h-3.5 text-brand-purple" />
              //         <span>Expires: {offer.expiryDate}</span>
              //       </div>

              //       {/* Copy code bar */}
              //       <div className="flex items-center justify-between gap-2 bg-slate-50 border border-soft-border rounded-xl p-2">
              //         <span className="text-xs font-mono font-bold tracking-wider text-brand-blue pl-2">
              //           {offer.code}
              //         </span>
              //         <button
              //           onClick={() => handleCopyCode(offer.code, offer.id)}
              //           className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              //             isCopied
              //               ? 'bg-emerald-500 text-white'
              //               : 'bg-brand-blue hover:bg-brand-purple text-white'
              //           }`}
              //         >
              //           {isCopied ? (
              //             <>
              //               <Check className="w-3 h-3" />
              //               <span>Copied</span>
              //             </>
              //           ) : (
              //             <>
              //               <Copy className="w-3 h-3" />
              //               <span>Copy</span>
              //             </>
              //           )}
              //         </button>
              //       </div>
              //     </div>
              //   </div>
              // </motion.div>
              <motion.div
                key={offer.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-[280px] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-5 right-5 flex flex-col gap-2">
                    <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                      {offer.category}
                    </span>

                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="text-3xl font-bold text-slate-900 text-[16px]">
                    {offer.title}
                  </h3>
                </div>

                {/* Offer description */}
                <div className="px-5 pb-5 space-y-4 flex-grow flex flex-col justify-between">
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed line-clamp-2">
                    {offer.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {/* Expiry Date */}
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>Expires: {offer.expiryDate}</span>
                    </div>


                  {/* CTA + Price */}
                  <div className="flex items-end justify-end mb-8">
                    <div className="flex items-center justify-between gap-2 bg-slate-50 border border-soft-border rounded-xl p-2">
                      <span className="text-xs font-mono font-bold tracking-wider text-brand-blue pl-2">
                        {offer.code}
                      </span>
                      <button
                        onClick={() => handleCopyCode(offer.code, offer.id)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all ${isCopied
                            ? 'bg-emerald-500 text-white'
                            : 'bg-brand-blue hover:bg-yellow text-white'
                          }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
