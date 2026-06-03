/* global React, Term, IMPACT_LIVE, img, Splitflap, RecTimestamp, useImpactStats */
// ===========================
// Hero — v.2 corrected per brief
// Items addressed: 01 (Field Ledger tooltip), 02 (Protocol V2 tooltip),
//   03 (period fix), 04 (subhead font/copy), 05 (pilot eyebrow),
//   06 (ledger 3 cols + DD.MM.YYYY), 07 (em-dash + onchain)
// ===========================

function Hero({ onLaunch }) {
  const impact = useImpactStats();

  // Recent verified cleanups — fallback to 2024 pilot rows until the API indexes mainnet.
  const pilotLedger = [
    { loc: "Tokyo Bay, JP",  type: "Mixed",   date: "14.11.2024" },
    { loc: "Osaka, JP",      type: "Mixed",   date: "02.10.2024" },
    { loc: "Nsukka, NG",     type: "Mixed",   date: "28.08.2024" },
    { loc: "Abuja, NG",      type: "Plastic", date: "19.07.2024" },
    { loc: "Phangan, TH",    type: "Plastic", date: "11.06.2024" },
  ];
  const fmtDate = (iso) => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    const p = (n) => String(n).padStart(2, "0");
    return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
  };
  // Live feed → ledger rows when present; else 2024 pilot rows.
  const ledger = impact.cleanups && impact.cleanups.length
    ? impact.cleanups.slice(0, 5).map((it) => ({
        loc: (it.location && it.location.label) || "—",
        type: (it.impact && it.impact.wasteTypes && it.impact.wasteTypes[0]) || "Mixed",
        date: fmtDate(it.verifiedAt || it.submittedAt),
      }))
    : pilotLedger;
  const fmtKg = (v) => (v == null ? "—" : String(Math.round(Number(v))));

  return (
    <section id="top" style={{ position: "relative", paddingTop: 80, paddingBottom: 0, overflow: "hidden" }}>
      {/* Field-report metadata strip — Field Ledger and Protocol V2 now have tooltips */}
      <div style={{ borderTop: "1px solid var(--line-soft)", borderBottom: "1px solid var(--line-soft)" }}>
        <div className="wide" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 24px", gap: 16, flexWrap: "wrap" }}>
          <span className="meta" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="live-dot"></span>
            <Term term="Field Ledger" position="down-left">Field Ledger</Term>
            · Live
          </span>
          <span className="meta" style={{ color: "var(--ink-faint)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            ISSUE No. 014 · UPDATED 26.05.2026 ·
            <Term term="Protocol V2" position="down-left" color="var(--ink-faint)">Protocol V2</Term>
            / CELO + BASE
          </span>
        </div>
      </div>

      {/* Main grid */}
      <div className="wide" style={{ paddingTop: 36, paddingBottom: 36 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
          gap: 56,
          alignItems: "stretch",
        }} className="hero-grid">
          {/* LEFT — Typography stack */}
          <div className="rise" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
            <div>
              <div className="meta" style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 32, height: 1, background: "var(--green)" }}></span>
                <span>SDG-ALIGNED · OPEN-SOURCE · DECENTRALIZED</span>
              </div>

              {/* Single H1 for SEO — visual line break via span+display:block, not separate H1.
                  Two .scan-in wrappers so the gradient line gets its own staggered scan. */}
              <h1 className="plakat" style={{
                fontSize: "clamp(40px, 8.4vw, 132px)",
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 0.9,
              }}>
                <span className="scan-in" style={{ display: "block" }}>
                  CLEAN<br />
                  LOCAL.
                </span>
                <span className="scan-in gradient-text" style={{ display: "inline-block", marginTop: 8 }}>
                  PROVE<br />
                  GLOBAL.
                </span>
              </h1>

              {/* Item 04 fix — no highlight, sans-serif (Space Grotesk), copy reads "verified and rewarded" */}
              <p style={{
                fontFamily: "var(--f-sans)",
                fontWeight: 500,
                fontSize: "clamp(17px, 1.5vw, 20px)",
                color: "var(--ink-mute)",
                margin: "24px 0 0",
                maxWidth: 540,
                lineHeight: 1.5,
              }}>
                Pick up trash. Photograph it. Get paid in $bDCU or $cDCU.
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={onLaunch}>
                  Start Cleaning
                </button>
                <a className="btn btn-ghost" href="#how">
                  How It Works
                </a>
              </div>
            </div>

            {/* Live network metrics — cleanups / weight removed / weight recycled.
                Pulls from /api/impact/global; shows "—" until verifications are indexed. */}
            <div style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
              gap: 20,
              borderTop: "1px solid var(--line)",
              paddingTop: 24,
            }}>
              <Kpi label="Cleanups verified"  value={impact.live ? String(impact.metrics.total_cleanups_verified) : "—"} sub="onchain proof"  isLive={impact.live} />
              <Kpi label="Weight removed · kg" value={impact.live ? fmtKg(impact.metrics.total_weight_kg)        : "—"} sub="from the field" isLive={impact.live} />
              <Kpi label="Weight recycled · kg" value={impact.live ? fmtKg(impact.metrics.total_recyclables_kg)  : "—"} sub="diverted"       isLive={impact.live} />
            </div>
          </div>

          {/* RIGHT — Photo + ledger card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div className="photo grainy rise" style={{
              flex: "1 1 auto",
              minHeight: 360,
              animationDelay: "0.1s",
            }}>
              <img src={img("public/testimonial1.jpg")} alt="ReFi Phangan volunteers after a beach cleanup in Koh Phangan, Thailand" loading="eager" fetchpriority="high" decoding="async" />
              <span className="corner-tag">REFI PHANGAN · 2024 · COMMUNITY EVENT</span>
              <div style={{
                position: "absolute", right: 12, top: 12,
                display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6,
              }}>
                {/* Live REC timecode — field-camera personality */}
                <RecTimestamp style={{ position: "static" }} />
                <span className="chip amber" style={{ background: "rgba(0,0,0,0.55)", borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}>
                  <span className="dot"></span> Photo verified
                </span>
              </div>
              <div style={{
                position: "absolute", left: 0, right: 0, bottom: 0,
                padding: "14px 16px",
                background: "linear-gradient(0deg, rgba(0,0,0,0.85), transparent)",
                color: "#fff",
              }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", opacity: 0.8 }}>
                  BEACH CLEANUP · GEOTAGGED · TIMESTAMPED
                </div>
                <div style={{ fontFamily: "var(--f-sans)", fontWeight: 500, fontSize: 17, marginTop: 4 }}>
                  ReFi Phangan community cleanup, photo-verified.
                </div>
              </div>
            </div>

            {/* Item 06 fix — 3 cols: LOCATION · TYPE · DATE (DD.MM.YYYY) */}
            <div className="card rise" style={{ animationDelay: "0.2s", padding: 20, background: "var(--bg-elev)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span className="meta" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-mute)" }}>
                  <span className="live-dot"></span> Recent verifications
                </span>
                <span className="meta">ONCHAIN · CELO</span>
              </div>

              {/* Column headers */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 80px 100px",
                gap: 14,
                fontFamily: "var(--f-mono)",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                paddingBottom: 8,
                borderBottom: "1px solid var(--line)",
                marginBottom: 4,
              }}>
                <span>Location</span>
                <span>Type</span>
                <span style={{ textAlign: "right" }}>Date</span>
              </div>

              {ledger.map((row, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 100px",
                  gap: 14,
                  alignItems: "center",
                  padding: "9px 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--line-soft)",
                  fontFamily: "var(--f-mono)",
                  fontSize: 11.5,
                }}>
                  <span style={{ color: "var(--ink)" }}>{row.loc}</span>
                  <span style={{ color: "var(--ink-faint)" }}>{row.type}</span>
                  <span style={{ color: "var(--green)", textAlign: "right" }}>{row.date}</span>
                </div>
              ))}

              <a href="#impact" className="meta" style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--line)",
                color: "var(--ink)", textDecoration: "none",
              }}>
                <span>View full ledger</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Marquee removed per cofounder feedback — re-add when Impact Circles campaigns open. */}
    </section>
  );
}

function Kpi({ label, value, sub, isLive }) {
  return (
    <div>
      {isLive ? (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
          color: "var(--green)",
          marginBottom: 8,
        }}><span className="live-dot"></span> Live · onchain</span>
      ) : (
        <span className="coming-eyebrow">Live · onchain</span>
      )}
      <div style={{ fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 0.9 }}>
        <Splitflap value={value} />
      </div>
      <div className="meta" style={{ marginTop: 6 }}>{label}</div>
      {sub && <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{sub}</div>}
    </div>
  );
}

Object.assign(window, { Hero });
