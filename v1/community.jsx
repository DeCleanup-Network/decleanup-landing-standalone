/* global React, SectionHead */
// ===========================
// Community / Total Impact / Join / Footer
// ===========================

// ---------- COMMUNITY IMPACT ----------
function CommunitySection() {
  return (
    <section className="section" id="community">
      <div className="container">
        <SectionHead
          marker="05 · COMMUNITY IMPACT"
          title={<>Real people.<br/>Real beaches. <span style={{ color: "var(--green)" }}>Real bags.</span></>}
          lede="Participants worldwide use the DeCleanup dApp to turn real-world impact into on-chain products with additional utilities in the ecosystem."
        />

        {/* Editorial photo collage — asymmetric */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "minmax(180px, auto)",
          gap: 12,
          marginBottom: 56,
        }} className="collage">
          <div className="photo" style={{ gridColumn: "span 7", gridRow: "span 2", minHeight: 460 }}>
            <img src={img("public/testimonial1.jpg")} alt="Volunteers gathered around DeCleanup stickers, overhead view" />
            <span className="corner-tag">TOKYO BAY · JP</span>
          </div>
          <div className="photo" style={{ gridColumn: "span 5", minHeight: 224 }}>
            <img src={img("public/testimonial3.jpg")} alt="University students after a campus cleanup in Nigeria" />
            <span className="corner-tag">ABUJA · NG</span>
          </div>
          <div className="photo" style={{ gridColumn: "span 5", minHeight: 224 }}>
            <img src={img("public/testimonial4.jpg")} alt="Volunteer selfie with collected trash bag in Nigeria" />
            <span className="corner-tag">NSUKKA · NG</span>
          </div>
          <div className="photo" style={{ gridColumn: "span 5", minHeight: 200 }}>
            <img src={img("public/testimonial2.jpg")} alt="HEM Japan group photo after cleanup with collected bags" />
            <span className="corner-tag">HEM JAPAN · OSAKA</span>
          </div>
          <div className="photo" style={{ gridColumn: "span 7", minHeight: 200, position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: "var(--bg-elev)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 28 }}>
              <div className="meta" style={{ color: "var(--green)" }}>
                <span className="live-dot" style={{ marginRight: 8 }}></span>
                FIELD NOTE
              </div>
              <div>
                <div className="plakat" style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.9 }}>
                  13<span style={{ color: "var(--green)" }}>+</span>
                </div>
                <div className="meta" style={{ marginTop: 8 }}>VERIFIED EVENTS ACROSS 2024 PILOTS · JAPAN · NIGERIA</div>
              </div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>
                LIVE NETWORK COUNTER — Q4 2025
              </div>
            </div>
          </div>
        </div>

        {/* Two case study cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
          marginBottom: 32,
        }} className="case-grid">
          <CaseCard
            href="https://x.com/8oobfbldkiw0i9l/status/1848054399597523225"
            org="HEM Japan"
            country="JAPAN · 2024"
            body="Early partner organizing cleanups across Japan using DeCleanup's verification system."
            stats={[ { k: "Users", v: "12" }, { k: "Events", v: "9" } ]}
          />
          <CaseCard
            href="https://x.com/trinitymorphy/status/1856394593824014341"
            org="Pestathon"
            country="UNIVERSITY · 2024"
            body="University campaign combining education and action. Students learned environmental care while cleaning campus. DeCleanup added 120 USDGLO to Atlantis Impact Miner rewards."
            stats={[ { k: "Users", v: "9" }, { k: "Events", v: "4" } ]}
          />
        </div>

        {/* Testimonial pull quote */}
        <div style={{
          padding: "40px 48px",
          border: "1px solid var(--line)",
          borderLeft: "4px solid var(--yellow)",
          borderRadius: 12,
          background: "var(--bg-elev)",
        }}>
          <div className="meta" style={{ marginBottom: 16 }}>FIELD TESTIMONY · 03</div>
          <p className="serif-italic" style={{ fontSize: "clamp(20px, 2.4vw, 30px)", lineHeight: 1.35, margin: "0 0 24px", color: "var(--ink)" }}>
            "DeCleanup dApp employs the most simplified system I've encountered in dApps, making it easier for people to participate in environmental protection activities. Even <span className="hl">picking up a single plastic bottle</span> can transform into rewards!"
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--green)", display: "grid", placeItems: "center", color: "#0a0a0a", fontWeight: 700, fontFamily: "var(--f-mono)", fontSize: 13 }}>YH</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Yuichi Hosomo</div>
              <div className="meta" style={{ marginTop: 2 }}>HEM JAPAN · ORGANISER</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ href, org, country, body, stats }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: "block",
      padding: 28,
      border: "1px solid var(--line)",
      borderRadius: 14,
      background: "var(--bg-elev)",
      color: "var(--ink)",
      textDecoration: "none",
      transition: "border-color 0.2s, transform 0.2s",
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--green)"}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line)"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
        <div>
          <div className="meta" style={{ marginBottom: 6 }}>{country}</div>
          <h3 className="plakat" style={{ fontSize: 32, margin: 0, letterSpacing: "0.02em" }}>{org}</h3>
        </div>
        <span className="mono" style={{ fontSize: 14, color: "var(--ink-mute)" }}>↗</span>
      </div>
      <p style={{ color: "var(--ink-mute)", fontSize: 14, lineHeight: 1.55, margin: "0 0 22px" }}>{body}</p>
      <div style={{ display: "flex", gap: 24, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
        {stats.map((s) => (
          <div key={s.k}>
            <div className="plakat" style={{ fontSize: 28, color: "var(--green)" }}>{s.v}</div>
            <div className="meta" style={{ marginTop: 2 }}>{s.k}</div>
          </div>
        ))}
      </div>
    </a>
  );
}

// ---------- TOTAL IMPACT ----------
function TotalImpactSection() {
  const rows = [
    { l: "HEM Japan · events",        v: "9",   delta: "2024 · confirmed" },
    { l: "HEM Japan · active users",  v: "12",  delta: "2024 · confirmed" },
    { l: "Pestathon · events",        v: "4",   delta: "2024 · confirmed" },
    { l: "Pestathon · active users",  v: "9",   delta: "2024 · confirmed" },
    { l: "Pilot partners",            v: "2",   delta: "HEM · Pestathon" },
    { l: "Network live counter",      v: "—",   delta: "on-chain · coming Q4 2025" },
  ];
  return (
    <section className="section" id="impact" style={{ background: "var(--bg-elev)" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
          gap: 56,
          alignItems: "start",
        }} className="total-grid">
          <div style={{ position: "sticky", top: 96 }}>
            <SectionHead
              marker="06 · TOTAL IMPACT"
              title={<>The ledger,<br/>at a glance.</>}
              lede={<>Confirmed numbers from 2024 pilots with <span className="hl">HEM Japan</span> and <span className="hl">Pestathon</span>. The live network counter goes on-chain in Q4 2025 — no estimates, only what's been signed.</>}
            />
            <div className="chip">
              <span className="dot"></span>
              <span className="mono">PILOT FIGURES · 2024</span>
            </div>
          </div>

          <div style={{
            border: "1px solid var(--line)",
            borderRadius: 14,
            background: "var(--bg)",
            overflow: "hidden",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              padding: "14px 24px",
              borderBottom: "1px solid var(--line)",
              gap: 16,
              alignItems: "center",
            }}>
              <span className="meta">METRIC</span>
              <span className="meta" style={{ textAlign: "right" }}>VALUE</span>
              <span className="meta" style={{ textAlign: "right", minWidth: 160 }}>NOTE</span>
            </div>
            {rows.map((r, i) => (
              <div key={r.l} style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                padding: "20px 24px",
                borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--line-soft)",
                alignItems: "baseline",
                gap: 16,
              }}>
                <span className="serif" style={{ fontSize: 22, color: "var(--ink)" }}>{r.l}</span>
                <span className="plakat" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "var(--green)", textAlign: "right", letterSpacing: "0.005em" }}>{r.v}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", textAlign: "right", minWidth: 160, letterSpacing: "0.04em" }}>{r.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- JOIN THE MOVEMENT ----------
function JoinSection({ onLaunch }) {
  return (
    <section className="section" id="join" style={{ paddingBottom: 0 }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
          <div className="meta" style={{ marginBottom: 18, display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: 1, background: "var(--green)" }}></span>
            <span>07 · JOIN THE MOVEMENT</span>
            <span style={{ width: 24, height: 1, background: "var(--green)" }}></span>
          </div>
          <h2 className="plakat" style={{ fontSize: "clamp(48px, 8vw, 120px)", lineHeight: 0.88, margin: 0, letterSpacing: "0.005em" }}>
            One bag.<br/>
            <span style={{ color: "var(--green)" }}>One signal.</span><br/>
            One ledger entry.
          </h2>
          <p className="serif" style={{ fontSize: "clamp(18px, 1.7vw, 22px)", color: "var(--ink-mute)", margin: "28px auto 0", maxWidth: 580, lineHeight: 1.4 }}>
            Connect with the community and explore everything you need to contribute to a cleaner environment.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={onLaunch}>
              Start cleaning
              <span style={{ fontFamily: "var(--f-mono)" }}>→</span>
            </button>
            <a className="btn btn-ghost" href="https://t.me/EcoSynthesisX/443" target="_blank" rel="noopener noreferrer">Telegram ↗</a>
            <a className="btn btn-ghost" href="https://x.com/DeCleanupNet" target="_blank" rel="noopener noreferrer">X / Twitter ↗</a>
            <a className="btn btn-ghost" href="https://farcaster.xyz/decleanupnet" target="_blank" rel="noopener noreferrer">Farcaster ↗</a>
          </div>
        </div>


      </div>
    </section>
  );
}

// ---------- FOOTER ----------
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 40,
          marginBottom: 48,
        }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{
                width: 32, height: 32, borderRadius: 8,
                background: "var(--green)",
                display: "grid", placeItems: "center",
                fontFamily: "var(--f-mono)", fontWeight: 700,
                color: "#0a0a0a",
                fontSize: 16,
              }}>D</span>
              <span className="plakat" style={{ fontSize: 28, letterSpacing: "0.02em" }}>DeCleanup<span style={{ color: "var(--ink-faint)" }}>.Net</span></span>
            </div>
            <p className="serif" style={{ color: "var(--ink-mute)", fontSize: 17, lineHeight: 1.4, margin: 0, maxWidth: 340 }}>
              An SDG-aligned regenerative impact application. Turning local cleanup actions into global, on-chain proof.
            </p>
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 24, letterSpacing: "0.08em" }}>
              decleanup.net · @DeCleanupNet
            </div>
          </div>

          <FooterCol title="Resources" links={[
            ["Litepaper", "https://decleanup.net/litepaper"],
            ["Tokenomics", "https://decleanup.net/tokenomics"],
            ["Theory of change", "https://decleanup.net/toc"],
            ["SDG alignment", "sdg.html"],
            ["Publications", "https://paragraph.com/@decleanupnet"],
          ]} />
          <FooterCol title="Technical" links={[
            ["GitHub", "https://github.com/DeCleanup-Network"],
            ["Dev docs", "https://decleanup.net/docs"],
            ["User guide", "https://decleanup.net/userguide"],
            ["Terms (soon)", "#"],
          ]} />
          <FooterCol title="Support" links={[
            ["Gardens.fund (soon)", "https://gardens.fund"],
            ["Donate on Giveth", "https://giveth.io/project/decentralized-cleanup-network"],
            ["Fund on CrowdWalrus", "https://www.crowdwalrus.xyz/campaigns/decleanupnet"],
            ["Invest in token", "https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0x30171b7014c02229497CdE6745DD3aD821F12b07"],
          ]} />
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 24,
          borderTop: "1px solid var(--line)",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <div className="meta">© 2026 DECLEANUP NETWORK · OPEN-SOURCE · MIT</div>
          <div className="meta" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
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
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} style={{
              color: "var(--ink-mute)",
              fontSize: 14,
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--green)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--ink-mute)"}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- BACKED BY ----------
function BackedBySection() {
  const backers = [
    { name: "Ethereum for the World", href: "https://fortheworld.eco",  short: "ETH" },
    { name: "Giveth",                  href: "https://giveth.io",         short: "GIV" },
    { name: "Gitcoin",                 href: "https://www.gitcoin.co",    short: "GTC" },
    { name: "Octant",                  href: "https://octant.app",        short: "OCT" },
  ];
  return (
    <section className="section" id="backed" style={{ paddingTop: "calc(var(--section-py) * 0.6)", paddingBottom: "calc(var(--section-py) * 0.6)" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32, gap: 24, flexWrap: "wrap" }}>
          <div className="meta" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: 1, background: "var(--green)" }}></span>
            <span>BACKED BY</span>
          </div>
          <span className="meta" style={{ color: "var(--ink-faint)" }}>PUBLIC-GOOD FUNDING · OPEN ECOSYSTEM</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          border: "1px solid var(--line)",
          borderRadius: 14,
          overflow: "hidden",
        }} className="backers-grid">
          {backers.map((b, i) => (
            <a key={b.name} href={b.href} target="_blank" rel="noopener noreferrer nofollow" style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8,
              padding: 28,
              borderRight: i < backers.length - 1 ? "1px solid var(--line)" : "none",
              background: "var(--bg-elev)",
              color: "var(--ink)",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
              minHeight: 140,
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-elev-2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-elev)"; }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.12em" }}>0{i + 1}</span>
              <div>
                <div className="plakat" style={{ fontSize: 30, lineHeight: 1, letterSpacing: "0.02em" }}>{b.name}</div>
                <div className="meta" style={{ marginTop: 8 }}>{b.short} · OPEN ↗</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- SDG STRIP ----------
function SdgStrip() {
  const sdgs = [
    { num: 11, label: "Sustainable Cities",        href: "https://www.un.org/sustainabledevelopment/cities/" },
    { num: 12, label: "Responsible Consumption",   href: "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/" },
    { num: 13, label: "Climate Action",            href: "https://www.un.org/sustainabledevelopment/climate-change/" },
    { num: 14, label: "Life Below Water",          href: "https://www.un.org/sustainabledevelopment/oceans/" },
    { num: 15, label: "Life on Land",              href: "https://www.un.org/sustainabledevelopment/biodiversity/" },
  ];
  return (
    <section className="section" style={{ paddingTop: 0, paddingBottom: "calc(var(--section-py) * 0.6)" }}>
      <div className="container">
        <div style={{
          border: "1px solid var(--line)",
          borderRadius: 14,
          background: "var(--bg-elev)",
          padding: 28,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18, gap: 16, flexWrap: "wrap" }}>
            <h3 className="plakat" style={{ fontSize: 28, margin: 0, letterSpacing: "0.02em" }}>
              Aligned with the United Nations <span style={{ color: "var(--green)" }}>SDGs</span>
            </h3>
            <a className="meta" href="sdg.html" style={{ color: "var(--ink)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              FULL ALIGNMENT BRIEF
              <span style={{ fontFamily: "var(--f-mono)" }}>→</span>
            </a>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 8,
          }} className="sdg-grid">
            {sdgs.map((g) => (
              <a key={g.num} href={g.href} target="_blank" rel="noopener noreferrer nofollow" style={{
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                gap: 18,
                padding: "18px 16px",
                background: "var(--bg)",
                border: "1px solid var(--line-soft)",
                borderRadius: 10,
                color: "var(--ink)",
                textDecoration: "none",
                minHeight: 120,
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--green)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line-soft)"}>
                <span className="plakat" style={{ fontSize: 40, lineHeight: 0.9, color: "var(--green)" }}>{g.num}</span>
                <span style={{ fontSize: 13, lineHeight: 1.3 }}>{g.label}</span>
              </a>
            ))}
          </div>
          <p className="meta" style={{ color: "var(--ink-faint)", marginTop: 18, lineHeight: 1.5, fontSize: 10, letterSpacing: "0.08em" }}>
            The content has not been approved by the United Nations and does not reflect the views of the UN or its officials or Member States.
          </p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CommunitySection, TotalImpactSection, BackedBySection, SdgStrip, JoinSection, SiteFooter });
