# DeCleanup Network — Landing (standalone build)

The **standalone** marketing landing page for [DeCleanup Network](https://decleanup-network.vercel.app).
Built as a single static HTML page that loads React + Babel from a CDN and compiles
JSX in the browser — **no build step, no bundler, no `npm install`**.

> ⚠️ This is **not** the same codebase as `DeCleanup-Network/decleanup-network.github.io`
> (that one is a separate Next.js app). This repo is the version that deploys to
> `decleanup-network.vercel.app` via the Vercel CLI.

## Run it locally

It needs the URL rewrites in `vercel.json` (e.g. `/hero.jsx` → `/components/hero.jsx`),
so a plain static server won't work. Use the bundled rewrite-aware dev server:

```bash
python3 .claude/preview-server.py      # serves http://localhost:8766
```

Then open <http://localhost:8766/>. (There's also a `.claude/launch.json` config named
`dcu-root` for the Claude Code preview tooling.)

## Deploy

Static site on Vercel, deployed from this folder via CLI:

```bash
vercel --prod
```

`vercel.json` maps the clean asset URLs and sets cache headers (`no-cache` on JS/CSS so
updates go live immediately). `.vercelignore` keeps backups, `v1/`, `pages/`, `.claude/`
and docs out of the deploy.

## Layout

| Path | What it is |
|------|------------|
| `index.html` | Entry point — meta/SEO, loads React+Babel, mounts the app |
| `components/*.jsx` | UI, compiled in-browser by Babel (`app`, `hero`, `sections`, `community`, `primitives`, `tweaks-panel`) |
| `stylesheets/styles.css` | All styling (served as `/styles.css` via rewrite) |
| `public/` | Images, logos, brand assets |
| `vercel.json` | Rewrites + cache/security headers |
| `docs/` | `ARCHITECTURE.md`, `DECISIONS.md`, `KNOWN_ISSUES.md` |
| `pages/`, `v1/` | Older / standalone snapshots (not deployed) |

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for a fuller map.

## Cache-busting

Asset `<link>`/`<script>` URLs in `index.html` carry a `?v=YYYYMMDD<x>` token. Bump it
when you change a `.jsx`/`.css` (or rely on the `no-cache` headers). `index.html` itself
revalidates every load, so new references are picked up immediately.
