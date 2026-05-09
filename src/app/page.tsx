"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import Navbar from "@/components/Navbar";
import Countdown from "@/components/Countdown";
import BackgroundMusic from "@/components/BackgroundMusic";

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
      <Navbar isVisible={isEnvelopeOpen} />
      <BackgroundMusic isRevealed={isEnvelopeOpen} />
      <EnvelopeIntro isOpen={isEnvelopeOpen} onOpen={() => setIsEnvelopeOpen(true)} />
      <Hero isRevealed={isEnvelopeOpen} />
      
      <Countdown />

      <div id="story">
        <Story />
      </div>
      <div id="events">
        <Events />
      </div>
      <div id="gallery">
        <Gallery />
      </div>
      <Footer />
    </main>
  );
}
