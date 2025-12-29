import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Users as GoatIcon,
  Bell,
  Menu,
  X,
  TrendingUp,
  Settings,
  Plus,
  BarChart3,
  Heart,
} from "lucide-react";
import { Button } from "../ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole?: string;
  userStats?: {
    totalGoats?: number;
    monthlyRevenue?: number;
    healthyGoats?: number;
    alerts?: number;
  };
}

export function DashboardLayout({
  children,
  userName,
  userRole = "Farm Owner",
  userStats = {
    totalGoats: 47,
    monthlyRevenue: 245000,
    healthyGoats: 44,
    alerts: 2,
  },
}: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", badge: null },
    {
      id: "goats",
      icon: GoatIcon,
      label: "My Goats",
      badge: userStats.totalGoats,
    },
    { id: "marketplace", icon: BarChart3, label: "Marketplace", badge: null },
    { id: "reports", icon: TrendingUp, label: "Reports", badge: null },
    { id: "health", icon: Heart, label: "Health", badge: userStats.alerts },
    { id: "settings", icon: Settings, label: "Settings", badge: null },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notificationItems = [
    {
      id: 1,
      type: "health",
      message: "Vaccination due for 3 goats",
      time: "2 hours ago",
      priority: "high",
    },
    {
      id: 2,
      type: "market",
      message: "Beetal prices increased by 8.1%",
      time: "5 hours ago",
      priority: "medium",
    },
    {
      id: 3,
      type: "sale",
      message: "Goat #GT-2841 sold successfully",
      time: "1 day ago",
      priority: "low",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-cream/20 via-olive/10 to-forest/5">
      {/* Top Navigation Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl border-b border-olive/20 z-50 shadow-sm"
      >
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-olive to-forest rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src="/glogo.png"
                  alt="logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="hidden md:block">
                <h2 className="text-forest font-serif font-bold text-lg">
                  GOAT EMPIRE
                </h2>
                <p className="text-[10px] text-olive/70 uppercase tracking-widest">
                  Intelligence Platform
                </p>
              </div>
            </div>
          </div>

          {/* Center - Search Bar */}
          {/* <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-olive/50" />
              <Input
                placeholder="Search goats, records, marketplace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 bg-cream/50 border-olive/20 rounded-xl focus:border-olive focus:ring-2 focus:ring-olive/20 transition-all"
              />
            </div>
          </div> */}

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="w-5 h-5 text-forest" />
                  {notifications > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs border-2 border-white"
                    >
                      {notifications}
                    </motion.span>
                  )}
                </Button>
              </div>
            </motion.div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-olive/20">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-forest">{userName}</p>
                <p className="text-xs text-olive/70">{userRole}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-olive to-forest flex items-center justify-center text-cream font-bold text-sm shadow-lg">
                {userName.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-16 right-6 w-80 bg-white rounded-2xl shadow-xl border border-olive/20 z-50"
        >
          <div className="p-4 border-b border-olive/10">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-forest">Notifications</h3>
              <button
                onClick={() => setNotifications(0)}
                className="text-xs text-olive/60 hover:text-olive"
              >
                Mark all as read
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notificationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-cream/50 border-b border-olive/5 last:border-b-0 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      item.priority === "high"
                        ? "bg-red-500"
                        : item.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-forest">{item.message}</p>
                    <p className="text-xs text-olive/50 mt-1">{item.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-br from-forest to-olive/80 border-r border-white/10 z-40 overflow-y-auto"
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={`/${item.id}`}
                  className={({ isActive }) =>
                    `flex items-center w-full px-4 py-3 gap-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-olive/90 text-cream shadow-lg"
                        : "text-cream/80 hover:text-cream hover:bg-white/10"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left font-medium">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-olive/50 text-cream">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="p-4 mt-8">
          <div className="space-y-2">
            <Button
              onClick={() => navigate("/goats/add")}
              className="w-full bg-gold text-forest font-medium hover:bg-gold/90 rounded-xl flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Goat
            </Button>
            <Button
              variant="outline"
              className="w-full text-cream border-cream/30 hover:bg-white/10 rounded-xl"
            >
              Export Report
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "lg:pl-64" : "pl-0"
        }`}
      >
        <div className="p-6 lg:p-10">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30 top-16 backdrop-blur-sm"
        />
      )}
    </div>
  );
}
