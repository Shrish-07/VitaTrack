// src/pages/Dashboard.js
import React, { useEffect, useState, useContext } from "react";
import Chatbot from "../components/Chatbot";
import { UIContext } from "../context/UIContext";
import axios from "axios";
import ClickableText from "../components/ClickableText";
import { speakText } from "../utils/tts";

export default function Dashboard() {
  const { simplifiedUI } = useContext(UIContext);

  const [hydration, setHydration] = useState(0);
  const [hydrationGoal, setHydrationGoal] = useState(64);
  const [uvIndex, setUvIndex] = useState(null);
  const [mentalHealth, setMentalHealth] = useState("Good");
  const [mentalHealthMessage, setMentalHealthMessage] = useState(
    "Take a deep breath and let go of what you can't control."
  );
  const [zipCode, setZipCode] = useState("");
  const [airQuality, setAirQuality] = useState(null);
  const [weather, setWeather] = useState(null);
  const [disasters, setDisasters] = useState([]);

  // ------------------------
  // ZIP CODE SAMPLE DATA
  // ------------------------
  const zipData = {
    "08857": {
      hydration: 50,
      hydrationGoal: 64,
      uvIndex: 7,
      mentalHealth: "Good",
      airQuality: 42,
      weather: "72°F, Sunny",
      disasters: [
        { title: "Flood Warning", categories: ["Severe Weather"] },
        { title: "Storm Surge", categories: ["Weather"] },
        { title: "Power Outage", categories: ["Infrastructure"] },
        { title: "Wildfire Risk", categories: ["Fire"] },
        { title: "Heat Advisory", categories: ["Heat"] },
        { title: "Road Closure", categories: ["Infrastructure"] },
      ],
    },
    "15213": { hydration: 55, hydrationGoal: 70, uvIndex: 5, mentalHealth: "Okay", airQuality: 55, weather: "65°F, Cloudy", disasters: [
      { title: "Road Closure", categories: ["Infrastructure"] },
      { title: "Minor Fire", categories: ["Fire"] },
      { title: "Flood Warning", categories: ["Severe Weather"] },
      { title: "Heat Advisory", categories: ["Heat"] },
      { title: "Storm Surge", categories: ["Weather"] },
      { title: "Power Outage", categories: ["Infrastructure"] },
    ]},
    "10001": { hydration: 60, hydrationGoal: 64, uvIndex: 8, mentalHealth: "Good", airQuality: 30, weather: "75°F, Sunny", disasters: [
      { title: "Traffic Accident", categories: ["Infrastructure"] },
      { title: "Flood Warning", categories: ["Severe Weather"] },
      { title: "Heat Advisory", categories: ["Heat"] },
      { title: "Power Outage", categories: ["Infrastructure"] },
      { title: "Minor Fire", categories: ["Fire"] },
      { title: "Storm Surge", categories: ["Weather"] },
    ]},
    "20001": { hydration: 48, hydrationGoal: 64, uvIndex: 6, mentalHealth: "Okay", airQuality: 40, weather: "70°F, Partly Cloudy", disasters: [
      { title: "Flood Warning", categories: ["Severe Weather"] },
      { title: "Traffic Accident", categories: ["Infrastructure"] },
      { title: "Heat Advisory", categories: ["Heat"] },
      { title: "Minor Fire", categories: ["Fire"] },
      { title: "Storm Surge", categories: ["Weather"] },
      { title: "Power Outage", categories: ["Infrastructure"] },
    ]},
    "94105": { hydration: 52, hydrationGoal: 64, uvIndex: 5, mentalHealth: "Good", airQuality: 35, weather: "68°F, Foggy", disasters: [
      { title: "Earthquake Risk", categories: ["Seismic"] },
      { title: "Road Closure", categories: ["Infrastructure"] },
      { title: "Wildfire Risk", categories: ["Fire"] },
      { title: "Flood Warning", categories: ["Severe Weather"] },
      { title: "Heat Advisory", categories: ["Heat"] },
      { title: "Power Outage", categories: ["Infrastructure"] },
    ]},
  };

  // ------------------------
  // FETCH METRICS
  // ------------------------
  const fetchMetrics = async () => {
    if (!zipCode) return;
    if (zipData[zipCode]) {
      const data = zipData[zipCode];
      setHydration(data.hydration);
      setHydrationGoal(data.hydrationGoal);
      setUvIndex(data.uvIndex);
      setMentalHealth(data.mentalHealth);
      setAirQuality(data.airQuality);
      setWeather(data.weather);
      setDisasters(data.disasters);
    } else if (zipCode.length === 5) {
      try {
        const res = await axios.get(`http://localhost:5000/api/metrics?zip=${zipCode}`);
        const data = res.data;
        setHydration(data.hydration.value);
        setHydrationGoal(data.hydration.goal);
        setUvIndex(data.uv);
        setMentalHealth(data.mental_health);
        setAirQuality(data.air_quality);
        setWeather(data.weather ? `${data.weather.temp}°F, ${data.weather.description}` : "N/A");
        setDisasters(data.disasters.slice(0, 6));
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [zipCode]);

  // ------------------------
  // UPDATE METRICS
  // ------------------------
  const updateMetric = async (key, value) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/metrics/update`, { [key]: value });
      const updated = res.data.metrics;
      setHydration(updated.hydration);
      setHydrationGoal(updated.hydration_goal);
      setMentalHealth(updated.mental_health);

      // Speak updated metrics
      speakText(`${key} updated to ${value}`);
    } catch (err) {
      console.error("Error updating metric:", err);
    }
  };

  const resetMetrics = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/metrics/reset`);
      const reset = res.data.metrics;
      setHydration(reset.hydration);
      setHydrationGoal(reset.hydration_goal);
      setMentalHealth(reset.mental_health);
      setUvIndex(null);
      setAirQuality(null);
      setWeather(null);
      setDisasters([]);
      speakText("Metrics have been reset");
    } catch (err) {
      console.error("Error resetting metrics:", err);
    }
  };

  // ------------------------
  // UTILITY FUNCTIONS
  // ------------------------
  const airQualityBadge = () => {
    if (airQuality === null) return { label: "", color: "gray" };
    if (airQuality <= 50) return { label: "Good", color: "green" };
    if (airQuality <= 100) return { label: "Moderate", color: "yellow" };
    if (airQuality <= 150) return { label: "Unhealthy (S)", color: "orange" };
    if (airQuality <= 200) return { label: "Unhealthy", color: "red" };
    if (airQuality <= 300) return { label: "Very Unhealthy", color: "purple" };
    return { label: "Hazardous", color: "pink" };
  };

  const uvBadgeColor = () => {
    if (uvIndex === null) return "gray";
    if (uvIndex <= 2) return "green";
    if (uvIndex <= 5) return "yellow";
    if (uvIndex <= 7) return "orange";
    if (uvIndex <= 10) return "red";
    return "purple";
  };

  const getCardClasses = (lightBg, darkBg, lightText = "text-white", darkText = "text-white") =>
    simplifiedUI
      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
      : `${lightBg} ${lightText} dark:${darkBg} ${darkText}`;

  // ------------------------
  // AUTO SPEAK METRICS ON CHANGE
  // ------------------------
  useEffect(() => {
    speakText(`Hydration is ${hydration} ounces out of ${hydrationGoal}`);
  }, [hydration, hydrationGoal]);

  useEffect(() => {
    if (uvIndex !== null) speakText(`UV index is ${uvIndex}`);
  }, [uvIndex]);

  useEffect(() => {
    speakText(`Mental health status is ${mentalHealth}`);
  }, [mentalHealth]);

  useEffect(() => {
    if (airQuality !== null) speakText(`Air quality index is ${airQuality} - ${airQualityBadge().label}`);
  }, [airQuality]);

  useEffect(() => {
    if (weather) speakText(`Current weather is ${weather}`);
  }, [weather]);

  useEffect(() => {
    if (disasters.length) speakText(`There are ${disasters.length} recent disasters`);
  }, [disasters]);

  // ------------------------
  // RENDER
  // ------------------------
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        <ClickableText>Dashboard</ClickableText>
      </h1>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Enter ZIP code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <ClickableText className="text-gray-500 dark:text-gray-300">Enter ZIP to fetch local metrics</ClickableText>
      </div>

      <div>
        <button
          onClick={resetMetrics}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          <ClickableText>Reset Metrics</ClickableText>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hydration */}
        <div
          className={`${getCardClasses(
            "bg-gradient-to-r from-indigo-400 to-purple-500",
            "bg-gradient-to-r from-indigo-700 to-purple-900"
          )} p-6 rounded-xl shadow-2xl transition transform hover:scale-105`}
        >
          <h2 className="text-lg font-semibold mb-2"><ClickableText>Hydration</ClickableText></h2>
          <p className="mb-1 font-medium">
            <ClickableText>{hydration} oz / {hydrationGoal} oz</ClickableText>
          </p>
          <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-4 mb-2">
            <div
              className="h-4 rounded-full bg-blue-500"
              style={{ width: `${(hydration / hydrationGoal) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <ClickableText>Aim for {hydrationGoal} oz/day</ClickableText>
          </p>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              value={hydration}
              onChange={(e) => setHydration(Number(e.target.value))}
              className="w-20 p-1 rounded text-black dark:text-white dark:bg-gray-700"
            />
            <button
              onClick={() => updateMetric("hydration", hydration)}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow"
            >
              <ClickableText>Update</ClickableText>
            </button>
          </div>
        </div>

        {/* UV Index */}
        <div
          className={`${getCardClasses(
            "bg-yellow-400 text-gray-900",
            "bg-yellow-600 text-black"
          )} p-6 rounded-xl shadow-2xl transition transform hover:scale-105`}
        >
          <h2 className="text-lg font-semibold mb-2"><ClickableText>UV Index</ClickableText></h2>
          <p className="mb-1 font-medium">
            <ClickableText>{uvIndex !== null ? uvIndex : "Loading..."}</ClickableText>
          </p>
          <div className="w-full bg-yellow-200 dark:bg-yellow-500 rounded-full h-4 mb-2">
            <div
              className={`h-4 rounded-full`}
              style={{
                width: `${uvIndex ? (uvIndex / 11) * 100 : 0}%`,
                backgroundColor:
                  uvIndex <= 2
                    ? "green"
                    : uvIndex <= 5
                    ? "yellow"
                    : uvIndex <= 7
                    ? "orange"
                    : uvIndex <= 10
                    ? "red"
                    : "purple",
              }}
            />
          </div>
          {uvIndex !== null && (
            <span
              className={`px-2 py-1 rounded text-white text-sm`}
              style={{ backgroundColor: uvBadgeColor() }}
            >
              <ClickableText>
                {uvIndex <= 2
                  ? "Low"
                  : uvIndex <= 5
                  ? "Moderate"
                  : uvIndex <= 7
                  ? "High"
                  : uvIndex <= 10
                  ? "Very High"
                  : "Extreme"}
              </ClickableText>
            </span>
          )}
        </div>

        {/* Mental Health Message */}
        <div
          className={`${getCardClasses(
            "bg-gradient-to-r from-pink-400 to-red-500",
            "bg-gradient-to-r from-pink-700 to-red-900"
          )} p-6 rounded-xl shadow-2xl transition transform hover:scale-105`}
        >
          <h2 className="text-lg font-semibold mb-2">
            <ClickableText>Mental Health Message</ClickableText>
          </h2>
          <p className="mb-2 font-medium">
            <ClickableText>{mentalHealthMessage}</ClickableText>
          </p>
          <button
            onClick={() => {
              const messages = [
                "Take a deep breath and let go of what you can't control.",
                "You are stronger than you think.",
                "Remember to take small breaks for yourself today.",
                "Every step forward counts, no matter how small.",
                "It's okay to not be okay. Be kind to yourself.",
                "Focus on what you can change and release the rest.",
                "A positive mindset can turn a bad day around."
              ];
              const randomMessage = messages[Math.floor(Math.random() * messages.length)];
              setMentalHealthMessage(randomMessage);
              speakText(randomMessage);
            }}
            className="px-3 py-1 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
          >
            <ClickableText>New Message</ClickableText>
          </button>
        </div>

        {/* Air Quality */}
        <div
          className={`${getCardClasses(
            "bg-teal-400 text-gray-900",
            "bg-teal-700 text-white"
          )} p-6 rounded-xl shadow-2xl transition transform hover:scale-105`}
        >
          <h2 className="text-lg font-semibold mb-2"><ClickableText>Air Quality Index</ClickableText></h2>
          <p className="mb-1 font-medium">
            <ClickableText>{airQuality !== null ? airQuality : "Enter ZIP code"}</ClickableText>
          </p>
          {airQuality !== null && (
            <span
              className="px-2 py-1 rounded text-sm"
              style={{ backgroundColor: airQualityBadge().color, color: "white" }}
            >
              <ClickableText>{airQualityBadge().label}</ClickableText>
            </span>
          )}
        </div>

        {/* Weather */}
        <div
          className={`${getCardClasses(
            "bg-indigo-400 text-white",
            "bg-indigo-800 text-white"
          )} p-6 rounded-xl shadow-2xl transition transform hover:scale-105`}
        >
          <h2 className="text-lg font-semibold mb-2"><ClickableText>Weather</ClickableText></h2>
          <p className="mb-2 font-medium">
            <ClickableText>{weather || "Enter ZIP code"}</ClickableText>
          </p>
        </div>

        {/* Recent Disasters */}
        <div
          className={`${getCardClasses(
            "bg-red-400 text-white",
            "bg-red-800 text-white"
          )} p-6 rounded-xl shadow-2xl transition transform hover:scale-105`}
        >
          <h2 className="text-lg font-semibold mb-2"><ClickableText>Recent Disasters</ClickableText></h2>
          {disasters.length ? (
            <ul className="list-disc pl-5">
              {disasters.map((d, idx) => (
                <li key={idx}>
                  <ClickableText>
                    {d.title} ({d.categories.join(", ")})
                  </ClickableText>
                </li>
              ))}
            </ul>
          ) : (
            <p><ClickableText>Loading recent events...</ClickableText></p>
          )}
        </div>

        {/* Chatbot */}
        <div className="md:col-span-2 lg:col-span-3">
          <Chatbot apiEndpoint="/chatbot" />
        </div>
      </div>
    </div>
  );
}
