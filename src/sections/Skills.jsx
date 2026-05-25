import { motion } from "framer-motion";
import {
  SiPython,
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiFlask,
  SiFigma,
  SiGooglegemini,
  SiOpenai,
  SiCss3,
  SiGithub,
} from "react-icons/si";

const skills = [
  { name: "Python",           icon: <SiPython />,       color: "#3B82F6" },
  { name: "React",            icon: <SiReact />,        color: "#06B6D4" },
  { name: "JavaScript",       icon: <SiJavascript />,   color: "#EAB308" },
  { name: "Tailwind CSS",     icon: <SiTailwindcss />,  color: "#06B6D4" },
  { name: "Flask",            icon: <SiFlask />,        color: "#A855F7" },
  { name: "UI/UX Design",     icon: <SiFigma />,        color: "#EC4899" },
  { name: "Gemini API",       icon: <SiGooglegemini />, color: "#7C3AED" },
  { name: "AI Integration",   icon: <SiOpenai />,       color: "#10B981" },
  { name: "Responsive Design",icon: <SiCss3 />,         color: "#3B82F6" },
  { name: "Git/GitHub",       icon: <SiGithub />,       color: "#E2E8F0" },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen px-6 py-20 md:py-24 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-center mb-16"
        >
          Skills & Technologies
        </motion.h2>

        {/* Skill Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden cursor-pointer flex flex-col items-center gap-4"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl" />

              {/* Icon */}
              <div
                className="relative z-10 text-4xl transition duration-300"
                style={{ color: skill.color }}
              >
                {skill.icon}
              </div>

              {/* Name */}
              <h3 className="relative z-10 text-sm font-semibold text-center group-hover:text-primary transition leading-tight">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;