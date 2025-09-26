// frontend/src/components/AirQualityCard.js
import React from "react";

const AirQualityCard = ({ data }) => {
  if (!data || data.length === 0) return <div>No air quality data available.</div>;

  return (
    <div className="air-quality-card">
      {data.map((aqi, idx) => (
        <div key={idx}>
          <p>Parameter: {aqi.ParameterName}</p>
          <p>AQI: {aqi.AQI} ({aqi.Category.Name})</p>
          <p>Location: {aqi.ReportingArea}, {aqi.StateCode}</p>
        </div>
      ))}
    </div>
  );
};

export default AirQualityCard;
