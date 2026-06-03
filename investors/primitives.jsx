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
        <button className="btn btn-primary btn-mono" type="button" style={{ minHeight: 40 }} onClick={() => window.dispatchEvent(new Event("dcu:contact"))}>Contact founders</button>
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

// ---------- CONTACT FORM (no backend → Web3Forms → email) ----------
// PUBLIC key, not a secret (Web3Forms keys live in client code by design).
// Get a free one for hello@decleanup.net at https://web3forms.com and paste below.
// NOTE: keep this in sync with the same constant on the main site (components/primitives.jsx).
const WEB3FORMS_ACCESS_KEY = "PASTE_YOUR_WEB3FORMS_ACCESS_KEY";

// Self-managed modal — any element can open it via window.dispatchEvent(new Event("dcu:contact")).
function ContactModal() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("idle");
  const [f, setF] = React.useState({ name: "", contact: "", org: "", interest: "Investing", message: "", botcheck: "" });

  React.useEffect(() => {
    const openIt = () => { setStatus("idle"); setOpen(true); };
    window.addEventListener("dcu:contact", openIt);
    return () => window.removeEventListener("dcu:contact", openIt);
  }, []);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;
  const upd = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (f.botcheck) return;
    if (!f.contact.trim() || !f.message.trim()) { setStatus("invalid"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "DeCleanup — " + f.interest + " enquiry (investor page)",
          from_name: "DeCleanup investor page",
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

  const back = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.66)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 2147483000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 };
  const box = { background: "var(--bg-elev)", border: "1px solid var(--line)", borderRadius: 16, padding: 28, maxWidth: 460, width: "100%", maxHeight: "calc(100vh - 48px)", overflowY: "auto", color: "var(--ink)" };
  const field = { width: "100%", boxSizing: "border-box", padding: "11px 13px", background: "var(--bg-elev-2)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--ink)", fontFamily: "var(--f-sans)", fontSize: 14, outline: "none" };
  const lbl = { display: "block", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 6 };

  return (
    <div style={back} onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Contact the founders">
      <div style={box} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div className="sec-kicker" style={{ marginBottom: 6 }}><span className="t">Contact the founders</span></div>
            <h2 className="memo-h" style={{ margin: 0, fontSize: 28 }}>Tell us who you are.</h2>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: "transparent", border: "none", color: "var(--ink-faint)", cursor: "pointer", padding: 6, fontSize: 20, lineHeight: 1 }}>×</button>
        </div>

        {status === "success" ? (
          <div style={{ padding: "8px 0 4px" }}>
            <p style={{ fontSize: 17, color: "var(--ink)", margin: "0 0 8px" }}>Thanks — message received.</p>
            <p style={{ color: "var(--ink-mute)", fontSize: 14, margin: "0 0 20px", lineHeight: 1.5 }}>We read every note and will reply at the contact you gave.</p>
            <button className="btn btn-primary" onClick={() => setOpen(false)} style={{ width: "100%" }}>Done</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <input type="text" tabIndex={-1} autoComplete="off" value={f.botcheck} onChange={upd("botcheck")} aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
            <div style={{ display: "grid", gap: 14 }}>
              <div><label style={lbl}>Name</label><input style={field} type="text" value={f.name} onChange={upd("name")} placeholder="Your name" /></div>
              <div><label style={lbl}>Contact *</label><input style={field} type="text" value={f.contact} onChange={upd("contact")} placeholder="Email or Telegram @handle" required /></div>
              <div><label style={lbl}>Organization</label><input style={field} type="text" value={f.org} onChange={upd("org")} placeholder="Fund / company (optional)" /></div>
              <div><label style={lbl}>I'm interested in</label>
                <select style={field} value={f.interest} onChange={upd("interest")}>
                  {["Investing", "Accelerator", "Partnership / collaboration", "Organizing a cleanup", "Community", "Other"].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Message *</label><textarea style={{ ...field, minHeight: 96, resize: "vertical" }} value={f.message} onChange={upd("message")} placeholder="A few lines about you and what you're looking for" required /></div>
              {status === "invalid" && <div style={{ color: "#ff7a7a", fontSize: 13 }}>Please add a contact and a short message.</div>}
              {status === "error" && <div style={{ color: "#ff7a7a", fontSize: 13 }}>Couldn't send right now — please email hello@decleanup.net.</div>}
              <button className="btn btn-primary" type="submit" disabled={status === "sending"} style={{ width: "100%", opacity: status === "sending" ? 0.6 : 1 }}>{status === "sending" ? "Sending" : "Send message"}</button>
              <p style={{ textAlign: "center", color: "var(--ink-faint)", margin: 0, fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.06em" }}>Or email hello@decleanup.net</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { img, ContentsRail, MemoHead, ChainPill, Footer, FooterCol, ContactModal });
