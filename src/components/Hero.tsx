"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/engagement%20video.mov" type="video/quicktime" />
        <source src="/engagement%20video.mov" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="relative z-20 flex flex-col items-center text-center px-4"
      >
        <h2 className="text-white/80 uppercase tracking-[0.3em] text-sm md:text-base mb-4 font-medium">
          We are getting married
        </h2>
        <h1 className="font-great-vibes text-7xl md:text-8xl lg:text-9xl text-white mb-6 drop-shadow-md">
          Deepa & Yadev
        </h1>
        <p className="text-white/90 text-lg md:text-2xl max-w-lg italic font-light tracking-wide">
          September 13th, 2026
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 z-20 flex flex-col items-center"
      >
        <span className="text-white/70 text-xs tracking-widest uppercase mb-2">Discover</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white w-6 h-6 opacity-80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
