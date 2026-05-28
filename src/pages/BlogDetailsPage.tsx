import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, BookOpen, Share2, MapPin } from 'lucide-react';
import { mockBlogs } from '../data/mockData';

// Rich mock content for each travel journal article
const blogArticles: Record<string, {
  subtitle: string;
  leadParagraph: string;
  sections: { heading: string; paragraphs: string[] }[];
  pullQuote: string;
  locationTag: string;
}> = {
  'b-1': {
    subtitle: "A curated expedition through secluded reef resorts and private water sanctuaries that define modern isolation.",
    leadParagraph: "There is a distinct magic in waking up to nothing but the rhythm of the Indian Ocean breaking over coral reefs. As travelers seek deeper solitude and absolute privacy, the call of private island sanctuaries has transformed from a simple holiday choice into a quest for personal conservation. From Baa Atoll to remote Seychelles shores, we examine the architectures of ultimate luxury.",
    sections: [
      {
        heading: "The Architecture of Invisibility",
        paragraphs: [
          "True luxury in the modern age is not about gold fixtures or marble lobbies; it is about absolute space. In the Maldives, islands like Kunfunadhoo are designed with a philosophy of 'no news, no shoes.' The villas are built using sustainable teak and driftwood, disguised by dense tropical foliage, ensuring that each guest feels like the sole inhabitant of the island.",
          "Villas here extend over the water, featuring private freshwater slide pools, outdoor bathrooms under the stars, and direct access to marine channels populated by reef sharks and giant manta rays. It is design that exists in harmony with the local ecosystem, rather than in competition with it."
        ]
      },
      {
        heading: "Undersea Culinaria and Marine Conservation",
        paragraphs: [
          "Gastronomy on these private sanctuaries has evolved past the traditional beachside buffet. Guests now dine five meters beneath the waves, observing schools of unicorn fish while enjoying multi-course pairings designed by Michelin-starred culinary teams.",
          "Moreover, the luxury travel experience is increasingly paired with marine stewardship. Discerning guests can join resident marine biologists to assist in coral propagation, restore sea turtle nesting habitats, and log dolphin coordinates, blending personal restoration with global preservation."
        ]
      }
    ],
    pullQuote: "Space, silence, and absolute seclusion have become the primary currencies of the modern traveler.",
    locationTag: "South Asia / Seychelles / Baa Atoll"
  },
  'b-2': {
    subtitle: "Understanding the ancient traditions of hospitality, hot springs, and multi-course dining inside Japan's premium traditional inns.",
    leadParagraph: "A stay at a traditional Japanese Ryokan is not merely a night at a hotel; it is an immersive step back into Edo-period hospitality. For the uninitiated, the delicate balance of ryokan etiquette can feel intimidating. From sliding paper shoji doors to the precise layout of tatami mats, we translate the language of quiet premium service.",
    sections: [
      {
        heading: "Entering the Sacred Space",
        paragraphs: [
          "The transition from the outside world begins at the genkan, the traditional entry hall. Here, guests remove outdoor shoes and step into specialized indoor slippers. Tatami rooms themselves must only be stepped on in clean socks or bare feet—never in slippers.",
          "Upon check-in, guests are presented with a yukata, a light cotton kimono worn during bathing, dining, and lounging. The yukata is folded left-over-right; the reverse is reserved traditionally for funerals."
        ]
      },
      {
        heading: "The Ritual of Kaiseki and Onsen Bathing",
        paragraphs: [
          "Kaiseki dining is the pinnacle of Japanese culinary art, consisting of nine to twelve seasonal courses. Each plate is designed to capture the microscopic window of peak flavor, using forest-fresh mushrooms, local wagyu beef, and fresh mountain river trout.",
          "Equally sacred is the mineral-rich onsen bath. Bathers must scrub and rinse thoroughly at the side washing stations before entering the hot volcanic water, ensuring that the communal spring remains completely clean."
        ]
      }
    ],
    pullQuote: "Every bow and cup of tea in a ryokan is part of omotenashi—selfless, meticulous hospitality.",
    locationTag: "Honshu, Japan / Kyoto & Hakone"
  },
  'b-3': {
    subtitle: "Rediscovering the romance of travel aboard the world's most exclusive sleeper trains and panoramic rail cars.",
    leadParagraph: "In a world obsessed with speed, high-end rail journeys offer a rare chance to slow down and observe the changing landscape from a walnut-paneled cabin. From the luxury carriages of the Venice Simplon-Orient-Express to the glacial summits of the Swiss Glacier Express, rail travel has once again claimed its place as the ultimate romantic journey.",
    sections: [
      {
        heading: "Walnut Paneling and Tuxedo Dining",
        paragraphs: [
          "Stepping aboard a luxury train is akin to entering a mobile grand hotel. Cabins feature vintage marquetry, fine Italian linens, and private hot showers. As the sun sets, the dining car transforms into a formal ballroom, where guests in tuxedos and evening gowns gather for multi-course meals prepared by onboard pastry chefs and sauciers.",
          "The click-clack of the tracks becomes a background symphony to conversations shared over vintage champagne, while the lights of remote Alpine villages flicker past the double-glazed windows."
        ]
      },
      {
        heading: "Crossing High Alpine Passes",
        paragraphs: [
          "In Switzerland, trains like the Glacier Express navigate narrow-gauge tracks, climbing over the Oberalp Pass at 2,033 meters. Panoramic glass roofs allow travelers to observe vertical granite cliffs and pristine glaciers, all while enjoying five-star service at their seats.",
          "It is a journey that connects historic cities, crossing dramatic viaducts and passing through dozens of mountain tunnels, offering a cinematic preview of nature's grandest architecture."
        ]
      }
    ],
    pullQuote: "Railways remind us that the journey itself is not a barrier to the destination, but the destination itself.",
    locationTag: "Europe / Swiss Alps / Venice to Paris"
  }
};

export const BlogDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const blog = mockBlogs.find((b) => b.id === id) || mockBlogs[0];
  const article = blogArticles[blog.id] || {
    subtitle: "Bespoke guides and lifestyle insights from the travel specialists at Nishtha Travel Concierge.",
    leadParagraph: `Discover the coordinates that define modern travel. Our local concierge desk compiles directories of premier lodgings, custom itineraries, and cultural traditions to shape your next luxury voyage.`,
    sections: [
      {
        heading: "A New Standard of Travel Curation",
        paragraphs: [
          "At Nishtha, we prioritize the handcrafted. We believe that traveling is about making deep connections with local places, discovering hidden details, and coordinating seamless transitions.",
          "Our specialists remain active in the field, cataloging boutique properties and private aviation networks to ensure that our club members receive only the absolute finest options."
        ]
      }
    ],
    pullQuote: "We do not sell travel packages; we curate memories that stand the test of time.",
    locationTag: "Global Coordinates / Curated Travels"
  };

  return (
    <div className="bg-brand-light min-h-screen text-slate-800 relative pb-20">
      
      {/* 1. EDITORIAL HEADER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 space-y-6">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-purple text-xs font-bold uppercase tracking-widest transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </Link>

        {/* Category & Location Tag */}
        <div className="flex items-center gap-2 text-brand-purple font-serif text-xs uppercase tracking-[0.2em] font-bold">
          <MapPin className="w-3.5 h-3.5" />
          <span>{article.locationTag}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-brand-blue leading-tight tracking-tight">
          {blog.title}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 text-sm sm:text-base font-light italic font-serif leading-relaxed max-w-3xl">
          {article.subtitle}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#E5E0D8] text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-brand-purple" />
            <span>By {blog.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-purple" />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-purple" />
            <span>{blog.readTime}</span>
          </div>
        </div>

      </div>

      {/* 2. ARTICLE LEAD BANNER IMAGE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 aspect-[21/9] max-h-[500px] overflow-hidden border-y border-[#E5E0D8]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. ARTICLE CONTENT BODY */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 gap-10">
        
        {/* Lead Paragraph */}
        <p className="text-slate-800 text-base sm:text-lg font-light leading-relaxed font-sans first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-brand-purple first-letter:font-bold">
          {article.leadParagraph}
        </p>

        {/* Dynamic Sections */}
        {article.sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="font-serif text-brand-blue text-xl sm:text-2xl font-semibold border-b border-[#E5E0D8] pb-2">
              {section.heading}
            </h3>
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-slate-600 text-sm sm:text-base font-light leading-relaxed font-sans">
                {p}
              </p>
            ))}
          </div>
        ))}

        {/* Pull Quote */}
        {article.pullQuote && (
          <div className=" border-brand-purple pl-6 py-4 my-6 bg-white border border-l-2">
            <p className="font-serif italic text-brand-blue text-lg sm:text-xl font-medium leading-relaxed">
              "{article.pullQuote}"
            </p>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mt-2">
              — Concierge Dispatch Curation
            </span>
          </div>
        )}

        {/* Share & Actions footer */}
        <div className="border-t border-[#E5E0D8] pt-8 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[10px] text-brand-purple font-bold uppercase tracking-widest">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Nishtha Journal Collection</span>
          </div>

          <button className="flex items-center gap-1.5 text-slate-500 hover:text-brand-purple text-xs font-bold uppercase tracking-wider transition-colors border border-[#E5E0D8] bg-white px-4 py-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Curation</span>
          </button>
        </div>

      </div>

    </div>
  );
};
