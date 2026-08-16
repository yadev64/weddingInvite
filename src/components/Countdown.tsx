"use client";

import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { MandalaDivider, CornerFiligree } from "./Ornaments";

const TARGET = new Date("2026-09-13T10:00:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeUnit = memo(({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center min-w-[64px] md:min-w-[128px]">
    <div className="relative overflow-visible">
      <motion.span
        key={value}
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-caps font-semibold text-4xl md:text-6xl lg:text-7xl text-gold-deep tabular-nums drop-shadow-[0_2px_10px_rgba(201,162,39,0.25)]"
      >
        {value.toString().padStart(2, "0")}
      </motion.span>
    </div>
    <div className="mt-3 font-caps text-[9px] md:text-[11px] uppercase tracking-[0.45em] text-crimson/70">
      {label}
    </div>
  </div>
));

TimeUnit.displayName = "TimeUnit";

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const distance = TARGET - Date.now();
      if (distance <= 0) return;
      setTime({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-ivory text-ink">
      {/* Paper texture + ambient */}
      <div className="absolute inset-0 paper-texture opacity-[0.06]" />
      <div className="glow-gold absolute top-[-30%] left-[-10%] w-[500px] h-[500px]" />
      <div className="glow-rose absolute bottom-[-30%] right-[-10%] w-[500px] h-[500px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/[0.07] w-[640px] max-w-[110vw]">
        <MandalaDivider className="w-full h-auto" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-caps text-[10px] md:text-xs tracking-[0.6em] uppercase text-crimson/80 mb-5">
            Save the Date
          </p>
          <h2 className="font-script text-gold-deep text-6xl md:text-7xl lg:text-8xl leading-tight drop-shadow-[0_3px_20px_rgba(201,162,39,0.25)]">
            Counting down to forever
          </h2>
          <div className="text-gold/60 mt-8 w-64 mx-auto">
            <MandalaDivider className="w-full" />
          </div>
        </motion.div>

        {/* Ornate countdown panel */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 md:mt-20 max-w-3xl"
        >
          {/* Frame */}
          <div className="absolute inset-0 border border-gold/40 rounded-[2rem] md:rounded-[2.5rem]" />
          <div className="absolute inset-3 border border-gold/20 rounded-[1.6rem] md:rounded-[2.1rem]" />
          <div className="absolute inset-6 border border-gold/10 rounded-[1.3rem] md:rounded-[1.7rem]" />
          <CornerFiligree className="absolute -top-3 -left-3 w-14 h-14 md:w-16 md:h-16 text-gold/70" />
          <CornerFiligree className="absolute -top-3 -right-3 w-14 h-14 md:w-16 md:h-16 text-gold/70 rotate-90" />
          <CornerFiligree className="absolute -bottom-3 -right-3 w-14 h-14 md:w-16 md:h-16 text-gold/70 rotate-180" />
          <CornerFiligree className="absolute -bottom-3 -left-3 w-14 h-14 md:w-16 md:h-16 text-gold/70 -rotate-90" />

          <div className="relative bg-mist/95 rounded-[2rem] md:rounded-[2.5rem] px-6 py-10 md:py-14 shadow-[inset_0_0_60px_rgba(201,162,39,0.06)]">
            <div className="flex items-center justify-center gap-2 md:gap-5">
              <TimeUnit value={time.days} label="Days" />
              <span className="font-caps text-gold/50 text-2xl md:text-4xl pb-8 hidden sm:block">
                ·
              </span>
              <TimeUnit value={time.hours} label="Hours" />
              <span className="font-caps text-gold/50 text-2xl md:text-4xl pb-8 hidden sm:block">
                ·
              </span>
              <TimeUnit value={time.minutes} label="Minutes" />
              <span className="font-caps text-gold/50 text-2xl md:text-4xl pb-8 hidden sm:block">
                ·
              </span>
              <TimeUnit value={time.seconds} label="Seconds" />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="mt-12 font-serif italic text-ink/60 text-base md:text-lg"
        >
          Join us at the sacred grounds of{" "}
          <span className="text-crimson">Vaikom Mahadeva Temple</span> on the
          morning of the 13th.
        </motion.p>
      </div>
    </section>
  );
}