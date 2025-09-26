// src/components/ClickableText.js
import React from "react";
import { speakText } from "../utils/tts";

const ClickableText = ({ children, className }) => {
  const handleClick = () => {
    if (typeof children === "string" || typeof children === "number") speakText(children.toString());
  };

  return (
    <span
      onClick={handleClick}
      className={`cursor-pointer underline decoration-dotted ${className || ""}`}
      title="Click to hear"
    >
      {children}
    </span>
  );
};

export default ClickableText;
