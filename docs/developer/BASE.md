# DeCleanup Rewards on Base — Developer documentation

Master reference for integrators, contributors, and operators on **Base mainnet**.

**Shared concepts (both apps):** [COMMON.md](./COMMON.md)  
**Production mini app:** [miniapp.decleanup.net](https://miniapp.decleanup.net) · **Repo:** [Farcaster-Mini-App](https://github.com/DeCleanup-Network/Farcaster-Mini-App)

**Ecosystem:** DeCleanup Network · **Product on Base:** DeCleanup Rewards (Farcaster Mini App + web)  
**Tagline:** Clean Local. Prove Global. · **Liquid token:** `$bDCU` (Celo counterpart: `$cDCU`)  
**Tone:** Field report / protocol — use **onchain** (one word, no hyphen)

---

## On this page

| Section | Jump |
|---------|------|
| [Overview](#overview) | What the Base stack does |
| [Live URLs](#live-urls) | Surfaces and legal pages |
| [Base network](#base-network) | Chain ID, RPC, explorer |
| [Smart contracts (mainnet)](#smart-contracts--base-mainnet-8453) | Production proxy addresses |
| [Smart contracts (Sepolia)](#smart-contracts--base-sepolia-84532) | Testnet proxies |
| [DCU vs $bDCU](#dcu-vs-bdcu) | Points vs token |
| [Product flow](#product-flow-base) | Cleanup → verify → claim |
| [Rewards & rules](#rewards--rules) | Points, levels, fees |
| [Tech stack](#tech-stack) | Frameworks and integrations |
| [Design system](#shared-design-system) | Brand tokens across ecosystem |
| [Environment variables](#environment-variables) | Frontend env template |
| [Run locally](#run-locally) | Dev setup |
| [Landing integration](#landing-page-integration) | decleanup.net checklist |
| [Celo vs Base](#celo-vs-base-ecosystem-map) | Side-by-side map |
| [Social & community](#social--community) | Official channels |

---

## Overview

**DeCleanup Rewards (Base)** is a Base mainnet mini app where users:

1. Connect a wallet (Farcaster Mini App, Base app embed, or browser via RainbowKit).
2. Submit cleanups with before/after photos and geotag (IPFS hash onchain).
3. Get verified by human verifiers.
4. Earn **DCU** participation points on-chain (`PointsRewardDistributor`).
5. Advance **Impact Product** NFT levels (10 tiers).
6. Claim **`$bDCU` (`bDCU`)** ERC-20 when eligible (Level 3+, ≥30 DCU points).

External marketing sites ([decleanup.net](https://decleanup.net)) link here for Base CTAs. They do **not** submit cleanups or mint tokens directly. Live impact stats on the marketing site currently come from the **Celo** dapp public API — see [COMMON.md § Public impact API](./COMMON.md#public-impact-api).

For IPFS, verification semantics, and integration boundaries shared with Celo, see [COMMON.md](./COMMON.md).

---

## Live URLs

| Surface | URL |
|---------|-----|
| Marketing / web | https://decleanup.net |
| Mini app (canonical) | https://miniapp.decleanup.net |
| Farcaster listing | https://farcaster.xyz/miniapps/SfsGBDcHpuSA/decleanup-rewards |
| Farcaster profile | https://farcaster.xyz/decleanupnet |
| Terms | https://miniapp.decleanup.net/terms |
| Privacy | https://miniapp.decleanup.net/privacy |
| Source (mini app) | https://github.com/DeCleanup-Network/Farcaster-Mini-App |
| $bDCU on Clanker | https://www.clanker.world/clanker/0x30171b7014c02229497CdE6745DD3aD821F12b07 |

**Farcaster manifest:** `https://miniapp.decleanup.net/.well-known/farcaster.json`  
**Required chain in manifest:** `eip155:8453`

---

## Base network

| | Mainnet | Testnet |
|---|---------|---------|
| Network | Base | Base Sepolia |
| Chain ID | **8453** | **84532** |
| CAIP-2 | `eip155:8453` | `eip155:84532` |
| RPC (public) | `https://mainnet.base.org` | `https://sepolia.base.org` |
| Explorer | https://basescan.org | https://sepolia.basescan.org |
| Native gas | ETH | ETH |
| Chain accent (UI chips) | `#0052FF` | `#0052FF` |

Production uses **chain ID 8453**. Set `NEXT_PUBLIC_CHAIN_ID=8453` and matching RPC in Vercel.

---

## Smart contracts — Base Mainnet (8453)

Use **proxy addresses** in apps and integrations. Core contracts are **UUPS upgradeable**; state persists across upgrades.

| Contract | Role | Address (proxy) | Basescan |
|----------|------|-----------------|----------|
| **PointsRewardDistributor** | DCU points, $bDCU claims, staking, verifiers | [`0x492065137E07c660DCfAe4dC335A3Fa9C1203dd9`](https://basescan.org/address/0x492065137E07c660DCfAe4dC335A3Fa9C1203dd9) | Proxy |
| **ImpactProductNFT** | Dynamic Impact Product NFTs (10 levels) | [`0x8D71Cd7445423CD42293E196B91E47f085E81BCf`](https://basescan.org/address/0x8D71Cd7445423CD42293E196B91E47f085E81BCf) | Proxy |
| **VerificationContract** | Cleanup submissions, verify/reject, claim fees | [`0x69715d43EA6D46F65045FCe2391D9B7F89ec819F`](https://basescan.org/address/0x69715d43EA6D46F65045FCe2391D9B7F89ec819F) | Proxy |
| **$bDCU (ERC-20)** | Reward / action token (Clanker) | [`0x30171b7014c02229497CdE6745DD3aD821F12b07`](https://basescan.org/token/0x30171b7014c02229497CdE6745DD3aD821F12b07) | Token |

### Frontend env mapping

| Env variable | Contract |
|--------------|----------|
| `NEXT_PUBLIC_CHAIN_ID` | `8453` |
| `NEXT_PUBLIC_POINTS_REWARD_DISTRIBUTOR_ADDRESS` | PointsRewardDistributor |
| `NEXT_PUBLIC_IMPACT_PRODUCT_NFT_ADDRESS` | ImpactProductNFT |
| `NEXT_PUBLIC_VERIFICATION_CONTRACT_ADDRESS` | VerificationContract |
| `NEXT_PUBLIC_BDCU_TOKEN_ADDRESS` | $bDCU |
| `NEXT_PUBLIC_MINIAPP_URL` | `https://miniapp.decleanup.net` |
| `NEXT_PUBLIC_BLOCK_EXPLORER_URL` | `https://basescan.org` |

---

## Smart contracts — Base Sepolia (84532)

Deploy fresh proxies per environment; addresses come from `contracts/deployment-baseSepolia-upgradeable.json` after `npm run deploy:baseSepolia`.

| Contract | Address (proxy) |
|----------|-----------------|
| PointsRewardDistributor | `0x3adf82A2e4998938B87C885d1D11011851cBeCc4` |
| ImpactProductNFT | See latest deploy output |
| VerificationContract | See latest deploy output |

**Note:** Sepolia addresses change when you redeploy. Treat the **mainnet table above** as source of truth for production; refresh testnet from the latest deploy JSON.

---

## DCU vs $bDCU

| | **DCU** | **$bDCU (`bDCU`)** |
|---|---------|---------------------|
| Type | On-chain participation points in PointsRewardDistributor | ERC-20 token (Clanker) |
| How earned | Verified cleanups, streaks, referrals, verifier activity | Claimed through PointsRewardDistributor when eligible |
| User-facing | Dashboard points, claim eligibility | Wallet balance, Uniswap liquidity |

Unlike Celo’s **ClaimVault + EIP-712** path, Base claims are driven by onchain point balances, Impact Product level, and token price logic in the distributor contract / app.

---

## Product flow (Base)

1. User connects wallet on Base (Farcaster Mini App, Base app, or browser).
2. Submits cleanup: before/after photos + geotag → stored on IPFS, hash onchain via **VerificationContract** (submission fee = **0**).
3. Verifiers approve/reject → user earns DCU points and advances Impact Product level.
4. User claims Impact Product NFT (optional small ETH claim fee; shown in UI before confirm).
5. At **Level 3** and **≥30 DCU** points, user can claim **$bDCU** via **PointsRewardDistributor** (amount depends on onchain token price and multipliers).

---

## Rewards & rules

### DCU points (typical)

| Action | DCU points |
|--------|------------|
| Verified cleanup (level) | 10 |
| Streak | 1 |
| Referral (both parties) | 3 each |
| Verifier activity | 1 |
| Manual / retroactive | Variable (admin) |

### Requirements

| Requirement | Value |
|-------------|-------|
| Min points to claim $bDCU | **30 DCU** |
| Min Impact Product level to claim / stake | **Level 3** |
| Stake to become verifier | **≥51%** of available $bDCU at stake time |
| Impact Product levels | **10** (Newbie → Guardian) |
| Submission fee | **0** |
| Claim Impact Product fee | Optional ETH; shown before tx |

### Claim formula (simplified)

```
usdValue = (points × targetRewardValueUSD) / LEVEL_POINTS
tokens   = (usdValue × 1e18 × 1e8) / currentTokenPriceUSD
```

Exact constants live in the mini app repo contracts and frontend claim helpers.

---

## Tech stack

| Layer | Stack |
|-------|-------|
| Frontend | Next.js (App Router), TypeScript, Tailwind 4 |
| Wallet | Wagmi 2, Viem 2, RainbowKit, Farcaster Mini App SDK |
| Contracts | Solidity 0.8.20, Hardhat, OpenZeppelin UUPS |
| Storage | IPFS via Pinata (server-side upload proxy) |
| Hosting | Vercel |
| Distribution | Farcaster Mini App + Base Mini App embed |

**Key integrations:** `@farcaster/miniapp-sdk`, `@farcaster/miniapp-wagmi-connector`, Base RPC, WalletConnect.

---

## Shared design system

Same brand tokens across ecosystem (landing ↔ Base app ↔ Celo app):

| Token | Value | Notes |
|-------|-------|-------|
| Background | `#0A0A0A` | |
| Elevated surface | `#141414` | |
| Primary green | `#4ADE80` | Primary CTA; **use on Base app** |
| Accent yellow | `#FAFF00` | Claim / highlight CTA |
| Body text dim | `#8B8B89` | |
| Base chain chip | `#0052FF` | Base-only UI accent |

**Fonts:** Space Grotesk (display), Inter (body), Space Mono (labels/footer)  
**Primary CTA:** green `#4ADE80`, black text  
**Claim / highlight CTA:** yellow `#FAFF00`, black text  
**theme-color:** `#4ADE80`

The marketing site (`stylesheets/styles.css`) may use `#58B12F` in places — align new Base-facing UI to **`#4ADE80`**.

Reference: `DESIGN.md` in the Farcaster-Mini-App repo.

---

## Environment variables

Production minimum (mainnet):

```bash
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_POINTS_REWARD_DISTRIBUTOR_ADDRESS=0x492065137E07c660DCfAe4dC335A3Fa9C1203dd9
NEXT_PUBLIC_IMPACT_PRODUCT_NFT_ADDRESS=0x8D71Cd7445423CD42293E196B91E47f085E81BCf
NEXT_PUBLIC_VERIFICATION_CONTRACT_ADDRESS=0x69715d43EA6D46F65045FCe2391D9B7F89ec819F
NEXT_PUBLIC_BDCU_TOKEN_ADDRESS=0x30171b7014c02229497cde6745dd3ad821f12b07
NEXT_PUBLIC_MINIAPP_URL=https://miniapp.decleanup.net
NEXT_PUBLIC_BLOCK_EXPLORER_URL=https://basescan.org
```

Also required in production: Pinata keys, WalletConnect project ID, Farcaster manifest signing keys, Vercel env for any server upload routes.

After any `NEXT_PUBLIC_*` change on Vercel: **redeploy**.

---

## Run locally

```bash
git clone https://github.com/DeCleanup-Network/Farcaster-Mini-App
cd Farcaster-Mini-App
cp .env.example .env.local   # fill values — see repo ENV / DEVELOPER_SPECS
npm install
npm run dev
```

Open http://localhost:3000 (or port in repo README).

---

## Landing page integration

Checklist for [decleanup.net](https://decleanup.net) and forks:

- [ ] Link Base card → https://miniapp.decleanup.net or Farcaster mini app URL
- [ ] Show **$bDCU** (not $cDCU) on Base surfaces
- [ ] Use **onchain**, not “web3” / “crypto” (Base editorial style)
- [ ] Contract addresses table for developers / transparency section
- [ ] Footer links: Website, GitHub, X, Farcaster, Telegram, Terms, Privacy
- [ ] Optional: embed Basescan links for live contract verification
- [ ] Do not use old green `#58B12F` on new Base CTAs — use **`#4ADE80`**

---

## Celo vs Base (ecosystem map)

| | Celo | Base |
|---|------|------|
| Product name | DeCleanup full dapp | DeCleanup Rewards (mini app) |
| Token | `$cDCU` | `$bDCU` |
| Chain ID | `42220` / Sepolia | `8453` / `84532` |
| Primary surface | dapp.decleanup.net | miniapp.decleanup.net |
| Distribution | Web dapp | Farcaster + Base Mini App + web |
| Auth | Email/Google + AA (default) | Wallet-first (Farcaster / Base app) |
| Claim path | ClaimVault + EIP-712 | PointsRewardDistributor |
| Impact stats API | `GET …/api/impact/global` | Not shared yet — marketing uses Celo API |
| Hypercerts | Yes | No |
| Governance (Gardens) | `$cDCU` on Celo | — |

Full Celo reference: [CELO.md](./CELO.md)

---

## Social & community

| Channel | Link |
|---------|------|
| Telegram | https://t.me/decentralizedcleanup |
| Farcaster | https://farcaster.xyz/decleanupnet · **@decleanupnet** |
| X | https://x.com/decleanupnet · **@decleanupnet** |
| GitHub org | https://github.com/DeCleanup-Network |
| Giveth | https://giveth.io/project/decentralized-cleanup-network |

**Support:** [support@decleanup.net](mailto:support@decleanup.net)

---

## Deep-dive docs

Topic guides (claim logic, Farcaster manifest, deploy scripts) live in the [Farcaster-Mini-App](https://github.com/DeCleanup-Network/Farcaster-Mini-App) repo — typically `DEVELOPER_SPECS.md`, `DESIGN.md`, and `contracts/` README files.

**Contract addresses:** always reconcile deploy JSON + Basescan before publishing integrations.
