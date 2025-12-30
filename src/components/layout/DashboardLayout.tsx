import { useState } from "react";
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
  const [notifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-foreground/5">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-background/95 border-b border-border z-50 shadow">
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
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow">
                <img
                  src="/glogo.png"
                  alt="logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="hidden md:block">
                <h2 className="text-foreground font-bold text-lg">
                  GOAT EMPIRE
                </h2>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Intelligence Platform
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="w-5 h-5 text-foreground" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs border-2 border-background">
                    {notifications}
                  </span>
                )}
              </Button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm shadow">
                {userName.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 right-6 w-80 bg-card rounded-xl shadow-lg border border-border z-50">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                {t("common.notifications")}
              </h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                Close
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notificationItems.map((item) => (
              <div
                key={item.id}
                className="p-4 hover:bg-muted/50 border-b border-border last:border-b-0 cursor-pointer"
                onClick={() => setShowNotifications(false)}
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-br from-primary to-primary/90 border-r border-primary-foreground/10 z-40 overflow-y-auto transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id}>
                <NavLink
                  to={`/${item.id}`}
                  className={({ isActive }) =>
                    `flex items-center w-full px-4 py-3 gap-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground shadow"
                        : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }`
                  }
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left font-medium">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary-foreground/20 text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="p-4 mt-8">
          <div className="space-y-2">
            <Button
              onClick={() => {
                navigate("/goats/add");
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className="w-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 rounded-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t("common.add_new_goat")}
            </Button>
            <Button
              variant="outline"
              className="w-full text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 rounded-lg"
            >
              Export Report
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-200 ${
          sidebarOpen ? "lg:pl-64" : "pl-0"
        }`}
      >
        <div className="p-6 lg:p-8">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/30 z-30 top-16"
        />
      )}
    </div>
  );
}