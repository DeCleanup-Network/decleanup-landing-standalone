/* global React, SectionHead, Splitflap, img */
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
          title={<>Real people.<br/>Real beaches. <span className="gradient-text">Real bags.</span></>}
          lede="Two pilot orgs. 21 volunteers. 13 cleanups across Japan, Nigeria, and Thailand. Every entry signed."
        />

        {/* Editorial photo collage — asymmetric magazine layout:
            tall left photo (Abuja, landscape source cropped portrait OK)
            + small portrait photo (Nsukka, native portrait) stacked over
            field-note tile on the right. */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "minmax(180px, auto)",
          gap: 12,
          marginBottom: 56,
        }} className="collage">
          {/* Featured — Thailand community group */}
          <div className="photo" style={{ gridColumn: "span 6", gridRow: "span 2", minHeight: 380 }}>
            <img src={img("public/testimonial5.jpg")} alt="ReFi Thailand community at Ethereum DevConnect in Bangkok, 2024" loading="lazy" />
            <span className="corner-tag">DEVCONNECT · BANGKOK · 2024</span>
          </div>
          {/* Japan */}
          <div className="photo" style={{ gridColumn: "span 3", minHeight: 184 }}>
            <img src={img("public/testimonial7.jpg")} alt="HEM Japan volunteers gathered around DeCleanup proof, overhead view" loading="lazy" />
            <span className="corner-tag">HEM JAPAN · JP · 2024</span>
          </div>
          {/* Nigeria — Abuja group */}
          <div className="photo" style={{ gridColumn: "span 3", minHeight: 184 }}>
            <img src={img("public/testimonial8.jpg")} alt="Students after a campus cleanup in Abuja, Nigeria" loading="lazy" />
            <span className="corner-tag">ABUJA · NG · 2024</span>
          </div>
          {/* Thailand — action */}
          <div className="photo" style={{ gridColumn: "span 3", minHeight: 184 }}>
            <img src={img("public/testimonial3.jpg")} alt="Volunteer collecting litter during a DeCleanup at Ethereum DevConnect, Bangkok 2024" loading="lazy" />
            <span className="corner-tag">BANGKOK · TH · 2024</span>
          </div>
          {/* Nigeria — Nsukka */}
          <div className="photo" style={{ gridColumn: "span 3", minHeight: 184 }}>
            <img src={img("public/testimonial4.jpg")} alt="Volunteer with a collected trash bag in Nsukka, Nigeria" loading="lazy" />
            <span className="corner-tag">NSUKKA · NG · 2024</span>
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
            href="https://x.com/8ooBFBLDKIW0i9L/status/1834633079409033499?s=20"
            org="HEM Japan"
            country="JAPAN · 2024"
            body="Early partner organizing cleanups across Japan using the DeCleanup Network verification system."
            stats={[ { k: "Users", v: "12" }, { k: "Events", v: "9" } ]}
          />
          <CaseCard
            href="https://x.com/trinitymorphy/status/1856394593824014341"
            org="Pestathon"
            country="UNIVERSITY · 2024"
            body="University campaign combining education and action. Students learned environmental care while cleaning campus. DeCleanup Network added 120 USDGLO to Atlantis Impact Miner rewards."
            stats={[ { k: "Users", v: "9" }, { k: "Events", v: "4" } ]}
          />
        </div>

        {/* Testimonials removed per cofounder feedback — restore when we have more to say. */}
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

// ---------- NETWORK SITES (replaces previous "map" section) ----------
// Honest grid of 5 pilot sites instead of a fake world map.
const CLEANUP_POINTS = [
  { city: "Tokyo Bay",   country: "Japan",    cc: "JP", partner: "HEM Japan",    year: "2024", events: 5 },
  { city: "Osaka",       country: "Japan",    cc: "JP", partner: "HEM Japan",    year: "2024", events: 4 },
  { city: "Abuja",       country: "Nigeria",  cc: "NG", partner: "Pestathon",    year: "2024", events: 2 },
  { city: "Nsukka",      country: "Nigeria",  cc: "NG", partner: "Pestathon",    year: "2024", events: 2 },
  { city: "Koh Phangan", country: "Thailand", cc: "TH", partner: "ReFi Phangan", year: "2024", events: "—" },
  { city: "Tulum",       country: "Mexico",   cc: "MX", partner: "Independent",  year: "2024", events: "—" },
  { city: "Moscow",      country: "Russia",   cc: "RU", partner: "Independent",  year: "2024", events: "—" },
];
function CleanupMapSection() {
  return (
    <section className="section sites-section" id="map" style={{ paddingTop: "calc(var(--section-py) * 0.7)", paddingBottom: "calc(var(--section-py) * 0.7)" }}>
      <div className="sites-map-bg" aria-hidden="true" style={{ backgroundImage: `url(${img("public/brand/world-map.png")})` }}></div>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <SectionHead
          marker="05B · NETWORK SITES"
          title={<>Where the <span className="gradient-text">network lives.</span></>}
          lede={<>Seven photo-verified sites across five countries. The protocol's reach is intentionally narrow at launch so every entry can be audited end-to-end.</>}
        />
        <div className="sites-grid">
          {CLEANUP_POINTS.map((p, i) => (
            <article key={p.city} className="site-card">
              <div className="site-card-head">
                <span className="site-pulse">
                  <span className="site-pulse-dot"></span>
                  <span className="site-pulse-ring" style={{ animationDelay: `${i * 0.4}s` }}></span>
                </span>
                <span className="meta">{p.cc} · {p.year}</span>
              </div>
              <div className="site-card-body">
                <div className="plakat site-city">{p.city}</div>
                <div className="site-country">{p.country}</div>
              </div>
              <div className="site-card-foot">
                <span className="mono site-partner">{p.partner}</span>
                <span className="mono site-events">{p.events} events</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TotalImpactSection() {
  const rows = [
    { l: "HEM Japan · events",        v: "9",   delta: "2024 · confirmed" },
    { l: "HEM Japan · active users",  v: "12",  delta: "2024 · confirmed" },
    { l: "Pestathon · events",        v: "4",   delta: "2024 · confirmed" },
    { l: "Pestathon · active users",  v: "9",   delta: "2024 · confirmed" },
    { l: "Pilot partners",            v: "2",   delta: "HEM · Pestathon" },
    { l: "Network live counter",      v: "—",   delta: "onchain · coming Q4 2025" },
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
              title={<>The ledger,<br/>at a <span className="gradient-text">glance.</span></>}
              lede={<>Confirmed numbers from 2024 pilots with <span className="hl">HEM Japan</span> and <span className="hl">Pestathon</span>. The live network counter goes onchain in Q4 2025. No estimates, only what's been signed.</>}
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

// ---------- YOUR TURN (CTA section) ----------
function JoinSection({ onLaunch }) {
  return (
    <section className="section" id="join" style={{ paddingBottom: 0 }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
          <div className="meta" style={{ marginBottom: 18, display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: 1, background: "var(--green)" }}></span>
            <span>07 · YOUR TURN</span>
            <span style={{ width: 24, height: 1, background: "var(--green)" }}></span>
          </div>
          <h2 className="plakat scan-in" style={{ fontSize: "clamp(48px, 8vw, 120px)", lineHeight: 0.88, margin: 0, letterSpacing: "-0.02em" }}>
            One bag.<br/>
            <span className="gradient-text">One Hypercert.</span><br/>
            Onchain forever.
          </h2>
          <p className="serif" style={{ fontSize: "clamp(18px, 1.7vw, 22px)", color: "var(--ink-mute)", margin: "28px auto 0", maxWidth: 580, lineHeight: 1.4 }}>
            Same network. Pick your door.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={onLaunch}>
              Start cleaning
            </button>
            <a className="btn btn-ghost" href="https://t.me/decentralizedcleanup" target="_blank" rel="noopener noreferrer">Telegram</a>
            <a className="btn btn-ghost" href="https://x.com/DeCleanupNet" target="_blank" rel="noopener noreferrer">X / Twitter</a>
            <a className="btn btn-ghost" href="https://farcaster.xyz/decleanupnet" target="_blank" rel="noopener noreferrer">Farcaster</a>
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
            <div className="brand-lockup" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <img src={img("public/brand/logo-icon.png")} alt="" width={36} height={36} style={{ display: "block", borderRadius: 8 }} />
              <img src={img("public/brand/logo-wordmark.png")} alt="DeCleanup Network" className="logo-wordmark" height={24} style={{ width: "auto" }} />
              <span className="plakat logo-wordmark-text" style={{ fontSize: 28, letterSpacing: "0.02em" }}>DeCleanup<span style={{ color: "var(--ink-faint)" }}>.Net</span></span>
            </div>
            <p className="serif" style={{ color: "var(--ink-mute)", fontSize: 17, lineHeight: 1.4, margin: 0, maxWidth: 340 }}>
              Cleanup verification protocol. Open-source. Live on Base + Celo.
            </p>
            <div style={{ marginTop: 24 }}>
              <div className="meta" style={{ marginBottom: 10, color: "var(--ink)" }}>Connect</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
                <a className="footer-link" href="https://t.me/decentralizedcleanup" target="_blank" rel="noopener noreferrer">Telegram</a>
                <a className="footer-link" href="https://x.com/DeCleanupNet" target="_blank" rel="noopener noreferrer">X / Twitter</a>
                <a className="footer-link" href="https://farcaster.xyz/decleanupnet" target="_blank" rel="noopener noreferrer">Farcaster</a>
              </div>
            </div>
          </div>

          <FooterCol title="Resources" links={[
            ["Litepaper", "litepaper.html"],
            ["Tokenomics", "tokenomics.html"],
            ["Theory of change", "toc.html"],
            ["SDG alignment", "sdg.html"],
            ["Investor brief", "investors/"],
            ["Publications", "https://paragraph.com/@decleanupnet"],
          ]} />
          <FooterCol title="Technical" links={[
            ["GitHub", "https://github.com/DeCleanup-Network"],
            ["Dev docs", "https://decleanup.net/docs"],
            ["User guide", "https://decleanup.net/userguide"],
            ["Terms (soon)", "#"],
          ]} />
          <FooterCol title="Support" links={[
            ["Gardens.fund", "https://app.gardens.fund/gardens/42220/0x6068dfc4f2aeca09d8d5845896f3aa76d0fe6960"],
            ["Donate on Giveth", "https://giveth.io/project/decentralized-cleanup-network"],
            ["Fund on CrowdWalrus", "https://www.crowdwalrus.xyz/campaigns/decleanupnet"],
            ["Trade $DCU on Uniswap", "https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0x30171b7014c02229497CdE6745DD3aD821F12b07"],
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

        <p className="meta" style={{ color: "var(--ink-faint)", marginTop: 16, lineHeight: 1.5, fontSize: 10, letterSpacing: "0.04em", maxWidth: 920 }}>
          Nothing on this site is financial, investment, tax, or legal advice, or an offer or solicitation to buy or sell any token or security. $DCU is a utility and reward token tied to verified cleanup activity; availability and features may vary by jurisdiction. Do your own research.
        </p>
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
            <a href={href} className="footer-link"
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

// ---------- BACKED BY (real logos per Landing.docx) ----------
function BackedBySection() {
  // Theme-aware filter applied via CSS (.backers-grid img) — no per-logo overrides needed.
  // All sources are transparent-bg SVGs so they invert cleanly to white (dark theme) or black (kraft theme).
  const backers = [
    { name: "Ethereum for the World", href: "https://fortheworld.eco",  src: "public/images/backers/ethereum.svg" },
    { name: "Giveth",                  href: "https://giveth.io",         src: "public/images/backers/giveth.svg" },
    { name: "Gitcoin",                 href: "https://www.gitcoin.co",    src: "public/images/backers/gitcoin.svg" },
    { name: "Octant",                  href: "https://octant.app",        src: "public/images/backers/octant.svg",   wordmark: true },
    { name: "OnlyDust",                href: "https://onlydust.com",      src: "public/images/backers/onlydust-logo.svg", wordmark: true },
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
          gridTemplateColumns: `repeat(${backers.length}, 1fr)`,
          gap: 0,
          border: "1px solid var(--line)",
          borderRadius: 14,
          overflow: "hidden",
        }} className="backers-grid">
          {backers.map((b, i) => (
            <a key={b.name} href={b.href} target="_blank" rel="noopener noreferrer nofollow" style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16,
              padding: 24,
              borderRight: i < backers.length - 1 ? "1px solid var(--line)" : "none",
              background: "var(--bg-elev)",
              color: "var(--ink)",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
              minHeight: 180,
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-elev-2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-elev)"; }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.12em" }}>0{i + 1}</span>
              {b.src ? (
                <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%" }}>
                  <img
                    src={img(b.src)}
                    alt={b.name + " logo"}
                    loading="lazy"
                    style={{ maxHeight: 48, maxWidth: "100%", objectFit: "contain", opacity: 0.95 }}
                  />
                </div>
              ) : (
                <div style={{
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: "var(--ink-faint)",
                  border: "1px dashed var(--line)",
                  borderRadius: 4,
                  padding: "0 10px",
                  background: "repeating-linear-gradient(135deg, transparent 0 6px, rgba(255,255,255,0.04) 6px 7px)",
                  textTransform: "uppercase",
                  justifyContent: "center",
                }}>[ onlydust logo — add ]</div>
              )}
              {/* Icon-only marks need a caption; wordmark logos already contain their name */}
              {!b.wordmark && (
                <span style={{ fontFamily: "var(--f-sans)", fontWeight: 500, fontSize: 13, color: "var(--ink-mute)", lineHeight: 1.2 }}>{b.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- RESOURCES / DOCUMENTATION STRIP ----------
function ResourcesSection() {
  const docs = [
    { t: "Litepaper",        d: "The full thesis — verifiable, governable, fundable impact.",   href: "litepaper.html",  tag: "v.2" },
    { t: "Tokenomics",       d: "The dual-token model: $bDCU for action, $cDCU for proof.",      href: "tokenomics.html", tag: "$bDCU · $cDCU" },
    { t: "Theory of Change", d: "Why cleanup stays invisible — and how DeCleanup fixes it.",     href: "toc.html",        tag: "v2.2" },
    { t: "SDG alignment",    d: "How DeCleanup maps to five UN Sustainable Development Goals.",   href: "sdg.html",        tag: "SDG 11·12·13·14·15" },
  ];
  return (
    <section className="section" id="resources" style={{ paddingTop: 0, paddingBottom: "calc(var(--section-py) * 0.6)" }}>
      <div className="container">
        <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--bg-elev)", padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18, gap: 16, flexWrap: "wrap" }}>
            <h3 className="plakat" style={{ fontSize: 28, margin: 0, letterSpacing: "0.02em" }}>
              Read the <span className="gradient-text">protocol</span>
            </h3>
            <span className="meta" style={{ color: "var(--ink-faint)" }}>DOCUMENTATION</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }} className="sdg-grid">
            {docs.map((doc) => (
              <a key={doc.href} href={doc.href} style={{
                display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 18,
                padding: "18px 16px", background: "var(--bg)", border: "1px solid var(--line-soft)",
                borderRadius: 10, color: "var(--ink)", textDecoration: "none", minHeight: 150,
                transition: "border-color 0.15s ease, transform 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--green)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line-soft)"; e.currentTarget.style.transform = "none"; }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{doc.tag}</div>
                <div>
                  <div className="plakat" style={{ fontSize: 19, letterSpacing: "0.01em", marginBottom: 6 }}>{doc.t}</div>
                  <div style={{ fontFamily: "var(--f-sans)", fontSize: 13, lineHeight: 1.4, color: "var(--ink-mute)" }}>{doc.d}</div>
                </div>
                <div className="meta" style={{ color: "var(--green)" }}>Read →</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- INVESTORS BAND ----------
function InvestorsSection() {
  return (
    <section className="section" id="investors" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ border: "1px solid var(--line)", borderRadius: 14, background: "var(--bg-elev)", padding: "clamp(28px, 4vw, 44px)" }}>
          <div className="meta" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ width: 28, height: 1, background: "var(--green)" }}></span>
            <span>FOR INVESTORS &amp; FUNDERS</span>
          </div>
          <h2 className="plakat" style={{ fontSize: "clamp(30px, 4.5vw, 50px)", margin: 0, lineHeight: 1.02, letterSpacing: "0.01em" }}>
            Back impact you can <span className="gradient-text">prove.</span>
          </h2>
          <p className="serif" style={{ color: "var(--ink-mute)", fontSize: 17, lineHeight: 1.45, margin: "18px 0 0", maxWidth: 560 }}>
            DeCleanup turns real-world cleanup into independently verifiable, on-chain impact — so climate funds, corporates and grant programs can fund outcomes they can audit, not promises. Live on Base + Celo.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            <a className="btn btn-primary" href="investors/">Read the investor brief →</a>
            <a className="btn btn-ghost" href="mailto:hello@decleanup.net?subject=DeCleanup%20%E2%80%94%20investor%20intro">Talk to the founders</a>
          </div>
          <p className="meta" style={{ color: "var(--ink-faint)", marginTop: 20, fontSize: 10, letterSpacing: "0.04em", maxWidth: 720, lineHeight: 1.5 }}>
            Information only — not financial advice, and not an offer or solicitation to buy or sell any token or security.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- SDG STRIP (with UN CDN images, lazy-loaded per brief item 11) ----------
function SdgStrip() {
  const UN = "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/08";
  const sdgs = [
    { num: 11, label: "Sustainable Cities",      href: "https://www.un.org/sustainabledevelopment/cities/",                          src: `${UN}/E-Goal-11-1024x1024.png`, alt: "SDG 11: Sustainable Cities and Communities" },
    { num: 12, label: "Responsible Consumption", href: "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/", src: `${UN}/E-Goal-12-1024x1024.png`, alt: "SDG 12: Responsible Consumption and Production" },
    { num: 13, label: "Climate Action",          href: "https://www.un.org/sustainabledevelopment/climate-change/",                  src: `${UN}/E-Goal-13-1024x1024.png`, alt: "SDG 13: Climate Action" },
    { num: 14, label: "Life Below Water",        href: "https://www.un.org/sustainabledevelopment/oceans/",                          src: `${UN}/E-Goal-14-1024x1024.png`, alt: "SDG 14: Life Below Water" },
    { num: 15, label: "Life on Land",            href: "https://www.un.org/sustainabledevelopment/biodiversity/",                    src: `${UN}/E-Goal-15-1024x1024.png`, alt: "SDG 15: Life on Land" },
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
              Aligned with the United Nations <span className="gradient-text">SDGs</span>
            </h3>
            <a className="meta" href="sdg.html" style={{ color: "var(--ink)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              FULL ALIGNMENT BRIEF
            </a>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 8,
          }} className="sdg-grid">
            {sdgs.map((g) => (
              <a key={g.num} href={g.href} target="_blank" rel="noopener noreferrer nofollow" style={{
                display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between",
                gap: 14,
                padding: "16px 14px",
                background: "var(--bg)",
                border: "1px solid var(--line-soft)",
                borderRadius: 10,
                color: "var(--ink)",
                textDecoration: "none",
                minHeight: 140,
                transition: "border-color 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--green)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line-soft)"}>
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  width={72}
                  height={72}
                  style={{ display: "block", width: 72, height: 72, objectFit: "contain" }}
                />
                <div>
                  <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>SDG {g.num}</div>
                  <div style={{ fontFamily: "var(--f-sans)", fontWeight: 500, fontSize: 13, lineHeight: 1.3, color: "var(--ink)" }}>{g.label}</div>
                </div>
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

// ---------- GLOSSARY (per Landing.docx — explain all terms in one place) ----------
function GlossarySection() {
  const terms = ["Field Ledger", "Protocol V2", "DMRV", "$bDCU", "$cDCU", "Hypercert", "onchain", "Pilot Partner"];
  return (
    <section className="section" id="glossary" style={{ paddingTop: "calc(var(--section-py) * 0.6)", paddingBottom: "calc(var(--section-py) * 0.6)" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28, gap: 24, flexWrap: "wrap" }}>
          <div>
            <div className="meta" style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 24, height: 1, background: "var(--green)" }}></span>
              <span>TERMINOLOGY · A–Z</span>
            </div>
            <h2 className="plakat scan-in" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", margin: 0, letterSpacing: "-0.02em", lineHeight: 0.9 }}>
              Speak the<br/>
              <span className="gradient-text">language.</span>
            </h2>
          </div>
          <p className="serif-italic" style={{ color: "var(--ink-mute)", fontSize: 17, margin: 0, maxWidth: 360, lineHeight: 1.4 }}>
            Every term we use in the protocol, defined once and used consistently.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 0,
          border: "1px solid var(--line)",
          borderRadius: 14,
          overflow: "hidden",
          background: "var(--bg-elev)",
        }}>
          {terms.map((t, i) => (
            <div key={t} style={{
              padding: "20px 22px",
              borderRight: "1px solid var(--line-soft)",
              borderBottom: "1px solid var(--line-soft)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              minHeight: 150,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", letterSpacing: "0.14em" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontFamily: "var(--f-sans)", fontWeight: 600, fontSize: 16, margin: 0, color: "var(--ink)", letterSpacing: "-0.005em" }}>{t}</h3>
              </div>
              <p style={{ fontFamily: "var(--f-sans)", fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-mute)", margin: 0 }}>
                {GLOSSARY[t]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CommunitySection, CleanupMapSection, TotalImpactSection, BackedBySection, SdgStrip, JoinSection, SiteFooter, GlossarySection });
