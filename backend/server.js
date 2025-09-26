require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- API KEYS ---
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const AIRNOW_API_KEY = process.env.AIRNOW_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // <-- Add this to your .env

// --- Helper functions ---
async function getWeatherAndUV(zip) {
  try {
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${OPENWEATHER_API_KEY}`
    );
    const data = weatherRes.data;

    const { lat, lon } = data.coord;
    const uvRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
    );

    return {
      weather: {
        temp: data.main.temp,
        description: data.weather[0].description
      },
      uv: uvRes.data.value
    };
  } catch (err) {
    console.error("Weather API error:", err.message);
    return { weather: null, uv: null };
  }
}

async function getAirQuality(zip) {
  try {
    const res = await axios.get(
      `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zip}&distance=25&API_KEY=${AIRNOW_API_KEY}`
    );
    if (res.data.length) return res.data[0].AQI;
    return null;
  } catch (err) {
    console.error("Air Quality API error:", err.message);
    return null;
  }
}

async function getRecentDisasters() {
  try {
    const res = await axios.get("https://eonet.gsfc.nasa.gov/api/v3/events");
    return res.data.events.slice(0, 6);
  } catch (err) {
    console.error("Disaster API error:", err.message);
    return [];
  }
}

// --- Metrics route ---
app.get('/api/metrics', async (req, res) => {
  const zip = req.query.zip;
  if (!zip || zip.length !== 5) {
    return res.status(400).json({ message: "Invalid ZIP code" });
  }

  const [weatherData, airQuality, disasters] = await Promise.all([
    getWeatherAndUV(zip),
    getAirQuality(zip),
    getRecentDisasters()
  ]);

  const userMetrics = {
    hydration: { value: 32, goal: 64 },
    steps: 5200,
    mental_health: "Good"
  };

  res.json({
    ...userMetrics,
    weather: weatherData.weather,
    uv_index: weatherData.uv,
    air_quality: airQuality,
    disasters
  });
});

// --- Update metrics route ---
app.post('/api/metrics/update', (req, res) => {
  const updated = {
    hydration: req.body.hydration || 32,
    hydration_goal: 64,
    mental_health: req.body.mental_health || "Good"
  };
  res.json({ metrics: updated });
});

// --- Reset metrics ---
app.post('/api/metrics/reset', (req, res) => {
  const reset = {
    hydration: 32,
    hydration_goal: 64,
    mental_health: "Good"
  };
  res.json({ metrics: reset });
});

// --- Chatbot route with Gemini API ---
app.post('/chatbot', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.json({ reply: "Please type something!" });

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: message }] }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY
        }
      }
    );

    const replyText =
      response.data?.candidates?.[0]?.content?.[0]?.text ||
      "Hmm, I didn't understand that. Try asking something else.";

    res.json({ reply: replyText });
  } catch (err) {
    console.error("Gemini API error:", err.message);
    res.json({ reply: "Error: Could not reach AI server." });
  }
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
