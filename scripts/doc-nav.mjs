/**
 * Shared subpage header — matches components/primitives.jsx Nav brand lockup.
 * Import: import { docNav, docFooterBrand } from "./doc-nav.mjs";
 */

const NAV_LINKS = [
  ["Home", "/", "home"],
  ["Litepaper", "/litepaper", "litepaper"],
  ["Tokenomics", "/tokenomics", "tokenomics"],
  ["Theory of Change", "/toc", "toc"],
  ["SDG", "/sdg", "sdg"],
  ["Investors", "/investors", "investors"],
];

const USER_GUIDE_URL = "https://decleanup.net/userguide";

const GOVERNANCE_URL =
  "https://app.gardens.fund/gardens/42220/0x6068dfc4f2aeca09d8d5845896f3aa76d0fe6960";

const FOOTER_LINKS = [
  ["LITEPAPER", "/litepaper"],
  ["THEORY OF CHANGE", "/toc"],
  ["SDG", "/sdg"],
  ["INVESTOR BRIEF", "/investors"],
  ["TERMS", "/terms"],
  ["PRIVACY", "/privacy"],
  ["GOVERNANCE", GOVERNANCE_URL, true],
];

/** Logo lockup only (icon PNG + wordmark PNG + kraft fallback text). */
export function docBrandLockup(homeHref = "/", assetPrefix = "") {
  const assets = `${assetPrefix}public/brand/`;
  return `<a href="${homeHref}" class="brand-lockup" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink)">
      <img src="${assets}logo-icon.png" alt="" class="logo-icon" width="30" height="30" style="display:block;border-radius:7px" />
      <img src="${assets}logo-wordmark.png" alt="DeCleanup Network" class="logo-wordmark" height="20" style="width:auto" />
      <span class="plakat logo-wordmark-text" style="font-size:22px;letter-spacing:0.02em">DeCleanup<span style="color:var(--ink-faint)">.Net</span></span>
    </a>`;
}

/**
 * Full doc-page nav: brand + links + back CTA (same structure as litepaper/tokenomics).
 * @param {{ active?: string, homeHref?: string }} opts — active page key: home | litepaper | tokenomics | toc | sdg | terms | privacy | investors
 */
export function docNav({ active = null, homeHref = "/" } = {}) {
  const linkHtml = NAV_LINKS.map(([label, href, key]) => {
    const extra = active === key ? ' style="color:var(--ink)"' : "";
    return `      <a class="nav-link" href="${href}"${extra}>${label}</a>`;
  }).join("\n");

  return `<nav class="nav" aria-label="Primary">
  <div class="nav-inner">
    ${docBrandLockup(homeHref)}
    <div class="nav-links">
${linkHtml}
      <a class="nav-link" href="${USER_GUIDE_URL}" target="_blank" rel="noopener noreferrer">User Guide</a>
    </div>
    <a class="btn btn-primary btn-mono nav-cta" href="${homeHref}" style="min-height:38px;padding:0 18px;font-size:11px;text-decoration:none">Back to home</a>
  </div>
</nav>`;
}

/**
 * Compact doc-page footer — matches tokenomics / litepaper / toc.
 * @param {{ excludeHref?: string }} opts — omit current page (e.g. "/terms" on terms.html)
 */
export function docFooter({ excludeHref = null } = {}) {
  const linkHtml = FOOTER_LINKS.filter(([, href]) => href !== excludeHref).map(([label, href, external]) => {
    const ext = external ? ' target="_blank" rel="noopener"' : "";
    return `        <a href="${href}"${ext} style="color:var(--ink-mute);text-decoration:none">${label}</a>`;
  }).join("\n");

  return `<footer class="site-footer">
  <div class="container">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
      <div class="meta">© 2026 DECLEANUP NETWORK · OPEN-SOURCE · MIT</div>
      <div class="meta" style="display:flex;gap:24px;flex-wrap:wrap">
${linkHtml}
        <span style="color:var(--ink-faint)">BUILT ON CELO + BASE</span>
      </div>
    </div>
  </div>
</footer>`;
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
export const LEGACY_NAV_LOGO = `<a href="/" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink)">
      <span style="width:28px;height:28px;border-radius:7px;background:var(--green);display:grid;place-items:center;font-family:var(--f-mono);font-weight:700;color:#0a0a0a;font-size:13px" aria-hidden="true">D</span>
      <span class="plakat" style="font-size:22px;letter-spacing:0.02em">DeCleanup<span style="color:var(--ink-faint)">.Net</span></span>
    </a>`;
