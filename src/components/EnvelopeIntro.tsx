"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import ShaderAnimation from "./ShaderAnimation";

interface EnvelopeIntroProps {
  onOpen: () => void;
  isOpen: boolean;
}

const ENV_W = 387;
const ENV_H = 293;
const ENV_ASPECT = ENV_W / ENV_H;

const MOB_ASPECT = 387 / 293; 
const MOB_CROP_SCALE = 150; 
const MOB_CROP_TOP = -25;     

const MOB_LID_W = 355.37;
const MOB_LID_H = 155.35;
const MOB_LID_WIDTH = "91.83%"; 
const MOB_LID_LEFT = "4.09%";   

export default function EnvelopeIntro({ onOpen, isOpen }: EnvelopeIntroProps) {
  const [isClient, setIsClient] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileH, setMobileH] = useState(0);
  const [isFullyGone, setIsFullyGone] = useState(false);

  const outerControls = useAnimationControls();
  const floatControls = useAnimationControls();
  const lidControls = useAnimationControls();
  const triggeredRef = useRef(false);

  useEffect(() => {
    setIsClient(true);

    const updateDimensions = () => {
      const mobile = window.innerWidth < 1024; // Desktop is 1024+ for shader
      setIsMobile(mobile);
      setMobileH(window.innerHeight);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    floatControls.start({
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
    });

    return () => window.removeEventListener("resize", updateDimensions);
  }, [floatControls]);

  const handleOpen = async () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    setTriggered(true);

    onOpen();

    floatControls.stop();
    floatControls.start({ y: 0, transition: { duration: 0.4, ease: "easeOut" } });

    // Lid opens (only relevant for mobile envelope view)
    lidControls.start({
      rotateX: -62,
      transition: { duration: 0.88, ease: [0.32, 0, 0.2, 1] },
    });


    await outerControls.start({
      scale: 1.3,
      opacity: 0,
      filter: "blur(28px)",
      transition: { duration: 1.0, ease: [0.4, 0, 0.85, 1] },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  if (!isClient || isFullyGone) return null;

  const mobileEnvelopeStyle: React.CSSProperties = {
    position: "relative",
    height: mobileH > 0 ? mobileH : "100vh",
    width: mobileH > 0 ? mobileH * MOB_ASPECT : `calc(100vh * ${MOB_ASPECT})`,
    flexShrink: 0,
  };

  return (
    <motion.div
      key="envelope-intro"
      animate={outerControls}
      initial={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer"
      style={{ overflow: "hidden", height: "100dvh", width: "100vw" }}
      onClick={handleOpen}
    >
      {!isMobile ? (
        // ── Desktop Shader View ──
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <ShaderAnimation />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute z-10 text-center"
          >
            <h1 className="font-great-vibes text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#F9E29C] via-[#D4AF37] to-[#B8860B] py-4">
              We're getting married!
            </h1>
            <p className="font-playfair text-white/60 tracking-[0.4em] uppercase text-sm mt-4">
              Tap anywhere to enter
            </p>
          </motion.div>
        </div>
      ) : (
        // ── Mobile Envelope View ──
        <>
          {/* Full-screen paper texture background */}
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/main_texture.svg"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 46%, rgba(3,10,22,0.50) 0%, rgba(1,5,14,0.83) 100%)",
              }}
            />
          </div>

          <div className="absolute top-0 left-0 pointer-events-none" style={{ width: "clamp(100px,15vw,220px)" }}>
            <img src="/flower_p1.svg" alt="" aria-hidden="true" className="w-full h-auto" />
          </div>
          <div
            className="absolute top-0 right-0 pointer-events-none"
            style={{ width: "clamp(100px,15vw,220px)", transform: "scaleX(-1)" }}
          >
            <img src="/flower_p2.svg" alt="" aria-hidden="true" className="w-full h-auto" />
          </div>
          <div
            className="absolute bottom-0 left-0 pointer-events-none"
            style={{ width: "clamp(80px,11vw,170px)", transform: "rotate(180deg) scaleX(-1)" }}
          >
            <img src="/flower_p2.svg" alt="" aria-hidden="true" className="w-full h-auto" />
          </div>
          <div
            className="absolute bottom-0 right-0 pointer-events-none"
            style={{ width: "clamp(80px,11vw,170px)", transform: "rotate(180deg)" }}
          >
            <img src="/flower_p1.svg" alt="" aria-hidden="true" className="w-full h-auto" />
          </div>

          {/* Envelope (float layer) */}
          <div style={{ transform: "translateX(-1.2%)", width: "100%", display: "flex", justifyContent: "center" }}>
            <motion.div animate={floatControls} style={mobileEnvelopeStyle}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* Body */}
                <img
                  src="/env_mob.svg"
                  alt="envelope"
                  style={{
                    position: "absolute",
                    left: 0,
                    width: "100%",
                    height: `${MOB_CROP_SCALE}%`,
                    top: `${MOB_CROP_TOP}%`,
                    display: "block",
                    objectFit: "fill",
                    zIndex: 1,
                  }}
                />

                {/* Lid overlay */}
                <motion.div
                  animate={lidControls}
                  initial={{ rotateX: 0 }}
                  style={{
                    position: "absolute",
                    left: MOB_LID_LEFT,
                    top: `calc(5.54% + ${MOB_CROP_TOP}%)`,
                    width: MOB_LID_WIDTH,
                    aspectRatio: `${MOB_LID_W} / ${MOB_LID_H}`,
                    transformOrigin: "50% 0%",
                    transformStyle: "preserve-3d",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                >
                  <motion.img
                    src="/lid_mob.svg"
                    alt=""
                    aria-hidden="true"
                    animate={!triggered ? {
                      filter: [
                        "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                        "drop-shadow(0 12px 24px rgba(0,0,0,0.45))",
                        "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
                      ]
                    } : {
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block"
                    }}
                  />
                </motion.div>
              </div>

              {/* "Tap to open" hint */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                style={{ top: "68%", zIndex: 10 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: triggered ? 0 : 1 }}
                transition={{ delay: triggered ? 0 : 1.8, duration: 0.6 }}
              >
                <span
                  style={{
                    color: "rgba(210,175,100,0.85)",
                    fontFamily: "'Playfair Display', serif",
                    letterSpacing: "0.44em",
                    textTransform: "uppercase",
                    fontSize: "11px",
                  }}
                >
                  tap to open
                </span>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}
