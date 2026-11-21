import Link from "next/link";
import Seo from "@/components/Seo";
import ProjectCover from "@/components/ProjectCover";
import { projects, getProject } from "@/data/projects";
import { site } from "@/data/site";
import { getRepos, withStats } from "@/lib/github";
import styles from "@/styles/Project.module.css";

// Static generation with incremental regeneration: each page is built ahead of
// time and refreshed in the background every ten minutes.
export function getStaticPaths() {
  return { paths: projects.map((p) => ({ params: { slug: p.slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const base = getProject(params.slug);
  if (!base) return { notFound: true };
  const [project] = withStats([base], await getRepos());
  const i = projects.findIndex((p) => p.slug === base.slug);
  const pick = (p) => ({ slug: p.slug, name: p.name });
  return {
    props: {
      project,
      prev: pick(projects[(i - 1 + projects.length) % projects.length]),
      next: pick(projects[(i + 1) % projects.length]),
    },
    revalidate: 600,
  };
}

export default function ProjectPage({ project, prev, next }) {
  return (
    <>
      <Seo title={project.name} path={`/projects/${project.slug}`} description={project.summary} />

      <article className="wrap section">
        <Link href="/projects" className={styles.back}>All projects</Link>
        <p className={styles.kind}>{project.kind}</p>
        <h1 className={styles.title}>{project.name}</h1>
        <p className="lede muted">{project.summary}</p>

        <div className={styles.cover}>
          <ProjectCover project={project} priority sizes="(min-width: 72rem) 66rem, 100vw" />
        </div>

        <div className={styles.cols}>
          <div className={`${styles.prose} measure`}>
            {project.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
            <p className={styles.repoLinks}>
              {project.repos.map((r, i) => (
                <a key={r} className={i === 0 ? "button" : "button ghost"} href={`${site.github}/${r}`} target="_blank" rel="noopener noreferrer">
                  {project.repos.length > 1 ? r : "View on GitHub"}
                </a>
              ))}
            </p>
          </div>
          <aside aria-label="Project facts">
            <h2 className={styles.asideHead}>What it does</h2>
            <ul className={styles.facts}>
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <ul className={styles.tags}>
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </aside>
        </div>

        <nav className={styles.pager} aria-label="More projects">
          <Link href={`/projects/${prev.slug}`}><small>Previous</small>{prev.name}</Link>
          <Link href={`/projects/${next.slug}`}><small>Next</small>{next.name}</Link>
        </nav>
      </article>
    </>
  );
}
