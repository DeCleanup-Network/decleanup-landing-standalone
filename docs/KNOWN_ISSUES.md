# Known Issues / Pending

## Open from 2026-05-31 cofounder feedback
- **Collage photos (point 11)** — DONE (balanced mix). Pulled originals from Figma (file `6TNkVzTBk3Wpj80GM2siVY`): the only high-res photos are the ReFi Phangan (Thailand) event; Japan/Nigeria/Tulum shots in Figma are the same low-res files already on site. Swapped `testimonial1.jpg` (hero → ReFi Phangan beach group, IMG_3929) and `testimonial3.jpg` (community large → bagging action, IMG_4474), both 1280px JPEG, captions updated to Koh Phangan/ReFi Phangan. Originals backed up `.bak.20260531-120000`.
  - Still low-res (no HQ source in Figma): `testimonial2.jpg` (HEM Japan, how-it-works) and `testimonial4.jpg` (Nsukka/Nigeria, community small tile) — kept so Japan + Nigeria stay represented. A HQ Tulum photo exists in Figma (IMG_8327) if a Tulum visual is wanted later.
- **Tulum & Moscow (point 14)** — added with placeholder `partner: "Independent"` and `events: "—"` (`components/community.jsx` `CLEANUP_POINTS`). Swap in real partner labels + counts when confirmed.
- **Live impact numbers (points 5/6)** — wired and working, but mainnet has no indexed cleanups yet (`/api/impact/global` returns 0), so hero shows "—" + "Live · coming Q4". Will populate automatically once verifications are indexed; re-check then.
- **Kraft (light) theme logo** — uses adaptive HTML text instead of the wordmark image (no dark wordmark asset). If kraft becomes a primary theme, export a black horizontal wordmark and wire it via the existing `logo-themed` two-image pattern.
- **favicons / og-image** — still the previous mark; optionally regenerate from the new logo for full consistency.
