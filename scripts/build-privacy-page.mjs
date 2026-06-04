#!/usr/bin/env node
/**
 * Regenerate privacy.html — run: node scripts/build-privacy-page.mjs
 */
import fs from "fs";
import path from "path";
import { docNav, docFooterBrand } from "./doc-nav.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const SUPPORT_EMAIL = "support@decleanup.net";

function noEmDash(s) {
  return s.replace(/\s*\u2014\s*/g, ", ").replace(/\u2014/g, "-");
}

function link(href, text, external) {
  const isExternal =
    external ?? (href.startsWith("http") && !/decleanup\.net/i.test(href));
  const ext = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a href="${href}" class="legal-link"${ext}>${text}</a>`;
}

function ul(items) {
  return `<ul class="legal-list">${items.map((i) => `<li>${i}</li>`).join("\n")}</ul>`;
}

function section(n, id, title, body, extraClass = "") {
  const cls = ["legal-section", extraClass].filter(Boolean).join(" ");
  return `<section id="${id}" class="${cls}" aria-labelledby="${id}-title">
  <h2 id="${id}-title" class="legal-h2">${n}. ${title}</h2>
  ${body}
</section>`;
}

const tocFlat = [
  ["#scope", "1. Scope"],
  ["#information-we-collect", "2. Information We Collect"],
  ["#what-we-do-not-collect", "3. What We Do Not Collect"],
  ["#how-we-use-data", "4. How We Use Data"],
  ["#legal-bases-eea-uk", "5. Legal Bases (EEA/UK)"],
  ["#sharing", "6. Sharing"],
  ["#base-and-farcaster", "7. Base and Farcaster"],
  ["#celo-platform", "8. Celo Platform"],
  ["#ipfs-and-photos", "9. IPFS and Photos"],
  ["#location", "10. Location"],
  ["#cookies-and-storage", "11. Cookies and Storage"],
  ["#onchain-data", "12. Onchain Data"],
  ["#retention", "13. Retention"],
  ["#your-choices", "14. Your Choices"],
  ["#your-rights", "15. Your Rights"],
  ["#children", "16. Children"],
  ["#international-transfers", "17. International Transfers"],
  ["#security", "18. Security"],
  ["#third-party-links", "19. Third-Party Links"],
  ["#changes", "20. Changes"],
  ["#contact", "21. Contact"],
];

const tocGroups = [
  { label: "Basics", links: tocFlat.slice(0, 6) },
  { label: "Products", links: tocFlat.slice(6, 8) },
  { label: "Data specifics", links: tocFlat.slice(8, 13) },
  { label: "Your rights", links: tocFlat.slice(13, 18) },
  { label: "Other", links: tocFlat.slice(18) },
];

function tocAside() {
  const groups = tocGroups
    .map(
      (g) => `<div class="legal-toc-group">
  <p class="legal-toc-group-label">${g.label}</p>
  ${g.links.map(([href, label]) => `<a href="${href}" class="legal-link">${label}</a>`).join("\n  ")}
</div>`
    )
    .join("\n");
  return `<aside class="legal-toc" aria-label="On this page">
  <p class="meta">ON THIS PAGE</p>
  ${groups}
  <div class="legal-toc-related">
    <p class="meta">RELATED</p>
    <a href="terms.html" class="legal-link">Terms of Service</a>
  </div>
</aside>`;
}

function tocMobile() {
  return `<details class="legal-toc-details">
  <summary>On this page</summary>
  <nav aria-label="Privacy sections">
    ${tocFlat.map(([href, label]) => `<a href="${href}" class="legal-link">${label}</a>`).join("\n    ")}
    <a href="terms.html" class="legal-link">Terms of Service</a>
  </nav>
</details>`;
}

const callout = `<div class="legal-callout" role="note"><strong>Not legal advice.</strong> This policy combines notices from the DeCleanup Network website, DeCleanup Rewards on Base, and the DeCleanup dApp on Celo. Have qualified privacy counsel review before production, especially for EU/UK (GDPR), California (CPRA), or other regulated regions.</div>`;

const sections = [
  section(
    1,
    "scope",
    "SCOPE",
    `<p><strong>Operator:</strong> DeCleanup Network ("DeCleanup", "we", "us", "our").</p>
<p>This Privacy Policy applies when you use:</p>
${ul([
  "<strong>decleanup.net:</strong> informational website, litepaper, tokenomics, and docs (the \"Site\")",
  `<strong>DeCleanup Rewards on Base:</strong> Farcaster Mini App and web surfaces at ${link("https://miniapp.decleanup.net", "miniapp.decleanup.net")} (the "Base Services")`,
  `<strong>DeCleanup dApp on Celo:</strong> full platform at ${link("https://dapp.decleanup.net", "dapp.decleanup.net")} and related APIs (the "Celo Service")`,
])}
<p>We publish one canonical policy on decleanup.net so you can see how each product handles data. Product-specific ${link("terms.html", "Terms of Service")} still apply per app. When you use a host client (Farcaster, Base app, or a wallet), that host's privacy policy also applies.</p>`
  ),
  section(
    2,
    "information-we-collect",
    "INFORMATION WE COLLECT",
    `<h3 class="legal-h3">Website (decleanup.net)</h3>
${ul([
  "<strong>Usage data:</strong> pages viewed, referrers, device and browser type, approximate region from IP via hosting or analytics.",
  "<strong>Contact data:</strong> email or messages you send us (content and metadata).",
  "<strong>Cookies and local storage:</strong> minimal technical preferences. The Site does not execute wallet transactions.",
])}
<h3 class="legal-h3">Base Services (mini app / web on Base)</h3>
${ul([
  "<strong>Cleanup submissions:</strong> before and after photos, geotags if you allow location, and related metadata.",
  "<strong>Wallet:</strong> public wallet address when you connect. We do not receive private keys.",
  "<strong>Referrals:</strong> referral relationships when you use or share referral links.",
  "<strong>Farcaster / Base Mini App context:</strong> when opened inside a Farcaster or Base client, we may receive your Farcaster ID (FID), username, display name, profile picture URL, and mini-app context from the host, not your Farcaster or wallet private keys.",
  "<strong>Onchain data on Base:</strong> wallet addresses, submission and verification records, DCU points, $bDCU claims, Impact Product NFTs, staking and verifier status, transaction hashes (public on the network).",
  "<strong>Device and browser:</strong> browser and OS data needed to run the app.",
  "<strong>Local storage:</strong> pending cleanup IDs, onboarding progress, verifier session flags (functional only, not for advertising).",
  "<strong>Security:</strong> bot detection and abuse prevention (for example Vercel Bot ID) where enabled.",
])}
<h3 class="legal-h3">Celo Service (dapp.decleanup.net)</h3>
${ul([
  "<strong>Wallet and onchain data:</strong> public wallet and smart-account addresses, transaction hashes, UserOperation receipts, token balances, and contract history (often public on Celo).",
  "<strong>Embedded sign-in (optional):</strong> Google or email via our auth stack (OAuth subject id, email, session tokens processed by the auth provider and Auth.js). We do not store your raw private key.",
  "<strong>Passkeys (optional):</strong> WebAuthn credential ids and public keys to verify unlock. Biometrics stay on your device.",
  "<strong>Cleanup submissions:</strong> photos, descriptions, locations, impact and recyclables forms, typically uploaded to IPFS or similar via our servers.",
  "<strong>Verifier and application data:</strong> status, reviewer notes, email if you provide it (for example via Supabase-backed flows).",
  "<strong>Technical logs:</strong> IP address, user agent, timestamps, errors, API rate limits.",
  "<strong>Gas sponsorship:</strong> where a paymaster sponsors transactions for embedded accounts, related metadata may be processed by that infrastructure.",
])}`
  ),
  section(
    3,
    "what-we-do-not-collect",
    "WHAT WE DO NOT COLLECT",
    `<div class="legal-warning" role="alert"><strong>Never share your private keys.</strong> Private keys, seed phrases, or signing passwords. Never share these with anyone claiming to be support.</div>
${ul([
  "Traditional passwords on Base (wallet-based access only).",
  "Payment card or bank account information through our apps.",
])}
<p>Encrypted wallet backups you export on Celo stay on your device unless you store them elsewhere yourself.</p>`
  ),
  section(
    4,
    "how-we-use-data",
    "HOW WE USE INFORMATION",
    `<p>We use collected information to:</p>
${ul([
  "Operate, secure, and improve the Site and applications.",
  "Process submissions, verification, rewards, governance, and support.",
  "Display profile, impact history, and onchain activity where the product provides those features.",
  "Send optional operational notifications (for example Telegram alerts to authorized verifier channels on Base, where configured).",
  "Prevent fraud, abuse, and automated bot activity.",
  `Debug outages and enforce our ${link("terms.html", "Terms")}.`,
  "Comply with law and respond to lawful requests.",
])}
<p>We do not sell your personal information. We do not use cleanup photos for unrelated advertising.</p>`
  ),
  section(
    5,
    "legal-bases-eea-uk",
    "LEGAL BASES (EEA / UK)",
    `<p>Where GDPR or UK GDPR applies, we rely on:</p>
${ul([
  "<strong>Contract:</strong> to provide the service you use.",
  "<strong>Legitimate interests:</strong> security, abuse prevention, non-invasive analytics.",
  "<strong>Consent:</strong> where required (optional cookies or marketing, if offered).",
  "<strong>Legal obligation:</strong> when the law requires processing or disclosure.",
])}`
  ),
  section(
    6,
    "sharing",
    "SHARING",
    `<p>We may share information with subprocessors that help us run the products, including:</p>
${ul([
  "<strong>Hosting and CDN:</strong> for example Vercel",
  "<strong>Blockchain:</strong> Base and Celo RPC providers, indexers, block explorers",
  "<strong>IPFS:</strong> for example Pinata (pinning cleanup media)",
  "<strong>Wallets and auth:</strong> WalletConnect, RainbowKit, Google OAuth, Auth.js (Celo embedded accounts)",
  "<strong>Farcaster:</strong> for example Neynar or similar APIs for profile lookups when you use the Mini App",
  "<strong>Databases:</strong> for example Supabase on Celo deployments",
  "<strong>Notifications:</strong> Telegram where configured for verifiers or ops",
  "<strong>Analytics and monitoring:</strong> if enabled",
])}
<p>We may disclose information when required by law or to protect users, the public, or our services. Each third party's privacy policy governs its own processing.</p>`
  ),
  section(
    7,
    "base-and-farcaster",
    "BASE AND FARCASTER MINI APP",
    `<span class="legal-scope-badge" aria-label="Applies to Base">BASE</span>
<p>Additional details for ${link("https://miniapp.decleanup.net", "miniapp.decleanup.net")}:</p>
${ul([
  'DeCleanup Rewards is built on Base. We use the term "onchain" per Base branding guidelines. We are not affiliated with Base, Coinbase, Farcaster, or Clanker.',
  "When you use the Services inside Warpcast, the Base app, or another Mini App client, the host client may collect data under its own policy in addition to this one.",
  "Photos are uploaded through our server-side flow to IPFS; see Section 9.",
  "Optional Telegram notifications may be sent to channels configured by operators (not direct marketing to you unless you opt in elsewhere).",
  `App-specific copies may also be posted at ${link("https://miniapp.decleanup.net/privacy", "miniapp.decleanup.net/privacy")}; if there is a conflict for Base-only use, the more specific in-app notice controls for that app only.`,
])}`,
    "legal-section--product-divider"
  ),
  section(
    8,
    "celo-platform",
    "CELO PLATFORM",
    `<span class="legal-scope-badge" aria-label="Applies to Celo">CELO</span>
<p>Additional details for ${link("https://dapp.decleanup.net", "dapp.decleanup.net")}:</p>
${ul([
  "You may sign in with MetaMask, WalletConnect, or an embedded smart account (Google or email). External wallets are self-custody; embedded keys are generated and encrypted on your device.",
  "Optional passkeys can gate unlock on your device; we store credential identifiers, not biometrics.",
  "Verifier onboarding and similar features may store application data in our database (for example Supabase).",
  "Smart contracts you approve may include Submission, reward managers, Impact Product NFTs, and $cDCU / ClaimVault; interactions are public on Celo.",
  "Always verify the network shown in your wallet before signing (testnet vs mainnet).",
])}`,
    "legal-section--product-divider"
  ),
  section(
    9,
    "ipfs-and-photos",
    "IPFS AND PHOTO STORAGE",
    `<p>When you submit cleanup photos through either app:</p>
${ul([
  "Photos are uploaded to IPFS (often via Pinata) through our infrastructure.",
  "Content may be cached on public IPFS gateways worldwide.",
  "Once published, photos generally cannot be reliably deleted from all nodes.",
  "Anyone with a content identifier (CID) or link may access the media.",
])}
<div class="legal-callout" role="note">Do not submit images containing personal information you do not want to be public.</div>`,
    "legal-section--product-divider"
  ),
  section(10, "location", "LOCATION DATA", `<p>If you enable location when submitting a cleanup (especially on Base), we may collect coordinates tied to your submission. This may be stored on IPFS and referenced onchain. You can decline location permissions; some features may be limited.</p>`),
  section(
    11,
    "cookies-and-storage",
    "COOKIES AND LOCAL STORAGE",
    `${ul([
      "<strong>Site:</strong> minimal functional storage only; no wallet transactions on decleanup.net itself.",
      "<strong>Base app:</strong> browser local storage for pending cleanups, onboarding, and verifier flags, not used for third-party advertising. Wallet providers may set their own cookies per their policies.",
      "<strong>Celo app:</strong> session and UI state as needed for embedded login and app operation. Configure a cookie banner if you add non-essential tracking.",
    ])}`
  ),
  section(
    12,
    "onchain-data",
    "ONCHAIN AND PUBLIC DATA",
    `<p>Blockchain activity on Base and Celo is public and often permanent. We do not control the permanence or visibility of onchain records. Wallet addresses can be linked to activity over time. Do not put sensitive personal data in onchain fields.</p>`
  ),
  section(
    13,
    "retention",
    "RETENTION",
    `${ul([
      "<strong>Onchain data:</strong> retained indefinitely on the relevant network.",
      "<strong>IPFS content:</strong> retained indefinitely unless technically impractical to remove.",
      "<strong>Browser local storage (Base):</strong> until you clear it or we invalidate it.",
      "<strong>Server logs:</strong> limited rolling retention (for example 30 to 90 days) unless longer is needed for security or law.",
      "<strong>Contact and support:</strong> as long as needed to respond and for reasonable records.",
      "<strong>Other personal data:</strong> as long as needed for the purposes above, then deleted or anonymized unless law requires longer retention.",
    ])}`
  ),
  section(
    14,
    "your-choices",
    "YOUR CHOICES",
    `<p>You can:</p>
${ul([
  "Choose not to connect a wallet (limited functionality).",
  "Decline camera or location permissions (limited functionality).",
  "Clear browser local storage in device settings.",
  "Stop using any product at any time.",
])}
<p>Historical public onchain and IPFS records may not be deletable after submission.</p>`
  ),
  section(
    15,
    "your-rights",
    "YOUR RIGHTS",
    `<p>Depending on where you live, you may have rights to access, correct, delete, export, restrict, or object to processing, and to withdraw consent. You may also lodge a complaint with a supervisory authority.</p>
<p>Contact us using the information in Section 21. We may need to verify your identity. We cannot erase public blockchain history or fully remove IPFS content in most cases.</p>`
  ),
  section(
    16,
    "children",
    "CHILDREN",
    `<p>Our applications are intended for users 18 and older (see Terms). The Site is not directed at children under 13 (or 16 where stricter rules apply). We do not knowingly collect data from children.</p>`
  ),
  section(
    17,
    "international-transfers",
    "INTERNATIONAL TRANSFERS",
    `<p>We and our providers may process data in the United States and other countries. Mandatory protections in your country of residence still apply. Where required, we use safeguards such as Standard Contractual Clauses for EEA and UK transfers.</p>`
  ),
  section(
    18,
    "security",
    "SECURITY",
    `<p>We use reasonable technical and organizational measures to protect data. No transmission or storage is 100% secure, especially for content replicated on public IPFS gateways. You are responsible for your wallet, passkey, backup, and device security.</p>`
  ),
  section(
    19,
    "third-party-links",
    "THIRD-PARTY LINKS AND SERVICES",
    `<p>Our products link to or integrate with Farcaster, Base, Celo, block explorers, IPFS gateways, Clanker, Gardens, Giveth, and other platforms. Their privacy practices are governed by their own policies. Review those policies before using third-party services.</p>`
  ),
  section(
    20,
    "changes",
    "CHANGES",
    `<p>We may update this policy with a new effective date on ${link("https://decleanup.net/privacy", "decleanup.net/privacy")}. Material changes may be announced on the Site or in-app. Continued use after the effective date means you accept the updated policy.</p>`
  ),
  section(
    21,
    "contact",
    "CONTACT",
    `<p>Privacy and data questions:</p>
<div class="legal-contact-card">
  <dl class="legal-contact-grid">
    <dt>Email</dt>
    <dd>${link(`mailto:${SUPPORT_EMAIL}`, SUPPORT_EMAIL)}</dd>
    <dt>Website</dt>
    <dd>${link("https://decleanup.net", "decleanup.net")}</dd>
    <dt>Base app</dt>
    <dd>${link("https://miniapp.decleanup.net", "miniapp.decleanup.net")}</dd>
    <dt>Celo app</dt>
    <dd>${link("https://dapp.decleanup.net", "dapp.decleanup.net")}</dd>
    <dt>Farcaster</dt>
    <dd>${link("https://farcaster.xyz/decleanup", "@decleanup")}</dd>
    <dt>Telegram</dt>
    <dd>${link("https://t.me/decentralizedcleanup", "t.me/decentralizedcleanup")}</dd>
  </dl>
</div>`
  ),
];

const footer = `<footer class="site-footer">
  <div class="container">
    <div style="display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px" class="footer-grid">
      <div>
        ${docFooterBrand()}
        <p class="serif" style="color:var(--ink-mute);font-size:17px;line-height:1.4;margin:0;max-width:340px">Cleanup verification protocol. Open-source. Live on Base + Celo.</p>
        <div style="margin-top:24px">
          <p class="meta" style="margin-bottom:10px;color:var(--ink)">Connect</p>
          <div style="display:flex;flex-wrap:wrap;gap:18px">
            <a class="footer-link" href="https://decleanup.net" target="_blank" rel="noopener noreferrer">Website</a>
            <a class="footer-link" href="https://github.com/DeCleanup-Network" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a class="footer-link" href="litepaper.html">Litepaper</a>
            <a class="footer-link" href="tokenomics.html">Tokenomics</a>
            <a class="footer-link" href="https://x.com/DeCleanupNet" target="_blank" rel="noopener noreferrer">X</a>
            <a class="footer-link" href="https://farcaster.xyz/decleanupnet" target="_blank" rel="noopener noreferrer">Farcaster</a>
            <a class="footer-link" href="https://t.me/decentralizedcleanup" target="_blank" rel="noopener noreferrer">Telegram</a>
            <a class="footer-link" href="https://giveth.io/project/decentralized-cleanup-network" target="_blank" rel="noopener noreferrer">Giveth</a>
          </div>
        </div>
      </div>
      <div>
        <h4 class="meta" style="margin-bottom:14px;color:var(--ink)">Resources</h4>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px">
          <li><a class="footer-link" href="litepaper.html">Litepaper</a></li>
          <li><a class="footer-link" href="tokenomics.html">Tokenomics</a></li>
          <li><a class="footer-link" href="toc.html">Theory of change</a></li>
          <li><a class="footer-link" href="sdg.html">SDG alignment</a></li>
          <li><a class="footer-link" href="investors/">Investor brief</a></li>
        </ul>
      </div>
      <div>
        <h4 class="meta" style="margin-bottom:14px;color:var(--ink)">Technical</h4>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px">
          <li><a class="footer-link" href="https://github.com/DeCleanup-Network" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a class="footer-link" href="https://decleanup.net/docs" target="_blank" rel="noopener noreferrer">Dev docs</a></li>
          <li><a class="footer-link" href="https://decleanup.net/userguide" target="_blank" rel="noopener noreferrer">User guide</a></li>
          <li><a class="footer-link" href="terms.html">Terms of service</a></li>
          <li><a class="footer-link" href="privacy.html" aria-current="page">Privacy policy</a></li>
        </ul>
      </div>
      <div>
        <h4 class="meta" style="margin-bottom:14px;color:var(--ink)">Support</h4>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px">
          <li><a class="footer-link" href="https://giveth.io/project/decentralized-cleanup-network" target="_blank" rel="noopener noreferrer">Donate on Giveth</a></li>
          <li><a class="footer-link" href="https://www.crowdwalrus.xyz/campaigns/decleanupnet" target="_blank" rel="noopener noreferrer">Fund on CrowdWalrus</a></li>
        </ul>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:24px;border-top:1px solid var(--line);flex-wrap:wrap;gap:16px">
      <p class="meta" style="margin:0">© 2026 DECLEANUP NETWORK · OPEN-SOURCE · MIT</p>
      <p class="meta legal-doc-footer-links" style="margin:0">
        ${link("https://decleanup.net/userguide", "User Guide", true)}
        ${link("terms.html", "Terms of Service")}
        <a href="privacy.html" class="legal-link" aria-current="page">Privacy Policy</a>
      </p>
    </div>
  </div>
</footer>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#0a0a0a" />
<meta name="color-scheme" content="dark light" />
<title>Privacy Policy - DeCleanup Network</title>
<meta name="description" content="Privacy Policy for decleanup.net, DeCleanup Rewards on Base (Farcaster Mini App), and the DeCleanup dApp on Celo." />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://decleanup.net/privacy" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="DeCleanup Network" />
<meta property="og:title" content="Privacy Policy - DeCleanup Network" />
<meta property="og:url" content="https://decleanup.net/privacy" />
<meta property="og:image" content="https://decleanup.net/og-image.jpg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.webmanifest" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" />
<link rel="stylesheet" href="styles.css" />
<link rel="stylesheet" href="legal.css?v=20260604b" />
</head>
<body class="legal-doc">
${docNav({ active: "privacy" })}

<main>
  <header class="legal-page-hero">
    <div class="container">
      <p class="meta" style="color:var(--green);margin-bottom:12px">LEGAL</p>
      <h1 class="plakat" style="font-size:clamp(40px,6vw,64px);margin:0 0 12px;letter-spacing:0.02em;line-height:0.95">PRIVACY <span style="color:var(--green)">POLICY</span></h1>
      <p class="serif" style="font-size:20px;color:var(--ink-mute);margin:0 0 8px;max-width:720px;line-height:1.4">Effective April 23, 2026 · Last updated June 2026 · DeCleanup Network</p>
      <p class="mono" style="font-size:12px;color:var(--ink-faint);margin:0 0 8px;max-width:720px;line-height:1.5">One policy for the website, the Base mini app, and the Celo platform.</p>
      <p class="mono" style="font-size:12px;color:var(--ink-faint);margin:0">Also see our <a href="terms.html" class="legal-link">Terms of Service</a>.</p>
    </div>
  </header>

  <section class="section" style="padding-top:0;padding-bottom:80px">
    <div class="container">
      ${tocMobile()}
      <div class="legal-layout">
        ${tocAside()}
        <article class="legal-article">
          ${callout}
          ${sections.join("\n")}
        </article>
      </div>
    </div>
  </section>
</main>

${footer}
</body>
</html>`;

fs.writeFileSync(path.join(ROOT, "privacy.html"), noEmDash(html));
console.log("Wrote privacy.html", html.length, "bytes");
