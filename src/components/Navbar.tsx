"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Our Story", href: "#story" },
  { name: "Events", href: "#events" },
  { name: "Gallery", href: "#gallery" },
  { name: "Guest Moments", href: "/gallery" },
  { name: "RSVP", href: "#rsvp" },
];

export default function Navbar({ isVisible }: { isVisible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 w-full z-[90] pointer-events-none"
        >
          {/* Gold progress hairline */}
          <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-200" style={{ width: `${progress}%` }} />

          <div className="max-w-6xl mx-auto px-5 md:px-8 pt-4 md:pt-5 flex items-center justify-between">
            {/* Monogram */}
            <a
              href="#top"
              className="pointer-events-auto flex items-baseline gap-2 font-script text-2xl md:text-3xl text-gold-light drop-shadow-[0_0_18px_rgba(201,162,39,0.35)]"
            >
              D <span className="text-[11px] font-caps tracking-widest">♥</span> Y
            </a>

            {/* Links pill */}
            <nav
              className={`pointer-events-auto hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 border transition-all duration-500 ${
                scrolled
                  ? "bg-night/75 backdrop-blur-xl border-gold/20 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
                  : "bg-transparent border-transparent"
              }`}
            >
              {NAV_LINKS.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-1.5 font-caps text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-ivory/65 hover:text-gold-light transition-colors duration-300 rounded-full hover:bg-gold/10"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-1.5 font-caps text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-ivory/65 hover:text-gold-light transition-colors duration-300 rounded-full hover:bg-gold/10"
                  >
                    {link.name}
                  </a>
                ),
              )}
            </nav>

            {/* Mobile menu-less: just RSVP link */}
            <a
              href="#rsvp"
              className="pointer-events-auto md:hidden font-caps text-[10px] tracking-[0.25em] uppercase text-gold-light border border-gold/30 rounded-full px-4 py-2"
            >
              RSVP
            </a>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}