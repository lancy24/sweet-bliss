import './BakeryHeader.css';
import pandaVideo from './assets/panda.mp4';
import React, { forwardRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    bg: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    emoji: "🎂",
    title: "Celebrate Every Moment",
    subtitle: "Custom cakes made with love",
    btn: "Order Now",
    path: "/cakecard",
  },
  {
    bg: "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    emoji: "🧁",
    title: "Freshly Baked Cupcakes",
    subtitle: "Oreo, Nutella, Tiramisu & more",
    btn: "Explore",
    path: "/cupcakes",
  },
  {
    bg: "linear-gradient(135deg, #f6d365, #fda085)",
    emoji: "🍪",
    title: "Crunchy & Delicious Cookies",
    subtitle: "Butter, Almond, Coconut & more",
    btn: "Shop Now",
    path: "/cookies",
  },
  {
    bg: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    emoji: "🍰",
    title: "Premium Cheesecakes",
    subtitle: "Japanese, Mango, Biscoff & more",
    btn: "View Menu",
    path: "/cheesecake",
  },
  {
    bg: "linear-gradient(135deg, #fddb92, #d1fdff)",
    emoji: "🥐",
    title: "Fresh Pastries Daily",
    subtitle: "Croissants, Puffs, Rasmalai & more",
    btn: "Order Now",
    path: "/pastry",
  },
];

const BakeryHeader = forwardRef((props, ref) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 2500);
    return () => clearInterval(timer);
  }, [current]);

  const goNext = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setAnimating(false);
    }, 200);
  };

  const goPrev = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setAnimating(false);
    }, 200);
  };

  const slide = slides[current];

  return (
    <div id="home" className="hd" ref={ref}>

      {/* SLIDESHOW */}
      <div className="hero-slideshow" style={{ background: slide.bg }}>
        <div className={`hero-content ${animating ? "content-fade" : ""}`}>
          <div className="hero-emoji">{slide.emoji}</div>
          <h2 className="hero-title">{slide.title}</h2>
          <p className="hero-subtitle">{slide.subtitle}</p>
          <button className="hero-btn" onClick={() => navigate(slide.path)}>
            {slide.btn} →
          </button>
        </div>

        <div className="slide-dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`slide-dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        <button className="slide-arrow left" onClick={goPrev}>‹</button>
        <button className="slide-arrow right" onClick={goNext}>›</button>
      </div>

      {/* HEADER */}
      <div className="containerr">
        <h1>Blissful Bites</h1>
        <p><u>Love at first bite: the bakery edition.</u> 🥯</p>
      </div>

      {/* VIDEO */}
      <div className="cakecake">
        <video autoPlay muted loop playsInline>
          <source src={pandaVideo} type="video/mp4" />
        </video>
        <div className="overlay">SURPRISE YOUR CLOSE ONES.</div>
      </div>

    </div>
  );
});

export default BakeryHeader;