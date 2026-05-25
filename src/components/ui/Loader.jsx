import { motion } from "framer-motion";

const Loader = () => (
  <motion.div
    className="fixed inset-0 z-[99999] flex items-center justify-center bg-bg"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
  >
    <div className="flex flex-col items-center gap-6">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-bold"
        style={{
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          letterSpacing: "-0.04em",
          background: "linear-gradient(90deg, #f472b6, #a78bfa, #22d3ee, #4ade80)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Shreya Meshram
      </motion.p>

      <div className="w-48 h-[1px] bg-dim overflow-hidden rounded-full">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #f472b6, #a78bfa, #22d3ee, #4ade80, #fb923c, #fbbf24)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="label text-muted"
      >
        Loading
      </motion.p>
    </div>
  </motion.div>
);

export default Loader;