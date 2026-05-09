"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TextReveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"]
  });

  const words = children?.toString().split(" ") || [];
  
  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-x-3 gap-y-2">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        const y = useTransform(scrollYProgress, [start, end], [20, 0]);
        
        return (
          <motion.span 
            key={i} 
            style={{ opacity, y }}
            className="inline-block"
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

export default function Story() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.7, 0.95]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-background">
      {/* Sticky Background Image */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div 
          style={{ scale: scaleImg }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src="/PAJU2051.jpg" 
            alt="Our Story" 
            className="w-full h-full object-cover object-center filter sepia-[0.2]"
          />
        </motion.div>
        {/* Overlay to ensure text readability */}
        <motion.div 
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-[#0B132B]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      </div>

      {/* Scrollable Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="h-[50vh]" /> {/* Spacer */}
        
        <div className="max-w-4xl mx-auto px-6 text-center z-10 pointer-events-auto pb-[50vh]">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-playfair tracking-[0.4em] uppercase text-sm mb-12 inline-block border-b border-primary/30 pb-4"
          >
            Chapter I
          </motion.span>
          
          <h2 className="font-great-vibes text-7xl md:text-8xl lg:text-9xl mb-24 drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] text-gold-gradient">
            How we met
          </h2>
          
          <div className="space-y-20 text-foreground font-cormorant leading-relaxed text-3xl md:text-5xl lg:text-6xl font-light tracking-wide drop-shadow-xl">
            <TextReveal>
              It all started with a simple hello. Two paths crossed at exactly the right time.
            </TextReveal>
            <TextReveal>
              What began as a beautiful friendship soon blossomed into a lifelong promise.
            </TextReveal>
            <TextReveal>
              Through shared laughter, we realized our hearts had found their home.
            </TextReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
