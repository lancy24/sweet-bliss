import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

function Navbar({ onHomeClick, darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleHome = () => {
    onHomeClick?.();
    setMenuOpen(false);
  };

  return (
    <>
      <div className="container">
        {/* Logo */}
        <div className="box">
          <div id="studio" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <b>SWEET BLISS🍰</b>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="nav1">
          <li onClick={handleHome} style={{ cursor: "pointer" }}>
            <div><i className="fa-solid fa-igloo"></i> <b>Home</b></div>
          </li>
          <li onClick={() => navigate("/about")} style={{ cursor: "pointer" }}>
            <div><b>About</b></div>
          </li>
          <li onClick={() => document.getElementById("product-menu")?.scrollIntoView({ behavior: "smooth" })} style={{ cursor: "pointer" }}>
            <div><i className="fa-solid fa-tags"></i> <b>Price list</b></div>
          </li>
          <li onClick={() => navigate("/offers")} style={{ cursor: "pointer" }}>
            <div><b>Offers</b></div>
          </li>
          <li onClick={() => navigate("/contact")} style={{ cursor: "pointer" }}>
            <div><i className="fa-solid fa-phone"></i> <b>Contact</b></div>
          </li>
          <li onClick={() => navigate("/build-box")} style={{ cursor: "pointer" }}>
            <div>🎁 <b>Build Box</b></div>
          </li>
        </ul>

        {/* Desktop Right Side */}
        <div className="desktop-right">
          <div id="mainScreen">
            <button id="modeButton" onClick={toggleDarkMode}>
              <p id="modeName">{darkMode ? "LIGHT MODE ☀️" : "DARK MODE 🌙"}</p>
            </button>
          </div>

          <div className="auth-nav-buttons">
            {user ? (
              <>
                <span className="nav-username">👤 {user.name}</span>
                {user.role === "admin" && (
                  <button className="nav-admin-btn" onClick={() => navigate("/admin")}>Admin</button>
                )}
                <button className="nav-logout-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className="nav-login-btn" onClick={() => navigate("/login")}>Login</button>
                <button className="nav-signup-btn" onClick={() => navigate("/signup")}>Sign Up</button>
              </>
            )}
          </div>

          <div className="book">
            <button onClick={() => navigate("/cart")}>🛒 CART</button>
          </div>

          <div className="veg"><h3>PURE VEG 🟢</h3></div>
        </div>

        {/* Hamburger Button - mobile only */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`ham-line ${menuOpen ? "open" : ""}`}></span>
          <span className={`ham-line ${menuOpen ? "open" : ""}`}></span>
          <span className={`ham-line ${menuOpen ? "open" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-inner">
            {/* User info */}
            {user && (
              <div className="mobile-user">
                👤 <b>{user.name}</b>
              </div>
            )}

            <button className="mobile-nav-item" onClick={handleHome}>🏠 Home</button>
            <button className="mobile-nav-item" onClick={() => handleNav("/about")}>ℹ️ About</button>
            <button className="mobile-nav-item" onClick={() => { document.getElementById("product-menu")?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }}>🏷️ Price List</button>
            <button className="mobile-nav-item" onClick={() => handleNav("/offers")}>🎉 Offers</button>
            <button className="mobile-nav-item" onClick={() => handleNav("/contact")}>📞 Contact</button>
            <button className="mobile-nav-item" onClick={() => handleNav("/build-box")}>🎁 Build Box</button>
            <button className="mobile-nav-item" onClick={() => handleNav("/cart")}>🛒 Cart</button>

            <div className="mobile-divider" />

            <button className="mobile-nav-item" onClick={() => { toggleDarkMode(); setMenuOpen(false); }}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {user ? (
              <>
                {user.role === "admin" && (
                  <button className="mobile-nav-item admin" onClick={() => handleNav("/admin")}>⚙️ Admin Panel</button>
                )}
                <button className="mobile-nav-item logout" onClick={handleLogout}>🚪 Logout</button>
              </>
            ) : (
              <>
                <button className="mobile-nav-item login" onClick={() => handleNav("/login")}>🔐 Login</button>
                <button className="mobile-nav-item signup" onClick={() => handleNav("/signup")}>✍️ Sign Up</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Overlay to close menu */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}

export default Navbar;
