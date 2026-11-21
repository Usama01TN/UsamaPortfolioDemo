import Seo from "@/components/Seo";
import ProjectBrowser from "@/components/ProjectBrowser";
import RepoArchive from "@/components/RepoArchive";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { getRepos, withStats, buildArchive } from "@/lib/github";
import styles from "@/styles/Projects.module.css";

// Server-side rendering: the full repository list is fetched on the server for
// each request, then cached at the edge for ten minutes.
export async function getServerSideProps({ res }) {
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=3600");
  const repos = await getRepos();
  return { props: { projects: withStats(projects, repos), archive: buildArchive(repos) } };
}

export default function Projects({ projects, archive }) {
  return (
    <>
      <Seo
        title="Work"
        path="/projects"
        description="Open-source work by Usama Aininou: Qt apps in C++ and Python, React web apps, remote desktop tools, AI integrations and mobile build tooling."
      />
      <section className="wrap section">
        <h1 className={styles.title}>Work</h1>
        <p className="lede muted" style={{ margin: "1.25rem 0 2.5rem" }}>
          Featured projects first, then every other public repository, read live from GitHub.
        </p>
        <ProjectBrowser projects={projects} />
      </section>

      <section className={`section ${styles.band}`} aria-labelledby="archive-title">
        <div className="wrap">
          <h2 id="archive-title" className="h2">All repositories</h2>
          <p className="muted" style={{ margin: "1rem 0 2rem" }}>
            {archive.length} more on{" "}
            <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>, from desktop tools
            to web practice projects.
          </p>
          <RepoArchive repos={archive} />
        </div>
      </section>
    </>
  );
}
