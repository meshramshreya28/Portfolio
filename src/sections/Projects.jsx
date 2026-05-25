import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects.js";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef    = useRef(null);
  const trackRef      = useRef(null);
  const headingRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Heading reveal */
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      /* Horizontal scroll */
      const track   = trackRef.current;
      const section = sectionRef.current;

      const getScrollAmount = () =>
        -(track.scrollWidth - window.innerWidth + 96);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
        return () => tween.kill();
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section-wash relative bg-bg">

      {/* Sticky header — visible while pinned */}
      <div className="h-screen flex flex-col justify-between px-6 md:px-12 py-12 pointer-events-none absolute inset-0 z-10">
        <div ref={headingRef} className="opacity-0 pointer-events-auto">
          <p className="label accent-text mb-4">Featured Work</p>
          <h2 className="heading-lg text-cream">Projects</h2>
        </div>
        <p className="label text-muted hidden md:block">
          ← Scroll to explore
        </p>
      </div>

      {/* Horizontal track */}
      <div className="h-screen flex items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 pl-6 md:pl-12 pr-24 items-center"
          style={{ willChange: "transform" }}
        >
          {/* Spacer so first card clears the heading */}
          <div className="shrink-0 w-[min(300px,50vw)] hidden md:block" />

          {projects.map((project, i) => (
            <article
              key={i}
              className="shrink-0 w-[85vw] md:w-[480px] lg:w-[520px] rounded-2xl border border-border bg-surface overflow-hidden group hover:border-cream/20 transition-colors duration-500"
              style={{ boxShadow: "inset 0 1px 0 rgba(237,232,223,0.06)" }}
            >
              {/* Image */}
              <div className="h-60 overflow-hidden bg-dim">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-7">
                {/* Number + title */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="label text-muted mb-2 block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="text-cream font-semibold"
                      style={{ fontSize: "1.35rem", letterSpacing: "-0.02em" }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-1">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-cream hover:border-cream/30 transition-all duration-300"
                      data-cursor-hover
                    >
                      <FaExternalLinkAlt size={12} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-cream hover:border-cream/30 transition-all duration-300"
                      data-cursor-hover
                    >
                      <FaGithub size={13} />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full text-xs border border-border text-cream-dim"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-3 py-1 rounded-full text-xs border border-border text-muted">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}

          {/* End spacer */}
          <div className="shrink-0 w-12" />
        </div>
      </div>

      {/* Mobile fallback — vertical stack */}
      <div className="md:hidden px-6 pb-20 flex flex-col gap-6 -mt-4">
        {projects.map((project, i) => (
          <article
            key={i}
            className="rounded-2xl border border-border bg-surface overflow-hidden"
          >
            <div className="h-48 overflow-hidden bg-dim">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="label text-muted mb-2 block">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-cream font-semibold text-lg mb-2" style={{ letterSpacing: "-0.02em" }}>
                {project.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((tech, j) => (
                  <span key={j} className="px-3 py-1 rounded-full text-xs border border-border text-cream-dim">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={project.live} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-cream-dim hover:text-cream transition-colors">
                  <FaExternalLinkAlt size={10} /> Live
                </a>
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-cream-dim hover:text-cream transition-colors">
                  <FaGithub size={11} /> GitHub
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hr" />
    </section>
  );
};

export default Projects;