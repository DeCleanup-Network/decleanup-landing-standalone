/* global React, MemoHead, ChainPill, HEADLINE_STATS, LEAD_FIGS, MARKET_GROWTH, PCX_FACT, REG, CONTACT, window */
// ===========================
// Investor memo — top: Masthead · 01 Category · 02 Why now · 03 Moat
// Data-forward, no field photography (those live on the landing).
// ===========================

function Masthead({ thesis }) {
  return (
    <section id="top" className="masthead">
      <div className="masthead-meta">
        <span className="live"><span className="live-dot"></span> INVESTOR MEMO</span>
        <span>tRWI THESIS</span>
        <span>CELO + BASE</span>
        <span style={{ color: "var(--ink-faint)" }}>INFORMATION ONLY · NOT A SECURITIES OFFERING</span>
      </div>

      <h1 className="masthead-title"><span className="accent">Proof</span> over promises.</h1>

      <p className="masthead-thesis">{thesis}</p>

      <div style={{ display: "flex", gap: 10, marginTop: 30, flexWrap: "wrap" }}>
        <a className="btn btn-primary" href={CONTACT.email}>Contact the founders</a>
        <a className="btn btn-ghost" href="#category">Read the thesis</a>
      </div>

      <div className="lead-figs">
        {LEAD_FIGS.map((f) => (
          <div className="lead-fig" key={f.n}>
            <div className="n">{f.n}</div>
            <div className="l">{f.l}</div>
            <div className="s">{f.s}</div>
          </div>
        ))}
      </div>

      <p className="masthead-note">
        This memo covers only what the public landing page does not: market, business model, comparables and token framing.
        For the product itself — how a cleanup becomes verified impact — see <a href="https://decleanup.net" style={{ color: "var(--green)", textDecoration: "none" }}>decleanup.net ↗</a>.
      </p>
    </section>
  );
}

// ---------- 01 · CATEGORY / MARKET ----------
function CategorySection() {
  return (
    <section className="memo-sec" id="category">
      <MemoHead
        num="01"
        kicker="The category"
        title={<>tRWI is the impact-sibling of <span className="accent">tokenized real-world assets.</span></>}
        lede={<>Where RWA tokenizes a Treasury or a building, tRWI tokenizes an independently provable cleanup event — settled on rails investors already fund. A DeCleanup-originated framing, not yet an established market term.</>}
      />

      <div className="stat-grid" style={{ marginTop: 8 }}>
        {HEADLINE_STATS.map((s) => (
          <div className="stat-cell" key={s.num}>
            <div className={`stat-num${s.accent ? "" : " amber"}`}>{s.num}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-src">{s.src}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 36, maxWidth: 560 }}>
        <div className="meta" style={{ marginBottom: 16, color: "var(--ink-dim)" }}>ADJACENT MARKET · PLASTIC CREDITS</div>
        <div className="databar">
          {MARKET_GROWTH.map((m, i) => (
            <div className="row" key={m.label}>
              <div className="row-head">
                <span className="row-label">{m.label}</span>
                <span className="row-val">{m.val}</span>
              </div>
              <div className="track"><div className={`fill${i === 0 ? " faint" : ""}`} style={{ width: m.pct + "%" }}></div></div>
            </div>
          ))}
        </div>
        <p className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 16, letterSpacing: "0.04em", lineHeight: 1.6 }}>
          A credibility-starved market projected to grow ~4× this decade — exactly where a verification-first protocol can position.
        </p>
      </div>
    </section>
  );
}

// ---------- 02 · WHY NOW ----------
function WhyNowSection() {
  return (
    <section className="memo-sec" id="why-now">
      <MemoHead
        num="02"
        kicker="Why now"
        title={<>Voluntary reporting becomes a <span className="accent">legal duty.</span></>}
        lede="Buyers increasingly pay only for provable impact — just as regulation turns measurement into a legal obligation and the legacy way of proving it breaks down."
      />

      <div className="two-col" style={{ marginTop: 8, gap: 40, gridTemplateColumns: "1.05fr 1fr", alignItems: "start" }}>
        <div>
          <div className="meta" style={{ marginBottom: 16, color: "var(--green)" }}>→ REGULATION FORCES MEASUREMENT</div>
          <div className="reg-timeline">
            {REG.map((r) => (
              <div className="reg-row" key={r.date}>
                <span className="reg-date">{r.date}</span>
                <div>
                  <div className="reg-label">{r.label}</div>
                  <div className="reg-note">{r.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="integrity">
          <div className="meta" style={{ marginBottom: 14, color: "var(--ink-dim)" }}>× THE CREDIBILITY GAP</div>
          <p style={{ color: "var(--ink)", fontSize: 15, margin: "0 0 20px", lineHeight: 1.55 }}>{PCX_FACT}</p>
          <div className="databar">
            <div className="row">
              <div className="row-head">
                <span className="row-label">Actually recycled</span>
                <span className="row-val">14%</span>
              </div>
              <div className="track"><div className="fill amber" style={{ width: "14%" }}></div></div>
            </div>
            <div className="row">
              <div className="row-head">
                <span className="row-label">Claimed "plastic neutral"</span>
                <span className="row-val">100%</span>
              </div>
              <div className="track"><div className="fill faint" style={{ width: "100%" }}></div></div>
            </div>
          </div>
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>SourceMaterial via Al Jazeera · 2025</div>
        </div>
      </div>
    </section>
  );
}

// ---------- 03 · MOAT (dMRV as prose — no re-drawn schematic) ----------
function MoatSection() {
  return (
    <section className="memo-sec" id="moat">
      <MemoHead
        num="03"
        kicker="The moat"
        title={<>Provenance over <span className="accent">perception.</span></>}
        lede={<>Each cleanup is turned into a geotagged, timestamped proof, signed and issued natively on-chain as a Hypercert — verifiable impact on <span className="hl">waste</span>, settled across two L2s.</>}
      />

      <div className="moat-grid" style={{ marginTop: 8 }}>
        <div className="moat-tile"><div className="k">No common standard</div><p className="v">Plastic credits have no worldwide standard. DeCleanup sets a verifiable, on-chain one.</p></div>
        <div className="moat-tile"><div className="k">Born on-chain</div><p className="v">Native issuance with proof attached to every unit — not bridged paper credits.</p></div>
        <div className="moat-tile"><div className="k">Audit-ready</div><p className="v">Every unit is geotagged, timestamped and independently checkable on-chain.</p></div>
      </div>

      <a className="xref" href="https://decleanup.net/#dmrv" target="_blank" rel="noopener noreferrer">
        See the full dMRV verification flow on the main site <span className="arr">↗</span>
      </a>
      <p className="mono" style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 16, letterSpacing: "0.06em", lineHeight: 1.6 }}>
        Full verification logic and on-chain issuance details are shared with serious counterparties on request.
      </p>
    </section>
  );
}

Object.assign(window, { Masthead, CategorySection, WhyNowSection, MoatSection });
