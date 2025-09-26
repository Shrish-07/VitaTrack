// src/pages/About.js
import React, { useContext } from "react";
import { UIContext } from "../context/UIContext";

export default function About() {
  const { fontSize, colorblindMode, simplifiedUI } = useContext(UIContext);

  // Font size classes
  const fontSizeClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[fontSize];

  // Colorblind mode filter
  const colorblindClass = {
    none: "",
    protanopia: "filter hue-rotate-90",
    deuteranopia: "filter hue-rotate-180",
    tritanopia: "filter hue-rotate-270",
  }[colorblindMode];

  return (
    <div className={`space-y-8 ${fontSizeClass} ${colorblindClass} transition-all duration-500`}>
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-text">
        About VitaTrack
      </h1>

      <div className={`space-y-6`}>
        <div className={`p-6 rounded-2xl shadow-2xl transition-transform duration-500 transform hover:scale-105 ${
          simplifiedUI ? "bg-gray-600 text-white" : "bg-gradient-to-r from-indigo-400 to-purple-500 text-white"
        }`}>
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p>
            VitaTrack empowers you to take control of your health with a seamless, all-in-one dashboard.
            Where the only goal is YOU.
          </p>
        </div>

        <div className={`p-6 rounded-2xl shadow-2xl transition-transform duration-500 transform hover:scale-105 ${
          simplifiedUI ? "bg-gray-600 text-white" : "bg-gradient-to-r from-purple-400 to-pink-500 text-white"
        }`}>
          <h2 className="text-2xl font-bold mb-2">AI Assistant</h2>
          <p>
            Our intelligent AI assistant offers real-time guidance and health tips tailored to your lifestyle.
            Receive insights on staying hydrated, protecting your skin from UV exposure, and improving overall wellness.
          </p>
        </div>

        <div className={`p-6 rounded-2xl shadow-2xl transition-transform duration-500 transform hover:scale-105 ${
          simplifiedUI ? "bg-gray-600 text-white" : "bg-gradient-to-r from-green-400 to-teal-500 text-white"
        }`}>
          <h2 className="text-2xl font-bold mb-2">Accessibility & Customization</h2>
          <p>
            Customize your experience with multiple colorblind modes, font size adjustments, and a text to voice feature.
            VitaTrack is designed to be inclusive, ensuring every user can access their health data effortlessly.
          </p>
        </div>

        <div className={`p-6 rounded-2xl shadow-2xl transition-transform duration-500 transform hover:scale-105 ${
          simplifiedUI ? "bg-gray-600 text-white" : "bg-gradient-to-r from-pink-400 to-red-500 text-white"
        }`}>
          <h2 className="text-2xl font-bold mb-2">Vision Statement & Future Plans</h2>
          <p>
            We aim to create a modern, intuitive health platform that motivates users to make better lifestyle choices through actionable insights, real-time feedback, and a beautifully interactive interface.
            Our design prioritizes inclusivity and accessibility, ensuring a seamless experience for users of all abilities—including those with visual impairments, colorblindness, and neurological sensitivities—so that everyone can benefit equally from healthier living.
            In the future we plan on adding a more interactive and accurate disaster menu incorporating maps and descriptive icons, guiding you to safety near you, for when times are worse, you can do your best.

          </p>
        </div>
      </div>
    </div>
  );
}
