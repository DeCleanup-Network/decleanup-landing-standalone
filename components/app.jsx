/* global React, ReactDOM, Nav, Hero, WhyDeCleanup, DmrvSection, HowSection, EcosystemSection, BuiltOnSection, CommunitySection, CleanupMapSection, TotalImpactSection, GlossarySection, BackedBySection, SdgStrip, ResourcesSection, InvestorsSection, JoinSection, SiteFooter, StartModal, ContactModal, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect, useTweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "dark",
  "density": "default",
  "photo": "grit",
  "accent": "#4ADE80"
}/*EDITMODE-END*/;

function App() {
  const [modal, setModal] = React.useState(false);
  const [contact, setContact] = React.useState(false);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to <html>
  React.useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-palette", t.palette);
    r.setAttribute("data-density", t.density);
    r.setAttribute("data-photo",   t.photo);
    r.style.setProperty("--green", t.accent);
  }, [t]);

  // Global IntersectionObserver: arms any `.scan-in` heading with `.scanning` when
  // it enters the viewport. clip-path makes intersectionRatio always 0, so we
  // check boundingClientRect.top against viewport directly. Plus a safety
  // timeout that force-reveals every heading after 1.8s — guarantees no heading
  // stays invisible if the IO misses an element (e.g. user lands on a deep section).
  React.useEffect(() => {
    const els = document.querySelectorAll(".scan-in");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const r = e.boundingClientRect;
        const vh = e.rootBounds ? e.rootBounds.height : window.innerHeight;
        // Fire when any portion of the element has entered the lower 90% of viewport
        if (r.top < vh - 40) {
          e.target.classList.add("scanning");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));

    // Safety net: anything still un-scanned after 1.8s gets revealed unconditionally.
    // Headings must NEVER stay invisible.
    const safety = setTimeout(() => {
      document.querySelectorAll(".scan-in:not(.scanning)").forEach((el) => {
        el.classList.add("scanning");
        io.unobserve(el);
      });
    }, 1800);

    return () => {
      clearTimeout(safety);
      io.disconnect();
    };
  }, []);

  // Ambient bg drift is handled by a CSS-only @keyframes on body::before — no scroll
  // listener needed. Eliminates per-scroll repaint cost from the prior implementation.

  // Pause infinite animations (site-pulse, splitflap if any animating) when offscreen.
  // Saves compositor cycles on Retina Mac during scroll.
  React.useEffect(() => {
    const targets = document.querySelectorAll('.sites-grid, .marquee-wrap, .cleanup-map');
    if (!targets.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        e.target.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
        // Cascade to children too — needed for .site-pulse-ring + nested animated elements
        e.target.querySelectorAll('*').forEach((c) => {
          c.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
        });
      });
    }, { rootMargin: '50px' });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // Green particle splash on .btn-primary click — "cleanup confirmed" energy.
  // 12 particles per click, ~600ms fade, auto-cleanup. No-op if reduced-motion.
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onClick = (ev) => {
      const btn = ev.target.closest(".btn-primary");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      // Spawn from click point relative to button
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      btn.style.position = btn.style.position || "relative";
      for (let i = 0; i < 12; i++) {
        const p = document.createElement("span");
        p.className = "cta-particle";
        const angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5) * 0.4;
        const dist = 28 + Math.random() * 36;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 18; // bias upward
        p.style.setProperty("--tx", `${tx}px`);
        p.style.setProperty("--ty", `${ty}px`);
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.animationDuration = `${0.55 + Math.random() * 0.25}s`;
        btn.appendChild(p);
        setTimeout(() => p.remove(), 900);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Draggable/scrubbable marquee with inertia. Pauses auto-scroll on interaction.
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wraps = document.querySelectorAll(".marquee-wrap");
    if (!wraps.length) return;
    const cleanups = [];
    wraps.forEach((wrap) => {
      const strip = wrap.querySelector(".marquee");
      if (!strip) return;
      let dragging = false;
      let startX = 0;
      let startTranslateX = 0;
      let velocity = 0;
      let lastMoveT = 0;
      let lastMoveX = 0;
      let rafId = 0;

      // Pause CSS animation by parking the current transform as inline style
      const pauseAuto = () => {
        const cs = getComputedStyle(strip).transform;
        strip.style.animation = "none";
        strip.style.transform = cs === "none" ? "translateX(0)" : cs;
      };
      const resumeAuto = () => {
        // Restart the auto-scroll from current visual position
        strip.style.animation = "";
        strip.style.transform = "";
      };
      const getTranslateX = () => {
        const m = new DOMMatrixReadOnly(getComputedStyle(strip).transform);
        return m.m41;
      };

      const onDown = (ev) => {
        dragging = true;
        wrap.classList.add("marquee-dragging");
        pauseAuto();
        startX = ev.clientX;
        startTranslateX = getTranslateX();
        velocity = 0;
        lastMoveT = performance.now();
        lastMoveX = ev.clientX;
        wrap.setPointerCapture?.(ev.pointerId);
        cancelAnimationFrame(rafId);
      };
      const onMove = (ev) => {
        if (!dragging) return;
        const dx = ev.clientX - startX;
        const now = performance.now();
        const dt = now - lastMoveT || 16;
        velocity = (ev.clientX - lastMoveX) / dt; // px/ms
        lastMoveT = now;
        lastMoveX = ev.clientX;
        strip.style.transform = `translateX(${startTranslateX + dx}px)`;
      };
      const onUp = (ev) => {
        if (!dragging) return;
        dragging = false;
        wrap.classList.remove("marquee-dragging");
        wrap.releasePointerCapture?.(ev.pointerId);
        // Inertia decay
        let v = velocity * 16; // per-frame
        const stripWidth = strip.scrollWidth / 2; // marquee is duplicated so width/2 == one set
        let x = getTranslateX();
        const tick = () => {
          v *= 0.94;
          x += v;
          // Wrap-around for infinite feel
          if (x < -stripWidth) x += stripWidth;
          if (x > 0) x -= stripWidth;
          strip.style.transform = `translateX(${x}px)`;
          if (Math.abs(v) > 0.05) {
            rafId = requestAnimationFrame(tick);
          } else {
            // After inertia settles, resume auto-scroll
            setTimeout(resumeAuto, 600);
          }
        };
        if (Math.abs(v) > 0.1) rafId = requestAnimationFrame(tick);
        else setTimeout(resumeAuto, 600);
      };
      // Hover-to-pause (desktop only; on touch the drag IS the interaction)
      const onEnter = () => { if (window.matchMedia("(hover: hover)").matches && !dragging) pauseAuto(); };
      const onLeave = () => { if (window.matchMedia("(hover: hover)").matches && !dragging) resumeAuto(); };

      wrap.addEventListener("pointerdown", onDown);
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerup", onUp);
      wrap.addEventListener("pointercancel", onUp);
      wrap.addEventListener("pointerleave", onUp);
      wrap.addEventListener("mouseenter", onEnter);
      wrap.addEventListener("mouseleave", onLeave);
      wrap.style.cursor = "grab";
      cleanups.push(() => {
        wrap.removeEventListener("pointerdown", onDown);
        wrap.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerup", onUp);
        wrap.removeEventListener("pointercancel", onUp);
        wrap.removeEventListener("pointerleave", onUp);
        wrap.removeEventListener("mouseenter", onEnter);
        wrap.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(rafId);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const togglePalette = () => setTweak("palette", t.palette === "kraft" ? "dark" : "kraft");

  return (
    <>
      <Nav onLaunch={() => setModal(true)} palette={t.palette} onTogglePalette={togglePalette} />
      <Hero onLaunch={() => setModal(true)} />
      <WhyDeCleanup />
      <DmrvSection />
      <HowSection onLaunch={() => setModal(true)} />
      <EcosystemSection />
      <BuiltOnSection />
      <CommunitySection />
      <CleanupMapSection />
      <TotalImpactSection />
      <GlossarySection />
      <BackedBySection />
      <SdgStrip />
      <ResourcesSection />
      <InvestorsSection onContact={() => setContact(true)} />
      <JoinSection onLaunch={() => setModal(true)} />
      <SiteFooter onContact={() => setContact(true)} />

      <StartModal open={modal} onClose={() => setModal(false)} />
      <ContactModal open={contact} onClose={() => setContact(false)} />

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
            "#4ADE80",
            "#58B12F",
            "#2F9B6E",
            "#E4572E",
          ]} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
