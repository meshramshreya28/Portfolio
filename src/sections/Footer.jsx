import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative px-6 py-10 border-t border-white/10">
      {/* Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-[2px] bg-primary blur-sm" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <h2 className="text-xl font-bold tracking-widest text-primary">
          PORTFOLIO
        </h2>

        <p className="text-gray-400 text-sm text-center">
          © 2026 Shreya Meshram • Building futuristic AI-powered experiences.
        </p>

        <div className="flex gap-6 text-sm">
          <a
          href="https://github.com/meshramshreya28-code"
          target="_blank"
          rel="noreferrer"
          className="hover:text-primary transition"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/shreya-meshram28/"
            className="hover:text-primary transition"
          >
            LinkedIn
          </a>

          <a
            href="mailto:meshramshreya28@gmail.com"
            className="hover:text-primary transition"
          >
            Email
          </a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;