import Seo from "@/components/Seo";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";
import styles from "@/styles/Contact.module.css";

export default function Contact() {
  return (
    <>
      <Seo title="Contact" path="/contact" description={`Send ${site.name} a message about a project.`} />
      <section className={`wrap section ${styles.grid}`}>
        <div>
          <h1 className={styles.title}>Contact</h1>
          <p className="lede muted">
            Tell me what you are building, whether it is for desktop, mobile or web. I read every message and reply by email.
          </p>
          <dl className={styles.details}>
            <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
            <div><dt>GitHub</dt><dd><a href={site.github} target="_blank" rel="noopener noreferrer">{site.handle}</a></dd></div>
            <div><dt>Based in</dt><dd>{site.location}</dd></div>
            <div><dt>Availability</dt><dd>{site.availability}</dd></div>
          </dl>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
