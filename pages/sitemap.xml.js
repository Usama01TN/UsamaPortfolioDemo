import { projects } from "@/data/projects";
import { site } from "@/data/site";

export async function getServerSideProps({ res }) {
  const paths = ["", "/about", "/projects", "/contact", ...projects.map((p) => `/projects/${p.slug}`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join("\n")}
</urlset>`;
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400");
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
