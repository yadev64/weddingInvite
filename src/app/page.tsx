"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import EnvelopeIntro from "@/components/EnvelopeIntro";

export default function Home() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Prevent scrolling on body when envelope is closed
  useEffect(() => {
    if (!isEnvelopeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      // Small delay to allow the exit animation to play smoothly before enabling scroll
      setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.overflowX = "hidden";
      }, 500);
    }
  }, [isEnvelopeOpen]);

  return (
    <main className="w-full">
      <EnvelopeIntro isOpen={isEnvelopeOpen} onOpen={() => setIsEnvelopeOpen(true)} />
      <Hero isRevealed={isEnvelopeOpen} />
      <Story />
      <Events />
      <Gallery />
      <RSVP />
    </main>
  );
}
