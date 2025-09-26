// src/utils/tts.js
export const speakText = (text) => {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;   // Speed of speech
  utterance.pitch = 1;  // Pitch of voice
  window.speechSynthesis.speak(utterance);
};
