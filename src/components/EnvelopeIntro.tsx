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
        setStep(1);
        setTimeout(() => {
          setStep(2);
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
          key="envelope-intro"
          animate={step === 2 ? { opacity: 0, filter: "blur(28px)", scale: 1.07 } : { opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden flex flex-col items-center justify-center"
          style={{ background: "radial-gradient(ellipse at 50% 45%, #08193a 0%, #030d1f 55%, #010813 100%)" }}
          onClick={() => {
            if (step === 0) {
              setStep(1);
              setTimeout(() => { setStep(2); setTimeout(() => onOpen(), 1100); }, 900);
            }
          }}
        >
          {/* Ambient blue glow */}
          <div className="absolute pointer-events-none" style={{
            width: "80vw", height: "55vw", maxWidth: "950px",
            background: "radial-gradient(ellipse, rgba(0,60,150,0.2) 0%, transparent 70%)",
            filter: "blur(50px)",
          }} />

          {/* Envelope Assembly */}
          <motion.div
            className="relative"
            style={{ width: "min(92vw, 700px)", aspectRatio: "1.52 / 1", perspective: "2500px" }}
            animate={step === 0 ? { y: [0, -9, 0] } : { y: 0 }}
            transition={{ repeat: step === 0 ? Infinity : 0, duration: 3.8, ease: "easeInOut" }}
          >
            {/* Ground shadow */}
            <div className="absolute -bottom-5 left-[8%] w-[84%] h-6 rounded-full pointer-events-none" style={{
              background: "rgba(0,0,0,0.55)", filter: "blur(18px)",
            }} />

            {/* Interior darkness */}
            <div className="absolute inset-0 rounded-[3px]" style={{
              background: "linear-gradient(to bottom, #001030 0%, #001d5e 80%)",
              boxShadow: "inset 0 25px 50px rgba(0,0,0,0.9)",
            }} />

            {/* Body – everything below the V flap */}
            <div className="absolute inset-0 pointer-events-none" style={{
              clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 53%)",
              background: "linear-gradient(150deg, #1a5fd4 0%, #0047AB 45%, #003590 100%)",
              boxShadow: "inset -60px 0 80px rgba(0,0,30,0.35), inset 60px 0 80px rgba(0,0,30,0.35)",
            }}>
              <PaperTexture />
              {/* Body border – double gold lines following envelope edges */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 760 500">
                <path d="M 10 10 L 10 490 L 750 490 L 750 10 L 380 265" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity="0.5" strokeLinejoin="round" />
                <path d="M 17 17 L 17 483 L 743 483 L 743 17 L 380 272" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.25" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Horizontal crease line where flap meets body */}
            <div className="absolute left-0 right-0 pointer-events-none" style={{
              top: "53%", height: "1px",
              background: "linear-gradient(to right, transparent, rgba(0,20,60,0.8) 20%, rgba(0,20,60,0.8) 80%, transparent)",
            }} />

            {/* Seal – bottom half only (anchored to body) */}
            <div className="absolute left-1/2 z-10 pointer-events-none"
              style={{ top: "53%", transform: "translateX(-50%) translateY(-50%)", width: "clamp(100px,18vw,130px)", height: "clamp(100px,18vw,130px)", clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}>
              <WaxSeal />
            </div>

            {/* Flap – lifts slightly on step 1 */}
            <motion.div
              className="absolute top-0 left-0 w-full z-20 pointer-events-none"
              style={{ height: "53%", transformStyle: "preserve-3d", transformOrigin: "top center" }}
              animate={{ rotateX: step >= 1 ? 48 : 0 }}
              transition={{ duration: 0.95, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Flap paper */}
              <div className="absolute inset-0" style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(165deg, #2268d8 0%, #0b50c0 40%, #003a96 100%)",
                filter: "drop-shadow(0 20px 28px rgba(0,0,0,0.6))",
              }}>
                <PaperTexture />
                {/* Flap border lines following V-edge */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 760 405">
                  <path d="M 8 8 L 380 398 L 752 8" fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 15 15 L 380 388 L 745 15" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Seal – top half (lifts with the flap) */}
              <div className="absolute bottom-0 left-1/2 pointer-events-none"
                style={{ transform: "translateX(-50%) translateY(50%)", width: "clamp(100px,18vw,130px)", height: "clamp(100px,18vw,130px)", clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}>
                <WaxSeal />
              </div>
            </motion.div>
          </motion.div>

          {/* Tap hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: step === 0 ? 1 : 0 }}
            transition={{ delay: 1.5, duration: 0.9 }}
            className="absolute bottom-10 font-playfair text-[#C5A059]/75 tracking-[0.4em] uppercase text-[11px] md:text-xs pointer-events-none"
          >
            tap to open
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Paper Texture ────────────────────────────────────────────────────────────
const PaperTexture = () => (
  <>
    {/* Fine linen fiber noise */}
    <div className="absolute inset-0 pointer-events-none" style={{
      opacity: 0.12, mixBlendMode: "overlay",
      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
    }} />
    {/* Edge vignette to give paper depth */}
    <div className="absolute inset-0 pointer-events-none" style={{
      background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.22) 100%)",
    }} />
  </>
);

// ─── Wax Seal ─────────────────────────────────────────────────────────────────
const WaxSeal = () => (
  <svg
    viewBox="0 0 200 200"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Organic wax bump texture */}
      <filter id="wax-texture" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="8" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        <feGaussianBlur in="displaced" stdDeviation="0.5" />
      </filter>
      {/* Emboss filter for pressed-in design */}
      <filter id="emboss" x="-5%" y="-5%" width="110%" height="110%">
        <feGaussianBlur stdDeviation="1.2" result="blur" />
        <feSpecularLighting in="blur" surfaceScale="4" specularConstant="0.8" specularExponent="18" lightingColor="#c8941a" result="spec">
          <fePointLight x="80" y="60" z="120" />
        </feSpecularLighting>
        <feComposite in="spec" in2="SourceGraphic" operator="in" result="specOut" />
        <feBlend in="SourceGraphic" in2="specOut" mode="screen" />
      </filter>
      {/* Inset shadow for debossed letters */}
      <filter id="deboss" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feOffset dx="1" dy="1.5" result="offset" />
        <feComposite in="offset" in2="SourceGraphic" operator="in" />
      </filter>

      {/* Wax radial gradient – mimics light from top-left */}
      <radialGradient id="wax-grad" cx="38%" cy="32%" r="62%" fx="35%" fy="28%">
        <stop offset="0%" stopColor="#f0d06a" />
        <stop offset="18%" stopColor="#d4a820" />
        <stop offset="50%" stopColor="#b08010" />
        <stop offset="78%" stopColor="#7a5508" />
        <stop offset="100%" stopColor="#3d2304" />
      </radialGradient>

      {/* Highlight overlay */}
      <radialGradient id="wax-shine" cx="35%" cy="28%" r="45%">
        <stop offset="0%" stopColor="rgba(255,245,190,0.55)" />
        <stop offset="100%" stopColor="rgba(255,245,190,0)" />
      </radialGradient>

      {/* Inner recessed stamp area */}
      <radialGradient id="stamp-grad" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#c9991a" />
        <stop offset="60%" stopColor="#a07510" />
        <stop offset="100%" stopColor="#6b4c08" />
      </radialGradient>
    </defs>

    {/* ── Outer wax blob (organic with filter) ── */}
    <circle cx="100" cy="100" r="92" fill="url(#wax-grad)" filter="url(#wax-texture)" />

    {/* ── Highlight sheen ── */}
    <circle cx="100" cy="100" r="92" fill="url(#wax-shine)" />

    {/* ── Raised rim ring ── */}
    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(80,50,5,0.5)" strokeWidth="4" />
    <circle cx="100" cy="100" r="77" fill="none" stroke="rgba(255,230,120,0.25)" strokeWidth="1.5" />

    {/* ── Recessed stamp face ── */}
    <circle cx="100" cy="100" r="72" fill="url(#stamp-grad)" style={{ filter: "drop-shadow(inset 0 3px 6px rgba(0,0,0,0.9))" }} />

    {/* ── All embossed content as a single group with emboss filter ── */}
    <g filter="url(#emboss)">
      {/* Top decorative flourish */}
      <path d="M 70 70 Q 85 62, 100 66 Q 115 62, 130 70" fill="none" stroke="#3d2500" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 78 68 Q 83 60, 78 55 Q 74 62, 78 68" fill="#3d2500" />
      <path d="M 122 68 Q 127 60, 122 55 Q 118 62, 122 68" fill="#3d2500" />
      <circle cx="100" cy="64" r="2.5" fill="#3d2500" />

      {/* D & Y monogram – hand-drawn paths for elegant script style */}
      {/* "D" – left side */}
      <path
        d="M 76 82 L 76 118 M 76 82 Q 102 80, 102 100 Q 102 120, 76 118"
        fill="none" stroke="#3d2500" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* "&" – small ampersand */}
      <path
        d="M 108 105 Q 105 96, 111 93 Q 117 90, 117 97 Q 117 107, 105 114 L 119 114 M 108 105 L 119 114"
        fill="none" stroke="#3d2500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* "Y" – right side */}
      <path
        d="M 126 82 L 139 95 M 152 82 L 139 95 L 139 118"
        fill="none" stroke="#3d2500" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Laurel wreath – left branch */}
      <path d="M 100 130 C 85 128, 68 122, 58 110" fill="none" stroke="#3d2500" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 68 118 Q 62 111, 67 107 Q 72 112, 68 118" fill="#3d2500" />
      <path d="M 78 126 Q 72 119, 77 115 Q 82 120, 78 126" fill="#3d2500" />
      <path d="M 90 130 Q 84 123, 89 119 Q 94 124, 90 130" fill="#3d2500" />
      {/* Laurel wreath – right branch */}
      <path d="M 100 130 C 115 128, 132 122, 142 110" fill="none" stroke="#3d2500" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 132 118 Q 138 111, 133 107 Q 128 112, 132 118" fill="#3d2500" />
      <path d="M 122 126 Q 128 119, 123 115 Q 118 120, 122 126" fill="#3d2500" />
      <path d="M 110 130 Q 116 123, 111 119 Q 106 124, 110 130" fill="#3d2500" />
      {/* Center berries */}
      <circle cx="96" cy="134" r="2" fill="#3d2500" />
      <circle cx="100" cy="136" r="2.5" fill="#3d2500" />
      <circle cx="104" cy="134" r="2" fill="#3d2500" />
    </g>

    {/* ── Subtle reflected rim highlight ── */}
    <path d="M 28 75 Q 22 100, 28 125" fill="none" stroke="rgba(255,230,100,0.3)" strokeWidth="5" strokeLinecap="round" />
  </svg>
);
