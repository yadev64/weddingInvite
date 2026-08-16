"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { SealRing, MiniDivider } from "./Ornaments";

interface IntroProps {
  onOpen: () => void;
  isOpen: boolean;
}

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Intro({ onOpen, isOpen }: IntroProps) {
  const [isGone, setIsGone] = useState(false);
  const triggeredRef = useRef(false);
  const controls = useAnimationControls();

  const open = async () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    onOpen();

    await controls.start({
      opacity: 0,
      scale: 1.06,
      filter: "blur(14px)",
      transition: { duration: 0.7, ease: EASE },
    });

    await controls.start({
      y: "-100%",
      transition: { duration: 1.05, ease: EASE },
    });
    setIsGone(true);
  };

  useEffect(() => {
    const openFn = () => open();
    window.addEventListener("wheel", openFn, { passive: true });
    window.addEventListener("touchmove", openFn, { passive: true });
    window.addEventListener("keydown", openFn);
    return () => {
      window.removeEventListener("wheel", openFn);
      window.removeEventListener("touchmove", openFn);
      window.removeEventListener("keydown", openFn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isGone) return null;

  return (
    <motion.div
      animate={controls}
      initial={{ y: "0%", opacity: 1, scale: 1, filter: "blur(0px)" }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-pointer bg-night"
      style={{ minHeight: "100dvh" }}
      onClick={open}
      aria-hidden={isOpen}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(6,10,20,0.9)_100%)]" />
        <div className="absolute inset-0 opacity-60">
          <div className="absolute bottom-[-18%] left-1/2 -translate-x-1/2 w-[720px] max-w-[140vw] text-gold/[0.06]">
            <SealRing className="w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="font-caps text-[10px] md:text-xs tracking-[0.6em] uppercase text-gold/70 mb-5"
        >
          The Wedding Of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
          className="font-script text-ivory-gold text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-tight py-2 drop-shadow-[0_0_35px_rgba(201,162,39,0.25)]"
        >
          Deepa <span className="text-gold-light">&</span> Yadev
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-gold/50 mt-6 w-56"
        >
          <MiniDivider className="w-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease: EASE }}
          className="font-caps text-xs md:text-sm tracking-[0.5em] uppercase text-ivory/80 mt-6"
        >
          13 · 09 · 2026
        </motion.p>

        {/* Wax seal */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.7, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={open}
          aria-label="Open the invitation"
          className="relative mt-12 md:mt-14 group"
        >
          <span className="seal-pulse absolute inset-0 rounded-full" />
          <SealRing className="w-44 h-44 md:w-52 md:h-52 text-gold/40 transition-colors duration-500 group-hover:text-gold/70" />
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-script text-2xl md:text-3xl text-gold-light">
              D
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase font-caps text-ivory/50 -mt-1">
              &amp;
            </span>
            <span className="font-script text-2xl md:text-3xl text-gold-light">
              Y
            </span>
          </span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.1 }}
          className="mt-8 font-caps text-[10px] tracking-[0.45em] uppercase text-ivory/40"
        >
          Tap to open your invitation
        </motion.p>
      </div>
    </motion.div>
  );
}