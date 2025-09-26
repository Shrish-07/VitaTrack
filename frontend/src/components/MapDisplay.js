// frontend/src/components/MapDisplay.js
import React from "react";

const MapDisplay = ({ routeData }) => {
  if (!routeData) return <div>Loading map...</div>;

  return (
    <div className="map-container">
      {/* This could be replaced with a map library like Leaflet or Google Maps */}
      <pre>{JSON.stringify(routeData, null, 2)}</pre>
    </div>
  );
};

export default MapDisplay;
