"use client";
import { motion } from "framer-motion";

const images = [
  "/IMG_8068.JPG",
  "/IMG_8070.JPG",
  "/PAJU1794.jpg",
  "/IMG_8071.JPG",
  "/PAJU2051.jpg",
];

const GalleryItem = ({ src, index }: { src: string; index: number }) => (
  <div
    className="relative w-[300px] md:w-[450px] aspect-[4/5] shrink-0 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-primary/20 group cursor-pointer"
  >
    <img
      src={src}
      alt={`Moment ${index}`}
      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter sepia-[0.1] contrast-[1.1]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[1px]" />
  </div>
);

export default function Gallery() {
  return (
    <section className="py-32 bg-background relative overflow-hidden z-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8">
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
          <h2 className="font-great-vibes text-6xl md:text-8xl mb-4 py-4 drop-shadow-[0_0_20px_rgba(197,160,89,0.3)] text-elegant-gradient">
            Captured Moments
          </h2>
        </motion.div>
      </div>

      <div className="relative flex flex-col gap-8 overflow-hidden py-10">
        {/* Row 1: Left to Right */}
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 70,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap gap-8"
          style={{ width: "fit-content" }}
        >
          {[...images, ...images, ...images, ...images].map((src, i) => (
            <GalleryItem key={`r1-${i}`} src={src} index={i} />
          ))}
        </motion.div>

        {/* Row 2: Right to Left */}
        <motion.div
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 80,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap gap-8"
          style={{ width: "fit-content" }}
        >
          {[...images, ...images, ...images, ...images].reverse().map((src, i) => (
            <GalleryItem key={`r2-${i}`} src={src} index={i} />
          ))}
        </motion.div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 text-center">
        <p className="font-playfair italic text-primary/60 text-lg md:text-xl tracking-wide">
          "A collection of memories, frozen in time, leading us to our big day."
        </p>
      </div>
    </section>
  );
}
