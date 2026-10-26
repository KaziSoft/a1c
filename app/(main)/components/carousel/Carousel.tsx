"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./Carousel.module.css";

export type CarouselCta = {
  label: string;
  href?: string;
};

export type CarouselSlide = {
  /** Large heading. Rendered exactly as written (the small eyebrow above it is auto-uppercased). */
  title: string;
  /** Small line above the heading. Defaults to the title. */
  eyebrow?: string;
  /** Image shown in the angled panel on the right (e.g. a path in /public). */
  image: string;
  imageAlt?: string;
  primaryCta?: CarouselCta;
  secondaryCta?: CarouselCta;
};

type CarouselProps = {
  slides?: CarouselSlide[];
  /** Autoplay delay in ms. Set to 0 to disable. */
  interval?: number;
  className?: string;
};

const DEFAULT_PRIMARY: CarouselCta = { label: "Our Service", href: "#" };
const DEFAULT_SECONDARY: CarouselCta = { label: "Get Now", href: "#" };

// Drop your artwork in /public/carousel (or change the paths).
const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    title: "YOUR INTERNET YOUR ULTIMATE WEAPON",
    image: "/img/slide-01.jpg",
    imageAlt: "Game controller",
  },
  {
    title: "Best connection for your home",
    image: "/img/slide-02.jpg",
    imageAlt: "Smart home illustration",
  },
  {
    title: "CONNECTING YOU TO A SMARTER WORLD",
    image: "/img/slide-03.jpg",
    imageAlt: "Connected world map",
  },
  {
    title: "SMART APP FOR A SMARTER CONNECTION",
    image: "/img/slide-04.jpg",
    imageAlt: "Mobile app screens",
  },
];

/* ------------------------------------------------------------------ */
/* Animated network background (nodes drifting out of a vanishing point) */
/* ------------------------------------------------------------------ */

type Node = { x: number; y: number; z: number; icon: boolean; links: number[] };

function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 150;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();

    const nodes: Node[] = Array.from({ length: COUNT }, (_, i) => ({
      x: (Math.random() * 2 - 1) * 1.6,
      y: (Math.random() * 2 - 1) * 1.0,
      z: Math.random() * 0.95 + 0.05,
      icon: i % 4 === 0,
      links: [(i + 1) % COUNT, (i + 7) % COUNT, (i + 19) % COUNT],
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (n: Node) => {
      const f = Math.max(w, h * 2) * 0.32;
      return { sx: w * 0.5 + (n.x / n.z) * f * 0.5, sy: h * 0.58 + (n.y / n.z) * f * 0.5 };
    };

    const drawUser = (x: number, y: number, r: number, a: number) => {
      ctx.strokeStyle = `rgba(190,210,235,${a * 0.9})`;
      ctx.fillStyle = `rgba(150,180,215,${a * 0.55})`;
      ctx.lineWidth = Math.max(1, r * 0.12);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = `rgba(225,235,248,${a})`;
      ctx.beginPath();
      ctx.arc(x, y - r * 0.22, r * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y + r * 0.62, r * 0.48, Math.PI, 0);
      ctx.fill();
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);

      const pts = nodes.map(project);

      // connections
      ctx.lineCap = "round";
      for (let i = 0; i < COUNT; i++) {
        const a = nodes[i];
        for (const j of a.links) {
          const b = nodes[j];
          const depth = 1 - Math.min(a.z, b.z);
          const alpha = 0.05 + depth * 0.22;
          ctx.strokeStyle = `rgba(150,185,225,${alpha})`;
          ctx.lineWidth = 0.5 + depth * 1.6;
          ctx.beginPath();
          ctx.moveTo(pts[i].sx, pts[i].sy);
          ctx.lineTo(pts[j].sx, pts[j].sy);
          ctx.stroke();
        }
      }

      // nodes
      for (let i = 0; i < COUNT; i++) {
        const n = nodes[i];
        const { sx, sy } = pts[i];
        if (sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) continue;
        const depth = 1 - n.z;
        const alpha = 0.12 + depth * 0.55;
        if (n.icon && n.z < 0.7) {
          drawUser(sx, sy, 5 + depth * 15, alpha * 0.8);
        } else {
          ctx.fillStyle = `rgba(170,200,235,${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.8 + depth * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduced) {
        for (const n of nodes) {
          n.z -= dt * 0.028;
          n.x += dt * 0.006;
          if (n.z < 0.05) {
            n.z = 1;
            n.x = (Math.random() * 2 - 1) * 1.6;
            n.y = (Math.random() * 2 - 1) * 1.0;
          }
        }
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) raf = requestAnimationFrame(frame);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

/* ------------------------------------------------------------------ */
/* Slide buttons                                                       */
/* ------------------------------------------------------------------ */

const BTN_BASE = `${styles.btn} inline-flex items-center justify-center rounded-[3px] px-[clamp(14px,1.5vw,30px)] h-[clamp(30px,2.9vw,52px)] text-[clamp(11px,0.85vw,15px)] font-semibold whitespace-nowrap`;

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.1em]" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GemIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.2em]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 3h12l4 6-10 12L2 9l4-6z" strokeLinejoin="round" />
      <path d="M2 9h20M9 3l3 6 3-6M12 21L9 9m3 12l3-12" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Angled image panel geometry                                         */
/*                                                                     */
/* The outline (measured from the recording) is: top edge slanting     */
/* down-left to a rounded vertex, then a long diagonal down-right to   */
/* the bottom. A white strip hugs the upper-left edge and a darker     */
/* slab peeks out under the lower-left edge. CSS clip-path polygons    */
/* can't round corners, so we build pixel paths from the real size.    */
/* ------------------------------------------------------------------ */

type Pt = [number, number];

/** Polygon path with per-vertex corner rounding (radius in px). First vertex must be sharp. */
function roundedPath(pts: Pt[], radii: number[]): string {
  const n = pts.length;
  const f = (v: number) => v.toFixed(2);
  let d = "";
  for (let i = 0; i < n; i++) {
    const [x, y] = pts[i];
    const r = radii[i] ?? 0;
    if (r <= 0) {
      d += `${i === 0 ? "M" : "L"}${f(x)} ${f(y)} `;
      continue;
    }
    const [px, py] = pts[(i - 1 + n) % n];
    const [nx, ny] = pts[(i + 1) % n];
    const l1 = Math.hypot(px - x, py - y);
    const l2 = Math.hypot(nx - x, ny - y);
    const k = Math.min(r, l1 / 2, l2 / 2);
    const sx = x + ((px - x) / l1) * k;
    const sy = y + ((py - y) / l1) * k;
    const ex = x + ((nx - x) / l2) * k;
    const ey = y + ((ny - y) / l2) * k;
    d += `L${f(sx)} ${f(sy)} Q${f(x)} ${f(y)} ${f(ex)} ${f(ey)} `;
  }
  return `${d}Z`;
}

function intersect(p: Pt, d: Pt, q: Pt, e: Pt): Pt {
  const cross = (a: Pt, b: Pt) => a[0] * b[1] - a[1] * b[0];
  const s = cross([q[0] - p[0], q[1] - p[1]], e) / cross(d, e);
  return [p[0] + s * d[0], p[1] + s * d[1]];
}

/** Narrow screens: image across the top, slanted bottom edge with the white strip under it. */
function mobilePanelPaths(w: number, h: number) {
  const left = 0.54 * h; // image bottom edge, left side
  const right = left - 0.075 * h; // ...and right side (slants up towards the right)
  const t = 0.032 * h; // strip thickness
  const img = roundedPath(
    [[0, 0], [w + 4, 0], [w + 4, right], [0, left]],
    [0, 0, 0, 0],
  );
  const strip = roundedPath(
    [[0, left + t], [w + 40, right + t], [w + 40, right - 24], [0, left - 24]],
    [0, 0, 0, 0],
  );
  return { img: `path('${img}')`, strip: `path('${strip}')` };
}

function panelPaths(w: number, h: number) {
  if (w < 640) return mobilePanelPaths(w, h);
  const T0: Pt = [0.516 * w, 0]; // top of the outer (white) edge
  const V: Pt = [0.433 * w, 0.27 * h]; // outer vertex (before rounding)
  const B: Pt = [0.612 * w, h]; // where the long diagonal meets the bottom
  const strip = 0.027 * w; // horizontal thickness of the white strip
  const r = 0.016 * w; // corner radius

  // Image outline: same slanted edge pushed right by the strip thickness
  const innerTop: Pt = [T0[0] + strip, 0];
  const edge: Pt = [V[0] - T0[0], V[1] - T0[1]];
  const Vi = intersect(innerTop, edge, V, [B[0] - V[0], B[1] - V[1]]);
  const img = roundedPath(
    [innerTop, [w + 4, 0], [w + 4, h], B, Vi],
    [0, 0, 0, 0, r],
  );

  // White strip: runs from the top to the rounded vertex, tucked under the image
  const L: Pt = [V[0] + 0.25 * (B[0] - V[0]), V[1] + 0.25 * (B[1] - V[1])];
  const Q: Pt = [L[0] + 0.03 * w, L[1]];
  const stripPath = roundedPath(
    [T0, [innerTop[0] + 0.08 * w, 0], Q, V],
    [0, 0, 0, r],
  );

  return { img: `path('${img}')`, strip: `path('${stripPath}')` };
}

/* ------------------------------------------------------------------ */
/* Carousel                                                            */
/* ------------------------------------------------------------------ */

const MOSAIC_TILES = 24; // 8 columns x 3 rows, see .mosaic in the CSS

export default function Carousel({
  slides = DEFAULT_SLIDES,
  interval = 5000,
  className = "",
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Mosaic transition: bump `flash` whenever the slide changes (not on first render).
  const [prevIndex, setPrevIndex] = useState(0);
  const [flash, setFlash] = useState(0);
  if (prevIndex !== index) {
    setPrevIndex(index);
    setFlash((f) => f + 1);
  }

  const count = slides.length;
  const autoplay = interval > 0 && count > 1;

  // Measure the slide so the panel outline can use true pixel geometry (rounded corners)
  const sectionRef = useRef<HTMLElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const clipVars = useMemo(() => {
    if (!size) return undefined;
    const p = panelPaths(size.w, size.h);
    return { "--clip-img": p.img, "--clip-strip": p.strip } as CSSProperties;
  }, [size]);

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  return (
    <section
      ref={sectionRef}
      style={clipVars}
      aria-roledescription="carousel"
      aria-label="Highlights"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      className={`group relative isolate w-full overflow-hidden outline-none h-[clamp(300px,30.5vw,640px)] max-sm:h-[clamp(500px,135vw,600px)] ${styles.backdrop} ${className}`}
    >
      <NetworkCanvas />
      <div aria-hidden className={`pointer-events-none absolute inset-0 ${styles.vignette}`} />

      {slides.map((s, i) => {
        const active = i === index;
        const primary = s.primaryCta ?? DEFAULT_PRIMARY;
        const secondary = s.secondaryCta ?? DEFAULT_SECONDARY;

        return (
          <div
            key={s.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={!active}
            className={`absolute inset-0 ${styles.slide} ${active ? styles.slideActive : ""}`}
          >
            {/* Angled image panel: slab (back) + white strip + image (front) */}
            <div aria-hidden={!s.imageAlt} className="pointer-events-none absolute inset-0">
              <div className={`absolute inset-0 ${styles.panel}`}>
                <div className={`absolute inset-0 ${styles.slab} ${styles.imageClip}`} />
                <div className={`absolute inset-0 bg-white ${styles.strip} ${styles.stripClip}`} />
                <div className={`absolute inset-0 ${styles.imageClip}`}>
                  <div className={styles.imgBox}>
                    <Image
                      src={s.image}
                      alt={s.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 639px) 100vw, 58vw"
                      priority={i === 0}
                      className={`object-cover object-center ${styles.img}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text block */}
            <div className="relative z-10 flex h-full w-[46%] flex-col justify-center pb-[clamp(28px,3.5vw,64px)] pl-[clamp(24px,3vw,72px)] max-sm:absolute max-sm:bottom-14 max-sm:left-0 max-sm:h-auto max-sm:w-full max-sm:justify-end max-sm:px-5 max-sm:pb-0">
              <p
                className={`${styles.eyebrow} text-[clamp(9px,0.8vw,14px)] font-bold uppercase tracking-[0.22em] text-white`}
              >
                {s.eyebrow ?? s.title}
              </p>
              <h2
                className={`${styles.title} mt-[clamp(8px,1.1vw,20px)] text-[clamp(1.5rem,3.9vw,4.75rem)] font-bold leading-[1.08] tracking-tight text-white`}
              >
                {s.title}
              </h2>
              <div className="mt-[clamp(14px,2.2vw,40px)] flex flex-wrap items-center gap-[clamp(10px,1.2vw,22px)]">
                <span className={styles.ctaMask}>
                  <a
                    href={primary.href ?? "#"}
                    tabIndex={active ? 0 : -1}
                    className={`${BTN_BASE} ${styles.btnPrimary}`}
                  >
                    <span className="inline-flex items-center gap-2">
                      {primary.label}
                      <ChevronIcon />
                    </span>
                  </a>
                </span>
                <span className={styles.ctaMask}>
                  <a
                    href={secondary.href ?? "#"}
                    tabIndex={active ? 0 : -1}
                    className={`${BTN_BASE} ${styles.btnSecondary}`}
                    style={{ ["--bd" as string]: "120ms" } as CSSProperties}
                  >
                    <span className="inline-flex items-center gap-2">
                      <GemIcon />
                      {secondary.label}
                    </span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Mosaic transition overlay (re-mounted on every slide change) */}
      {flash > 0 && (
        <div key={flash} aria-hidden className={`pointer-events-none absolute inset-0 z-20 ${styles.mosaic}`}>
          {Array.from({ length: MOSAIC_TILES }, (_, t) => (
            <span
              key={t}
              className={`${styles.tile} ${(t * 7 + Math.floor(t / 8)) % 3 === 0 ? styles.tileDark : styles.tileLight}`}
              style={{ ["--d" as string]: `${((t * 37) % 11) * 45}ms` }}
            />
          ))}
        </div>
      )}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-30 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition hover:bg-white/20 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-30 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition hover:bg-white/20 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Progress Indicators */}
          <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center space-x-2.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md sm:bottom-5">
            {slides.map((s, i) => {
              const isActive = i === index;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={isActive}
                  className="group relative flex h-5 w-5 items-center justify-center focus:outline-none"
                >
                  <svg className="h-full w-full -rotate-90 transform">
                    <circle cx="10" cy="10" r="7" className="fill-none stroke-white/20" strokeWidth="2" />
                    {isActive && (
                      <circle
                        cx="10"
                        cy="10"
                        r="7"
                        className={`fill-none stroke-orange-500 ${styles.progressRing} ${
                          paused ? styles.ringPaused : ""
                        }`}
                        strokeWidth="2.5"
                        strokeDasharray="44"
                        style={{
                          animationDuration: `${interval}ms`,
                          // no autoplay: show the ring full and static
                          ...(autoplay ? {} : { animation: "none", strokeDashoffset: 0 }),
                        }}
                        onAnimationEnd={autoplay ? next : undefined}
                      />
                    )}
                  </svg>
                  <span
                    className={`absolute h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isActive ? "scale-110 bg-orange-400" : "bg-white/50 group-hover:bg-white"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}