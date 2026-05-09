"use client";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-background rounded-full -z-10 blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src="/PAJU2051.jpg" 
              alt="Our Story" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2rem]" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col justify-center"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Our Story
          </span>
          <h2 className="font-great-vibes text-5xl md:text-6xl text-foreground mb-6 leading-tight">
            How we met...
          </h2>
          <div className="space-y-6 text-foreground/80 font-light leading-relaxed text-lg">
            <p>
              It all started with a simple hello. Two different paths crossed at exactly the right time, and what began as a beautiful friendship soon blossomed into a lifelong promise.
            </p>
            <p>
              Through countless conversations, shared laughter, and unforgettable moments, we realized that our hearts had found their home. We couldn't be more excited to begin this new chapter together.
            </p>
          </div>
          <div className="mt-10">
            <p className="font-great-vibes text-4xl text-secondary">
              Deepa & Yadev
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
