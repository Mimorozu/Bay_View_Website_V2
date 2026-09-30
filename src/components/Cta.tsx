import Link from "next/link";
import styles from "./Cta.module.css";

export default function Cta() {
  return (
    <Link href="/book" className={styles.cta}>
      Book Your Stay
      <span className={styles.ctaArrow}>→</span>
    </Link>
  );
}
