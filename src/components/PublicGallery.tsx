"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { CornerFiligree, MiniDivider } from "./Ornaments";

interface Moment {
  id: string;
  url: string;
  full: string;
  thumb: string;
  width: number;
  height: number;
  name: string;
}

const GRID_WIDTH = 700;

export default function PublicGallery() {
  const [items, setItems] = useState<Moment[] | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/moments")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setItems(Array.isArray(d.items) ? d.items : []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const open = (i: number) => {
    setActive(i);
  };

  const step = useCallback(
    (dir: number) => {
      setActive((cur) =>
        cur === null || items === null ? cur : (cur + dir + items.length) % items.length,
      );
    },
    [items],
  );

  useEffect(() => {
    if (active !== null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, step]);

  if (items === null) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-14 h-14 rounded-full border-2 border-gold/30 border-t-gold-light animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center text-center py-24 md:py-32 px-6">
        <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-8">
          <Camera className="w-9 h-9 text-gold-light" />
        </div>
        <h1 className="font-script text-ivory-gold text-6xl md:text-7xl">
          The public gallery
        </h1>
        <p className="mt-6 font-serif italic text-ivory/50 text-lg md:text-xl max-w-md leading-relaxed">
          No photos here just yet. Moments shared by our guests will appear
          here once we&apos;ve picked our favourites.
        </p>
        <Link
          href="/#share-moments"
          className="font-caps text-[10px] tracking-[0.4em] uppercase text-gold-light underline underline-offset-4 hover:text-ivory transition-colors"
        >
          Share a moment with us →
        </Link>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 md:mb-16"
      >
        <p className="font-caps text-[10px] md:text-xs tracking-[0.6em] uppercase text-gold/80 mb-5">
          Guest Moments
        </p>
        <h1 className="font-script text-ivory-gold text-6xl md:text-7xl lg:text-8xl leading-tight drop-shadow-[0_4px_30px_rgba(201,162,39,0.3)]">
          The public gallery
        </h1>
        <div className="text-gold/40 mt-7 w-60 mx-auto">
          <MiniDivider className="w-full" />
        </div>
        <p className="mt-5 font-serif italic text-ivory/45 text-base md:text-lg">
          Moments our guests captured — thank you for sharing them with us.
        </p>
      </motion.div>

      <div className="columns-2 md:columns-3 gap-4 md:gap-6">
        {items.map((m, i) => {
          const ratio = m.height / Math.max(1, m.width);
          return (
            <motion.button
              key={m.id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => open(i)}
              className="relative mb-4 md:mb-6 break-inside-avoid w-full block rounded-2xl overflow-hidden border border-gold/20 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light text-left"
            >
              <Image
                src={m.url}
                alt={m.name ? `Moment shared by ${m.name}` : "A shared guest moment"}
                width={GRID_WIDTH}
                height={Math.round(GRID_WIDTH * ratio)}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                style={{ filter: "sepia(0.15) contrast(1.04) brightness(0.95)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {m.name && (
                <span className="absolute bottom-3 left-4 font-script text-ivory-gold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {m.name}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/#share-moments"
          className="font-caps text-[10px] tracking-[0.4em] uppercase text-gold-light underline underline-offset-4 hover:text-ivory transition-colors"
        >
          Share your own moment →
        </Link>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && items[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[200] bg-night/95 flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-3 md:inset-5 border border-gold/25 rounded-[1.6rem] pointer-events-none" />
            <CornerFiligree className="absolute top-4 left-4 w-12 h-12 text-gold/60" />
            <CornerFiligree className="absolute top-4 right-4 w-12 h-12 text-gold/60 rotate-90" />
            <CornerFiligree className="absolute bottom-4 right-4 w-12 h-12 text-gold/60 rotate-180" />
            <CornerFiligree className="absolute bottom-4 left-4 w-12 h-12 text-gold/60 -rotate-90" />

            <button
              aria-label="Close gallery"
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full border border-gold/40 text-gold-light flex items-center justify-center hover:bg-gold/15 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-4 md:left-8 z-10 w-11 h-11 rounded-full border border-gold/40 text-gold-light flex items-center justify-center hover:bg-gold/15 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-4 md:right-8 z-10 w-11 h-11 rounded-full border border-gold/40 text-gold-light flex items-center justify-center hover:bg-gold/15 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.div
              key={items[active].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-full flex flex-col items-center"
            >
              <div className="relative w-full max-h-[80vh] flex items-center justify-center">
                <Image
                  src={items[active].full}
                  alt={items[active].name ? `Moment shared by ${items[active].name}` : "A shared guest moment"}
                  width={1600}
                  height={Math.round(1600 * (items[active].height / Math.max(1, items[active].width)))}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="max-h-[80vh] w-auto h-auto object-contain rounded-xl"
                />
              </div>
              {items[active].name && (
                <p className="mt-5 font-script text-ivory-gold text-3xl md:text-4xl text-center">
                  {items[active].name}
                </p>
              )}
              <p className="mt-2 font-caps text-[10px] tracking-[0.4em] text-ivory/40">
                {(active + 1).toString().padStart(2, "0")} /{" "}
                {items.length.toString().padStart(2, "0")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}