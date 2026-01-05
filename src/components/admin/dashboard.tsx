import { motion } from "motion/react";
import {
  Users,
  Sprout,
  TrendingUp,
  CloudRain,
  Activity,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card } from "../ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function SuperAdminDashboard() {
  const stats = [
    {
      label: "Total Farmers",
      value: "2,543",
      change: "+12%",
      trend: "up",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Active Crops",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: Sprout,
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Avg Yield Increase",
      value: "35%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Weather Alerts",
      value: "12",
      change: "-3",
      trend: "down",
      icon: CloudRain,
      gradient: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-100 dark:bg-amber-900",
      textColor: "text-amber-600 dark:text-amber-400",
    },
  ];

  const yieldData = [
    { month: "Jan", predicted: 65, actual: 68 },
    { month: "Feb", predicted: 70, actual: 72 },
    { month: "Mar", predicted: 75, actual: 73 },
    { month: "Apr", predicted: 80, actual: 82 },
    { month: "May", predicted: 85, actual: 88 },
    { month: "Jun", predicted: 90, actual: 92 },
  ];

  const cropDistribution = [
    { name: "Wheat", value: 35, color: "#f59e0b" },
    { name: "Rice", value: 30, color: "#10b981" },
    { name: "Cotton", value: 20, color: "#3b82f6" },
    { name: "Others", value: 15, color: "#8b5cf6" },
  ];

  const regionData = [
    { region: "North", farmers: 680, yield: 8.5 },
    { region: "South", farmers: 520, yield: 7.8 },
    { region: "East", farmers: 750, yield: 8.2 },
    { region: "West", farmers: 593, yield: 7.5 },
  ];

  const recentActivities = [
    {
      user: "Ramesh Kumar",
      action: "Added new crop prediction",
      time: "2 hours ago",
      type: "prediction",
    },
    {
      user: "Admin Sharma",
      action: "Updated weather data",
      time: "4 hours ago",
      type: "weather",
    },
    {
      user: "Priya Patel",
      action: "Registered new farmer",
      time: "6 hours ago",
      type: "user",
    },
    {
      user: "Suresh Singh",
      action: "Modified soil type data",
      time: "8 hours ago",
      type: "soil",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                    stat.trend === "up"
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                  }`}
                >
                  {stat.trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl text-gray-800 dark:text-gray-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yield Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg">
            <h3 className="text-lg text-gray-800 dark:text-gray-100 mb-4">
              Yield Prediction vs Actual
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Crop Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg">
            <h3 className="text-lg text-gray-800 dark:text-gray-100 mb-4">
              Crop Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Regional Data & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg">
            <h3 className="text-lg text-gray-800 dark:text-gray-100 mb-4">
              Regional Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="region" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="farmers" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar yAxisId="right" dataKey="yield" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg">
            <h3 className="text-lg text-gray-800 dark:text-gray-100 mb-4">
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Activity className="text-green-600 dark:text-green-400" size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-800 dark:text-gray-200">
                      <strong>{activity.user}</strong>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.action}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {activity.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
