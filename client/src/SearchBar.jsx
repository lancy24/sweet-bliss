import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const ALL_PRODUCTS = [
  { name: "Red Velvet Cake", path: "/cakecard", category: "Cake" },
  { name: "Chocolate Cake", path: "/cakecard", category: "Cake" },
  { name: "Choco Lava Cake", path: "/cakecard", category: "Cake" },
  { name: "Butterscotch Cake", path: "/cakecard", category: "Cake" },
  { name: "Fruit Cake", path: "/cakecard", category: "Cake" },
  { name: "Strawberry Cake", path: "/cakecard", category: "Cake" },
  { name: "Chocolate Truffle Cake", path: "/cakecard", category: "Cake" },
  { name: "Wedding Cake", path: "/cakecard", category: "Cake" },
  { name: "Vanilla Cake", path: "/cakecard", category: "Cake" },
  { name: "Blueberry Cake", path: "/cakecard", category: "Cake" },
  { name: "Japanese Cheesecake", path: "/cheesecake", category: "Cheesecake" },
  { name: "Baklava Cheesecake", path: "/cheesecake", category: "Cheesecake" },
  { name: "Mango Cheesecake", path: "/cheesecake", category: "Cheesecake" },
  { name: "Biscoff Cheesecake", path: "/cheesecake", category: "Cheesecake" },
  { name: "Choco Pastry", path: "/pastry", category: "Pastry" },
  { name: "Pineapple Pastry", path: "/pastry", category: "Pastry" },
  { name: "Puff Pastry", path: "/pastry", category: "Pastry" },
  { name: "Croissants", path: "/pastry", category: "Pastry" },
  { name: "Black Forest Pastry", path: "/pastry", category: "Pastry" },
  { name: "Truffle Pastry", path: "/pastry", category: "Pastry" },
  { name: "Mango Pastry", path: "/pastry", category: "Pastry" },
  { name: "Rasmalai Pastry", path: "/pastry", category: "Pastry" },
  { name: "Oreo Cupcake", path: "/cupcakes", category: "Cupcake" },
  { name: "Peanut Butter Cupcake", path: "/cupcakes", category: "Cupcake" },
  { name: "Nutella Cupcake", path: "/cupcakes", category: "Cupcake" },
  { name: "Pista Cupcake", path: "/cupcakes", category: "Cupcake" },
  { name: "Tiramisu Cupcake", path: "/cupcakes", category: "Cupcake" },
  { name: "Muffins", path: "/cupcakes", category: "Cupcake" },
  { name: "Glazed Donut", path: "/donuts", category: "Donut" },
  { name: "Jelly Filled Donut", path: "/donuts", category: "Donut" },
  { name: "Boston Cream Donut", path: "/donuts", category: "Donut" },
  { name: "Bagels", path: "/donuts", category: "Donut" },
  { name: "Choco Chip Cookies", path: "/cookies", category: "Cookie" },
  { name: "Naankhatai", path: "/cookies", category: "Cookie" },
  { name: "Butter Cookies", path: "/cookies", category: "Cookie" },
  { name: "Almond Cookies", path: "/cookies", category: "Cookie" },
  { name: "Hazelnut Cookies", path: "/cookies", category: "Cookie" },
  { name: "Coconut Cookies", path: "/cookies", category: "Cookie" },
  { name: "Caramel Brownie", path: "/brownies", category: "Brownie" },
  { name: "Cheesecake Brownie", path: "/brownies", category: "Brownie" },
  { name: "Chocolate Brownie", path: "/brownies", category: "Brownie" },
  { name: "Millionaire Brownie", path: "/brownies", category: "Brownie" },
  { name: "Walnut Brownie", path: "/brownies", category: "Brownie" },
  { name: "White Chocolate Chips Brownie", path: "/brownies", category: "Brownie" },
  { name: "Brownie with Lava Cake", path: "/combo", category: "Combo" },
  { name: "Coffee with Croissant", path: "/combo", category: "Combo" },
  { name: "Cookies with Milkshake", path: "/combo", category: "Combo" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

useEffect(() => {
  console.log("Query:", query);
 if (query.trim().length < 1){
    setResults([]);
    setIsOpen(false);
    return;
  }
  const filtered = ALL_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );
  console.log("Results:", filtered.length);
  console.log("isOpen:", true);
  setResults(filtered);
  setIsOpen(true);
}, [query]);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (path) => {
    setQuery("");
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="search-bar-standalone">
      <div className="search-wrapper" ref={wrapperRef}>
        <div className="search-input-wrapper">
          {/* <i className="fa-solid fa-magnifying-glass search-icon"></i> */}
          <input
  type="text"
  className="search-input"
  placeholder="🔍 Search cakes, pastries, cookies..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  style={{ 
    color: "#000000", 
    backgroundColor: "white",
    WebkitTextFillColor: "#000000"
  }}
/>
          {query && (
            <button className="search-clear" onClick={() => setQuery("")}>✕</button>
          )}
        </div>

        {isOpen && results.length > 0 && (
          <div className="search-dropdown">
            {results.map((item, i) => (
              <div
                key={i}
                className="search-result-item"
                onClick={() => handleSelect(item.path)}
              >
                <span className="result-icon">🧁</span>
                <div>
                  <div className="result-name">{item.name}</div>
                  <div className="result-category">{item.category}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isOpen && query.length >= 2 && results.length === 0 && (
          <div className="search-dropdown">
            <div className="search-no-result">
              No products found for "{query}" 😔
            </div>
          </div>
        )}
      </div>
    </div>
  );
}