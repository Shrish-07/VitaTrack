// frontend/src/components/WeatherCard.js
import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return <div>Loading weather...</div>;

  return (
    <div className="weather-card">
      <h3>{weather.location}</h3>
      <p>Temperature: {weather.temp}°C</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Condition: {weather.description}</p>
    </div>
  );
};

export default WeatherCard;
