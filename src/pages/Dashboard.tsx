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
  Search,
  Plus,
  Grid,
  List,
  Calendar,
  Clock,
  Bell,
  Edit,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
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
import { useTranslation } from "react-i18next";

export function Dashboard() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedBreed, setSelectedBreed] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months");

  const stats = [
    {
      title: t("dashboard.total_goats"),
      value: "47",
      change: "+3",
      trend: "up",
      icon: Users,
      color: "from-primary to-primary/80",
      description: t("dashboard.total_goats_desc", {
        defaultValue: "Total livestock on your farm",
      }),
    },
    {
      title: t("dashboard.total_profit"),
      value: "₹2.45L",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "from-accent to-accent/80",
      description: t("dashboard.total_profit_desc", {
        defaultValue: "Net revenue this month",
      }),
    },
    {
      title: t("dashboard.healthy_goats"),
      value: "44",
      change: "93.6%",
      trend: "up",
      icon: Heart,
      color: "from-green-600 to-green-700",
      description: t("dashboard.healthy_goats_desc", {
        defaultValue: "Goats in good health",
      }),
    },
    {
      title: t("dashboard.disease_alerts"),
      value: "2",
      change: "Urgent",
      trend: "down",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      description: t("dashboard.disease_alerts_desc", {
        defaultValue: "Requires immediate attention",
      }),
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
      content:
        "Based on current trends, your farm will reach 52 goats by August with an estimated value of ₹14.5L",
    },
    {
      id: 2,
      title: "Revenue Opportunity",
      icon: DollarSign,
      color: "text-green-400",
      content:
        "Beetal breed prices are up 8.1%. Consider listing 2-3 goats in the marketplace for maximum profit.",
    },
    {
      id: 3,
      title: "Health Reminder",
      icon: AlertCircle,
      color: "text-red-400",
      content:
        "Monsoon season approaching. Schedule preventive deworming for all goats in the next 2 weeks.",
    },
    {
      id: 4,
      title: "Breeding Recommendation",
      icon: Heart,
      color: "text-blue-400",
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
    <div className="min-h-screen p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {t("dashboard.welcome")}
        </h2>
        <p className="text-muted-foreground font-medium">
          {t("dashboard.subtitle_main")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="group">
              <Card className="overflow-hidden border-border bg-card rounded-xl shadow hover:shadow-md transition-all cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow`}
                    >
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
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
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground/80 mt-2">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("common.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-card border border-border focus:border-ring focus:outline-none text-sm text-foreground placeholder-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors text-sm font-medium text-muted-foreground">
              <Filter className="w-4 h-4" />
              {t("goats.filter")}
            </button>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg bg-card border border-border focus:border-ring focus:outline-none text-sm text-foreground"
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
            className="p-2 rounded-lg bg-card hover:bg-muted transition-colors"
          >
            {viewMode === "grid" ? (
              <List className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Grid className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            {t("common.add_new_goat")}
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Growth Chart */}
        <div className="lg:col-span-2">
          <Card className="border-border p-6 bg-card rounded-xl shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {t("dashboard.growth_analytics")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("dashboard.growth_subtitle")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <select className="px-3 py-1 rounded-md bg-card border border-border text-sm text-foreground">
                  <option>Goats & Revenue</option>
                  <option>Revenue Only</option>
                  <option>Goats Only</option>
                </select>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
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
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#4B5224", fontWeight: 600 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="goats"
                    stroke="#4B5224"
                    fillOpacity={1}
                    fill="url(#goatsGradient)"
                    strokeWidth={2}
                    dot={{
                      fill: "#4B5224",
                      r: 4,
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#C7A75C"
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                    strokeWidth={2}
                    dot={{
                      fill: "#C7A75C",
                      r: 4,
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: "16px",
                      fontSize: "12px",
                      color: "#4B5224",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Market Prices */}
        <div>
          <Card className="border-border p-6 bg-card rounded-xl shadow h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h3 className="text-lg font-bold text-foreground">
                {t("dashboard.market_prices")}
              </h3>
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="px-3 py-1 rounded-md bg-card border border-border text-sm text-foreground"
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
              {filteredMarketPrices.map((item) => (
                <div
                  key={item.breed}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {item.quality}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {item.breed}
                      </p>
                      <p className="text-xs text-muted-foreground">per goat</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">
                      ₹{item.price.toLocaleString()}
                    </p>
                    <div
                      className={`flex items-center gap-1 text-xs font-medium ${
                        item.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.trend === "up" ? "↑" : "↓"}
                      {Math.abs(item.change)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="border-border p-6 bg-card rounded-xl shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">
                {t("dashboard.recent_activity")}
              </h3>
              <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div
                    className={`w-3 h-3 rounded-full mt-1.5 ${
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
                    <p className="text-sm font-medium text-foreground">
                      {activity.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                      {activity.priority === "high" && (
                        <span className="text-xs text-red-500 font-medium">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>
                  <Activity className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Insights */}
        <div>
          <Card className="border-border p-6 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow">
                <Activity className="w-4 h-4 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-bold text-primary-foreground">
                {t("dashboard.ai_insights")}
              </h3>
            </div>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-4 bg-white/10 rounded-lg border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <insight.icon className={`w-4 h-4 ${insight.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-accent mb-1">
                        {insight.title}
                      </p>
                      <p className="text-xs text-primary-foreground/80 leading-relaxed">
                        {insight.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 rounded-lg bg-accent/20 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/30 transition-colors">
              View All Insights
            </button>
          </Card>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="border-border p-6 bg-card rounded-xl shadow">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <h4 className="font-semibold text-foreground">
              {t("dashboard.upcoming_tasks")}
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Vaccination Schedule
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Due Tomorrow
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Market Listing
              </span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                In 3 days
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Feed Inventory Check
              </span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                In 5 days
              </span>
            </div>
          </div>
        </Card>

        <Card className="border-border p-6 bg-card rounded-xl shadow">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <h4 className="font-semibold text-foreground">
              {t("dashboard.quick_actions")}
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
              <Plus className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add Goat</span>
            </button>
            <button className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
              <Edit className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Edit Record</span>
            </button>
            <button className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
              <Eye className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">View Details</span>
            </button>
            <button className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
              <Download className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Export</span>
            </button>
          </div>
        </Card>

        <Card className="border-border p-6 bg-card rounded-xl shadow">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <h4 className="font-semibold text-foreground">Notifications</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-destructive mt-1.5"></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  Health alert: Goat #GT-2841
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  New market price update
                </p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  Feeding schedule updated
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}