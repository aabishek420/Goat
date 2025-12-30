import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
      <Routes location={location}>
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <DashboardLayout userName={userName}>
      <Routes location={location}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goats" element={<GoatsPage />} />
        <Route path="/goats/add" element={<AddGoatPage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}