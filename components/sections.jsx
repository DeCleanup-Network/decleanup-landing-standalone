/* global React, SectionHead, Chip, Term, TOKENS */
// ===========================
// Middle sections v.2 — Why / DMRV / How / Ecosystem / Built On
// Items addressed: 07 (em-dash + onchain), 08 (DeCleanup Network + multiline hl),
//   09 (DMRV step 04 stacked + $cDCU), 10 (chain pill badges), NEW Built On
// ===========================

// ---------- WHY DECLEANUP EXISTS ----------
function WhyDeCleanup() {
  return (
    <section className="section" id="what">
      <div className="container">
        <SectionHead
          marker="01 · WHY DECLEANUP EXISTS"
          title={<>The <span className="gradient-text">invisible</span><br/>work problem.</>}
          lede={<>Every year, volunteers clean up millions of tons of trash, and almost <em className="serif-italic">nobody</em> tracks it. No proof. No recognition. No funding for the next cleanup.</>}
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

          {/* Spacer between problem / solution (kept for grid + mobile layout) */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}></div>

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
              Every cleanup<br/>is logged.
            </h3>
            <p style={{ color: "var(--ink-mute)", fontSize: 15, margin: 0, lineHeight: 1.55 }}>
              Every log builds your record. Every record earns weight in the network. Real impact finds real support.
            </p>
          </div>
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
                OUTPUTS: signed proof · Hypercert · $bDCU (Base) or $cDCU (Celo) reward
              </div>
            </div>
          </div>

          {/* RIGHT — explanation */}
          <div>
            <div className="meta" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 24, height: 1, background: "var(--green)" }}></span>
              02 · DMRV
            </div>
            <h2 className="plakat scan-in" style={{ fontSize: "clamp(28px, 5vw, 64px)", margin: "0 0 20px", lineHeight: 0.92, letterSpacing: "-0.02em" }}>
              Digital Monitoring,<br/>
              <span className="gradient-text">Reporting</span> &amp; <span className="gradient-text">Verification</span>.
            </h2>
            <p className="serif" style={{ fontSize: 20, lineHeight: 1.4, color: "var(--ink-mute)", margin: "0 0 28px" }}>
              DeCleanup Network provides an open-source <Term term="DMRV" position="down-left">DMRV</Term> system that turns real-world cleanup actions into <span className="hl">tamper-proof onchain receipts</span>.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 12 }}>
              <RoleTile label="NGOs"        body="Show the photo. Show the GPS. Show the count." />
              <RoleTile label="Corporates" body="ESG data & sponsored cleanups" />
              <RoleTile label="Sponsors"    body="Sponsor 60 people on a beach. Watch every bag." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DmrvFlow() {
  const nodes = [
    { n: "01", label: "Cleanup",  sub: "Real-world action" },
    { n: "02", label: "Capture",  sub: "Before / after photo" },
    { n: "03", label: "Verify",   sub: "Signed + geotagged" },
    { n: "04", label: "Tokenize", sub: "Hypercert", tokens: true },
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
          background: node.tokens ? "color-mix(in oklch, var(--green) 8%, var(--bg-elev))" : "var(--bg-elev)",
          border: node.tokens ? "1px solid color-mix(in oklch, var(--green) 40%, var(--line))" : "1px solid var(--line-soft)",
          borderRadius: 10,
          position: "relative",
        }}>
          <span className="mono" style={{ fontSize: 12, color: "var(--green)" }}>{node.n}</span>
          <div>
            <div className="plakat" style={{ fontSize: 22, letterSpacing: "0.03em" }}>{node.label}</div>
            <div className="meta" style={{ marginTop: 2 }}>{node.sub}</div>
            {node.tokens && (
              <div style={{ marginTop: 6, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <Term term="$bDCU" position="down-left" showQ={false}>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "#5d8bff", letterSpacing: "0.04em" }}>$bDCU</span>
                </Term>
                <span style={{ color: "var(--ink-faint)", fontFamily: "var(--f-mono)", fontSize: 11 }}>·</span>
                <Term term="$cDCU" position="down-left" showQ={false}>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--yellow)", letterSpacing: "0.04em" }}>$cDCU</span>
                </Term>
              </div>
            )}
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
            {i < nodes.length - 1 ? "" : "✓"}
          </span>
        </div>
      ))}
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 4, letterSpacing: "0.02em", lineHeight: 1.5, padding: "0 4px" }}>
        <span style={{ color: "#5d8bff" }}>Base network</span> earns <span style={{ color: "#5d8bff" }}>$bDCU</span>. <span style={{ color: "var(--yellow)" }}>Celo network</span> earns <span style={{ color: "var(--yellow)" }}>$cDCU</span>. Same proof, two reward surfaces.
      </div>
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
    { n: "03", title: "Photograph result", body: "After-photo, same angle. The system reads geotag and timestamp." },
    { n: "04", title: "Earn your reward", body: "Verified cleanup mints an impact receipt and earns $bDCU (Base) or $cDCU (Celo) tokens." },
  ];
  return (
    <section className="section" id="how">
      <div className="container">
        <SectionHead
          marker="03 · HOW YOUR CLEANUP BECOMES VERIFIED IMPACT"
          title={<>Four steps from<br/>litter to <span className="gradient-text">ledger.</span></>}
          lede="A single workflow whether you're a solo volunteer with a phone or an NGO running a 60-person beach event."
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
          gap: 48,
          alignItems: "start",
        }} className="how-grid">
          {/* LEFT — verification photo with overlay (4/3 matches source 972x729 — no crop) */}
          <div className="photo grainy" style={{ aspectRatio: "4/3" }}>
            <img src={img("public/testimonial2.jpg")} alt="HEM Japan volunteers after a beach cleanup" loading="lazy" />
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
              Log my first cleanup
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
          title={<>One protocol.<br/><span className="gradient-text">Two doors.</span></>}
          lede={<>Same proof, two chains. <span className="hl">Base</span> for one-tap logging in Farcaster. <span className="hl">Celo</span> for NGO-grade events.</>}
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
        }} className="eco-grid">
          <EcoCard
            chain="base"
            chainLogo="public/base-mark.svg"
            chainLabel="L2"
            tag="BASE"
            tagBg="#0052FF"
            title="Mini App"
            kicker="Lightweight entry"
            body="The fastest way for individuals to log a cleanup. Built on Farcaster or the Base app."
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
            chain="celo"
            chainLogo="public/celo-mark.svg"
            chainLabel="L2"
            tag="CELO"
            tagBg="#FAFF00"
            tagColor="#0a0a0a"
            title="Full Platform"
            kicker="For organisers & NGOs"
            body="Geolocation, impact reports and impact portfolio, coordinated campaigns for NGOs and organisers."
            features={[
              { k: "MAP",  v: "Geolocation & maps" },
              { k: "RPT",  v: "Hypercert impact reports" },
              { k: "CAMP", v: "Coordinated cleanups & events" },
            ]}
            links={[
              { label: "Open full platform", href: "https://dapp.decleanup.net" },
            ]}
            accent="var(--yellow)"
          />
        </div>
      </div>
    </section>
  );
}

function EcoCard({ chain, chainLogo, chainLabel, tag, tagBg, tagColor = "#fff", title, kicker, body, features, links, accent }) {
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

      {/* Item 10 — chain pill badge with white SVG logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", flexWrap: "wrap" }}>
        <span className={`chain-pill ${chain}`}>
          {chainLogo && (
            <img
              src={img(chainLogo)}
              alt={chain === "base" ? "Base" : "Celo"}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          )}
          {chainLabel}
        </span>
        <span className="meta">{kicker}</span>
      </div>

      <div>
        <h3 className="plakat" style={{ fontSize: "clamp(28px, 4.4vw, 56px)", margin: 0, letterSpacing: "0.02em" }}>
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
            className="btn btn-ghost"
            style={{ minHeight: 40, padding: "0 14px" }}>
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ---------- BUILT ON (NEW SECTION per brief) ----------
function BuiltOnSection() {
  const stack = [
    { name: "Hypercerts",        role: "Onchain impact certificates per verified cleanup", href: "https://hypercerts.org",                  file: "public/images/built-on/hypercerts-logo.svg" },
    { name: "Farcaster",         role: "Social layer · mini app on Base frames",            href: "https://farcaster.xyz",                   file: "public/images/built-on/farcaster-logo.svg" },
    { name: "Pimlico",           role: "Smart accounts · gasless UX on Base",               href: "https://pimlico.io",                      file: "public/images/built-on/pimlico-logo.svg" },
    { name: "Supabase",          role: "Backend · profiles & verification queue",           href: "https://supabase.com",                    file: "public/images/built-on/supabase-logo.svg" },
    { name: "Reown",             role: "Wallet connection for the Celo dApp",               href: "https://reown.com",                       file: "public/images/built-on/reown-logo.svg" },
    { name: "ENS",               role: "Onchain identity · decleanupnet.eth",               href: "https://ens.domains",                     file: "public/images/built-on/ens-logo.svg" },
    { name: "YOLO Detection",    role: "AI · trash type & volume from photos",              href: "https://ultralytics.com",                 file: "public/images/built-on/yolo-logo.svg" },
    { name: "Google Auth",       role: "OAuth 2.0 · alternative to wallet login",           href: "https://developers.google.com/identity",  file: "public/images/built-on/google-logo.svg" },
  ];
  return (
    <section className="section" id="builton" style={{ paddingTop: "calc(var(--section-py) * 0.7)", paddingBottom: "calc(var(--section-py) * 0.7)" }}>
      <div className="container">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 28,
          borderBottom: "1px solid var(--line-soft)",
          paddingBottom: 18,
          flexWrap: "wrap",
          gap: 16,
        }}>
          <div>
            <div className="meta" style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 24, height: 1, background: "var(--green)" }}></span>
              <span>BUILT ON</span>
            </div>
            <h2 className="plakat scan-in" style={{ fontSize: "clamp(28px, 5vw, 64px)", margin: 0, letterSpacing: "-0.02em", lineHeight: 0.9 }}>
              Open infrastructure.<br/>
              <span className="gradient-text">No reinvention.</span>
            </h2>
          </div>
          <p className="serif-italic" style={{ color: "var(--ink-mute)", fontSize: 18, margin: 0, maxWidth: 320, lineHeight: 1.4 }}>
            The protocols and tools powering the DeCleanup Network stack.
          </p>
        </div>

        <div className="builton-grid">
          {stack.map((t) => (
            <a key={t.name} className="builton-cell" href={t.href} target="_blank" rel="noopener noreferrer">
              <div className="builton-logo">
                {t.file ? (
                  <BuiltOnLogo file={t.file} fileDark={t.fileDark} name={t.name} />
                ) : (
                  <div className="builton-placeholder">{t.name}</div>
                )}
              </div>
              <div>
                <div className="builton-name">{t.name}</div>
                <div className="builton-role">{t.role}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Renders logo if file exists, falls back to monospace name placeholder otherwise.
// If `fileDark` is provided, renders TWO imgs — one shown per theme via CSS, with
// the brightness/invert filter skipped (used for logos whose layered fills break the silhouette filter).
function BuiltOnLogo({ file, fileDark, name }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) {
    return <div className="builton-placeholder">{name}</div>;
  }
  if (fileDark) {
    return (
      <>
        <img className="logo-themed logo-themed-kraft" src={img(file)} alt={name} loading="lazy" onError={() => setFailed(true)} />
        <img className="logo-themed logo-themed-dark" src={img(fileDark)} alt={name} loading="lazy" onError={() => setFailed(true)} />
      </>
    );
  }
  return (
    <img
      src={img(file)}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

Object.assign(window, { WhyDeCleanup, DmrvSection, HowSection, EcosystemSection, BuiltOnSection });
