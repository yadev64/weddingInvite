"use client";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, CalendarHeart, Clock, Sparkles, X, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const events = [
  {
    id: "marriage",
    title: "The Marriage",
    date: "13th September 2026",
    time: "10:00 AM. Morning Auspicious Muhurtham",
    venue: "Vaikom Mahadeva Temple",
    description: "Join us as we tie the knot and seek the blessings of the Almighty in the sacred precincts of Vaikom Mahadeva Temple.",
    mapsUrl: "https://maps.app.goo.gl/S26jNida4LH6QUKK7",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.7486161483327!2d76.39415731535492!3d9.7471249930248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0870f7d5c8d629%3A0x7d8a9e9e9e9e9e9e!2sVaikom%20Mahadeva%20Temple!5e0!3m2!1sen!2sin!4v1715264000000!5m2!1sen!2sin",
    location: "Vaikom, Kerala"
  },
  {
    id: "reception",
    title: "The Reception",
    date: "14th September 2026",
    time: "6:00 PM Onwards",
    venue: "Central Auditorium",
    description: "An evening of magical celebration, dinner, and joy with our loved ones under the starlit sky.",
    mapsUrl: "https://maps.app.goo.gl/4Ur2g6HRgRBzyGyp8",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.7013890538!2d76.2299839753612!3d10.1416349889984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08170068a04297%3A0x7c7c340b6e1564c9!2sCentral%20Auditorium!5e0!3m2!1sen!2sin!4v1715264000000!5m2!1sen!2sin",
    location: "North Paravur, Kerala"
  }
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="py-32 px-6 bg-[#001540] relative z-10 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#D4AF37]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span className="text-[#D4AF37] font-playfair uppercase tracking-[0.44em] text-xs mb-6 inline-block bg-[#D4AF37]/10 px-4 py-1 rounded-full border border-[#D4AF37]/20">
            Save the Date
          </span>
          <h2 className="font-great-vibes text-7xl md:text-8xl mb-4 py-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] text-transparent bg-clip-text bg-gradient-to-b from-[#F9E29C] via-[#D4AF37] to-[#B8860B]">
            Auspicious Events
          </h2>
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-[#D4AF37]" />
            <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-[#D4AF37]/40 to-[#D4AF37]" />
          </div>
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-24">
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onDirections={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </div>

      {/* Map Popup Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-[#000814]/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#001D4D] rounded-[2.5rem] border border-[#D4AF37]/30 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-[#D4AF37] transition-colors z-20 bg-black/20 backdrop-blur-md p-2 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col h-full max-h-[90dvh]">
                {/* Map Preview Area */}
                <div className="w-full h-[300px] md:h-[400px] relative bg-[#000814]">
                  <iframe
                    src={selectedEvent.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="filter brightness-[0.8] contrast-[1.1] grayscale-[0.2]"
                  />
                  {/* Subtle overlay to blend map with theme */}
                  <div className="absolute inset-0 pointer-events-none border-b border-[#D4AF37]/30 shadow-[inset_0_-20px_40px_rgba(0,29,77,1)]" />
                </div>

                {/* Info & Action Area */}
                <div className="p-8 md:p-10 text-center flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-great-vibes text-4xl md:text-5xl text-[#D4AF37]">
                      {selectedEvent.venue}
                    </h3>
                  </div>

                  <p className="font-playfair text-white/60 tracking-[0.3em] uppercase text-[10px] mb-8">
                    {selectedEvent.location}
                  </p>

                  <motion.a
                    href={selectedEvent.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full max-w-sm flex items-center justify-center gap-3 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#001540] font-playfair font-bold tracking-[0.2em] text-xs uppercase shadow-[0_10px_30px_rgba(212,175,55,0.3)] group transition-all"
                  >
                    Open in Google Maps
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.a>
                </div>
              </div>

              {/* Decorative Corner Filigree in Modal */}
              <svg className="absolute top-6 left-6 w-10 h-10 text-[#D4AF37]/20 pointer-events-none" viewBox="0 0 100 100">
                <path d="M0 0 L100 0 M0 0 L0 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function EventCard({ event, index, onDirections }: { event: any, index: number, onDirections: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full group"
    >
      {/* Premium Glass Card Surface */}
      <div className="absolute inset-0 bg-[#001D4D]/80 backdrop-blur-md rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-[#D4AF37]/30 group-hover:border-[#D4AF37]/50 transition-colors duration-500 overflow-hidden" />

      {/* Animated Subtle Glow */}
      <div className={`absolute -inset-[2px] rounded-[2.5rem] bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#D4AF37]/20 transition-opacity duration-1000 pointer-events-none ${event.id === "marriage" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`} />

      {/* Structured Content Grid */}
      <div className="relative p-8 md:p-14 flex flex-col items-center gap-10 translate-z-10">

        {/* Header: The Title */}
        <div className="text-center w-full">
          <h3 className="text-6xl md:text-7xl font-great-vibes text-transparent bg-clip-text bg-gradient-to-b from-[#F9E29C] via-[#D4AF37] to-[#B8860B] mb-2 py-4 leading-tight">
            {event.title}
          </h3>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto" />
        </div>

        {/* Contextual Body: When & Where Grouping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 w-full max-w-3xl divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/20">

          {/* Section: The When (Schedule) */}
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="bg-[#D4AF37]/10 p-3 rounded-2xl border border-[#D4AF37]/20">
              <CalendarHeart className="w-7 h-7 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
            </div>
            <div className="text-center">
              <p className="font-playfair text-[#D4AF37]/80 uppercase tracking-widest text-xs mb-2">The Schedule</p>
              <h4 className="font-playfair text-xl md:text-2xl text-white tracking-wide mb-1">{event.date}</h4>
              <p className="font-cormorant text-white/60 tracking-[0.1em] uppercase text-sm">{event.time}</p>
            </div>
          </div>

          {/* Section: The Where (Location) */}
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="bg-[#D4AF37]/10 p-3 rounded-2xl border border-[#D4AF37]/20">
              <MapPin className="w-7 h-7 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
            </div>
            <div className="text-center">
              <p className="font-playfair text-[#D4AF37]/80 uppercase tracking-widest text-xs mb-2">The Venue</p>
              <h4 className="font-playfair text-xl md:text-2xl text-white tracking-wide mb-1 italic">{event.venue}</h4>
              <p className="font-cormorant text-white/60 tracking-[0.05em] text-sm italic">{event.location}</p>
            </div>
          </div>
        </div>

        {/* Emotional Context: The Why */}
        <div className="max-w-2xl text-center">
          <div className="inline-block relative">
            <span className="absolute -top-4 -left-6 text-4xl text-[#D4AF37]/20 font-serif">"</span>
            <p className="text-white/70 font-cormorant text-xl md:text-2xl leading-relaxed italic px-4">
              {event.description}
            </p>
            <span className="absolute -bottom-10 -right-6 text-4xl text-[#D4AF37]/20 font-serif">"</span>
          </div>
        </div>

        {/* Action: Refined Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onDirections}
          className="mt-6 px-12 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#001540] font-playfair font-bold tracking-[0.2em] text-xs uppercase transition-all duration-500 shadow-[0_10px_20px_rgba(0,0,0,0.3)] relative group overflow-hidden"
        >
          <span className="relative z-10">Get Directions</span>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        </motion.button>
      </div>

      {/* Decorative Corner Filigree */}
      <svg className="absolute top-6 left-6 w-12 h-12 text-[#D4AF37]/30 pointer-events-none" viewBox="0 0 100 100">
        <path d="M0 0 L100 0 M0 0 L0 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
        <circle cx="0" cy="0" r="4" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-6 right-6 w-12 h-12 text-[#D4AF37]/30 pointer-events-none rotate-180" viewBox="0 0 100 100">
        <path d="M0 0 L100 0 M0 0 L0 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
        <circle cx="0" cy="0" r="4" fill="currentColor" />
      </svg>
    </motion.div>
  );
}
