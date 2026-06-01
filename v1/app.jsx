/* global React, ReactDOM, Nav, Hero, WhyDeCleanup, DmrvSection, HowSection, EcosystemSection, CommunitySection, TotalImpactSection, BackedBySection, SdgStrip, JoinSection, SiteFooter, StartModal, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect, useTweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "dark",
  "density": "default",
  "photo": "grit",
  "accent": "#58B12F"
}/*EDITMODE-END*/;

function App() {
  const [modal, setModal] = React.useState(false);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to <html>
  React.useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-palette", t.palette);
    r.setAttribute("data-density", t.density);
    r.setAttribute("data-photo",   t.photo);
    r.style.setProperty("--green", t.accent);
  }, [t]);

  const togglePalette = () => setTweak("palette", t.palette === "kraft" ? "dark" : "kraft");

  return (
    <>
      <Nav onLaunch={() => setModal(true)} palette={t.palette} onTogglePalette={togglePalette} />
      <Hero onLaunch={() => setModal(true)} />
      <WhyDeCleanup />
      <DmrvSection />
      <HowSection onLaunch={() => setModal(true)} />
      <EcosystemSection />
      <CommunitySection />
      <TotalImpactSection />
      <BackedBySection />
      <SdgStrip />
      <JoinSection onLaunch={() => setModal(true)} />
      <SiteFooter />

      <StartModal open={modal} onClose={() => setModal(false)} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakRadio value={t.palette} onChange={(v) => setTweak("palette", v)} options={[
            { value: "dark",  label: "Field dark" },
            { value: "kraft", label: "Kraft paper" },
          ]} />
        </TweakSection>

        <TweakSection title="Density">
          <TweakRadio value={t.density} onChange={(v) => setTweak("density", v)} options={[
            { value: "compact", label: "Tight" },
            { value: "default", label: "Default" },
            { value: "airy",    label: "Airy" },
          ]} />
        </TweakSection>

        <TweakSection title="Photo treatment">
          <TweakSelect value={t.photo} onChange={(v) => setTweak("photo", v)} options={[
            { value: "grit",    label: "Field grit (subtle contrast)" },
            { value: "natural", label: "Natural (no filter)" },
            { value: "duotone", label: "Green duotone (poster)" },
          ]} />
        </TweakSection>

        <TweakSection title="Brand accent">
          <TweakColor value={t.accent} onChange={(v) => setTweak("accent", v)} options={[
            "#58B12F",
            "#2F9B6E",
            "#9BC53D",
            "#E4572E",
          ]} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
