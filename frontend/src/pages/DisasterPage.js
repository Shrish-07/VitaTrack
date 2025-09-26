// frontend/src/pages/DisasterPage.js
import React, { useEffect, useState } from "react";
import { fetchDisasters } from "../utils/api";

const DisasterPage = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    const loadDisasters = async () => {
      try {
        setDisasters(await fetchDisasters());
      } catch (err) {
        console.error(err);
      }
    };
    loadDisasters();
  }, []);

  return (
    <div className="disaster-page">
      <h2>Disaster Events</h2>
      <pre>{JSON.stringify(disasters, null, 2)}</pre>
    </div>
  );
};

export default DisasterPage;
