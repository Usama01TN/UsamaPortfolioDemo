import Link from "next/link";
import { useState } from "react";
import ProjectCover from "./ProjectCover";
import { allTags } from "@/data/projects";
import styles from "./ProjectBrowser.module.css";

const fmt = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export default function ProjectBrowser({ projects }) {
  const [tag, setTag] = useState("All");
  const shown = tag === "All" ? projects : projects.filter((p) => p.tags.includes(tag));

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter projects by topic">
        {["All", ...allTags].map((t) => (
          <button key={t} className={styles.chip} aria-pressed={tag === t} onClick={() => setTag(t)}>
            {t}
          </button>
        ))}
      </div>
      <p className={`muted ${styles.count}`} aria-live="polite">
        Showing {shown.length} of {projects.length} projects
      </p>

      <ul className={styles.list}>
        {shown.map((p, i) => (
          <li key={p.slug} className={styles.item}>
            <Link href={`/projects/${p.slug}`} className={styles.cover} tabIndex={-1} aria-hidden="true">
              <ProjectCover project={p} priority={i < 2} />
            </Link>
            <div className={styles.text}>
              <p className={styles.kind}>{p.kind}</p>
              <h2 className={styles.name}>
                <Link href={`/projects/${p.slug}`}>{p.name}</Link>
              </h2>
              <p className={styles.summary}>{p.summary}</p>
              <ul className={styles.tags}>
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className={`muted ${styles.meta}`}>
                {p.stars > 0 && `${p.stars} ${p.stars === 1 ? "star" : "stars"} on GitHub`}
                {p.stars > 0 && p.pushedAt && ", "}
                {p.pushedAt && `${p.stars > 0 ? "last" : "Last"} pushed ${fmt(p.pushedAt)}`}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
