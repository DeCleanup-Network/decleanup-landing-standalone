/* global React, img, MemoHead, ChainPill, TRACTION_FIGS, SEGMENTS, COMPARABLES, RAILS, BACKERS, CONTACT, window */
// ===========================
// Investor memo — bottom: 04 Traction · 05 Who pays · 06 Comparables
//   · 07 Token rails · 08 Backers · Disclaimer · Contact
// ===========================

// ---------- 04 · TRACTION (numbers only) ----------
function TractionSection() {
  return (
    <section className="memo-sec" id="traction">
      <MemoHead
        num="04"
        kicker="Traction"
        title={<>Intentionally narrow, so every entry is <span className="accent">auditable.</span></>}
        lede="Reach is deliberately small at launch — every cleanup can be verified end-to-end before the network scales."
      />

      <div className="proof-figs" style={{ marginTop: 8 }}>
        {TRACTION_FIGS.map((f) => (
          <div
            className="proof-tile"
            key={f.meta}
            style={f.live ? { background: "color-mix(in oklch, var(--green) 8%, var(--bg-elev))", borderColor: "color-mix(in oklch, var(--green) 30%, transparent)" } : undefined}
          >
            <span className="meta" style={f.live ? { color: "var(--green)" } : undefined}>{f.meta}</span>
            {f.chains ? (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "4px 0" }}>
                <ChainPill chain="base" />
                <ChainPill chain="celo" />
              </div>
            ) : (
              <div className="big" style={f.live ? { color: "var(--ink)" } : undefined}>{f.big}</div>
            )}
            <div className="stat-label">{f.label}</div>
          </div>
        ))}
      </div>
      <p className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 16, letterSpacing: "0.04em" }}>
        Live counter pulls from the public impact API. Named pipeline and per-partner detail shared with counterparties on request.
      </p>
    </section>
  );
}

// ---------- 05 · WHO PAYS ----------
function BuyersSection() {
  return (
    <section className="memo-sec" id="buyers">
      <MemoHead
        num="05"
        kicker="Who pays"
        title={<>Organizations that fund cleanup and need <span className="accent">proof-per-dollar.</span></>}
        lede="The same rails serve developed-market litter programs, corporate EPR spend and Global-South institutional cleanups — anywhere proof is the binding constraint."
      />

      <div className="table-wrap table-scroll" style={{ marginTop: 8 }}>
        <table className="dtable" style={{ minWidth: 720 }}>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Segment</th>
              <th style={{ width: "24%" }}>What they buy</th>
              <th style={{ width: "26%" }}>How they verify today</th>
              <th style={{ width: "30%" }}>The DeCleanup wedge</th>
            </tr>
          </thead>
          <tbody>
            {SEGMENTS.map((s) => (
              <tr key={s.seg}>
                <td className="seg-name">{s.seg}</td>
                <td>{s.buy}</td>
                <td>{s.verify}</td>
                <td className="wedge">{s.wedge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 16, letterSpacing: "0.04em" }}>
        Named deals, pipeline and per-segment pricing shared with counterparties on request.
      </p>
    </section>
  );
}

// ---------- 06 · COMPARABLES ----------
function ComparablesSection() {
  return (
    <section className="memo-sec" id="comparables">
      <MemoHead
        num="06"
        kicker="Comparables"
        title={<>The only profile combining <span className="accent">layered dMRV on waste.</span></>}
        lede="Direct plastic/waste comparables verify with self-reported paperwork or slow, conflicted manual audits — and have no common worldwide standard."
      />

      <div className="table-wrap table-scroll" style={{ marginTop: 8 }}>
        <table className="dtable" style={{ minWidth: 720 }}>
          <thead>
            <tr>
              <th style={{ width: "16%" }}>Project</th>
              <th style={{ width: "26%" }}>Model</th>
              <th style={{ width: "24%" }}>Verification</th>
              <th style={{ width: "34%" }}>Key weakness</th>
            </tr>
          </thead>
          <tbody>
            {COMPARABLES.map((c) => (
              <tr key={c.name} className={c.dcu ? "row-dcu" : ""}>
                <td className="seg-name">{c.name}{c.dcu && <span className="mono" style={{ display: "block", fontSize: 10, color: "var(--green)", marginTop: 3, letterSpacing: "0.08em" }}>{c.standard}</span>}</td>
                <td>{c.model}</td>
                <td>{c.dcu ? <span className="wedge">{c.mrv}</span> : c.mrv}</td>
                <td>{c.dcu ? c.weak : <span style={{ color: "var(--ink-mute)" }}>{c.weak}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 16, letterSpacing: "0.04em" }}>
        Collection-tonnage figures for comparables are vendor-self-reported, not audited.
      </p>
    </section>
  );
}

// ---------- 07 · TOKEN RAILS ----------
function TokenSection() {
  return (
    <section className="memo-sec" id="token">
      <MemoHead
        num="07"
        kicker="Token rails"
        title={<>Rails, <span className="accent">not a headline.</span></>}
        lede={<>$bDCU and $cDCU are settlement, reward and access rails for verified impact — described as utility only. Supply, emissions and value-accrual sit with counterparties, pending legal review.</>}
      />

      <div className="rail-grid" style={{ marginTop: 8 }}>
        {RAILS.map((r, i) => (
          <div className="rail" key={r.k}>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.12em" }}>{String(i + 1).padStart(2, "0")}</span>
            <h4>{r.k}</h4>
            <p style={{ margin: 0, fontSize: 14, color: "var(--ink-mute)", lineHeight: 1.55 }}>{r.body}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap", alignItems: "center" }}>
        <ChainPill chain="base" />
        <span className="mono" style={{ fontSize: 12, color: "#5d8bff" }}>$bDCU</span>
        <span style={{ color: "var(--ink-faint)" }}>·</span>
        <ChainPill chain="celo" />
        <span className="mono" style={{ fontSize: 12, color: "var(--yellow)" }}>$cDCU</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.04em", marginLeft: "auto" }}>SAME PROOF · TWO REWARD SURFACES</span>
      </div>
    </section>
  );
}

// ---------- 08 · BACKERS ----------
function BackersSection() {
  return (
    <section className="memo-sec" id="backers">
      <MemoHead
        num="08"
        kicker="Backers"
        title={<>Public-good funding, <span className="accent">open ecosystem.</span></>}
        lede="Grant funders and ecosystem programs already supporting the protocol. SDG 11 · 12 · 13 · 14 · 15."
      />

      <div className="logo-wall" style={{ marginTop: 8 }}>
        {BACKERS.map((b, i) => (
          <a key={b.name} className="logo-cell" href={b.href} target="_blank" rel="noopener noreferrer nofollow">
            <span className="idx">0{i + 1}</span>
            <div className="logo-box">
              <img src={img(b.src)} alt={b.name + " logo"} loading="lazy" onError={(e) => { e.currentTarget.outerHTML = '<div class="logo-ph">' + b.name + '</div>'; }} />
            </div>
            {!b.wordmark && <span className="cap">{b.cap}</span>}
          </a>
        ))}
      </div>
      <p className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 16, letterSpacing: "0.04em" }}>
        Advisors and additional partners disclosed with counterparties on request.
      </p>
    </section>
  );
}

// ---------- CONTACT (replaces the data room) ----------
function ContactSection() {
  return (
    <section className="memo-sec" id="contact" style={{ paddingBottom: 24 }}>
      <div className="contact">
        <div>
          <div className="sec-kicker" style={{ marginBottom: 16 }}><span className="t">Next step</span></div>
          <h2 className="memo-h" style={{ marginBottom: 14 }}>Talk to the <span className="accent">founders.</span></h2>
          <p className="memo-lede">
            If the thesis fits your mandate, reach out. We share tokenomics, financial model, cap table and named pipeline directly with serious counterparties — no gated portal, just a conversation.
          </p>
        </div>
        <div className="contact-actions">
          <a className="btn btn-primary" href={CONTACT.email}>Email the founders</a>
          <a className="btn btn-ghost" href={CONTACT.telegram} target="_blank" rel="noopener noreferrer">Reach us on Telegram</a>
          <a className="btn btn-ghost" href={CONTACT.x} target="_blank" rel="noopener noreferrer">X / Twitter</a>
        </div>
      </div>
    </section>
  );
}

// ---------- DISCLAIMER ----------
function DisclaimerSection() {
  return (
    <section className="memo-sec" id="disclaimer" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <span className="legal-flag">Pending legal review</span>
        <span className="meta" style={{ color: "var(--ink-faint)" }}>FINAL WORDING TO BE CONFIRMED BY COUNSEL</span>
      </div>
      <p className="disclaimer">
        This page is for informational purposes only and is not an offer, or solicitation of an offer, to invest in, buy, or sell any token, security, or interest. Nothing here is financial, investment, legal, or tax advice. $bDCU and $cDCU are described solely as settlement, reward and access rails for verified impact. Market figures are drawn from cited third-party sources; collection-tonnage figures for comparable projects are vendor-self-reported and not independently audited. DeCleanup-specific metrics, tokenomics and pipeline are subject to founder and legal confirmation.
      </p>
    </section>
  );
}

Object.assign(window, { TractionSection, BuyersSection, ComparablesSection, TokenSection, BackersSection, ContactSection, DisclaimerSection });
