"use client";

import { MiniDivider, Lotus } from "./Ornaments";

export default function Footer() {
  return (
    <footer className="relative bg-night pt-20 pb-12 text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute bottom-[-40%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gold/[0.04] blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
        <Lotus className="w-12 h-12 text-gold/50 mb-6" />
        <p className="font-script text-ivory-gold text-5xl md:text-6xl mb-3">
          With love,
        </p>
        <p className="font-script text-ivory-gold text-5xl md:text-6xl leading-tight">
          Deepa <span className="text-gold-light">&amp;</span> Yadev
        </p>
        <div className="text-gold/30 mt-8 w-52">
          <MiniDivider className="w-full" />
        </div>
        <p className="mt-8 font-caps text-[10px] tracking-[0.45em] uppercase text-ivory/40">
          13 &amp; 14 September 2026 · Vaikom, Kerala
        </p>
        <p className="mt-4 font-serif italic text-ivory/30 text-sm">
          Crafted with love for our family &amp; friends.
        </p>
      </div>
    </footer>
  );
}