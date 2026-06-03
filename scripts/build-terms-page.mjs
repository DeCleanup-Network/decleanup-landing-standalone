#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { docNav, docFooterBrand } from "./doc-nav.mjs";

const ROOT = new URL("..", import.meta.url).pathname;

/** Replace em dashes in body copy (keep titles using ASCII hyphen). */
function noEmDash(s) {
  return s.replace(/\s*\u2014\s*/g, ", ").replace(/\u2014/g, "-");
}

function clause(n, title, bodyHtml) {
  return `<div class="legal-clause">
  <h3 class="legal-clause-title">${n}. ${title}</h3>
  ${bodyHtml}
</div>`;
}

function caps(text) {
  return `<p class="legal-caps">${text}</p>`;
}

function link(href, text, external) {
  const isExternal =
    external ??
    (href.startsWith("http") && !/decleanup\.net/i.test(href));
  const ext = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a href="${href}" class="legal-link"${ext}>${text}</a>`;
}

const callout = `<div class="legal-callout" role="note"><strong>Not legal advice.</strong> This document is a practical template for an early-stage Web3 project. Laws vary by country and change over time. Have qualified counsel review these terms before relying on them for a production launch, fundraising, or regulated activities.</div>`;

const generalClauses = [
  clause(1, "Acceptance", `<p>By accessing or using the Site, including browsing, following links, downloading materials, or contacting us, you agree to these Terms. If you do not agree, do not use the Site.</p>`),
  clause(2, "What the Site provides", `<p>The Site provides information about DeCleanup Network: mission, litepaper and tokenomics summaries, theory of change, developer and user guides, links to repositories, and pointers to separate applications (for example on Base or Celo). The Site does not itself execute blockchain transactions unless we explicitly add that functionality later. Onchain products have additional terms in Sections II and III. Where there is a conflict between Section I and a product-specific section, the product-specific section controls for that product only.</p>`),
  clause(3, "Eligibility", `<p>The Site is offered worldwide. You must be legally able to enter contracts where you live and at least 18 (or the age of majority there). You may not use the Site if barred under any applicable law. You are responsible for confirming that your use is permitted in your location.</p>`),
  clause(4, "No professional advice", `<p>Content on the Site is for general information only. It is not legal, tax, investment, environmental compliance, or other professional advice. Token, governance, and impact descriptions are not offers or solicitations to buy or sell any financial instrument.</p>`),
  clause(5, "Third-party links and services", `<p>The Site may link to GitHub, social platforms, donation or funding tools, block explorers, wallet providers, IPFS gateways, and deployed apps such as ${link("https://dapp.decleanup.net", "dapp.decleanup.net")}. We do not control those services; their terms and privacy practices apply when you use them.</p>`),
  clause(6, "Intellectual property", `<p>Unless stated otherwise, DeCleanup Network or its licensors own Site content, branding, and materials. Open-source code is subject to the licenses in the applicable repositories. You may not use our marks or copy Site content for commercial purposes without permission, except as allowed by law or open-source licenses.</p>`),
  clause(7, "Acceptable use", `<p>You agree not to use the Site to violate law or others' rights; attempt unauthorized access or distribute malware; or misrepresent affiliation with DeCleanup Network or submit false information through any contact channel we operate. We may restrict access where reasonably necessary to protect the Site, users, or legal compliance.</p>`),
  clause(8, "Disclaimers", caps(`TO THE MAXIMUM EXTENT PERMITTED BY LAW: THE SITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.`)),
  clause(9, "Limitation of liability", caps(`TO THE MAXIMUM EXTENT PERMITTED BY LAW: DECLEANUP AND ITS CONTRIBUTORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE. OUR TOTAL LIABILITY FOR ANY CLAIM IS LIMITED TO THE GREATER OF (A) USD $100 OR (B) AMOUNTS YOU PAID US IN FEES IN THE TWELVE MONTHS BEFORE THE CLAIM. Some jurisdictions do not allow certain limitations; in those cases, the limitations apply to the fullest extent allowed.`)),
  clause(10, "Indemnity", `<p>You will defend and indemnify DeCleanup Network and its affiliates, contributors, and personnel against claims, damages, losses, and expenses (including reasonable attorneys' fees) arising from your use of the Site, your content, or your violation of these Terms or applicable law.</p>`),
  clause(11, "Privacy", `<p>How we handle personal data is described in our ${link("privacy.html", "Privacy Policy")}, which also covers the Base and Celo applications operated by DeCleanup Network.</p>`),
  clause(12, "Changes", `<p>We may update these Terms by posting a revised version with a new effective date. Continued use after the effective date constitutes acceptance.</p>`),
  clause(13, "Global users; law and disputes", `<p>DeCleanup Network is a global project. Mandatory consumer, contract, or privacy rights under the laws of your country of residence are not waived by anything here. For disputes, you and DeCleanup Network should first try good-faith resolution via the contact method below. If that fails, claims may be brought in courts or tribunals of competent jurisdiction under applicable law.</p>`),
  clause(14, "Contact", `<p>Use the official support or legal contact published on ${link("https://decleanup.net", "decleanup.net")} or in linked applications.</p>`),
];

const baseIntro = `<p class="legal-major-scope">Section I applies to informational use of decleanup.net. This Section II governs your use of the Base Services. If there is a conflict, this section controls for those Services. Our smart contracts are upgradeable using the UUPS pattern to allow bug fixes, feature additions, and improvements while maintaining user data and balances.</p>`;

const baseClauses = [
  clause(1, "Introduction", `<p>These Terms govern your access to and use of DeCleanup Rewards on Base, including the Farcaster Mini App at ${link("https://miniapp.decleanup.net", "miniapp.decleanup.net")}. The Services enable users to document environmental cleanups, earn DCU points, claim $bDCU tokens, and participate in onchain verification and rewards. By using the Services, you agree to these Terms and our ${link("privacy.html", "Privacy Policy")}.</p>`),
  clause(2, "About the Services", `<p>DeCleanup Rewards on Base lets you: document cleanups through photo submissions; receive community verification; earn DCU points for cleanups, streaks, referrals, and verifications; claim $bDCU tokens; earn Impact Products (dynamic NFTs) representing verified environmental impact; stake $bDCU to become a verifier; and access the app via Farcaster Mini App, the Base app, or a standard web browser. $bDCU is the liquid action token for DeCleanup Rewards on Base, deployed via Clanker. Token prices are determined by market forces and are not guaranteed by us. DeCleanup Rewards operates independently and is not affiliated with, endorsed by, or in partnership with Base, Coinbase, Farcaster, or Clanker.</p>`),
  clause(3, "Eligibility", `<p>You must be at least 18 years old, have legal capacity to enter these Terms, not be located in a jurisdiction where use is prohibited, and comply with all applicable laws.</p>`),
  clause(4, "Wallets and wallet connection", `<p>To use certain features, you must connect a cryptocurrency wallet. You are responsible for your wallet security and private keys. We do not store, access, or control your wallet or private keys. You are solely responsible for all transactions initiated through your wallet. Transactions on Base are irreversible. Your wallet must be connected to the Base network. When using the Farcaster Mini App, your wallet may be connected automatically through the Farcaster or Base client.</p>`),
  clause(5, "Cleanup submissions", `<p>All submitted photos and information must be accurate and truthful. Submissions are subject to community verification. False or misleading submissions may result in rejection and suspension. Submitting a cleanup does not require a fee (submission fee is 0). A small claim fee may apply when claiming your Impact Product; the app shows the amount before you confirm. Photos are stored on IPFS and cannot be deleted once submitted.</p>`),
  clause(6, "DCU points and $bDCU token rewards", `<span class="legal-clause-label">DCU points</span><p>Earned for verified cleanups (10 pts), streak maintenance (1 pt), referrals (both parties get 3 pts each), verification activity (1 pt), and manual/retroactive rewards (variable). Points are tracked onchain and cannot be transferred. Claims require a minimum of 30 DCU points and Impact Product Level 3. Claim amounts are calculated based on accumulated points, current $bDCU market price, target reward value, and applicable multipliers. DCU points are not securities, investments, or financial instruments and carry no guaranteed value.</p><span class="legal-clause-label">$bDCU tokens</span><p>Token claims are irreversible onchain transactions. Claim amounts vary with token price. We do not guarantee any specific token value or USD equivalent. $bDCU tokens are cryptocurrency tokens whose prices are determined by market forces.</p><span class="legal-clause-label">Impact Products (NFTs)</span><p>Non-fungible tokens representing verified environmental cleanup activities. They are digital collectibles with no inherent monetary value, transferable under the ERC-721 standard, and evolve through 10 progressive levels (Newbie to Guardian).</p>`),
  clause(7, "Staking and verifier system", `<p>To become a verifier through staking, you must reach Impact Product Level 3 and stake at least 51% of your available $bDCU balance at the time of staking, maintaining that balance above 50% of the original stake. Verifiers can review and approve or reject submissions, earning 1 DCU per verification. Verifier status may also be granted manually by administrators. Verifier status may be revoked for fraudulent or manipulative behavior via slashing.</p>`),
  clause(8, "Fees", `<p>Submission fee is 0. A small claim fee may apply when claiming your Impact Product NFT; the app always displays the fee before you confirm. Fees are paid in ETH and are non-refundable. All onchain transactions also require network gas fees paid in ETH directly to the Base network.</p>`),
  clause(9, "User conduct", `<p>You agree not to submit false or fraudulent information; violate applicable laws; attempt to manipulate the verification, points, or rewards system; use bots or automated tools; interfere with the Services; infringe intellectual property rights; transmit malicious code; attempt to claim tokens or stake without meeting minimum requirements; or engage in wash trading or market manipulation of $bDCU.</p>`),
  clause(10, "Disclaimers", caps(`THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. We do not warrant uninterrupted or error-free service, accuracy of results, freedom from viruses, stability of token prices, or continued listing in Farcaster, Base, or other third-party directories.`)),
  clause(11, "Limitation of liability", caps(`TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUES, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF OR INABILITY TO USE THE SERVICES, INCLUDING LOSS OF DCU POINTS OR $bDCU TOKENS DUE TO USER ERROR, NETWORK ISSUES, TOKEN PRICE FLUCTUATIONS, OR REMOVAL OF THE APP FROM THIRD-PARTY PLATFORMS.`)),
  clause(12, "Indemnification", `<p>You agree to indemnify, defend, and hold harmless DeCleanup Network, its affiliates, and their officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising from your use of the Services, your violation of these Terms, your violation of any third-party rights, or your fraudulent use of the points or rewards system.</p>`),
  clause(13, "Third-party services", `<p>The Services integrate with Base network infrastructure, wallet providers, IPFS storage (Pinata), Farcaster and Base Mini App clients, Clanker, and other onchain services and protocols. We are not responsible for the availability, accuracy, or practices of any third-party services.</p>`),
  clause(14, "Compliance with laws", `<p>You are solely responsible for compliance with all applicable laws in your jurisdiction, including sanctions, anti-money laundering, tax reporting, environmental regulations, data protection, and privacy laws.</p>`),
  clause(15, "Modifications and termination", `<p>We reserve the right to modify, suspend, or discontinue the Services at any time; adjust DCU point values, multipliers, or reward structures; modify staking requirements or verifier criteria; and change fees with reasonable notice. We may terminate or suspend your access immediately for breach of these Terms. Upon termination, onchain assets (Impact Products, staked tokens) remain in your wallet according to contract terms.</p>`),
  clause(16, "Changes to Terms", `<p>We will notify you of material changes by posting updated Terms at ${link("https://miniapp.decleanup.net/terms", "miniapp.decleanup.net/terms")} and updating the effective date. Continued use constitutes acceptance.</p>`),
  clause(17, "Contact", `<p>Website: ${link("https://decleanup.net", "decleanup.net")} · ${link("https://miniapp.decleanup.net", "miniapp.decleanup.net")} · Farcaster: ${link("https://farcaster.xyz/decleanup", "@decleanup")} · Telegram: ${link("https://t.me/DecentralizedCleanup", "t.me/DecentralizedCleanup")}</p>`),
];

const celoIntro = `<p class="legal-major-scope">Section I applies to informational use of decleanup.net. This Section III governs your use of the Celo Service. If there is a conflict, this section controls.</p>`;

const celoClauses = [
  clause(1, "Acceptance", `<p>By accessing or using the Service, including connecting a wallet, submitting a cleanup, signing transactions, or browsing, you agree to these Terms. If you do not agree, do not use the Service.</p>`),
  clause(2, "Description of the Service", `<p>The Service provides interfaces and APIs for: submitting environmental cleanup evidence (photos, locations, optional forms) and interacting with smart contracts on Celo (Submission, DCURewardManager, ImpactProductNFT, $cDCU / ClaimVault as deployed); and optional features such as verifier workflows, leaderboards, Hypercerts flows, and machine-learning assistance where enabled. The Service is provided as-is and may change, pause, or end at any time.</p>`),
  clause(3, "Eligibility", `<p>The Service is offered worldwide. You must be legally able to enter contracts where you live and at least 18 (or the age of majority there). You may not use the Service if barred under any applicable law.</p>`),
  clause(4, "Wallets, keys, and onchain risks", `<p>You may sign in via Google or email (embedded smart account), MetaMask, or another WalletConnect wallet. For external wallets, you control your keys. For embedded wallets, keys are generated and encrypted on your device; we do not hold your private keys on our servers. We cannot recover lost keys, passkeys, or backups, or reverse most onchain transactions. Losing your device, backup, and passkey may mean permanent loss of access. Embedded users may receive sponsored transactions through a third-party paymaster where enabled; external wallet users pay CELO gas themselves. Onchain transactions are public and permanent. Smart contracts may contain bugs or be upgraded depending on deployment. Using onchain features is at your own risk. Always verify the network shown in your wallet before signing.</p>`),
  clause(5, "User conduct", `<p>You agree not to submit false, misleading, or stolen evidence; violate laws; infringe others' intellectual property, privacy, or publicity rights; attack or overload the Service; probe for vulnerabilities without authorization; circumvent rate limits or access controls; or use the Service to launder money, finance crime, or violate sanctions.</p>`),
  clause(6, "Your content and license to operate", `<p>You retain ownership of content you submit. You grant DeCleanup Network a non-exclusive, worldwide, royalty-free license to host, process, transmit, display, and store your content solely to operate, improve, and secure the Service, including storing hashes or media on IPFS and writing metadata onchain where you choose to transact. You represent that you have the rights needed to grant this license.</p>`),
  clause(7, "Points, tokens, rewards, and governance", `<p>DCU and participation metrics recorded onchain are not necessarily cash, securities, or a promise of future value. $cDCU may be minted through ClaimVault according to rules you configure; amounts, caps, eligibility, and schedules can change and may differ between deployments. Nothing on the Service is an offer to sell or solicitation to buy any financial instrument in any jurisdiction. These terms do not create a fiduciary relationship.</p>`),
  clause(8, "Third-party services", `<p>The Service may rely on wallet providers, RPC hosts, IPFS pinning services, hosting, analytics, Supabase or other databases, ML endpoints, and block explorers. Their terms and privacy practices apply.</p>`),
  clause(9, "Disclaimers", caps(`TO THE MAXIMUM EXTENT PERMITTED BY LAW: THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.`)),
  clause(10, "Limitation of liability", caps(`TO THE MAXIMUM EXTENT PERMITTED BY LAW: DECLEANUP AND ITS CONTRIBUTORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE OR BLOCKCHAIN INTERACTIONS. OUR TOTAL LIABILITY FOR ANY CLAIM IS LIMITED TO THE GREATER OF (A) USD $100 OR (B) AMOUNTS YOU PAID US IN FEES IN THE TWELVE MONTHS BEFORE THE CLAIM. Some jurisdictions do not allow certain limitations; in those cases the limitations apply to the fullest extent allowed.`)),
  clause(11, "Indemnity", `<p>You will defend and indemnify DeCleanup Network and its affiliates, contributors, and personnel against claims, damages, losses, and expenses (including reasonable attorneys' fees) arising from your use of the Service, your content, or your violation of these Terms or applicable law.</p>`),
  clause(12, "Privacy", `<p>Our ${link("privacy.html", "Privacy Policy")} describes how we handle personal data across the Site and the Celo Service.</p>`),
  clause(13, "Changes", `<p>We may update these Terms by posting a revised version with a new effective date. Continued use after the effective date constitutes acceptance.</p>`),
  clause(14, "Global users; law and disputes", `<p>DeCleanup Network is a global project. Mandatory consumer, contract, or privacy rights under the laws of your country of residence stay in effect and are not waived by anything here. You must comply with all laws that apply to you. For any dispute, you and DeCleanup Network should first try to resolve it in good faith using the contact method below. If informal resolution fails, claims may be brought in courts or tribunals of competent jurisdiction under applicable law.</p>`),
  clause(15, "Contact", `<p>Use the official support or legal contact published on ${link("https://decleanup.net", "decleanup.net")} or in the deployed application (for example footer links).</p><p>By using the Service, you acknowledge that you have read and understood these Terms.</p>`),
];

function section(id, badge, scope, metaHtml, clauses, extraBefore = "") {
  return `<section id="${id}" class="legal-major" aria-labelledby="${id}-title">
  <h2 id="${id}-title" class="legal-major-badge">${badge}</h2>
  <p class="legal-major-scope">${scope}</p>
  ${metaHtml}
  ${extraBefore}
  <div class="legal-prose">${clauses.join("\n")}</div>
</section>`;
}

const generalMeta = `<div class="legal-meta-card">
  <p><strong>Effective date:</strong> April 23, 2026<br />
  <strong>Operator:</strong> DeCleanup Network ("DeCleanup", "we", "us", "our")<br />
  <strong>Covered services:</strong> The website at ${link("https://decleanup.net", "decleanup.net")}, including www.decleanup.net, and related pages, documentation, and community or support channels we operate (collectively, the "Site").</p>
</div>`;

const baseMeta = `<div class="legal-meta-card"><p><strong>Last updated:</strong> May 2026</p></div>`;

const celoMeta = `<div class="legal-meta-card">
  <p><strong>Effective date:</strong> April 23, 2026<br />
  <strong>Service:</strong> ${link("https://dapp.decleanup.net", "dapp.decleanup.net")} and related APIs (collectively, the "Service")</p>
</div>`;

const article = [
  section("general", "I. General Terms", "Applies to decleanup.net, its content, and your use of DeCleanup Network information and links, unless a product-specific section below says otherwise.", generalMeta, generalClauses, callout),
  section("base", "II. Base Application (DeCleanup Rewards on Base)", "Applies to the DeCleanup Rewards application on Base, including the Farcaster Mini App and related web properties.", baseMeta, baseClauses, baseIntro),
  section("celo", "III. Celo Platform (DeCleanup dApp)", "Applies when you use the DeCleanup dApp and related APIs on Celo.", celoMeta, celoClauses, celoIntro),
].join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#0a0a0a" />
<meta name="color-scheme" content="dark light" />
<title>Terms of Service - DeCleanup Network</title>
<meta name="description" content="Terms of Service for decleanup.net, DeCleanup Rewards on Base, and the DeCleanup dApp on Celo." />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://decleanup.net/terms" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="DeCleanup Network" />
<meta property="og:title" content="Terms of Service - DeCleanup Network" />
<meta property="og:url" content="https://decleanup.net/terms" />
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
${docNav({ active: "terms" })}

<main>
  <header class="legal-page-hero">
    <div class="container">
      <p class="meta" style="color:var(--green);margin-bottom:12px">LEGAL</p>
      <h1 class="plakat" style="font-size:clamp(40px,6vw,64px);margin:0 0 12px;letter-spacing:0.02em;line-height:0.95">TERMS OF <span style="color:var(--green)">SERVICE</span></h1>
      <p class="serif" style="font-size:20px;color:var(--ink-mute);margin:0 0 8px;max-width:640px;line-height:1.4">Effective April 23, 2026 · DeCleanup Network</p>
      <p class="mono" style="font-size:12px;color:var(--ink-faint);margin:0">Also see our <a href="privacy.html" class="legal-link">Privacy Policy</a>.</p>
    </div>
  </header>

  <section class="section" style="padding-top:0;padding-bottom:80px">
    <div class="container">
      <details class="legal-toc-details">
        <summary>On this page</summary>
        <nav aria-label="Terms sections">
          <a href="#general" class="legal-link">I. General Terms</a>
          <a href="#base" class="legal-link">II. Base (Rewards)</a>
          <a href="#celo" class="legal-link">III. Celo Platform (DeCleanup dApp)</a>
          <a href="privacy.html" class="legal-link">Privacy Policy</a>
        </nav>
      </details>

      <div class="legal-layout">
        <aside class="legal-toc" aria-label="On this page">
          <p class="meta">ON THIS PAGE</p>
          <a href="#general" class="legal-link">I. General Terms</a>
          <a href="#base" class="legal-link">II. Base (Rewards)</a>
          <a href="#celo" class="legal-link">III. Celo Platform (DeCleanup dApp)</a>
          <div class="legal-toc-related">
            <p class="meta">RELATED</p>
            <a href="privacy.html" class="legal-link">Privacy Policy</a>
          </div>
        </aside>
        <article class="legal-article">${article}</article>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
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
          <li><a class="footer-link" href="terms.html" aria-current="page">Terms of service</a></li>
          <li><a class="footer-link" href="privacy.html">Privacy policy</a></li>
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
        <a href="terms.html" class="legal-link" aria-current="page">Terms of Service</a>
        ${link("privacy.html", "Privacy Policy")}
      </p>
    </div>
  </div>
</footer>
</body>
</html>`;

fs.writeFileSync(path.join(ROOT, "terms.html"), noEmDash(html));
console.log("Wrote terms.html", html.length, "bytes");
