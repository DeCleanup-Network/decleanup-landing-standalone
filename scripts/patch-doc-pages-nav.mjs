#!/usr/bin/env node
/** One-off / repeatable: align subpage nav with main site brand lockup. */
import fs from "fs";
import path from "path";
import { docNav, docBrandLockup } from "./doc-nav.mjs";

const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), "..");

const DOC_PAGES = [
  ["litepaper.html", "litepaper"],
  ["tokenomics.html", "tokenomics"],
  ["toc.html", "toc"],
  ["sdg.html", "sdg"],
];

const NAV_RE = /<nav class="nav"[^>]*>[\s\S]*?<\/nav>/;
const LEGACY_LOGO_RE =
  /<a href="[^"]*" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:var\(--ink\)">\s*<span style="width:28px[\s\S]*?<\/a>/;

for (const [file, active] of DOC_PAGES) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, "utf8");
  html = html.replace(NAV_RE, docNav({ active }));
  fs.writeFileSync(fp, html);
  console.log("nav:", file);
}

const pagesSdg = path.join(ROOT, "pages/sdg.html");
if (fs.existsSync(pagesSdg)) {
  let html = fs.readFileSync(pagesSdg, "utf8");
  html = html.replace(
    LEGACY_LOGO_RE,
    docBrandLockup("../index.html", "../")
  );
  fs.writeFileSync(pagesSdg, html);
  console.log("logo:", "pages/sdg.html");
}
