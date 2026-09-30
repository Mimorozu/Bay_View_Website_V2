"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Guide", href: "/guide" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
];

function NavLink({
  href,
  label,
  className = "",
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} className={`${styles.navLink} ${className}`}>
      {label}
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <div className={styles.leading}>
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} className={styles.desktopLink} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={styles.menuButton}
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
            <line
              x1="0" y1="1" x2="18" y2="1"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              className={`${styles.menuLine} ${open ? styles.menuLineTopOpen : ""}`}
            />
            <line
              x1="0" y1="11" x2="18" y2="11"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              className={`${styles.menuLine} ${open ? styles.menuLineBottomOpen : ""}`}
            />
          </svg>
        </button>
      </div>

      <Link href="/" className={styles.logo}>
        Bay View Lodges
      </Link>

      <Link href="/book" className={styles.cta}>
        Book You Stay
        <span className={styles.ctaArrow}>→</span>
      </Link>

      <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            onClick={() => setOpen(false)}
            className={`${styles.mobileLink} ${open ? styles.mobileLinkOpen : ""}`}
          />
        ))}
      </div>
    </nav>
  );
}
