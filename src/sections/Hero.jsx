import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-primary/30 blur-[120px] rounded-full top-[-100px]" />

      <div className="text-center z-10 floating">

        {/* Small label above */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold tracking-[0.3em] text-primary uppercase mb-4"
        >
          Portfolio
        </motion.p>

        {/* Name — the real headline */}
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wide"
        >
          Shreya{" "}
          <span className="text-primary">Meshram</span>
        </motion.h1>

        <div className="mt-6 text-gray-300 text-xl md:text-2xl font-semibold">
          <TypeAnimation
            sequence={[
              "Building AI-Powered Web Applications",
              2000,
              "Interactive Developer Experiences",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-primary hover:shadow-glow transition duration-300 hover:scale-105 active:scale-95"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-primary hover:bg-primary/20 transition hover:scale-105 active:scale-95"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;