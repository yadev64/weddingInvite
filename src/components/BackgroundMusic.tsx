"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundMusic({ isRevealed }: { isRevealed: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const attemptedRef = useRef(false);

  const handlePlay = () => {
    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  useEffect(() => {
    if (isRevealed && !attemptedRef.current) {
      attemptedRef.current = true;
      handlePlay();
    }
  }, [isRevealed]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/bgm.mp3" loop preload="none" />

      <AnimatePresence>
        {isRevealed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={toggle}
            title={isPlaying ? "Pause music" : "Play music"}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[150] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-night/70 backdrop-blur-xl border border-gold/40 text-gold-light shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:bg-gold/20 hover:border-gold/70 transition-all duration-300"
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5 animate-pulse" />
            ) : (
              <VolumeX className="w-5 h-5 opacity-60" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}