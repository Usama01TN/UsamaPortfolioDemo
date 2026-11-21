import { site } from "@/data/site";
import { featuredRepoNames } from "@/data/projects";
import { hidden, notes } from "@/data/notes";
import snapshot from "@/data/repos.json";

// Small in-memory cache so one busy minute does not exhaust GitHub's
// unauthenticated limit (60 requests per hour).
const TTL = 10 * 60 * 1000;
let cache = { at: 0, data: null };

// Returns every public repository: live from GitHub when possible,
// otherwise the snapshot stored in data/repos.json.
export async function getRepos() {
  if (cache.data && Date.now() - cache.at < TTL) return cache.data;
  try {
    const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(
      `https://api.github.com/users/${site.handle}/repos?per_page=100&sort=pushed`,
      { headers, signal: AbortSignal.timeout(4000) }
    );
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const data = (await res.json()).map((r) => ({
      name: r.name,
      description: r.description || "",
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
      fork: r.fork,
    }));
    cache = { at: Date.now(), data };
    return data;
  } catch {
    return cache.data || snapshot;
  }
}

export function withStats(projects, repos) {
  const byName = Object.fromEntries(repos.map((r) => [r.name, r]));
  return projects.map((p) => {
    const found = p.repos.map((n) => byName[n]).filter(Boolean);
    return {
      ...p,
      repo: p.repos[0],
      stars: found.reduce((sum, r) => sum + r.stars, 0),
      pushedAt: found.length ? found.map((r) => r.pushedAt).sort().at(-1) : null,
    };
  });
}

// Repositories that are not featured, with a category and description each.
export function buildArchive(repos) {
  return repos
    .filter((r) => !featuredRepoNames.has(r.name) && !hidden.includes(r.name))
    .map((r) => {
      const n = notes[r.name] || {};
      return {
        name: r.name,
        description: n.desc || r.description || "",
        language: r.language,
        stars: r.stars,
        pushedAt: r.pushedAt,
        fork: r.fork,
        category: n.category || guessCategory(r),
      };
    });
}

function guessCategory(r) {
  if (["HTML", "CSS", "JavaScript", "TypeScript"].includes(r.language)) return "Web";
  if (["Python", "C++", "C"].includes(r.language)) return "Desktop";
  return "Practice";
}
