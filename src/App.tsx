import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/common/Layout";
import { Dashboard } from "./pages/Dashboard";
import { GoatsPage } from "./pages/GoatsPage";
import LoginPage from "./pages/LoginPage";
import { Marketplace } from "./pages/Marketplace";
import AddGoatPage from "./pages/AddGoatPage";
import EmployeeList from "./pages/EmployeesList";
import AddEmployeePage from "./pages/AddEmployee";
import SitesList from "./pages/SitesList";
import AddSitesPage from "./pages/AddSites";
import WarehouseList from "./pages/WarehouseList";
import AddDataWarehouse from "./pages/AddDataWarehouse";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const location = useLocation();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <Routes location={location}>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes location={location}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goats" element={<GoatsPage />} />
        <Route path="/goats/add" element={<AddGoatPage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/add" element={<AddEmployeePage />} />
        <Route path="/sites" element={<SitesList />} />
        <Route path="/sites/add" element={<AddSitesPage />} />
        <Route path="/warehouses" element={<WarehouseList />} />
        <Route path="/warehouses/add" element={<AddDataWarehouse />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}
