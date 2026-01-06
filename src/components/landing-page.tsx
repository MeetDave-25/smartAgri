import { motion } from "framer-motion";
import { Sprout, TrendingUp, Globe, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedBackground } from "./animated-background";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/language-context";

interface LandingPageProps {
  onStartPrediction: () => void;
  onLanguageChange: (lang: string) => void;
}

export function LandingPage({ onStartPrediction, onLanguageChange }: LandingPageProps) {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as any);
    onLanguageChange(lang);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Header with Language Selector */}
      <header className="relative z-10 p-4 flex justify-between items-center">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Sprout className="text-green-600 dark:text-green-400" size={32} />
          <span className="text-green-800 dark:text-green-100">{t('appName')}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Globe className="text-green-600 dark:text-green-400" size={20} />
          <select
            value={language}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-green-300 dark:border-green-700 rounded-full px-4 py-2 cursor-pointer hover:bg-white dark:hover:bg-slate-700 transition-all text-green-800 dark:text-green-100"
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
            <option value="ta">தமிழ்</option>
            <option value="od">ଓଡ଼ିଆ</option>
            <option value="bn">বাংলা</option>
          </select>
        </motion.div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <motion.h1
              className="text-green-800 dark:text-green-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t('heroTitle')}
            </motion.h1>

            <motion.p
              className="text-green-700 dark:text-green-200 text-lg md:text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('heroSubtitle')}
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: "🌱", textKey: "yieldPrediction" },
                { icon: "💧", textKey: "waterOptimization" },
                { icon: "🧪", textKey: "fertilizerPlans" },
                { icon: "☀️", textKey: "weatherInsights" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-green-200 dark:border-green-700 shadow-sm"
                  whileHover={{ scale: 1.05, borderColor: "#22c55e" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{feature.icon}</span>
                  <span className="text-green-800 dark:text-green-100">{t(feature.textKey)}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                onClick={onStartPrediction}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 rounded-full shadow-lg group"
                size="lg"
              >
                {t('startNow')}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="ml-2" size={20} />
                </motion.div>
              </Button>

              <Button
                variant="outline"
                className="border-2 border-green-600 dark:border-green-400 text-green-700 dark:text-green-100 hover:bg-green-50 dark:hover:bg-green-900 px-8 py-6 rounded-full"
                size="lg"
              >
                {t('learnMore')}
              </Button>
            </motion.div>
          </div>

          {/* Right: Animated Farmer Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 dark:border-slate-700/50">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1707721690544-781fe6ede937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NjIxODg2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Farmer with crops"
                className="w-full h-full object-cover"
              />
              
              {/* Floating stats overlay */}
              <motion.div
                className="absolute top-6 right-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
                  <div>
                    <div className="text-green-800 dark:text-green-100">+35%</div>
                    <div className="text-xs text-green-600 dark:text-green-300">Avg Yield</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative floating elements */}
            <motion.div
              className="absolute -top-4 -left-4 text-6xl"
              animate={{
                rotate: [0, 10, 0],
                y: [0, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌾
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 text-5xl"
              animate={{
                rotate: [0, -10, 0],
                y: [0, 10, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🚜
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            { number: "50K+", label: "Farmers", icon: "👨‍🌾" },
            { number: "95%", label: "Accuracy", icon: "🎯" },
            { number: "30%", label: "Water Saved", icon: "💧" },
            { number: "40%", label: "Yield Boost", icon: "📈" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-green-100 dark:border-green-800"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-green-800 dark:text-green-100">{stat.number}</div>
              <div className="text-green-600 dark:text-green-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}