// src/pages/SettingsPage.js
import React, { useContext } from "react";
import { UIContext } from "../context/UIContext";

const SettingsPage = () => {
  const {
    theme,
    toggleTheme,
    simplifiedUI,
    toggleSimplifiedUI,
    colorblindMode,
    changeColorblindMode,
    fontSize,
    changeFontSize,
  } = useContext(UIContext);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-all duration-500">
      <h1 className="text-3xl font-bold text-indigo-600">Settings</h1>

      {/* Dark Mode */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Dark Mode</span>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >
          {theme === "dark" ? "Disable" : "Enable"}
        </button>
      </div>

      {/* Simplified UI */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Simplified UI</span>
        <button
          onClick={toggleSimplifiedUI}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
        >
          {simplifiedUI ? "Disable" : "Enable"}
        </button>
      </div>

      {/* Colorblind Mode */}
      <div className="flex flex-col gap-2">
        <span className="font-medium">Colorblind Mode</span>
        <select
          value={colorblindMode}
          onChange={(e) => changeColorblindMode(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="none">None</option>
          <option value="protanopia">Protanopia</option>
          <option value="deuteranopia">Deuteranopia</option>
          <option value="tritanopia">Tritanopia</option>
        </select>
      </div>

      {/* Font Size */}
      <div className="flex flex-col gap-2">
        <span className="font-medium">Font Size</span>
        <select
          value={fontSize}
          onChange={(e) => changeFontSize(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">
        Customize your experience. Dark mode reduces eye strain, simplified UI reduces cognitive load, colorblind modes improve visibility for different types of color vision, and font size adjustments help with reading comfort.
      </p>
    </div>
  );
};

export default SettingsPage;
