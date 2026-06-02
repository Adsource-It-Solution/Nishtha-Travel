import {
  ShieldCheck,
  Compass,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

export default function TravelSignatureSection() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80"
          className="w-full h-full object-cover"
        >
          <source src="/travel-hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-align">

        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-5xl md:text-7xl font-black mt-4 leading-tight"
          >
            The Nishtha Travel Signature
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 text-lg md:text-xl mt-6 max-w-2xl"
          >
            Unlock access to elite properties,
            private aviation lanes,
            luxury upgrades and 24/7 dedicated
            travel concierge staff worldwide.
          </motion.p>

          {/* Features */}
          <div className="mt-14 space-y-8">

            <Feature
              icon={<ShieldCheck />}
              title="Full-Refund Protection"
              text="Enjoy seamless cancellations and flight adjustments up to 24 hours prior to travel, backed by premium partner insurance coverage."
            />

            <Feature
              icon={<Compass />}
              title="24/7 Elite Concierge Support"
              text="A dedicated digital concierge is available through text or WhatsApp at any hour to modify bookings, reserve dinners or secure fast-track visas."
            />

            <Feature
              icon={<Award />}
              title="Elite Membership Upgrade"
              text="Earn priority points to unlock complimentary lounge access, private yacht charters, free room nights and luxury transfers."
            />

          </div>
        </div>

      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-5">
      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
        {icon}
      </div>

      <div>
        <h4 className="text-white font-bold text-xl uppercase">
          {title}
        </h4>

        <p className="text-white/80 mt-2 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}