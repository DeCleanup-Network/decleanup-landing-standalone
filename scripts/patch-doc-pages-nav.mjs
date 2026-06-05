#!/usr/bin/env node
/** One-off / repeatable: align subpage nav with main site brand lockup. */
import fs from "fs";
import path from "path";
import { docNav } from "./doc-nav.mjs";

const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), "..");

const DOC_PAGES = [
  ["litepaper.html", "litepaper"],
  ["tokenomics.html", "tokenomics"],
  ["toc.html", "toc"],
  ["sdg.html", "sdg"],
  ["terms.html", "terms"],
  ["privacy.html", "privacy"],
];

const NAV_RE = /<nav class="nav"[^>]*>[\s\S]*?<\/nav>/;

for (const [file, active] of DOC_PAGES) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, "utf8");
  html = html.replace(NAV_RE, docNav({ active }));
  fs.writeFileSync(fp, html);
  console.log("nav:", file);
}
