# Common concepts — all DeCleanup dapps

Shared architecture and integration rules for **Celo** and **Base** deployments.  
Chain-specific addresses, RPC URLs, and env vars are in [CELO.md](./CELO.md) and [BASE.md](./BASE.md).

---

## On this page

| Section | Jump |
|---------|------|
| [Ecosystem map](#ecosystem-map) | Sites, dapps, repos |
| [Core product loop](#core-product-loop) | Submit → verify → earn → claim |
| [DCU vs chain tokens](#dcu-vs-chain-tokens) | Points vs ERC-20 |
| [Evidence & IPFS](#evidence--ipfs) | Photos, forms, hashes on-chain |
| [Verification](#verification) | Human verifiers, optional ML |
| [Authentication & wallets](#authentication--wallets) | Sign-in and onchain identity |
| [Public impact API](#public-impact-api) | Read-only data for decleanup.net |
| [Hypercerts](#hypercerts) | Impact certificates (Celo) |
| [Data stores](#data-stores) | Chain, Supabase, IPFS |
| [Integration boundaries](#integration-boundaries) | What external sites may do |
| [Security & secrets](#security--secrets) | Operator rules |

---

## Ecosystem map

| Layer | Role | Typical URL |
|-------|------|-------------|
| **Marketing site** | Explains the network; shows live impact stats via public API | https://decleanup.net |
| **Full dapp (Celo)** | Submit cleanups, verify, dashboard, claims, wallet, Hypercerts | https://dapp.decleanup.net |
| **Mini app (Base)** | Lightweight entry via Farcaster, Base app, or browser | https://miniapp.decleanup.net |

Each **chain app** is a Next.js App Router deploy with its own smart-contract stack, token (`$cDCU` on Celo, `$bDCU` on Base), and production URL. They share product semantics (cleanup → verify → DCU → claim) but differ in auth model and claim mechanics — see chain docs.

**Do not** confuse the marketing repo (`decleanup-landing-standalone`) with a dapp repo. Landing sites **read** impact data (from the Celo dapp today); they do not submit cleanups or mint tokens.

---

## Core product loop

Both apps implement the same high-level loop:

```
Connect / sign in → Submit cleanup (photos + GPS → IPFS)
                 → Pending on verification contract
                 → Human verifier approves/rejects
                 → DCU participation points accrue
                 → Impact Product NFT level (optional path)
                 → Hypercert bundle (Celo optional path)
                 → Claim chain ERC-20 when eligible
```

| Stage | On-chain | Off-chain |
|-------|----------|-----------|
| Submit | Verification / Submission contract stores IPFS CIDs, lat/lng, status | Pinata upload, optional ML pre-screen (Celo) |
| Verify | Verifier tx or app-assisted confirm | Verifier UI, Telegram bot (Celo, optional) |
| Earn DCU | Points manager contract buckets | — |
| Claim token | Celo: **ClaimVault** + **CDCUToken** · Base: **PointsRewardDistributor** + **$bDCU** | Eligibility checks, signing (Celo), onchain price read (Base) |

On **Celo**, GPS on **Submission** is stored as **int256 microdegrees** (degrees × 1,000,000). Public feeds divide by `1_000_000` for decimal degrees. Base stores geotag via its verification contract — see [BASE.md](./BASE.md).

---

## DCU vs chain tokens

| | **DCU** | **Chain token** |
|---|---------|-----------------|
| **Celo** | On-chain participation points in `DCURewardManager` | **`$cDCU` (`cDCU`)** — ERC-20 via `CDCUToken` |
| **Base** | On-chain points in `PointsRewardDistributor` | **`$bDCU` (`bDCU`)** — ERC-20 (Clanker deploy) |
| **Type** | Ledger points | Mintable / claimable ERC-20 |
| **How earned** | Verified cleanups, verifier work, streaks, referrals, etc. | **Celo:** ClaimVault mint after EIP-712 signed claim · **Base:** claim via PointsRewardDistributor when eligible |
| **User-facing** | Dashboard stats, claim eligibility | Wallet balance; `$cDCU` also gates Gardens governance on Celo |

Legacy “claim DCU directly to ERC-20” paths are removed. Users accrue **DCU**, then claim **`$cDCU` / `$bDCU`** when eligible.

**Celo claim pattern:**

```
GET  /api/cdcu/eligibility      → server reads DCURewardManager
POST /api/cdcu/claim-request    → server signs EIP-712 payload
User tx: ClaimVault.claim(...)  → vault mints $cDCU
```

**Base claim pattern:** onchain read of points + Impact Product level → user tx on `PointsRewardDistributor` (see [BASE.md § Rewards & rules](./BASE.md#rewards--rules)).

Exact thresholds and multipliers are chain-doc specific.

---

## Evidence & IPFS

1. User captures **before/after photos** and enables **GPS**.
2. Dapp uploads media (and optional JSON on Celo) to **Pinata / IPFS** via server-side upload routes.
3. On-chain submission stores **content hashes** (CIDs), not raw images.
4. Public surfaces may proxy IPFS for OG cards.

Impact report JSON on Celo can gate which photos appear on the public feed (permissions parsed at sync time).

---

## Verification

- **Role:** addresses with verifier permission on the chain verification / submission contract.
- **UI:** `/verifier` in the Celo dapp; verifier flows in the Base mini app.
- **Optional (Celo):** Telegram notifier for new submissions (`TELEGRAM_VERIFIER_BOT.md` in Celo repo).
- **Optional (Celo):** VPS-hosted ML pre-screen — does not replace human approval.

Approve → DCU accrual paths fire; user can claim Impact Product from dashboard.

---

## Authentication & wallets

| Mode | Celo dapp | Base mini app |
|------|-----------|---------------|
| **Embedded (default on Celo)** | Google or email (Auth.js) → Safe smart account (ERC-4337) | — |
| **Wallet (Base default)** | MetaMask / WalletConnect EOA | Farcaster Mini App SDK, Base app embed, RainbowKit |
| **Gas** | Pimlico paymaster when configured | User pays ETH on Base |

Celo: enabled when `NEXT_PUBLIC_AA_AUTH_ENABLED=true`. Passkeys optional via `/api/passkey/*`.

Base: `@farcaster/miniapp-sdk`, `@farcaster/miniapp-wagmi-connector`, WalletConnect.

---

## Public impact API

Marketing sites and third parties consume **read-only** JSON from the **Celo production dapp** today. **No API key.** CORS: `*`.

**Base URL:** `https://dapp.decleanup.net`

| Endpoint | Purpose |
|----------|---------|
| `GET /api/impact/global` | Hero metrics, waste breakdown, top locations |
| `GET /api/impact/cleanups?limit=&offset=` | Paginated verified cleanups |

**Data path:** Celo mainnet → indexer → Supabase `cleanup_feed` → API. Background sync when stale (~60 min) or manual `POST /api/impact/sync` (secret header).

The Base mini app does **not** expose a shared impact API yet. [decleanup.net](https://decleanup.net) hero KPIs and Recent Verifications pull from the Celo dapp.

### Location fields (cleanups feed)

| Field | Notes |
|-------|-------|
| `location.label` | Display line, e.g. `Ko Pha-ngan, Thailand · 9.7°, 100.0°` |
| `location.placeName` | Reverse-geocoded via Nominatim (`accept-language=en`, Latin-script preference) |
| `location.coordinates` | Rounded display string (1 decimal) |
| `location.latitude` / `longitude` | Decimal degrees (WGS84) |
| `impact.wasteTypes` | Waste types for UI “Type” column |

**Recent Verifications table (decleanup.net):**

| UI column | API field |
|-----------|-----------|
| Location | `location.label` |
| Type | `impact.wasteTypes` (joined) |
| Date | `verifiedAt` (ISO 8601) |

Full field reference: `docs/PUBLIC_IMPACT_API.md` in the Celo monorepo.

**Ops note:** After geocoder or schema changes, run impact sync so existing rows get refreshed `placeName` values.

---

## Hypercerts

**Celo only** today. Verified cleanups can be bundled into **Hypercert** certificates:

- Eligibility: `frontend/src/lib/blockchain/hypercerts/` (Celo repo)
- UI: `/hypercerts`, `/create-hypercert`
- DCU bonus via `DCURewardManager.claimHypercertReward`

Product pipeline: `docs/hypercerts-and-impact.md` · code map: `docs/HYPERCERTS.md`.

---

## Data stores

| Store | Celo | Base |
|-------|------|------|
| **L2 RPC** | Celo Forno | Base mainnet RPC |
| **Pinata / IPFS** | Photos, impact JSON, hypercert assets | Cleanup photos |
| **Supabase** | `cleanup_feed`, verifier apps, hypercerts, claims | As configured in mini app repo |
| **Prisma** (optional) | Passkeys, wallet rows when AA enabled | — |

Migrations: `frontend/supabase/migrations/` in each dapp monorepo (Celo).

---

## Integration boundaries

**External sites MAY:**

- Call public impact GET endpoints on the Celo dapp.
- Link users to `dapp.decleanup.net`, `miniapp.decleanup.net`, or Farcaster mini app URLs for submit/claim flows.
- Display on-chain data via explorer links.

**External sites MUST NOT:**

- Assume write access without user wallet + dapp session.
- Embed ClaimVault signer keys, Pinata keys, or `IMPACT_SYNC_SECRET`.
- Treat marketing copy as canonical contract addresses — always verify from deploy JSON + chain doc.

---

## Security & secrets

| Secret | Use | Exposure |
|--------|-----|----------|
| `CLAIM_VAULT_AUTHORIZED_SIGNER_PRIVATE_KEY` | Celo EIP-712 claim signatures | Server only |
| `IMPACT_SYNC_SECRET` | `POST /api/impact/sync` | Server / CI only |
| Supabase service role | DB writes from API routes | Server only |
| Pinata keys | IPFS upload | Server only |
| Pimlico / paymaster keys | Sponsored UserOps (Celo) | Server only |

Rotate per `docs/SECRETS_ROTATION.md` in the dapp repo. Never commit `.env.local` or paste secrets in docs/issues.

---

## Monorepo layout (typical dapp)

| Path | Contents |
|------|----------|
| `frontend/` or app root | Next.js dapp, API routes |
| `contracts/` | Hardhat / Foundry deploy scripts |
| `docs/` | Architecture, token spec, deployment |
| Deploy JSON / `deployed_addresses.json` | Core stack addresses (reconcile before publishing) |

**Run locally (Celo example):**

```bash
cd frontend
cp ENV_TEMPLATE.md .env.local   # fill values
npm install
npm run dev
```

Base mini app: see [BASE.md § Run locally](./BASE.md#run-locally).

---

## Next

- **Celo mainnet:** [CELO.md](./CELO.md)
- **Base mainnet:** [BASE.md](./BASE.md)
