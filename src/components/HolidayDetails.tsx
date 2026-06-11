
import { useParams } from 'react-router-dom';
import { Navbar } from "../components/Navbar";
import { mockPackages } from "../data/mockData";
import { PackageCard } from '../components/PackageCard';
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from 'react';


export const HolidayDetails = () => {
    console.log("HolidayItenary Rendered");
    const { id } = useParams<{ id: string }>();
    console.log("Package ID:", id);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    const [travelerName, setTravelerName] = useState("");
    const [travelerPhone, setTravelerPhone] = useState("");
    const [travelerEmail, setTravelerEmail] = useState("");
    const [travelDate, setTravelDate] = useState("");

    const [bookingResponse, setBookingResponse] = useState<any>(null);

    const pkg = mockPackages.find((d) => d.id === id) || mockPackages[0];

    const relatedPackages = mockPackages
        .filter((item) => item.id !== pkg.id)
        .slice(0, 3);

    const handleBookPackage = () => {
        const confirmationCode =
            "HT" + Math.floor(100000 + Math.random() * 900000);

        setBookingResponse({
            confirmationCode,
        });

        setBookingConfirmed(true);
    };

    return (
        <div className="bg-slate-50 min-h-screen text-slate-800 relative overflow-hidden">
            <Navbar />
            <div className="min-h-screen bg-gray-50">

                {/* Hero Section */}
                <section className="relative h-[500px]">
                    <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/50" />

                    <div className="absolute bottom-10 left-10 text-white">
                        <span className="bg-primary px-4 py-2 rounded-full">
                            {pkg.tourType}
                        </span>

                        <h1 className="text-5xl font-bold mt-4">
                            {pkg.title}
                        </h1>

                        <div className="flex gap-6 mt-4">
                            <span>⭐ {pkg.rating}</span>
                            <span>📍 {pkg.destination}</span>
                            <span>🕒 {pkg.duration}</span>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-3 gap-10">

                        {/* Content */}
                        <div className="lg:col-span-2">

                            {/* Overview */}
                            <div className="bg-white rounded-3xl p-8 mb-8">
                                <h2 className="text-2xl font-bold mb-4">
                                    Overview
                                </h2>

                                {pkg.overview && (
                                    <div className="bg-white rounded-3xl p-8 mb-8">
                                        <h2 className="text-2xl font-bold mb-4">
                                            Overview
                                        </h2>
                                        <p>{pkg.overview}</p>
                                    </div>
                                )}
                            </div>

                            {/* Highlights */}
                            {pkg.highlights?.length ? (
                                <div className="bg-white rounded-3xl p-8 mb-8">
                                    <h2 className="text-2xl font-bold mb-4">
                                        Tour Highlights
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {pkg.highlights.map((item, index) => (
                                            <div key={index}>✓ {item}</div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {/* Itinerary */}
                            {pkg.itinerary?.length ? (
                                <div className="bg-white rounded-3xl p-8 mb-8">
                                    <h2 className="text-2xl font-bold mb-6">
                                        Day Wise Itinerary
                                    </h2>

                                    {pkg.itinerary.map((day) => (
                                        <div
                                            key={day.day}
                                            className="border-l-4 border-primary pl-6 pb-8"
                                        >
                                            <h3 className="font-bold text-lg">
                                                Day {day.day}: {day.title}
                                            </h3>

                                            <p className="text-gray-600 mt-2">
                                                {day.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : null}

                            {/* Included */}
                            <div className="bg-white rounded-3xl p-8 mb-8">
                                <h2 className="text-2xl font-bold mb-4">
                                    What's Included
                                </h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {pkg.includedServices.map(service => (
                                        <div>✓ {service}</div>
                                    ))}
                                </div>
                            </div>

                            {/* Excluded */}
                            {pkg.exclusions?.length ? (
                                <div className="bg-white rounded-3xl p-8">
                                    <h2 className="text-2xl font-bold mb-4">
                                        What's Not Included
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {pkg.exclusions.map((item, index) => (
                                            <div key={index}>✕ {item}</div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        {/* Sidebar */}
                        <div>

                            <div className="sticky top-24">

                                <div className="bg-white rounded-3xl p-8 shadow-lg">

                                    <div className="mb-4">
                                        <span className="line-through text-gray-400">
                                            ₹ {pkg.originalPrice}
                                        </span>
                                    </div>

                                    <h2 className="text-4xl font-bold">
                                        ₹ {pkg.price}
                                    </h2>

                                    <p className="text-gray-500">
                                        Per Person
                                    </p>

                                    <button className="w-full mt-6 bg-primary text-white py-4 rounded-xl">
                                        Book This Package
                                    </button>

                                    <button
                                        onClick={() => setShowBookingModal(true)}
                                        className="
    bg-[#2F80ED]
    hover:bg-blue-700
    text-white
    px-4
    py-2
    rounded-2xl
    font-bold
    transition-all
    cursor-pointer
  "
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Packages */}
                <section className="max-w-7xl mx-auto px-6 py-16">

                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">
                            You May Also Like
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedPackages.map(pkg => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>

                </section>

            </div>
            <AnimatePresence>
                {showBookingModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                if (!bookingConfirmed) {
                                    setShowBookingModal(false);
                                }
                            }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 15 }}
                            onClick={(e) => e.stopPropagation()}
                            className="
          bg-white
          border
          border-[#E5E0D8]
          max-w-5xl
          w-full
          relative
          z-10
          p-8
          rounded-xl
        "
                        >

                            {!bookingConfirmed ? (
                                <>
                                    {/* Header */}

                                    <div className="flex justify-between items-start">

                                        <div>
                                            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-yellow-500 block">
                                                Holiday Reservation
                                            </span>

                                            <h3 className="text-3xl font-bold text-brand-blue mt-2">
                                                Reserve Your Package
                                            </h3>

                                            <p className="text-slate-500 mt-2">
                                                Complete your details to secure this travel experience.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setShowBookingModal(false)}
                                            className="text-slate-400 hover:text-slate-700 text-2xl"
                                        >
                                            ×
                                        </button>

                                    </div>

                                    {/* Main Layout */}

                                    <div className="grid md:grid-cols-2 gap-8 mt-8">

                                        {/* LEFT */}

                                        <div className="space-y-6">

                                            <div className="bg-blue-500 p-6 rounded-xl text-white">

                                                <span className="text-[10px] uppercase tracking-widest">
                                                    Selected Package
                                                </span>

                                                <h4 className="text-3xl font-bold mt-3">
                                                    {pkg.title}
                                                </h4>

                                                <p className="mt-2 text-white/90">
                                                    {pkg.destination}, {pkg.country}
                                                </p>

                                                <div className="border-t border-white/20 mt-5 pt-5 space-y-3">

                                                    <div className="flex justify-between">
                                                        <span>Duration</span>
                                                        <span>{pkg.duration}</span>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span>Tour Type</span>
                                                        <span>{pkg.tourType}</span>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span>Rating</span>
                                                        <span>⭐ {pkg.rating}</span>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="border border-[#E5E0D8] rounded-xl p-6">

                                                <span className="text-xs uppercase tracking-widest text-slate-500">
                                                    Total Package Cost
                                                </span>

                                                <h3 className="text-5xl font-bold text-brand-blue mt-2">
                                                    ₹{pkg.price}
                                                </h3>

                                                <p className="text-slate-500 mt-2">
                                                    Per traveler including curated experiences.
                                                </p>

                                                {pkg.originalPrice && (
                                                    <p className="text-sm text-slate-400 mt-3">
                                                        Regular Price:
                                                        <span className="line-through ml-2">
                                                            ₹{pkg.originalPrice}
                                                        </span>
                                                    </p>
                                                )}

                                            </div>

                                        </div>

                                        {/* RIGHT */}

                                        <div className="space-y-4">

                                            <label className="text-xs font-bold uppercase tracking-widest text-yellow-500">
                                                Traveler Information
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                value={travelerName}
                                                onChange={(e) => setTravelerName(e.target.value)}
                                                className="w-full border border-[#E5E0D8] p-4 rounded-lg"
                                            />

                                            <input
                                                type="text"
                                                placeholder="Phone Number"
                                                value={travelerPhone}
                                                onChange={(e) => setTravelerPhone(e.target.value)}
                                                className="w-full border border-[#E5E0D8] p-4 rounded-lg"
                                            />

                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={travelerEmail}
                                                onChange={(e) => setTravelerEmail(e.target.value)}
                                                className="w-full border border-[#E5E0D8] p-4 rounded-lg"
                                            />

                                            <input
                                                type="date"
                                                value={travelDate}
                                                onChange={(e) => setTravelDate(e.target.value)}
                                                className="w-full border border-[#E5E0D8] p-4 rounded-lg"
                                            />

                                            <div className="grid grid-cols-2 gap-3 pt-4">

                                                <button
                                                    onClick={() => setShowBookingModal(false)}
                                                    className="
                      h-14
                      border
                      border-[#E5E0D8]
                      rounded-lg
                      hover:bg-slate-50
                    "
                                                >
                                                    Cancel
                                                </button>

                                                <button
                                                    onClick={handleBookPackage}
                                                    className="
                      h-14
                      bg-blue-500
                      hover:bg-blue-600
                      text-white
                      rounded-lg
                      font-semibold
                    "
                                                >
                                                    Confirm Booking
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16"
                                >

                                    <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto">
                                        <Check className="w-10 h-10 text-yellow-500" />
                                    </div>

                                    <h3 className="text-3xl font-bold text-brand-blue mt-6">
                                        Holiday Package Reserved
                                    </h3>

                                    <p className="text-slate-500 mt-4 max-w-md mx-auto">
                                        Your booking request has been received successfully.
                                        Our travel specialist will contact you shortly.
                                    </p>

                                    <div className="mt-6 text-lg">
                                        Confirmation Code:
                                        <span className="font-bold text-brand-blue ml-2">
                                            {bookingResponse?.confirmationCode}
                                        </span>
                                    </div>

                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}