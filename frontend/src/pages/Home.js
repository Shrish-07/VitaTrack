// src/pages/Home.js
import React, { useContext } from "react";
import { UIContext } from "../context/UIContext";
import { Link } from "react-router-dom";

export default function Home() {
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
        Welcome to VitaTrack
      </h1>

      <p className={`text-gray-700 dark:text-gray-200 ${simplifiedUI ? "text-base" : "text-lg"} transition-all`}>
        Your personal health dashboard and AI assistant. Track hydration, UV exposure,
        steps, mental health, and get advice from our smart AI assistant.
      </p>

      {/* Get Started Card */}
      <div
        className={`p-6 rounded-2xl shadow-2xl transition-transform duration-500 transform hover:scale-105 ${
          simplifiedUI
            ? "bg-gray-600 text-white"
            : "bg-gradient-to-r from-indigo-400 to-purple-500 text-white"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4">Get Started</h2>
        <p className="mb-4">
          Navigate to the Dashboard to see your personalized metrics and start chatting with your Health AI.
        </p>
        <div className="flex gap-4">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/settings"
            className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-200 transition"
          >
            Open Settings
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Hydration Tracker",
            desc: "Monitor daily water intake and stay hydrated with reminders.",
            gradient: "from-purple-400 to-pink-500",
          },
          {
            title: "Weather",
            desc: "Helpful in preparing for your day ahead",
            gradient: "from-indigo-400 to-purple-500",
          },
          {
            title: "UV Exposure",
            desc: "Monitor UV levels and get recommendations to protect your skin.",
            gradient: "from-pink-400 to-red-500",
          },
          {
            title: "Mental Health",
            desc: "Track mood, stress levels, and receive mental health tips from AI.",
            gradient: "from-green-400 to-teal-500",
          },
        ].map((card) => (
          <div
            key={card.title}
            className={`p-6 rounded-xl shadow-xl transition-transform duration-500 transform hover:scale-105 ${
              simplifiedUI
                ? "bg-gray-700 text-white"
                : `bg-gradient-to-r ${card.gradient} text-white`
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
            <p className="mb-4">{card.desc}</p>
            <Link
              to="/dashboard"
              className="px-3 py-1 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-200 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
