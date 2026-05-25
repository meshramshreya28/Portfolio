import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-dark">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-5xl md:text-7xl font-black tracking-widest text-primary"
        >
          PORTFOLIO
        </motion.h1>

        {/* Glow Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "220px" }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="h-1 bg-primary rounded-full mx-auto mt-8 shadow-glow"
        />
      </div>
    </div>
  );
};

export default Loader;