import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BiLogOut, BiUser } from "react-icons/bi";
import { getUserRole } from "../../utils/auth";
import Notification from "./Notification";
import { useAuthStore } from "../../store/useAuthStore";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, logout } = useAuthStore();
  const userRole = getUserRole();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUserInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
  };

  const userName = user?.full_name || "User";

  return (
    <header
      className={`h-16 bg-background/95 border-b border-border flex items-center justify-between px-8 sticky top-0 z-30 drop-shadow-md backdrop-blur supports-backdrop-filter:bg-background/60 ${
        className || ""
      }`}
    >
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-foreground">KIDAVIRUNTHUU</h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <button
          onClick={() => setShowNotificationModal(true)}
          className="relative p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-200 focus:outline-none"
          aria-label="Notifications"
        >
          <MdOutlineNotificationsActive size={24} />
          <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-3 hover:bg-primary/10 rounded-xl p-2 pl-3 transition-all duration-200 focus:outline-none"
          >
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-semibold text-foreground leading-snug">
                {userName}
              </span>
              <span className="text-xs text-muted-foreground leading-snug">
                {userRole || "Guest"}
              </span>
            </div>
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold shadow-sm">
                {getUserInitials(userName)}
              </div>
            </div>
          </button>

          {/* Profile Dropdown Overlay */}
          {showProfileDropdown && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileDropdown(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-64 bg-card rounded-xl shadow-2xl border border-border z-50 animate-in fade-in zoom-in duration-150 transform origin-top-right">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold">
                      {getUserInitials(userName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground truncate">
                        {userName}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {userRole} Account
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-foreground hover:text-primary transition-colors"
                  >
                    <BiUser className="h-5 w-5" />
                    <span className="text-sm font-medium">My Profile</span>
                  </button>
                </div>

                <div className="p-2 border-t border-border">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  >
                    <BiLogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Notification Modal */}
      {showNotificationModal &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex justify-end"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
              onClick={() => setShowNotificationModal(false)}
            />
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 animate-in slide-in-from-right duration-300 flex flex-col">
              <Notification onClose={() => setShowNotificationModal(false)} />
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};

export default Header;
