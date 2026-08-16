"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageSquareHeart, MessageCircle } from "lucide-react";
import { CornerFiligree, MiniDivider } from "./Ornaments";

const WHATSAPP_NUMBER = "918921167783";

type Attendance = "accept" | "decline" | null;

export default function RSVP() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const composed = [
    "Namaste! I would like to RSVP for the wedding of Deepa & Yadev.",
    `Name: ${name || "—"}`,
    attendance === "accept"
      ? `Attendance: Joyfully accepting · ${guests} guest${guests > 1 ? "s" : ""}`
      : "Attendance: Regretfully declining",
    message ? `Wishes for the couple: ${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(composed)}`;
    window.open(url, "_blank", "noopener");
    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      className="relative py-28 md:py-40 bg-ivory text-ink overflow-hidden"
    >
      <div className="absolute inset-0 paper-texture opacity-[0.05]" />
      <div className="glow-gold absolute top-[-25%] left-1/2 -translate-x-1/2 w-[600px] h-[600px]" />
      <div className="glow-rose absolute bottom-[-25%] right-[-5%] w-[500px] h-[500px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="font-caps text-[10px] md:text-xs tracking-[0.6em] uppercase text-crimson/80 mb-5">
            Kindly Respond
          </p>
          <h2 className="font-script text-gold-deep text-6xl md:text-7xl lg:text-8xl leading-tight drop-shadow-[0_3px_20px_rgba(201,162,39,0.25)]">
            Will you join us?
          </h2>
          <p className="mt-6 font-serif italic text-ink/60 text-lg max-w-xl mx-auto leading-relaxed">
            Your presence is the greatest gift. Kindly reply by{" "}
            <span className="text-crimson not-italic font-medium">1st September</span> so
            we can save a seat for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 border border-gold/40 rounded-[2rem] md:rounded-[2.5rem]" />
          <div className="absolute inset-3 border border-gold/20 rounded-[1.6rem] md:rounded-[2.1rem]" />
          <CornerFiligree className="absolute -top-3 -left-3 w-14 h-14 md:w-16 md:h-16 text-gold/70" />
          <CornerFiligree className="absolute -top-3 -right-3 w-14 h-14 md:w-16 md:h-16 text-gold/70 rotate-90" />
          <CornerFiligree className="absolute -bottom-3 -right-3 w-14 h-14 md:w-16 md:h-16 text-gold/70 rotate-180" />
          <CornerFiligree className="absolute -bottom-3 -left-3 w-14 h-14 md:w-16 md:h-16 text-gold/70 -rotate-90" />

          <div className="relative bg-mist/95 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
                    className="w-20 h-20 rounded-full bg-gold/15 border border-gold/50 flex items-center justify-center mb-8"
                  >
                    <Check className="w-9 h-9 text-gold-deep" />
                  </motion.div>
                  <h3 className="font-script text-gold-deep text-5xl md:text-6xl mb-4">
                    Thank you, {name.split(" ")[0] || "friend"}!
                  </h3>
                  <p className="font-serif italic text-ink/60 text-lg max-w-md leading-relaxed">
                    Your reply is ready in WhatsApp — just hit send and it comes
                    straight to us. We cannot wait to celebrate with you.
                  </p>
                  <div className="text-gold/50 mt-8 w-48 mx-auto">
                    <MiniDivider className="w-full" />
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 font-caps text-[10px] tracking-[0.4em] uppercase text-gold-deep underline underline-offset-4 hover:text-crimson transition-colors"
                  >
                    Reply again
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-8"
                >
                  {/* Name */}
                  <div>
                    <label className="block font-caps text-[10px] tracking-[0.4em] uppercase text-ink/60 mb-3">
                      Your full name
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Menon"
                      className="w-full bg-ivory/60 border border-gold/30 rounded-xl px-5 py-4 font-serif text-lg text-ink placeholder:text-ink/35 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    />
                  </div>

                  {/* Attendance */}
                  <div>
                    <label className="block font-caps text-[10px] tracking-[0.4em] uppercase text-ink/60 mb-3">
                      Will you attend?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        [
                          { key: "accept", label: "Joyfully Accept" },
                          { key: "decline", label: "Regretfully Decline" },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setAttendance(opt.key)}
                          className={`px-4 py-4 rounded-xl border font-serif text-base md:text-lg transition-all duration-300 ${
                            attendance === opt.key
                              ? "border-gold bg-gold/10 text-gold-deep shadow-[inset_0_0_20px_rgba(201,162,39,0.15)]"
                              : "border-gold/25 bg-ivory/60 text-ink/70 hover:border-gold/50"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guests */}
                  <AnimatePresence>
                    {attendance === "accept" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-8 pt-1">
                          <div>
                            <label className="block font-caps text-[10px] tracking-[0.4em] uppercase text-ink/60 mb-3">
                              Number of guests
                            </label>
                            <div className="flex items-center gap-3">
                              {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                  key={n}
                                  type="button"
                                  onClick={() => setGuests(n)}
                                  className={`w-11 h-11 rounded-full border font-serif text-lg transition-all ${
                                    guests === n
                                      ? "border-gold bg-gold/10 text-gold-deep"
                                      : "border-gold/25 bg-ivory/60 text-ink/60 hover:border-gold/50"
                                  }`}
                                >
                                  {n}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-2 font-caps text-[10px] tracking-[0.4em] uppercase text-ink/60 mb-3">
                      <MessageSquareHeart className="w-3.5 h-3.5 text-crimson" />
                      A note for the couple
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="Share your wishes, advice, or a memory…"
                      className="w-full bg-ivory/60 border border-gold/30 rounded-xl px-5 py-4 font-serif text-lg text-ink placeholder:text-ink/35 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep text-night font-caps text-[11px] tracking-[0.3em] uppercase font-semibold shadow-[0_14px_36px_rgba(201,162,39,0.4)]"
                  >
                    <MessageCircle className="w-4 h-4" /> Send via WhatsApp
                  </motion.button>
                  <p className="text-center font-serif italic text-ink/45 text-sm">
                    Your reply opens in WhatsApp — just hit send and it comes
                    straight to us.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}