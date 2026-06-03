/**
 * Shared subpage header — matches components/primitives.jsx Nav brand lockup.
 * Import: import { docNav, docFooterBrand } from "./doc-nav.mjs";
 */

const NAV_LINKS = [
  ["Home", "index.html", "home"],
  ["Litepaper", "litepaper.html", "litepaper"],
  ["Tokenomics", "tokenomics.html", "tokenomics"],
  ["Theory of Change", "toc.html", "toc"],
  ["SDG", "sdg.html", "sdg"],
  ["Investors", "investors/", "investors"],
];

/** Logo lockup only (icon PNG + wordmark PNG + kraft fallback text). */
export function docBrandLockup(homeHref = "index.html", assetPrefix = "") {
  const assets = `${assetPrefix}public/brand/`;
  return `<a href="${homeHref}" class="brand-lockup" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink)">
      <img src="${assets}logo-icon.png" alt="" class="logo-icon" width="30" height="30" style="display:block;border-radius:7px" />
      <img src="${assets}logo-wordmark.png" alt="DeCleanup Network" class="logo-wordmark" height="20" style="width:auto" />
      <span class="plakat logo-wordmark-text" style="font-size:22px;letter-spacing:0.02em">DeCleanup<span style="color:var(--ink-faint)">.Net</span></span>
    </a>`;
}

/**
 * Full doc-page nav: brand + links + back CTA (same structure as litepaper/tokenomics).
 * @param {{ active?: string }} opts — active page key: home | litepaper | tokenomics | toc | sdg | terms | privacy
 */
export function docNav({ active = null, homeHref = "index.html" } = {}) {
  const linkHtml = NAV_LINKS.map(([label, href, key]) => {
    const extra = active === key ? ' style="color:var(--ink)"' : "";
    return `      <a class="nav-link" href="${href}"${extra}>${label}</a>`;
  }).join("\n");

  return `<nav class="nav" aria-label="Primary">
  <div class="nav-inner">
    ${docBrandLockup(homeHref)}
    <div class="nav-links">
${linkHtml}
    </div>
    <a class="btn btn-primary btn-mono nav-cta" href="${homeHref}" style="min-height:38px;padding:0 18px;font-size:11px;text-decoration:none">Back to home</a>
  </div>
</nav>`;
}

/** Footer brand row — matches components/community.jsx SiteFooter lockup. */
export function docFooterBrand(assetPrefix = "") {
  const assets = `${assetPrefix}public/brand/`;
  return `<div class="brand-lockup" style="display:flex;align-items:center;gap:12px;margin-bottom:18px">
          <img src="${assets}logo-icon.png" alt="" class="logo-icon" width="36" height="36" style="display:block;border-radius:8px" />
          <img src="${assets}logo-wordmark.png" alt="DeCleanup Network" class="logo-wordmark" height="24" style="width:auto" />
          <span class="plakat logo-wordmark-text" style="font-size:28px;letter-spacing:0.02em">DeCleanup<span style="color:var(--ink-faint)">.Net</span></span>
        </div>`;
}

/** @deprecated Legacy inline “D” badge — do not use in new markup. */
export const LEGACY_NAV_LOGO = `<a href="index.html" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink)">
      <span style="width:28px;height:28px;border-radius:7px;background:var(--green);display:grid;place-items:center;font-family:var(--f-mono);font-weight:700;color:#0a0a0a;font-size:13px" aria-hidden="true">D</span>
      <span class="plakat" style="font-size:22px;letter-spacing:0.02em">DeCleanup<span style="color:var(--ink-faint)">.Net</span></span>
    </a>`;
