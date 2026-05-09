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
          setStep(2); // Blur & fade out
          setTimeout(() => onOpen(), 1100);
        }, 900);
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
          animate={
            step === 2
              ? { opacity: 0, filter: "blur(24px)", scale: 1.06 }
              : { opacity: 1, filter: "blur(0px)", scale: 1 }
          }
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden flex flex-col items-center justify-center"
          style={{
            background: "radial-gradient(ellipse at center, #0a1f3d 0%, #040d1d 60%, #020a16 100%)"
          }}
          onClick={() => {
            if (step === 0) {
              setStep(1);
              setTimeout(() => {
                setStep(2);
                setTimeout(() => onOpen(), 1100);
              }, 900);
            }
          }}
        >
          {/* Ambient glow behind envelope */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "75vw",
              height: "50vw",
              maxWidth: "900px",
              background: "radial-gradient(ellipse, rgba(0,71,171,0.25) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Main Envelope Container */}
          <motion.div
            className="relative w-[92vw] md:w-[78vw] lg:w-[58vw] max-w-3xl"
            style={{ aspectRatio: "1.5 / 1", perspective: "2000px" }}
            animate={step === 0 ? { y: [0, -8, 0] } : { y: 0 }}
            transition={{
              repeat: step === 0 ? Infinity : 0,
              duration: 4,
              ease: "easeInOut",
            }}
          >
            {/* ── SHADOW ── */}
            <div
              className="absolute -bottom-6 left-[5%] w-[90%] h-8 rounded-full pointer-events-none"
              style={{
                background: "rgba(0,0,0,0.5)",
                filter: "blur(14px)",
              }}
            />

            {/* ── INTERIOR (shows when flap lifts) ── */}
            <div
              className="absolute inset-0 rounded-md overflow-hidden"
              style={{
                background: "linear-gradient(to bottom, #001233 0%, #002060 60%, #0a2e6b 100%)",
                boxShadow: "inset 0 30px 60px rgba(0,0,0,0.9)",
              }}
            />

            {/* ── ENVELOPE BODY (clips away the flap area) ── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 54%)",
                background: "linear-gradient(160deg, #1557c7 0%, #0047AB 40%, #003a8c 100%)",
                boxShadow: "inset 0 0 80px rgba(0,0,0,0.4)",
              }}
            >
              <TextureOverlay />
              {/* Gold border inset lines */}
              <div className="absolute inset-[6px] pointer-events-none" style={{
                borderTop: "none",
                borderLeft: "1px solid rgba(212,175,55,0.45)",
                borderRight: "1px solid rgba(212,175,55,0.45)",
                borderBottom: "1px solid rgba(212,175,55,0.45)",
                clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 54%)",
              }} />
              <div className="absolute inset-[10px] pointer-events-none" style={{
                borderTop: "none",
                borderLeft: "1px solid rgba(212,175,55,0.2)",
                borderRight: "1px solid rgba(212,175,55,0.2)",
                borderBottom: "1px solid rgba(212,175,55,0.2)",
                clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 54%)",
              }} />
            </div>

            {/* ── SEAL (bottom half, stays on body) ── */}
            <div
              className="absolute left-1/2 z-10 w-28 h-28 md:w-36 md:h-36 pointer-events-none"
              style={{
                top: "54%",
                transform: "translateX(-50%) translateY(-50%)",
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              }}
            >
              <WaxSeal />
            </div>

            {/* ── FLAP (animates on interaction) ── */}
            <motion.div
              className="absolute top-0 left-0 w-full pointer-events-none z-20"
              style={{
                height: "54%",
                transformStyle: "preserve-3d",
                transformOrigin: "top center",
              }}
              animate={{ rotateX: step >= 1 ? 50 : 0 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Flap paper */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(170deg, #1c60d0 0%, #0047AB 55%, #003a8c 100%)",
                  filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.55))",
                }}
              >
                <TextureOverlay />
                {/* Gold flap V-edge lines */}
                <FlapBorder />
              </div>

              {/* Flap: Seal top half */}
              <div
                className="absolute bottom-0 left-1/2 w-28 h-28 md:w-36 md:h-36 pointer-events-none"
                style={{
                  transform: "translateX(-50%) translateY(50%)",
                  clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                }}
              >
                <WaxSeal />
              </div>
            </motion.div>
          </motion.div>

          {/* ── HINT TEXT ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: step === 0 ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 font-playfair text-[#D4AF37]/80 tracking-[0.35em] uppercase text-xs md:text-sm pointer-events-none"
          >
            Tap to open
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────

const TextureOverlay = () => (
  <div
    className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")',
    }}
  />
);

const FlapBorder = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    preserveAspectRatio="none"
    viewBox="0 0 1000 540"
  >
    {/* Primary gold edge */}
    <path
      d="M 10 8 L 500 530 L 990 8"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="2.5"
      strokeOpacity="0.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Secondary inset line */}
    <path
      d="M 22 18 L 500 516 L 978 18"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1"
      strokeOpacity="0.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WaxSeal = () => (
  <div
    className="w-full h-full rounded-full flex items-center justify-center relative"
    style={{
      background:
        "radial-gradient(circle at 32% 28%, #f5d97a 0%, #c9a227 35%, #9a7318 70%, #5a3e0a 100%)",
      boxShadow:
        "inset 0 5px 8px rgba(255,255,255,0.55), inset 0 -6px 14px rgba(0,0,0,0.75), 0 12px 28px rgba(0,0,0,0.7)",
    }}
  >
    {/* Rim ring */}
    <div
      className="absolute inset-[6%] rounded-full"
      style={{
        border: "2px solid rgba(90,62,10,0.5)",
        boxShadow:
          "inset 0 4px 10px rgba(0,0,0,0.6), 0 2px 4px rgba(255,230,100,0.25)",
        background:
          "radial-gradient(circle at 45% 40%, #d4af37 0%, #9a7318 100%)",
      }}
    >
      {/* Top scroll swirl */}
      <svg
        viewBox="0 0 60 22"
        className="absolute w-9 h-4 top-[16%] left-1/2 -translate-x-1/2 opacity-80"
        style={{
          filter:
            "drop-shadow(0.5px 1px 0 rgba(255,230,100,0.4)) drop-shadow(-0.5px -0.5px 1px rgba(0,0,0,0.7))",
        }}
      >
        <path
          d="M 5 11 Q 15 2, 30 11 Q 45 20, 55 11"
          fill="none"
          stroke="#4a3008"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="5" cy="11" r="2" fill="#4a3008" />
        <circle cx="55" cy="11" r="2" fill="#4a3008" />
      </svg>

      {/* D&Y Monogram */}
      <span
        className="font-great-vibes text-[1.6rem] md:text-[2.1rem] text-[#3b2606] z-10 leading-none mt-1"
        style={{
          textShadow:
            "1px 1.5px 1px rgba(255,215,80,0.5), -0.5px -1px 2px rgba(0,0,0,0.8)",
          letterSpacing: "-0.02em",
        }}
      >
        D&Y
      </span>

      {/* Laurel wreath */}
      <svg
        viewBox="0 0 100 44"
        className="absolute bottom-[13%] left-1/2 -translate-x-1/2 w-[56%] h-auto opacity-85"
        style={{
          filter:
            "drop-shadow(0.5px 1px 0 rgba(255,230,100,0.4)) drop-shadow(-0.5px -0.5px 1px rgba(0,0,0,0.6))",
        }}
      >
        {/* Left branch */}
        <path d="M 50 40 C 35 38, 18 30, 12 14" fill="none" stroke="#4a3008" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 12 14 Q 8 7, 14 7 Q 18 13, 12 14" fill="#4a3008" />
        <path d="M 22 28 Q 17 22, 22 20 Q 26 26, 22 28" fill="#4a3008" />
        <path d="M 32 36 Q 27 30, 33 29 Q 37 34, 32 36" fill="#4a3008" />
        {/* Right branch */}
        <path d="M 50 40 C 65 38, 82 30, 88 14" fill="none" stroke="#4a3008" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 88 14 Q 92 7, 86 7 Q 82 13, 88 14" fill="#4a3008" />
        <path d="M 78 28 Q 83 22, 78 20 Q 74 26, 78 28" fill="#4a3008" />
        <path d="M 68 36 Q 73 30, 67 29 Q 63 34, 68 36" fill="#4a3008" />
        {/* Center stem */}
        <circle cx="50" cy="41" r="2" fill="#4a3008" />
      </svg>
    </div>
  </div>
);
