import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  AlertCircle,
  Heart,
  Activity,
  DollarSign,
  BarChart3,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Clock,
  ChevronRight,
  Search,
  Bell,
  Settings,
  Menu,
  Plus,
  Edit,
  Eye,
  Grid,
  List,
} from "lucide-react";
import { Card } from "../components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import { useState } from "react";

export function Dashboard() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedBreed, setSelectedBreed] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months");

  const stats = [
    {
      title: "Total Goats",
      value: "47",
      change: "+3",
      trend: "up",
      icon: Users,
      color: "from-olive to-forest",
      description: "Total livestock on your farm",
    },
    {
      title: "Monthly Profit",
      value: "₹2.45L",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "from-gold to-dust",
      description: "Net revenue this month",
    },
    {
      title: "Healthy Goats",
      value: "44",
      change: "93.6%",
      trend: "up",
      icon: Heart,
      color: "from-green-600 to-green-700",
      description: "Goats in good health",
    },
    {
      title: "Disease Alerts",
      value: "2",
      change: "Urgent",
      trend: "down",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      description: "Requires immediate attention",
    },
  ];

  const growthData = [
    { month: "Jan", goats: 35, revenue: 180 },
    { month: "Feb", goats: 38, revenue: 195 },
    { month: "Mar", goats: 41, revenue: 210 },
    { month: "Apr", goats: 43, revenue: 225 },
    { month: "May", goats: 45, revenue: 238 },
    { month: "Jun", goats: 47, revenue: 245 },
  ];

  const marketPrices = [
    { breed: "Sirohi", price: 18500, trend: "up", change: 5.2, quality: "A" },
    { breed: "Beetal", price: 22000, trend: "up", change: 8.1, quality: "A+" },
    {
      breed: "Jamunapari",
      price: 28000,
      trend: "up",
      change: 3.5,
      quality: "A++",
    },
    {
      breed: "Barbari",
      price: 15000,
      trend: "down",
      change: -2.1,
      quality: "B",
    },
    {
      breed: "Osmanabadi",
      price: 19500,
      trend: "up",
      change: 4.3,
      quality: "A",
    },
    {
      breed: "Salem Black",
      price: 24000,
      trend: "up",
      change: 6.7,
      quality: "A+",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "health",
      message: "Vaccination completed for 5 goats",
      time: "2 hours ago",
      priority: "high",
    },
    {
      id: 2,
      type: "breeding",
      message: "Successful breeding recorded - Sirohi pair",
      time: "5 hours ago",
      priority: "medium",
    },
    {
      id: 3,
      type: "sale",
      message: "Goat #GT-2841 sold for ₹24,000",
      time: "1 day ago",
      priority: "low",
    },
    {
      id: 4,
      type: "alert",
      message: "Health checkup due for 3 goats",
      time: "1 day ago",
      priority: "high",
    },
    {
      id: 5,
      type: "feeding",
      message: "Feeding schedule updated for all goats",
      time: "2 days ago",
      priority: "medium",
    },
  ];

  const aiInsights = [
    {
      id: 1,
      title: "Growth Prediction",
      icon: TrendingUp,
      color: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/20",
      content:
        "Based on current trends, your farm will reach 52 goats by August with an estimated value of ₹14.5L",
    },
    {
      id: 2,
      title: "Revenue Opportunity",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
      content:
        "Beetal breed prices are up 8.1%. Consider listing 2-3 goats in the marketplace for maximum profit.",
    },
    {
      id: 3,
      title: "Health Reminder",
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-400/20",
      content:
        "Monsoon season approaching. Schedule preventive deworming for all goats in the next 2 weeks.",
    },
    {
      id: 4,
      title: "Breeding Recommendation",
      icon: Heart,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
      content:
        "Optimal breeding season approaching. Consider breeding 5-6 high-quality females for best results.",
    },
  ];


  const filteredMarketPrices = marketPrices.filter((item) => {
    if (selectedBreed !== "all" && item.breed !== selectedBreed) return false;
    if (
      searchQuery &&
      !item.breed.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="min-h-screen  p-6">

      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-serif font-bold text-forest mb-2">
          Welcome Back, Farmer! 🐐
        </h2>
        <p className="text-olive/70 font-medium">
          Here's what's happening with your farm today
        </p>
      </motion.div>

      {/* Stats Grid with Enhanced Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative"
            >
              <Card className="relative overflow-hidden border-olive/10 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-linear-to-br ${stat.color} flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110`}
                    >
                      <Icon className="w-6 h-6 text-cream" />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
                        stat.trend === "up"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-olive/50 uppercase tracking-widest mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-serif font-bold text-forest">
                      {stat.value}
                    </p>
                    <p className="text-xs text-olive/40 mt-2">
                      {stat.description}
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-olive/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-olive/40" />
            <input
              type="text"
              placeholder="Search breeds or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-white/50 backdrop-blur-sm border border-olive/10 focus:border-olive/30 focus:outline-none text-sm text-forest placeholder-olive/40"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 backdrop-blur-sm border border-olive/10 hover:bg-white/70 transition-colors text-sm font-medium text-olive"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/50 backdrop-blur-sm border border-olive/10 focus:border-olive/30 focus:outline-none text-sm text-forest"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-2 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-colors"
          >
            {viewMode === "grid" ? (
              <List className="w-5 h-5 text-olive" />
            ) : (
              <Grid className="w-5 h-5 text-olive" />
            )}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-olive text-cream font-medium hover:bg-forest transition-colors">
            <Plus className="w-4 h-4" />
            Add Record
          </button>
        </div>
      </motion.div>

      {/* Charts Section with Enhanced Layout */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
      >
        {/* Growth Chart - Enhanced */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-olive/10 p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-forest mb-1">
                  Farm Growth Analytics
                </h3>
                <p className="text-sm text-olive/60">
                  Goat count & revenue trends over time
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-olive" />
                </div>
                <select className="px-3 py-1 rounded-lg bg-white/50 border border-olive/10 text-sm text-forest">
                  <option>Goats & Revenue</option>
                  <option>Revenue Only</option>
                  <option>Goats Only</option>
                </select>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient
                    id="goatsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4B5224" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4B5224" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#C7A75C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C7A75C" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#4B5224"
                  opacity={0.1}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#4B5224"
                  opacity={0.5}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#4B5224"
                  opacity={0.5}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FBF4EA",
                    border: "1px solid rgba(75, 82, 36, 0.1)",
                    borderRadius: "16px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  }}
                  labelStyle={{ color: "#4B5224", fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="goats"
                  stroke="#4B5224"
                  fillOpacity={1}
                  fill="url(#goatsGradient)"
                  strokeWidth={3}
                  dot={{
                    fill: "#4B5224",
                    r: 5,
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 7, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#C7A75C"
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  strokeWidth={3}
                  dot={{
                    fill: "#C7A75C",
                    r: 5,
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 7, strokeWidth: 0 }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontSize: "12px",
                    color: "#4B5224",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Market Prices - Enhanced with Filtering */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-olive/10 p-6 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif font-bold text-forest">
                Market Prices
              </h3>
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="px-3 py-1 rounded-lg bg-cream/50 border border-olive/10 text-sm text-forest"
              >
                <option value="all">All Breeds</option>
                {marketPrices.map((breed) => (
                  <option key={breed.breed} value={breed.breed}>
                    {breed.breed}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredMarketPrices.map((item, index) => (
                <motion.div
                  key={item.breed}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-cream/30 hover:bg-cream/50 transition-colors border border-olive/5 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-olive/20 to-forest/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-olive">
                        {item.quality}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-forest group-hover:text-olive">
                        {item.breed}
                      </p>
                      <p className="text-[10px] text-olive/50 uppercase tracking-widest">
                        per goat
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-forest">
                      ₹{item.price.toLocaleString()}
                    </p>
                    <div
                      className={`flex items-center gap-1 text-[10px] font-bold ${
                        item.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.trend === "up" ? "↑" : "↓"}
                      {Math.abs(item.change)}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Activity & AI Insights - Enhanced Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Recent Activity - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2"
        >
          <Card className="border-olive/10 p-6 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-serif font-bold text-forest">
                Recent Activity
              </h3>
              <button className="text-sm text-olive/60 hover:text-olive flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-cream/30 transition-colors border border-transparent hover:border-olive/5 group"
                >
                  <div
                    className={`w-3 h-3 rounded-full mt-1.5 shadow-sm ${
                      activity.type === "health"
                        ? "bg-green-500"
                        : activity.type === "breeding"
                        ? "bg-blue-500"
                        : activity.type === "sale"
                        ? "bg-gold"
                        : activity.type === "alert"
                        ? "bg-red-500"
                        : "bg-purple-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-forest group-hover:text-olive">
                      {activity.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] text-olive/50 uppercase tracking-widest">
                        {activity.time}
                      </p>
                      {activity.priority === "high" && (
                        <span className="text-xs text-red-500 font-medium">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>
                  <Activity className="w-4 h-4 text-olive/30 group-hover:text-olive" />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* AI Insights - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-olive/10 p-6 bg-gradient-to-br from-forest to-olive/80 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-olive/20 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center shadow-lg">
                  <Activity className="w-5 h-5 text-forest" />
                </div>
                <h3 className="text-lg font-serif font-bold text-cream">
                  AI Insights & Recommendations
                </h3>
              </div>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <insight.icon className={`w-4 h-4 ${insight.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gold mb-1">
                          {insight.title}
                        </p>
                        <p className="text-xs text-cream/70 leading-relaxed">
                          {insight.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 rounded-xl bg-gold/20 border border-gold/30 text-gold text-sm font-medium hover:bg-gold/30 transition-colors">
                View All Insights
              </button>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Additional Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
      >
        <Card className="border-olive/10 p-6 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-olive" />
            <h4 className="font-semibold text-forest">Upcoming Tasks</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-olive/70">
                Vaccination Schedule
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Due Tomorrow
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-olive/70">Market Listing</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                In 3 days
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-olive/70">
                Feed Inventory Check
              </span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                In 5 days
              </span>
            </div>
          </div>
        </Card>

        <Card className="border-olive/10 p-6 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-olive" />
            <h4 className="font-semibold text-forest">Quick Actions</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 rounded-xl bg-cream/30 hover:bg-cream/50 transition-colors text-center">
              <Plus className="w-4 h-4 mx-auto mb-1 text-olive" />
              <span className="text-xs text-olive">Add Goat</span>
            </button>
            <button className="p-3 rounded-xl bg-cream/30 hover:bg-cream/50 transition-colors text-center">
              <Edit className="w-4 h-4 mx-auto mb-1 text-olive" />
              <span className="text-xs text-olive">Edit Record</span>
            </button>
            <button className="p-3 rounded-xl bg-cream/30 hover:bg-cream/50 transition-colors text-center">
              <Eye className="w-4 h-4 mx-auto mb-1 text-olive" />
              <span className="text-xs text-olive">View Details</span>
            </button>
            <button className="p-3 rounded-xl bg-cream/30 hover:bg-cream/50 transition-colors text-center">
              <Download className="w-4 h-4 mx-auto mb-1 text-olive" />
              <span className="text-xs text-olive">Export</span>
            </button>
          </div>
        </Card>

        <Card className="border-olive/10 p-6 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-olive" />
            <h4 className="font-semibold text-forest">Notifications</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></div>
              <div className="flex-1">
                <p className="text-sm text-forest">
                  Health alert: Goat #GT-2841
                </p>
                <p className="text-xs text-olive/50">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
              <div className="flex-1">
                <p className="text-sm text-forest">New market price update</p>
                <p className="text-xs text-olive/50">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
              <div className="flex-1">
                <p className="text-sm text-forest">Feeding schedule updated</p>
                <p className="text-xs text-olive/50">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
