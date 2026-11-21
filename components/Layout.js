import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { site, nav } from "@/data/site";
import styles from "./Layout.module.css";

function Mark() {
  // A door arch, a nod to the blue doors of Tunisia.
  return (
    <svg className={styles.mark} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="currentColor" />
      <path d="M20 50V28a12 12 0 0 1 24 0v22z" fill="#fff" />
      <circle cx="38" cy="37" r="2.6" fill="#f0b429" />
    </svg>
  );
}

export default function Layout({ children }) {
  const { asPath } = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [asPath]);

  const isActive = (href) => asPath === href || asPath.startsWith(href + "/");

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={styles.header}>
        <div className={`wrap ${styles.bar}`}>
          <Link href="/" className={styles.brand} aria-label={`${site.name}, home`}>
            <Mark />
            <span>{site.name}</span>
          </Link>
          <button
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
          <nav id="site-nav" className={`${styles.nav} ${open ? styles.open : ""}`} aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? styles.active : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" key={asPath} className="page">{children}</main>

      <footer className={styles.footer}>
        <div className={`wrap ${styles.footInner}`}>
          <div>
            <p className={styles.footHead}>Have a project in mind?</p>
            <a className={styles.mail} href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <ul className={styles.links}>
            <li><a href={site.github} rel="noopener noreferrer" target="_blank">GitHub</a></li>
            <li><Link href="/projects">Work</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <p className={`wrap ${styles.legal}`}>
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>
      </footer>
    </>
  );
}
