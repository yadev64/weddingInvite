"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface EnvelopeIntroProps {
  onOpen: () => void;
  isOpen: boolean;
}

// Desktop SVGs
const ENV_W = 387, ENV_H = 293;                     // env_no_lid viewBox
const ENV_ASPECT = ENV_W / ENV_H;                   // ≈ 1.3208

// Mobile SVGs (no shadow layer — designed clean for portrait full-bleed)
// Actual envelope shape inside env_mob.svg is 306.65 × 206.29
const MOB_ENV_W = 306.65, MOB_ENV_H = 206.29;
const MOB_ASPECT = MOB_ENV_W / MOB_ENV_H;             // ≈ 1.486
const MOB_LID_W = 309.45, MOB_LID_H = 135.27;         // lid_mob viewBox

// env_mob.svg viewBox is 337 × 237. Envelope starts at y=15.23.
// To fill 100% height, we scale by (237 / 206.29) and offset by (15.23 / 206.29).
const MOB_CROP_SCALE = (237 / MOB_ENV_H) * 100;       // ≈ 114.88%
const MOB_CROP_TOP = -(15.23 / MOB_ENV_H) * 100;      // ≈ -7.38%

// Lid left offset within the 306.65 envelope width:
// lid_mob is 309.45 wide (slightly wider than the 306.65 body due to side tabs)
const MOB_LID_LEFT = ((MOB_ENV_W - MOB_LID_W) / 2 / MOB_ENV_W * 100).toFixed(2) + "%";
const MOB_LID_WIDTH = (MOB_LID_W / MOB_ENV_W * 100).toFixed(2) + "%";

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
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setMobileH(window.innerHeight);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Float only on desktop — full-bleed mobile looks better static
    if (window.innerWidth >= 768) {
      floatControls.start({
        y: [0, -10, 0],
        transition: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
      });
    }

    return () => window.removeEventListener("resize", updateDimensions);
  }, [floatControls]);

  const handleOpen = async () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    setTriggered(true);

    // 1. Immediately trigger onOpen() so the Hero section starts its text animations
    // the very millisecond the user interacts.
    onOpen();

    floatControls.stop();
    floatControls.start({ y: 0, transition: { duration: 0.4, ease: "easeOut" } });

    // Lid opens
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

  /*
    Mobile sizing strategy:
    On mobile the envelope fills the full viewport HEIGHT (100dvh).
    Width = 100dvh × (387/293) which will be wider than the viewport,
    so equal amounts overflow left and right — perfectly centered, no offset.
    The outer overflow:hidden clips the sides cleanly.

    Desktop: envelope is constrained by width (min(88vw, 620px)).
  */
  const mobileEnvelopeStyle: React.CSSProperties = {
    position: "relative",
    height: mobileH > 0 ? mobileH : "100vh",
    width: mobileH > 0 ? mobileH * MOB_ASPECT : `calc(100vh * ${MOB_ASPECT})`,
    flexShrink: 0,
  };

  const desktopEnvelopeStyle: React.CSSProperties = {
    position: "relative",
    width: "min(88vw, 620px)",
  };

  return (
    <motion.div
      key="envelope-intro"
      animate={outerControls}
      initial={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer"
      style={{ overflow: "hidden", minHeight: "100dvh" }}
      onClick={handleOpen}
    >
      {/* ── Full-screen paper texture background ── */}
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

      {/* ── Flower corners (only shown on desktop — they'd be too small on mobile full-bleed) ── */}
      {!isMobile && (
        <>
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
        </>
      )}

      {/* ── Envelope (float layer) ── */}
      <div style={isMobile ? { transform: "translateX(-1.2%)", width: "100%", display: "flex", justifyContent: "center" } : {}}>
        <motion.div animate={floatControls} style={isMobile ? mobileEnvelopeStyle : desktopEnvelopeStyle}>
        {/* Ground shadow — only makes sense on desktop */}
        {!isMobile && (
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: -18,
              left: "8%",
              width: "84%",
              height: 20,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.42)",
              filter: "blur(22px)",
              zIndex: 0,
            }}
          />
        )}

        {/*
          Shared coordinate container — both the body img and the lid overlay
          live inside here so `top`/`left` percentages are always consistent.

          Mobile:  wrapper has explicit h+w → inner div fills it with height:100%
          Desktop: wrapper has only width  → inner div's height comes from aspectRatio
        */}
        <div
          style={{
            position: "relative",
            width: "100%",
            ...(isMobile
              ? { height: "100%" }
              : { aspectRatio: `${ENV_W} / ${ENV_H}` }),
          }}
        >
          {/* Body — mobile uses shadow-free env_mob.svg */}
          <img
            src={isMobile ? "/env_mob.svg" : "/env_no_lid.svg"}
            alt="envelope"
            style={{
              position: "absolute",
              left: 0,
              width: "100%",
              ...(isMobile
                ? { height: `${MOB_CROP_SCALE}%`, top: `${MOB_CROP_TOP}%` }
                : { height: "100%", top: 0 }),
              display: "block",
              objectFit: "fill",
              zIndex: 1,
            }}
          />

          {/*
            Lid overlay — mobile uses lid_mob.svg with recalculated offsets.
            Desktop: left=7.7%, top=5.54%, width=84%, aspectRatio=306.65/115.56
            Mobile:  left=MOB_LID_LEFT(~4.09%), top=5.54%, width=MOB_LID_WIDTH(~91.83%), aspectRatio=309.45/135.27
          */}
          <motion.div
            animate={lidControls}
            initial={{ rotateX: 0 }}
            style={{
              position: "absolute",
              left: isMobile ? MOB_LID_LEFT : "7.7%",
              // Mobile top also needs the crop offset adjustment
              top: isMobile ? `calc(5.54% + ${MOB_CROP_TOP}%)` : "5.54%",
              width: isMobile ? MOB_LID_WIDTH : "84%",
              aspectRatio: isMobile
                ? `${MOB_LID_W} / ${MOB_LID_H}`
                : "306.65 / 115.56",
              transformOrigin: "50% 0%",
              transformStyle: "preserve-3d",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <motion.img
              src={isMobile ? "/lid_mob.svg" : "/env_lid.svg"}
              alt=""
              aria-hidden="true"
              animate={!triggered && isMobile ? {
                filter: [
                  "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                  "drop-shadow(0 12px 24px rgba(0,0,0,0.45))",
                  "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
                ]
              } : {
                filter: isMobile ? "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" : "none"
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

        {/* ── "Tap to open" hint ── */}
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
  </motion.div>
);
}
