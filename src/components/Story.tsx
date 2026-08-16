"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { MandalaDivider } from "./Ornaments";

/** A single word that reveals as its own scroll window passes. */
function Word({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.08, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block font-serif font-light text-3xl md:text-5xl lg:text-6xl text-ivory leading-snug tracking-wide"
    >
      {word}
    </motion.span>
  );
}

/** Word-by-word cinematic reveal driven by scroll position. */
function TextReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 55%"],
  });

  const words = children?.toString().split(" ") || [];

  return (
    <div
      ref={ref}
      className="flex flex-wrap justify-center gap-x-3 gap-y-3 md:gap-x-4 max-w-4xl mx-auto"
    >
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          progress={scrollYProgress}
          start={i / words.length}
          end={(i + 1) / words.length}
        />
      ))}
    </div>
  );
}

const CHAPTERS = [
  {
    no: "I",
    title: "How we met",
    body: "It all started with a simple hello. Two paths crossed at exactly the right time — in a world full of noise, we somehow found each other.",
  },
  {
    no: "II",
    title: "What grew between us",
    body: "What began as a beautiful friendship soon blossomed into a lifelong promise. Every shared smile carried us a step closer to forever.",
  },
  {
    no: "III",
    title: "The day we said yes",
    body: "Through shared laughter and quiet moments of understanding, we realised our hearts had finally found their way back home.",
  },
];

export default function Story() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const spring = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  const scaleImg = useTransform(spring, [0, 1], [1.12, 1.3]);
  const overlayOpacity = useTransform(spring, [0, 0.25, 0.8, 1], [0.55, 0.78, 0.82, 0.96]);
  const lineExtent = useTransform(spring, [0, 1], ["0%", "100%"]);
  const yMotif = useTransform(spring, [0, 1], [60, -220]);

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative h-[400vh] bg-night"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Background */}
        <motion.div
          style={{ scale: scaleImg }}
          className="absolute inset-0 origin-center"
        >
          <Image
            src="/PAJU2051.jpg"
            alt="Deepa and Yadev"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{
              filter:
                "brightness(0.6) contrast(1.05) saturate(0.8) sepia(0.3)",
            }}
          />
        </motion.div>

        {/* Overlays */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-night"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-transparent to-night" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(6,10,20,0.7)_100%)]" />

        {/* Decorative marigold motif */}
        <motion.div
          style={{ y: yMotif }}
          className="absolute -right-8 md:right-[6%] top-[16%] w-44 md:w-72 opacity-[0.09] text-gold-light pointer-events-none"
        >
          <svg viewBox="0 0 200 200" fill="currentColor" aria-hidden>
            <g>
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="100"
                  cy="62"
                  rx="14"
                  ry="34"
                  transform={`rotate(${i * 30} 100 100)`}
                  opacity="0.85"
                />
              ))}
              <circle cx="100" cy="100" r="16" />
            </g>
          </svg>
        </motion.div>
        <motion.div
          style={{ y: yMotif }}
          className="absolute -left-10 md:left-[6%] bottom-[18%] w-36 md:w-56 opacity-[0.07] text-gold-light pointer-events-none rotate-180"
        >
          <svg viewBox="0 0 200 200" fill="currentColor" aria-hidden>
            <g>
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="100"
                  cy="62"
                  rx="14"
                  ry="34"
                  transform={`rotate(${i * 30} 100 100)`}
                  opacity="0.85"
                />
              ))}
              <circle cx="100" cy="100" r="16" />
            </g>
          </svg>
        </motion.div>

        {/* Timeline */}
        <div className="absolute left-5 md:left-10 top-[22%] bottom-[22%] w-px bg-ivory/10 hidden md:block">
          <motion.div
            style={{ height: lineExtent }}
            className="w-full bg-gradient-to-b from-gold/0 via-gold to-gold/0"
          />
        </div>

        {/* Film grain */}
        <div className="grain absolute inset-0 z-[2]" />
      </div>

      {/* Narrative */}
      <div className="relative z-10 flex flex-col items-center -mt-[100vh]">
        {/* Opening */}
        <div className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-caps text-[10px] md:text-xs tracking-[0.6em] uppercase text-gold/80 mb-6">
              Our Story
            </p>
            <h2 className="font-script text-ivory-gold text-6xl md:text-7xl lg:text-8xl leading-tight drop-shadow-[0_4px_30px_rgba(201,162,39,0.3)]">
              The journey
            </h2>
            <div className="text-gold/40 mt-8 w-64 mx-auto">
              <MandalaDivider className="w-full" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-14 flex flex-col items-center gap-4"
          >
            <div className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" />
            <p className="font-caps text-[9px] tracking-[0.5em] uppercase text-ivory/40">
              Scroll to begin
            </p>
          </motion.div>
        </div>

        {/* Chapters */}
        <div className="max-w-6xl mx-auto px-6 space-y-[45vh] pb-[55vh]">
          {CHAPTERS.map((ch, idx) => (
            <div key={ch.no} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1 }}
                className="mb-8 flex flex-col items-center gap-3"
              >
                <span className="font-caps text-xs md:text-sm tracking-[0.5em] uppercase text-gold/80">
                  Chapter {ch.no}
                </span>
                <span className="font-serif italic text-ivory/50 text-sm md:text-base">
                  {ch.title}
                </span>
                {idx < CHAPTERS.length - 1 && (
                  <span className="h-px w-16 bg-gold/20 mt-2" />
                )}
              </motion.div>
              <TextReveal>{ch.body}</TextReveal>
            </div>
          ))}
        </div>
      </div>

      {/* Transition to events */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-ivory to-transparent z-20" />
    </section>
  );
}