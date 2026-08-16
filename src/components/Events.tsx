"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  MapPin,
  CalendarHeart,
  Clock,
  X,
  ExternalLink,
  Plus,
} from "lucide-react";
import { CornerFiligree, MiniDivider } from "./Ornaments";

interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  image: string;
  mapsUrl: string;
  embedUrl: string;
  calendarStart: string;
  calendarEnd: string;
}

const EVENTS: WeddingEvent[] = [
  {
    id: "marriage",
    title: "The Marriage",
    date: "13th September 2026",
    time: "10:00 AM · Auspicious Muhurtham",
    venue: "Vaikom Mahadeva Temple",
    location: "Vaikom, Kerala",
    description:
      "Join us as we tie the knot and seek the blessings of the Almighty within the sacred precincts of Vaikom Mahadeva Temple.",
    image: "/assets/temple.jpg",
    mapsUrl: "https://maps.app.goo.gl/S26jNida4LH6QUKK7",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.7486161483327!2d76.39415731535492!3d9.7471249930248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0870f7d5c8d629%3A0x7d8a9e9e9e9e9e9e!2sVaikom%20Mahadeva%20Temple!5e0!3m2!1sen!2sin!4v1715264000000!5m2!1sen!2sin",
    calendarStart: "20260913T100000",
    calendarEnd: "20260913T120000",
  },
  {
    id: "reception",
    title: "The Reception",
    date: "14th September 2026",
    time: "6:00 PM Onwards",
    venue: "Central Auditorium",
    location: "North Paravur, Kerala",
    description:
      "An evening of celebration, dinner and joy with our loved ones — a toast to the road ahead, under the stars.",
    image: "/assets/backwater.jpg",
    mapsUrl: "https://maps.app.goo.gl/4Ur2g6HRgRBzyGyp8",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.7013890538!2d76.2299839753612!3d10.1416349889984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08170068a04297%3A0x7c7c340b6e1564c9!2sCentral%20Auditorium!5e0!3m2!1sen!2sin!4v1715264000000!5m2!1sen!2sin",
    calendarStart: "20260914T180000",
    calendarEnd: "20260914T210000",
  },
];

function calendarUrl(ev: WeddingEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${ev.title} — Deepa & Yadev`,
    dates: `${ev.calendarStart}/${ev.calendarEnd}`,
    location: `${ev.venue}, ${ev.location}`,
    details: `${ev.description} RSVP at the wedding website.`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function EventCard({
  event,
  index,
  onDirections,
}: {
  event: WeddingEvent;
  index: number;
  onDirections: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 22 });
  const smy = useSpring(my, { stiffness: 120, damping: 22 });
  const rotateX = useTransform(smy, [-0.5, 0.5], [2.5, -2.5]);
  const rotateY = useTransform(smx, [-0.5, 0.5], [-2.5, 2.5]);

  const onMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1.1,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      className="relative w-full group"
    >
      <div className="relative bg-mist rounded-[2rem] md:rounded-[2.75rem] overflow-hidden border border-gold/30 shadow-[0_40px_80px_rgba(38,32,17,0.18)] transition-shadow duration-700 group-hover:shadow-[0_50px_110px_rgba(201,162,39,0.22)]">
        {/* Image */}
        <div className="relative h-56 md:h-72 overflow-hidden">
          <Image
            src={event.image}
            alt={event.venue}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
            style={{ filter: "sepia(0.28) contrast(1.05) brightness(0.85)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mist via-mist/10 to-transparent" />
          <div className="absolute inset-0 bg-gold/10 mix-blend-multiply" />
          <span className="absolute top-5 left-5 font-caps text-[9px] tracking-[0.4em] uppercase text-ivory bg-night/45 backdrop-blur-sm border border-ivory/20 rounded-full px-4 py-1.5">
            {event.date}
          </span>
        </div>

        <CornerFiligree className="absolute top-4 right-4 w-12 h-12 text-gold/60" />

        {/* Body */}
        <div className="relative px-6 md:px-12 pb-10 md:pb-12 -mt-6 text-center">
          <h3 className="font-script text-gold-emboss text-5xl md:text-6xl leading-tight drop-shadow-[0_2px_14px_rgba(201,162,39,0.2)]">
            {event.title}
          </h3>
          <div className="text-gold/50 w-40 mx-auto mt-4 mb-8">
            <MiniDivider className="w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gold/20">
            <div className="flex flex-col items-center gap-2 md:px-6">
              <CalendarHeart className="w-5 h-5 text-crimson" />
              <p className="font-caps text-[9px] tracking-[0.4em] uppercase text-ink/50">
                Date
              </p>
              <p className="font-serif text-lg md:text-xl text-ink">
                {event.date}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 md:px-6">
              <Clock className="w-5 h-5 text-crimson" />
              <p className="font-caps text-[9px] tracking-[0.4em] uppercase text-ink/50">
                Time
              </p>
              <p className="font-serif text-lg md:text-xl text-ink">
                {event.time}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 md:px-6">
              <MapPin className="w-5 h-5 text-crimson" />
              <p className="font-caps text-[9px] tracking-[0.4em] uppercase text-ink/50">
                Venue
              </p>
              <p className="font-serif text-lg md:text-xl text-ink italic">
                {event.venue}
              </p>
            </div>
          </div>

          <p className="mt-8 font-serif italic text-ink/65 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            &ldquo;{event.description}&rdquo;
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onDirections}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep text-night font-caps text-[11px] tracking-[0.25em] uppercase font-semibold shadow-[0_12px_30px_rgba(201,162,39,0.35)] transition-all"
            >
              <MapPin className="w-4 h-4" /> View on Map
            </motion.button>
            <a
              href={calendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-gold/50 text-gold-deep font-caps text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-gold/10 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add to Calendar
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Events() {
  const [selected, setSelected] = useState<WeddingEvent | null>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <section
      id="events"
      className="relative py-28 md:py-40 bg-ivory text-ink overflow-hidden"
    >
      <div className="absolute inset-0 paper-texture opacity-[0.05]" />
      <div className="glow-gold absolute top-[-20%] right-[-10%] w-[520px] h-[520px]" />
      <div className="glow-rose absolute bottom-[-20%] left-[-10%] w-[520px] h-[520px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <p className="font-caps text-[10px] md:text-xs tracking-[0.6em] uppercase text-crimson/80 mb-5">
            Where to find us
          </p>
          <h2 className="font-script text-gold-deep text-6xl md:text-7xl lg:text-8xl leading-tight drop-shadow-[0_3px_20px_rgba(201,162,39,0.25)]">
            The auspicious events
          </h2>
          <div className="text-gold/50 mt-8 w-64 mx-auto">
            <MiniDivider className="w-full" />
          </div>
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-24">
          {EVENTS.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              index={i}
              onDirections={() => setSelected(event)}
            />
          ))}
        </div>
      </div>

      {/* Map modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-night/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-mist rounded-[2rem] border border-gold/40 shadow-[0_60px_120px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-5 right-5 z-20 text-ink/50 hover:text-crimson transition-colors bg-ivory/70 backdrop-blur p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-[320px] md:h-[400px] bg-night relative">
                <iframe
                  src={selected.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[0.25]"
                />
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_-24px_48px_rgba(245,237,223,0.9)]" />
              </div>

              <div className="p-8 md:p-10 text-center flex flex-col items-center">
                <h3 className="font-script text-gold-emboss text-4xl md:text-5xl mb-2">
                  {selected.venue}
                </h3>
                <p className="font-caps text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-3">
                  {selected.location}
                </p>
                <p className="font-serif italic text-ink/60 mb-8">
                  {selected.date} · {selected.time}
                </p>
                <motion.a
                  href={selected.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full max-w-sm inline-flex items-center justify-center gap-3 py-4 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep text-night font-caps text-[11px] tracking-[0.25em] uppercase font-semibold shadow-[0_12px_30px_rgba(201,162,39,0.4)]"
                >
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}