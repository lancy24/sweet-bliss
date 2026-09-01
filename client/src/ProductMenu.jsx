import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductMenu.css';

import cake1  from './assets/cake1.jpeg';
import cake2  from './assets/cake2.jpeg';
import pastry from './assets/pastry.jpeg';
import cake4  from './assets/cake4.jpeg';
import cake5  from './assets/cake5.jpeg';
import cake6  from './assets/cake6.jpeg';
import cake7  from './assets/cake7.jpeg';
import combo  from './assets/combo.jpg';
import hamper from './assets/hamperrr.webp';

const menuItems = [
  {
    label: "CAKES", path: "/cakecard",
    items: ["Red Velvet Cake", "Chocolate Cake", "Choco Lava Cake", "Butterscotch Cake", "Fruit Cake", "Strawberry Cake", "Chocolate Truffle Cake", "Wedding Cake", "Vanilla Cake", "Blueberry Cake"]
  },
  {
    label: "CHEESECAKES", path: "/cheesecake",
    items: ["Japanese Cheesecake", "Baklava Cheesecake", "Mango Cheesecake", "Biscoff Cheesecake"]
  },
  {
    label: "PASTRIES", path: "/pastry",
    items: ["Choco Pastry", "Pineapple Pastry", "Puff Pastry", "Croissants", "Black Forest Pastry", "Truffle Pastry", "Mango Pastry", "Rasmalai Pastry"]
  },
  {
    label: "CUPCAKES", path: "/cupcakes",
    items: ["Oreo Cupcake", "Peanut Butter Cupcake", "Nutella Cupcake", "Pista Cupcake", "Tiramisu Cupcake", "Muffins"]
  },
  {
    label: "DONUTS", path: "/donuts",
    items: ["Glazed Donut", "Jelly Filled Donut", "Boston Cream Donut", "Bagels"]
  },
  {
    label: "COOKIES", path: "/cookies",
    items: ["Choco Chip Cookies", "Naankhatai", "Butter Cookies", "Almond Cookies", "Hazelnut Cookies", "Coconut Cookies"]
  },
  {
    label: "BROWNIES", path: "/brownies",
    items: ["Chocolate Brownies", "Walnut Brownies", "Caramel Brownies", "White Choco Chip Brownies", "Cheesecake Brownies", "Millionaire Brownies"]
  },
  {
    label: "COMBOS", path: "/combo",
    items: ["Croissants and Coffee", "Brownies with Lava Cake", "Cookies and Milkshake"]
  },
  // {
  //   label: "TRENDING", path: "/cakecard",
  //   items: ["Hampers", "Lotus Biscoff Cheesecake", "Walnut Brownie", "Naankhatai", "Bagels", "Red Velvet Cupcake"]
  // },
];

export default function ProductMenu() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (label) => {
    setOpenMenu(prev => prev === label ? null : label);
  };

  return (
    <div id="product-menu" className="ll">
      <div className="color">
        <span style={{ color: '#e94e77' }}>OUR</span>{' '}
        <span style={{ color: '#673f5b' }}>PRODUCTS</span>
      </div>

      {/* Dropdown nav - click to open */}
      <nav>
        <ul className="navbar">
          {menuItems.map((menu) => (
            <li key={menu.label} className={openMenu === menu.label ? "open" : ""}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu(menu.label);
                }}
              >
                {menu.label} <span className="arrow">{openMenu === menu.label ? "▲" : "▼"}</span>
              </a>
              {openMenu === menu.label && (
                <div className="dropdown-content">
                  <div
                    className="dropdown-header"
                    onClick={() => { navigate(menu.path); setOpenMenu(null); }}
                  >
                    → View All {menu.label}
                  </div>
                  {menu.items.map((item) => (
                    <a
                      key={item}
                      href="#"
                      onClick={(e) => { e.preventDefault(); navigate(menu.path); setOpenMenu(null); }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Product category images */}
      <div className="images-container">
        <div className="gallery" data-aos="flip-right">
          <Link to="/cakecard"><img src={cake1} alt="Cake" /></Link>
          <p className="caption">Cake</p>
        </div>
        <div className="gallery" data-aos="flip-right">
          <Link to="/cheesecake"><img src={cake2} alt="Cheesecake" /></Link>
          <p className="caption">Cheesecake</p>
        </div>
        <div className="gallery" data-aos="flip-right">
          <Link to="/pastry"><img src={pastry} alt="Pastries" /></Link>
          <p className="caption">Pastries</p>
        </div>
        <div className="gallery" data-aos="flip-right">
          <Link to="/cupcakes"><img src={cake4} alt="Cupcakes" /></Link>
          <p className="caption">Cupcakes</p>
        </div>
        <div className="gallery" data-aos="flip-right">
          <Link to="/donuts"><img src={cake5} alt="Donuts" /></Link>
          <p className="caption">Donuts</p>
        </div>
        <div className="gallery" data-aos="flip-right">
          <Link to="/cookies"><img src={cake6} alt="Cookies" /></Link>
          <p className="caption">Cookies</p>
        </div>
        <div className="gallery" data-aos="flip-right">
          <Link to="/brownies"><img src={cake7} alt="Brownies" /></Link>
          <p className="caption">Brownies</p>
        </div>
        <div className="gallery" data-aos="flip-right">
          <Link to="/combo"><img src={combo} alt="Combo" /></Link>
          <p className="caption">Combo Offers</p>
        </div>
        <div className="gallery" data-aos="flip-right">
          <Link to="/hamper"><img src={hamper} alt="Hamper" /></Link>
          <p className="caption">Gift Hamper</p>
        </div>
      </div>

      <hr />
    </div>
  );
}
