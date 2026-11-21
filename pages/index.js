import Link from "next/link";
import Seo from "@/components/Seo";
import Hero from "@/components/Hero";
import ProjectIndex from "@/components/ProjectIndex";
import SkillGroups from "@/components/SkillGroups";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.home);
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />

      <section className="section wrap" aria-labelledby="work-title">
        <div className={styles.head}>
          <h2 id="work-title" className="h2">Selected work</h2>
          <Link href="/projects">All projects and repositories</Link>
        </div>
        <ProjectIndex projects={featured} />
      </section>

      <section className={`section ${styles.band}`} aria-labelledby="skills-title">
        <div className="wrap">
          <h2 id="skills-title" className="h2">What I work with</h2>
          <div className={styles.skills}>
            <SkillGroups />
          </div>
        </div>
      </section>
    </>
  );
}
