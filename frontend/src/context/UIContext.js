// src/context/UIContext.js
import React, { createContext, useState, useEffect } from "react";

// Create UI context
export const UIContext = createContext();

// Provider component
export const UIProvider = ({ children }) => {
  // Theme: light or dark
  const [theme, setTheme] = useState("light");

  // Simplified UI toggle
  const [simplifiedUI, setSimplifiedUI] = useState(false);

  // Colorblind modes: none, protanopia, deuteranopia, tritanopia
  const [colorblindMode, setColorblindMode] = useState("none");

  // Font size: sm, md, lg
  const [fontSize, setFontSize] = useState("md");

  // Update document body class for theme
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  // Update body attribute for colorblind mode
  useEffect(() => {
    document.body.setAttribute("data-colorblind", colorblindMode);
  }, [colorblindMode]);

  // Update body style for font size
  useEffect(() => {
    switch (fontSize) {
      case "sm":
        document.body.style.fontSize = "14px";
        break;
      case "md":
        document.body.style.fontSize = "16px";
        break;
      case "lg":
        document.body.style.fontSize = "18px";
        break;
      default:
        document.body.style.fontSize = "16px";
    }
  }, [fontSize]);

  // Toggle light/dark theme
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Toggle simplified UI
  const toggleSimplifiedUI = () => setSimplifiedUI(!simplifiedUI);

  // Change colorblind mode
  const changeColorblindMode = (mode) => setColorblindMode(mode);

  // Change font size
  const changeFontSize = (size) => setFontSize(size);

  return (
    <UIContext.Provider
      value={{
        theme,
        toggleTheme,
        simplifiedUI,
        toggleSimplifiedUI,
        colorblindMode,
        changeColorblindMode,
        fontSize,
        changeFontSize,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
