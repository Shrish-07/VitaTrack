// src/components/AlertCard.js
import React from "react";

function AlertCard({ title, message, type }) {
  const typeClasses = {
    info: "bg-blue-100 border-blue-400 text-blue-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
    error: "bg-red-100 border-red-400 text-red-800"
  };

  return (
    <div
      className={`border-l-4 p-4 mb-3 rounded-md shadow-sm ${typeClasses[type] || typeClasses.info}`}
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default AlertCard;
