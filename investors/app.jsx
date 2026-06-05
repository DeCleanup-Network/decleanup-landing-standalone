/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect,
   THESIS_LINES, MEMO_SECTIONS, ContentsRail, Masthead, CategorySection, WhyNowSection, MoatSection,
   TractionSection, BuyersSection, ComparablesSection, TokenSection, BackersSection,
   ContactSection, DisclaimerSection, Footer */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "dark",
  "density": "regular",
  "thesis": "Integrity wedge"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = React.useState("category");

  React.useEffect(() => {
    document.documentElement.classList.add("js-enabled");
  }, []);

  // Apply palette + density to <html> so CSS vars switch.
  React.useEffect(() => {
    const root = document.documentElement;
    if (t.palette === "kraft") root.setAttribute("data-palette", "kraft");
    else root.removeAttribute("data-palette");
    if (t.density === "regular") root.removeAttribute("data-density");
    else root.setAttribute("data-density", t.density);
  }, [t.palette, t.density]);

  // Scroll-spy: highlight the contents-rail entry for the section in view.
  React.useEffect(() => {
    const ids = MEMO_SECTIONS.map((s) => s.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const thesis = THESIS_LINES[t.thesis] || THESIS_LINES["Integrity wedge"];

  return (
    <>
      <div className="memo-shell">
        <ContentsRail active={active} />
        <main className="memo-main">
          <Masthead thesis={thesis} />
          <CategorySection />
          <WhyNowSection />
          <MoatSection />
          <TractionSection />
          <BuyersSection />
          <ComparablesSection />
          <TokenSection />
          <BackersSection />
          <ContactSection />
          <DisclaimerSection />
        </main>
      </div>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakRadio label="Theme" value={t.palette} options={["dark", "kraft"]} onChange={(v) => setTweak("palette", v)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density} options={["compact", "regular", "airy"]} onChange={(v) => setTweak("density", v)} />
        <TweakSection label="Hero thesis" />
        <TweakSelect label="Thesis line" value={t.thesis} options={Object.keys(THESIS_LINES)} onChange={(v) => setTweak("thesis", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
