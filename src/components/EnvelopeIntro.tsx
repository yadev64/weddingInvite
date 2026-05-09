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
    
    // Auto-open if the user scrolls or touches the screen
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

  // Don't render anything during SSR to prevent hydration mismatch on scroll lock
  if (!isClient) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="envelope"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100vh", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background cursor-pointer"
          onClick={onOpen}
        >
          <motion.div 
            className="relative w-full h-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <img 
              src="/IMG_9092.PNG" 
              alt="Envelope" 
              className="w-full h-full object-cover filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 z-10 font-playfair text-primary tracking-[0.3em] uppercase text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Tap or scroll to open
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
