import { motion } from "framer-motion";

const timeline = [
  {
    year: "2023",
    title: "Started Web Development",
    desc: "Began learning HTML, CSS, JavaScript, and responsive web design.",
  },

  {
    year: "2024",
    title: "React & UI/UX Journey",
    desc: "Built modern frontend applications using React and Tailwind CSS.",
  },

  {
    year: "2025",
    title: "AI Integration Projects",
    desc: "Developed AI-powered applications using Gemini API and Flask.",
  },

  {
    year: "2026",
    title: "Interactive Developer Experiences",
    desc: "Focused on futuristic UI experiences, premium animations, and developer tools.",
  },
];

const Journey = () => {
  return (
    <section
      id="journey"
      className="min-h-screen px-6 py-20 md:py-24"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-center mb-24"
        >
          My Journey
        </motion.h2>

        {/* Timeline */}
        <div className="relative border-l border-primary/30 ml-4">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="mb-16 ml-10 relative"
            >
              {/* Glow Dot */}
              <div className="absolute -left-[52px] top-2 w-5 h-5 rounded-full bg-primary shadow-glow" />

              {/* Card */}
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-primary/40 transition duration-500">
                <span className="text-primary font-semibold">
                  {item.year}
                </span>

                <h3 className="text-2xl font-bold mt-2 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;