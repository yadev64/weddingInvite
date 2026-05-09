"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, CalendarHeart, Clock } from "lucide-react";
import { useRef } from "react";

const events = [
  {
    id: "marriage",
    title: "The Marriage",
    date: "13th September 2026",
    time: "Morning Auspicious Muhurtham",
    venue: "Vaikom Temple",
    description: "Join us as we tie the knot and seek the blessings of the Almighty in the sacred precincts of Vaikom Mahadeva Temple.",
    image: "/temple_line_art.png",
  },
  {
    id: "reception",
    title: "The Reception",
    date: "14th September 2026",
    time: "6:00 PM Onwards",
    venue: "North Paravur Central Auditorium",
    description: "An evening of magical celebration, dinner, and joy with our loved ones under the starlit sky.",
    image: "/reception_line_art.png",
  }
];

export default function Events() {
  return (
    <section className="py-32 px-6 bg-[#001540] relative z-10 overflow-hidden">
      {/* Royal Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/royal-feather.png")`,
          backgroundSize: "400px"
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <span className="text-[#D4AF37] font-playfair uppercase tracking-[0.4em] text-sm mb-4 inline-block">
            Save the Date
          </span>
          <h2 className="font-great-vibes text-7xl md:text-8xl mb-4 py-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] text-transparent bg-clip-text bg-gradient-to-b from-[#F9E29C] via-[#D4AF37] to-[#B8860B]">
            Auspicious Events
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,1)]" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
          </div>
        </motion.div>

        <div className="flex flex-col gap-24">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, index }: { event: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
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
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full group"
    >
      {/* Royal Card Frame */}
      <div className="absolute inset-0 bg-[#002366] rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] border-[3px] border-[#D4AF37]/30 overflow-hidden">
         {/* Subtle Inner Glow */}
         <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent pointer-events-none" />
      </div>
      
      {/* Intricate Gold Border Overlay */}
      <div className="absolute inset-[10px] rounded-2xl border border-[#D4AF37]/20 pointer-events-none translate-z-4" />
      
      {/* Card Content */}
      <div className="relative p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 translate-z-10">
        {/* Event Illustration with Gold Glow */}
        <div className="w-full md:w-1/3 shrink-0">
          <div className="relative aspect-square rounded-full overflow-hidden border-2 border-[#D4AF37]/40 bg-[#001540] shadow-[0_0_40px_rgba(212,175,55,0.2)]">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover filter brightness-[1.2] sepia-[0.4] hue-rotate-[320deg]"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-6xl font-great-vibes text-transparent bg-clip-text bg-gradient-to-r from-[#F9E29C] to-[#D4AF37] mb-6 py-2">
            {event.title}
          </h3>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <CalendarHeart className="w-6 h-6 text-[#D4AF37] drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
              <span className="font-playfair text-xl md:text-2xl text-white/90 tracking-wide">
                {event.date}
              </span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Clock className="w-6 h-6 text-[#D4AF37] drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
              <span className="text-lg text-white/70 font-cormorant tracking-[0.15em] uppercase">
                {event.time}
              </span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <MapPin className="w-6 h-6 text-[#D4AF37] drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
              <span className="font-playfair text-lg md:text-xl text-white/90 tracking-wide italic">
                {event.venue}
              </span>
            </div>
          </div>

          <p className="text-white/60 font-cormorant text-xl leading-relaxed italic max-w-md mx-auto md:mx-0">
            "{event.description}"
          </p>

          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#D4AF37", color: "#001540" }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-10 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] font-playfair tracking-[0.3em] text-xs uppercase transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          >
            View on Map
          </motion.button>
        </div>
      </div>

      {/* Royal Corner Accents (Gold) */}
      <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37]/60 pointer-events-none rounded-tl-xl" />
      <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37]/60 pointer-events-none rounded-br-xl" />
    </motion.div>
  );
}
