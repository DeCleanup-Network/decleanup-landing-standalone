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

const USER_GUIDE_URL = "/#guide";

const GOVERNANCE_URL =
  "https://app.gardens.fund/gardens/42220/0x6068dfc4f2aeca09d8d5845896f3aa76d0fe6960";

const CONNECT_LINKS = [
  ["Telegram", "https://t.me/decentralizedcleanup", true],
  ["X @decleanupnet", "https://x.com/decleanupnet", true],
  ["Farcaster @decleanupnet", "https://farcaster.xyz/decleanupnet", true],
  ["GitHub", "https://github.com/DeCleanup-Network", true],
  ["support@decleanup.net", "mailto:support@decleanup.net", false],
];

const RESOURCE_LINKS = [
  ["Litepaper", "/litepaper"],
  ["Tokenomics", "/tokenomics"],
  ["Theory of change", "/toc"],
  ["SDG alignment", "/sdg"],
  ["Investor brief", "/investors"],
  ["User guide", USER_GUIDE_URL, false, true], // data-guide-picker
  ["Dev docs", "/docs"],
  ["Terms of service", "/terms"],
  ["Privacy policy", "/privacy"],
  ["Publications", "https://paragraph.com/@decleanupnet", true],
];

const SUPPORT_LINKS = [
  ["$cDCU governance (Gardens)", GOVERNANCE_URL, true],
  ["Donate on Giveth", "https://giveth.io/project/decentralized-cleanup-network", true],
  ["Fund on CrowdWalrus", "https://www.crowdwalrus.xyz/campaigns/decleanupnet", true],
  ["Trade $bDCU on Uniswap", "https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0x30171b7014c02229497CdE6745DD3aD821F12b07", true],
];

function linkItem([label, href, external = false, guidePicker = false], excludeHref) {
  if (href === excludeHref) return "";
  const ext = external || (href.startsWith("http") && !href.startsWith("mailto:"));
  const target = ext ? ' target="_blank" rel="noopener noreferrer"' : "";
  const guide = guidePicker ? " data-guide-picker" : "";
  return `          <li><a class="footer-link" href="${href}"${target}${guide}>${label}</a></li>`;
}

function footerAccCard(title, links, excludeHref, open = false) {
  const items = links.map((l) => linkItem(l, excludeHref)).filter(Boolean).join("\n");
  return `      <details class="footer-acc-card"${open ? " open" : ""}>
        <summary class="footer-acc-summary">${title}</summary>
        <ul class="footer-acc-list">
${items}
        </ul>
      </details>`;
}

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
      <a class="nav-link" href="${USER_GUIDE_URL}" data-guide-picker>User Guide</a>
    </div>
    <a class="btn btn-primary btn-mono nav-cta" href="${homeHref}" style="min-height:38px;padding:0 18px;font-size:11px;text-decoration:none">Back to home</a>
  </div>
</nav>`;
}

/**
 * Expandable Connect / Resources / Support footer cards.
 * @param {{ excludeHref?: string, assetPrefix?: string }} opts
 */
export function docFooter({ excludeHref = null, assetPrefix = "" } = {}) {
  return `<footer class="site-footer">
  <div class="container">
    ${docFooterBrand(assetPrefix)}
    <div class="footer-acc">
${footerAccCard("Connect", CONNECT_LINKS, excludeHref, true)}
${footerAccCard("Resources", RESOURCE_LINKS, excludeHref, true)}
${footerAccCard("Support", SUPPORT_LINKS, excludeHref, true)}
    </div>
    <div class="footer-acc-meta">
      <div class="meta">© 2026 DECLEANUP NETWORK · OPEN-SOURCE · MIT</div>
      <div class="meta" style="display:flex;gap:20px;flex-wrap:wrap">
        <span>SDG 11 · 12 · 13 · 14 · 15</span>
        <span style="color:var(--ink-faint)">BUILT ON CELO + BASE</span>
      </div>
    </div>
  </div>
</footer>`;
}

/** Footer brand row — matches components/community.jsx SiteFooter lockup. */
export function docFooterBrand(assetPrefix = "") {
  const assets = `${assetPrefix}public/brand/`;
  return `<div class="brand-lockup" style="display:flex;align-items:center;gap:12px;margin-bottom:28px">
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
