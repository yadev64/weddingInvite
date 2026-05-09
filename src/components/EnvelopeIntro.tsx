"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface EnvelopeIntroProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function EnvelopeIntro({ onOpen, isOpen }: EnvelopeIntroProps) {
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setIsClient(true);
    
    const handleInteraction = () => {
      if (step === 0) {
        setStep(1); // Flap lifts slightly
        setTimeout(() => {
          setStep(2); // Entire envelope blurs and fades
          setTimeout(() => onOpen(), 1000); // Reveal Hero
        }, 800);
      }
    };

    window.addEventListener("wheel", handleInteraction, { passive: true });
    window.addEventListener("touchmove", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [step, onOpen]);

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="envelope"
          animate={step === 2 ? { opacity: 0, filter: "blur(20px)", scale: 1.05 } : { opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed inset-0 z-[100] bg-[#02132b] cursor-pointer overflow-hidden flex flex-col items-center justify-center"
          onClick={() => {
             if (step === 0) {
               setStep(1);
               setTimeout(() => {
                 setStep(2);
                 setTimeout(() => onOpen(), 1000);
               }, 800);
             }
          }}
        >
          {/* Main Envelope Container */}
          <motion.div 
            className="relative w-[95vw] md:w-[80vw] lg:w-[60vw] max-w-4xl aspect-[1.5/1] drop-shadow-2xl"
            animate={step === 0 ? { y: [0, -10, 0] } : { y: 0 }}
            transition={{ repeat: step === 0 ? Infinity : 0, duration: 3, ease: "easeInOut" }}
            style={{ perspective: "1500px" }}
          >
            {/* 1. Dark Interior of the Envelope */}
            <div className="absolute inset-0 bg-[#001f4d] shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)] rounded-sm" />

            {/* 2. Envelope Body (Bottom & Sides) */}
            <div className="absolute inset-0 overflow-hidden rounded-sm pointer-events-none">
               <div className="absolute inset-0 bg-[#0047AB] shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" 
                    style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 55%)' }}>
                  <TextureOverlay />
                  {/* Simple Gold Border Lines */}
                  <div className="absolute inset-4 border border-[#D4AF37]/50 pointer-events-none" />
                  <div className="absolute inset-5 border border-[#D4AF37]/30 pointer-events-none" />
               </div>
            </div>

            {/* 3. The Seal Bottom Half (Static, attached to body) */}
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 md:w-32 md:h-32 pointer-events-none"
                 style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}>
                 <WaxSeal />
            </div>

            {/* 4. The Flap Container (Lifts Slightly) */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-[55%] z-20 pointer-events-none"
              style={{ transformStyle: 'preserve-3d', transformOrigin: 'top' }}
              animate={{ rotateX: step >= 1 ? 45 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
               {/* Flap Paper (Clipped to V-Shape) */}
               <div className="absolute inset-0 bg-[#0047AB] shadow-[inset_0_0_50px_rgba(0,0,0,0.2)]"
                    style={{ 
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.4))'
                    }}>
                    <TextureOverlay />
                    {/* V-Flap Simple Gold Lines */}
                    <FlapBorder />
               </div>

               {/* The Seal Top Half (Lifts with the flap) */}
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-24 h-24 md:w-32 md:h-32 pointer-events-none"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}>
                    <WaxSeal />
               </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step === 0 ? 1 : 0, y: step === 0 ? 0 : 10 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 z-50 flex flex-col items-center pointer-events-none"
          >
            <span className="font-playfair text-[#D4AF37] tracking-[0.3em] uppercase text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Tap to open
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

const TextureOverlay = () => (
  <div className="absolute inset-0 opacity-[0.20] mix-blend-overlay pointer-events-none" 
       style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
);

const FlapBorder = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 550" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }}>
     <path d="M 15 15 L 500 520 L 985 15" fill="none" stroke="#D4AF37" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
     <path d="M 25 25 L 500 510 L 975 25" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" />
  </svg>
);

const WaxSeal = () => (
  <div className="w-full h-full rounded-full flex items-center justify-center relative shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
       style={{
         background: 'radial-gradient(circle at 35% 35%, #F4D068 0%, #D4AF37 30%, #AA8529 70%, #5c420b 100%)',
         boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.6), inset 0 -4px 10px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.6)'
       }}>
       {/* Raised Irregular Rim / Indentation */}
       <div className="w-[82%] h-[82%] rounded-full flex items-center justify-center relative overflow-hidden"
            style={{
               background: 'radial-gradient(circle at 50% 50%, #D4AF37 0%, #a38023 100%)',
               boxShadow: 'inset 0 6px 12px rgba(0,0,0,0.7), inset 0 -2px 4px rgba(255,255,255,0.3), 0 2px 4px rgba(255,255,255,0.4)'
            }}>
            
            {/* Top Swirl */}
            <svg viewBox="0 0 50 20" className="absolute top-[18%] w-8 h-4 opacity-90" style={{ filter: 'drop-shadow(1px 1px 0px rgba(255,255,255,0.3)) drop-shadow(-1px -1px 1px rgba(0,0,0,0.6))' }}>
              <path d="M 10 10 C 20 0, 30 20, 40 10" fill="none" stroke="#5c420b" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* D&Y Monogram */}
            <span className="font-great-vibes text-3xl md:text-4xl text-[#4a3509] z-10 -ml-1 mt-1" 
                  style={{ textShadow: '1px 1px 1px rgba(255,255,255,0.5), -1px -1px 2px rgba(0,0,0,0.8)' }}>
              D&Y
            </span>

            {/* Bottom Laurel Wreath */}
            <svg viewBox="0 0 100 50" className="absolute bottom-[12%] w-14 h-7 opacity-90" style={{ filter: 'drop-shadow(1px 1px 0px rgba(255,255,255,0.3)) drop-shadow(-1px -1px 1px rgba(0,0,0,0.6))' }}>
              <path d="M 50 40 C 30 40, 10 30, 10 10" fill="none" stroke="#5c420b" strokeWidth="2" strokeLinecap="round" />
              <path d="M 20 25 Q 15 20 25 15 Q 30 20 20 25" fill="#5c420b" />
              <path d="M 30 35 Q 25 30 35 25 Q 40 30 30 35" fill="#5c420b" />
              
              <path d="M 50 40 C 70 40, 90 30, 90 10" fill="none" stroke="#5c420b" strokeWidth="2" strokeLinecap="round" />
              <path d="M 80 25 Q 85 20 75 15 Q 70 20 80 25" fill="#5c420b" />
              <path d="M 70 35 Q 75 30 65 25 Q 60 30 70 35" fill="#5c420b" />
            </svg>
       </div>
  </div>
);
