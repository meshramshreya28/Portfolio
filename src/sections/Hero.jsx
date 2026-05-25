import { useEffect, useRef, Suspense, lazy } from "react";
import { gsap } from "gsap";

const Avatar3D = lazy(() => import("../components/three/Avatar3D"));

const Hero = () => {
  const containerRef = useRef(null);
  const lineRefs     = useRef([]);
  const metaRef      = useRef(null);
  const btnRef       = useRef(null);
  const scrollRef    = useRef(null);
  const avatarRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(lineRefs.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.12 }
      )
      .fromTo(metaRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
      .fromTo(btnRef.current,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
      .fromTo(avatarRef.current,{ opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1.1 }, "-=1.0")
      .fromTo(scrollRef.current,{ opacity: 0 },        { opacity: 1, duration: 0.8 },       "-=0.4");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const addLineRef = (el) => { if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el); };

  const magnetic = {
    onMouseMove: (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width/2)*0.25}px, ${(e.clientY - r.top - r.height/2)*0.25}px)`;
    },
    onMouseLeave: (e) => { e.currentTarget.style.transform = "translate(0,0)"; },
  };

  return (
    <section ref={containerRef} id="hero" className="section-wash min-h-screen flex flex-col justify-between px-6 md:px-12 pt-36 pb-12 relative">

      {/* Top meta row */}
      <div ref={metaRef} className="flex items-center justify-between opacity-0 relative z-10">
        <span className="label text-cream-dim">Portfolio — 2026</span>
        <span className="label accent-text">AI · Web · Design</span>
      </div>

      {/* Main content — text left, avatar right */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left — name */}
          <div>
            <div className="overflow-hidden mb-2">
              <h1 ref={addLineRef} className="heading-xl text-cream opacity-0">Shreya</h1>
            </div>
            <div className="overflow-hidden mb-2">
              <h1 ref={addLineRef} className="heading-xl accent-text opacity-0">Meshram</h1>
            </div>
            <div className="overflow-hidden">
              <p ref={addLineRef} className="text-muted opacity-0"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", letterSpacing: "-0.02em", lineHeight: 1.4 }}>
                AI-Powered Web Developer
              </p>
            </div>
          </div>

          {/* Right — 3D avatar */}
          <div ref={avatarRef} className="opacity-0 hidden md:flex items-center justify-center">
            <div className="relative w-full" style={{ maxWidth: "420px", height: "460px" }}>
              {/* Glow rings behind avatar */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 rounded-full border border-pink/10 animate-pulse" />
                <div className="absolute w-80 h-80 rounded-full border border-violet/5" />
              </div>
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-pink animate-ping" />
                </div>
              }>
                <Avatar3D />
              </Suspense>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom row — description + CTAs */}
      <div ref={btnRef} className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 opacity-0 relative z-10">
        <p className="text-muted max-w-xs text-sm leading-relaxed">
          Building futuristic interactive experiences with React, Python & AI integration.
        </p>
        <div className="flex gap-4">
          <a href="#projects"
            className="btn-magnetic px-7 py-3 rounded-full border border-white/10 text-cream text-sm font-medium hover:border-white/30 transition-colors duration-300"
            {...magnetic}>
            <span className="btn-inner">View Work</span>
          </a>
          <a href="#contact"
            className="btn-magnetic px-7 py-3 rounded-full text-bg text-sm font-semibold accent-bg transition-colors duration-300"
            {...magnetic}>
            <span className="btn-inner">Get in Touch</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-10">
        <span className="label text-muted" style={{ fontSize: "0.6rem" }}>Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-muted to-transparent" />
      </div>

      <div className="hr absolute bottom-0 left-0" />
    </section>
  );
};

export default Hero;