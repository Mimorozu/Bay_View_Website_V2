"use client";

import { useEffect, useRef } from "react";
import styles from "./Gallery.module.css";

const GRID_COLUMNS = 4;
const GRID_ROWS = 6;
const TILE_COUNT = GRID_COLUMNS * GRID_ROWS;

// Muted, mostly-brand tones for the placeholder tiles — coral kept rare since it's the
// site's accent color and shouldn't compete with itself across 100 cells.
const PALETTE = [
  "oklch(88% 0.04 150)",
  "oklch(84% 0.05 200)",
  "oklch(90% 0.03 90)",
  "oklch(86% 0.045 150)",
  "oklch(80% 0.06 205)",
  "oklch(92% 0.025 90)",
  "oklch(72% 0.08 152)",
  "oklch(76% 0.06 210)",
  "oklch(80% 0.1 40 / 70%)",
  "oklch(88% 0.035 95)",
];

// Deterministic per-index PRNG so server and client render the same "random" tile —
// Math.random() at module scope would desync and throw a hydration mismatch.
function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t |= 0;
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Mostly 1x1 with occasional wide/tall/big cells, so the grid reads as a deliberate
// mosaic rather than uniform squares or total chaos.
const SIZES = ["s", "s", "s", "s", "s", "s", "s", "wide", "tall", "big"] as const;
type TileSize = (typeof SIZES)[number];

// A couple of cells forced large on top of whatever the random pass rolled.
const SIZE_OVERRIDES = new Map<number, TileSize>([
  [10, "big"],
  [20, "wide"],
]);

// 1-indexed cell positions that stay visible; every other cell is hidden.
const VISIBLE_CELLS = new Set([7, 10, 16, 20]);

const tiles = Array.from({ length: TILE_COUNT }, (_, i) => {
  const rand = mulberry32(i + 1);
  const color = PALETTE[Math.floor(rand() * PALETTE.length)];
  // Signed speed so tiles drift both up and down at different rates as the section scrolls.
  const speed = (rand() - 0.5) * 0.24;
  const size = SIZE_OVERRIDES.get(i + 1) ?? SIZES[Math.floor(rand() * SIZES.length)];
  const opacity = VISIBLE_CELLS.has(i + 1) ? 1 : 0;
  return { color, speed, size, opacity };
});

// Max pixels a tile is allowed to drift — matches the tileFill's inset buffer in CSS so
// the parallax never scrolls a gap into view, no matter how far the page is scrolled.
const MAX_OFFSET = 48;

const SIZE_CLASS = {
  s: "",
  wide: styles.tileWide,
  tall: styles.tileTall,
  big: styles.tileBig,
};

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    if (!section || !title || !grid) return;

    const fills = Array.from(grid.querySelectorAll<HTMLElement>("[data-speed]"));
    let frame = 0;

    const update = () => {
      const vh = window.innerHeight;
      const rect = grid.getBoundingClientRect();
      const progress = vh - rect.top;
      fills.forEach((fill) => {
        const speed = Number(fill.dataset.speed);
        const offset = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, progress * speed));
        fill.style.transform = `translateY(${offset}px)`;
      });

      // Title fades in as the section enters, holds while pinned, fades out as the
      // section's bottom edge approaches the top of the viewport (end of the section).
      const sectionRect = section.getBoundingClientRect();
      const fadeIn = Math.max(0, Math.min(1, (vh - sectionRect.top) / (vh * 0.6)));
      const fadeOut = Math.max(0, Math.min(1, sectionRect.bottom / (vh * 0.6)));
      title.style.opacity = String(Math.min(fadeIn, fadeOut));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <h2 ref={titleRef} className={styles.title}>Gallery</h2>
      <div ref={gridRef} className={styles.grid}>
        {tiles.map((tile, i) => (
          <div key={i} className={`${styles.tile} ${SIZE_CLASS[tile.size]}`}>
            <div
              className={styles.tileFill}
              data-speed={tile.speed}
              style={{ background: tile.color, opacity: tile.opacity }}
            />
          </div>
        ))}
        {Array.from({ length: GRID_COLUMNS }, (_, i) => (
          <div key={`black-${i}`} className={styles.tile}>
            <div className={styles.tileFill} style={{ background: "black", opacity: 0 }} />
          </div>
        ))}
      </div>
    </section>
  );
}
