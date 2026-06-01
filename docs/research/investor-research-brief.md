# DeCleanup Network — Research Brief for the `/investors` Page

**Theme:** Tokenized Real-World Impact (tRWI)
**Purpose of this document:** a hand-off brief for research agents. It does **not** build the page. It produces the *evidence base* a future `/investors` page (and a closed data-room) will be built on.
**Status:** scope locked with founder (Paul) on 2026-06-01. Ready to distribute to research agents.

---

## 0. Orientation (read first — applies to every block)

### What DeCleanup Network is (one paragraph, for agent grounding)
DeCleanup Network (DCU) is an open-source, decentralized protocol that turns real-world cleanup actions (litter / plastic / waste removal) into **on-chain verified impact + rewards**. It is **live on Base + Celo**. Verification combines **photo + geolocation + AI + on-chain** attestation (the dMRV stack). It aligns to UN SDGs. The product surface includes a verification tool ("dMRV"), a public impact ledger ("Field Ledger"), a protocol upgrade ("Protocol V2"), token symbols `$bDCU` (Base) / `$cDCU` (Celo), and the category framing "tokenized Real-World Impact (tRWI)."

### Positioning (locked) — frame all findings to support this
- **Broad, multi-segment.** DCU is *not* a single-geography play. Cleanups run in **Japan, Koh Phangan (Thailand), Nigeria, Tulum, Moscow** today; the model extends to the **US, EU, and Global South**.
- **Two demand sides to serve, in one protocol:**
  1. **Institutional capital** — organizations, corporates, climate funds, and dev-finance/aid bodies that want to *direct money into real-world cleanups* and need **independent proof the cleanup happened + impact-per-dollar**. They would **use the dMRV tool and the tokenized reward-impact rails as a service**.
  2. **Consumer / volunteer participants** — individuals who clean up, get verified, and earn reward-impact. This is the funnel and the live-data engine.
- **"Global South institutional cleanups" (e.g., Africa) is ONE illustrative case, not the whole thesis.** Research should *expand* this case with data, while keeping the general thesis "verified, fundable, tokenized cleanup impact — anywhere, for anyone."

### Audience for the page (locked) — weight findings accordingly
- **Primary:** Climate / impact VCs **and** strategic buyers (corporate sustainability, grants, dev-finance like UNDP/World Bank/GIZ).
- **Secondary:** crypto-native ReFi/DePIN funds.
- **Implication for the narrative:** lead with **MRV integrity, additionality, credit-market demand, regulation (CSRD/ESG), and cost-per-impact / auditability**. Treat the token as **settlement + reward + access rails** for an impact buyer — **not** as the headline. Crypto-native tokenomics depth lives deeper / in the data-room.

### Hard constraints (NON-NEGOTIABLE — every agent must obey)
1. **Do NOT invent DCU's metrics or tokenomics.** No `$bDCU`/`$cDCU` supply, emission, value-accrual, FDV, or price numbers. Those are founder + legal input. Where the page will need such a number, output the literal token **`[FOUNDER INPUT]`** or **`[LEGAL REVIEW]`** — never a guess.
2. **Disclosable DCU facts = public only.** You may reference: live on Base + Celo; impact API metrics (cleanups, weight removed, weight recycled); 7 photo-verified sites across 5 countries; symbols `$bDCU`/`$cDCU`; dMRV = photo+geo+AI+on-chain; UN-SDG alignment. **Nothing else about DCU** unless it appears on the public site/API. Treat any other DCU-specific claim as `[FOUNDER INPUT]`.
3. **Not a securities offering.** No language framing DCU, `$bDCU`/`$cDCU`, or any reward as an investment contract, a token sale, guaranteed return, or "buy the token." This is market/competitor research for a narrative page, period. If a comparable's *own* materials use such framing, quote it as *their* claim and flag it.
4. **Every non-obvious fact carries a source.** See §Methodology. No source → don't state it as fact.
5. **Recency:** sources **≤ 2 years old** (i.e., 2024-06 or later) unless it's a foundational/definitional reference, in which case label it `[FOUNDATIONAL]` and explain why an older source is used.

---

## Methodology & output contract (every agent follows this)

**Source quality bar (in priority order):**
1. Primary / official: company docs, token-economics papers, on-chain dashboards (Dune, Tokenterminal), regulator texts (EU CSRD/CSRD), standards bodies (Verra, Gold Standard, ICVCM, ISO), audited impact reports.
2. Specialist research: BloombergNEF, Ecosystem Marketplace / Forest Trends, MSCI Carbon Markets, Sylvera, BeZero, Messari, Delphi, a16z *State of Crypto*, DePIN trackers (DePIN Hub, Messari DePIN).
3. Reputable press / analyst blogs — only to *corroborate*, never as a sole source for a hard number.

**Per-claim citation format (required for every fact):**

> `CLAIM` — *Source name*, "Title", **publisher**, **date (YYYY-MM)**, URL. Direct quote: "…". Confidence: High/Med/Low. Notes (methodology caveat, currency/unit, if estimate vs reported).

**Rules:**
- Normalize all money to **USD** and state the year; normalize units (tonnes vs lbs, etc.) and state them.
- Distinguish **reported** (audited/official) from **estimated/projected** (analyst model) — label each.
- If you cannot verify a number to the bar above, write **`UNVERIFIED`** and explain — do **not** smooth it over.
- Flag any source that is **>2 years old**, **vendor-marketing**, or **conflicted** (e.g., a project rating its own MRV).
- No fabricated statistics. A plausible-sounding number without a citation is a failure of the task.

**What each block returns (structured):**
- `summary` (5–8 sentences, the takeaway a founder can paste into a deck)
- `key_facts[]` (each in the citation format above)
- `page_assets[]` (concrete artifacts the page needs: a headline stat, a comparison table, a chart spec, a quote, a logo wall)
- `gaps[]` (what could NOT be verified / needs `[FOUNDER INPUT]` / `[LEGAL REVIEW]`)
- `open_questions[]` (follow-ups for a deeper pass)

---

## Glossary research note (terminology, NOT numbers)

The page must define 6 terms in **investor-and-corporate-friendly language**: **Field Ledger, Protocol V2, $bDCU, $cDCU, dMRV, tRWI**.
**This is a *language* research task, not a tokenomics task.** Agents research **how comparable projects frame analogous concepts** — how others name and explain their "ledger / registry," their "credit / unit," their "MRV / verification," their "protocol upgrade," their token's *utility* (without us copying numbers). Output: 2–3 framing patterns per term + 1 short, jargon-light draft definition each, with `[FOUNDER INPUT]`/`[LEGAL REVIEW]` markers where a real DCU mechanic must be filled in by the team. Do **not** assert any DCU token mechanic.

---

# THE BLOCKS

Each block = **Why it matters → Research questions → What the page needs → Source leads → Output**.
"Source leads" are *starting points to pull from and verify* (≤2yr, with quotes) — **not** pre-approved facts.

---

## Block 1 — Market size, growth & regulation

**Why it matters:** the page must answer "how big is the wave you're riding?" for a climate/impact + corporate audience. DCU is **waste/litter**, so this block must cover **plastic/waste credit markets**, not only carbon.

**Research questions**
- Size & growth (≤2yr + projection) of: **ReFi** (regenerative finance on-chain), the **voluntary impact / voluntary carbon market (VCM)**, and **DePIN** (decentralized physical infrastructure networks).
- **Plastic & waste credit markets specifically:** size, growth, price ranges, standards in use (Verra Plastic Waste Reduction Standard, Ocean-Bound Plastic / OBP). How do plastic credits differ from carbon credits in demand and integrity scrutiny?
- **Who pays, and why now:** corporate net-zero / plastic-neutrality pledges; EPR (Extended Producer Responsibility) laws driving corporate spend on waste.
- **Regulatory tailwinds:** EU **CSRD** + **CSDDD**, ESRS reporting, SEC/ISSB climate disclosure status, EU Green Claims Directive (anti-greenwashing) — what they *force* corporates to measure/report, and how that creates demand for **verifiable** impact data.

**What the page needs**
- 1–2 headline market-size + CAGR stats (one for impact/credit markets, one for DePIN/ReFi as the "rails" trend).
- A "regulation is forcing measurement" paragraph with 2 cited regimes and effective dates.
- A short "plastic/waste credit market" sizing the page can cite as DCU's *adjacent* market.

**Source leads (pull + verify ≤2yr):** Ecosystem Marketplace / Forest Trends *State of the Voluntary Carbon Markets*; BloombergNEF VCM outlook; World Bank *State & Trends of Carbon Pricing*; Verra Plastic Waste Reduction Standard docs + registry; OBP (Zero Plastic Oceans / Control Union) standard; Messari & a16z DePIN/ReFi reports; EU official CSRD/CSDDD/Green Claims texts + EFRAG ESRS; EPR market analyses (e.g., OECD, Eunomia).

**Output:** per the contract. Tag each stat reported vs projected.

---

## Block 2 — Demand side: buyers of verified impact (the investment thesis)

**Why it matters:** this is the **core thesis** — *who will pay DCU (or buy DCU-verified impact), how much, and through what process.* It also tests the founder's specific hypothesis: **organizations that fund cleanups (incl. Global South) and need independent proof → use DCU's dMRV + tokenized reward-impact as a service.**

**Research questions**
- **Segment map with willingness-to-pay and procurement process** for each:
  1. **Corporate sustainability / ESG budgets** — plastic-pledge & net-zero brands (e.g., consumer-goods majors). What do they buy today (credits, project sponsorship, MRV-as-a-service)? Typical ticket sizes?
  2. **Plastic-credit / carbon-credit buyers & retailers** — who aggregates and resells; what proof they demand.
  3. **Development finance & aid** — UNDP, World Bank, GIZ, bilateral donors, large NGOs that **fund cleanups and need impact verification + cost-per-impact**. How do they verify today? Where is the pain?
  4. **Climate / environmental philanthropy** — funds directing grants to cleanups; reporting requirements.
  5. **Crypto-native impact buyers** (secondary) — DAOs, retirement-for-PR, on-chain ESG.
- **The founder's case, researched & expanded:** find **real, named organizations/programs** that (a) mobilize volunteers and (b) deploy capital into physical cleanups (Global South *and* elsewhere — Africa, SE Asia, Latin America, plus developed-market litter programs). For each: how they currently **prove the cleanup happened** and **report impact**, and where dMRV would slot in.
- **MRV-as-a-service / partnership model:** how do comparable verification providers **sell or partner** their MRV to these buyers (licensing, per-credit fee, SaaS, rev-share)? This informs DCU's "organizations *use* our dMRV tool" model.

**What the page needs**
- A **buyer-segment table** (segment → what they buy → how they verify today → DCU wedge).
- 2–3 **named reference programs/orgs** the page can cite as the *kind* of partner DCU serves (the Global South cleanup case as one worked example).
- A crisp **cost-per-verified-impact / auditability** value-prop line aimed at corporate + dev-finance buyers.

**Source leads:** corporate sustainability reports & plastic-pledge trackers (Ellen MacArthur Foundation Global Commitment); Plastic Bank / rePurpose Global / CleanHub published buyer case studies; UNDP & World Bank waste/marine-litter program docs; The Ocean Cleanup & similar org reports; OBP-certified project registries; dev-finance MRV/impact-reporting guidance.

**Output:** per the contract. The buyer-segment table is the priority asset.

---

## Block 3 — Competitors & comparables

**Why it matters:** investors will ask "who else, and why you." DCU's list must be split because **most-cited ReFi names are carbon/forest — DCU is waste.** The *true* comparables are plastic/waste; carbon names are reference for tokenomics & MRV.

**Research questions** — for **each** project below, return a uniform profile:
`model | what they verify | MRV method | token/no-token | tokenomics summary (reference only) | traction (users, credits, GMV, TVL, on-chain activity ≤2yr) | funding | key differentiator vs DCU | weaknesses`

- **Group A — Carbon / forest / solar ReFi (reference comps):** Regen Network, Toucan, KlimaDAO, Glow (Glow Foundation / solar), Silvi, Open Forest Protocol.
- **Group B — Plastic / waste (DIRECT comps — research-priority):** **Plastic Bank, rePurpose Global, Empower (Norway), CleanHub, Verra Plastic Program projects, Ocean-Bound Plastic credit issuers.** Add any DePIN/crypto waste or cleanup projects discovered.
- **Cross-cut:** which of these have **failed or stalled** (token collapse, integrity scandal, low traction) and **why** — investors will want the graveyard, not just the winners.

**What the page needs**
- A **comparison matrix** (rows = projects, columns = the profile fields) with a clear "DCU column" showing differentiation (photo+geo+AI+on-chain dMRV on *waste*, live on 2 L2s, consumer funnel + institutional rails).
- A 2–3 sentence "why incumbents don't cover our wedge" argument.

**Source leads:** each project's own docs / whitepaper / dashboard (Dune, Tokenterminal, registry); Messari/Delphi project profiles; CoinGecko/DefiLlama for token & TVL (≤2yr snapshots, dated); press on failures (e.g., VCM integrity coverage). **Flag self-published traction as vendor-sourced.**

**Output:** per the contract. The comparison matrix is the priority asset.

---

## Block 4 — dMRV as the moat

**Why it matters:** the page's defensibility claim is **verification quality**. Must show *how others verify, where they're weak, and why photo+geo+AI+on-chain on waste is harder to fake* — and pre-empt "your photos can be AI-generated."

**Research questions**
- How do comparables & standards actually do **MRV** today: satellite/remote-sensing, manual audits, sampling, self-reporting, IoT/sensors. Cost, latency, and **failure modes** of each.
- **Documented integrity failures** in impact markets (≤2yr): over-crediting, phantom credits, double-counting, fraud, ratings downgrades (Sylvera/BeZero). What specifically broke trust?
- **Why ground-truth + geotag + AI + on-chain is stronger:** evidence on geotag/EXIF integrity, AI image-verification & tamper/deepfake detection, and on-chain immutability/attestation (EAS, hypercerts) for audit trails.
- **The counter-argument, answered:** how can a photo-based system resist AI-generated/duplicated/staged images? Research current best practice (liveness, device attestation, hashing, time/geo cross-checks) so the page can address it head-on.

**What the page needs**
- A "**how impact is verified — and how it fails**" comparison (methods × weaknesses).
- A short, defensible "**why DCU's stack is harder to game**" sequence (geo + AI + on-chain), each link backed by a source on the *general* technique (not a DCU-specific claim).
- A one-line answer to the AI-fake objection.

**Source leads:** Verra/Gold Standard/ICVCM MRV methodology docs; Sylvera/BeZero/MSCI ratings & downgrade analyses; academic / industry work on geotag & image-tamper detection and content-provenance (C2PA); Ethereum Attestation Service & Hypercerts docs; investigative coverage of VCM integrity failures.

**Output:** per the contract. Keep DCU-specific mechanics as `[FOUNDER INPUT]`; cite only the *general* techniques.

---

## Block 5 — Token / value-accrual models of analogs (REFERENCE ONLY)

**Why it matters:** to write *our* token language later, we need a map of how comparable tokens **claim** to accrue value and **drive demand** — as **reference, explicitly not as DCU's tokenomics.**

**Research questions**
- For tokenized comps (Regen, Toucan, Klima, Glow, others): what is the **token's stated utility** (settlement, staking, governance, access, reward, credit-backing)? What are the **stated demand drivers**? How (if at all) does **protocol activity → token value** in their design?
- Which models **worked vs unraveled**, and the post-mortem reason (mercenary liquidity, reflexive emissions, no real demand, regulatory pressure).
- **Reward/loyalty token patterns** outside crypto-credits (e.g., points → redeemable value) relevant to DCU's "reward-impact" framing for non-crypto users.

**What the page needs**
- A **one-screen reference table**: project → token utility → demand driver → outcome — usable internally to brief the founder + lawyer (likely data-room, not public).
- A neutral "value-accrual patterns in this category" summary the page can reference **without** asserting DCU's mechanics.

**Source leads:** project token-economics papers; Tokenterminal / Dune; Messari/Delphi token teardowns; retrospective analyses of ReFi token performance ≤2yr.

**Output:** per the contract. **Every line must carry the disclaimer that this is comparable-research, not DCU tokenomics.** DCU token mechanics = `[FOUNDER INPUT]`/`[LEGAL REVIEW]`.

---

## Block 6 — Funding landscape & comparable raises (market intel)

**Why it matters:** benchmarks for the eventual ask and for "this category is fundable." **Market intel, not investment advice.**

**Research questions**
- What have ReFi / DePIN / climate-MRV / plastic-credit ventures **raised** (≤2yr): amounts, **lead investors** (e.g., a16z crypto, climate funds, corporates), stage, and **structure** (equity / token / SAFT / grant) where disclosed.
- Notable **grants & ecosystem funding** (Base/Optimism/Celo ecosystem grants, Gitcoin, climate grant programs) relevant to a project live on Base + Celo.
- Valuation ranges / multiples where publicly reported.

**What the page needs**
- A short "**comparable raises**" reference (likely **data-room**, with only non-sensitive bits public) so the founder can position the round.
- A list of **named investors active in this category** (useful for outreach, not for the public page).

**Source leads:** Crunchbase / PitchBook summaries (≤2yr), a16z *State of Crypto*, Climate Tech VC / CTVC, ecosystem-grant announcements, project funding press releases. Flag anything unconfirmed.

**Output:** per the contract. Mark clearly what is **public** vs **data-room-only**. No securities-offering language.

---

## Block 7 — Risks & investor objections (pre-empt them)

**Why it matters:** a credible page anticipates the pushback. A climate/impact + corporate audience is *especially* alert to greenwashing.

**Research questions** — for each risk: the evidence base (≤2yr) **and** the strongest honest counter:
1. **Greenwashing / market-integrity** — the VCM credibility crisis; how it splashes onto all impact tokens; what "high-integrity" now requires (ICVCM Core Carbon Principles, equivalent for plastic).
2. **"ReFi winter" / token-price collapse** — narrative fatigue, dead tokens; how to position a *utility/verification* story rather than a token story.
3. **Regulation of tokens** — MiCA (EU), US token classification uncertainty; why DCU's framing must stay non-securities.
4. **Additionality & double-counting** — the credibility questions every impact buyer asks.
5. **MRV gameability** — AI-fakes, staged cleanups, double-submission (ties to Block 4).
6. **Execution/concentration** — dependence on volunteers, few sites today, partner pipeline.

**What the page needs**
- An internal "**objections & answers**" table (data-room); a *select* few addressed gracefully on the public page (turn the integrity crisis into DCU's *reason to exist*).

**Source leads:** ICVCM Core Carbon Principles; Guardian/SourceMaterial and academic VCM-integrity investigations (≤2yr); ESMA/EU MiCA texts; analyses of failed ReFi tokens; additionality literature.

**Output:** per the contract. Honest counters only — no hand-waving.

---

## Block 8 — Narrative & format of the best ReFi / DePIN / impact investor pages

**Why it matters:** we need a template — structure, length, tone, and the **public-thesis vs closed-data-room split**.

**Research questions**
- Teardown **5–8 strong investor / "for investors" / thesis pages** from ReFi, DePIN, climate-tech, and credible RWA projects (≤2yr where possible). For each: **section order, length, hero claim, which proof points are public, which are gated**, use of metrics, and how they handle the legal "not an offer" framing.
- What lives in a **public thesis page** vs a **closed data-room** (financials, cap table, detailed tokenomics, pipeline, legal).
- Tone calibration for a **climate/impact + corporate** reader vs a crypto reader (our primary is the former).
- The **RWA narrative bridge:** how "tokenized Real-World Assets" pages frame their pitch, and whether **tRWI** ("tokenized Real-World *Impact*") can credibly position as the impact-sibling of RWA for this audience.

**What the page needs**
- A recommended **section skeleton for `/investors`** (ordered), with length per section and a **public vs data-room** label on each.
- A "**hero thesis line**" pattern bank (3–5 examples to adapt — not copy).
- A note on the **legal/disclaimer** treatment comparable pages use (input to `[LEGAL REVIEW]`).

**Source leads:** live investor/thesis pages of comparable projects; ReFi/DePIN pitch teardowns; RWA tokenization explainers (BlackRock BUIDL coverage, Ondo, RWA market reports) ≤2yr; YC/standard "what belongs in a data-room" references `[FOUNDATIONAL]` if older.

**Output:** per the contract. The section skeleton is the priority asset.

---

## Distribution plan (how to run this brief)

**Parallelizable as 8 independent agents** (one per block), each returning the structured `Output` contract. Then **one synthesis pass**:
- **Synthesis deliverable:** a single research dossier = (a) executive summary, (b) the page assets pulled forward (buyer-segment table, comparison matrix, market headline stats, section skeleton), (c) a consolidated `gaps[]` list of everything marked `[FOUNDER INPUT]` / `[LEGAL REVIEW]` / `UNVERIFIED`, (d) full per-block appendices with citations.
- **Cross-checks the synthesis must run:** dedupe stats that appear in multiple blocks (keep the strongest source); confirm no DCU tokenomics/metrics were invented; confirm no securities-offering language; confirm every hard number has a ≤2yr citation or is flagged.

**Suggested sequencing if run serially:** 1 (market) → 2 (demand) → 3 (comps) → 4 (moat) → 7 (risks) → 5 (token ref) → 6 (funding) → 8 (page format), because later blocks reuse earlier findings.

---

## Open items for the founder (fill before the page is written — NOT for agents)
- All DCU tokenomics & non-public metrics (`[FOUNDER INPUT]`): supply/emission/value-accrual of `$bDCU`/`$cDCU`, real user/partner numbers, pipeline.
- Legal review (`[LEGAL REVIEW]`): non-securities framing, token utility wording, any "raise" language, disclaimers.
- Confirm the named reference partners/programs surfaced in Block 2 are acceptable to cite.

---
*Brief prepared 2026-06-01. Scope: market/competitor/format research for a narrative `/investors` page on tokenized Real-World Impact. Not a securities offering. DCU-specific metrics and tokenomics are out of scope by design and reserved for founder + legal input.*
