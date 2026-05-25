import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiPython, SiReact, SiJavascript, SiTailwindcss, SiFlask,
  SiFigma, SiGooglegemini, SiOpenai, SiHtml5, SiGithub,
  SiNodedotjs, SiMongodb,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React",            icon: <SiReact />,        color: "#06B6D4" },
  { name: "Python",           icon: <SiPython />,       color: "#3B82F6" },
  { name: "JavaScript",       icon: <SiJavascript />,   color: "#EAB308" },
  { name: "Tailwind CSS",     icon: <SiTailwindcss />,  color: "#06B6D4" },
  { name: "Flask",            icon: <SiFlask />,        color: "#ede8df" },
  { name: "Node.js",          icon: <SiNodedotjs />,    color: "#22C55E" },
  { name: "MongoDB",          icon: <SiMongodb />,      color: "#22C55E" },
  { name: "Gemini API",       icon: <SiGooglegemini />, color: "#A78BFA" },
  { name: "AI Integration",   icon: <SiOpenai />,       color: "#ede8df" },
  { name: "UI/UX Design",     icon: <SiFigma />,        color: "#EC4899" },
  { name: "Responsive Design",icon: <SiHtml5 />,        color: "#F97316" },
  { name: "Git/GitHub",       icon: <SiGithub />,       color: "#ede8df" },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const gridRef    = useRef(null);
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

      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "expo.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div ref={headingRef} className="opacity-0 mb-16">
          <p className="label text-cream-dim mb-4">Tech Stack</p>
          <h2 className="heading-lg text-cream">Skills</h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-px border border-border bg-border"
        >
          {skills.map((skill, i) => (
            <div
              key={i}
              className="bg-bg flex flex-col items-center justify-center gap-3 p-6 group hover:bg-surface transition-colors duration-300"
            >
              <span
                className="text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ color: skill.color }}
              >
                {skill.icon}
              </span>
              <span className="label text-muted group-hover:text-cream-dim transition-colors duration-300 text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="hr absolute bottom-0 left-0" />
    </section>
  );
};

export default Skills;