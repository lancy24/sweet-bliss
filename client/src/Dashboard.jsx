import React, { useRef, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './Dashboard.css';

import Discount from './Discount';
import Navbar from './Navbar';
import SearchBar from "./SearchBar";
import BakeryHeader from './BakeryHeader';
import ProductMenu from './ProductMenu';
import Bestsellers from './Bestsellers';
import Bakers from './Bakers';
import TourAndMap from './TourAndMap';
import FAQ from './FAQ';
import Reviews from './Reviews';
import Footer from './Footer';
import Chatbot from "./Chatbot";


export default function Dashboard() {
  const bakeryHeaderRef = useRef(null);
  const aboutFooterRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-back', once: true, offset: 80 });
  }, []);

  return (
    <div className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
      <Discount />
      <Navbar
        onHomeClick={() => bakeryHeaderRef.current?.scrollIntoView({ behavior: "smooth" })}
        onAboutClick={() => aboutFooterRef.current?.scrollIntoView({ behavior: "smooth" })}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <SearchBar /> 
      <BakeryHeader ref={bakeryHeaderRef} />
      <ProductMenu />
      <Bestsellers />
      <Bakers />
      <TourAndMap />
      <FAQ />
      <Reviews />
      <Footer ref={aboutFooterRef} />
      <Chatbot />
    </div>
  );
}
