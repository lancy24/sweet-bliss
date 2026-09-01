import React from "react";
import "./FilterBar.css";

export default function FilterBar({ sortBy, setSortBy, category, setCategory, showCategory = true }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">🔽 Sort by Price:</span>
        <div className="filter-buttons">
          <button
            className={sortBy === "" ? "filter-btn active" : "filter-btn"}
            onClick={() => setSortBy("")}
          >
            Default
          </button>
          <button
            className={sortBy === "low" ? "filter-btn active" : "filter-btn"}
            onClick={() => setSortBy("low")}
          >
            Low → High
          </button>
          <button
            className={sortBy === "high" ? "filter-btn active" : "filter-btn"}
            onClick={() => setSortBy("high")}
          >
            High → Low
          </button>
        </div>
      </div>

      {showCategory && (
        <div className="filter-group">
          <span className="filter-label">🎂 Category:</span>
          <div className="filter-buttons">
            <button
              className={category === "" ? "filter-btn active" : "filter-btn"}
              onClick={() => setCategory("")}
            >
              All
            </button>
            <button
              className={category === "cake" ? "filter-btn active" : "filter-btn"}
              onClick={() => setCategory("cake")}
            >
              Cakes
            </button>
            <button
              className={category === "cupcake" ? "filter-btn active" : "filter-btn"}
              onClick={() => setCategory("cupcake")}
            >
              Cupcakes
            </button>
            <button
              className={category === "pastry" ? "filter-btn active" : "filter-btn"}
              onClick={() => setCategory("pastry")}
            >
              Pastries
            </button>
            <button
              className={category === "cookie" ? "filter-btn active" : "filter-btn"}
              onClick={() => setCategory("cookie")}
            >
              Cookies
            </button>
            <button
              className={category === "other" ? "filter-btn active" : "filter-btn"}
              onClick={() => setCategory("other")}
            >
              Others
            </button>
          </div>
        </div>
      )}
    </div>
  );
}