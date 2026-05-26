import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { mockTestimonials } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {mockTestimonials.map((testimonial, idx) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: idx * 0.15 }}
          className="glass-card p-6 md:p-8 flex flex-col justify-between relative group hover:border-gold-500/20 transition-all duration-300"
        >
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 text-gold-500/10 pointer-events-none group-hover:text-gold-500/20 transition-all">
            <Quote className="w-12 h-12 rotate-180" />
          </div>

          <div className="space-y-4">
            {/* Stars */}
            <div className="flex gap-0.5">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="text-slate-300 text-sm leading-relaxed relative z-10 font-medium italic">
              "{testimonial.content}"
            </p>
          </div>

          {/* Client profile */}
          <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-6">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-11 h-11 rounded-full object-cover border border-white/10"
            />
            <div>
              <h4 className="font-bold text-white text-sm leading-snug">{testimonial.name}</h4>
              <span className="text-[10px] text-slate-400 font-semibold block leading-tight">{testimonial.role}</span>
              <span className="text-[9px] text-gold-500/80 font-bold uppercase tracking-wider block mt-0.5">{testimonial.location}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
