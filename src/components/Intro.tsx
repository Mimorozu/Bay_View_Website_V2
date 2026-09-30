"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Intro.module.css";

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reveal = visible ? styles.revealVisible : "";

  return (
    <section ref={sectionRef} className={`${styles.section} ${styles.reveal} ${reveal}`}>
      <div className={styles.spacer} aria-hidden="true">
        <span className={styles.spacerLine} />
      </div>
      <div className={styles.text}>
        <span className={styles.eyebrow}>Calibishie, Dominica</span>
        <h2 className={styles.title}>Comfortable, Considered Spaces</h2>
        <p className={styles.subtitle}>
          Each apartment at Bay View Lodges is designed for easy island
          living — bright rooms, private balconies, and everything you need
          to feel at home.
        </p>
        <Link href="/apartments" className={styles.cta}>
          View the Apartments
          <span className={styles.ctaArrow}>→</span>
        </Link>
      </div>
      <div className={styles.imageFrame}>
        <div className={styles.stack}>
          <div className={styles.frame}>
            <Image
              src="/apartments-clean.png"
              alt="Bay View Lodges apartment building, white balconies over olive-green walls"
              fill
              sizes="(min-width: 768px) 40vw, 80vw"
              className={styles.image}
            />
          </div>
          <div className={styles.accentFrame}>
            <Image
              src="/arial_one.jpg"
              alt="Aerial view of the Calibishie coastline near Bay View Lodges"
              fill
              sizes="(min-width: 768px) 18vw, 0vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
