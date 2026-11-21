import Head from "next/head";
import { site } from "@/data/site";

export default function Seo({ title, description = site.description, path = "" }) {
  const full = title ? `${title} | ${site.name}` : `${site.name}, ${site.role}`;
  const url = `${site.url}${path}`;
  return (
    <Head>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta name="theme-color" content="#1b54b5" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </Head>
  );
}
