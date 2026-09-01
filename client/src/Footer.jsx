import React, { forwardRef } from 'react';
 import { Link } from "react-router-dom";
import './Footer.css';

const Footer = forwardRef((props, aboutRef) => {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* ABOUT SECTION (TARGET) */}
        <div className="footer-about" ref={aboutRef}>
          <h3>Sweet Bliss🧁</h3>
          <p className="sweett">
            Delicious treats delivered fresh to your door.<br />
            We make every moment sweeter!
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links:-</h4>
          <ul>
            <li>
  <a
    href="#home"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    }}
  >
    Home
  </a>
</li>

         <li>
  <a
    href="#product-menu"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById("product-menu")?.scrollIntoView({ behavior: "smooth" });
    }}
  >
    Shop
  </a>
</li>

         

<li>
  <Link to="/about-us">About Us</Link>
</li>

           <li>
  <Link to="/contact-us">Contact Us</Link>
</li>
      
    
         <li>
  <a
    href="#question"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById("question")?.scrollIntoView({ behavior: "smooth" });
    }}
  >
    FAQ
  </a>
</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us:-</h4>
          <p className="email"><i className="fa fa-envelope"></i> blissfulbites@gmail.com</p>
          <p className="email"><i className="fa fa-phone"></i> +917717581243</p>
          <p className="email"><i className="fa fa-map-marker"></i> Ludhiana, Punjab</p>
        </div>

        <div className="footer-social">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        <p>&copy; 2025 Blissful Bites. All rights reserved.</p>
      </div>
    </footer>
  );
});

export default Footer;
