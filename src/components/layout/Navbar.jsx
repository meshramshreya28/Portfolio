import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const links = ["about", "skills", "projects", "journey", "contact"];

const Navbar = () => {
  const [open,   setOpen]   = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 2.6 }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      links.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const top    = el.offsetTop - 120;
          const bottom = top + el.offsetHeight;
          if (window.scrollY >= top && window.scrollY < bottom) setActive(section);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[9000] transition-all duration-500 ${
        scrolled ? "py-4 bg-bg/80 backdrop-blur-md border-b border-border" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="label text-cream hover:text-cream-dim transition-colors">
          SM
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`label transition-colors duration-200 ${
                active === item ? "text-cream" : "text-muted hover:text-cream-dim"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Resume button */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cream/20 text-cream text-xs font-medium hover:border-cream/50 transition-colors duration-300"
        >
          Resume ↗
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px] p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1px] bg-cream transition-all duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-[1px] bg-cream transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1px] bg-cream transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-2 px-6 py-6 bg-bg/95 backdrop-blur-xl border-t border-border flex flex-col gap-6">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setOpen(false)}
              className={`label transition-colors ${active === item ? "text-cream" : "text-muted"}`}
            >
              {item}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="label text-cream-dim">
            Resume ↗
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;