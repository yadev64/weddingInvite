"use client";
import { motion } from "framer-motion";
import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid";

const images = [
  "/IMG_8068.JPG",
  "/IMG_8070.JPG",
  "/PAJU1794.jpg",
  "/IMG_8071.JPG",
  "/PAJU2051.jpg"
];

export default function Gallery() {
  return (
    <section className="py-24 px-4 md:px-8 bg-background relative overflow-hidden z-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 relative z-20"
        >
          <span className="text-primary font-playfair tracking-[0.3em] uppercase text-xs mb-6 inline-block">
            Gallery
          </span>
          <h2 className="font-great-vibes text-6xl md:text-7xl text-white mb-4 drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">
            Captured Moments
          </h2>
        </motion.div>

        <div className="relative -mt-10">
          <ScrollTiltedGrid 
            images={images} 
            loop={false}
            aspectRatio="3/4"
            maxWidth="lg"
            gap={8}
            rounded="1.5rem"
          />
        </div>
      </div>
    </section>
  );
}
