/* global React */
// ===========================
// Hero — "Field Report cover"
// ===========================

function Hero({ onLaunch }) {
  // Recent verified cleanups — only confirmed-from-repo locations (HEM Japan, Pestathon Nigeria, Phangan Thailand).
  // Hash IDs and weights are illustrative placeholders until the dApp pushes the live ledger.
  const ledger = [
    { id: "—",   loc: "Tokyo Bay, JP",    kg: "—",  w: "MIXED",   t: "HEM JAPAN · 2024" },
    { id: "—",   loc: "Osaka, JP",        kg: "—",  w: "MIXED",   t: "HEM JAPAN · 2024" },
    { id: "—",   loc: "Nsukka, NG",       kg: "—",  w: "MIXED",   t: "PESTATHON · 2024" },
    { id: "—",   loc: "Abuja, NG",        kg: "—",  w: "MIXED",   t: "PESTATHON · 2024" },
    { id: "—",   loc: "Phangan, TH",      kg: "—",  w: "PLASTIC", t: "REFI · 2024" },
  ];

  return (
    <section id="top" style={{ position: "relative", paddingTop: 96, paddingBottom: 0, overflow: "hidden" }}>
      {/* Field-report metadata strip */}
      <div style={{ borderTop: "1px solid var(--line-soft)", borderBottom: "1px solid var(--line-soft)" }}>
        <div className="wide" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 24px", gap: 16, flexWrap: "wrap" }}>
          <span className="meta" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="live-dot"></span> Field Ledger · Live
          </span>
          <span className="meta" style={{ color: "var(--ink-faint)" }}>
            ISSUE No. 014  ·  UPDATED 24·05·26  ·  PROTOCOL v2 / CELO + BASE
          </span>
          <span className="meta" style={{ display: "flex", gap: 16 }}>
            <span>EN</span>
            <span style={{ color: "var(--ink-faint)" }}>ES · PT · JA · TH</span>
          </span>
        </div>
      </div>

      {/* Main grid */}
      <div className="wide" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
          gap: 56,
          alignItems: "stretch",
        }} className="hero-grid">
          {/* LEFT: Typography stack */}
          <div className="rise" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
            <div>
              <div className="meta" style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 32, height: 1, background: "var(--green)" }}></span>
                <span>SDG-ALIGNED · OPEN-SOURCE · DECENTRALIZED</span>
              </div>

              <h1 className="plakat" style={{
                fontSize: "clamp(64px, 11vw, 168px)",
                margin: 0,
                marginBottom: 8,
                letterSpacing: "-0.005em",
              }}>
                CLEAN<br />
                LOCAL.
              </h1>
              <h1 className="plakat" style={{
                fontSize: "clamp(64px, 11vw, 168px)",
                margin: 0,
                color: "var(--green)",
                letterSpacing: "-0.005em",
                position: "relative",
                display: "inline-block",
              }}>
                <span style={{ position: "relative" }}>
                  PROVE
                  <span style={{
                    position: "absolute",
                    right: -28, top: -4,
                    width: 18, height: 18,
                    background: "var(--yellow)",
                  }}></span>
                </span><br />
                GLOBAL.
              </h1>

              <p className="serif" style={{
                fontSize: "clamp(20px, 1.9vw, 26px)",
                color: "var(--ink-mute)",
                margin: "32px 0 0",
                maxWidth: 540,
                lineHeight: 1.35,
              }}>
                Join volunteers worldwide turning trash pickup into <span className="hl">verified, rewarded impact</span>.
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={onLaunch}>
                  Start Cleaning
                  <span aria-hidden style={{ fontFamily: "var(--f-mono)" }}>→</span>
                </button>
                <a className="btn btn-ghost" href="#how">
                  How it works
                </a>
              </div>
            </div>

            {/* Bottom KPI strip on left column — honest placeholders until on-chain ledger is wired in */}
            <div style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              borderTop: "1px solid var(--line)",
              paddingTop: 24,
            }}>
              <Kpi label="Pilot partners" value="2" sub="HEM Japan · Pestathon" />
              <Kpi label="Verified events" value="13" sub="across 2024 pilots" />
              <Kpi label="Network counter" value="—" sub="live · coming Q4" />
            </div>
          </div>

          {/* RIGHT: Photo + ledger card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <div className="photo rise" style={{
              flex: "1 1 auto",
              minHeight: 420,
              animationDelay: "0.1s",
            }}>
              <img src={img("public/testimonial1.jpg")} alt="Volunteers gathered around DeCleanup stickers — overhead view" />
              <span className="corner-tag">HEM JAPAN · 2024 · COMMUNITY EVENT</span>
              <div style={{
                position: "absolute", right: 12, top: 12,
                display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6,
              }}>
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
                  HARBOR WALL · GEOTAGGED · TIMESTAMPED
                </div>
                <div className="serif" style={{ fontSize: 18, marginTop: 4 }}>
                  HEM Japan — community cleanup, photo-verified.
                </div>
              </div>
            </div>

            {/* Ledger card */}
            <div className="card rise" style={{ animationDelay: "0.2s", padding: 20, background: "var(--bg-elev)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span className="meta" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="live-dot"></span> RECENT VERIFICATIONS
                </span>
                <span className="meta">ON-CHAIN · CELO</span>
              </div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>
                {ledger.map((row, i) => (
                  <div key={i} style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    gap: 14,
                    alignItems: "center",
                    padding: "8px 0",
                    borderTop: i === 0 ? "none" : "1px solid var(--line-soft)",
                  }}>
                    <span style={{ color: "var(--ink)" }}>{row.loc}</span>
                    <span style={{ color: "var(--ink-faint)" }}>{row.w}</span>
                    <span style={{ color: "var(--green)" }}>{row.t}</span>
                  </div>
                ))}
              </div>
              <a href="#impact" className="meta" style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--line)",
                color: "var(--ink)", textDecoration: "none",
              }}>
                <span>VIEW FULL LEDGER</span>
                <span style={{ fontFamily: "var(--f-mono)" }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip — running locations of cleanups */}
      <div className="marquee-wrap" style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "16px 0",
        background: "var(--bg)",
      }}>
        <div className="marquee mono" style={{ fontSize: 14, color: "var(--ink-mute)" }}>
          {[...Array(3)].map((_, k) => (
            <React.Fragment key={k}>
              <span>◆ HEM JAPAN · TOKYO BAY</span>
              <span>◆ HEM JAPAN · OSAKA</span>
              <span>◆ PESTATHON · NSUKKA, NG</span>
              <span>◆ PESTATHON · ABUJA, NG</span>
              <span>◆ REFI PHANGAN · TH</span>
              <span>◆ NEXT EVENT — ADD YOURS →</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function Kpi({ label, value, sub }) {
  return (
    <div>
      <div className="meta" style={{ marginBottom: 6 }}>{label}</div>
      <div className="plakat" style={{ fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 0.9 }}>{value}</div>
      {sub && <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>{sub}</div>}
    </div>
  );
}

Object.assign(window, { Hero });
