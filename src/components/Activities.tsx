import Image from "next/image";
import { activities } from "@/data/activities";
import styles from "./Activities.module.css";

const IMAGES = [
  "/arial_one.jpg",
  "/terrace_view.jpg",
  "/bench-view.jpg",
  "/arial_two.jpg",
  "/view-img.jpeg",
  "/lodges-img.jpg",
];

export default function Activities() {
  return (
    <section className={styles.section}>
      <div className={styles.activitiesTitle}>
        <span className={styles.label}>Activities</span>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>Experience Dominica</h2>
          <p className={styles.subtitle}>
            From black-sand shores to hidden waterfalls, the Nature Isle
            rewards anyone willing to wander a little off the road.
          </p>
        </div>
        <div className={styles.titleSpacer} aria-hidden="true" />
      </div>

      <ul className={styles.grid}>
        {activities.map((activity, i) => (
          <li key={activity.title} className={styles.card}>
            <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>

            <div className={styles.info}>
              <h3 className={styles.cardTitle}>{activity.title}</h3>
              <div className={styles.tags}>
                {activity.type.map((type) => (
                  <span key={type} className={styles.tag}>
                    {type}
                  </span>
                ))}
              </div>
              <span className={styles.distance}>
                <svg
                  className={styles.pin}
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 14.5S13 10 13 6.5A5 5 0 0 0 3 6.5C3 10 8 14.5 8 14.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <circle cx="8" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                {activity.distance} away
              </span>
            </div>

            <div className={styles.imageFrame}>
              <Image
                src={IMAGES[i % IMAGES.length]}
                alt={activity.title}
                fill
                sizes="(min-width: 768px) 20vw, 40vw"
                className={styles.image}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
