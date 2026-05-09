"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface EnvelopeIntroProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function EnvelopeIntro({ onOpen, isOpen }: EnvelopeIntroProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleInteraction = () => {
      if (!isOpen) onOpen();
    };

    window.addEventListener("wheel", handleInteraction, { passive: true });
    window.addEventListener("touchmove", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [isOpen, onOpen]);

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="envelope"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100vh", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-background cursor-pointer overflow-hidden flex flex-col items-center justify-center"
          onClick={onOpen}
        >
          {/* Main Envelope Body - Full Screen */}
          <div className="absolute inset-0 w-full h-full bg-[#1b3a61] overflow-hidden shadow-2xl">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            {/* Back Flaps */}
            <div className="absolute inset-0 w-full h-full bg-[#163050]" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}></div>
            <div className="absolute inset-0 w-full h-full bg-[#163050]" style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }}></div>
            <div className="absolute inset-0 w-full h-full bg-[#1a375a]" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}></div>

            {/* Gold Corner Filigrees */}
            <Flourish className="top-4 left-4 rotate-0" />
            <Flourish className="top-4 right-4 rotate-90" />
            <Flourish className="bottom-4 right-4 rotate-180" />
            <Flourish className="bottom-4 left-4 -rotate-90" />

            {/* Top V-Flap */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#1b3a61] drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 55%)' }}>
               {/* Flap Gold Trim using SVG line */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                 <path d="M 20 0 L 50% 53% L calc(100% - 20px) 0" fill="none" className="stroke-primary" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                 <path d="M 40 0 L 50% 51% L calc(100% - 40px) 0" fill="none" className="stroke-primary" strokeWidth="1" strokeOpacity="0.5" />
               </svg>
            </div>

            {/* 3D Wax Seal */}
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center"
                 style={{
                   background: 'radial-gradient(circle at 30% 30%, #EED29F 0%, #C5A059 40%, #A07A38 80%, #6b4c1a 100%)',
                   boxShadow: '0 10px 25px rgba(0,0,0,0.6), inset 0 5px 10px rgba(255,255,255,0.4), inset 0 -5px 15px rgba(0,0,0,0.5)',
                   filter: 'drop-shadow(0 10px 8px rgba(0,0,0,0.4))'
                 }}>
                 {/* Inner Stamp Indentation */}
                 <div className="w-[85%] h-[85%] rounded-full border-2 border-[#A07A38] flex items-center justify-center relative overflow-hidden"
                      style={{
                        boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.4), 0 2px 5px rgba(255,255,255,0.3)',
                        background: 'radial-gradient(circle at 50% 50%, #C5A059 0%, #AA8542 100%)'
                      }}>
                      {/* Laurel Wreath SVG */}
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-80" style={{ filter: 'drop-shadow(1px 1px 1px rgba(255,255,255,0.2)) drop-shadow(-1px -1px 2px rgba(0,0,0,0.6))' }}>
                        <path d="M 50 90 C 20 90 10 60 10 40 C 10 20 25 10 35 15 C 25 25 20 40 30 50 C 40 60 50 65 50 65" fill="none" stroke="#6b4c1a" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 50 90 C 80 90 90 60 90 40 C 90 20 75 10 65 15 C 75 25 80 40 70 50 C 60 60 50 65 50 65" fill="none" stroke="#6b4c1a" strokeWidth="2" strokeLinecap="round" />
                        {/* Leaves Left */}
                        <path d="M 15 45 Q 20 40 25 45 Q 20 50 15 45" fill="#6b4c1a" />
                        <path d="M 12 35 Q 17 30 22 35 Q 17 40 12 35" fill="#6b4c1a" />
                        <path d="M 18 25 Q 23 20 28 25 Q 23 30 18 25" fill="#6b4c1a" />
                        {/* Leaves Right */}
                        <path d="M 85 45 Q 80 40 75 45 Q 80 50 85 45" fill="#6b4c1a" />
                        <path d="M 88 35 Q 83 30 78 35 Q 83 40 88 35" fill="#6b4c1a" />
                        <path d="M 82 25 Q 77 20 72 25 Q 77 30 82 25" fill="#6b4c1a" />
                      </svg>
                      {/* D&Y Text */}
                      <span className="font-great-vibes text-4xl md:text-5xl text-[#5a3f13] z-10 -ml-2 -mt-2" style={{ textShadow: '1px 1px 1px rgba(255,255,255,0.3), -1px -1px 1px rgba(0,0,0,0.6)' }}>
                        D&Y
                      </span>
                 </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 z-50 flex flex-col items-center pointer-events-none"
          >
            <span className="font-playfair text-primary tracking-[0.3em] uppercase text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Tap to open
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Vintage Corner Flourish SVG Component
const Flourish = ({ className }: { className: string }) => (
  <svg viewBox="0 0 100 100" className={`absolute w-32 h-32 md:w-48 md:h-48 opacity-80 pointer-events-none ${className}`} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
    <path d="M 0 0 C 40 0, 70 10, 80 40 C 85 60, 70 70, 50 70 C 30 70, 20 50, 20 30 C 20 15, 35 10, 50 15" fill="none" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 0 0 C 60 0, 90 20, 100 60 C 105 85, 80 95, 60 95 C 35 95, 25 75, 25 50 C 25 30, 45 20, 65 25" fill="none" className="stroke-primary" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
    <path d="M 10 10 L 30 30 M 15 5 L 40 25 M 5 15 L 25 40" className="stroke-primary" strokeWidth="0.5" strokeOpacity="0.5" strokeLinecap="round" />
    {/* Decorative leaves */}
    <path d="M 50 15 Q 55 10 60 15 Q 55 20 50 15" className="fill-primary" />
    <path d="M 65 25 Q 70 20 75 25 Q 70 30 65 25" className="fill-primary" />
    <circle cx="80" cy="40" r="1.5" className="fill-primary" />
    <circle cx="100" cy="60" r="2" className="fill-primary" />
  </svg>
);
