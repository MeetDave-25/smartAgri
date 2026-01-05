import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { TrendingUp, Droplets, Sun, Zap, Calendar, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { AnimatedBackground } from "./animated-background";

interface PredictionResultPageProps {
  onOptimize: () => void;
  onBack: () => void;
}

export function PredictionResultPage({ onOptimize, onBack }: PredictionResultPageProps) {
  const [yieldProgress, setYieldProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setYieldProgress(85), 500);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    {
      icon: TrendingUp,
      label: "Expected Yield",
      value: "8.5 tons/acre",
      subtext: "+35% from avg",
      color: "green",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      icon: Droplets,
      label: "Water Usage",
      value: "450 mm",
      subtext: "Optimal range",
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      icon: Zap,
      label: "Fertilizer",
      value: "NPK 19:19:19",
      subtext: "200 kg/acre",
      color: "amber",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600",
    },
    {
      icon: Calendar,
      label: "Harvest Time",
      value: "120 days",
      subtext: "Mid-March 2025",
      color: "purple",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  const badges = [
    { emoji: "🌱", label: "Healthy Crop", color: "bg-green-500" },
    { emoji: "💧", label: "Water Saver", color: "bg-blue-500" },
    { emoji: "🏆", label: "High Yield", color: "bg-amber-500" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100 hover:bg-green-100 dark:hover:bg-green-900 rounded-full"
          >
            ← Back
          </Button>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h1 className="text-green-800 dark:text-green-100">Your Yield Prediction 🎯</h1>

            <div className="flex gap-2">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.2 }}
                >
                  <Badge className={`${badge.color} text-white px-3 py-1 rounded-full`}>
                    <span className="mr-1">{badge.emoji}</span>
                    {badge.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Yield Gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-green-100 dark:border-green-800 rounded-3xl shadow-2xl mb-8">
            <div className="text-center">
              <motion.div
                className="inline-block mb-6"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <div className="text-8xl">🌾</div>
              </motion.div>

              <h2 className="text-green-800 dark:text-green-100 mb-4">Predicted Yield</h2>

              {/* Animated Progress Circle */}
              <div className="relative inline-block mb-6">
                <svg className="w-48 h-48" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                  />
                  {/* Animated progress circle */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 80 * (1 - yieldProgress / 100),
                    }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    transform="rotate(-90 100 100)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  {/* Center text */}
                  <text
                    x="100"
                    y="95"
                    textAnchor="middle"
                    className="fill-green-800 dark:fill-green-100"
                    style={{ fontSize: "36px", fontWeight: "bold" }}
                  >
                    8.5
                  </text>
                  <text
                    x="100"
                    y="115"
                    textAnchor="middle"
                    className="fill-green-600 dark:fill-green-300"
                    style={{ fontSize: "14px" }}
                  >
                    tons/acre
                  </text>
                </svg>
              </div>

              <p className="text-green-700 dark:text-green-200 max-w-2xl mx-auto">
                Based on your inputs, AI predicts your wheat crop will yield approximately{" "}
                <strong>8.5 tons per acre</strong>, which is 35% above the regional average!
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="p-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-green-100 dark:border-green-800 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                <motion.div
                  className={`inline-flex p-3 ${metric.bgColor} rounded-2xl mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <metric.icon className={metric.textColor} size={28} />
                </motion.div>

                <h3 className="text-gray-600 dark:text-gray-300 mb-2">{metric.label}</h3>
                <div className={`text-2xl ${metric.textColor} mb-1`}>{metric.value}</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{metric.subtext}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recommendations Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-700 rounded-3xl shadow-lg mb-8">
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              >
                <Sun className="text-amber-500 dark:text-amber-400" size={48} />
              </motion.div>

              <div className="flex-1">
                <h2 className="text-green-800 dark:text-green-100 mb-4">AI Recommendations</h2>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💧</div>
                    <div>
                      <strong className="text-green-800 dark:text-green-200">Irrigation:</strong>
                      <p className="text-green-700 dark:text-green-300">
                        Water every 7-10 days. Next irrigation recommended in 5 days based on weather forecast.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🧪</div>
                    <div>
                      <strong className="text-green-800 dark:text-green-200">Fertilization:</strong>
                      <p className="text-green-700 dark:text-green-300">
                        Apply NPK 19:19:19 at 200 kg/acre. Split into 3 doses over the next 60 days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🌡️</div>
                    <div>
                      <strong className="text-green-800 dark:text-green-200">Weather Alert:</strong>
                      <p className="text-green-700 dark:text-green-300">
                        Moderate rainfall expected in 3 days. Delay irrigation accordingly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button
            onClick={onOptimize}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 rounded-full shadow-lg"
            size="lg"
          >
            <Award className="mr-2" size={20} />
            View Optimization Dashboard
          </Button>

          <Button
            variant="outline"
            className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-6 rounded-full"
            size="lg"
          >
            Download Report 📄
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
