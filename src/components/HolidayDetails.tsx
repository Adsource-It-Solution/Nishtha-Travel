
import { useParams } from 'react-router-dom';
import { Navbar } from "../components/Navbar";
import { mockPackages } from "../data/mockData";
import { PackageCard } from '../components/PackageCard';

export const HolidayDetails = () => {
    console.log("HolidayItenary Rendered");
    const { id } = useParams<{ id: string }>();
    console.log("Package ID:", id);

    const pkg = mockPackages.find((d) => d.id === id) || mockPackages[0];

    const relatedPackages = mockPackages
        .filter((item) => item.id !== pkg.id)
        .slice(0, 3);

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

                                    <button className="bg-[#2F80ED]
                                                       hover:bg-blue-700
                                                       text-white
                                                       px-4
                                                       py-2
                                                       rounded-2xl
                                                       font-bold
                                                       transition-all
                                                       cursor-pointer">
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
        </div>
    )
}