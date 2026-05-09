"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Send, Sparkles } from "lucide-react";

export default function RSVP() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  const yForm = useTransform(scrollYProgress, [0, 1], [200, 0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate network request
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <section className="py-40 px-6 bg-background relative overflow-hidden z-10" ref={ref}>
      {/* Massive Glowing Orb Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-2xl mx-auto relative perspective-[1000px]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="text-primary/70 font-playfair uppercase tracking-[0.4em] text-sm mb-4 inline-block">
            RSVP
          </span>
          <h2 className="font-great-vibes text-7xl md:text-8xl mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] text-gold-gradient">
            Be Our Guest
          </h2>
        </motion.div>

        <motion.div
          style={{ y: yForm }}
          className="relative rounded-[2rem] p-[1px] overflow-hidden"
        >
          {/* Glassmorphism Border Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/5 to-primary/30" />
          
          <div className="relative bg-[#0f1938]/80 backdrop-blur-2xl rounded-[2rem] p-10 md:p-16 h-full w-full">
            
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-center py-20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-8"
                >
                  <Sparkles className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]" />
                </motion.div>
                <h3 className="font-great-vibes text-6xl text-primary mb-6 drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">Thank You!</h3>
                <p className="text-foreground/80 font-cormorant text-2xl">We can't wait to celebrate with you under the stars.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="peer w-full px-0 py-4 bg-transparent border-b-2 border-primary/20 text-white font-cormorant text-2xl focus:outline-none focus:border-primary transition-colors placeholder-transparent"
                    placeholder="Full Name"
                  />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm font-playfair uppercase tracking-widest text-primary/80 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary">
                    Full Name
                  </label>
                </div>
                
                <div className="relative group pt-4">
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="peer w-full px-0 py-4 bg-transparent border-b-2 border-primary/20 text-white font-cormorant text-2xl focus:outline-none focus:border-primary transition-colors placeholder-transparent"
                    placeholder="Email Address"
                  />
                  <label htmlFor="email" className="absolute left-0 top-0.5 text-sm font-playfair uppercase tracking-widest text-primary/80 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-8 peer-focus:top-0.5 peer-focus:text-sm peer-focus:text-primary">
                    Email Address
                  </label>
                </div>

                <div className="relative pt-6">
                  <label htmlFor="attendance" className="text-sm font-playfair uppercase tracking-widest text-primary/80 block mb-4">
                    Will you attend?
                  </label>
                  <select 
                    id="attendance"
                    className="w-full px-4 py-4 rounded-xl bg-primary/5 border border-primary/20 focus:outline-none focus:border-primary transition-colors text-white font-cormorant text-2xl appearance-none cursor-pointer hover:bg-primary/10"
                  >
                    <option value="yes" className="bg-[#0f1938]">Joyfully Accepts</option>
                    <option value="no" className="bg-[#0f1938]">Regretfully Declines</option>
                  </select>
                </div>

                <div className="relative pt-6">
                  <textarea 
                    id="message"
                    rows={1}
                    className="peer w-full px-0 py-4 bg-transparent border-b-2 border-primary/20 text-white font-cormorant text-2xl focus:outline-none focus:border-primary transition-colors placeholder-transparent resize-none"
                    placeholder="Message"
                  />
                  <label htmlFor="message" className="absolute left-0 top-2.5 text-sm font-playfair uppercase tracking-widest text-primary/80 transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-10 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-primary">
                    Message for the Couple (Optional)
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full mt-12 py-5 rounded-xl bg-gradient-to-r from-primary/80 to-primary text-[#0B132B] font-playfair uppercase tracking-[0.3em] font-semibold text-sm flex items-center justify-center gap-4 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all duration-500 disabled:opacity-50 overflow-hidden relative group"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  {status === "loading" ? "Sending via owl..." : "Send RSVP"}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
