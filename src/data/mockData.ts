export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  rating: number;
  reviewsCount: number;
  category: 'international' | 'domestic' | 'luxury' | 'adventure' | 'beach' | 'mountains' | 'honeymoon' | 'family';
  trending: boolean;
  weather: {
    temp: string;
    condition: string;
    icon: string;
  };
  itinerary: {
    day: number;
    title: string;
    details: string;
  }[];
  highlights: string[];
  nearbyAttractions: { name: string; distance: string; image: string }[];
  foodExperiences: { name: string; description: string; image: string }[];
  faqs: { question: string; answer: string }[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  originalPricePerNight?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  amenities: string[];
  featured: boolean;
  discountTag?: string;
  latitude: number;
  longitude: number;
}

export interface Flight {
  id: string;
  airlineName: string;
  airlineLogo: string;
  flightNumber: string;
  departureCity: string;
  departureCode: string;
  departureTime: string;
  arrivalCity: string;
  arrivalCode: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  refundable: boolean;
  class: 'Economy' | 'Premium Economy' | 'Business' | 'First Class';
  discountBadge?: string;
}

export interface Package {
  id: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category: string;
  featured: boolean;
  tourType: string;
  discountPercentage?: number;
  features: string[];
  includedServices: string[];

  // NEW FIELDS
  overview?: string;

  gallery?: string[];

  itinerary?: {
    day: number;
    title: string;
    description: string;
  }[];

  exclusions?: string[];

  highlights?: string[];

  hotels?: {
    name: string;
    category: string;
    image: string;
  }[];

  policies?: string[];

  location?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  location: string;
}

export interface Cab {
  id: string;
  name: string;
  type: string;
  image: string;
  rate: string;
  capacity: string;
  luggage: string;
  description: string;
  featured?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  expiryDate: string;
  image: string;
  category: 'flights' | 'hotels' | 'packages' | 'all';
}

// High quality luxury travel images from Unsplash
export const mockDestinations: Destination[] = [
  {
    id: "dest-1",
    name: "Maldives",
    country: "South Asia",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    description: "An archipelago of over 1,000 coral islands, Maldives is synonymous with luxury, crystal-clear turquoise waters, private overwater bungalows, and spectacular marine life.",
    rating: 4.9,
    reviewsCount: 1240,
    category: "luxury",
    trending: true,
    weather: { temp: "29°C", condition: "Sunny", icon: "☀️" },
    itinerary: [
      { day: 1, title: "Arrival & Sunset Villa Cruise", details: "Arrive at Malé International Airport, transfer by private seaplane to the resort. Enjoy a sunset cruise with champagne." },
      { day: 2, title: "Private Reef Snorkeling & Spa", details: "Explore the house reef with a private marine biologist. In the afternoon, indulge in a 90-minute couples massage." },
      { day: 3, title: "Sandbank Picnic Experience", details: "Travel to a secluded, private sandbank for a chef-prepared gourmet picnic lunch surrounded by pristine azure waters." },
      { day: 4, title: "Sunset Dolphin Cruise & Beach BBQ", details: "Embark on a luxury yacht cruise to see spinner dolphins. Dine under the stars with a private beach barbecue bonfire." }
    ],
    highlights: ["Overwater Private Villa", "Coral Reef Snorkeling", "Seaplane Transfers", "Michelin-star Dining", "Private Sandbank Spa"],
    nearbyAttractions: [
      { name: "Ari Atoll Reef", distance: "15 mins by speedboat", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80" },
      { name: "Malé Fish Market", distance: "30 mins flight", image: "https://images.unsplash.com/photo-1534080391025-44799e9d6d73?auto=format&fit=crop&w=300&q=80" }
    ],
    foodExperiences: [
      { name: "Ithaa Undersea Restaurant", description: "Dine 5 meters below the ocean surface with 180-degree panoramic views of marine life.", image: "https://images.unsplash.com/photo-1554672408-730436b60dde?auto=format&fit=crop&w=300&q=80" }
    ],
    faqs: [
      { question: "When is the best time to visit the Maldives?", answer: "The best time to visit is during the dry season from November to April, where you will experience clear skies and calm waters." },
      { question: "Are transfers included in the packages?", answer: "Yes, our luxury packages include private speedboat or seaplane transfers directly from Malé Airport." }
    ]
  },
  {
    id: "dest-2",
    name: "Amalfi Coast",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80",
    description: "A breathtaking 50-kilometer stretch of coastline in southern Italy, famed for its sheer cliffs, colorful cliffside villages, terraced vineyards, and cliff-clinging villas.",
    rating: 4.8,
    reviewsCount: 940,
    category: "honeymoon",
    trending: true,
    weather: { temp: "24°C", condition: "Breezy", icon: "🌤️" },
    itinerary: [
      { day: 1, title: "Benvenuto in Positano", details: "Arrive in Naples, transfer via private Mercedes S-Class. Check in to your cliffside suite with private terrace." },
      { day: 2, title: "Private Riva Yacht to Capri", details: "Board a private Riva speedboat to Capri. Visit the Blue Grotto, swim in secluded coves, and stroll Capri's designer boutiques." },
      { day: 3, title: "Limoncello Tour & Cooking Class", details: "Wander organic lemon groves in Ravello, followed by a private cooking masterclass with a local grandmother and chef." }
    ],
    highlights: ["Positano Panoramic Suites", "Capri Private Riva Yacht", "Ravello Gardens", "Path of the Gods Hiking", "Limoncello Tasting"],
    nearbyAttractions: [
      { name: "Villa Cimbrone Gardens", distance: "10 mins (Ravello)", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=300&q=80" },
      { name: "Blue Grotto Capri", distance: "45 mins yacht", image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=300&q=80" }
    ],
    foodExperiences: [
      { name: "Da Adolfo Beach Dining", description: "Secluded beachfront restaurant reachable only by a red-fish boat, serving fresh caught seafood.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80" }
    ],
    faqs: [
      { question: "Is the Amalfi Coast suitable for families?", answer: "Yes, though the cliffside steps can be challenging for strollers. We curate family itineraries featuring private minivans and kid-friendly tours." }
    ]
  },
  {
    id: "dest-3",
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    description: "The historical heart of Japan, Kyoto houses thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden machiya houses.",
    rating: 4.9,
    reviewsCount: 1530,
    category: "international",
    trending: false,
    weather: { temp: "18°C", condition: "Clear", icon: "☀️" },
    itinerary: [
      { day: 1, title: "Traditional Ryokan Check-in", details: "Check into a luxury 150-year-old ryokan. Unwind in the private natural onsen, followed by a multi-course Kaiseki dinner." }
    ],
    highlights: ["Kaiseki Fine Dining", "Private Tea Ceremony", "Bamboo Forest Guided Walk", "Geisha District Evening Tour"],
    nearbyAttractions: [
      { name: "Fushimi Inari Shrine", distance: "10 mins by train", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=80" }
    ],
    foodExperiences: [
      { name: "Gion Kaiseki", description: "Artistic, multi-course Japanese seasonal dining served in historical lacquerware.", image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=300&q=80" }
    ],
    faqs: []
  },
  {
    id: "dest-4",
    name: "Swiss Alps",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description: "Towering snow-capped peaks, crystal alpine lakes, and quaint mountain chalets. Home to elite ski resorts, scenic luxury trains, and pristine alpine wellness centers.",
    rating: 4.85,
    reviewsCount: 880,
    category: "mountains",
    trending: true,
    weather: { temp: "12°C", condition: "Snowy", icon: "❄️" },
    itinerary: [
      { day: 1, title: "St. Moritz Arrival", details: "Transfer via the Glacier Express VIP cabin to St. Moritz. Settle in your 5-star mountain chalet." }
    ],
    highlights: ["Glacier Express Scenic Train", "Private Heli-Skiing", "Thermal Bath Wellness", "Michelin Chalet Dining"],
    nearbyAttractions: [
      { name: "Matterhorn Glacier Paradise", distance: "Zermatt Cable Car", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80" }
    ],
    foodExperiences: [
      { name: "Chesa Veglia Fondue", description: "Historic 1658 farmhouse serving the ultimate artisanal cheese fondue and truffle pizzas.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80" }
    ],
    faqs: []
  }
];

export const mockHotels: Hotel[] = [
  {
    id: "hotel-1",
    name: "One&Only Reethi Rah",
    location: "Maldives",
    pricePerNight: 1250,
    originalPricePerNight: 1500,
    rating: 4.9,
    reviewsCount: 380,
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Private Pool", "Private Beach", "Overwater Villa", "Spa", "Butlers", "5-Star Dining"],
    featured: true,
    discountTag: "Save 15% This Week",
    latitude: 4.73,
    longitude: 73.36
  },
  {
    id: "hotel-2",
    name: "Le Sirenuse",
    location: "Positano, Amalfi Coast",
    pricePerNight: 950,
    rating: 4.8,
    reviewsCount: 420,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Infinity Pool", "Cliffside Balcony", "Champagne Bar", "Spa", "Michelin Dining"],
    featured: true,
    latitude: 40.62,
    longitude: 14.48
  },
  {
    id: "hotel-3",
    name: "Aman Tokyo",
    location: "Otemachi, Tokyo, Japan",
    pricePerNight: 1100,
    rating: 4.95,
    reviewsCount: 290,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Sky High Pool", "Traditional Onsen Spa", "Zen Garden Lounge", "Skyline Views", "Tech Hub"],
    featured: false,
    latitude: 35.68,
    longitude: 139.76
  },
  {
    id: "hotel-4",
    name: "The Chedi Andermatt",
    location: "Andermatt, Swiss Alps",
    pricePerNight: 820,
    originalPricePerNight: 980,
    rating: 4.75,
    reviewsCount: 210,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518733057074-b58690558f33?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Ski-in/Ski-out", "Heated Outdoor Pool", "Cheese Humidor Room", "Indo-Asian Cuisine", "Wellness Spa"],
    featured: true,
    discountTag: "Complimentary Ski Passes Included",
    latitude: 46.63,
    longitude: 8.59
  }
];

export const mockFlights: Flight[] = [
  {
    id: "fl-1",
    airlineName: "Emirates",
    airlineLogo: "https://logos-world.net/wp-content/uploads/2020/03/Emirates-Logo.png", // Using a recognizable tag name
    flightNumber: "EK-201",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "11:40 AM",
    arrivalCity: "Dubai",
    arrivalCode: "DXB",
    arrivalTime: "08:15 AM (+1)",
    duration: "12h 35m",
    stops: 0,
    price: 980,
    refundable: true,
    class: "Economy",
    discountBadge: "Best Value"
  },
  {
    id: "fl-2",
    airlineName: "Qatar Airways",
    airlineLogo: "https://logos-world.net/wp-content/uploads/2023/03/Qatar-Airways-Logo.png",
    flightNumber: "QR-704",
    departureCity: "London",
    departureCode: "LHR",
    departureTime: "03:00 PM",
    arrivalCity: "Malé",
    arrivalCode: "MLE",
    arrivalTime: "06:10 AM (+1)",
    duration: "10h 10m",
    stops: 1,
    price: 2450,
    refundable: true,
    class: "Business",
    discountBadge: "Luxury Deal"
  },
  {
    id: "fl-3",
    airlineName: "Singapore Airlines",
    airlineLogo: "https://logos-world.net/wp-content/uploads/2023/01/Singapore-Airlines-Logo.png",
    flightNumber: "SQ-21",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "09:50 AM",
    arrivalCity: "Singapore",
    arrivalCode: "SIN",
    arrivalTime: "05:30 PM (+1)",
    duration: "18h 40m",
    stops: 0,
    price: 5200,
    refundable: true,
    class: "First Class",
    discountBadge: "Premium Choice"
  },
  {
    id: "fl-4",
    airlineName: "Etihad Airways",
    airlineLogo: "https://logos-world.net/wp-content/uploads/2023/03/Etihad-Airways-Logo.png",
    flightNumber: "EY-102",
    departureCity: "Paris",
    departureCode: "CDG",
    departureTime: "09:30 PM",
    arrivalCity: "Tokyo",
    arrivalCode: "NRT",
    arrivalTime: "07:20 PM (+1)",
    duration: "14h 50m",
    stops: 1,
    price: 1120,
    refundable: false,
    class: "Premium Economy",
    discountBadge: "Save $150"
  }
];

export const mockCabs = [
  {
    id: "cab-1",
    name: "Maruti Suzuki Dzire",
    type: "sedan",
    category: "Corporate Sedan",
    image: "/fleet/dzire.webp",
    rating: 4.8,
    reviewsCount: 124,
    capacity: 4,
    luggage: 2,
    pricePerKm: 14,
    basePrice: 1200,
    description:
      "Comfortable and economical sedan ideal for airport transfers, city travel and employee transportation.",
    features: [
      "Air Conditioning",
      "Professional Driver",
      "GPS Tracking",
      "Sanitized Vehicle"
    ]
  },

  {
    id: "cab-2",
    name: "Honda City",
    type: "sedan",
    category: "Executive Sedan",
    image: "/fleet/honda-city.avif",
    rating: 4.9,
    reviewsCount: 96,
    capacity: 4,
    luggage: 3,
    pricePerKm: 18,
    basePrice: 1500,
    description:
      "Premium sedan offering superior comfort for business meetings and executive travel.",
    features: [
      "Leather Seats",
      "WiFi Available",
      "Professional Driver",
      "Airport Transfers"
    ]
  },

  {
    id: "cab-3",
    name: "Toyota Innova Crysta",
    type: "suv",
    category: "Premium SUV",
    image: "/fleet/innova.jpg",
    rating: 4.9,
    reviewsCount: 183,
    capacity: 7,
    luggage: 5,
    pricePerKm: 24,
    basePrice: 2200,
    description:
      "India's most preferred luxury people mover for family tours and corporate delegations.",
    features: [
      "7 Seater",
      "Captain Seats",
      "Large Luggage Space",
      "Airport Pickup"
    ]
  },

  {
    id: "cab-4",
    name: "Toyota Hycross",
    type: "suv",
    category: "Luxury SUV",
    image: "/fleet/hycross.avif",
    rating: 5.0,
    reviewsCount: 75,
    capacity: 7,
    luggage: 5,
    pricePerKm: 28,
    basePrice: 2600,
    description:
      "Advanced hybrid SUV with premium interiors and exceptional ride comfort.",
    features: [
      "Hybrid Technology",
      "Premium Interiors",
      "Panoramic Roof",
      "Luxury Ride"
    ]
  },

  {
    id: "cab-5",
    name: "Mahindra XUV700",
    type: "suv",
    category: "Executive SUV",
    image: "/fleet/xuv700.avif",
    rating: 4.8,
    reviewsCount: 112,
    capacity: 6,
    luggage: 4,
    pricePerKm: 22,
    basePrice: 2100,
    description:
      "Modern SUV packed with luxury features for outstation and business travel.",
    features: [
      "ADAS Safety",
      "Luxury Interior",
      "Sunroof",
      "Premium Audio"
    ]
  },

  {
    id: "cab-6",
    name: "Mercedes-Benz E-Class",
    type: "luxury",
    category: "Luxury Sedan",
    image: "/fleet/eclass.jpg",
    rating: 5.0,
    reviewsCount: 64,
    capacity: 4,
    luggage: 3,
    pricePerKm: 55,
    basePrice: 6000,
    description:
      "Luxury chauffeur-driven sedan designed for VIP and executive transportation.",
    features: [
      "Executive Seating",
      "Luxury Chauffeur",
      "WiFi",
      "VIP Service"
    ]
  },

  {
    id: "cab-7",
    name: "BMW 5 Series",
    type: "luxury",
    category: "Luxury Sedan",
    image: "/fleet/bmw5.avif",
    rating: 5.0,
    reviewsCount: 52,
    capacity: 4,
    luggage: 3,
    pricePerKm: 60,
    basePrice: 6500,
    description:
      "Elegant executive sedan for premium business and leisure travel.",
    features: [
      "Luxury Leather Seats",
      "Business Travel",
      "Premium Audio",
      "VIP Driver"
    ]
  },

  {
    id: "cab-8",
    name: "Mercedes-Benz S-Class",
    type: "luxury",
    category: "Ultra Luxury",
    image: "/fleet/sclass.jpg",
    rating: 5.0,
    reviewsCount: 43,
    capacity: 4,
    luggage: 3,
    pricePerKm: 85,
    basePrice: 10000,
    description:
      "Flagship luxury vehicle offering unmatched comfort and prestige.",
    features: [
      "VIP Transport",
      "Massage Seats",
      "Luxury Cabin",
      "Premium Chauffeur"
    ]
  },

  {
    id: "cab-9",
    name: "Toyota Fortuner",
    type: "suv",
    category: "Luxury SUV",
    image: "/fleet/fortuner.avif",
    rating: 4.8,
    reviewsCount: 140,
    capacity: 7,
    luggage: 5,
    pricePerKm: 30,
    basePrice: 3000,
    description:
      "Powerful SUV suitable for long-distance journeys and corporate roadshows.",
    features: [
      "Powerful Engine",
      "Premium Seating",
      "Long Distance Travel",
      "Large Luggage Space"
    ]
  },

  {
    id: "cab-10",
    name: "12-Seater Tempo Traveller",
    type: "traveller",
    category: "Group Travel",
    image: "/fleet/traveller12.jpg",
    rating: 4.7,
    reviewsCount: 88,
    capacity: 12,
    luggage: 10,
    pricePerKm: 32,
    basePrice: 4500,
    description:
      "Comfortable group transportation for family tours and corporate outings.",
    features: [
      "12 Seater",
      "Pushback Seats",
      "Tour Packages",
      "Corporate Trips"
    ]
  },

  {
    id: "cab-11",
    name: "17-Seater Tempo Traveller",
    type: "traveller",
    category: "Group Travel",
    image: "/fleet/traveller17.webp",
    rating: 4.8,
    reviewsCount: 73,
    capacity: 17,
    luggage: 12,
    pricePerKm: 38,
    basePrice: 5500,
    description:
      "Spacious premium traveller with reclining seats and luggage storage.",
    features: [
      "17 Seater",
      "Reclining Seats",
      "Group Tours",
      "Corporate Events"
    ]
  },

  {
    id: "cab-12",
    name: "Force Urbania",
    type: "coach",
    category: "Premium Van",
    image: "/fleet/urbania.webp",
    rating: 4.9,
    reviewsCount: 61,
    capacity: 13,
    luggage: 12,
    pricePerKm: 40,
    basePrice: 6000,
    description:
      "Modern luxury people mover with premium interiors and enhanced comfort.",
    features: [
      "Luxury Van",
      "Premium Seating",
      "Executive Travel",
      "Modern Interior"
    ]
  },

  {
    id: "cab-13",
    name: "Mini Coach Bus",
    type: "coach",
    category: "Corporate Shuttle",
    image: "/fleet/minibus.jpg",
    rating: 4.8,
    reviewsCount: 54,
    capacity: 25,
    luggage: 15,
    pricePerKm: 55,
    basePrice: 8500,
    description:
      "Ideal for employee transportation, conferences and corporate events.",
    features: [
      "25 Seater",
      "Employee Transport",
      "Corporate Shuttle",
      "AC Coach"
    ]
  },

  {
    id: "cab-14",
    name: "Volvo Luxury Coach",
    type: "coach",
    category: "Luxury Bus",
    image: "/fleet/volvo.jpg",
    rating: 5.0,
    reviewsCount: 91,
    capacity: 45,
    luggage: 30,
    pricePerKm: 95,
    basePrice: 15000,
    description:
      "Premium long-distance coach featuring reclining seats and onboard amenities.",
    features: [
      "45 Seater",
      "Luxury Coach",
      "Reclining Seats",
      "Long Distance Travel"
    ]
  }
];

export const mockPackages: Package[] = [
  {
    id: "pkg-1",
    title: "Maldives Overwater Sanctuary",
    destination: "Maldives",
    country: "South Asia",
    duration: "5 Days, 4 Nights",
    price: 2499,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    category: "luxury",
    discountPercentage: 22,

    featured: true,
    tourType: "Group Tour",

    features: [
      "Water Villa",
      "Private Beach",
      "All Inclusive"
    ],

    includedServices: [
      "Flight",
      "Resort",
      "Private Seaplane",
      "All Meals",
      "Excursions"
    ],
    overview:
      "Experience luxury overwater villas, crystal-clear lagoons, private beaches and unforgettable sunsets in the Maldives.",

    highlights: [
      "Overwater Villa Stay",
      "Private Seaplane Transfer",
      "Snorkeling Adventure",
      "Sunset Cruise",
      "Luxury Spa Experience",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival in Maldives",
        description:
          "Arrive at Male Airport and transfer to your luxury resort by seaplane.",
      },
      {
        day: 2,
        title: "Beach Relaxation",
        description:
          "Enjoy white sand beaches and water sports activities.",
      },
      {
        day: 3,
        title: "Snorkeling Tour",
        description:
          "Explore vibrant coral reefs and marine life.",
      },
      {
        day: 4,
        title: "Sunset Cruise",
        description:
          "Private yacht cruise with dinner and entertainment.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Breakfast and transfer back to airport.",
      },
    ],

    exclusions: [
      "Personal Expenses",
      "Travel Insurance",
      "Visa Fees",
      "Laundry Charges",
    ],
  },

  {
    id: "pkg-2",
    title: "Amalfi Coast Romance",
    destination: "Amalfi Coast",
    country: "Italy",
    duration: "7 Days, 6 Nights",
    price: 3450,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=1200&q=80",
    rating: 4.85,
    category: "honeymoon",
    discountPercentage: 14,

    featured: true,
    tourType: "Couple Tour",

    features: [
      "Private Yacht",
      "Luxury Resort",
      "Wine Tasting"
    ],

    includedServices: [
      "Resort",
      "Private Riva Yacht",
      "Cooking Class",
      "Transfers"
    ],
    overview:
      "Experience luxury overwater villas, crystal-clear lagoons, private beaches and unforgettable sunsets in the Maldives.",

    highlights: [
      "Overwater Villa Stay",
      "Private Seaplane Transfer",
      "Snorkeling Adventure",
      "Sunset Cruise",
      "Luxury Spa Experience",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival in Maldives",
        description:
          "Arrive at Male Airport and transfer to your luxury resort by seaplane.",
      },
      {
        day: 2,
        title: "Beach Relaxation",
        description:
          "Enjoy white sand beaches and water sports activities.",
      },
      {
        day: 3,
        title: "Snorkeling Tour",
        description:
          "Explore vibrant coral reefs and marine life.",
      },
      {
        day: 4,
        title: "Sunset Cruise",
        description:
          "Private yacht cruise with dinner and entertainment.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Breakfast and transfer back to airport.",
      },
    ],

    exclusions: [
      "Personal Expenses",
      "Travel Insurance",
      "Visa Fees",
      "Laundry Charges",
    ],
  },

  {
    id: "pkg-3",
    title: "Kyoto Autumn Serenity",
    destination: "Kyoto",
    country: "Japan",
    duration: "6 Days, 5 Nights",
    price: 1890,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    category: "international",

    featured: false,
    tourType: "Cultural Tour",

    features: [
      "Temple Visits",
      "Tea Ceremony",
      "Ryokan Stay"
    ],

    includedServices: [
      "Ryokan Stay",
      "Kaiseki Dinners",
      "Bullet Train Pass",
      "Guided Temples"
    ],
    overview:
      "Experience luxury overwater villas, crystal-clear lagoons, private beaches and unforgettable sunsets in the Maldives.",

    highlights: [
      "Overwater Villa Stay",
      "Private Seaplane Transfer",
      "Snorkeling Adventure",
      "Sunset Cruise",
      "Luxury Spa Experience",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival in Maldives",
        description:
          "Arrive at Male Airport and transfer to your luxury resort by seaplane.",
      },
      {
        day: 2,
        title: "Beach Relaxation",
        description:
          "Enjoy white sand beaches and water sports activities.",
      },
      {
        day: 3,
        title: "Snorkeling Tour",
        description:
          "Explore vibrant coral reefs and marine life.",
      },
      {
        day: 4,
        title: "Sunset Cruise",
        description:
          "Private yacht cruise with dinner and entertainment.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Breakfast and transfer back to airport.",
      },
    ],

    exclusions: [
      "Personal Expenses",
      "Travel Insurance",
      "Visa Fees",
      "Laundry Charges",
    ],
  },

  {
    id: "pkg-4",
    title: "Swiss Alps Heli-Ski Adventure",
    destination: "St. Moritz",
    country: "Switzerland",
    duration: "6 Days, 5 Nights",
    price: 2800,
    originalPrice: 3400,
    image: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=1200&q=80",
    rating: 4.75,
    category: "adventure",
    discountPercentage: 17,

    featured: true,
    tourType: "Adventure Tour",

    features: [
      "Heli Skiing",
      "Luxury Chalet",
      "Spa Access"
    ],

    includedServices: [
      "Luxury Chalet",
      "Ski Passes",
      "Heli-Skiing",
      "Wellness Baths"
    ],
    overview:
      "Experience luxury overwater villas, crystal-clear lagoons, private beaches and unforgettable sunsets in the Maldives.",

    highlights: [
      "Overwater Villa Stay",
      "Private Seaplane Transfer",
      "Snorkeling Adventure",
      "Sunset Cruise",
      "Luxury Spa Experience",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival in Maldives",
        description:
          "Arrive at Male Airport and transfer to your luxury resort by seaplane.",
      },
      {
        day: 2,
        title: "Beach Relaxation",
        description:
          "Enjoy white sand beaches and water sports activities.",
      },
      {
        day: 3,
        title: "Snorkeling Tour",
        description:
          "Explore vibrant coral reefs and marine life.",
      },
      {
        day: 4,
        title: "Sunset Cruise",
        description:
          "Private yacht cruise with dinner and entertainment.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Breakfast and transfer back to airport.",
      },
    ],

    exclusions: [
      "Personal Expenses",
      "Travel Insurance",
      "Visa Fees",
      "Laundry Charges",
    ],
  },

  {
    id: "pkg-5",
    title: "Rajasthan Forts & Heritage",
    destination: "Udaipur & Jaipur",
    country: "India",
    duration: "8 Days, 7 Nights",
    price: 1350,
    originalPrice: 1600,
    image: "/Amer_Fort_Entrance.jpg",
    rating: 4.8,
    category: "domestic",
    discountPercentage: 15,

    featured: true,
    tourType: "Heritage Tour",

    features: [
      "Palace Stay",
      "Camel Safari",
      "Private Guide"
    ],

    includedServices: [
      "Palace Hotel Stay",
      "Private Guide",
      "Chauffeur",
      "Desert Safari"
    ],
    overview:
      "Experience luxury overwater villas, crystal-clear lagoons, private beaches and unforgettable sunsets in the Maldives.",

    highlights: [
      "Overwater Villa Stay",
      "Private Seaplane Transfer",
      "Snorkeling Adventure",
      "Sunset Cruise",
      "Luxury Spa Experience",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival in Maldives",
        description:
          "Arrive at Male Airport and transfer to your luxury resort by seaplane.",
      },
      {
        day: 2,
        title: "Beach Relaxation",
        description:
          "Enjoy white sand beaches and water sports activities.",
      },
      {
        day: 3,
        title: "Snorkeling Tour",
        description:
          "Explore vibrant coral reefs and marine life.",
      },
      {
        day: 4,
        title: "Sunset Cruise",
        description:
          "Private yacht cruise with dinner and entertainment.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Breakfast and transfer back to airport.",
      },
    ],

    exclusions: [
      "Personal Expenses",
      "Travel Insurance",
      "Visa Fees",
      "Laundry Charges",
    ],
  },

  {
    id: "pkg-6",
    title: "Grand Canyon Helicopter Tour",
    destination: "Arizona",
    country: "USA",
    duration: "4 Days, 3 Nights",
    price: 990,
    image: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    category: "family",

    featured: false,
    tourType: "Family Tour",

    features: [
      "Helicopter Ride",
      "National Park",
      "Family Friendly"
    ],

    includedServices: [
      "Hotel",
      "Helicopter Ride",
      "National Park Passes",
      "Breakfast"
    ],
    overview:
      "Experience luxury overwater villas, crystal-clear lagoons, private beaches and unforgettable sunsets in the Maldives.",

    highlights: [
      "Overwater Villa Stay",
      "Private Seaplane Transfer",
      "Snorkeling Adventure",
      "Sunset Cruise",
      "Luxury Spa Experience",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival in Maldives",
        description:
          "Arrive at Male Airport and transfer to your luxury resort by seaplane.",
      },
      {
        day: 2,
        title: "Beach Relaxation",
        description:
          "Enjoy white sand beaches and water sports activities.",
      },
      {
        day: 3,
        title: "Snorkeling Tour",
        description:
          "Explore vibrant coral reefs and marine life.",
      },
      {
        day: 4,
        title: "Sunset Cruise",
        description:
          "Private yacht cruise with dinner and entertainment.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Breakfast and transfer back to airport.",
      },
    ],

    exclusions: [
      "Personal Expenses",
      "Travel Insurance",
      "Visa Fees",
      "Laundry Charges",
    ],
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Archana Singh",
    role: "Luxury Lifestyle Blogger",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    content: "The booking experience was flawless. Nishtha Travel Concierge curated an overwater bungalow stay in the Maldives that was beyond spectacular. Every detail, from the seaplane arrival to the private reef snorkeling, was perfectly scheduled.",
    rating: 5,
    location: "Dwarka Mor, Delhi"
  },
  {
    id: "t-2",
    name: "Atul Verma",
    role: "Venture Capitalist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    content: "When booking executive leisure trips, I look for efficiency and premium options. The flights interface is fast, and selecting first-class suites is incredibly intuitive. The live travel advisor support is top-notch.",
    rating: 5,
    location: "Lucknow, U. P."
  },
  {
    id: "t-3",
    name: "Tabish Ahmad",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    content: "The Amalfi Coast honeymoon package was sheer perfection. Staying at Le Sirenuse was a lifelong dream, and the private Riva speedboat cruise to Capri made us feel like movie stars. Can't wait to book our next trip!",
    rating: 5,
    location: "Varanasi, U. P."
  }
];

export const mockOffers: Offer[] = [
  {
    id: "o-1",
    title: "Maldives Spring Sanctuary",
    description: "Enjoy an extra $500 off on Maldives overwater villa bookings. Valid on private villa options.",
    code: "MALDIVES500",
    discount: "$500 OFF",
    expiryDate: "2026-06-30",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=400&q=80",
    category: "packages"
  },
  {
    id: "o-2",
    title: "Emirates Business Class Upgrade",
    description: "Get complimentary lounge access and priority boarding for selected international flights.",
    code: "FLYEMIRATES",
    discount: "FREE UPGRADE",
    expiryDate: "2026-07-15",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80",
    category: "flights"
  },
  {
    id: "o-3",
    title: "European Luxury Summer Escapes",
    description: "Book 5-star European resorts and receive a complimentary third night. Exclusive luxury partners.",
    code: "LUXE3RDNIGHT",
    discount: "3RD NIGHT FREE",
    expiryDate: "2026-08-31",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80",
    category: "hotels"
  }
];

export const mockTrendingSearches = [
  "Maldives Overwater Bungalows",
  "Capri Yacht Charters",
  "Kyoto Cherry Blossoms Ryokans",
  "Glacier Express Swiss Alps First Class",
  "Santorini Sunset Cave Pools",
  "Safari Lodges Masai Mara Kenya"
];

export const mockBlogs = [
  {
    id: "b-1",
    title: "Uncovering the Best Private Islands in the Indian Ocean",
    author: "Elena Rostova",
    date: "May 18, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b-2",
    title: "Ryokan Etiquette: A Guide to Japan's Traditional Inn Stay",
    author: "Kenji Sato",
    date: "April 24, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "b-3",
    title: "The Most Scenic Luxury Train Journeys of the World",
    author: "Richard Archer",
    date: "March 12, 2026",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"
  }
];

export const mockTravelStats = [
  { value: "45K+", label: "Elite Members" },
  { value: "120+", label: "Destinations Curated" },
  { value: "99.8%", label: "Satisfaction Rate" },
  { value: "15+", label: "Aviation Partners" }
];
