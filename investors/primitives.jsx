/* global React, window, MEMO_SECTIONS, CONTACT */
// ===========================
// Investor memo — shared primitives
// Dossier layout: sticky contents rail + document spine.
// ===========================

// Asset path helper — assets live under investors/public/.
// Absolute /investors/ prefix so paths resolve correctly when the page is
// served at the clean URL /investors (no trailing slash) — a relative
// "public/..." would otherwise resolve against the site root and 404.
const img = (p) => "/investors/" + p.replace(/^\/+/, "");

// ---------- CONTENTS RAIL (replaces the landing-style nav) ----------
function ContentsRail({ active }) {
  return (
    <aside className="memo-rail">
      <div>
        <a className="rail-brand brand-lockup" href="#top">
          <img src={img("public/brand/logo-icon.png")} alt="" className="logo-icon" width={30} height={30} style={{ display: "block", borderRadius: 7 }} />
          <img src={img("public/brand/logo-wordmark.png")} alt="DeCleanup Network" className="logo-wordmark" height={20} style={{ width: "auto" }} />
          <span className="plakat logo-wordmark-text wm">DeCleanup<span style={{ color: "var(--ink-faint)" }}>.Net</span></span>
        </a>
        <div className="rail-doc">Investor Memo</div>
        <div className="rail-rev"><span className="live-dot"></span> REV 2026.06 · LIVE</div>
      </div>

      <ol className="toc">
        {MEMO_SECTIONS.map((s) => (
          <li key={s.id}>
            <a href={"#" + s.id} className={active === s.id ? "is-active" : ""}>
              <span className="num">{s.num}</span>
              <span className="lbl">{s.label}</span>
            </a>
          </li>
        ))}
      </ol>

      <div className="rail-cta">
        <a className="btn btn-primary btn-mono" href={CONTACT.inquiryMailto} style={{ minHeight: 40, textDecoration: "none" }}>Email support</a>
        <a className="rail-back" href="https://decleanup.net">Main site</a>
      </div>
    </aside>
  );
}

// ---------- SECTION HEADER (memo style) ----------
function MemoHead({ num, kicker, title, lede }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div className="sec-kicker">
        <span className="n">{num}</span>
        <span className="t">· {kicker}</span>
      </div>
      <h2 className="memo-h">{title}</h2>
      {lede && <p className="memo-lede">{lede}</p>}
    </div>
  );
}

function ChainPill({ chain }) {
  const map = {
    base: { mark: "public/base-mark.svg", label: "BASE" },
    celo: { mark: "public/celo-mark.svg", label: "CELO" },
  };
  const c = map[chain];
  return (
    <span className={`chain-pill ${chain}`}>
      <img src={img(c.mark)} alt="" width={14} height={14} onError={(e) => { e.currentTarget.style.display = "none"; }} />
      {c.label}
    </span>
  );
}

// ---------- FOOTER ----------
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="brand-lockup" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <img src={img("public/brand/logo-icon.png")} alt="" className="logo-icon" width={36} height={36} style={{ display: "block", borderRadius: 8 }} />
          <img src={img("public/brand/logo-wordmark.png")} alt="DeCleanup Network" className="logo-wordmark" height={24} style={{ width: "auto" }} />
          <span className="plakat logo-wordmark-text" style={{ fontSize: 26, letterSpacing: "0.01em" }}>DeCleanup<span style={{ color: "var(--ink-faint)" }}>.Net</span></span>
        </div>
        <div className="footer-acc">
          <FooterAcc title="Connect" links={[
            ["Telegram", CONTACT.telegram],
            [`X ${CONTACT.handle}`, CONTACT.x],
            [`Farcaster ${CONTACT.handle}`, CONTACT.farcaster],
            ["GitHub", "https://github.com/DeCleanup-Network"],
            ["Email support", CONTACT.email],
          ]} />
          <FooterAcc title="Resources" links={[
            ["Main site", "https://decleanup.net"],
            ["Litepaper", "https://decleanup.net/litepaper"],
            ["Tokenomics", "https://decleanup.net/tokenomics"],
            ["Theory of change", "https://decleanup.net/toc"],
            ["SDG alignment", "https://decleanup.net/sdg"],
            ["User guide", "https://decleanup.net/#guide"],
            ["Developer docs", "https://decleanup.net/docs"],
            ["Terms of service", "https://decleanup.net/terms"],
            ["Privacy policy", "https://decleanup.net/privacy"],
          ]} />
          <FooterAcc title="Support" links={[
            ["$cDCU governance (Gardens)", "https://app.gardens.fund/gardens/42220/0x6068dfc4f2aeca09d8d5845896f3aa76d0fe6960"],
            ["Donate on Giveth", "https://giveth.io/project/decentralized-cleanup-network"],
            ["Fund on CrowdWalrus", "https://www.crowdwalrus.xyz/campaigns/decleanupnet"],
            ["Trade $bDCU on Uniswap", "https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0x30171b7014c02229497CdE6745DD3aD821F12b07"],
          ]} />
        </div>
        <div className="footer-acc-meta">
          <div className="meta">© 2026 DECLEANUP NETWORK · OPEN-SOURCE · INFORMATION ONLY</div>
          <div className="meta" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <span>SDG 11 · 12 · 13 · 14 · 15</span>
            <span style={{ color: "var(--ink-faint)" }}>BUILT ON CELO + BASE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterAcc({ title, links }) {
  return (
    <details className="footer-acc-card" open>
      <summary className="footer-acc-summary">{title}</summary>
      <ul className="footer-acc-list">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="footer-link" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{label}</a>
          </li>
        ))}
      </ul>
    </details>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="meta" style={{ marginBottom: 14, color: "var(--ink)" }}>{title}</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="footer-link" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, { img, ContentsRail, MemoHead, ChainPill, Footer, FooterCol });
