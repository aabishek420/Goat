import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div
        className="flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
        style={{ marginLeft: "var(--sidebar-width, 80px)" }}
      >
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <div className="w-full max-w-8xl mx-auto">
            {children ?? <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}
