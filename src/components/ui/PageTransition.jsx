import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PageTransition = () => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;

    /* Reveal on load — panel slides up and out */
    gsap.fromTo(
      overlay,
      { yPercent: 0 },
      {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
        delay: 2.4,
      }
    );

    /* Intercept internal anchor clicks for a smooth out→in transition */
    const handleClick = (e) => {
      const anchor = e.target.closest("a[href^='#']");
      if (!anchor) return;
      // anchor links don't need full page transition, just let them scroll
    };

    /* Link transition for external links */
    const handleExternal = (e) => {
      const anchor = e.target.closest("a[target='_blank']");
      if (!anchor) return;
      // external links open in new tab, no transition needed
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("click", handleExternal);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("click", handleExternal);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99990] bg-bg flex items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center gap-4">
        <p
          className="text-cream font-bold"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)", letterSpacing: "-0.04em" }}
        >
          Shreya Meshram
        </p>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-cream-dim to-transparent" />
      </div>
    </div>
  );
};

export default PageTransition;