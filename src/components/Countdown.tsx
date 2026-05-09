"use client";
import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeUnit = memo(({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center min-w-[55px] md:min-w-[120px]">
    <motion.div 
      key={value}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-4xl md:text-6xl font-playfair text-transparent bg-clip-text bg-gradient-to-b from-[#F9E29C] to-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] mb-1"
    >
      {value.toString().padStart(2, "0")}
    </motion.div>
    <div className="text-[10px] md:text-xs font-playfair uppercase tracking-[0.3em] text-white/40">
      {label}
    </div>
  </div>
));

TimeUnit.displayName = "TimeUnit";

export default function Countdown() {
  const targetDate = new Date("2026-09-13T10:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      const newDays = Math.floor(distance / (1000 * 60 * 60 * 24));
      const newHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const newSeconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(prev => {
        if (prev.days === newDays && prev.hours === newHours && prev.minutes === newMinutes && prev.seconds === newSeconds) {
          return prev;
        }
        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-[#D4AF37]/30" />
            <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]/20" />
            <div className="h-px w-8 bg-[#D4AF37]/30" />
          </div>
          
          <h2 className="font-great-vibes text-5xl md:text-6xl text-elegant-gradient py-4 mb-4 leading-tight">
            The Countdown Begins
          </h2>
          
          <p className="font-playfair text-[#D4AF37]/80 uppercase tracking-[0.4em] text-[10px] md:text-xs font-medium">
            Until our lifelong journey starts
          </p>
        </motion.div>

        {/* Countdown Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative inline-block w-full max-w-full"
        >
          {/* Ornate Frame */}
          <div className="absolute -inset-4 md:-inset-8 border border-[#D4AF37]/10 rounded-[2rem] md:rounded-[3rem] pointer-events-none" />
          <div className="absolute -inset-2 md:-inset-4 border border-[#D4AF37]/20 rounded-[1.5rem] md:rounded-[2.5rem] pointer-events-none shadow-[0_0_50px_rgba(212,175,55,0.05)]" />
          
          <div className="relative bg-[#001D4D]/40 backdrop-blur-md px-4 md:px-16 py-8 md:py-14 rounded-[1.5rem] md:rounded-[2rem] border border-[#D4AF37]/30 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-center gap-1 md:gap-4">
              <TimeUnit value={timeLeft.days} label="Days" />
              <div className="h-10 md:h-12 w-px bg-[#D4AF37]/20 self-start mt-2" />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <div className="h-10 md:h-12 w-px bg-[#D4AF37]/20 self-start mt-2" />
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <div className="h-10 md:h-12 w-px bg-[#D4AF37]/20 self-start mt-2" />
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>
            
            {/* Sparkle Icons */}
            <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-[#D4AF37]/40 animate-pulse" />
            <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-[#D4AF37]/30 animate-pulse delay-700" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.8 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-6">
             <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
             <span className="font-playfair italic text-white/40 text-sm tracking-widest">SAVE THE DATE</span>
             <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
