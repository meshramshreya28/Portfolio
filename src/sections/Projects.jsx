import { motion } from "framer-motion";
import { projects } from "../data/projects.js";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen px-6 py-20 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-center mb-20"
        >
          Featured Projects
        </motion.h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -12,
              }}
              className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-primary/50 hover:shadow-glow transition duration-500"
            >
              {/* Gradient Glow */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-700 bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl" />

              {/* Card Content */}
              <div className="relative z-10 p-8">
                  {/* Project Image */}
                  <div className="h-60 rounded-2xl overflow-hidden border border-white/10 mb-8">
                  <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                  </div>

                {/* Title */}
                <h3 className="text-3xl font-bold mb-4">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full text-sm bg-primary/10 border border-primary/20 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:shadow-glow transition duration-300 hover:scale-105 active:scale-95"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:bg-white/10 transition duration-300 hover:scale-105 active:scale-95"
                  >
                    <FaGithub />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;