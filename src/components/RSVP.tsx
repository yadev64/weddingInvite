"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";

export default function RSVP() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate network request
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white/50 -z-10" />
      
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-great-vibes text-5xl md:text-6xl text-foreground mb-4">
            Be Our Guest
          </h2>
          <p className="text-foreground/70 uppercase tracking-widest text-sm font-medium">
            RSVP by August 1st, 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-lg border border-border relative"
        >
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <h3 className="font-great-vibes text-4xl text-primary mb-4">Thank You!</h3>
              <p className="text-foreground/80 text-lg">We can't wait to celebrate with you.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground/80 ml-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  required
                  className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground/80 ml-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email"
                  required
                  className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="attendance" className="text-sm font-medium text-foreground/80 ml-1">
                  Will you attend?
                </label>
                <select 
                  id="attendance"
                  className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow text-foreground/80 appearance-none"
                >
                  <option value="yes">Joyfully Accepts</option>
                  <option value="no">Regretfully Declines</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/80 ml-1">
                  Message for the Couple (Optional)
                </label>
                <textarea 
                  id="message"
                  rows={3}
                  className="w-full px-5 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                  placeholder="Wishing you both a lifetime of happiness!"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full py-4 rounded-xl bg-primary text-white font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                {status === "loading" ? "Sending..." : "Send RSVP"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
