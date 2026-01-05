import { useState } from "react";
import { motion } from "motion/react";
import { User, Lock, Sprout, Users, Shield, Eye, EyeOff, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/language-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface LoginPageProps {
  onLogin: (role: "farmer" | "admin" | "superadmin") => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const { language, setLanguage, t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<"farmer" | "superadmin">("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    {
      value: "farmer" as const,
      label: t("farmerLogin"),
      icon: Sprout,
      gradient: "from-green-500 to-emerald-600",
      description: t("farmerDashboard")
    },
    {
      value: "superadmin" as const,
      label: t("superAdminLogin"),
      icon: Shield,
      gradient: "from-purple-500 to-pink-600",
      description: t("systemControl")
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-green-950">
      {/* Left Side - Illustration */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700 dark:from-green-900 dark:to-emerald-950"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating icons */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10"
              style={{
                top: `${15 + i * 15}%`,
                left: `${10 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {i % 3 === 0 ? "🌾" : i % 3 === 1 ? "🚜" : "☀️"}
              <span className="text-6xl">{}</span>
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-8"
          >
            <Sprout size={80} className="text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl mb-4 text-center"
          >
            {t("appName")}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-green-100 text-center max-w-md"
          >
            {t("aiPoweredSystem")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 grid grid-cols-2 gap-6 w-full max-w-md"
          >
            {[
              { icon: "🌱", label: t("smartAnalytics"), value: "95%" },
              { icon: "💧", label: t("waterSaved"), value: "30%" },
              { icon: "📈", label: t("yieldBoost"), value: "40%" },
              { icon: "👨‍🌾", label: t("farmers"), value: "50K+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl mb-1">{stat.value}</div>
                <div className="text-sm text-green-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div 
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="w-full max-w-md p-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-2 border-green-100 dark:border-green-800 rounded-3xl shadow-2xl">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-6">
            <Sprout size={48} className="text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h2 className="text-green-800 dark:text-green-100">{t("appName")}</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Language Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Globe className="text-green-600 dark:text-green-400" size={20} />
                <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
                  <SelectTrigger className="w-full max-w-[200px] bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-700 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                    <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                    <SelectItem value="od">ଓଡ଼ିଆ (Odia)</SelectItem>
                    <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h2 className="text-green-800 dark:text-green-100 mb-2 text-center">{t("welcomeBack")}</h2>
            <p className="text-green-600 dark:text-green-300 text-center mb-8">
              {t("selectRole")}
            </p>

            {/* Role Selection */}
            <div className="space-y-3 mb-6">
              {roles.map((role, index) => (
                <motion.button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    selectedRole === role.value
                      ? "border-green-500 bg-green-50 dark:bg-green-900/30 shadow-lg"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-700 hover:border-green-300 dark:hover:border-green-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${role.gradient}`}>
                    <role.icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-800 dark:text-gray-100">{role.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{role.description}</div>
                  </div>
                  {selectedRole === role.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400" size={20} />
                  <input
                    type="email"
                    placeholder={t("emailAddress")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                    {t("rememberMe")}
                  </label>
                </div>
                <button type="button" className="text-sm text-green-600 dark:text-green-400 hover:underline">
                  {t("forgotPassword")}
                </button>
              </motion.div>

              {/* Login Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button
                  type="submit"
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                >
                  {t("loginToDashboard")}
                </Button>
              </motion.div>
            </form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              {t("noAccount")}{" "}
              <button className="text-green-600 dark:text-green-400 hover:underline">
                {t("contactAdmin")}
              </button>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
