"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { MiniDivider } from "./Ornaments";

interface Moment {
  id: string;
  url: string;
  thumb: string;
  name: string;
}

export default function GuestMoments({ always = false }: { always?: boolean }) {
  const [items, setItems] = useState<Moment[] | null>(null);

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

  if (items === null) return null;

  if (items.length === 0) {
    if (!always) return null;
    return (
      <div className="flex flex-col items-center text-center py-20 px-6">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
          <Camera className="w-7 h-7 text-gold-light" />
        </div>
        <h2 className="font-script text-ivory-gold text-5xl md:text-6xl">
          Guest moments
        </h2>
        <p className="mt-4 font-serif italic text-ivory/50 text-lg max-w-md">
          No moments shared yet. The photos our guests send will appear here
          once we&apos;ve picked our favourites.
        </p>
      </div>
    );
  }

  return (
    <section id="moments" className="relative py-24 md:py-32 bg-night overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="font-caps text-[10px] md:text-xs tracking-[0.6em] uppercase text-gold/80 mb-5">
            Guest Moments
          </p>
          <h2 className="font-script text-ivory-gold text-6xl md:text-7xl lg:text-8xl leading-tight drop-shadow-[0_4px_30px_rgba(201,162,39,0.3)]">
            Through your eyes
          </h2>
          <div className="text-gold/40 mt-7 w-60 mx-auto">
            <MiniDivider className="w-full" />
          </div>
          <p className="mt-5 font-serif italic text-ivory/45 text-base md:text-lg">
            Moments our guests captured — thank you for sharing them with us.
          </p>
        </motion.div>

        <div className="columns-2 md:columns-3 gap-4 md:gap-6">
          {items.map((m, i) => (
            <motion.figure
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-4 md:mb-6 break-inside-avoid rounded-2xl overflow-hidden border border-gold/20 group"
            >
              <Image
                src={m.url}
                alt={m.name ? `Moment shared by ${m.name}` : "A shared guest moment"}
                width={900}
                height={1200}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-auto object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                style={{ filter: "sepia(0.15) contrast(1.04) brightness(0.95)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {m.name && (
                <figcaption className="absolute bottom-3 left-4 font-script text-ivory-gold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {m.name}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}