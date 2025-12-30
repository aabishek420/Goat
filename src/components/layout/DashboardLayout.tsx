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
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { id: "dashboard", icon: Home, label: t("common.dashboard"), badge: null },
    {
      id: "goats",
      icon: GoatIcon,
      label: t("common.goats"),
      badge: userStats.totalGoats,
    },
    {
      id: "marketplace",
      icon: BarChart3,
      label: t("common.marketplace"),
      badge: null,
    },
    { id: "reports", icon: TrendingUp, label: "Reports", badge: null },
    { id: "health", icon: Heart, label: "Health", badge: userStats.alerts },
    {
      id: "settings",
      icon: Settings,
      label: t("common.settings"),
      badge: null,
    },
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
    <div className="min-h-screen bg-linear-to-br from-background via-primary/5 to-foreground/5">
      {/* Top Navigation Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-xl border-b border-border z-50 shadow-sm"
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
              <div className="w-10 h-10 bg-linear-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src="/glogo.png"
                  alt="logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="hidden md:block">
                <h2 className="text-foreground font-display font-bold text-lg">
                  GOAT EMPIRE
                </h2>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
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
            <LanguageSwitcher />

            {/* Notifications */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="w-5 h-5 text-foreground" />
                  {notifications > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs border-2 border-background"
                    >
                      {notifications}
                    </motion.span>
                  )}
                </Button>
              </div>
            </motion.div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
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
          className="absolute top-16 right-6 w-80 bg-card rounded-2xl shadow-xl border border-border z-50"
        >
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                {t("common.notifications")}
              </h3>
              <button
                onClick={() => setNotifications(0)}
                className="text-xs text-muted-foreground hover:text-primary"
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
                className="p-4 hover:bg-muted/50 border-b border-border last:border-b-0 cursor-pointer"
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
                    <p className="text-sm text-foreground">{item.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.time}
                    </p>
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
        className="fixed left-0 top-16 bottom-0 w-64 bg-linear-to-br from-primary to-primary/90 border-r border-primary-foreground/10 z-40 overflow-y-auto"
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
                        ? "bg-primary-foreground/20 text-primary-foreground shadow-lg"
                        : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left font-medium">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-foreground/20 text-primary-foreground">
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
              className="w-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 rounded-xl flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t("common.add_new_goat")}
            </Button>
            <Button
              variant="outline"
              className="w-full text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 rounded-xl"
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
