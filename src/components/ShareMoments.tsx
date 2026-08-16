"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Check,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";
import { CornerFiligree, MiniDivider } from "./Ornaments";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "";
const CONFIGURED = Boolean(CLOUD_NAME && UPLOAD_PRESET);

const MAX_DIM = 1600;
const JPEG_QUALITY = 0.82;

type Status = "idle" | "uploading" | "done" | "error";

async function compressImage(file: File): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_DIM / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale);
    const h = Math.round(bmp.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no-canvas");
    ctx.drawImage(bmp, 0, 0, w, h);
    bmp.close();
    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, "image/jpeg", JPEG_QUALITY),
    );
    if (!blob) throw new Error("encode");
    return blob;
  } catch {
    return file;
  }
}

function uploadWithProgress(
  blob: Blob,
  name: string,
  onProgress: (p: number) => void,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("file", blob, "moment.jpg");
    form.append("upload_preset", UPLOAD_PRESET);
    form.append("folder", "moments");
    if (name.trim()) form.append("context", `guest_name=${name.trim()}`);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    );
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        let reason = "Upload failed";
        try {
          reason = JSON.parse(xhr.responseText)?.error?.message || reason;
        } catch {
          /* non-JSON error body */
        }
        reject(new Error(reason));
      }
    };
    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(form);
  });
}

export default function ShareMoments() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [thankName, setThankName] = useState("");

  const pick = useCallback((f: File | undefined | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setStatus("error");
      setError("Please choose a photo (JPEG, PNG or HEIC).");
      return;
    }
    setStatus("idle");
    setError("");
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  }, [preview]);

  const submit = async () => {
    if (!file) return;
    if (honeypot) {
      setStatus("done");
      setThankName(name.trim());
      return;
    }
    if (!CONFIGURED) {
      setStatus("error");
      setError("Photo sharing is temporarily unavailable — please try again later.");
      return;
    }
    setStatus("uploading");
    setProgress(0);
    try {
      const blob = await compressImage(file);
      await uploadWithProgress(blob, name, setProgress);
      setStatus("done");
      setThankName(name.trim());
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      setFile(null);
      setName("");
    } catch (e) {
      setStatus("error");
      setError(
        e instanceof Error ? `Upload was rejected: ${e.message}` : "Something went wrong uploading. Please try again.",
      );
    }
  };

  const reset = () => {
    setStatus("idle");
    setError("");
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    setName("");
    setProgress(0);
  };

  return (
    <section
      id="share-moments"
      className="relative py-28 md:py-40 bg-night overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="glow-gold absolute top-[-20%] left-[-10%] w-[520px] h-[520px]" />
      <div className="glow-rose absolute bottom-[-20%] right-[-10%] w-[520px] h-[520px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-caps text-[10px] md:text-xs tracking-[0.6em] uppercase text-gold/80 mb-5">
            Guest Moments
          </p>
          <h2 className="font-script text-ivory-gold text-6xl md:text-7xl lg:text-8xl leading-tight drop-shadow-[0_4px_30px_rgba(201,162,39,0.3)]">
            Share your moments
          </h2>
          <div className="text-gold/40 mt-7 w-60 mx-auto">
            <MiniDivider className="w-full" />
          </div>
          <p className="mt-5 font-serif italic text-ivory/45 text-base md:text-lg max-w-xl mx-auto">
            Caught a moment you loved? Share it with us — the best ones will be
            added to our gallery.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-3 border border-gold/20 rounded-[1.6rem] md:rounded-[2.1rem]" />
          <CornerFiligree className="absolute -top-3 -left-3 w-14 h-14 md:w-16 md:h-16 text-gold/70" />
          <CornerFiligree className="absolute -top-3 -right-3 w-14 h-14 md:w-16 md:h-16 text-gold/70 rotate-90" />
          <CornerFiligree className="absolute -bottom-3 -right-3 w-14 h-14 md:w-16 md:h-16 text-gold/70 rotate-180" />
          <CornerFiligree className="absolute -bottom-3 -left-3 w-14 h-14 md:w-16 md:h-16 text-gold/70 -rotate-90" />

          <div className="relative bg-panel/80 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 border border-gold/15">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
                    className="w-20 h-20 rounded-full bg-gold/15 border border-gold/50 flex items-center justify-center mb-8"
                  >
                    <Check className="w-9 h-9 text-gold-light" />
                  </motion.div>
                  <h3 className="font-script text-gold-light text-5xl md:text-6xl mb-4">
                    Thank you{thankName ? `, ${thankName.split(" ")[0]}` : ""}!
                  </h3>
                  <p className="font-serif italic text-ivory/60 text-lg max-w-md leading-relaxed">
                    Your moment has been shared with us. Keep an eye out — the
                    best ones find their way into our gallery.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-8 font-caps text-[10px] tracking-[0.4em] uppercase text-gold-light underline underline-offset-4 hover:text-ivory transition-colors"
                  >
                    Share another
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-8">
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Dropzone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      pick(e.dataTransfer.files?.[0]);
                    }}
                    onClick={() => inputRef.current?.click()}
                    className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden ${
                      dragging
                        ? "border-gold-light bg-gold/10"
                        : "border-gold/40 bg-night/40 hover:border-gold/70 hover:bg-gold/5"
                    }`}
                  >
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => pick(e.target.files?.[0])}
                    />
                    {preview ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preview}
                          alt="Selected photo preview"
                          className="w-full h-64 md:h-80 object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            reset();
                          }}
                          aria-label="Remove selected photo"
                          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-night/70 border border-gold/40 text-gold-light flex items-center justify-center hover:bg-night transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-4 py-16 md:py-20 px-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                          <UploadCloud className="w-7 h-7 text-gold-light" />
                        </div>
                        <div>
                          <p className="font-serif text-xl text-ivory">
                            Tap to choose a photo
                          </p>
                          <p className="mt-2 font-caps text-[9px] tracking-[0.4em] uppercase text-ivory/40">
                            Or drag &amp; drop it here
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block font-caps text-[10px] tracking-[0.4em] uppercase text-ivory/60 mb-3">
                      Your name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Menon"
                      className="w-full bg-night/40 border border-gold/30 rounded-xl px-5 py-4 font-serif text-lg text-ivory placeholder:text-ivory/35 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    />
                  </div>

                  {error && (
                    <p className="font-serif italic text-rose text-base text-center">
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <motion.button
                    whileHover={file ? { scale: 1.02 } : undefined}
                    whileTap={file ? { scale: 0.98 } : undefined}
                    onClick={submit}
                    disabled={!file || status === "uploading"}
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep text-night font-caps text-[11px] tracking-[0.3em] uppercase font-semibold shadow-[0_14px_36px_rgba(201,162,39,0.4)] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                  >
                    {status === "uploading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {progress > 0 ? `Uploading · ${progress}%` : "Uploading…"}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Share it with us
                      </>
                    )}
                  </motion.button>
                  <p className="text-center font-serif italic text-ivory/40 text-sm">
                    Photos stay private with us — only the ones we curate appear
                    on the site.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}