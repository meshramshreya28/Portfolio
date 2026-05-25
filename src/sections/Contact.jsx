import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center px-6 py-20 md:py-24"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-center mb-16"
        >
          Contact Me
        </motion.h2>

        {/* Contact Box */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
        >
          {/* Form */}
          <form className="grid gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 text-white placeholder-gray-500 transition duration-300"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 text-white placeholder-gray-500 transition duration-300"
            />

            <textarea
              rows="5"
              placeholder="Tell me about your project or opportunity..."
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 text-white placeholder-gray-500 transition duration-300 resize-none"
            />

            <button
              type="submit"
              className="py-4 rounded-2xl bg-primary hover:shadow-glow transition duration-300 font-semibold hover:scale-105 active:scale-95"
            >
              Send Message
            </button>
          </form>

          {/* Socials */}
          <div className="flex justify-center gap-8 mt-10 text-2xl">
            <a
            href="https://github.com/meshramshreya28-code"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/shreya-meshram28/"
              className="hover:text-primary transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:meshramshreya28@gmail.com"
              className="hover:text-primary transition"
            >
              <FaEnvelope />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;