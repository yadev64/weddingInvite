"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ isVisible }: { isVisible: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Story", href: "#story" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 w-full z-[100] pointer-events-none"
        >
          {/* Scroll Progress Bar */}
          <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
          
          <div className={`w-full px-6 py-4 transition-all duration-500 pointer-events-auto ${
            scrolled ? "mt-4" : "mt-0"
          }`}>
            <div className={`max-w-fit mx-auto px-8 py-3 rounded-full border transition-all duration-500 ${
              scrolled 
                ? "bg-[#001D4D]/80 backdrop-blur-md border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)]" 
                : "bg-transparent border-transparent"
            }`}>
              <div className="flex items-center gap-8 md:gap-12">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-playfair text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/70 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
