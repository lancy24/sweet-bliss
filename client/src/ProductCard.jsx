import React, { useState, useMemo } from "react";
import { useCart } from "./CartContext";
import FilterBar from "./FilterBar";
import ShareModal from "./ShareModal";
import "./CakeCard.css";

const MAX_LIMIT = 25;
const BASE_URL = "http://localhost:5000";

export default function ProductCard({ products, hasSizes = false, showCategoryFilter = false }) {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState(products.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}));
  const [sizes, setSizes] = useState(products.reduce((acc, p) => ({ ...acc, [p.id]: "500gm" }), {}));
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  const [shareProduct, setShareProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (category) result = result.filter((p) => p.category === category);
    if (sortBy === "low") result.sort((a, b) => (a.sizes?.[0]?.price || a.price || 0) - (b.sizes?.[0]?.price || b.price || 0));
    else if (sortBy === "high") result.sort((a, b) => (b.sizes?.[0]?.price || b.price || 0) - (a.sizes?.[0]?.price || a.price || 0));
    return result;
  }, [products, sortBy, category]);

  const handleQtyChange = (id, delta) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.min(Math.max((prev[id] || 0) + delta, 0), MAX_LIMIT) }));
  };

  const getPrice = (product, selectedSize) => {
    if (product.sizes?.length > 0) {
      const sizeObj = product.sizes.find((s) => s.weight === selectedSize);
      return sizeObj ? sizeObj.price : product.sizes[0].price;
    }
    return product.price || 0;
  };

  const handleAddToCart = (product) => {
    const id = product.id || product._id;
    const qty = quantities[id] || 0;
    if (!qty) { alert("Select at least 1 item!"); return; }
    const size = hasSizes ? (sizes[id] || product.sizes?.[0]?.weight) : null;
    const finalPrice = getPrice(product, size);
    const imageUrl = product.image ? (product.image.startsWith("http") ? product.image : `${BASE_URL}/uploads/${product.image}`) : product.img || null;
    addToCart({ id: hasSizes ? `${id}-${size}` : String(id), name: product.title || product.name, price: finalPrice, image: imageUrl, quantity: qty, ...(hasSizes && { size }) });
    alert(`${product.title || product.name} ${size ? `(${size})` : ""} ×${qty} added!`);
    setQuantities((prev) => ({ ...prev, [id]: 0 }));
  };

  return (
    <div>
      <FilterBar sortBy={sortBy} setSortBy={setSortBy} category={category} setCategory={setCategory} showCategory={showCategoryFilter} />
      <div className="images-container">
        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%", padding: "40px", color: "#888" }}>No products found 🎂</p>
        ) : (
          filteredProducts.map((product) => {
            const id = product.id || product._id;
            const size = sizes[id] || product.sizes?.[0]?.weight;
            const price = getPrice(product, size);
            const name = product.title || product.name;
            const imageUrl = product.image ? (product.image.startsWith("http") ? product.image : `${BASE_URL}/uploads/${product.image}`) : product.img || null;
            return (
              <div key={id} className="gallery" data-aos="flip-right">
                {imageUrl && <img src={imageUrl} alt={name} onError={(e) => { e.target.style.display = "none"; }} />}
                <p className="caption">{name}</p>
                <div className="price-cart">
                  <span className="price-text">₹{price.toLocaleString()}</span>
                  <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                    Add to Cart <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                  <button className="share" onClick={() => setShareProduct({ name, price })}>
                    <i className="fa-solid fa-share-nodes"></i>
                  </button>
                  <div className="quantity-wrapper">
                    <button className="qty-btn" onClick={() => handleQtyChange(id, +1)} disabled={(quantities[id] || 0) >= MAX_LIMIT}>+</button>
                    <span className="qty-display">{quantities[id] || 0}</span>
                    <button className="qty-btn" onClick={() => handleQtyChange(id, -1)} disabled={(quantities[id] || 0) <= 0}>−</button>
                  </div>
                </div>
                {hasSizes && product.sizes && (
                  <div className="sizeoptions">
                    {product.sizes.map((s) => (
                      <button key={s.weight} className={size === s.weight ? "active" : ""} onClick={() => setSizes(prev => ({ ...prev, [id]: s.weight }))}>{s.weight}</button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      {shareProduct && <ShareModal product={shareProduct.name} price={shareProduct.price} onClose={() => setShareProduct(null)} />}
    </div>
  );
}