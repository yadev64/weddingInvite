"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { CornerFiligree, ArchFrame, MiniDivider } from "./Ornaments";

const EASE = [0.76, 0, 0.24, 1] as const;

function Reveal({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 900], [0, 240]);
  const yFrame = useTransform(scrollY, [0, 900], [0, 120]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleVideo = useTransform(scrollY, [0, 900], [1, 1.15]);

  return (
    <section
      id="top"
      className="relative h-[112svh] w-full flex items-center justify-center overflow-hidden bg-night"
    >
      {/* Cinematic background — photo on touch (no video decode), video on desktop */}
      <motion.div style={{ scale: scaleVideo }} className="absolute inset-0 z-0">
        <div className="md:hidden absolute inset-0 overflow-hidden">
          <div className="kenburns h-full w-full">
            <Image
              src="/PAJU2051.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{
                filter:
                  "brightness(0.55) contrast(1.05) saturate(0.8) sepia(0.2)",
              }}
            />
          </div>
        </div>

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/PAJU2051.jpg"
          className="hidden md:block w-full h-full object-cover"
        >
          <source src="/engagement.mp4" type="video/mp4" />
        </video>

        {/* Grade overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-transparent to-night" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(6,10,20,0.55)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-gold-deep/20 via-transparent to-transparent" />
      </motion.div>

      {/* Film grain */}
      <div className="grain absolute inset-0 z-[1]" />

      {/* Gold frame + filigree */}
      <motion.div
        style={{ y: yFrame }}
        className="absolute inset-3 md:inset-5 z-[2] pointer-events-none"
      >
        <div className="absolute inset-0 border border-gold/25" />
        <div className="absolute inset-2 border border-gold/10" />
        <CornerFiligree className="absolute top-2 left-2 w-14 h-14 md:w-20 md:h-20 text-gold/40" />
        <CornerFiligree className="absolute top-2 right-2 w-14 h-14 md:w-20 md:h-20 text-gold/40 rotate-90" />
        <CornerFiligree className="absolute bottom-2 right-2 w-14 h-14 md:w-20 md:h-20 text-gold/40 rotate-180" />
        <CornerFiligree className="absolute bottom-2 left-2 w-14 h-14 md:w-20 md:h-20 text-gold/40 -rotate-90" />
      </motion.div>

      {/* Temple arch watermark */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <ArchFrame className="h-[92%] w-auto text-gold/[0.05]" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-30 flex flex-col items-center text-center px-5 pt-10"
      >
        <Reveal delay={0.2}>
          <p className="font-caps text-[10px] md:text-xs tracking-[0.6em] uppercase text-gold/80 mb-6">
            The Wedding Celebration Of
          </p>
        </Reveal>

        <Reveal delay={0.45} className="w-full">
          <h1 className="font-script text-gold-sheen text-7xl sm:text-8xl lg:text-[9.5rem] leading-[1.1] py-2 drop-shadow-[0_6px_40px_rgba(6,10,20,0.8)]">
            Deepa
          </h1>
        </Reveal>

        <Reveal delay={0.75}>
          <div className="flex items-center justify-center gap-4 md:gap-6 my-2 md:my-0">
            <span className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="font-serif italic text-2xl md:text-4xl text-gold-light">
              &
            </span>
            <span className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </Reveal>

        <Reveal delay={0.95} className="w-full">
          <h1 className="font-script text-gold-sheen text-7xl sm:text-8xl lg:text-[9.5rem] leading-[1.15] py-2 drop-shadow-[0_6px_40px_rgba(6,10,20,0.8)]">
            Yadev
          </h1>
        </Reveal>

        <Reveal delay={1.25}>
          <div className="text-gold/50 mt-7 w-52 md:w-64">
            <MiniDivider className="w-full" />
          </div>
        </Reveal>

        <Reveal delay={1.45}>
          <p className="font-caps text-xs md:text-sm tracking-[0.45em] uppercase text-ivory/85 mt-6">
            13th &amp; 14th September 2026
          </p>
          <p className="font-serif italic text-ivory/50 text-sm md:text-base mt-2 tracking-[0.15em]">
            Vaikom Mahadeva Temple · Kerala
          </p>
        </Reveal>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-caps text-[9px] tracking-[0.5em] uppercase text-ivory/40">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent relative overflow-hidden">
          <span className="scroll-dot absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-light" />
        </div>
      </motion.div>
    </section>
  );
}