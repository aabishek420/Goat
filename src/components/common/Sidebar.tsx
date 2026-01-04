import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users as GoatIcon,
  BarChart3,
  Plus,
  Users,
  Warehouse,
} from "lucide-react";
import { GiGoat } from "react-icons/gi";
import { MdOutlineLocationCity } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavigationItem {
  name: string;
  icon: React.ElementType;
  path: string;
  current: boolean;
  badge?: number | null;
}

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sidebarWidth = isExpanded || isHovered ? "w-64" : "w-20";

  // Update CSS variable for layout margin
  React.useEffect(() => {
    const width = isExpanded ? 256 : 80;
    document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
  }, [isExpanded]);

  // Mock user stats for badges
  const userStats = {
    totalGoats: 47,
    alerts: 2,
  };

  const allNavigation: NavigationItem[] = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
      current: location.pathname === "/dashboard" || location.pathname === "/",
      badge: null,
    },
    {
      name: "Goats",
      icon: GiGoat,
      path: "/goats",
      current: location.pathname.startsWith("/goats"),
      badge: userStats.totalGoats,
    },
    // {
    //   name: t("common.marketplace") || "Marketplace",
    //   icon: BarChart3,
    //   path: "/marketplace",
    //   current: location.pathname === "/marketplace",
    //   badge: null,
    // },
    {
      name: "Employees",
      icon: Users,
      path: "/employees",
      current: location.pathname.startsWith("/employees"),
      badge: null,
    },
    {
      name: "Sites",
      icon: MdOutlineLocationCity,
      path: "/sites",
      current: location.pathname.startsWith("/sites"),
      badge: null,
    },
    {
      name: "Warehouses",
      icon: Warehouse,
      path: "/warehouses",
      current: location.pathname.startsWith("/warehouses"),
      badge: null,
    },
  ];

  const navigation = allNavigation; // Simplified for now, can add role filtering back if needed

  return (
    <>
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Mobile menu button */}
      <div
        className="fixed top-1 left-3 z-50 md:hidden bg-white rounded-md p-2 shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed left-0 top-0 z-40 h-full bg-linear-to-br from-primary to-primary/90 border-r border-primary-foreground/10  flex flex-col py-4 transition-all duration-300 ease-in-out ${sidebarWidth} ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${className || ""}`}
      >
        <div className="flex h-full flex-col">
          {/* Toggle Button */}
          <div
            className={`flex items-center mb-4 px-4 ${
              isExpanded || isHovered ? "justify-between" : "justify-center"
            }`}
          >
            {(isExpanded || isHovered) && (
              <div className="flex flex-col">
                <h2 className="text-white text-lg font-bold truncate">
                  KIDAVIRUNTHUU
                </h2>
                <p className="text-xs text-primary-foreground/70 uppercase tracking-wide truncate">
                  Goats Platform
                </p>
              </div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-foreground hover:bg-primary/90 p-2 rounded-lg transition-colors hidden md:block"
            >
              {isExpanded ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
            {navigation.map((item) => {
              const isActive = item.current;

              const common =
                `flex items-center rounded-lg transition-all duration-200 group px-3 py-2 ` +
                (isActive
                  ? "bg-primary-foreground/20 text-primary-foreground shadow-sm"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground");

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={common}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <div className="h-6 w-6 shrink-0 grid place-items-center relative">
                    <item.icon size={20} className="block" />
                  </div>
                  {(isExpanded || isHovered) && (
                    <div className="ml-3 flex-1 flex items-center justify-between overflow-hidden">
                      <span className="text-sm font-medium whitespace-nowrap">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary-foreground/20 text-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                  {/* Tooltip (only when collapsed) */}
                  {!(isExpanded || isHovered) && (
                    <div className="fixed left-20 ml-2 px-2 py-1 bg-popover text-popover-foreground font-medium text-sm rounded shadow-xl drop-shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
