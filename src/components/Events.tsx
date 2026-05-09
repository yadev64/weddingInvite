"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { MapPin, CalendarHeart } from "lucide-react";
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
    alignment: "left"
  },
  {
    id: "reception",
    title: "The Reception",
    date: "14th September 2026",
    time: "6:00 PM Onwards",
    venue: "North Paravur Central Auditorium",
    description: "An evening of magical celebration, dinner, and joy with our loved ones under the starlit sky.",
    image: "/reception_line_art.png",
    alignment: "right"
  }
];

export default function Events() {
  return (
    <section className="py-32 px-6 md:px-12 bg-background relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <span className="text-primary/70 font-playfair uppercase tracking-[0.4em] text-sm mb-4 inline-block">
            Chapter II
          </span>
          <h2 className="font-great-vibes text-7xl md:text-8xl mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] text-gold-gradient">
            Auspicious Events
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(212,175,55,1)]" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </motion.div>

        <div className="space-y-40">
          {events.map((event, index) => {
            return (
              <EventBlock key={event.id} event={event} index={index} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EventBlock({ event, index }: { event: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const isLeft = event.alignment === "left";
  const yImage = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityImage = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
    <div 
      ref={ref} 
      className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24 perspective-[2000px]`}
    >
      {/* 3D Illustration */}
      <motion.div 
        style={{ y: yImage, scale: scaleImage, opacity: opacityImage }}
        className="w-full lg:w-1/2 relative"
      >
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative aspect-[4/3] w-full paper-cut-shadow cursor-pointer"
        >
          {/* Back glow layer */}
          <div className="absolute inset-[-10%] bg-primary/20 blur-[50px] rounded-full translate-z-[-50px]" />
          
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover rounded-2xl border border-primary/30 shadow-[0_0_40px_rgba(255,215,0,0.15)] translate-z-[20px]"
            style={{ transform: "translateZ(20px)" }}
          />
          
          {/* Decorative Corner Borders floating slightly in front */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary/60 rounded-tl-xl translate-z-[50px]" style={{ transform: "translateZ(50px)" }} />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary/60 rounded-br-xl translate-z-[50px]" style={{ transform: "translateZ(50px)" }} />
        </motion.div>
      </motion.div>

      {/* Content Details */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
      >
        <h3 className="text-6xl font-great-vibes text-primary mb-8 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">
          {event.title}
        </h3>
        
        <div className="space-y-8 mb-10 w-full border-l-0 lg:border-l-2 border-primary/30 pl-0 lg:pl-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-foreground/90">
            <CalendarHeart className="w-8 h-8 text-primary shrink-0 mt-1 drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
            <div>
              <div className="font-playfair text-2xl font-medium tracking-wide">{event.date}</div>
              <div className="text-sm text-foreground/60 font-cormorant tracking-[0.2em] uppercase mt-2">{event.time}</div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-foreground/90">
            <MapPin className="w-8 h-8 text-primary shrink-0 mt-1 drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
            <div className="font-playfair text-2xl font-medium tracking-wide leading-snug">{event.venue}</div>
          </div>
        </div>

        <p className="text-foreground/80 font-cormorant text-2xl leading-relaxed max-w-lg mx-auto lg:mx-0">
          {event.description}
        </p>
        
        <div className="mt-12">
          <button className="px-10 py-4 rounded-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-background hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all duration-700 font-playfair tracking-[0.2em] text-sm uppercase group">
            View on Map
          </button>
        </div>
      </motion.div>
    </div>
  );
}
