import type { Metadata } from "next";
import Link from "next/link";
import GuestMoments from "@/components/GuestMoments";
import { CornerFiligree } from "@/components/Ornaments";

export const metadata: Metadata = {
  title: "Guest Moments — Deepa & Yadev",
  description:
    "Moments captured by our guests at the wedding of Deepa & Yadev.",
  openGraph: {
    title: "Guest Moments — Deepa & Yadev",
    description: "The moments our guests captured for us.",
    type: "website",
    images: ["/share-card.jpg"],
  },
};

export default function MomentsPage() {
  return (
    <main className="min-h-screen bg-night text-ivory">
      <header className="relative overflow-hidden bg-night">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="glow-gold absolute top-[-30%] left-[-10%] w-[600px] h-[600px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24 pb-10 text-center">
          <Link
            href="/"
            className="font-script text-gold-light text-3xl hover:text-ivory transition-colors"
          >
            Deepa <span className="text-[11px] font-caps tracking-widest">&amp;</span> Yadev
          </Link>
        </div>
      </header>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="absolute inset-3 border border-gold/20 rounded-[1.6rem] pointer-events-none" />
        <CornerFiligree className="absolute -top-3 -left-3 w-14 h-14 text-gold/70" />
        <CornerFiligree className="absolute -top-3 -right-3 w-14 h-14 text-gold/70 rotate-90" />
        <CornerFiligree className="absolute -bottom-3 -right-3 w-14 h-14 text-gold/70 rotate-180" />
        <CornerFiligree className="absolute -bottom-3 -left-3 w-14 h-14 text-gold/70 -rotate-90" />
      </div>

      <GuestMoments always />

      <footer className="relative z-10 pb-16 pt-8 text-center">
        <Link
          href="/"
          className="font-caps text-[10px] tracking-[0.5em] uppercase text-gold/60 hover:text-gold-light transition-colors"
        >
          ← Back to the invitation
        </Link>
      </footer>
    </main>
  );
}