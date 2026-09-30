import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import ApartmentInfo from "@/components/ApartmentInfo";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Activities from "@/components/Activities";
import WhatToDo from "@/components/WhatToDo";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />
      <Hero />
      <TrustBanner />
      <ApartmentInfo />
      <Gallery />
      <Reviews />
      <Activities />
      <WhatToDo />
    </div>
  );
}
