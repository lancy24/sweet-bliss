import React from 'react';
import videoFile from './assets/Untitled design (2).mp4'; // Adjust path if needed
import './TourAndMap.css'; // Optional: if you're using custom styles

const TourAndMap = () => {
  return (
    <div>
      <div className="tour">
        <h1>👉🏻Inside Blissful Bites👈🏻</h1>
        <video autoPlay muted loop playsInline>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <br />
      <section className="map-section">
        <h2>Map to Happiness ☺️☺️</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9890.872244514803!2d75.77027341160408!3d30.914412795722086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a813b949ae787%3A0x8de32c92c0b3eb6!2sSouth%20City%2C%20Ayali%20Khurd%2C%20Punjab!5e0!3m2!1sen!2sin!4v1752609852135!5m2!1sen!2sin"
            width="1520"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Blissful Bites Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default TourAndMap;
