/* global React */
// ===========================
// Shared primitives & nav
// ===========================
const { useState, useEffect, useRef } = React;

// ---- Brand source of truth (item 01, 02 + name rules) ----
const BRAND = {
  name: "DeCleanup Network",
  app: {
    rewards: "DeCleanup Rewards",
    dapp: "DeCleanup dApp",
    platform: "DeCleanup platform",
    mini: "DeCleanup mini app",
  },
};

const TOKENS = {
  base: { symbol: "$bDCU", chain: "Base",  color: "#0052FF" },
  celo: { symbol: "$cDCU", chain: "Celo",  color: "#FAFF00" },
};

const CDCU_GOVERNANCE = {
  participate: "250 $cDCU unlocks governance participation",
  full: "500 $cDCU unlocks full governance participation",
};

const LINKS = {
  cDCU: {
    contract: "0x34d66e9552e9dc23a24eca13bb1f8f71f4b9bfc1",
    celoscan: "https://celoscan.io/token/0x34d66e9552e9dc23a24eca13bb1f8f71f4b9bfc1",
    governance: "https://app.gardens.fund/gardens/42220/0x6068dfc4f2aeca09d8d5845896f3aa76d0fe6960",
    governanceTiers: CDCU_GOVERNANCE,
  },
};

const GLOSSARY = {
  "Field Ledger": "A live, onchain record of cleanup events that have been verified by the DeCleanup Network. Each entry includes location, timestamp, and proof of work.",
  "Protocol V2":  "The second version of DeCleanup Network's verification and reward protocol. V2 adds dual-chain support (Base + Celo), Hypercert-based impact reports, and onchain governance.",
  "DMRV":         "Digital Monitoring, Reporting, and Verification. The system that turns a real-world cleanup action into a tamper-proof digital record.",
  "$bDCU":        "The Base network reward token earned by completing verified cleanups through DeCleanup Rewards on Farcaster or the Base app.",
  "$cDCU":        "The Celo proof token (contract 0x34d6…9bfc1) earned through verified cleanups on the DeCleanup dApp. Holders vote on funding via Gardens on Celo.",
  "Hypercert":    "An onchain impact certificate that records a contributor's verified environmental work. Permanent, transferable proof of cleanup participation.",
  "onchain":      "Data or transactions recorded directly on a blockchain. One word, no hyphen.",
  "Pilot Partner":"An organization that participated in DeCleanup Network's 2024 testing phase. Current partners: HEM Japan and Pestathon (Nigeria).",
};

// Feature flag: fallback default until the live fetch resolves
const IMPACT_LIVE = false;

// Public impact API (read-only, CORS open). Returns live metrics + recent feed
// when mainnet has indexed cleanups; otherwise `live:false` and callers fall back
// to 2024 pilot data. Never throws — network/5xx degrade to the empty state.
const IMPACT_API_BASE = "https://dapp.decleanup.net";
function useImpactStats() {
  const [state, setState] = useState({ live: false, metrics: null, cleanups: null });
  useEffect(() => {
    let cancelled = false;
    const getJSON = (url) =>
      fetch(url).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    Promise.all([
      getJSON(`${IMPACT_API_BASE}/api/impact/global`),
      getJSON(`${IMPACT_API_BASE}/api/impact/cleanups?limit=12`),
    ]).then(([global, feed]) => {
      if (cancelled) return;
      const metrics = global && global.metrics ? global.metrics : null;
      const items = feed && Array.isArray(feed.items) ? feed.items : null;
      const live = !!(metrics && Number(metrics.total_cleanups_verified) > 0);
      setState({ live, metrics, cleanups: items });
    });
    return () => { cancelled = true; };
  }, []);
  return state;
}

// Tooltip-wrapped glossary term (item 01, 02). Click toggles on mobile, hover/focus on desktop.
function Term({ children, term, position = "down-left", showQ = true, color }) {
  // Click opens an explanation in a centered modal (same proven pattern as StartModal),
  // portaled to <body> so it is immune to scroll position, focus-scroll, and any
  // transformed/overflow ancestor — the previous inline tooltip jumped/clipped on mobile.
  const [open, setOpen] = useState(false);
  const def = GLOSSARY[term] || "";

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <React.Fragment>
      <span
        className="term"
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={open ? "true" : "false"}
        style={color ? { color } : undefined}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }}
      >
        {children}
        {showQ && <span className="term-q" aria-hidden="true">?</span>}
        {/* Desktop hover preview only (gated to hover-capable pointers in CSS). */}
        <span className="term-tip" aria-hidden="true">
          <span className="term-tip-head">{term}</span>
          {def}
        </span>
      </span>
      {open && ReactDOM.createPortal(
        <div className="modal-back" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={term}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 380 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
              <span className="meta" style={{ color: "var(--green)" }}>{term}</span>
              <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: "transparent", border: "none", color: "var(--ink-mute)", cursor: "pointer", padding: 4, fontSize: 22, lineHeight: 1, marginTop: -2 }}>×</button>
            </div>
            <p className="serif" style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "var(--ink)" }}>{def}</p>
          </div>
        </div>,
        document.body
      )}
    </React.Fragment>
  );
}


// Split-flap counter — counts up to `value` (string of digits or includes suffix glyphs).
// Triggers on viewport-enter via IntersectionObserver. Each digit cell rolls 0→9 then settles
// on the target. Static glyphs (+, em-dash, etc.) are rendered without animation.
function Splitflap({ value, className = "" }) {
  const target = String(value);
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [displayValues, setDisplayValues] = useState(() => target.split("").map(() => 0));

  // Trigger when scrolled into view (only once)
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Reduced-motion: snap straight to final value
  useEffect(() => {
    if (!armed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValues(target.split("").map((c) => (/\d/.test(c) ? Number(c) : c)));
      return;
    }
    // Roll each digit cell to its target index. The CSS transition handles the visual.
    // Stagger per cell for that mechanical chain feel.
    const finals = target.split("").map((c) => (/\d/.test(c) ? Number(c) : c));
    finals.forEach((v, i) => {
      // Add full revolutions so a cell rolls past 0..9 even if final == 0
      if (typeof v === "number") {
        const revs = 2 + i; // outer cells spin longer for satisfying cascade
        setTimeout(() => {
          setDisplayValues((prev) => {
            const next = [...prev];
            next[i] = v + revs * 10;
            return next;
          });
        }, i * 90);
      } else {
        setDisplayValues((prev) => {
          const next = [...prev];
          next[i] = v;
          return next;
        });
      }
    });
  }, [armed, target]);

  return (
    <span ref={ref} className={`splitflap ${className}`} aria-label={target}>
      {target.split("").map((ch, i) => {
        const isDigit = /\d/.test(ch);
        if (!isDigit) {
          // Static glyph (+, —, em-dash). Green if +.
          return (
            <span key={i} className={`splitflap-cell static ${ch === "+" ? "splitflap-accent" : ""}`}>
              <span>{ch}</span>
            </span>
          );
        }
        const targetVal = displayValues[i];
        // Strip is 0..9 repeated enough times that any revolution count lands on a real digit
        const strip = [];
        const repeats = 6;
        for (let r = 0; r < repeats; r++) for (let d = 0; d < 10; d++) strip.push(d);
        return (
          <span key={i} className="splitflap-cell" aria-hidden>
            <span className="splitflap-strip" style={{ "--target": targetVal }}>
              {strip.map((d, k) => <span key={k}>{d}</span>)}
            </span>
          </span>
        );
      })}
    </span>
  );
}

// Live REC timecode — pulsing red REC chip + ticking HH:MM:SS. Renders inside a
// .photo overlay; sells the field-camera personality of the brand.
function RecTimestamp({ className = "", style = {} }) {
  const [time, setTime] = useState(() => formatNow());
  useEffect(() => {
    const id = setInterval(() => setTime(formatNow()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`rec-stamp ${className}`} style={style}>
      <span className="rec-chip" aria-label="Recording indicator">
        <span className="rec-dot" />
        REC
      </span>
      <span className="rec-time mono">{time}</span>
    </div>
  );
}
function formatNow() {
  const t = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`;
}

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoSpin, setLogoSpin] = useState(0);
  const triggerLogo = (ev) => {
    // Easter egg — only fire when already at top of page (so animation isn't
    // wasted while the page is scrolling away). Doesn't block the anchor jump.
    if (window.scrollY < 100) setLogoSpin((n) => n + 1);
  };
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Lock body scroll when menu is open + close on Esc
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);
  const isDark = palette !== "kraft";
  const navLinks = [
    ["What", "#what"],
    ["How", "#how"],
    ["Ecosystem", "#ecosystem"],
    ["Community", "#community"],
    ["Impact", "#impact"],
    ["Docs", "#resources"],
    ["Investors", "#investors"],
  ];
  return (
    <nav className="nav" style={{ borderBottomColor: scrolled || menuOpen ? "var(--line)" : "transparent" }}>
      <div className="nav-inner">
        <a href="#top" onClick={(e) => { triggerLogo(e); closeMenu(); }} className="brand-lockup" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--ink)" }}>
          <img
            key={logoSpin}
            src={img("public/brand/logo-icon.png")}
            alt=""
            className={logoSpin > 0 ? "logo-icon logo-icon-pop" : "logo-icon"}
            width={30}
            height={30}
            style={{ display: "block", borderRadius: 7 }}
          />
          <img src={img("public/brand/logo-wordmark.png")} alt="DeCleanup Network" className="logo-wordmark" height={20} style={{ width: "auto" }} />
          <span className="plakat logo-wordmark-text" style={{ fontSize: 22, letterSpacing: "0.02em" }}>DeCleanup<span style={{ color: "var(--ink-faint)" }}>.Net</span></span>
        </a>
        <div className="nav-links">
          {navLinks.map(([label, href]) => (
            <a key={href} className="nav-link" href={href}>{label}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onTogglePalette}
            aria-label={isDark ? "Switch to Kraft Paper (light)" : "Switch to Field Dark"}
            title={isDark ? "Switch to Kraft Paper" : "Switch to Field Dark"}
            style={{
              width: 44, height: 44,
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
          <button className="btn btn-primary btn-compact nav-cta" onClick={onLaunch}>
            <span className="nav-cta-full">Start Cleaning</span>
            <span className="nav-cta-short">Start</span>
          </button>
          {/* Mobile hamburger — hidden >860px via CSS */}
          <button
            className="nav-hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`hamburger-icon ${menuOpen ? "open" : ""}`} aria-hidden="true">
              <span></span><span></span><span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile slide-down panel */}
      <div
        id="mobile-menu"
        className={`nav-mobile-panel ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!menuOpen}
      >
        <div className="nav-mobile-inner">
          {navLinks.map(([label, href]) => (
            <a key={href} className="nav-mobile-link" href={href} onClick={closeMenu}>
              <span>{label}</span>
            </a>
          ))}
          <div className="nav-mobile-divider"></div>
          <a className="nav-mobile-link" href="litepaper.html" onClick={closeMenu}>
            <span>Litepaper</span>
          </a>
          <a className="nav-mobile-link" href="tokenomics.html" onClick={closeMenu}>
            <span>Tokenomics</span>
          </a>
          <a className="nav-mobile-link" href="toc.html" onClick={closeMenu}>
            <span>Theory of change</span>
          </a>
          <a className="nav-mobile-link" href="sdg.html" onClick={closeMenu}>
            <span>SDG alignment</span>
          </a>
          <a className="nav-mobile-link" href="investors/" onClick={closeMenu}>
            <span>Investor brief</span>
          </a>
          <a className="nav-mobile-link" href="https://github.com/DeCleanup-Network" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            <span>GitHub</span>
          </a>
        </div>
        <div className="nav-mobile-foot">
          <button
            className="btn btn-primary"
            style={{ width: "100%", marginBottom: 14 }}
            onClick={() => { closeMenu(); onLaunch(); }}
          >
            Start Cleaning
          </button>
          <span className="meta">DECLEANUP NETWORK · OPEN-SOURCE · MIT</span>
        </div>
      </div>
      {/* Click-outside scrim */}
      {menuOpen && <div className="nav-scrim" onClick={closeMenu} aria-hidden="true" />}
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
          Same protocol. Pick whichever fits your context.
        </p>
        <div style={{ display: "grid", gap: 10 }}>
          <ChoiceLink
            href="https://farcaster.xyz/miniapps/SfsGBDcHpuSA/decleanup-rewards"
            label="DeCleanup Rewards"
            sub="Farcaster mini app · log a cleanup in under a minute"
            tag="BASE" tagColor="#0052FF"
          />
          <ChoiceLink
            href="https://base.app/app/miniapp.decleanup.net"
            label="DeCleanup Rewards"
            sub="Base app · same rewards on Base"
            tag="BASE" tagColor="#0052FF"
          />
          <ChoiceLink
            href="https://dapp.decleanup.net"
            label="DeCleanup dApp"
            sub="Celo platform for organisers, NGOs & geolocated events"
            tag="CELO" tagColor="#FAFF00"
          />
        </div>
        <p className="meta" style={{ marginTop: 20, textAlign: "center" }}>OPENS IN A NEW TAB</p>
      </div>
    </div>
  );
}

// ---------- CONTACT FORM (no backend — posts to Web3Forms, delivered to email) ----------
// PUBLIC key, not a secret: Web3Forms access keys are designed to live in client code.
// Get a free one for hello@decleanup.net at https://web3forms.com and paste it below.
const WEB3FORMS_ACCESS_KEY = "PASTE_YOUR_WEB3FORMS_ACCESS_KEY";

function ContactModal({ open, onClose }) {
  const [status, setStatus] = useState("idle"); // idle | invalid | sending | success | error
  const [f, setF] = useState({ name: "", contact: "", org: "", interest: "Investing", message: "", botcheck: "" });

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const upd = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (f.botcheck) return;                                    // honeypot tripped → drop silently
    if (!f.contact.trim() || !f.message.trim()) { setStatus("invalid"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "DeCleanup — " + f.interest + " enquiry",
          from_name: "DeCleanup website",
          Name: f.name || "(not given)",
          Contact: f.contact,
          Organization: f.org || "—",
          Interest: f.interest,
          Message: f.message,
        }),
      });
      const data = await res.json();
      setStatus(data && data.success ? "success" : "error");
    } catch (_) {
      setStatus("error");
    }
  };

  const field = {
    width: "100%", boxSizing: "border-box", padding: "11px 13px",
    background: "var(--bg-elev-2)", border: "1px solid var(--line)", borderRadius: 8,
    color: "var(--ink)", fontFamily: "var(--f-sans)", fontSize: 14, outline: "none",
  };
  const lbl = {
    display: "block", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.1em",
    textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 6,
  };

  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true" aria-label="Contact the founders">
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxHeight: "calc(100vh - 48px)", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div className="meta" style={{ marginBottom: 6 }}>CONTACT THE FOUNDERS</div>
            <h2 className="plakat" style={{ fontSize: 30, margin: 0, letterSpacing: "0.01em" }}>Tell us who you are.</h2>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: "none", color: "var(--ink-mute)", cursor: "pointer", padding: 6, fontSize: 20 }}>×</button>
        </div>

        {status === "success" ? (
          <div style={{ padding: "8px 0 4px" }}>
            <p className="serif" style={{ fontSize: 18, color: "var(--ink)", margin: "0 0 8px" }}>Thanks — message received.</p>
            <p style={{ color: "var(--ink-mute)", fontSize: 14, margin: "0 0 20px", lineHeight: 1.5 }}>We read every note and will reply at the contact you gave.</p>
            <button className="btn btn-primary" onClick={onClose} style={{ width: "100%" }}>Done</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <input type="text" tabIndex={-1} autoComplete="off" value={f.botcheck} onChange={upd("botcheck")} aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={lbl}>Name</label>
                <input style={field} type="text" value={f.name} onChange={upd("name")} placeholder="Your name" />
              </div>
              <div>
                <label style={lbl}>Contact *</label>
                <input style={field} type="text" value={f.contact} onChange={upd("contact")} placeholder="Email or Telegram @handle" required />
              </div>
              <div>
                <label style={lbl}>Organization</label>
                <input style={field} type="text" value={f.org} onChange={upd("org")} placeholder="Fund / company (optional)" />
              </div>
              <div>
                <label style={lbl}>I'm interested in</label>
                <select style={field} value={f.interest} onChange={upd("interest")}>
                  {["Investing", "Accelerator", "Partnership / collaboration", "Organizing a cleanup", "Community", "Other"].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Message *</label>
                <textarea style={{ ...field, minHeight: 96, resize: "vertical" }} value={f.message} onChange={upd("message")} placeholder="A few lines about you and what you're looking for" required />
              </div>
              {status === "invalid" && <div style={{ color: "#ff7a7a", fontSize: 13 }}>Please add a contact and a short message.</div>}
              {status === "error" && <div style={{ color: "#ff7a7a", fontSize: 13 }}>Couldn't send right now — please email hello@decleanup.net.</div>}
              <button className="btn btn-primary" type="submit" disabled={status === "sending"} style={{ width: "100%", opacity: status === "sending" ? 0.6 : 1 }}>
                {status === "sending" ? "Sending" : "Send message"}
              </button>
              <p className="meta" style={{ textAlign: "center", color: "var(--ink-faint)", margin: 0 }}>Or email hello@decleanup.net</p>
            </div>
          </form>
        )}
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
      <h2 className="plakat scan-in" style={{ fontSize: "clamp(36px, 5.5vw, 68px)", margin: 0, marginBottom: lede ? 18 : 0, letterSpacing: "-0.02em", lineHeight: 0.95 }}>
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

Object.assign(window, { Chip, Tag, MetaLine, Nav, StartModal, ContactModal, ChoiceLink, SectionHead, img, Term, Splitflap, RecTimestamp, BRAND, TOKENS, LINKS, CDCU_GOVERNANCE, GLOSSARY, IMPACT_LIVE, useImpactStats });
