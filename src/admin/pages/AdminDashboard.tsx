import {
  ArrowUpRight, Clock3,
  Bus,
  User,
  Users2,
  ArrowRight,
  CalendarDays,
  IndianRupee,
  Plane,
  Sparkles,
  TrendingUp,
  Users,
  MapPin,
  Star
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts"

export const AdminDashboard: React.FC = () => {
  const destinations = [
    {
      id: 1,
      name: "Goa",
      country: "India",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200",
      bookings: 142,
      revenue: "₹8.2L",
      rating: 4.9,
      growth: "+18%",
    },
    {
      id: 2,
      name: "Manali",
      country: "Himachal",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
      bookings: 94,
      revenue: "₹5.1L",
      rating: 4.8,
      growth: "+12%",
    }
  ];
  const upcomingTrips = [
    {
      id: 1,
      destination: "Delhi → Manali",
      vehicle: "Volvo Sleeper",
      driver: "Rahul Sharma",
      departure: "09:00 AM",
      passengers: 34,
      status: "Boarding",
      color: "bg-emerald-500",
    },
    {
      id: 2,
      destination: "Delhi → Jaipur",
      vehicle: "Tempo Traveller",
      driver: "Amit Verma",
      departure: "11:30 AM",
      passengers: 18,
      status: "Running",
      color: "bg-blue-500",
    },
    {
      id: 3,
      destination: "Delhi → Agra",
      vehicle: "Luxury Coach",
      driver: "Rohit Singh",
      departure: "02:15 PM",
      passengers: 42,
      status: "Scheduled",
      color: "bg-orange-500",
    },
    {
      id: 4,
      destination: "Delhi → Goa",
      vehicle: "Flight Package",
      driver: "Travel Guide",
      departure: "06:45 PM",
      passengers: 56,
      status: "Confirmed",
      color: "bg-violet-600",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 220000 },
    { month: "Feb", revenue: 310000 },
    { month: "Mar", revenue: 480000 },
    { month: "Apr", revenue: 410000 },
    { month: "May", revenue: 620000 },
    { month: "Jun", revenue: 890000 },
  ];

  const bookingStatus = [
    { name: "Confirmed", value: 64 },
    { name: "Pending", value: 18 },
    { name: "Completed", value: 12 },
    { name: "Cancelled", value: 6 },
  ];

  const COLORS = [
    "#7C3AED",
    "#3B82F6",
    "#22C55E",
    "#F97316",
  ];

  const stats = [
    {
      title: "Revenue",
      value: "₹18.4L",
      growth: "+18%",
      icon: IndianRupee,
      color: "from-violet-600 to-fuchsia-600",
    },
    {
      title: "Bookings",
      value: "428",
      growth: "+12%",
      icon: CalendarDays,
      color: "from-sky-500 to-cyan-500",
    },
    {
      title: "Customers",
      value: "8,245",
      growth: "+24%",
      icon: Users,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Tours Running",
      value: "52",
      growth: "+7%",
      icon: Plane,
      color: "from-orange-500 to-amber-500",
    },
  ];


  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Background Blur */}

      <div className="fixed left-20 top-10 h-96 w-96 rounded-full bg-violet-500/10 blur-[140px]" />

      <div className="fixed right-10 bottom-10 h-[420px] w-[420px] rounded-full bg-blue-400/10 blur-[150px]" />

      <div className="relative z-10 space-y-8">

        {/* ====================================== */}
        {/* HERO */}
        {/* ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-700 via-indigo-600 to-sky-500 p-10 text-white shadow-2xl"
        >

          {/* Decorations */}

          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10" />

          <div className="absolute right-40 bottom-0 h-72 w-72 rounded-full bg-white/5" />

          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.15),transparent_40%)]" />

          <div className="flex items-center justify-between">

            <div className="max-w-2xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-xl">

                <Sparkles className="h-4 w-4" />

                Premium Travel Dashboard

              </div>

              <h1 className="text-5xl font-black leading-tight">

                Explore Beyond

                <br />

                Boundaries 🌍

              </h1>

              <p className="mt-6 max-w-xl text-lg text-violet-100 leading-8">

                Your business is growing faster than ever.
                Revenue, bookings and customer satisfaction are all
                performing exceptionally this month.

              </p>

              <div className="mt-10 flex gap-5">

                <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-violet-700 transition hover:scale-105">

                  View Analytics

                </button>

                <button className="rounded-2xl border border-white/40 bg-white/10 px-6 py-3 backdrop-blur-xl transition hover:bg-white/20">

                  Download Report

                </button>

              </div>

            </div>

            <div className="hidden xl:flex">

              <div className="rounded-[28px] bg-white/10 p-8 backdrop-blur-2xl">

                <div className="flex items-center gap-3">

                  <TrendingUp className="h-10 w-10" />

                  <div>

                    <p className="text-sm text-violet-100">

                      Monthly Growth

                    </p>

                    <h2 className="text-4xl font-bold">

                      +18%

                    </h2>

                  </div>

                </div>

                <div className="mt-8 space-y-5">

                  <div className="flex justify-between">

                    <span>Revenue</span>

                    <span>₹18.4L</span>

                  </div>

                  <div className="flex justify-between">

                    <span>Bookings</span>

                    <span>428</span>

                  </div>

                  <div className="flex justify-between">

                    <span>Rating</span>

                    <span>4.9 ★</span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

        {/* ====================================== */}
        {/* KPI CARDS */}
        {/* ====================================== */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * .12,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-[28px] border border-white/40 bg-white/80 p-7 shadow-xl backdrop-blur-xl transition"
              >

                <div className="flex items-center justify-between">

                  <div
                    className={`rounded-2xl bg-gradient-to-r ${item.color} p-4 text-white shadow-lg`}
                  >

                    <Icon className="h-7 w-7" />

                  </div>

                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">

                    {item.growth}

                  </div>

                </div>

                <h3 className="mt-8 text-slate-500">

                  {item.title}

                </h3>

                <h1 className="mt-2 text-4xl font-black text-slate-900">

                  {item.value}

                </h1>

                <div className="mt-8 flex items-center justify-between">

                  <span className="text-sm text-slate-400">

                    Compared to last month

                  </span>

                  <ArrowUpRight className="h-5 w-5 text-violet-600 transition group-hover:translate-x-1 group-hover:-translate-y-1" />

                </div>

              </motion.div>

            );

          })}

        </div>
        {/* ====================================== */}
        {/* REVENUE CHART + BOOKING STATUS */}
        {/* ====================================== */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ================= Revenue ================= */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .5 }}
            className="xl:col-span-2 overflow-hidden rounded-[30px] border border-white/50 bg-white/80 shadow-xl backdrop-blur-xl"
          >

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">

              <div>

                <h2 className="text-2xl font-bold text-slate-800">

                  Revenue Analytics

                </h2>

                <p className="mt-1 text-slate-500">

                  Monthly earnings performance

                </p>

              </div>

              <div className="flex gap-2">

                <button className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white">

                  Month

                </button>

                <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200">

                  Week

                </button>

                <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200">

                  Year

                </button>

              </div>

            </div>

            {/* Revenue Numbers */}

            <div className="grid grid-cols-3 border-b border-slate-100">

              <div className="p-6">

                <p className="text-sm text-slate-500">

                  Total Revenue

                </p>

                <h1 className="mt-2 text-3xl font-black">

                  ₹18.4L

                </h1>

              </div>

              <div className="p-6">

                <p className="text-sm text-slate-500">

                  Net Profit

                </p>

                <h1 className="mt-2 text-3xl font-black text-emerald-600">

                  ₹6.8L

                </h1>

              </div>

              <div className="p-6">

                <p className="text-sm text-slate-500">

                  Growth

                </p>

                <h1 className="mt-2 flex items-center gap-2 text-3xl font-black text-violet-600">

                  +18%

                  <TrendingUp className="h-6 w-6" />

                </h1>

              </div>

            </div>

            {/* Chart */}

            <div className="h-[380px] px-5 py-8">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={revenueData}>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#E2E8F0"
                  />

                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: 18,
                      border: "none",
                      boxShadow:
                        "0 20px 45px rgba(0,0,0,.08)",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#7C3AED"
                    strokeWidth={4}
                    dot={{
                      r: 5,
                      fill: "#7C3AED",
                    }}
                    activeDot={{
                      r: 8,
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

          {/* ================= Booking Status ================= */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: .2 }}
            className="rounded-[30px] border border-white/50 bg-white/80 p-8 shadow-xl backdrop-blur-xl"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">

                  Booking Status

                </h2>

                <p className="mt-1 text-slate-500">

                  Current bookings

                </p>

              </div>

              <CalendarDays className="text-violet-500" />

            </div>

            {/* Donut */}

            <div className="mt-8 h-64">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={bookingStatus}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={5}
                  >

                    {bookingStatus.map((_, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            {/* Legend */}

            <div className="space-y-4">

              {bookingStatus.map((item, index) => (

                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: COLORS[index],
                      }}
                    />

                    <span className="font-medium">

                      {item.name}

                    </span>

                  </div>

                  <span className="font-bold">

                    {item.value}%

                  </span>

                </div>

              ))}

            </div>

            {/* Bottom Summary */}

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-5 text-white">

              <p className="text-sm opacity-80">

                This Month

              </p>

              <h2 className="mt-2 text-3xl font-black">

                428 Bookings

              </h2>

              <p className="mt-3 text-violet-100">

                Booking volume increased by
                <span className="font-bold"> 12% </span>
                compared to last month.

              </p>

            </div>

          </motion.div>

        </div>

        <div className="grid gap-6 xl:grid-cols-5">
          <div className="xl:col-span-3">
            {/* ====================================== */}
            {/* POPULAR DESTINATIONS */}
            {/* ====================================== */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[30px] border border-white/50 bg-white/80 p-8 shadow-xl backdrop-blur-xl"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-slate-800">

                    Popular Destinations

                  </h2>

                  <p className="mt-2 text-slate-500">

                    Top performing destinations this month

                  </p>

                </div>

                <button className="rounded-xl bg-violet-100 px-5 py-2 font-medium text-violet-700">

                  View All

                </button>

              </div>

              <div className="mt-8 grid gap-7 lg:grid-cols-2">

                {destinations.map((item, index) => (

                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * .15,
                    }}
                    whileHover={{
                      y: -10,
                    }}
                    className="group overflow-hidden rounded-[28px] bg-white shadow-xl"
                  >

                    {/* Image */}

                    <div className="relative h-64 overflow-hidden">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute left-5 top-5 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-xl">

                        {item.growth}

                      </div>

                      <div className="absolute bottom-5 left-5">

                        <h2 className="text-3xl font-black text-white">

                          {item.name}

                        </h2>

                        <div className="mt-2 flex items-center gap-2 text-white/90">

                          <MapPin className="h-4 w-4" />

                          {item.country}

                        </div>

                      </div>

                    </div>

                    {/* Content */}

                    <div className="p-6">

                      <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-2xl bg-slate-100 p-4">

                          <p className="text-sm text-slate-500">

                            Revenue

                          </p>

                          <h2 className="mt-2 text-xl font-black">

                            {item.revenue}

                          </h2>

                        </div>

                        <div className="rounded-2xl bg-slate-100 p-4">

                          <p className="text-sm text-slate-500">

                            Bookings

                          </p>

                          <h2 className="mt-2 text-xl font-black">

                            {item.bookings}

                          </h2>

                        </div>

                      </div>

                      <div className="mt-6 flex items-center justify-between">

                        <div className="flex items-center gap-2">
                          <Star
                            className="fill-yellow-400 text-yellow-400"
                            size={18}
                          />
                          <span className="font-semibold">
                            {item.rating}
                          </span>
                        </div>
                        <button className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-white transition hover:scale-105">
                          Explore
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="xl:col-span-2 rounded-[30px] border border-white/50 bg-white/80 p-7 shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">

                  Upcoming Trips

                </h2>

                <p className="mt-1 text-slate-500">

                  Today's departures

                </p>

              </div>

              <Clock3 className="text-violet-600" />

            </div>

            <div className="relative mt-10">

              <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500 via-sky-400 to-transparent" />

              <div className="space-y-7">

                {upcomingTrips.map((trip, index) => (

                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * .1,
                    }}
                    whileHover={{
                      x: 6,
                    }}
                    className="relative flex gap-5"
                  >

                    {/* Timeline Dot */}

                    <div
                      className={`mt-3 h-4 w-4 rounded-full ${trip.color} ring-8 ring-white`}
                    />

                    {/* Card */}

                    <div className="flex-1 rounded-3xl bg-slate-50 p-5 transition hover:bg-slate-100">

                      <div className="flex items-center justify-between">

                        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">

                          {trip.departure}

                        </span>

                        <span
                          className={`${trip.color} rounded-full px-3 py-1 text-xs font-semibold text-white`}
                        >

                          {trip.status}

                        </span>

                      </div>

                      <div className="mt-5 flex items-center gap-2">

                        <Bus
                          size={18}
                          className="text-violet-600"
                        />

                        <h3 className="font-bold text-slate-800">

                          {trip.destination}

                        </h3>

                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">

                        <ArrowRight size={14} />

                        {trip.vehicle}

                      </div>

                      <div className="mt-4 flex items-center justify-between">

                        <div className="flex items-center gap-2">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white">

                            <User size={18} />

                          </div>

                          <div>

                            <p className="text-sm font-semibold">

                              {trip.driver}

                            </p>

                            <p className="text-xs text-slate-500">

                              Driver

                            </p>

                          </div>

                        </div>

                        <div className="text-right">

                          <div className="flex items-center justify-end gap-1">

                            <Users2
                              size={16}
                              className="text-slate-400"
                            />

                            <span className="font-bold">

                              {trip.passengers}

                            </span>

                          </div>

                          <p className="text-xs text-slate-500">

                            Passengers

                          </p>

                        </div>

                      </div>

                    </div>

                  </motion.div>

                ))}

              </div>

            </div>

          </motion.div>

        </div>

        {/* ====================================== */}
        {/* NEXT SECTION */}
        {/* Vehicle Analytics + Customer Satisfaction */}
        {/* Part 4 */}
        {/* ====================================== */}
      </div>

    </div>
  );
};
