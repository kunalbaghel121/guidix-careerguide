// components/layout/dashboard-layout.js
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/layout/dashboard-layout.module.css";

const sidebarItems = [
  {
    title: "Home",
    icon: "🏠",
    href: "/",
  },
  {
    title: "Dashboard",
    icon: "📊",
    href: "/dashboard",
  },
  {
    title: "AI Resume Builder",
    icon: "📄",
    href: "/resume-builder",
  },
  {
    title: "AI Job Search",
    icon: "🔍",
    href: "/job-search",
  },
  {
    title: "AI Job Apply",
    icon: "📤",
    href: "/apply-job",
  },
  {
    title: "AI Job Tracker",
    icon: "🎯",
    href: "/job-tracker",
  },
  {
    title: "AI Mock Interview",
    icon: "👥",
    href: "/mock-interview",
  },
  {
    title: "Linkedin Optimiser",
    icon: "💼",
    href: "/linkedin-optimizer",
  },
];

const footerItems = [
  {
    title: "Suggest a Feature",
    icon: "💡",
    href: "/suggest-feature",
  },
  {
    title: "Report a Bug",
    icon: "🐛",
    href: "/report-bug",
  },
];

export function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-all duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              {!collapsed && (
                <div>
                  <h1 className="font-semibold text-gray-900">Guidix</h1>
                  <p className="text-xs text-gray-500">AI Career Hub</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Items */}
        <div className="mt-auto p-3 border-t border-gray-200">
          <ul className="space-y-1 mb-3">
            {footerItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                >
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && (
                    <span className="font-medium text-sm">{item.title}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Collapse Button */}
          {!collapsed ? (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden lg:flex items-center space-x-3 w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Collapse</span>
            </button>
          ) : (
            <button
              onClick={() => setCollapsed(false)}
              className="hidden lg:flex items-center justify-center w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${collapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
                {sidebarItems.find((item) => isActive(item.href))?.title || "Home"}
              </h2>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Career Progress */}
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-xs lg:text-sm text-gray-600">
                  Career Progress 68%
                </span>
                <div className="w-16 lg:w-24 h-2 bg-gray-200 rounded-full">
                  <div className="w-11 lg:w-16 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                </div>
              </div>

              {/* Upgrade Button */}
              <button className="hidden sm:block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base shadow-sm">
                Upgrade Now
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">👤</span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium">User</p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
                <svg className="hidden lg:block w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
