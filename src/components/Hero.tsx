"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

// Text splitting helper
const SplitText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay * i },
    }),
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: 90,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "inline-flex", overflow: "hidden", perspective: "1000px" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block origin-bottom pb-4">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Hero() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 400]);
  const yMoon = useTransform(scrollY, [0, 1000], [0, 150]);
  const scaleMoon = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const yStars = useTransform(scrollY, [0, 1000], [0, 50]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  const [stars, setStars] = useState<{ id: number; left: string; top: string; delay: string; duration: string; opacity: string }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 4}s`,
      opacity: `${0.3 + Math.random() * 0.7}`
    }));
    setStars(newStars);
  }, []);

  return (
    <section className="relative h-[120vh] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Cinematic Video Background */}
      <motion.div 
        style={{ y: yStars }} 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.1] sepia-[0.2]"
        >
          <source src="/engagement_video.mov" type="video/mp4" />
        </video>
        {/* Navy Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#0B132B]/50" />
      </motion.div>

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 flex flex-col items-center text-center px-4 mt-20 md:mt-0 pointer-events-none"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="text-primary/90 font-playfair uppercase tracking-[0.4em] text-sm md:text-base mb-2 font-medium"
        >
          The Wedding Celebration Of
        </motion.h2>
        
        <SplitText text="Deepa" delay={0.5} className="font-great-vibes text-7xl md:text-8xl lg:text-[10rem] drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] text-gold-gradient" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "backOut" }}
          className="font-playfair text-4xl md:text-5xl text-primary italic my-[-10px] md:my-[-20px] z-10"
        >
          &
        </motion.div>
        
        <SplitText text="Yadev" delay={1.2} className="font-great-vibes text-7xl md:text-8xl lg:text-[10rem] drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] text-gold-gradient" />
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
          className="text-white/80 font-playfair text-lg md:text-xl max-w-lg tracking-[0.3em] uppercase mt-4"
        >
          September 13th & 14th, 2026
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background via-background/80 to-transparent z-30 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 z-40 flex flex-col items-center"
      >
        <span className="text-primary/70 font-playfair text-xs tracking-[0.3em] uppercase mb-3">Begin Journey</span>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-primary w-8 h-8 opacity-90 drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
