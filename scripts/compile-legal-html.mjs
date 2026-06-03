#!/usr/bin/env node
/**
 * Compile Terms TSX from decleanup-network.github.io into standalone HTML fragments.
 * Source: /tmp/decleanup-github-io/components/TermsOfService/*.tsx
 */
import fs from "fs";
import path from "path";

const SRC = process.env.TERMS_SRC || "/tmp/decleanup-github-io/components/TermsOfService";
const OUT = new URL("../terms-body.html", import.meta.url);

function tsxFragmentToHtml(raw) {
  let s = raw;
  s = s.replace(/^import[\s\S]*?;\s*/gm, "");
  s = s.replace(/export default function \w+\(\) \{\s*return \(\s*/s, "");
  s = s.replace(/\s*\);\s*\}\s*$/s, "");

  const sec = s.match(/<LegalSection\s+([\s\S]*?)>([\s\S]*)<\/LegalSection>/);
  if (!sec) throw new Error("LegalSection not found");
  const attrs = sec[1];
  const body = sec[2];
  const id = attrs.match(/id="([^"]+)"/)?.[1] || "";
  const title = attrs.match(/title="([^"]+)"/)?.[1] || "";
  const subtitle = attrs.match(/subtitle="([^"]+)"/)?.[1] || "";

  let inner = body
    .replace(/<LegalH3>/g, '<h3 class="legal-h3">')
    .replace(/<\/LegalH3>/g, "</h3>")
    .replace(/<LegalList>/g, '<ul class="legal-list">')
    .replace(/<\/LegalList>/g, "</ul>")
    .replace(/<LegalNote>/g, '<div class="legal-note">')
    .replace(/<\/LegalNote>/g, "</div>")
    .replace(/className="[^"]*"/g, 'class="legal-link"')
    .replace(/target="_blank"\s+rel="noopener noreferrer"/g, 'target="_blank" rel="noopener"')
    .replace(/href="\/privacy"/g, 'href="privacy.html"')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\{\s*"\s*"\s*\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Multi-line JSX text in <p> — restore newlines from original body for readability
  inner = body
    .replace(/<LegalH3>/g, '<h3 class="legal-h3">')
    .replace(/<\/LegalH3>/g, "</h3>")
    .replace(/<LegalList>/g, '<ul class="legal-list">')
    .replace(/<\/LegalList>/g, "</ul>")
    .replace(/<LegalNote>/g, '<div class="legal-note">')
    .replace(/<\/LegalNote>/g, "</div>")
    .replace(/className="[^"]*"/g, 'class="legal-link"')
    .replace(/target="_blank"\s+rel="noopener noreferrer"/g, 'target="_blank" rel="noopener"')
    .replace(/href="\/privacy"/g, 'href="privacy.html"')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\{\s*"\s*"\s*\}/g, " ")
    .replace(/<code class="legal-link">/g, '<code class="legal-code">')
    .replace(
      /How we handle personal data on the Site will be described in a Privacy Policy when published \(for example at <strong>\/privacy<\/strong> on this domain\)\. Until then, treat any data you send us as handled only for the purpose you contacted us about\./,
      'How we handle personal data on the Site is described in our <a href="privacy.html" class="legal-link">Privacy Policy</a>, which also covers the Base and Celo applications operated by DeCleanup Network.'
    )
    .replace(
      /Our Privacy Policy describes how we handle personal data when published \(for example at <strong>\/privacy<\/strong> on the deployed site or in project documentation\)\. Until a dedicated policy is linked here, contact us using the channels in Section 14\./,
      'Our <a href="privacy.html" class="legal-link">Privacy Policy</a> describes how we handle personal data across the Site and the Celo Service. Questions: use the contact channels in Section 15 below.'
    );

  return `<section id="${id}" class="legal-section">
<h2 class="legal-h2 plakat">${title}</h2>
${subtitle ? `<p class="legal-sub serif">${subtitle}</p>` : ""}
<div class="legal-prose">
${inner}
</div>
</section>`;
}

const files = ["GeneralTerms.tsx", "BaseAppTerms.tsx", "CeloPlatformTerms.tsx"];
const html = files
  .map((f) => {
    const p = path.join(SRC, f);
    if (!fs.existsSync(p)) throw new Error(`Missing ${p}`);
    return tsxFragmentToHtml(fs.readFileSync(p, "utf8"));
  })
  .join("\n\n");

fs.writeFileSync(OUT.pathname, html);
console.log("Wrote", OUT.pathname, html.length, "chars");
