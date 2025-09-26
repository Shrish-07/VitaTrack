// src/pages/Health.js
import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";

function Health() {
  const [hydration, setHydration] = useState("");
  const [activity, setActivity] = useState("");
  const [hydrationProgress, setHydrationProgress] = useState(0);
  const [activityProgress, setActivityProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHydrationProgress(Math.min((hydration / 64) * 100, 100));
    setActivityProgress(Math.min((activity / 10000) * 100, 100));
    setHydration("");
    setActivity("");
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center">Health Metrics</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <div>
          <label className="block mb-1 font-medium">Hydration (oz)</label>
          <input
            type="number"
            value={hydration}
            onChange={(e) => setHydration(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Activity (steps)</label>
          <input
            type="number"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Log Metrics
        </button>
      </form>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Progress</h2>
        <ProgressBar label="Hydration" progress={hydrationProgress} />
        <ProgressBar label="Activity" progress={activityProgress} />
      </div>
    </div>
  );
}

export default Health;
