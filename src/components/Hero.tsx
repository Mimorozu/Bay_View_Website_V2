"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParallax } from "@/hooks/useParallax";
import styles from "./Hero.module.css";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const imageParallax = useParallax<HTMLDivElement>(0.06);
  const contentParallax = useParallax<HTMLDivElement>(0.35);

  useEffect(() => {
    // delayed flip, not instant — firing the moment the hero mounts reads as too abrupt
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const reveal = visible ? styles.revealVisible : "";

  return (
    <section className={styles.hero}>
      <div ref={imageParallax} className={styles.imageLayer}>
        <Image
          src="/view-img.jpeg"
          alt="Ocean cove framed by rainforest canopy and palms, Dominica"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>
      <div className={styles.veil} aria-hidden="true" />
      <div ref={contentParallax} className={styles.content}>
        <div className={styles.panel}>
          <h1 className={`${styles.heading} ${styles.reveal} ${reveal}`}>
            Paradise Has a Place to Stay
          </h1>
          <p
            className={`${styles.subheading} ${styles.reveal} ${reveal}`}
            style={{ transitionDelay: "0.12s" }}
          >
            Make Bay View Lodges your home base for discovering Dominica’s
            beaches, mountains, waterfalls, and culture.
          </p>
          <div
            className={`${styles.reveal} ${reveal}`}
            style={{ transitionDelay: "0.22s" }}
          >
            <Link href="/book" className={styles.cta}>
              Book You Stay
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
