"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundMusic({ isRevealed }: { isRevealed: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isRevealed && !hasInteracted) {
      handlePlay();
      setHasInteracted(true);
    }
  }, [isRevealed, hasInteracted]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay blocked, waiting for user interaction:", err);
      });
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/bgm.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence>
        {isRevealed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={togglePlay}
            className="fixed bottom-8 right-8 z-[150] p-4 rounded-full bg-[#001D4D]/80 backdrop-blur-md border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)] text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all group"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <Volume2 className="w-6 h-6 animate-pulse" />
            ) : (
              <VolumeX className="w-6 h-6 opacity-50" />
            )}

            {/* Visualizer bars when playing */}

          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
