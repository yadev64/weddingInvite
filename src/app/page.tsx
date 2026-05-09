import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Story />
      <Events />
      <Gallery />
      <RSVP />
    </main>
  );
}
