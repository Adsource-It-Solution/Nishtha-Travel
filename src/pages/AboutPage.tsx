import React from "react";
// import { motion } from "framer-motion";
import {
  Plane,
  BadgeDollarSign,
  MapPinned,
  Headphones,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import Divider from "@mui/material/Divider";

export const AboutPage: React.FC = () => {
  const timeline = [
    {
      year: "1996",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300",
    },
    {
      year: "2006",
      image:
        "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=300",
    },
    {
      year: "2016",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300",
    },
    {
      year: "2022",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    },
    {
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=300",
    },
    {
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=300",
    },
  ];

  return (
    <div className="bg-white">
      <Navbar />

      <section className="relative h-[350px] mt-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="font-poppins text-5xl font-bold">
              About Nishtha Travel
            </h1>

            <p className="mt-4 text-sm">
              Home • About Us
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1423px] mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-slate-900 font-poppins">
                Why We're Best Agency
              </h2>

              <p className="mt-8 text-slate-600 leading-8 text-justify">
                At Nishtha Travel Concierce PVT. LTD. , we believe that every journey should be comfortable, reliable, and memorable. Whether you're traveling for business, leisure, or a special occasion, we are committed to providing exceptional transportation and travel services tailored to your needs.
              </p>

              <p className="mt-4 text-slate-600 leading-8 text-justify">
                With a focus on quality, safety, and customer satisfaction, our experienced team works tirelessly to ensure a seamless travel experience. From premium cab services to carefully curated travel solutions, we strive to exceed expectations at every step.
              </p>
              <p className="mt-4 text-slate-600 leading-8 text-justify">
                Our mission is to connect people with destinations through dependable service, modern vehicles, and personalized support. We take pride in building lasting relationships with our clients and helping them travel with confidence wherever their journey takes them.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                className="rounded-[24px] h-[280px] object-cover w-full"
              />

              <img
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080"
                className="rounded-[24px] h-[220px] mt-12 object-cover w-full"
              />

              <img
                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff"
                className="rounded-[24px] h-[220px] object-cover w-full"
              />

              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                className="rounded-[24px] h-[280px] -mt-12 object-cover w-full"
              />
            </div>

          </div>
        </div>
      </section>

      <section className="mx-10 px-4 pb-6">
        <h2 className="text-5xl font-bold text-slate-900 font-poppins">
          Meet Our Founders
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="
    bg-white
    rounded-[28px]
    p-8
    border
    border-[#E5E0D8]
    shadow-sm
    hover:shadow-lg
    transition-all
  ">
            <div className="
      w-12 h-12
      rounded-2xl
      bg-orange-50
      flex
      items-center
      justify-center
      mb-5
    ">
              <span className="text-orange-500 font-bold">01</span>
            </div>

            <h3 className="text-xl font-bold text-brand-blue mb-4">
              Our Beginning
            </h3>

            <p className="text-slate-600 leading-8 text-justify">
              Both the founders after working for years in multiple areas realised their strength is in managing the people mobility business and that is how Nishtha Travel Concierge Private Limited was born.

              We plan to bring to doorstep of every Indian (Aam Aadmi) the mobility, travel, Air and train ticketing with local transportation needs. Our AI engine is designed to understand your preference and provide best travel solutions and holiday packages.
            </p>
          </div>

          <div className="
    bg-white
    rounded-[28px]
    p-8
    border
    border-[#E5E0D8]
    shadow-sm
    hover:shadow-lg
    transition-all
  ">
            <div className="
      w-12 h-12
      rounded-2xl
      bg-blue-50
      flex
      items-center
      justify-center
      mb-5
    ">
              <span className="text-blue-500 font-bold">02</span>
            </div>

            <h3 className="text-xl font-bold text-brand-blue mb-4">
              Our Vision
            </h3>

            <p className="text-slate-600 leading-8 text-justify">
              With over a decade of experience in managing fleet and employee transportation, both have the vision of making Nishtha Travel Concierge Pvt Ltd the preferred and trusted partner of every company in India for their employee transportation and all mobility needs.
            </p>
          </div>

          <div className="
    bg-white
    rounded-[28px]
    p-8
    border
    border-[#E5E0D8]
    shadow-sm
    hover:shadow-lg
    transition-all
  ">
            <div className="
      w-12 h-12
      rounded-2xl
      bg-green-50
      flex
      items-center
      justify-center
      mb-5
    ">
              <span className="text-green-500 font-bold">03</span>
            </div>

            <h3 className="text-xl font-bold text-brand-blue mb-4">
              Our Mission
            </h3>

            <p className="text-slate-600 leading-8 text-justify">
              We plan to bring to doorstep of every Indian (Aam Aadmi) the mobility, travel, Air and train ticketing with local transportation needs. Our AI engine is designed to understand your preference and provide best travel solutions and holiday packages.
            </p>
          </div>

        </div>
        <div className="mt-10 bg-white">
          <h4 className="font-bold text-slate-900 text-3xl">
            Mr Ramji Patel & Mrs Radha Patel
          </h4>

          <span className="text-slate-500 text-xl">
            Founder & Director
          </span>
        </div>
<Divider
  sx={{
    width: 350,
    borderColor: "orange",
    borderBottomWidth: 4,
  }}
/>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-[#F5F7FF] rounded-[32px] p-10">

            <h2 className="text-center text-3xl font-bold font-poppins">
              We're Providing Best Service Ever!
            </h2>

            <div className="grid md:grid-cols-4 gap-8 mt-10">

              <FeatureCard
                icon={<MapPinned />}
                title="Local Guidance"
                desc="Professional travel experts."
              />

              <FeatureCard
                icon={<BadgeDollarSign />}
                title="Deals & Discounts"
                desc="Best prices on every package."
              />

              <FeatureCard
                icon={<Plane />}
                title="Save Money"
                desc="Affordable luxury travel."
              />

              <FeatureCard
                icon={<Headphones />}
                title="24/7 Support"
                desc="Always here to help."
              />

            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <h2 className="text-5xl font-bold font-poppins">
              Behind The Journey
            </h2>

            <p className="text-slate-500 mt-3">
              Our growth through the years
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-16">

            {timeline.map((item) => (
              <div key={item.year} className="text-center">

                <img
                  src={item.image}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                />

                <p className="font-semibold mt-4">
                  {item.year}
                </p>
              </div>
            ))}

          </div>

          <div className="h-1 bg-blue-600 mt-10 rounded-full" />
        </div>

      </section>

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <h2 className="text-5xl font-bold font-poppins">
              Why Travel With Us?
            </h2>

            <p className="text-slate-500 mt-3">
              We create memorable journeys.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {[
              "Expert Team",
              "Best Price Guarantee",
              "24/7 Customer Support",
            ].map((item) => (
              <div
                key={item}
                className="bg-white rounded-[28px] p-10 shadow-lg hover:shadow-2xl transition-all"
              >
                <h3 className="font-bold text-2xl">
                  {item}
                </h3>

                <p className="mt-4 text-slate-600">
                  Premium travel planning tailored
                  for unforgettable experiences.
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="text-center">
    <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
      {icon}
    </div>

    <h3 className="font-bold mt-4">{title}</h3>

    <p className="text-sm text-slate-500 mt-2">
      {desc}
    </p>
  </div>
);