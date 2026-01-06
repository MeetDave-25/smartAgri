import { motion } from "framer-motion";
import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Sprout, Droplets, CloudRain, TrendingUp, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AnimatedBackground } from "./animated-background";

interface OptimizationDashboardProps {
  onBack: () => void;
}

export function OptimizationDashboard({ onBack }: OptimizationDashboardProps) {
  const [activeTab, setActiveTab] = useState("soil");

  const yieldData = [
    { month: "Nov", yield: 2.1, avgYield: 1.8 },
    { month: "Dec", yield: 3.5, avgYield: 2.9 },
    { month: "Jan", yield: 5.2, avgYield: 4.3 },
    { month: "Feb", yield: 7.1, avgYield: 5.8 },
    { month: "Mar", yield: 8.5, avgYield: 6.5 },
  ];

  const waterData = [
    { week: "W1", usage: 85, optimal: 90 },
    { week: "W2", usage: 92, optimal: 90 },
    { week: "W3", usage: 88, optimal: 90 },
    { week: "W4", usage: 91, optimal: 90 },
  ];

  const weatherData = [
    { day: "Mon", temp: 28, rainfall: 0 },
    { day: "Tue", temp: 30, rainfall: 0 },
    { day: "Wed", temp: 29, rainfall: 15 },
    { day: "Thu", temp: 27, rainfall: 20 },
    { day: "Fri", temp: 26, rainfall: 10 },
    { day: "Sat", temp: 28, rainfall: 0 },
    { day: "Sun", temp: 29, rainfall: 0 },
  ];

  const fertilizerSchedule = [
    { phase: "Basal", amount: 80, status: "completed" },
    { phase: "Tillering", amount: 60, status: "upcoming" },
    { phase: "Flowering", amount: 60, status: "upcoming" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100 rounded-full"
          >
            ← Back
          </Button>

          <h1 className="text-green-800 mb-2">Optimization Dashboard 📊</h1>
          <p className="text-green-600">Track your crop performance and optimize resources</p>
        </motion.div>

        {/* Yield Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-green-100 rounded-3xl shadow-lg mb-8">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="p-3 bg-green-100 rounded-full"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <TrendingUp className="text-green-600" size={28} />
              </motion.div>
              <div>
                <h2 className="text-green-800">Yield Growth Over Time</h2>
                <p className="text-green-600">Comparison with regional average</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={yieldData}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: "Tons/Acre", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "2px solid #22c55e",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="avgYield"
                  stroke="#94a3b8"
                  fillOpacity={1}
                  fill="url(#colorAvg)"
                  name="Avg Yield"
                />
                <Area
                  type="monotone"
                  dataKey="yield"
                  stroke="#22c55e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorYield)"
                  name="Your Yield"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-2xl border-2 border-green-100 mb-6">
              <TabsTrigger
                value="soil"
                className="rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                <Sprout className="mr-2" size={18} />
                Soil Health
              </TabsTrigger>
              <TabsTrigger
                value="fertilizer"
                className="rounded-xl data-[state=active]:bg-amber-600 data-[state=active]:text-white"
              >
                🧪 Fertilizer
              </TabsTrigger>
              <TabsTrigger
                value="weather"
                className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <CloudRain className="mr-2" size={18} />
                Weather
              </TabsTrigger>
              <TabsTrigger
                value="profit"
                className="rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                💰 Profit
              </TabsTrigger>
            </TabsList>

            {/* Soil Health Tab */}
            <TabsContent value="soil">
              <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-green-100 rounded-3xl shadow-lg">
                <h3 className="text-green-800 mb-6">Soil Health Indicators</h3>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {[
                    { label: "pH Level", value: "6.8", status: "Optimal", emoji: "✅" },
                    { label: "Nitrogen", value: "High", status: "Good", emoji: "🌱" },
                    { label: "Moisture", value: "78%", status: "Perfect", emoji: "💧" },
                  ].map((indicator, index) => (
                    <motion.div
                      key={index}
                      className="bg-green-50 p-4 rounded-2xl border-2 border-green-200"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="text-3xl mb-2">{indicator.emoji}</div>
                      <div className="text-green-600 text-sm">{indicator.label}</div>
                      <div className="text-green-800 text-xl">{indicator.value}</div>
                      <div className="text-green-600 text-xs">{indicator.status}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200"
                  animate={{ opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-start gap-3">
                    <Sprout className="text-green-600" size={24} />
                    <div>
                      <strong className="text-green-800">Recommendation:</strong>
                      <p className="text-green-700">
                        Soil health is excellent! Continue current practices. Consider adding organic
                        compost in 2 weeks to maintain nutrient levels.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </TabsContent>

            {/* Fertilizer Tab */}
            <TabsContent value="fertilizer">
              <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-amber-100 rounded-3xl shadow-lg">
                <h3 className="text-amber-800 mb-6">Fertilizer Application Plan</h3>

                <div className="space-y-4">
                  {fertilizerSchedule.map((phase, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-2xl border-2 ${
                        phase.status === "completed"
                          ? "bg-green-50 border-green-300"
                          : "bg-amber-50 border-amber-300"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                              phase.status === "completed" ? "bg-green-200" : "bg-amber-200"
                            }`}
                          >
                            {phase.status === "completed" ? "✓" : "🧪"}
                          </div>
                          <div>
                            <div className="text-gray-800">{phase.phase}</div>
                            <div className="text-gray-600 text-sm">{phase.amount} kg/acre</div>
                          </div>
                        </div>
                        <div
                          className={`px-4 py-1 rounded-full text-sm ${
                            phase.status === "completed"
                              ? "bg-green-200 text-green-800"
                              : "bg-amber-200 text-amber-800"
                          }`}
                        >
                          {phase.status === "completed" ? "Completed" : "Upcoming"}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-2xl border-2 border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="text-amber-600" size={20} />
                    <strong className="text-amber-800">Next Application:</strong>
                  </div>
                  <p className="text-amber-700">
                    Tillering phase fertilizer due in <strong>15 days</strong>. We'll send you a reminder!
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* Weather Tab */}
            <TabsContent value="weather">
              <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-blue-100 rounded-3xl shadow-lg">
                <h3 className="text-blue-800 mb-6">7-Day Weather Forecast</h3>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weatherData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "2px solid #0ea5e9",
                        borderRadius: "12px",
                      }}
                    />
                    <Bar dataKey="rainfall" fill="#0ea5e9" radius={[8, 8, 0, 0]} name="Rainfall (mm)" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <motion.div
                    className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200"
                    animate={{ opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-3">
                      <CloudRain className="text-blue-600" size={32} />
                      <div>
                        <div className="text-blue-600 text-sm">Rainfall Alert</div>
                        <div className="text-blue-800">Moderate rain expected Wed-Fri</div>
                      </div>
                    </div>
                  </motion.div>

                  <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
                    <div className="flex items-center gap-3">
                      <Droplets className="text-amber-600" size={32} />
                      <div>
                        <div className="text-amber-600 text-sm">Irrigation Tip</div>
                        <div className="text-amber-800">Skip irrigation this week</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Profit Tab */}
            <TabsContent value="profit">
              <Card className="p-6 bg-white/95 backdrop-blur-sm border-2 border-purple-100 rounded-3xl shadow-lg">
                <h3 className="text-purple-800 mb-6">Profit Estimation</h3>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-200 text-center">
                    <div className="text-4xl mb-2">💰</div>
                    <div className="text-purple-600 text-sm mb-1">Expected Revenue</div>
                    <div className="text-purple-800 text-2xl">₹2,55,000</div>
                    <div className="text-purple-600 text-xs">@ ₹30,000/ton</div>
                  </div>

                  <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-200 text-center">
                    <div className="text-4xl mb-2">📉</div>
                    <div className="text-red-600 text-sm mb-1">Total Costs</div>
                    <div className="text-red-800 text-2xl">₹1,20,000</div>
                    <div className="text-red-600 text-xs">Seeds, fertilizer, labor</div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200 text-center">
                    <div className="text-4xl mb-2">✅</div>
                    <div className="text-green-600 text-sm mb-1">Net Profit</div>
                    <div className="text-green-800 text-2xl">₹1,35,000</div>
                    <div className="text-green-600 text-xs">53% profit margin</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                  <h4 className="text-purple-800 mb-4">Cost Breakdown</h4>
                  <div className="space-y-3">
                    {[
                      { item: "Seeds", cost: "₹15,000", percent: 12.5 },
                      { item: "Fertilizers", cost: "₹35,000", percent: 29 },
                      { item: "Irrigation", cost: "₹25,000", percent: 21 },
                      { item: "Labor", cost: "₹30,000", percent: 25 },
                      { item: "Others", cost: "₹15,000", percent: 12.5 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-purple-700">{item.item}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-purple-200 rounded-full h-2">
                            <motion.div
                              className="bg-purple-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percent}%` }}
                              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                            />
                          </div>
                          <span className="text-purple-800 w-24 text-right">{item.cost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
