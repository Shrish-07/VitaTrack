// src/components/Layout.js
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UIContext } from "../context/UIContext";

const Layout = ({ children }) => {
  const { theme, simplifiedUI, colorblindMode, fontSize } = useContext(UIContext);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Settings", path: "/settings" },
  ];

  // Font size classes
  const fontSizeClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[fontSize];

  // Colorblind mode filters
  const colorblindClass = {
    none: "",
    protanopia: "filter hue-rotate-90",
    deuteranopia: "filter hue-rotate-180",
    tritanopia: "filter hue-rotate(270deg)",
  }[colorblindMode];

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${fontSizeClass} ${colorblindClass} ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 text-gray-900"
      }`}
    >
      {/* Navigation Bar */}
      <nav
        className={`flex items-center justify-between px-8 py-4 shadow-2xl rounded-b-3xl ${
          simplifiedUI
            ? theme === "dark"
              ? "bg-gray-800"
              : "bg-gray-200"
            : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        } transition-all duration-700`}
      >
        <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
          SH Project
        </h1>
        <div className="flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-semibold text-white hover:text-yellow-300 transform hover:scale-105 transition-all duration-300 ${
                location.pathname === item.path ? "underline decoration-yellow-400 decoration-2" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main
        className={`p-8 transition-all duration-700 max-w-7xl mx-auto`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
