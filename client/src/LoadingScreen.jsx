import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";

export default function LoadingScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="loading-content">
        <div className="loading-logo">🧁</div>
        <h1 className="loading-title">Blissful Bites</h1>
        <p className="loading-subtitle">Baked with love, served with joy</p>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}