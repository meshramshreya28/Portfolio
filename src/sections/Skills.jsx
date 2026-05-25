import { motion } from "framer-motion";

const skills = [
  "Python",
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Flask",
  "UI/UX Design",
  "Gemini API",
  "AI Integration",
  "Responsive Design",
  "Git/GitHub",
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
              whileHover={{
                y: -10,
                scale: 1.05,
              }}
              className="group relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden cursor-pointer"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl" />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-center group-hover:text-primary transition">
                  {skill}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;