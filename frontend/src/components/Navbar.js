// src/components/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">SH Project</div>
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/settingspage"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Settings
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
