import Link from "next/link";
import RoutingDiagram from "./RoutingDiagram";
import { site } from "@/data/site";
import styles from "./Hero.module.css";

export default function Hero() {
  const [first, last] = site.name.split(" ");
  return (
    <section className={`wrap ${styles.hero}`}>
      <div className={styles.copy}>
        <h1 className={styles.name} aria-label={site.name}>
          <span className={styles.mask} aria-hidden="true"><span style={{ "--i": 0 }}>{first}</span></span>
          <span className={styles.mask} aria-hidden="true"><span style={{ "--i": 1 }}>{last}</span></span>
        </h1>
        <p className={`lede ${styles.tag}`}>{site.tagline}</p>
        <ul className={styles.platforms} aria-label="Platforms I ship to">
          {site.platforms.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link className="button" href="/projects">See my work</Link>
          <Link className="button ghost" href="/contact">Get in touch</Link>
        </div>
      </div>
      <div className={styles.visual}>
        <RoutingDiagram />
      </div>
    </section>
  );
}
