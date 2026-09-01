import React from "react";
import "./Contact.css"; // Import the bakery-style CSS

const Contact = () => {
  return (
    <div className="contact-page">
      <h2 className="contact-title">Get in Touch with Blissful Bites 🍩</h2>
      <div className="contact-card">
        <h4>Contact Us</h4>
        <p className="contact-item">
          <i className="fa fa-envelope"></i> blissfulbites@gmail.com
        </p>
        <p className="contact-item">
          <i className="fa fa-phone"></i> +91 7717581243
        </p>
        <p className="contact-item">
          <i className="fa fa-map-marker"></i> #167 South City, Ludhiana, Punjab
        </p>
      </div>
    </div>
  );
};

export default Contact;
