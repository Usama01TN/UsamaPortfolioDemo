import { useState } from "react";
import { categories } from "@/data/notes";
import { site } from "@/data/site";
import styles from "./RepoArchive.module.css";

const fmt = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export default function RepoArchive({ repos }) {
  const [category, setCategory] = useState("All");
  const present = categories.filter((c) => repos.some((r) => r.category === c));
  const shown = category === "All" ? repos : repos.filter((r) => r.category === category);

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter repositories by category">
        {["All", ...present].map((c) => {
          const n = c === "All" ? repos.length : repos.filter((r) => r.category === c).length;
          return (
            <button key={c} className={styles.chip} aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c} <span className={styles.n}>{n}</span>
            </button>
          );
        })}
      </div>

      <ul className={styles.list}>
        {shown.map((r) => (
          <li key={r.name} className={styles.row}>
            <a className={styles.name} href={`${site.github}/${r.name}`} target="_blank" rel="noopener noreferrer">
              {r.name}
            </a>
            <p className={`muted ${styles.desc}`}>{r.description || "No description yet."}</p>
            <p className={styles.meta}>
              {r.fork && <span className={styles.badge}>Fork</span>}
              {r.language && <span>{r.language}</span>}
              {r.stars > 0 && <span>{r.stars} {r.stars === 1 ? "star" : "stars"}</span>}
              <span>Updated {fmt(r.pushedAt)}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
