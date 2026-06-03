#!/usr/bin/env node
/**
 * Remove em dashes (U+2014) from static subpages and investor memo source.
 * Run: node scripts/strip-em-dash.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), "..");

export function stripEmDash(s) {
  let out = s;
  out = out.replace(/<li>—\s/g, "<li>↦ ");
  out = out.replace(/ — DeCleanup Network/g, " · DeCleanup Network");
  out = out.replace(/ — Investor Brief/g, " · Investor Brief");
  out = out.replace(/ — Theory of Change/g, " · Theory of Change");
  out = out.replace(/ — Tokenomics/g, " · Tokenomics");
  out = out.replace(/ — Litepaper/g, " · Litepaper");
  out = out.replace(/ — SDG Alignment/g, " · SDG Alignment");
  out = out.replace(/DeCleanup Network — Aligned/g, "DeCleanup Network, aligned");
  out = out.replace(/Phase (\d) — /g, "Phase $1 · ");
  out = out.replace(/PHASE (\d) — /g, "PHASE $1 · ");
  out = out.replace(/DMRV — /g, "DMRV · ");
  out = out.replace(/\s—\s/g, ", ");
  out = out.replace(/—/g, "-");
  return out;
}

const FILES = [
  "litepaper.html",
  "tokenomics.html",
  "toc.html",
  "sdg.html",
  "pages/sdg.html",
  "investors/index.html",
  "investors/data.jsx",
  "investors/sections-top.jsx",
  "investors/sections-bottom.jsx",
];

for (const rel of FILES) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) {
    console.warn("skip (missing):", rel);
    continue;
  }
  const raw = fs.readFileSync(p, "utf8");
  const next = stripEmDash(raw);
  if (next !== raw) {
    fs.writeFileSync(p, next);
    console.log("updated:", rel);
  }
}
