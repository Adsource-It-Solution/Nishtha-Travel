import React, { useState } from "react";
import {Navbar} from "../components/Navbar";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Headphones,
  Shield,
  Plane,
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[420px] overflow-hidden mt-[88px]">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Contact Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="font-poppins text-5xl md:text-6xl font-bold">
              Contact Us
            </h1>

            <p className="mt-4 text-lg">
              Home • Contact Us
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-[28px] p-8 shadow-lg hover:shadow-xl transition-all">
              <Phone className="w-10 h-10 text-blue-600" />
              <h3 className="font-poppins font-semibold text-xl mt-5">
                Call Us
              </h3>
              <p className="text-slate-500 mt-3">
                +91 99999 99999
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-8 shadow-lg hover:shadow-xl transition-all">
              <Mail className="w-10 h-10 text-blue-600" />
              <h3 className="font-poppins font-semibold text-xl mt-5">
                Email Us
              </h3>
              <p className="text-slate-500 mt-3">
                info@nishthatravel.com
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-8 shadow-lg hover:shadow-xl transition-all">
              <MapPin className="w-10 h-10 text-blue-600" />
              <h3 className="font-poppins font-semibold text-xl mt-5">
                Visit Office
              </h3>
              <p className="text-slate-500 mt-3">
                Gurgaon, Haryana, India
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-8 shadow-lg hover:shadow-xl transition-all">
              <Clock className="w-10 h-10 text-blue-600" />
              <h3 className="font-poppins font-semibold text-xl mt-5">
                Working Hours
              </h3>
              <p className="text-slate-500 mt-3">
                Mon - Sat
                <br />
                09:00 AM - 08:00 PM
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* FORM */}
            <div className="bg-white rounded-[32px] p-10 shadow-lg border border-slate-100">

              <span className="text-blue-600 font-semibold uppercase tracking-wider">
                Get In Touch
              </span>

              <h2 className="font-poppins text-4xl font-bold mt-3">
                Plan Your Next Journey
              </h2>

              <p className="text-slate-500 mt-4">
                Fill out the form and our travel experts
                will get back to you shortly.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-5 mt-8"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-600"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-600"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-600"
                />

                <input
                  type="text"
                  placeholder="Destination"
                  value={form.destination}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      destination: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-600"
                />

                <textarea
                  rows={5}
                  placeholder="Tell us about your trip..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-600"
                />

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 font-semibold flex items-center gap-2 transition-all"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>

            {/* MAP */}
            <div className="rounded-[32px] overflow-hidden shadow-lg">

              <iframe
                title="Google Map"
                src="https://maps.google.com/maps?q=gurgaon&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[650px]"
              />

            </div>

          </div>
        </div>
      </section>

      {/* WHY CONTACT US */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <h2 className="font-poppins text-5xl font-bold">
              Why Contact Us?
            </h2>

            <p className="text-slate-500 mt-4">
              We help travelers create unforgettable experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="bg-white rounded-[28px] p-10 shadow-lg">
              <Headphones className="text-blue-600 w-12 h-12" />
              <h3 className="font-poppins text-2xl font-semibold mt-5">
                24/7 Support
              </h3>
              <p className="text-slate-500 mt-4">
                Dedicated support before, during and after your journey.
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-10 shadow-lg">
              <Plane className="text-blue-600 w-12 h-12" />
              <h3 className="font-poppins text-2xl font-semibold mt-5">
                Travel Experts
              </h3>
              <p className="text-slate-500 mt-4">
                Experienced travel consultants for every destination.
              </p>
            </div>

            <div className="bg-white rounded-[28px] p-10 shadow-lg">
              <Shield className="text-blue-600 w-12 h-12" />
              <h3 className="font-poppins text-2xl font-semibold mt-5">
                Trusted Service
              </h3>
              <p className="text-slate-500 mt-4">
                Secure bookings and personalized travel experiences.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-blue-600 rounded-[36px] p-14 text-center text-white">

            <h2 className="font-poppins text-5xl font-bold">
              Ready To Plan Your Next Adventure?
            </h2>

            <p className="mt-5 text-white/90 max-w-2xl mx-auto">
              Let Nishtha Travel create unforgettable memories
              and tailor-made journeys for you.
            </p>

            <button className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all">
              Start Planning
            </button>

          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;