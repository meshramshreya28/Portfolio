import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const containerRef = useRef(null);
  const lineRefs     = useRef([]);
  const metaRef      = useRef(null);
  const btnRef       = useRef(null);
  const scrollRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        lineRefs.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.12 }
      )
      .fromTo(
        metaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.6"
      )
      .fromTo(
        btnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.7"
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addLineRef = (el) => {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-between px-6 md:px-12 pt-36 pb-12 relative"
    >
      {/* Top label row */}
      <div ref={metaRef} className="flex items-center justify-between opacity-0">
        <span className="label text-cream-dim">Portfolio — 2026</span>
        <span className="label text-cream-dim">AI · Web · Design</span>
      </div>

      {/* Big name */}
      <div className="flex-1 flex items-center">
        <div className="w-full">
          <div className="overflow-hidden mb-2">
            <h1
              ref={addLineRef}
              className="heading-xl text-cream opacity-0"
            >
              Shreya
            </h1>
          </div>
          <div className="overflow-hidden mb-2">
            <h1
              ref={addLineRef}
              className="heading-xl text-cream opacity-0"
            >
              Meshram
            </h1>
          </div>
          <div className="overflow-hidden">
            <p
              ref={addLineRef}
              className="heading-xl text-muted opacity-0"
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.3 }}
            >
              AI-Powered Web Developer
            </p>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div ref={btnRef} className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 opacity-0">
        <p className="text-muted max-w-xs text-sm leading-relaxed">
          Building futuristic interactive experiences with React, Python & AI integration.
        </p>

        <div className="flex gap-4">
          <a
            href="#projects"
            className="btn-magnetic group px-7 py-3 rounded-full border border-cream/20 text-cream text-sm font-medium hover:border-cream/60 transition-colors duration-300"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              e.currentTarget.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0,0)";
            }}
          >
            <span className="btn-inner">View Work</span>
          </a>

          <a
            href="#contact"
            className="btn-magnetic group px-7 py-3 rounded-full bg-cream text-bg text-sm font-semibold hover:bg-cream/90 transition-colors duration-300"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              e.currentTarget.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0,0)";
            }}
          >
            <span className="btn-inner">Get in Touch</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="label text-muted" style={{ fontSize: "0.6rem" }}>Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-muted to-transparent" />
      </div>

      {/* Divider */}
      <div className="hr absolute bottom-0 left-0" />
    </section>
  );
};

export default Hero;