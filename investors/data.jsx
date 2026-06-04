/* global window */
// ===========================
// Investor brief, content data
// Every figure here survived the dossier's adversarial verify pass.
// Refuted/unverified items are deliberately excluded.
// DCU-specific values are tagged FOUNDER INPUT in the UI, not invented.
// ===========================

// Thesis-line bank (from dossier "Hero-thesis-line pattern bank").
const THESIS_LINES = {
  "Integrity wedge": "Every cleanup, verified by photo, geolocation, AI and an onchain record, so funders can prove the impact they paid for.",
  "Category bridge": "Tokenized Real-World Impact is to verified cleanup what RWA is to Treasuries: independently provable impact, onchain, anywhere.",
  "Contrast to crisis": "Impact markets have a trust problem. DeCleanup Network turns ground-truth cleanup into tamper-resistant, onchain proof.",
  "Demand-led": "The verification rail for organizations that fund real-world cleanup and need independent, auditable proof of impact-per-dollar.",
};

// The three strongest confirmed numbers to lead with.
const HEADLINE_STATS = [
  {
    num: "<16%",
    label: "of issued carbon credits represented real emission reductions, the broken link verification is built to fix.",
    src: "Probst et al., Nature Communications · 2024",
    accent: true,
  },
  {
    num: "~$30B",
    label: "tokenized real-world assets (RWA), up nearly 4× in two years. tRWI is the impact-sibling of that market.",
    src: "a16z, State of Crypto 2025",
  },
  {
    num: "~$10B",
    label: "DePIN sector generating ~$72M onchain revenue, proof the onchain rails are real infrastructure, not hype.",
    src: "Messari, State of DePIN 2025",
  },
];

// Direct waste-side integrity anchor.
const PCX_FACT = "Only 14% of one major plastic-credit issuer's volume went to recycling while buyers claimed “plastic neutral”, most was burned as fuel in cement kilns.";

// Buyer-segment table (pricing cells the verify pass refuted are omitted).
const SEGMENTS = [
  {
    seg: "Corporate sustainability / ESG",
    buy: "Plastic credits, project sponsorship, recycled feedstock",
    verify: "Provider certificates + periodic audits",
    wedge: "Real-time photo + geo + AI + onchain proof of the physical cleanup event, per unit",
  },
  {
    seg: "Credit aggregators & retailers",
    buy: "Wholesale credits resold to corporates",
    verify: "Registry standards + self-reporting",
    wedge: "Ground-truth layer that cuts phantom-credit / additionality risk at issuance",
  },
  {
    seg: "Development finance & aid",
    buy: "Results-based payments, grants, waste-sector loans",
    verify: "Independent verification before disbursement, costly and slow",
    wedge: "dMRV-as-a-service: cheaper, faster, auditable proof + cost-per-impact",
  },
  {
    seg: "Climate / environmental philanthropy",
    buy: "Grants tied to impact reporting",
    verify: "Self-report + site visits",
    wedge: "Auditable, geotagged, onchain impact ledger",
  },
  {
    seg: "Crypto-native impact buyers",
    buy: "Tokenized credits for treasury / retirement",
    verify: "Onchain retirement bridged from off-chain registries",
    wedge: "Born-onchain units with ground-truth attestation, not bridged paper",
  },
];

// Competitor comparison, DIRECT plastic/waste set only (carbon/solar excluded from public matrix).
const COMPARABLES = [
  {
    name: "DeCleanup Network",
    dcu: true,
    model: "Onchain verified cleanup impact + rewards on waste",
    mrv: "photo + geo + AI + onchain dMRV",
    standard: "Live on Base + Celo",
    weak: "Early-stage; pipeline reserved",
  },
  {
    name: "Plastic Bank",
    model: "Collection-credit + recycled feedstock",
    mrv: "Provider chain-of-custody / certificates",
    standard: "No common standard",
    weak: "Self-reported tonnage; collection-vs-recycling scrutiny",
  },
  {
    name: "CleanHub",
    model: "Plastic-credit collection platform",
    mrv: "ISO 14064-3, TÜV SÜD-verified",
    standard: "No common standard",
    weak: "Self-reported tonnage",
  },
  {
    name: "Verra PWRS",
    model: "1 credit = 1 tonne above baseline",
    mrv: "Manual third-party audit",
    standard: "Nascent registry",
    weak: "Slow, conflicted audits; additionality failures",
  },
  {
    name: "PCX",
    model: "“Plastic neutral” credits",
    mrv: "Self-report + variable audit",
    standard: "No common standard",
    weak: "Only 14% recycled; rest burned in cement kilns",
  },
];

// $cDCU on Celo, canonical contract + Gardens governance portal.
const CDCU_GOVERNANCE = {
  participate: "250 $cDCU unlocks governance participation",
  full: "500 $cDCU unlocks full governance participation",
};

const CDCU_LINKS = {
  contract: "https://celoscan.io/token/0x34d66e9552e9dc23a24eca13bb1f8f71f4b9bfc1",
  governance: "https://app.gardens.fund/gardens/42220/0x6068dfc4f2aeca09d8d5845896f3aa76d0fe6960",
  governanceTiers: CDCU_GOVERNANCE,
};

// Token utility rails, utility/access/reward framing only. Mechanics = FOUNDER INPUT / LEGAL REVIEW.
const RAILS = [
  {
    k: "Settlement",
    body: "Verified cleanup impact settles natively onchain. $bDCU on Base, $cDCU on Celo, same proof, two reward surfaces.",
  },
  {
    k: "Reward",
    body: "A verified cleanup mints an impact receipt and a reward, recognising the field work behind each unit of proof.",
  },
  {
    k: "Access",
    body: "Rails that let funders direct money into cleanups and receive independent, auditable proof the cleanup happened.",
  },
];

// Lead figures for the masthead (mix of market truth + own traction).
const LEAD_FIGS = [
  { n: "<16%", l: "of issued carbon credits represented real reductions, the trust gap verification closes.", s: "Nature Comms · 2024" },
  { n: "~$30B", l: "tokenized real-world assets onchain, up ~4× in two years. tRWI rides the same rail.", s: "a16z · State of Crypto 2025" },
  { n: "7 / 5", l: "photo-verified cleanup sites across five countries, audited end-to-end.", s: "DeCleanup Network pilots · 2024" },
];

// Plastic-credit market sizing + integrity bars (data-driven, replaces photography).
const MARKET_GROWTH = [
  { label: "Plastic-credit market 2024", val: "~$462M", pct: 26 },
  { label: "Projected by 2031", val: "~$1.79B", pct: 100 },
];

// Traction figures (numbers only, no field photos here, those live on the landing).
const TRACTION_FIGS = [
  { meta: "VERIFIED FOOTPRINT", big: "7 / 5", label: "photo-verified sites across five countries" },
  { meta: "PILOT PARTNERS", big: "2", label: "HEM Japan · Pestathon, confirmed 2024 cleanups" },
  { meta: "LIVE NETWORKS", big: "2", label: "native issuance on Base & Celo, $bDCU & $cDCU", chains: true },
  { meta: "LIVE IMPACT COUNTER", big: "[ LIVE ]", label: "cleanups · kg removed · kg recycled, from the public impact API", live: true },
];

// Contents rail + contact endpoints.
const MEMO_SECTIONS = [
  { id: "category", num: "01", label: "The category" },
  { id: "why-now", num: "02", label: "Why now" },
  { id: "moat", num: "03", label: "The moat" },
  { id: "traction", num: "04", label: "Traction" },
  { id: "buyers", num: "05", label: "Who pays" },
  { id: "comparables", num: "06", label: "Comparables" },
  { id: "token", num: "07", label: "Token rails" },
  { id: "backers", num: "08", label: "Backers" },
];

const CONTACT = {
  email: "mailto:support@decleanup.net?subject=DeCleanup%20Network%20-%20investor%20intro&body=Fund%2Forg%3A%0AStage%2Ffocus%3A%0ATicket%20range%3A%0A",
  supportEmail: "support@decleanup.net",
  supportMailto: "mailto:support@decleanup.net",
  inquiryMailto: "mailto:support@decleanup.net?subject=DeCleanup%20Network%20inquiry",
  telegram: "https://t.me/decentralizedcleanup",
  x: "https://x.com/DeCleanupNet",
};

// Backers, real public-good funders already in the brand.
const BACKERS = [
  { name: "Ethereum for the World", href: "https://fortheworld.eco", src: "public/backers/ethereum.svg", cap: "Ethereum for the World" },
  { name: "Giveth", href: "https://giveth.io", src: "public/backers/giveth.svg", cap: "Giveth" },
  { name: "Gitcoin", href: "https://www.gitcoin.co", src: "public/backers/gitcoin.svg", cap: "Gitcoin" },
  { name: "Octant", href: "https://octant.app", src: "public/backers/octant.svg", wordmark: true },
  { name: "OnlyDust", href: "https://onlydust.com", src: "public/backers/onlydust-logo.svg", wordmark: true },
];

// Regulation timeline, confirmed dates only.
const REG = [
  { date: "18 Mar 2026", label: "EU CSRD enters into force", note: "First reporting FY2027 for firms >1,000 employees & >€450M turnover" },
  { date: "27 Mar 2026", label: "Empowering Consumers Directive transposed", note: "Bans generic, unsubstantiated environmental claims" },
  { date: "27 Sep 2026", label: "Directive 2024/825 applies", note: "Demands publicly verifiable evidence, the audit gap dMRV closes" },
];

Object.assign(window, {
  THESIS_LINES, HEADLINE_STATS, PCX_FACT, SEGMENTS, COMPARABLES, RAILS, CDCU_GOVERNANCE, CDCU_LINKS, BACKERS, REG,
  LEAD_FIGS, MARKET_GROWTH, TRACTION_FIGS, MEMO_SECTIONS, CONTACT,
});
