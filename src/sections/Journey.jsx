import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "2023",
    title: "Started Web Development",
    desc: "Began learning HTML, CSS, JavaScript, and responsive web design. Built first projects and found a passion for crafting interfaces.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    year: "2024",
    title: "React & UI/UX Journey",
    desc: "Dived deep into React and Tailwind CSS. Focused on component architecture, animations, and building polished user experiences.",
    tags: ["React", "Tailwind CSS", "UI/UX"],
  },
  {
    year: "2025",
    title: "AI Integration Projects",
    desc: "Developed full-stack AI-powered applications using Gemini API, Flask and FastAPI. Shipped CodeCanvas AI, PromptCraft, and ResumeBuddy.",
    tags: ["Python", "Flask", "Gemini API", "FastAPI"],
  },
  {
    year: "2026",
    title: "Interactive Experiences",
    desc: "Focused on futuristic UI, premium animations, and developer tooling. Exploring GSAP, Three.js, and cutting-edge web interactions.",
    tags: ["GSAP", "Three.js", "Node.js", "MongoDB"],
  },
];

const Journey = () => {
  const sectionRef = useRef(null);
  const itemsRef   = useRef([]);
  const lineRef    = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      /* Animate the vertical line growing down */
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.5, ease: "expo.out", transformOrigin: "top center",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      /* Each timeline item */
      itemsRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
            delay: i * 0.05,
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="section-wash py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div ref={headingRef} className="opacity-0 mb-20">
          <p className="label accent-text mb-4">Experience</p>
          <h2 className="heading-lg text-cream">Journey</h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-0 md:left-[180px] top-0 bottom-0 w-px bg-border origin-top"
          />

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <div
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="relative flex flex-col md:flex-row gap-4 md:gap-0 pl-8 md:pl-0 pb-16 last:pb-0 opacity-0"
              >
                {/* Dot */}
                <div className="absolute left-[-4px] md:left-[176px] top-[6px] w-[9px] h-[9px] rounded-full border border-cream-dim bg-bg" />

                {/* Year */}
                <div className="md:w-[180px] md:pr-12 shrink-0">
                  <span
                    className="text-cream font-semibold"
                    style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="md:pl-12 flex-1 border-t border-border pt-1">
                  <h3
                    className="text-cream font-medium mb-3 mt-1"
                    style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4 max-w-lg">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full text-xs border border-border text-cream-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hr absolute bottom-0 left-0" />
    </section>
  );
};

export default Journey;