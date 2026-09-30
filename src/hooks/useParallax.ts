"use client";

import { useEffect, useRef } from "react";

// Lifts an element upward faster than the page scrolls, by `speed` extra pixels of
// travel per pixel scrolled — so it visibly outpaces the (normal-speed) background
// behind it. Extra lift caps at one viewport height (element's offscreen by then anyway).
//
// `mode` picks how the offset is applied:
// - "transform" (default): plain translateY. Cheapest, doesn't affect layout.
// - "margin": use only when a mix-blend-mode descendant needs its ancestor to stay out
//   of its own stacking context — transform creates one, cutting the blend off from
//   content outside that subtree. Don't use "margin" on a stretch-sized flex/grid item:
//   height there is "available space minus margin," so negative margin grows the box
//   instead of moving it.
export function useParallax<T extends HTMLElement>(
  speed: number,
  mode: "transform" | "margin" = "transform",
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      const scrolled = Math.min(window.scrollY, window.innerHeight);
      const offset = -scrolled * speed;
      if (mode === "margin") {
        el.style.marginTop = `${offset}px`;
      } else {
        el.style.transform = `translateY(${offset}px)`;
      }
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
  }, [speed, mode]);

  return ref;
}
