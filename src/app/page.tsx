"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import GuestMoments from "@/components/GuestMoments";
import ShareMoments from "@/components/ShareMoments";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll while the invitation is closed
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
        document.body.style.overflowX = "hidden";
      };
    }
    const t = setTimeout(() => {
      document.body.style.overflow = "";
      document.body.style.overflowX = "hidden";
    }, 600);
    return () => clearTimeout(t);
  }, [isOpen]);

  return (
    <main className="w-full">
      <Navbar isVisible={isOpen} />
      <BackgroundMusic isRevealed={isOpen} />
      <Intro isOpen={isOpen} onOpen={() => setIsOpen(true)} />
      <Hero />
      <Countdown />
      <Story />
      <Events />
      <Gallery />
      <ShareMoments />
      <GuestMoments />
      <RSVP />
      <Footer />
    </main>
  );
}