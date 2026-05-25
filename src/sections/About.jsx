import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  "React", "Python", "Flask", "Tailwind CSS", "Gemini API",
  "AI Integration", "UI/UX Design", "Full-Stack", "FastAPI", "Git",
  "React", "Python", "Flask", "Tailwind CSS", "Gemini API",
  "AI Integration", "UI/UX Design", "Full-Stack", "FastAPI", "Git",
];

const stats = [
  { value: "3+",  label: "Years building" },
  { value: "10+", label: "Projects shipped" },
  { value: "4",   label: "AI-powered apps" },
];

const About = () => {
  const sectionRef  = useRef(null);
  const textRef     = useRef(null);
  const statsRef    = useRef(null);
  const marqueeRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Paragraph reveal */
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%" },
        }
      );

      /* Stats stagger */
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "expo.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
        }
      );

      /* Marquee scroll-speed boost */
      let currentX = 0;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          currentX -= self.getVelocity() * 0.003;
          gsap.to(marqueeRef.current, {
            x: currentX % (marqueeRef.current.scrollWidth / 2),
            duration: 0.5,
            ease: "none",
            overwrite: true,
          });
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-wash py-28 md:py-36 relative">

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — label + bio */}
          <div>
            <p className="label accent-text mb-8">About</p>

            <div ref={textRef} className="opacity-0">
              <p className="text-cream/90 text-xl md:text-2xl leading-relaxed font-light" style={{ letterSpacing: "-0.01em" }}>
                B.Tech CSE student passionate about building modern
                AI-powered web applications, interactive UI experiences,
                and developer-focused products.
              </p>

              <p className="mt-6 text-muted text-base leading-relaxed">
                I work at the intersection of design and engineering —
                crafting interfaces that feel alive through careful
                attention to motion, typography, and interaction detail.
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 mt-10 text-cream text-sm font-medium group"
              >
                <span className="underline underline-offset-4 decoration-cream/20 group-hover:decoration-cream transition-all duration-300">
                  Let's work together
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right — stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 md:grid-cols-1 gap-6 md:gap-0 md:divide-y md:divide-border pt-0 md:pt-10"
          >
            {stats.map((s, i) => (
              <div key={i} className="md:py-8 first:pt-0 last:pb-0">
                <p
                  className="text-cream font-bold mb-1"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {s.value}
                </p>
                <p className="label text-muted">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Marquee strip */}
      <div className="mt-24 border-y border-border py-5 overflow-hidden">
        <div ref={marqueeRef} className="marquee-track">
          {marqueeItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-8 px-4 whitespace-nowrap"
            >
              <span className="label text-cream-dim">{item}</span>
              <span className="text-muted text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hr absolute bottom-0 left-0" />
    </section>
  );
};

export default About;