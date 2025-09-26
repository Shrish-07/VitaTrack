// frontend/src/components/AccessibilitySettings.js
import React, { useState } from "react";

const AccessibilitySettings = ({ onChange }) => {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [simplifiedUI, setSimplifiedUI] = useState(false);

  const handleToggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    onChange({ voiceEnabled: !voiceEnabled, simplifiedUI });
  };

  const handleToggleUI = () => {
    setSimplifiedUI(!simplifiedUI);
    onChange({ voiceEnabled, simplifiedUI: !simplifiedUI });
  };

  return (
    <div className="accessibility-settings">
      <label>
        <input type="checkbox" checked={voiceEnabled} onChange={handleToggleVoice} />
        Voice Control
      </label>
      <label>
        <input type="checkbox" checked={simplifiedUI} onChange={handleToggleUI} />
        Simplified UI
      </label>
    </div>
  );
};

export default AccessibilitySettings;
