import Link from "next/link";
import Seo from "@/components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="wrap section">
        <h1 style={{ fontSize: "clamp(3rem, 9vw, 7rem)", letterSpacing: "-0.04em" }}>Page not found</h1>
        <p className="lede muted" style={{ margin: "1.25rem 0 2rem" }}>
          This address does not lead anywhere. Try one of the main pages instead.
        </p>
        <Link className="button" href="/">Back to home</Link>
      </section>
    </>
  );
}
