// frontend/src/utils/api.js
const BASE_URL = "http://10.6.2.249:5000"; // Your backend base URL

// Disaster API
export const fetchDisasters = async () => {
  const res = await fetch(`${BASE_URL}/disaster/api/disasters`);
  if (!res.ok) throw new Error("Failed to fetch disasters");
  return res.json();
};

// Weather API
export const fetchWeather = async (location) => {
  const res = await fetch(`${BASE_URL}/weather/api/weather?location=${location}`);
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
};

// Air Quality API
export const fetchAirQuality = async (lat, lon) => {
  const res = await fetch(`${BASE_URL}/airquality/api/airquality?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Failed to fetch air quality");
  return res.json();
};

// Directions API
export const fetchDirections = async (start, end) => {
  const res = await fetch(`${BASE_URL}/directions/api/directions?start=${start}&end=${end}`);
  if (!res.ok) throw new Error("Failed to fetch directions");
  return res.json();
};

// Chatbot API
export const sendChatbotMessage = async (message) => {
  const res = await fetch(`${BASE_URL}/chatbot/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  if (!res.ok) throw new Error("Failed to send chatbot message");
  return res.json();
};
