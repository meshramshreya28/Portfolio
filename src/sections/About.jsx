import { motion } from "framer-motion";
import { FaCode, FaBrain, FaPalette } from "react-icons/fa";

const cards = [
  {
    icon: <FaBrain />,
    title: "AI Enthusiast",
    desc: "Passionate about AI-powered web applications and smart developer tools.",
  },
  {
    icon: <FaCode />,
    title: "Web Developer",
    desc: "Building modern responsive interfaces with React, Tailwind, and Flask.",
  },
  {
    icon: <FaPalette />,
    title: "UI/UX Designer",
    desc: "Creating futuristic user experiences with premium interactions.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-20 md:py-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-center mb-16"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mb-16"
        >
          I am a B.Tech CSE student passionate about building modern
          AI-powered web applications, interactive UI experiences,
          and developer-focused products.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:shadow-glow transition duration-500"
            >
              <div className="text-4xl text-primary mb-6">
                {card.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {card.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;