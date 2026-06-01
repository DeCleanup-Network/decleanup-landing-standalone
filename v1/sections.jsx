/* global React, SectionHead, Chip */
// ===========================
// Middle sections — Why / DMRV / How / Ecosystem
// ===========================

// ---------- WHY DECLEANUP EXISTS ----------
function WhyDeCleanup() {
  return (
    <section className="section" id="what">
      <div className="container">
        <SectionHead
          marker="01 · WHY DECLEANUP EXISTS"
          title={<>The invisible<br/>work problem.</>}
          lede={<>Every year, volunteers clean up millions of tons of trash — and almost <em className="serif-italic">nobody</em> tracks it. No proof. No recognition. No funding for the next cleanup.</>}
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
          gap: 32,
          alignItems: "stretch",
          marginTop: 24,
        }} className="problem-grid">
          {/* Problem */}
          <div className="card" style={{ padding: 32 }}>
            <div className="meta" style={{ marginBottom: 16, color: "var(--ink-dim)" }}>
              <span style={{ display: "inline-block", marginRight: 8, transform: "translateY(-1px)" }}>×</span>
              THE PROBLEM
            </div>
            <h3 className="plakat" style={{ fontSize: 32, margin: "0 0 14px", color: "var(--ink-mute)" }}>
              Cleanups happen.<br/>Proof doesn't.
            </h3>
            <p style={{ color: "var(--ink-mute)", fontSize: 15, margin: 0 }}>
              Billion-dollar carbon credit markets exist for corporations. The person picking up plastic bottles on a beach? Invisible. Unfunded. Unrewarded.
            </p>
          </div>

          {/* Arrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
            <div className="mono" style={{ fontSize: 28, color: "var(--green)", lineHeight: 1 }}>→</div>
          </div>

          {/* Solution */}
          <div className="card" style={{
            padding: 32,
            background: "color-mix(in oklch, var(--green) 8%, var(--bg-elev))",
            borderColor: "color-mix(in oklch, var(--green) 35%, transparent)",
          }}>
            <div className="meta" style={{ marginBottom: 16, color: "var(--green)" }}>
              <span style={{ display: "inline-block", marginRight: 8, transform: "translateY(-1px)" }}>✓</span>
              THE SOLUTION
            </div>
            <h3 className="plakat" style={{ fontSize: 32, margin: "0 0 14px", color: "var(--ink)" }}>
              Every cleanup<br/>becomes a receipt.
            </h3>
            <p style={{ color: "var(--ink-mute)", fontSize: 15, margin: 0 }}>
              Verifiable, incentivized, transparently funded environmental action. Every piece of trash becomes data. Every volunteer becomes fundable.
            </p>
          </div>
        </div>

        {/* Pull quote / closing statement */}
        <div style={{
          marginTop: 56,
          padding: "32px 0",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}>
          <p className="serif" style={{
            fontSize: "clamp(24px, 3vw, 38px)",
            lineHeight: 1.25,
            margin: 0,
            textAlign: "center",
            color: "var(--ink)",
            maxWidth: 1000,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            <span className="hl-strong">DeCleanup changes that.</span>{" "}
            <span className="serif-italic" style={{ color: "var(--ink-mute)" }}>
              Every cleanup becomes verifiable proof. Every piece of trash becomes data. Every volunteer becomes fundable.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- DMRV ----------
function DmrvSection() {
  return (
    <section className="section" id="dmrv" style={{ background: "var(--bg-elev)" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
          gap: 64,
          alignItems: "center",
        }} className="dmrv-grid">
          {/* LEFT — diagram (replaces the spinning circles) */}
          <div>
            <div style={{
              border: "1px solid var(--line)",
              background: "var(--bg)",
              borderRadius: 18,
              padding: 28,
              position: "relative",
            }}>
              <div className="meta" style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                <span>SCHEMATIC · DMRV v2</span>
                <span style={{ color: "var(--green)" }}><span className="live-dot" style={{ marginRight: 6 }}></span>LIVE</span>
              </div>

              <DmrvFlow />

              <div className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 22, lineHeight: 1.5, borderTop: "1px solid var(--line-soft)", paddingTop: 14 }}>
                INPUTS: geotagged photo + timestamp + waste category<br/>
                OUTPUTS: signed proof · ERC-721 impact NFT · $bDCU reward
              </div>
            </div>
          </div>

          {/* RIGHT — explanation */}
          <div>
            <div className="meta" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 24, height: 1, background: "var(--green)" }}></span>
              02 · DMRV
            </div>
            <h2 className="plakat" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: "0 0 20px", lineHeight: 0.92 }}>
              Digital Monitoring,<br/>
              <span style={{ color: "var(--green)" }}>Reporting</span> &amp; <span style={{ color: "var(--green)" }}>Verification</span>.
            </h2>
            <p className="serif" style={{ fontSize: 20, lineHeight: 1.4, color: "var(--ink-mute)", margin: "0 0 28px" }}>
              DeCleanup provides an open-source DMRV system that turns real-world cleanup actions into <span className="hl">trusted, auditable digital data</span>.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              <RoleTile label="NGOs"        body="Transparent impact verification & reporting" />
              <RoleTile label="Corporates" body="ESG data & sponsored cleanups" />
              <RoleTile label="Sponsors"    body="Fund & track large-scale actions" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DmrvFlow() {
  const nodes = [
    { n: "01", label: "Cleanup",     sub: "Real-world action" },
    { n: "02", label: "Capture",     sub: "Before / after photo" },
    { n: "03", label: "Verify",      sub: "Signed + geotagged" },
    { n: "04", label: "Tokenize",    sub: "Hypercert + $bDCU" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {nodes.map((node, i) => (
        <div key={node.n} style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 18,
          padding: "14px 16px",
          background: "var(--bg-elev)",
          border: "1px solid var(--line-soft)",
          borderRadius: 10,
          position: "relative",
        }}>
          <span className="mono" style={{ fontSize: 12, color: "var(--green)" }}>{node.n}</span>
          <div>
            <div className="plakat" style={{ fontSize: 22, letterSpacing: "0.03em" }}>{node.label}</div>
            <div className="meta" style={{ marginTop: 2 }}>{node.sub}</div>
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
            {i < nodes.length - 1 ? "↓" : "✓"}
          </span>
        </div>
      ))}
    </div>
  );
}

function RoleTile({ label, body }) {
  return (
    <div style={{
      border: "1px solid var(--line)",
      borderRadius: 10,
      padding: 16,
      background: "color-mix(in oklch, var(--bg) 50%, transparent)",
    }}>
      <div className="plakat" style={{ fontSize: 22, marginBottom: 6 }}>{label}</div>
      <p style={{ fontSize: 12, color: "var(--ink-mute)", margin: 0, lineHeight: 1.45 }}>{body}</p>
    </div>
  );
}

// ---------- HOW IT WORKS ----------
function HowSection({ onLaunch }) {
  const steps = [
    { n: "01", title: "Find your spot",   body: "Pick a beach, park or street. Take the before-photo." },
    { n: "02", title: "Do the work",      body: "Bag it up. Solo, with friends, or with a registered NGO." },
    { n: "03", title: "Photograph result", body: "After-photo, same angle. The system reads geotag + timestamp." },
    { n: "04", title: "Earn your reward", body: "Verified cleanup → mints an impact receipt + $bDCU tokens." },
  ];
  return (
    <section className="section" id="how">
      <div className="container">
        <SectionHead
          marker="03 · HOW YOUR CLEANUP BECOMES VERIFIED IMPACT"
          title={<>Four steps from<br/>litter to ledger.</>}
          lede="A single workflow whether you're a solo volunteer with a phone or an NGO running a 60-person beach event."
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
          gap: 48,
          alignItems: "start",
        }} className="how-grid">
          {/* LEFT — verification photo with overlay */}
          <div className="photo" style={{ aspectRatio: "4/5" }}>
            <img src={img("public/testimonial2.jpg")} alt="HEM Japan volunteers after a beach cleanup" />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.45) 100%)",
            }}></div>
            <span className="corner-tag">BEFORE / AFTER · SAME ANGLE · ±5m</span>
            <div style={{ position: "absolute", left: 14, right: 14, bottom: 14, color: "#fff" }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", opacity: 0.8, marginBottom: 4 }}>
                EVENT #029 · HEM JAPAN · HARBOR WALL
              </div>
              <div className="plakat" style={{ fontSize: 26, letterSpacing: "0.02em" }}>
                9 BAGS · 38.2 KG · ✓ VERIFIED
              </div>
            </div>
            <div style={{
              position: "absolute", top: 14, right: 14,
              display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end",
            }}>
              <span className="chip" style={{ background: "rgba(0,0,0,0.55)", borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}>
                <span className="dot"></span> Photo verified
              </span>
              <span className="chip amber" style={{ background: "rgba(0,0,0,0.55)", borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}>
                <span className="dot"></span> Approved impact
              </span>
            </div>
          </div>

          {/* RIGHT — steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {steps.map((s) => (
              <div key={s.n} style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 24,
                alignItems: "start",
                padding: "20px 24px",
                background: "var(--bg-elev)",
                border: "1px solid var(--line)",
                borderRadius: 12,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--green)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line)"}>
                <span className="plakat" style={{
                  fontSize: 44,
                  color: "var(--yellow)",
                  lineHeight: 0.9,
                  minWidth: 56,
                }}>{s.n}</span>
                <div>
                  <h3 className="plakat" style={{ fontSize: 26, margin: "4px 0 6px", letterSpacing: "0.02em" }}>{s.title}</h3>
                  <p style={{ margin: 0, color: "var(--ink-mute)", fontSize: 14 }}>{s.body}</p>
                </div>
              </div>
            ))}

            <button className="btn btn-primary" onClick={onLaunch} style={{ marginTop: 12, alignSelf: "flex-start" }}>
              Get started now
              <span style={{ fontFamily: "var(--f-mono)" }}>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- ECOSYSTEM ----------
function EcosystemSection() {
  return (
    <section className="section" id="ecosystem" style={{ background: "var(--bg-elev)" }}>
      <div className="container">
        <SectionHead
          marker="04 · THE ECOSYSTEM"
          title={<>One protocol.<br/>Two doors.</>}
          lede={<>Pick the surface that fits your context. Same impact data, two different ergonomics — light & social on <span className="hl">Base</span>, deep & coordinated on <span className="hl">Celo</span>.</>}
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
        }} className="eco-grid">
          <EcoCard
            tag="BASE"
            tagBg="#0052FF"
            title="Mini App"
            kicker="Lightweight entry"
            body="The fastest way for individuals to log a cleanup — opens inside Farcaster or the Base app, no install."
            features={[
              { k: "PHOTO", v: "Photo-based logging" },
              { k: "VRFY",  v: "Quick verification" },
              { k: "$bDCU", v: "Token rewards" },
            ]}
            links={[
              { label: "Open on Farcaster", href: "https://farcaster.xyz/miniapps/SfsGBDcHpuSA/decleanup-rewards" },
              { label: "Open on Base app",  href: "https://base.app/app/miniapp.decleanup.net" },
            ]}
            accent="#0052FF"
          />
          <EcoCard
            tag="CELO"
            tagBg="#FCFF52"
            tagColor="#0a0a0a"
            title="Full Platform"
            kicker="For organisers & NGOs"
            body="Geolocation, impact reports as Hypercerts, governance for sponsored cleanups, and a leaderboard for coordinated campaigns."
            features={[
              { k: "MAP",  v: "Geolocation & maps" },
              { k: "RPT",  v: "Hypercert impact reports" },
              { k: "GOV",  v: "Funding governance" },
            ]}
            links={[
              { label: "Explore Celo dApp", href: "https://dapp.decleanup.net" },
            ]}
            accent="var(--yellow)"
          />
        </div>
      </div>
    </section>
  );
}

function EcoCard({ tag, tagBg, tagColor = "#fff", title, kicker, body, features, links, accent }) {
  return (
    <div style={{
      position: "relative",
      borderRadius: 18,
      border: "1px solid var(--line)",
      background: "var(--bg)",
      padding: 32,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gap: 22,
      transition: "border-color 0.2s",
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = accent}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line)"}>
      {/* Diagonal accent corner */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 120, height: 120,
        background: `linear-gradient(225deg, ${accent} 0%, transparent 60%)`,
        opacity: 0.15,
        pointerEvents: "none",
      }}></div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
        <span style={{
          fontFamily: "var(--f-mono)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.16em",
          padding: "5px 8px",
          borderRadius: 4,
          background: tagBg,
          color: tagColor,
        }}>{tag}</span>
        <span className="meta">{kicker}</span>
      </div>

      <div>
        <h3 className="plakat" style={{ fontSize: "clamp(40px, 4.4vw, 56px)", margin: 0, letterSpacing: "0.02em" }}>
          {title}
        </h3>
        <p className="serif" style={{ fontSize: 18, color: "var(--ink-mute)", margin: "12px 0 0", lineHeight: 1.4 }}>
          {body}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 1, borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "12px 0" }}>
        {features.map((f) => (
          <div key={f.k} style={{
            display: "grid",
            gridTemplateColumns: "70px 1fr auto",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px dashed var(--line-soft)",
            gap: 16,
          }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.12em" }}>{f.k}</span>
            <span style={{ fontSize: 14 }}>{f.v}</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--green)" }}>+</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: "auto" }}>
        {links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost btn-mono"
            style={{ minHeight: 40, padding: "0 14px" }}>
            {l.label}
            <span style={{ fontFamily: "var(--f-mono)" }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { WhyDeCleanup, DmrvSection, HowSection, EcosystemSection });
