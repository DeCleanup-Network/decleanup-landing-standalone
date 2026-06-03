/* global React, window, MEMO_SECTIONS, CONTACT */
// ===========================
// Investor memo — shared primitives
// Dossier layout: sticky contents rail + document spine.
// ===========================

// Asset path helper — assets live under investors/public/
const img = (p) => p.replace(/^\/+/, "");

// ---------- CONTENTS RAIL (replaces the landing-style nav) ----------
function ContentsRail({ active }) {
  return (
    <aside className="memo-rail">
      <div>
        <a className="rail-brand" href="#top">
          <img src={img("public/brand/logo-icon.png")} alt="" width={30} height={30} />
          <span className="wm">DeCleanup</span>
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
        <a className="btn btn-primary btn-mono" style={{ minHeight: 40 }} href={CONTACT.email}>Contact founders</a>
        <a className="rail-back" href="https://decleanup.net">← Main site</a>
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
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: 40, marginBottom: 44 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <img src={img("public/brand/logo-icon.png")} alt="" width={36} height={36} style={{ display: "block", borderRadius: 8 }} />
              <span className="plakat" style={{ fontSize: 26, letterSpacing: "0.01em" }}>DeCleanup<span style={{ color: "var(--ink-faint)" }}>.Net</span></span>
            </div>
            <p className="serif" style={{ color: "var(--ink-mute)", fontSize: 16, lineHeight: 1.45, margin: 0, maxWidth: 380 }}>
              This memo is a companion to the public protocol. For how cleanups become verified impact, see the main site.
            </p>
          </div>
          <FooterCol title="Protocol" links={[
            ["Main site", "https://decleanup.net"],
            ["Litepaper", "https://decleanup.net/litepaper"],
            ["Tokenomics", "https://decleanup.net/tokenomics"],
            ["Theory of change", "https://decleanup.net/toc"],
            ["SDG alignment", "https://decleanup.net/sdg"],
            ["GitHub", "https://github.com/DeCleanup-Network"],
          ]} />
          <FooterCol title="Talk to us" links={[
            ["Email founders", CONTACT.email],
            ["Telegram", CONTACT.telegram],
            ["X / Twitter", CONTACT.x],
          ]} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid var(--line)", flexWrap: "wrap", gap: 16 }}>
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
