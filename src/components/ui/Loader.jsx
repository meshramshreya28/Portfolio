import { motion, AnimatePresence } from "framer-motion";

const Loader = () => {
  return (
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
          className="label text-cream-dim"
        >
          Shreya Meshram
        </motion.p>

        <div className="w-48 h-[1px] bg-dim overflow-hidden">
          <motion.div
            className="h-full bg-cream"
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
};

export default Loader;