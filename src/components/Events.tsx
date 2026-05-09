"use client";
import { motion } from "framer-motion";
import { MapPin, CalendarHeart } from "lucide-react";

const events = [
  {
    id: "marriage",
    title: "The Marriage",
    date: "13th September 2026",
    time: "Morning Auspicious Muhurtham",
    venue: "Vaikom Temple",
    description: "Join us as we tie the knot and seek the blessings of the Almighty.",
  },
  {
    id: "reception",
    title: "The Reception",
    date: "14th September 2026",
    time: "6:00 PM Onwards",
    venue: "North Paravur Central Auditorium",
    description: "An evening of celebration, dinner, and joy with our loved ones.",
  }
];

export default function Events() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-great-vibes text-5xl md:text-6xl text-foreground mb-4">
            Wedding Events
          </h2>
          <p className="text-foreground/70 uppercase tracking-widest text-sm font-medium">
            Celebrate with us
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-background rounded-[2rem] p-8 md:p-10 shadow-sm border border-border flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <h3 className="text-3xl font-cormorant font-semibold text-foreground mb-6">
                {event.title}
              </h3>
              
              <div className="space-y-4 mb-6 w-full">
                <div className="flex items-center justify-center gap-3 text-foreground/80">
                  <CalendarHeart className="w-5 h-5 text-primary" />
                  <span className="font-medium text-lg">{event.date}</span>
                </div>
                <div className="text-sm text-foreground/60">{event.time}</div>
                
                <div className="h-px w-16 bg-border mx-auto my-4" />
                
                <div className="flex flex-col items-center gap-2 text-foreground/80">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-medium text-lg">{event.venue}</span>
                </div>
              </div>

              <p className="text-foreground/70 text-base leading-relaxed max-w-xs mt-2">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
