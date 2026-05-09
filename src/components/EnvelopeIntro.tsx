"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import ShaderAnimation from "./ShaderAnimation";

interface EnvelopeIntroProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function EnvelopeIntro({ onOpen, isOpen }: EnvelopeIntroProps) {
  const [isClient, setIsClient] = useState(false);
  const [isFullyGone, setIsFullyGone] = useState(false);
  const triggeredRef = useRef(false);
  const outerControls = useAnimationControls();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpen = async () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;

    // Trigger the main site reveal
    onOpen();

    // Fade out the intro
    await outerControls.start({
      scale: 1.1,
      opacity: 0,
      filter: "blur(20px)",
      transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
    });

    setIsFullyGone(true);
  };

  useEffect(() => {
    if (!isClient) return;
    const on = () => handleOpen();
    window.addEventListener("wheel", on, { passive: true });
    window.addEventListener("touchmove", on, { passive: true });
    window.addEventListener("keydown", on);
    return () => {
      window.removeEventListener("wheel", on);
      window.removeEventListener("touchmove", on);
      window.removeEventListener("keydown", on);
    };
  }, [isClient]);

  if (!isClient || isFullyGone) return null;

  return (
    <motion.div
      key="envelope-intro"
      animate={outerControls}
      initial={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer bg-black"
      style={{ overflow: "hidden", minHeight: "100dvh" }}
      onClick={handleOpen}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <ShaderAnimation />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute z-10 text-center px-4"
        >
          <h1 className="font-great-vibes text-6xl sm:text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#F9E29C] via-[#D4AF37] to-[#B8860B] py-4 leading-tight">
            We're getting married!
          </h1>
          <p className="font-playfair text-white/60 tracking-[0.4em] uppercase text-xs sm:text-sm mt-4">
            Tap anywhere to enter
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
