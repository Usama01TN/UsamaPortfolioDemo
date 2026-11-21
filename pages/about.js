import Image from "next/image";
import Link from "next/link";
import Seo from "@/components/Seo";
import SkillGroups from "@/components/SkillGroups";
import { site } from "@/data/site";
import styles from "@/styles/About.module.css";

export default function About() {
  return (
    <>
      <Seo title="About" path="/about" description={`About ${site.name}, a ${site.role.toLowerCase()} based in ${site.location}.`} />

      <section className={`wrap section ${styles.intro}`}>
        <div className={styles.photo}>
          <Image
            src={site.avatar}
            alt={`Portrait of ${site.name}`}
            width={480}
            height={480}
            sizes="(min-width: 52rem) 24rem, 70vw"
            priority
          />
        </div>
        <div>
          <h1 className={styles.title}>About</h1>
          <div className={`measure ${styles.prose}`}>
            <p className="lede">
              I am {site.name}, a {site.role.toLowerCase()} based in {site.location}. I build software that
              runs on Windows, macOS, Linux, Android, iOS and the web, often from a single codebase.
            </p>
            <p>
              On the native side I work with Qt in C++ and Python (PyQt and PySide). On the web I use
              TypeScript, React and Node.js, from the first component to the deploy.
            </p>
            <p>
              My favourite problems put many moving parts behind one clean interface: fifty OCR
              engines behind one API, six Qt bindings behind one import, a vision model behind one
              hotkey. I also build remote desktop tools, packaging and release pipelines, and AI
              integrations. Everything is on{" "}
              <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>.
            </p>
            <p>{site.availability}</p>
            <div className={styles.actions}>
              <Link className="button" href="/projects">See my work</Link>
              <Link className="button ghost" href="/contact">Contact me</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="skills">
        <h2 id="skills" className="h2" style={{ marginBottom: "2.75rem" }}>Skills</h2>
        <SkillGroups />
      </section>
    </>
  );
}
