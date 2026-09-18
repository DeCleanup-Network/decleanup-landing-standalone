/* global React, ReactDOM */
// User Guide - card-per-action flows (Volunteer / Coordinator / Verifier)
const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

const DAPP = "https://dapp.decleanup.net";
const GARDENS = "https://app.gardens.fund/gardens/42220/0x6068dfc4f2aeca09d8d5845896f3aa76d0fe6960";
const TELEGRAM = "https://t.me/decentralizedcleanup";
const SUPPORT = "mailto:support@decleanup.net";
const GAS_MAIL = "mailto:support@decleanup.net?subject=GAS%20FEES%20REQUEST";

const ROLES = [
  { id: "volunteer", label: "Volunteer" },
  { id: "coordinator", label: "Coordinator" },
  { id: "funder", label: "Funder", disabled: true, badge: "soon" },
  { id: "verifier", label: "Verifier" },
];

const TipBus = createContext({ openId: null, setOpenId: () => {} });

function Icon({ name }) {
  return <i className={`ti ${name}`} aria-hidden="true" />;
}

function Tooltip({ term, tip, children }) {
  const id = useRef(`tip-${Math.random().toString(36).slice(2, 9)}`).current;
  const { openId, setOpenId } = useContext(TipBus);
  const open = openId === id;
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpenId(null); };
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, [open, setOpenId]);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenId(open ? null : id);
  };

  return (
    <span
      className={`ug-tip${open ? " is-open" : ""}`}
      ref={wrapRef}
      onMouseEnter={() => setOpenId(id)}
      onMouseLeave={() => setOpenId((cur) => (cur === id ? null : cur))}
    >
      <button
        type="button"
        className="ug-tip-trigger"
        aria-expanded={open}
        aria-describedby={open ? `${id}-pop` : undefined}
        onClick={toggle}
      >
        {children || term}
      </button>
      {open && (
        <span className="ug-tip-pop" id={`${id}-pop`} role="tooltip">
          {tip}
        </span>
      )}
    </span>
  );
}

function GuideCard({ id, icon, action, context, cta, callout, children }) {
  return (
    <article className="ug-card" id={id} data-ug-card>
      <div className="ug-card-row">
        <div className="ug-card-icon"><Icon name={icon} /></div>
        <div className="ug-card-body">
          <h3 className="ug-card-action">{action}</h3>
          {context && <p className="ug-card-context">{context}</p>}
          {cta && <div className="ug-card-cta">{cta}</div>}
          {callout && <div className="ug-callout">{callout}</div>}
        </div>
      </div>
      {children}
    </article>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="ug-progress" aria-hidden="true">
      <div className="ug-progress-fill" style={{ width: `${Math.round(value * 100)}%` }} />
    </div>
  );
}

function useCardProgress(containerRef, deps) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll("[data-ug-card]"));
    if (!cards.length) { setProgress(0); return; }
    const seen = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) seen.add(en.target);
      });
      setProgress(Math.min(1, seen.size / cards.length));
    }, { root: null, threshold: 0.45 });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, deps);
  return progress;
}

function LinkCta({ href, children, external }) {
  return (
    <a
      className="ug-link"
      href={href}
      target={external !== false && href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function ArrowLink({ onClick, children }) {
  return (
    <button type="button" className="ug-link ug-link-btn" onClick={onClick}>
      {children} <Icon name="ti-arrow-right" />
    </button>
  );
}

function ExpandBtn({ open, onClick, children }) {
  return (
    <button type="button" className={`ug-expand-btn${open ? " is-open" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function SubFlow({ children }) {
  return <div className="ug-subflow">{children}</div>;
}

function CashOutChips() {
  const tips = {
    P2P: "Send $cUSD peer to peer via a wallet or payment app your recipient already uses.",
    "Off-ramp": "Convert crypto to local currency through a licensed off-ramp provider.",
    Exchange: "Deposit to an exchange that lists CELO assets, then withdraw to your bank.",
    Swap: "Swap $cUSD to another token on a Celo DEX before cashing out.",
  };
  return (
    <div className="ug-chips">
      {Object.entries(tips).map(([label, tip]) => (
        <Tooltip key={label} term={label} tip={tip}>
          <span className="ug-chip">
            <Icon name={
              label === "P2P" ? "ti-users" :
              label === "Off-ramp" ? "ti-building-bank" :
              label === "Exchange" ? "ti-arrows-exchange" :
              "ti-switch-horizontal"
            } />
            {label}
          </span>
        </Tooltip>
      ))}
    </div>
  );
}

function FundingSubFlow() {
  return (
    <SubFlow>
      <GuideCard
        id="fund-1"
        icon="ti-wallet-off"
        action="Export your wallet"
        context={<>Go to Account Settings, Back up to external wallet, reveal <Tooltip term="private key" tip="A secret code giving you full control over your wallet. Never share it.">private key</Tooltip>, import to MetaMask.</>}
        callout={<>Need CELO for <Tooltip term="gas fees" tip="Small network fees paid in CELO to submit transactions onchain.">gas fees</Tooltip>? Email <a className="ug-link" href={GAS_MAIL}>support@decleanup.net</a> with subject GAS FEES REQUEST.</>}
      />
      <GuideCard
        id="fund-2"
        icon="ti-building-bank"
        action="Join Gardens.fund"
        context={<>Connect your MetaMask wallet, find DeCleanup Network, <Tooltip term="stake" tip="Locking tokens into the community pool to activate voting power.">stake</Tooltip> your $cDCU.</>}
        cta={<LinkCta href={GARDENS}>Open Gardens.fund</LinkCta>}
      />
      <GuideCard
        id="fund-3"
        icon="ti-checkup-list"
        action="Activate governance"
        context="Find Verified Cleanup Fund and tap Activate Governance."
      />
      <GuideCard
        id="fund-4"
        icon="ti-writing"
        action="Create your proposal"
        context={<>Include: date, location, participant count, itemized expenses, <Tooltip term="impact portfolio" tip="Your personal page showing all verified cleanups at dapp.decleanup.net/impact/YOUR-ADDRESS.">impact portfolio</Tooltip> link, social post link, beneficiary address. Max 90 <Tooltip term="$cUSD" tip="A stablecoin on Celo always worth approximately 1 US dollar.">$cUSD</Tooltip>.</>}
      />
      <GuideCard
        id="fund-5"
        icon="ti-hourglass"
        action="Wait for conviction"
        context={<>Votes build over time. Once <Tooltip term="conviction" tip="The longer votes stay on a proposal, the stronger it grows. Once it reaches the level, funds release.">conviction</Tooltip> reaches the threshold, funds release automatically. Allow at least one month.</>}
      />
      <CashOutChips />
    </SubFlow>
  );
}

function TrashAthleteSubFlow() {
  return (
    <SubFlow>
      <GuideCard
        id="ta-1"
        icon="ti-run"
        action="Pick up litter daily"
        context={<>One piece per day for 30 days. Post on socials with <span className="ug-hash">#TrashMob2026MMDD</span> <span className="ug-hash">#GlobalCleanupGamesOrg</span> <span className="ug-hash">#DeCleanupNetwork</span>.</>}
      />
      <GuideCard
        id="ta-2"
        icon="ti-brand-instagram"
        action="Submit your result"
        context="Go to Trash Athlete in the app. Add your social profile link, username, and optional notes."
      />
      <GuideCard
        id="ta-3"
        icon="ti-coin"
        action="Receive 150 $cDCU"
        context="Automatic after verification. No manual claim needed."
      />
    </SubFlow>
  );
}

function InstallTips({ which, onToggle }) {
  return (
    <div className="ug-card-cta" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <button type="button" className={`ug-link ug-link-btn${which === "android" ? " is-active" : ""}`} onClick={() => onToggle("android")}>Android instructions</button>
      <button type="button" className={`ug-link ug-link-btn${which === "ios" ? " is-active" : ""}`} onClick={() => onToggle("ios")}>iOS instructions</button>
    </div>
  );
}

function VolunteerGuide({ onJumpCard, expandFunding, setExpandFunding }) {
  const [installTip, setInstallTip] = useState(null);
  const [expandTA, setExpandTA] = useState(false);

  return (
    <>
      <GuideCard
        id="vol-1"
        icon="ti-device-mobile-down"
        action="Install the app"
        context={<>Go to <LinkCta href={DAPP}>dapp.decleanup.net</LinkCta> in your browser, then add it to your home screen.</>}
        cta={<InstallTips which={installTip} onToggle={(v) => setInstallTip((cur) => (cur === v ? null : v))} />}
      >
        {installTip === "android" && (
          <p className="ug-inline-tip">Chrome: menu, Add to Home screen or Install app. Confirm, then open from your home screen.</p>
        )}
        {installTip === "ios" && (
          <p className="ug-inline-tip">Safari: Share, Add to Home Screen, Add. Open the icon from your home screen.</p>
        )}
      </GuideCard>

      <GuideCard
        id="vol-2"
        icon="ti-login"
        action="Log in with Google"
        context="The app creates a wallet for you automatically."
        cta={<LinkCta href={DAPP}>Open dapp.decleanup.net</LinkCta>}
      />

      <GuideCard
        id="vol-3"
        icon="ti-lock"
        action="Create your passcode"
        context="6-digit code required before your first submit or claim. Enable Face ID after."
      />

      <GuideCard
        id="vol-4"
        icon="ti-camera"
        action="Take your before photo"
        context="Same spot, same angle. Max 10 MB. iPhone users: Settings, Camera, Formats, Most Compatible."
      />

      <GuideCard
        id="vol-5"
        icon="ti-map-pin"
        action="Allow location access"
        context="Required for verification. If it fails, enable Location Services in phone settings."
      />

      <GuideCard
        id="vol-6"
        icon="ti-camera-check"
        action="Take your after photo"
        context="Submit both photos together in the app under Submit Cleanup."
      />

      <GuideCard
        id="vol-7"
        icon="ti-file-description"
        action="Fill in the Impact Report"
        context={<>Waste amount, participant count, each participant's wallet or email. Required for funding. Your <Tooltip term="Impact Report" tip="The form filed with a cleanup: waste, participants, and evidence used for funding and rewards.">Impact Report</Tooltip> stays with the submission.</>}
      />

      <GuideCard
        id="vol-8"
        icon="ti-recycle"
        action="Add Recyclables Report"
        context="Optional. Fill in if you sorted waste by type."
      />

      <GuideCard
        id="vol-9"
        icon="ti-clock"
        action="Wait for verification"
        context="A community verifier reviews your submission. Usually 2 to 12 hours."
      />

      <GuideCard
        id="vol-10"
        icon="ti-trophy"
        action="Claim your level"
        context={<>Once approved, go to your dashboard and tap Claim Level. You earn 10 <Tooltip term="DCU" tip="DCU are action points in the app. Every 50 DCU lets you claim $cDCU tokens.">DCU</Tooltip> plus 5 per report filed.</>}
      />

      <div className="ug-rewards" aria-label="DCU rewards">
        <div className="ug-rewards-scroll">
          <table>
            <thead>
              <tr><th>Action</th><th>DCU</th></tr>
            </thead>
            <tbody>
              <tr><td>Verified cleanup</td><td>10</td></tr>
              <tr><td>Impact report filed</td><td>+5</td></tr>
              <tr><td>Verification (verifier)</td><td>Shown in app</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <GuideCard
        id="vol-11"
        icon="ti-coin"
        action="Claim your $cDCU"
        context={<>Every 50 DCU unlocks one <Tooltip term="$cDCU" tip="The DeCleanup community token. Earns you governance rights and funding access on Gardens.fund.">$cDCU</Tooltip> claim. You need 250 $cDCU to vote or apply for funding.</>}
      />

      <GuideCard
        id="vol-12"
        icon="ti-repeat"
        action="Repeat to grow"
        context={<>10 verified cleanups reach Level 10 and unlock a <Tooltip term="Hypercert" tip="A milestone certificate published permanently onchain. Shareable with sponsors and employers.">Hypercert</Tooltip>: your permanent onchain impact certificate.</>}
      />

      <div className="ug-paths">
        <div className="ug-path-card">
          <div className="ug-card-row">
            <div className="ug-card-icon"><Icon name="ti-seeding" /></div>
            <div className="ug-card-body">
              <h3 className="ug-card-action">Apply for funding</h3>
              <p className="ug-card-context">Once you have 250 $cDCU, you can submit a funding proposal on Gardens.fund.</p>
              <ExpandBtn open={expandFunding} onClick={() => { setExpandFunding((v) => !v); setExpandTA(false); }}>
                See funding steps
              </ExpandBtn>
            </div>
          </div>
        </div>
        <div className="ug-path-card">
          <div className="ug-card-row">
            <div className="ug-card-icon"><Icon name="ti-medal" /></div>
            <div className="ug-card-body">
              <h3 className="ug-card-action">Trash Athlete Challenge</h3>
              <p className="ug-card-context">30 days of daily micro-cleanups earns 150 $cDCU automatically.</p>
              <ExpandBtn open={expandTA} onClick={() => { setExpandTA((v) => !v); setExpandFunding(false); }}>
                See how
              </ExpandBtn>
            </div>
          </div>
        </div>
      </div>

      {expandFunding && <FundingSubFlow />}
      {expandTA && <TrashAthleteSubFlow />}
    </>
  );
}

function CoordinatorGuide({ goVolunteer, setExpandFunding, expandFunding }) {
  return (
    <>
      <GuideCard
        id="coord-1"
        icon="ti-users"
        action="Be a volunteer first"
        context="Complete at least one verified cleanup and reach 250 $cDCU before coordinating."
        cta={<ArrowLink onClick={() => goVolunteer("vol-1")}>Volunteer guide</ArrowLink>}
      />
      <GuideCard
        id="coord-2"
        icon="ti-calendar-event"
        action="Plan your event"
        context={<>Date, location, equipment, logistics. Share <LinkCta href="/userguide" external={false}>decleanup.net/userguide</LinkCta> with all participants.</>}
      />
      <GuideCard
        id="coord-3"
        icon="ti-user-check"
        action="Each person submits their own"
        context="Participants submit individually. You cannot submit on their behalf."
        cta={<ArrowLink onClick={() => goVolunteer("vol-4")}>Submission guide</ArrowLink>}
      />
      <GuideCard
        id="coord-4"
        icon="ti-chart-bar"
        action="Build your impact record"
        context={<>Every verified cleanup adds to your <Tooltip term="Impact Portfolio" tip="Your personal page at dapp.decleanup.net/impact/YOUR-ADDRESS showing all verified cleanups.">Impact Portfolio</Tooltip>. Funders and voters check this.</>}
      />
      <GuideCard
        id="coord-5"
        icon="ti-coin"
        action="Apply for group funding"
        context={<>Same proposal process as volunteers. Cover equipment, logistics, and transport for your group. Max 90 <Tooltip term="$cUSD" tip="A stablecoin on Celo always worth approximately 1 US dollar.">$cUSD</Tooltip>.</>}
        cta={
          <ExpandBtn open={expandFunding} onClick={() => setExpandFunding((v) => !v)}>
            Funding steps
          </ExpandBtn>
        }
      />
      {expandFunding && <FundingSubFlow />}
      <GuideCard
        id="coord-6"
        icon="ti-world"
        action="Become an ambassador"
        context="Active coordinators can represent DeCleanup locally. Reach out on Telegram or email."
        cta={
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <LinkCta href={TELEGRAM}>t.me/decentralizedcleanup</LinkCta>
            <LinkCta href={SUPPORT}>support@decleanup.net</LinkCta>
          </div>
        }
      />
    </>
  );
}

function VerifierGuide() {
  return (
    <>
      <div className="ug-callout ug-intro">Verifier access is assigned by the core team. Apply below.</div>
      <GuideCard
        id="ver-1"
        icon="ti-send"
        action="Apply for the role"
        context="Contact the team with your wallet address and background in environmental or community work."
        cta={
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <LinkCta href={TELEGRAM}>t.me/decentralizedcleanup</LinkCta>
            <LinkCta href={SUPPORT}>support@decleanup.net</LinkCta>
          </div>
        }
      />
      <GuideCard
        id="ver-2"
        icon="ti-eye-check"
        action="Review submissions"
        context="Check before and after photos, location match, waste amounts, and participant data. Approve or reject with a note."
      />
      <GuideCard
        id="ver-3"
        icon="ti-clock-check"
        action="Verify within 12 hours"
        context="Volunteers are waiting to claim. If you cannot verify in time, notify the team on Telegram."
      />
      <GuideCard
        id="ver-4"
        icon="ti-coin"
        action="Earn DCU per verification"
        context="You earn DCU for each approved submission. Amount shown in the rewards table inside the volunteer guide."
      />
    </>
  );
}

function roleFromHash() {
  const h = (window.location.hash || "").replace(/^#/, "").toLowerCase();
  if (h === "coordinator" || h === "verifier" || h === "volunteer") return h;
  return "volunteer";
}

function UserGuideApp() {
  const [role, setRole] = useState(roleFromHash);
  const [openId, setOpenId] = useState(null);
  const [expandFunding, setExpandFunding] = useState(false);
  const [focusCard, setFocusCard] = useState(null);
  const flowRef = useRef(null);
  const progress = useCardProgress(flowRef, [role, expandFunding]);

  useEffect(() => {
    const onHash = () => setRole(roleFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!focusCard) return;
    const t = setTimeout(() => {
      const el = document.getElementById(focusCard);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setFocusCard(null);
    }, 80);
    return () => clearTimeout(t);
  }, [focusCard, role]);

  const selectRole = useCallback((id) => {
    if (id === "funder") return;
    setRole(id);
    setExpandFunding(false);
    setOpenId(null);
    history.replaceState(null, "", `#${id}`);
  }, []);

  const goVolunteer = useCallback((cardId) => {
    setExpandFunding(false);
    setRole("volunteer");
    history.replaceState(null, "", "#volunteer");
    setFocusCard(cardId);
  }, []);

  return (
    <TipBus.Provider value={{ openId, setOpenId }}>
      <div className="ug-app">
        <div className="ug-roles" role="tablist" aria-label="Choose your role">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={role === r.id}
              className={`ug-role-pill${role === r.id ? " is-active" : ""}${r.disabled ? " is-disabled" : ""}`}
              disabled={r.disabled}
              onClick={() => selectRole(r.id)}
            >
              {r.label}
              {r.badge && <span className="ug-soon">{r.badge}</span>}
            </button>
          ))}
        </div>

        <ProgressBar value={progress} />

        <div className="ug-flow" ref={flowRef} role="tabpanel">
          {role === "volunteer" && (
            <VolunteerGuide
              expandFunding={expandFunding}
              setExpandFunding={setExpandFunding}
            />
          )}
          {role === "coordinator" && (
            <CoordinatorGuide
              goVolunteer={goVolunteer}
              expandFunding={expandFunding}
              setExpandFunding={setExpandFunding}
            />
          )}
          {role === "verifier" && <VerifierGuide />}
        </div>
      </div>
    </TipBus.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("userguide-root")).render(<UserGuideApp />);
