import { motion } from "motion/react";
import { Sprout } from "lucide-react";

export function LoadingPlant() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative">
        {/* Soil base */}
        <motion.div
          className="w-32 h-8 bg-amber-800 dark:bg-amber-900 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Growing plant */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            type: "spring",
            stiffness: 100,
          }}
        >
          <motion.div
            animate={{
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sprout size={64} className="text-green-600 dark:text-green-400" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-green-700 dark:text-green-300">Analyzing Your Farm Data...</h3>
        <motion.div
          className="flex justify-center gap-2 mt-4"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full" />
          <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full" />
          <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
