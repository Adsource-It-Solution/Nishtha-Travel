import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { mockTestimonials } from '../data/mockData';

export const Testimonials = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {mockTestimonials.map((testimonial, idx) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: idx * 0.15
          }}
          whileHover={{
            y: -10
          }}
          className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-white/80
            backdrop-blur-xl
            border
            border-white
            shadow-xl
            p-8
          "
        >
          {/* Quote Background */}
          <Quote
            className="
              absolute
              top-6
              right-6
              w-20
              h-20
              text-brand-purple/10
            "
          />

          {/* Rating */}
          <div className="flex gap-1 mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="
                  w-5
                  h-5
                  fill-yellow-400
                  text-yellow-400
                "
              />
            ))}
          </div>

          {/* Review */}
          <p className="text-slate-600 leading-relaxed text-lg">
            "{testimonial.content}"
          </p>

          {/* User */}
          <div className="mt-10 flex items-center gap-4">

            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              loading="lazy"
              className="
                w-16
                h-16
                rounded-full
                object-cover
                ring-4
                ring-brand-purple/10
              "
            />

            <div>
              <h4 className="font-bold text-lg text-brand-blue">
                {testimonial.name}
              </h4>

              <p className="text-slate-500">
                {testimonial.role}
              </p>

              <span className="text-brand-purple text-sm font-semibold">
                {testimonial.location}
              </span>
            </div>

          </div>
        </motion.div>
      ))}
    </div>
  );
};