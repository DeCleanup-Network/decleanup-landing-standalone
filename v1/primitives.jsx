/* global React */
// ===========================
// Shared primitives & nav
// ===========================
const { useState, useEffect, useRef } = React;

// Resource resolver — supports both dev (relative paths) and inline-bundled standalone
// where window.__resources maps original path → blob URL.
function img(path) {
  if (typeof window !== "undefined" && window.__resources) {
    // Try several lookups: full path, basename, and various id variants
    const direct = window.__resources[path];
    if (direct) return direct;
    const base = path.split("/").pop();
    if (window.__resources[base]) return window.__resources[base];
    const id = base.replace(/\.[^.]+$/, "").replace(/[^a-z0-9]/gi, "");
    if (window.__resources[id]) return window.__resources[id];
  }
  return path;
}

function Chip({ children, amber, mono }) {
  return (
    <span className={`chip ${amber ? "amber" : ""}`}>
      <span className="dot"></span>
      <span className={mono ? "mono" : ""}>{children}</span>
    </span>
  );
}

function Tag({ children }) {
  return <span className="meta">{children}</span>;
}

function MetaLine({ label, value, mono }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "8px 0", borderBottom: "1px dashed var(--line)" }}>
      <span className="meta" style={{ flexShrink: 0 }}>{label}</span>
      <span className={mono ? "mono" : ""} style={{ fontSize: 13, color: "var(--ink)", textAlign: "right" }}>{value}</span>
    </div>
  );
}

// Nav
function Nav({ onLaunch, palette, onTogglePalette }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const isDark = palette !== "kraft";
  return (
    <nav className="nav" style={{ borderBottomColor: scrolled ? "var(--line)" : "transparent" }}>
      <div className="nav-inner">
        <a href="#top" className="brand-lockup" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--ink)" }}>
          <img src={img("public/brand/logo-icon.png")} alt="" className="logo-icon" width={30} height={30} style={{ display: "block", borderRadius: 7 }} />
          <img src={img("public/brand/logo-wordmark.png")} alt="DeCleanup Network" className="logo-wordmark" height={20} style={{ width: "auto" }} />
          <span className="plakat logo-wordmark-text" style={{ fontSize: 22, letterSpacing: "0.02em" }}>DeCleanup<span style={{ color: "var(--ink-faint)" }}>.Net</span></span>
        </a>
        <div className="nav-links">
          <a className="nav-link" href="#what">What</a>
          <a className="nav-link" href="#how">How</a>
          <a className="nav-link" href="#ecosystem">Ecosystem</a>
          <a className="nav-link" href="#community">Community</a>
          <a className="nav-link" href="#impact">Impact</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onTogglePalette}
            aria-label={isDark ? "Switch to Kraft Paper (light)" : "Switch to Field Dark"}
            title={isDark ? "Switch to Kraft Paper" : "Switch to Field Dark"}
            style={{
              width: 38, height: 38,
              display: "grid", placeItems: "center",
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              cursor: "pointer",
              color: "var(--ink)",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--ink)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line)"}
          >
            {isDark ? (
              // Sun icon (we're dark → click to go light)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              // Moon icon (we're light → click to go dark)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <button className="btn btn-primary btn-compact" onClick={onLaunch}>
            Start Cleaning ↗
          </button>
        </div>
      </div>
    </nav>
  );
}

// Modal — "Where do you want to start?"
function StartModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div className="meta" style={{ marginBottom: 6 }}>STEP 01 · CHOOSE ENTRY POINT</div>
            <h2 className="plakat" style={{ fontSize: 32, margin: 0, letterSpacing: "0.01em" }}>Where do you want to start?</h2>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: "none", color: "var(--ink-mute)", cursor: "pointer", padding: 6, fontSize: 20 }}>×</button>
        </div>
        <p className="serif" style={{ color: "var(--ink-mute)", fontSize: 17, marginTop: 12, marginBottom: 20 }}>
          Same protocol, three doors. Pick whichever fits your context.
        </p>
        <div style={{ display: "grid", gap: 10 }}>
          <ChoiceLink
            href="https://farcaster.xyz/miniapps/SfsGBDcHpuSA/decleanup-rewards"
            label="Mini app on Farcaster"
            sub="Fastest — log a cleanup in under a minute"
            tag="BASE" tagColor="#0052FF"
          />
          <ChoiceLink
            href="https://base.app/app/miniapp.decleanup.net"
            label="Mini app on Base"
            sub="Native to the Base app environment"
            tag="BASE" tagColor="#0052FF"
          />
          <ChoiceLink
            href="https://dapp.decleanup.net"
            label="Start on Celo"
            sub="Full platform for organisers, NGOs & geolocated events"
            tag="CELO" tagColor="#FAFF00"
          />
        </div>
        <p className="meta" style={{ marginTop: 20, textAlign: "center" }}>OPENS IN A NEW TAB</p>
      </div>
    </div>
  );
}

function ChoiceLink({ href, label, sub, tag, tagColor }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 16px",
      border: "1px solid var(--line)",
      borderRadius: 10,
      color: "var(--ink)",
      textDecoration: "none",
      background: "var(--bg-elev-2)",
      transition: "border-color 0.15s, background 0.15s",
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--green)"}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line)"}>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
        <div style={{ color: "var(--ink-dim)", fontSize: 12, marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{
        fontFamily: "var(--f-mono)",
        fontSize: 9, letterSpacing: "0.16em",
        padding: "3px 6px", borderRadius: 3,
        background: tagColor, color: "#0a0a0a",
        fontWeight: 700,
      }}>{tag}</div>
    </a>
  );
}

// Section header helper — "marker / title / kicker"
function SectionHead({ marker, title, lede, align = "left" }) {
  return (
    <div style={{ textAlign: align, marginBottom: 48, maxWidth: align === "center" ? 760 : "none", marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>
      <div className="meta" style={{ marginBottom: 18, display: "flex", justifyContent: align === "center" ? "center" : "flex-start", alignItems: "center", gap: 12 }}>
        <span style={{ width: 24, height: 1, background: "var(--green)" }}></span>
        <span>{marker}</span>
      </div>
      <h2 className="plakat" style={{ fontSize: "clamp(36px, 5.5vw, 68px)", margin: 0, marginBottom: lede ? 18 : 0, letterSpacing: "0.005em" }}>
        {title}
      </h2>
      {lede && (
        <p className="serif" style={{ fontSize: "clamp(18px, 1.6vw, 22px)", color: "var(--ink-mute)", margin: 0, lineHeight: 1.4, maxWidth: align === "center" ? "none" : 640 }}>
          {lede}
        </p>
      )}
    </div>
  );
}

Object.assign(window, { Chip, Tag, MetaLine, Nav, StartModal, ChoiceLink, SectionHead, img });
