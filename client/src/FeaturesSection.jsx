import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './FeaturesSection.css';
import featureImage from './assets/ChatGPT Image Jun 23, 2025, 10_43_51 PM.png';
import Navbar from './Navbar';
import Discount from './Discount';
import { useNavigate } from 'react-router-dom';

const FeaturesSection = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 600, easing: 'ease-out-back', once: true, offset: 100 });
  }, []);

  return (
    <div style={{ paddingTop: "108px" }}>
      <Discount />
      <Navbar onHomeClick={() => navigate("/")} darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <div className={`ll ${darkMode ? "dark" : ""}`}>
        <div className="color" data-aos="zoom-out-up">
          <span style={{ color: '#FF0000' }}>Learn</span>{' '}
          <span style={{ color: '#66CC66' }}>more</span>{' '}
          <span style={{ color: '#FF9966' }}>About</span>{' '}
          <span style={{ color: '#e94e77' }}>Us 🧁</span>
        </div>
        <hr />
        <section className="features">
          <div className="feature-card" data-aos="zoom-in">
            <h3>🍰 AUTHENTIC RECIPES</h3>
            <p>Our products are based on traditional home-style recipes using fresh ingredients.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="100">
            <h3>❤️ BAKED WITH LOVE</h3>
            <p>Our passion for baking is poured into every recipe, serving smiles on a plate everyday.</p>
          </div>
          <div className="illustration" data-aos="zoom-in" data-aos-delay="200">
            <img src={featureImage} alt="Bakery storefront illustration" />
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
            <h3>⭐ COMMITTED TO QUALITY</h3>
            <p>From ingredients to kitchen operations & guest services, we always prioritize quality.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="400">
            <h3>💰 HONESTLY PRICED</h3>
            <p>We constantly strive to offer the best products at the right prices.</p>
          </div>
        </section>
        <hr />
      </div>
    </div>
  );
};

export default FeaturesSection;
