import type { Metadata } from "next";
import Link from "next/link";
import PublicGallery from "@/components/PublicGallery";

export const metadata: Metadata = {
  title: "Public Gallery — Deepa & Yadev",
  description:
    "The public gallery of guest moments from the wedding of Deepa & Yadev.",
  openGraph: {
    title: "Public Gallery — Deepa & Yadev",
    description: "The moments our guests captured for us.",
    type: "website",
    images: ["/share-card.jpg"],
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-night text-ivory overflow-hidden">
      <header className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="glow-gold absolute top-[-30%] left-[-10%] w-[600px] h-[600px]" />
        <div className="glow-rose absolute bottom-[-30%] right-[-10%] w-[500px] h-[500px]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-4 text-center">
          <Link
            href="/"
            className="font-script text-gold-light text-3xl hover:text-ivory transition-colors"
          >
            Deepa <span className="text-[11px] font-caps tracking-widest">&amp;</span> Yadev
          </Link>
        </div>
      </header>

      <div className="relative max-w-6xl mx-auto px-6 py-6 md:py-10">
        <PublicGallery />
      </div>

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