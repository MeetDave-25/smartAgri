import { motion } from "framer-motion";
import { Cloud, Sun, Droplets, Moon } from "lucide-react";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-green-950">
      {/* Animated Sun/Moon */}
      <motion.div
        className="absolute top-10 right-20 text-amber-400 dark:text-slate-300"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 360],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      >
        <Sun size={64} fill="currentColor" className="dark:hidden" />
        <Moon size={64} fill="currentColor" className="hidden dark:block" />
      </motion.div>

      {/* Floating Clouds */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-sky-300 opacity-60 dark:text-slate-600 dark:opacity-40"
          style={{
            top: `${20 + i * 25}%`,
            left: `-10%`,
          }}
          animate={{
            x: ["0vw", "110vw"],
            y: [0, -20, 0],
          }}
          transition={{
            x: { duration: 30 + i * 10, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Cloud size={80 + i * 20} fill="currentColor" />
        </motion.div>
      ))}

      {/* Floating Droplets */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`drop-${i}`}
          className="absolute text-blue-400 opacity-40 dark:text-blue-300 dark:opacity-20"
          style={{
            top: `${10 + i * 15}%`,
            left: `${15 + i * 20}%`,
          }}
          animate={{
            y: [0, 20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          <Droplets size={24} />
        </motion.div>
      ))}

      {/* Ground grass effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-200 to-transparent dark:from-green-950 dark:to-transparent" />
    </div>
  );
}
