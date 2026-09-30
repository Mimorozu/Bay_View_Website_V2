"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { amenities } from "@/data/amenities";
import Cta from "./Cta";
import styles from "./ApartmentInfo.module.css";

const galleryImages = [
  { src: "/lodges-bedroom.jpg", alt: "Bedroom interior at Bay View Lodges" },
  { src: "/bench-view.jpg", alt: "Seating with ocean view at Bay View Lodges" },
  { src: "/bedside_table.jpg", alt: "Bedroom nightstand detail at Bay View Lodges" },
  { src: "/table.jpg", alt: "Dining table at Bay View Lodges" },
];

export default function ApartmentInfo() {
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
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.apartmentsTitle}>
        <span className={styles.label}>The Apartments</span>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>Get Cozy With Stunning Views</h2>
          <p className={styles.subtitle}>
            Hosting a double bedroom with ensuite, open plan kitchen & livingroom with sofa-bed and private balcony.
          </p>
          <p className={styles.meta}>2-4 Guests · 1 Bedroom · Ensuite · Private Balcony</p>
          <div className={styles.ctaWrap}>
            <Cta />
          </div>
        </div>
        <div className={styles.titleSpacer} aria-hidden="true" />
      </div>

      <div className={`${styles.grid} ${styles.reveal} ${reveal}`}>
        <div className={styles.mainFrame}>
          <Image
            src="/terrace_view.jpg"
            alt="Private balcony overlooking the ocean and rainforest coast at Bay View Lodges"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={styles.image}
          />
          <div className={styles.mainCaption}>
            <span className={styles.mainCaptionLabel}>The View</span>
            <span className={styles.mainCaptionText}>Terrace &amp; Ocean Coast</span>
          </div>
        </div>

        <div className={styles.gallery}>
          {galleryImages.map((img, i) => (
            <div
              key={img.src}
              className={`${styles.galleryCell} ${i === 0 ? styles.galleryCellTall : ""}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 25vw, 78vw"
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${styles.amenitiesSection} ${styles.reveal} ${reveal}`}
        style={{ transitionDelay: "0.12s" }}
      >
        <h3 className={styles.amenitiesLabel}>Amenities</h3>
        <ul className={styles.amenitiesList}>
          {amenities.map((amenity) => (
            <li key={amenity} className={styles.amenityItem}>
              {amenity}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
