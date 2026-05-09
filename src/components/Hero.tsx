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
      <motion.div style={{ y: yStars }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="stars">
          {stars.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                left: star.left,
                top: star.top,
                width: Math.random() > 0.8 ? '3px' : '2px',
                height: Math.random() > 0.8 ? '3px' : '2px',
                animationDelay: star.delay,
                "--duration": star.duration,
                "--max-opacity": star.opacity
              } as React.CSSProperties}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        style={{ y: yMoon, scale: scaleMoon }} 
        className="absolute top-[10%] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[15%] md:top-[15%] z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#FFF5C3] moon-glow relative overflow-hidden">
          <div className="absolute top-8 left-10 w-12 h-12 rounded-full bg-black/5 blur-[2px]"></div>
          <div className="absolute top-24 right-12 w-8 h-8 rounded-full bg-black/5 blur-[1px]"></div>
          <div className="absolute bottom-10 left-16 w-14 h-14 rounded-full bg-black/5 blur-[3px]"></div>
        </div>
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
        
        <SplitText text="Deepa" delay={0.5} className="font-great-vibes text-7xl md:text-8xl lg:text-[10rem] text-white drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "backOut" }}
          className="font-playfair text-4xl md:text-5xl text-primary italic my-[-10px] md:my-[-20px] z-10"
        >
          &
        </motion.div>
        
        <SplitText text="Yadev" delay={1.2} className="font-great-vibes text-7xl md:text-8xl lg:text-[10rem] text-white drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]" />
        
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
          <ChevronDown className="text-primary w-8 h-8 opacity-90 drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
