"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const images = [
  "/IMG_8068.JPG",
  "/IMG_8070.JPG",
  "/PAJU1794.jpg",
  "/IMG_8071.JPG",
  "/PAJU2051.jpg"
];

function ParallaxImage({ src, index }: { src: string, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Different columns move at different speeds
  const y = useTransform(scrollYProgress, [0, 1], [100, -100 + (index % 3) * -50]);

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      className={`relative w-full rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.1)] border border-primary/20 group cursor-pointer ${
        index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-[4/5]" : "aspect-[1/1]"
      }`}
    >
      <img 
        src={src} 
        alt="Gallery moment" 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.2]"
      />
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section className="py-32 px-4 md:px-8 bg-background relative overflow-hidden z-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24 relative z-20"
        >
          <span className="text-primary font-playfair tracking-[0.3em] uppercase text-xs mb-6 inline-block">
            Gallery
          </span>
          <h2 className="font-great-vibes text-6xl md:text-8xl text-primary mb-4 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">
            Captured Moments
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {images.map((src, i) => (
            <ParallaxImage key={i} src={src} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
