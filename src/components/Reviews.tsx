import { reviews } from "@/data/reviews";
import styles from "./Reviews.module.css";

function Stars({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={styles.star}
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill={i < rating ? "currentColor" : "none"}
          aria-hidden="true"
        >
          <path
            d="M8 1.5l1.98 4.13 4.52.58-3.31 3.18.85 4.51L8 11.7l-4.04 2.2.85-4.51L1.5 6.21l4.52-.58L8 1.5z"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "oklch(58% 0.14 25)",
  "oklch(55% 0.13 250)",
  "oklch(56% 0.14 152)",
  "oklch(60% 0.15 300)",
  "oklch(58% 0.15 60)",
];

export default function Reviews() {
  const track = [...reviews, ...reviews];

  return (
    <section className={styles.section}>
      <div className={styles.reviewsTitle}>
        <span className={styles.label}>Reviews</span>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>Don&apos;t Just Take It From Us</h2>
          <p className={styles.subtitle}>See what our guests had to say.</p>
        </div>
        <div className={styles.titleSpacer} aria-hidden="true" />
      </div>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {track.map((review, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.header}>
                <span
                  className={styles.avatar}
                  style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                  aria-hidden="true"
                >
                  {initials(review.name)}
                </span>
                <span className={styles.headerText}>
                  <span className={styles.name}>{review.name}</span>
                  <span className={styles.subline}>Local Guide</span>
                </span>
              </div>
              <div className={styles.ratingRow}>
                <Stars rating={review.rating} />
                <span className={styles.date}>{review.date}</span>
              </div>
              <p className={styles.text}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
