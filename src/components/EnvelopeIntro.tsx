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
        // Step 1: Open the flap
        setStep(1);
        
        // Step 2: Slide the whole envelope down
        setTimeout(() => {
          setStep(2);
          
          // Step 3: Trigger the Hero animation
          setTimeout(() => {
            onOpen();
          }, 1000);
        }, 1200); // Wait for flap to open
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
          animate={step === 2 ? { y: "100vh", opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#10223d] cursor-pointer overflow-hidden flex flex-col items-center justify-center"
          onClick={() => {
             if (step === 0) {
               setStep(1);
               setTimeout(() => {
                 setStep(2);
                 setTimeout(() => onOpen(), 1000);
               }, 1200);
             }
          }}
        >
          {/* Constrain the envelope to its intrinsic aspect ratio so clip-paths remain perfectly aligned */}
          <motion.div 
            className="relative w-[95vw] md:w-[80vw] lg:w-[60vw] max-w-5xl aspect-[1.45/1]"
            animate={step === 0 ? { y: [0, -10, 0] } : { y: 0 }}
            transition={{ repeat: step === 0 ? Infinity : 0, duration: 3, ease: "easeInOut" }}
          >
            {/* The Dark Interior of the Envelope */}
            <div 
              className="absolute inset-0 bg-[#060c18] shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)]"
              style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 53%)' }} 
            />

            {/* Layer 1: The Body (Everything except the V-flap) */}
            <img 
              src="/IMG_9092.PNG" 
              alt="Envelope Body" 
              className="absolute inset-0 w-full h-full object-fill drop-shadow-2xl"
              style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 53.5%)' }}
            />

            {/* Layer 2: The Top V-Flap */}
            <motion.img 
              src="/IMG_9092.PNG" 
              alt="Envelope Flap" 
              className="absolute inset-0 w-full h-full object-fill z-10"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 50% 53.5%)',
                transformOrigin: 'top',
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))'
              }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: step >= 1 ? 180 : 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step === 0 ? 1 : 0, y: step === 0 ? 0 : 10 }}
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
