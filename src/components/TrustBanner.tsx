import styles from "./TrustBanner.module.css";

function StarRow() {
  return (
    <div className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1.5l1.98 4.13 4.52.58-3.31 3.18.85 4.51L8 11.7l-4.04 2.2.85-4.51L1.5 6.21l4.52-.58L8 1.5z" />
        </svg>
      ))}
    </div>
  );
}

const ITEMS = [
  { stat: "4.9", label: "Google Rating", stars: true },
  { stat: "17", label: "Years Hosting", stars: false },
  { stat: "<1hr", label: "Response Time", stars: false },
];

export default function TrustBanner() {
  return (
    <section className={styles.section} aria-label="Why guests trust Bay View Lodges">
      {ITEMS.map((item, i) => (
        <div key={item.label} className={styles.cell}>
          {i > 0 && <span className={styles.divider} aria-hidden="true" />}
          <span className={styles.stat}>{item.stat}</span>
          <span className={styles.label}>{item.label}</span>
          {item.stars && <StarRow />}
        </div>
      ))}
    </section>
  );
}
