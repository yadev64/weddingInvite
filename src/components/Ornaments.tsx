import type { SVGProps } from "react";

/**
 * Hand-crafted ornamental SVGs — the "gold filigree" language of the site.
 * All inherit color via `currentColor`.
 */

export function CornerFiligree(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden {...props}>
      <path
        d="M4 116 V42 C4 21 21 4 42 4 H 116"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4 116 V58 C4 28 28 4 58 4 H 116"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.45"
      />
      <path d="M15 15 24 6 33 15 24 24Z" fill="currentColor" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
      <circle cx="24" cy="6" r="1.6" fill="currentColor" opacity="0.8" />
      <circle cx="6" cy="24" r="1.6" fill="currentColor" opacity="0.8" />
      <path
        d="M24 24c0 5-4 9-9 9"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d="M24 24c5 0 9 4 9 9"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
    </svg>
  );
}

export function MandalaDivider(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 560 44" fill="none" aria-hidden {...props}>
      <path d="M10 22h150" stroke="currentColor" strokeWidth="1" />
      <path d="M400 22h150" stroke="currentColor" strokeWidth="1" />
      <path
        d="M160 22c0-7 6-12 13-12h12"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M160 22c0 7 6 12 13 12h12"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M400 22c0-7-6-12-13-12h-12"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M400 22c0 7-6 12-13 12h-12"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="206" cy="22" r="5" stroke="currentColor" strokeWidth="1" />
      <circle cx="354" cy="22" r="5" stroke="currentColor" strokeWidth="1" />
      <circle cx="206" cy="22" r="1.6" fill="currentColor" />
      <circle cx="354" cy="22" r="1.6" fill="currentColor" />
      <path
        d="M280 8 292 22 280 36 268 22Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M280 22m0-1.6a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 1 0 0-3.2Z"
        fill="currentColor"
      />
      <path
        d="M280 12c3.4 2.4 3.4 7.6 0 10M280 12c-3.4 2.4-3.4 7.6 0 10M280 32c3.4-2.4 3.4-7.6 0-10M280 32c-3.4-2.4-3.4-7.6 0-10"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle cx="274" cy="18" r="2.6" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="286" cy="18" r="2.6" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="274" cy="26" r="2.6" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="286" cy="26" r="2.6" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export function MiniDivider(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 24" fill="none" aria-hidden {...props}>
      <path d="M0 12h60" stroke="currentColor" strokeWidth="1" />
      <path d="M160 12h60" stroke="currentColor" strokeWidth="1" />
      <path d="M96 12h28" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="74" cy="12" r="3" stroke="currentColor" strokeWidth="1" />
      <circle cx="146" cy="12" r="3" stroke="currentColor" strokeWidth="1" />
      <path d="M110 4 114 12 110 20 106 12Z" fill="currentColor" />
    </svg>
  );
}

export function SealRing(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 240" fill="none" aria-hidden {...props}>
      <circle cx="120" cy="120" r="112" stroke="currentColor" strokeWidth="1.5" />
      <circle
        cx="120"
        cy="120"
        r="104"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="3 5"
      />
      <circle cx="120" cy="120" r="80" stroke="currentColor" strokeWidth="1" />
      <circle
        cx="120"
        cy="120"
        r="73"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 5"
      />
      <circle cx="232" cy="120" r="2.4" fill="currentColor" />
      <circle cx="199.2" cy="199.2" r="2.4" fill="currentColor" />
      <circle cx="120" cy="232" r="2.4" fill="currentColor" />
      <circle cx="40.8" cy="199.2" r="2.4" fill="currentColor" />
      <circle cx="8" cy="120" r="2.4" fill="currentColor" />
      <circle cx="40.8" cy="40.8" r="2.4" fill="currentColor" />
      <circle cx="120" cy="8" r="2.4" fill="currentColor" />
      <circle cx="199.2" cy="40.8" r="2.4" fill="currentColor" />
      <circle cx="120" cy="120" r="40" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1 4" />
      <path
        d="M120 82c13 10 22 22 22 36 0 20-16 32-22 38-6-6-22-18-22-38 0-14 9-26 22-36Z"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function ArchFrame(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 540" fill="none" aria-hidden {...props}>
      <path
        d="M44 536 V 330 C44 140 200 44 200 44 C200 44 356 140 356 330 V 536"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M62 536 V 330 C62 164 200 76 200 76 C200 76 338 164 338 330 V 536"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.5"
      />
      <circle cx="200" cy="44" r="4" fill="currentColor" />
      <path
        d="M200 30v18M192 30c5 3 11 3 16 0"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.6"
      />
    </svg>
  );
}

export function Lotus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden {...props}>
      <path
        d="M32 10c6 7 10 14 10 20 0 9-6 14-10 16-4-2-10-7-10-16 0-6 4-13 10-20Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M32 6c-4 8-6 14-6 20 0 8 4 13 6 15M32 6c4 8 6 14 6 20 0 8-4 13-6 15"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <circle cx="32" cy="40" r="4" fill="currentColor" />
      <path
        d="M32 28c3 4 5 8 5 11 0 5-3 7-5 8-2-1-5-3-5-8 0-3 2-7 5-11Z"
        fill="currentColor"
        opacity="0.25"
      />
    </svg>
  );
}