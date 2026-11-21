import Link from "next/link";
import { useState } from "react";
import ProjectCover from "./ProjectCover";
import styles from "./ProjectIndex.module.css";

export default function ProjectIndex({ projects }) {
  const [active, setActive] = useState(projects[0].slug);

  return (
    <div className={styles.grid}>
      <ul className={styles.list}>
        {projects.map((p) => (
          <li key={p.slug} data-active={active === p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className={styles.row}
              onMouseEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
            >
              <div className={styles.thumb}>
                <ProjectCover project={p} sizes="100vw" />
              </div>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.kind}>{p.kind}</span>
              <span className={`muted ${styles.summary}`}>{p.summary}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.preview} aria-hidden="true">
        {projects.map((p) => (
          <div key={p.slug} className={styles.frame} data-on={active === p.slug}>
            <ProjectCover project={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
