"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Heart, Sparkles } from "lucide-react";

const TextReveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"]
  });

  const words = children?.toString().split(" ") || [];
  
  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-x-3 gap-y-4 max-w-5xl mx-auto">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        const scale = useTransform(scrollYProgress, [start, end], [0.95, 1]);
        const blur = useTransform(scrollYProgress, [start, end], ["4px", "0px"]);
        
        return (
          <motion.span 
            key={i} 
            style={{ opacity, scale, filter: `blur(${blur})` }}
            className="inline-block font-cormorant text-4xl md:text-6xl lg:text-7xl text-white font-light tracking-wide drop-shadow-2xl"
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

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scaleImg = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 0.8, 0.8, 0.95]);
  const lineExtent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Parallax elements
  const yHeart1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yHeart2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotateSparkle = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#000814]">
      {/* Cinematic Background Layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div 
          style={{ scale: scaleImg }}
          className="absolute inset-0 w-full h-full origin-center"
        >
          <img 
            src="/PAJU2051.jpg" 
            alt="Our Story" 
            className="w-full h-full object-cover object-center filter brightness-[0.7] sepia-[0.3] contrast-[1.1]"
          />
        </motion.div>
        
        {/* Dynamic Gradient Overlays */}
        <motion.div 
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-[#000814]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000814] via-transparent to-[#000814]" />
        
        {/* Decorative Parallax Elements */}
        <motion.div style={{ y: yHeart1 }} className="absolute top-[20%] left-[10%] opacity-10 text-[#D4AF37]">
          <Heart size={120} fill="currentColor" className="blur-[2px]" />
        </motion.div>
        <motion.div style={{ y: yHeart2 }} className="absolute bottom-[20%] right-[10%] opacity-10 text-[#D4AF37]">
          <Heart size={180} fill="currentColor" className="blur-[3px]" />
        </motion.div>
        <motion.div style={{ rotate: rotateSparkle }} className="absolute top-[40%] right-[15%] opacity-20 text-[#D4AF37]">
          <Sparkles size={40} />
        </motion.div>

        {/* Timeline Progress Line (Side) */}
        <div className="absolute left-6 md:left-12 top-[20%] bottom-[20%] w-[1px] bg-white/10 hidden md:block">
           <motion.div 
             style={{ height: lineExtent }}
             className="w-full bg-gradient-to-b from-[#D4AF37]/0 via-[#D4AF37] to-[#D4AF37]/0"
           />
        </div>
      </div>

      {/* Narrative Journey */}
      <div className="relative z-20 flex flex-col items-center -mt-[100vh]">
        {/* Intro Moment */}
        <div className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="mb-12"
          >
            <span className="text-[#D4AF37] font-playfair tracking-[0.6em] uppercase text-xs mb-6 inline-block bg-[#D4AF37]/5 px-6 py-2 rounded-full border border-[#D4AF37]/20">
              Our Journey
            </span>
            <h2 className="font-great-vibes text-7xl md:text-8xl lg:text-[9rem] py-4 text-elegant-gradient drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              How we met
            </h2>
          </motion.div>
          <div className="flex flex-col items-center gap-4">
             <div className="w-px h-24 bg-gradient-to-b from-[#D4AF37] to-transparent" />
             <p className="font-playfair italic text-white/40 tracking-widest text-sm uppercase">Scroll to begin the story</p>
          </div>
        </div>

        {/* Story Chapters */}
        <div className="max-w-6xl mx-auto px-6 space-y-[40vh] pb-[60vh]">
          <div className="text-center group">
            <TextReveal>
              It all started with a simple hello. Two paths crossed at exactly the right time, in a world full of noise, we found each other.
            </TextReveal>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-6 mb-16 opacity-30">
               <div className="h-[1px] w-12 bg-[#D4AF37]" />
               <Heart size={20} className="text-[#D4AF37]" />
               <div className="h-[1px] w-12 bg-[#D4AF37]" />
            </div>
            <TextReveal>
              What began as a beautiful friendship soon blossomed into a lifelong promise. We discovered that every shared smile was a step towards forever.
            </TextReveal>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-6 mb-16 opacity-30">
               <div className="h-[1px] w-12 bg-[#D4AF37]" />
               <Sparkles size={20} className="text-[#D4AF37]" />
               <div className="h-[1px] w-12 bg-[#D4AF37]" />
            </div>
            <TextReveal>
              Through shared laughter and quiet moments of understanding, we realized our hearts had finally found their way back home.
            </TextReveal>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#001540] to-transparent z-30" />
    </section>
  );
}
