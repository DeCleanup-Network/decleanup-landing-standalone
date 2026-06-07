# Architecture

_Written for someone who understands the business but not necessarily the code._

## 1. What this is
The public landing page for DeCleanup Network — the site that explains the project to
visitors and points them to the apps. It is a **single web page**: one `index.html` plus
some script and style files. There is **no build step** — the browser itself turns the
code into the live page. This makes editing fast (change a file, refresh) but means it is
a lightweight marketing site, not the full application.

It is hosted on **Vercel** at `decleanup-network.vercel.app` and is published by running
one command (`vercel --prod`) from this folder.

> Note: the organisation also has a **separate, different** landing built with Next.js
> (`decleanup-network.github.io`). This repo is the standalone version. They are two
> independent codebases — see KNOWN_ISSUES.

## 2. File / directory map
- **`index.html`** — the page itself. Holds the title/description/social-share tags,
  loads React + Babel from a CDN, then loads the component files and starts the app.
- **`components/`** — the building blocks of the page, written in JSX:
  - `app.jsx` — assembles all the sections in order; holds the "Start" modal state.
  - `hero.jsx` — top banner ("Clean Local. Prove Global."), live impact numbers.
  - `sections.jsx` — the DMRV schematic, "how it works", the tech-stack ("Built on") grid.
  - `community.jsx` — photo collage, cleanup map, backers, footer.
  - `primitives.jsx` — shared pieces: the nav bar, glossary terms (the `?` popovers),
    counters, the "Start" modal.
  - `tweaks-panel.jsx` — a developer-only panel for trying theme/typography tweaks.
- **`stylesheets/styles.css`** — all the visual styling (colours, layout, responsive rules).
- **`public/`** — images, logos and brand assets.
- **`vercel.json`** — tells Vercel how to serve the files (clean URLs, caching, security).
- **`docs/`** — this file plus the decision log and the known-issues list.
- **`docs/developer/`** — integrator docs: [README.md](./developer/README.md), [COMMON.md](./developer/COMMON.md), [CELO.md](./developer/CELO.md), [BASE.md](./developer/BASE.md). Served at https://decleanup.net/docs when linked from the site.
- **`pages/`, `v1/`** — older snapshots, kept for reference, **not** part of the live site.
- **`terms.html`, `privacy.html`** — legal subpages (static HTML + `stylesheets/legal.css`). Privacy merges notices from the Base mini app and Celo dApp repos into one canonical page on decleanup.net.
- **`scripts/build-terms-page.mjs`** — generates `terms.html` (scannable layout + consolidated legal copy).
  Re-run after counsel updates the clause text in that script.

## 3. Data flow
- The page is mostly static text and images written into the components.
- The **live impact numbers** in the hero are the one dynamic piece: they fetch from
  `/api/impact/global`. Until the chain has indexed cleanups, that returns zeros, so the
  page shows "—" and "Live · coming Q4". They fill in automatically later.
- Everything else (sites, partners, copy) is hard-coded in the components and updated by
  editing those files.

## 4. External dependencies (and why)
- **React + ReactDOM (CDN)** — builds the interactive page.
- **Babel Standalone (CDN)** — converts the JSX component files into something the browser
  runs, live, with no build step. (Trade-off: simplicity now vs. slightly slower first load.)
- **Google Fonts** — Space Grotesk / Inter / Space Mono (the brand typography).
- **Vercel** — hosting + CDN.
- **`/api/impact/global`** — backend endpoint for live cleanup stats.

### Onchain references ($cDCU / governance)
Canonical URLs used across the landing, `tokenomics.html`, `litepaper.html`, `toc.html`,
and `investors/`:

| What | Value |
|------|--------|
| **$cDCU token (Celo)** | `0x34d66e9552e9dc23a24eca13bb1f8f71f4b9bfc1` — [Celoscan](https://celoscan.io/token/0x34d66e9552e9dc23a24eca13bb1f8f71f4b9bfc1) |
| **Governance (Gardens)** | [DeCleanup Network garden on Celo (chain 42220)](https://app.gardens.fund/gardens/42220/0x6068dfc4f2aeca09d8d5845896f3aa76d0fe6960) |

In JSX, these live in `components/primitives.jsx` as `LINKS.cDCU` (loaded before other
components). The investor memo duplicates them as `CDCU_LINKS` in `investors/data.jsx`.

## 5. Non-obvious decisions
- **No build step on purpose** — JSX is compiled in the browser by Babel. Fast to edit,
  but not a production-optimised bundle.
- **URL rewrites** — assets are referenced by short names (`/styles.css`, `/hero.jsx`)
  and `vercel.json` maps them to their real folders. Locally you must use the rewrite-aware
  dev server (`.claude/preview-server.py`), not a plain file server.
- **Cache-busting `?v=` tokens** — asset links carry a version tag so a deploy is seen
  immediately instead of a stale cached copy. JS/CSS are also served `no-cache`.
- **Glossary terms open a modal** — tapping a `?` opens a centred popup (works reliably on
  mobile); a hover tooltip is a desktop-only extra.

## 6. Known fragile areas (don't change without understanding)
- **`overflow-x: clip` on `html, body`** — stops sideways scrolling on mobile, but it
  *clips* (hides) anything wider than the screen instead of scrolling. If content looks
  cut off on a phone, something is too wide — fix the width, don't remove this guard.
- **Mobile menu must keep `pointer-events: none` when closed** — otherwise the invisible
  menu sits on top of the page and steals taps (this caused a real "tapping `?` jumps the
  page" bug).
- **Grid columns + long words on mobile** — grids use `min-width: 0` / `auto-fit` so a long
  word or wide logo doesn't blow the layout past the screen edge.
- **Two codebases** — make sure you're editing the right landing (this standalone vs. the
  Next.js repo) before spending time on changes.
