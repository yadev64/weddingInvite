"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useAnimationControls, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MoveHorizontal, X } from "lucide-react";
import { MiniDivider } from "./Ornaments";

const GAP = 24;

const SLIDES = [
  { src: "/IMG_8068.JPG", title: "Where it all began", sub: "Two lives, one coincidence" },
  { src: "/assets/temple-close.jpg", title: "The temple", sub: "Sacred walls, steady hearts" },
  { src: "/assets/pexels-couple.jpg", title: "One promise", sub: "Our first yes" },
  { src: "/IMG_8070.JPG", title: "Golden hours", sub: "Every sunset, together" },
  { src: "/assets/marigold.jpg", title: "Marigolds", sub: "For the mandap & the moment" },
  { src: "/assets/pexels-mehndi.jpg", title: "The mehndi", sub: "Hands painted in stories" },
  { src: "/PAJU1794.jpg", title: "Frozen in time", sub: "A heartbeat, captured" },
  { src: "/assets/pexels-diya.jpg", title: "Lighting the way", sub: "One lamp for every blessing" },
  { src: "/IMG_8071.JPG", title: "Celebrations", sub: "Laughter that echoes" },
  { src: "/assets/pexels-sindoor.jpg", title: "The sacred thread", sub: "Tied, not just by ritual" },
  { src: "/PAJU2051.jpg", title: "Us", sub: "Deepa & Yadev" },
] as const;

interface SlideData {
  src: string;
  title: string;
  sub: string;
}

function Slide({
  data,
  index,
  x,
  step,
  measureRef,
  onTap,
}: {
  data: SlideData;
  index: number;
  x: ReturnType<typeof useMotionValue<number>>;
  step: number;
  measureRef?: React.Ref<HTMLDivElement>;
  onTap: () => void;
}) {
  const center = -index * step;
  const dim = useTransform(x, [center - step, center, center + step], [0.3, 1, 0.3]);
  const scale = useTransform(x, [center - step, center, center + step], [0.95, 1, 0.95]);

  return (
    <div
      ref={measureRef}
      className="relative shrink-0 w-[86vw] md:w-[620px] cursor-pointer"
      onClick={onTap}
    >
      {/* Image layer */}
      <motion.div
        style={{ opacity: dim, scale }}
        className="relative aspect-[3/4] md:aspect-[4/5] rounded-[1.75rem] md:rounded-[2rem] overflow-hidden border border-gold/20 shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
      >
        <Image
          src={data.src}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 86vw, 620px"
          className="object-cover"
          style={{ filter: "sepia(0.18) contrast(1.05) brightness(0.9)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
        <div className="absolute inset-0 bg-gold/10 mix-blend-soft-light" />
        <div className="grain-static absolute inset-0" />

        {/* Index badge */}
        <span className="absolute top-4 left-4 md:top-5 md:left-5 font-caps text-[10px] tracking-[0.4em] text-ivory/70 border border-ivory/20 bg-night/40 backdrop-blur-sm rounded-full px-3.5 py-1.5">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Crisp caption layer — kept out of the blur to protect gradient text */}
      <motion.div
        style={{ opacity: dim }}
        className="absolute inset-x-0 bottom-0 p-5 md:p-7 pointer-events-none"
      >
        <div className="hairline mb-4 opacity-70" />
        <h3 className="font-script text-ivory-gold text-3xl md:text-5xl leading-tight drop-shadow-[0_3px_18px_rgba(0,0,0,0.8)]">
          {data.title}
        </h3>
        <p className="mt-1 font-serif italic text-ivory/65 text-sm md:text-base">
          {data.sub}
        </p>
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const controls = useAnimationControls();
  const count = SLIDES.length;
  const totalX = step > 0 ? -(count - 1) * step : 0;

  useEffect(() => {
    const measure = () => {
      const w = firstSlideRef.current?.getBoundingClientRect().width ?? 0;
      setStep(w > 0 ? w + GAP : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Re-anchor x when the slide width changes (resize/orientation)
  useEffect(() => {
    if (step > 0) controls.start({ x: -active * step, transition: { duration: 0 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const snapTo = (i: number) => {
    const idx = Math.max(0, Math.min(count - 1, i));
    setActive(idx);
    controls.start({
      x: -idx * step,
      transition: { type: "spring", stiffness: 300, damping: 34 },
    });
  };

  const onDragEnd = () => {
    snapTo(Math.round(-x.get() / step));
  };

  return (
    <section id="gallery" className="relative bg-night overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 md:pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-caps text-[10px] md:text-xs tracking-[0.6em] uppercase text-gold/80 mb-5">
            Gallery
          </p>
          <h2 className="font-script text-ivory-gold text-6xl md:text-7xl lg:text-8xl leading-tight drop-shadow-[0_4px_30px_rgba(201,162,39,0.3)]">
            Captured moments
          </h2>
          <div className="text-gold/40 mt-7 w-60 mx-auto">
            <MiniDivider className="w-full" />
          </div>
          <p className="mt-5 font-serif italic text-ivory/45 text-base md:text-lg">
            Slide through the moments that led us here
          </p>
        </motion.div>
      </div>

      {/* Progress + counter */}
      <div className="relative z-10 mt-12 md:mt-16 max-w-5xl mx-auto px-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to moment ${i + 1}`}
              onClick={() => snapTo(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active
                  ? "w-8 bg-gold-light"
                  : i < active
                    ? "w-3 bg-gold/50"
                    : "w-3 bg-gold/20 hover:bg-gold/40"
              }`}
            />
          ))}
        </div>
        <span className="font-caps text-[10px] tracking-[0.4em] text-ivory/40">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>

      {/* Carousel */}
      <div className="relative z-10 mt-8 md:mt-12">
        <div className="overflow-hidden py-6">
          <motion.div
            drag="x"
            dragConstraints={{ left: totalX, right: 0 }}
            dragElastic={0.06}
            onDragEnd={onDragEnd}
            animate={controls}
            style={{ x }}
            className="flex gap-6 px-[7vw] md:px-[max(7vw,calc(50vw-700px))] cursor-grab active:cursor-grabbing"
          >
            {SLIDES.map((slide, i) => (
              <Slide
                key={slide.src}
                data={slide}
                index={i}
                x={x}
                step={step}
                measureRef={i === 0 ? firstSlideRef : undefined}
                onTap={() => setViewer(i)}
              />
            ))}
          </motion.div>
        </div>

        {/* Arrows (desktop) */}
        <div className="hidden md:flex items-center justify-center gap-4 mt-4">
          <button
            aria-label="Previous moment"
            onClick={() => snapTo(active - 1)}
            disabled={active === 0}
            className="w-12 h-12 rounded-full border border-gold/30 text-gold-light flex items-center justify-center hover:bg-gold/15 disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-serif italic text-ivory/40 text-sm">Swipe or use arrows</span>
          <button
            aria-label="Next moment"
            onClick={() => snapTo(active + 1)}
            disabled={active === count - 1}
            className="w-12 h-12 rounded-full border border-gold/30 text-gold-light flex items-center justify-center hover:bg-gold/15 disabled:opacity-30 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Swipe hint (mobile) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="md:hidden flex items-center justify-center gap-2.5 mt-3 text-ivory/40"
        >
          <MoveHorizontal className="w-4 h-4 text-gold/60" />
          <span className="font-caps text-[9px] tracking-[0.4em] uppercase">
            Drag to explore
          </span>
        </motion.div>
      </div>

      {/* Footer caption */}
      <div className="relative z-10 pb-24 md:pb-32 pt-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="font-serif italic text-ivory/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          &ldquo;A collection of memories, frozen in time — leading us to the
          day we begin ours together.&rdquo;
        </motion.p>
        <div className="text-gold/30 mt-8 w-48 mx-auto">
          <MiniDivider className="w-full" />
        </div>
      </div>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {viewer !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewer(null)}
            className="fixed inset-0 z-[200] bg-night/95 backdrop-blur-md flex items-center justify-center p-5"
          >
            <button
              aria-label="Close viewer"
              onClick={() => setViewer(null)}
              className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full border border-gold/40 text-gold-light flex items-center justify-center hover:bg-gold/15 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              key={viewer}
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl"
            >
              <div className="relative aspect-[3/4] md:aspect-[4/3] rounded-2xl overflow-hidden border border-gold/30 shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
                <Image
                  src={SLIDES[viewer].src}
                  alt={SLIDES[viewer].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-contain"
                />
              </div>
              <div className="mt-5 text-center">
                <h3 className="font-script text-ivory-gold text-4xl md:text-5xl">
                  {SLIDES[viewer].title}
                </h3>
                <p className="mt-1 font-serif italic text-ivory/55">
                  {SLIDES[viewer].sub}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}