import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { GoatsPage } from "./pages/GoatsPage";
import LoginPage from "./pages/LoginPage";
import { Marketplace } from "./pages/Marketplace";
import AddGoatPage from "./pages/AddGoatPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName] = useState("Ramesh Kumar");
  const location = useLocation();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key="login-routes">
          <Route
            path="/login"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoginPage onLogin={handleLogin} />
              </motion.div>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <DashboardLayout userName={userName}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/goats" element={<GoatsPage />} />
            <Route path="/goats/add" element={<AddGoatPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
}
