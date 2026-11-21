# Usama Aininou, portfolio

A multi-page portfolio built with Next.js (Pages Router), CSS Modules and no UI libraries.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things are

| Folder | What it holds |
| --- | --- |
| `pages/` | File-based routes: `/`, `/about`, `/projects`, `/projects/[slug]`, `/contact`, `/api/contact`, `/sitemap.xml`, 404 |
| `components/` | Layout, hero routing animation, project list and filter, contact form |
| `styles/` and `*.module.css` | Global tokens plus CSS Modules |
| `data/` | **Edit these to change content**: `site.js`, `projects.js` (featured projects), `notes.js` (categories, descriptions, hidden repos), `skills.js`. `repos.json` is a snapshot of your GitHub repos, used only if the GitHub API is unreachable. |
| `public/projects/` | Project cover images (SVG) |
| `lib/github.js` | Reads all your public repos from the GitHub API and builds the archive |

## Rendering modes used

- `/` and `/about`: static generation.
- `/projects`: **server-side rendering** with `getServerSideProps`. Featured projects plus every other public repository, read live from GitHub and cached at the edge for 10 minutes.
- `/projects/[slug]`: static generation with `getStaticPaths` and incremental regeneration every 10 minutes.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repository at vercel.com/new. Next.js is detected automatically.
3. Add environment variables from `.env.example` (all optional):
   - `NEXT_PUBLIC_SITE_URL`: your final domain, used by canonical links and the sitemap.
   - `GITHUB_TOKEN`: raises the GitHub API rate limit.
   - `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`: deliver contact-form messages by email. Without them the form opens the visitor's email app instead.
4. Deploy.

Netlify and Render also work with `npm run build` and `npm start`. Static-only hosts such as GitHub Pages do not support the server-rendered `/projects` page or the API route.

## Adding or hiding projects

- A new GitHub repo appears automatically in **All repositories**. Give it a category or description in `data/notes.js`.
- To feature it with a cover image and its own page, add an entry to `data/projects.js` and a cover at `public/projects/<slug>.svg` (or any image, see `components/ProjectCover.js`).
- To hide a repo, add its name to `hidden` in `data/notes.js`.
