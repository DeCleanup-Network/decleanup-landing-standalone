# Known Issues / Pending

## Open from 2026-05-31 cofounder feedback
- **Collage photos (point 11)** — DONE (balanced mix). Pulled originals from Figma (file `6TNkVzTBk3Wpj80GM2siVY`): the only high-res photos are the ReFi Phangan (Thailand) event; Japan/Nigeria/Tulum shots in Figma are the same low-res files already on site. Swapped `testimonial1.jpg` (hero → ReFi Phangan beach group, IMG_3929) and `testimonial3.jpg` (community large → bagging action, IMG_4474), both 1280px JPEG, captions updated to Koh Phangan/ReFi Phangan. Originals backed up `.bak.20260531-120000`.
  - Still low-res (no HQ source in Figma): `testimonial2.jpg` (HEM Japan, how-it-works) and `testimonial4.jpg` (Nsukka/Nigeria, community small tile) — kept so Japan + Nigeria stay represented. A HQ Tulum photo exists in Figma (IMG_8327) if a Tulum visual is wanted later.
- **Tulum & Moscow (point 14)** — added with placeholder `partner: "Independent"` and `events: "—"` (`components/community.jsx` `CLEANUP_POINTS`). Swap in real partner labels + counts when confirmed.
- **Live impact numbers (points 5/6)** — wired and working, but mainnet has no indexed cleanups yet (`/api/impact/global` returns 0), so hero shows "—" + "Live · coming Q4". Will populate automatically once verifications are indexed; re-check then.
- **Kraft (light) theme logo** — uses adaptive HTML text instead of the wordmark image (no dark wordmark asset). If kraft becomes a primary theme, export a black horizontal wordmark and wire it via the existing `logo-themed` two-image pattern.
- **favicons / og-image** — still the previous mark; optionally regenerate from the new logo for full consistency.

## Added 2026-06-01
- **TWO divergent landing codebases — pick a source of truth.** This folder is the **standalone** site (React-via-CDN + Babel, no build) deployed to `decleanup-network.vercel.app` via `vercel --prod` CLI, now in repo `DeCleanup-Network/decleanup-landing-standalone`. The org also has `DeCleanup-Network/decleanup-network.github.io`, a separate **Next.js** landing. They will drift apart. Decide which is canonical (and where each is hosted) before doing more landing work, or changes will need porting twice.
- **Standalone repo is heavy (~49 MB).** Scratch/legacy dirs are committed: `assets extra/`, `uploads/`, `screenshots 2/`, `v1/`, plus full-res images. Kept on first push to avoid data loss; prune what's truly unused (and consider Git LFS for big media) to slim the repo.
- **Glossary hover-tip on desktop is decorative only** — the real definition is the click→modal (works on all devices). The inline `.term-tip` is `display:none` on touch and a hover preview on desktop; fine, just noting the dual mechanism so it isn't "simplified" away by accident.

## Added 2026-06-03 (new pages / investor brief)
- **Canonical domain is split site-wide.** All canonical/OG URLs (index, sdg, the 4 new pages, sitemap) point to `decleanup-network.vercel.app`, but the footer nav and page branding use the custom domain `decleanup.net`. If `decleanup.net` is the real production domain, canonicals should point there (otherwise search engines may treat vercel.app as canonical). Decide one canonical host and apply across all pages + sitemap.
- **`investor-research-brief.md` is still in git history.** It was removed from HEAD (`git rm --cached`) and `docs/research/` is now ignored, but the earlier public push means the file is recoverable from history. Scrub history (filter-repo) only if the content is sensitive enough to warrant it.
- **`investors/public/` ships ~1.1 MB of testimonial JPEGs** (testimonial1/2/5, ~370 KB each) that may duplicate root `/public` images and aren't all referenced by the memo — prune unused ones to slim the deploy.
- **`investors/tweaks-panel.jsx` (~24 KB) ships to production but is inert** — it only renders when a host posts `__activate_edit_mode` (the editing harness), so it stays hidden for real visitors. Same dev-tool pattern as the main site; harmless, just dead weight.
