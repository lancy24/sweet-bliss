import React, { useState, useMemo } from "react";
import { useCart } from "./CartContext";
import FilterBar from "./FilterBar";
import ShareModal from "./ShareModal";
import "./CakeCard.css";

import redvelvetImg    from "./assets/red velvet.jpg";
import chocolateImg    from "./assets/choc.jpg";
import lavaImg         from "./assets/choco lava.jpg";
import butterscotchImg from "./assets/butterscoth.jpg";
import fruitImg        from "./assets/fruit cake.jpg";
import strawberryImg   from "./assets/strawbeery.jpg";
import truffleImg      from "./assets/truffle.jpg";
import weddingImg      from "./assets/wedding.jpg";
import vanillaImg      from "./assets/bday.jpg";
import blueberryImg    from "./assets/blueberry.jpg";

const products = [
  { id: 101, img: redvelvetImg,    title: "RED VELVET CAKE",        sizes: [{weight:"500gm",price:599},{weight:"1kg",price:999} ]},
  { id: 102, img: chocolateImg,    title: "CHOCOLATE CAKE",         sizes: [{weight:"500gm",price:499},{weight:"1kg",price:899}]},
  { id: 103, img: lavaImg,         title: "CHOCO LAVA CAKE",        sizes: [{weight:"150gm",price:49} ]},
  { id: 104, img: butterscotchImg, title: "BUTTERSCOTCH CAKE",      sizes: [{weight:"500gm",price:399},{weight:"1kg",price:749}]},
  { id: 105, img: fruitImg,        title: "FRUIT CAKE",             sizes: [{weight:"500gm",price:549},{weight:"1kg",price:999}]},
  { id: 106, img: strawberryImg,   title: "STRAWBERRY CAKE",        sizes: [{weight:"500gm",price:649},{weight:"1kg",price:1099}] },
  { id: 107, img: truffleImg,      title: "CHOCOLATE TRUFFLE CAKE", sizes: [{weight:"500gm",price:799},{weight:"1kg",price:1399}]},
  { id: 108, img: weddingImg,      title: "WEDDING CAKE",           sizes: [{weight:"8kg",price:19999}]},
  { id: 109, img: vanillaImg,      title: "VANILLA CAKE",           sizes: [{weight:"500gm",price:349},{weight:"1kg",price:699}] },
  { id: 110, img: blueberryImg,    title: "BLUEBERRY CAKE",         sizes: [{weight:"500gm",price:649},{weight:"1kg",price:1199}] },
];

const MAX_LIMIT = 25;

export default function CakeCard() {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState(products.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}));
  const [sizes, setSizes]           = useState(products.reduce((acc, p) => ({ ...acc, [p.id]: p.sizes[0].weight }), {}));
  const [sortBy, setSortBy]         = useState("");
  const [shareProduct, setShareProduct] = useState(null);

  const getPrice = (product, selectedSize) => {
    const s = product.sizes.find(s => s.weight === selectedSize);
    return s ? s.price : product.sizes[0].price;
  };

  const sorted = useMemo(() => {
    const copy = [...products];
    if (sortBy === "low")  copy.sort((a, b) => getPrice(a, sizes[a.id]) - getPrice(b, sizes[b.id]));
    if (sortBy === "high") copy.sort((a, b) => getPrice(b, sizes[b.id]) - getPrice(a, sizes[a.id]));
    return copy;
  }, [sortBy, sizes]);

  const handleQtyChange = (id, delta) =>
    setQuantities(prev => ({ ...prev, [id]: Math.min(Math.max((prev[id] || 0) + delta, 0), MAX_LIMIT) }));

  const handleAddToCart = (product) => {
    const qty = quantities[product.id];
    if (!qty) { alert("Select at least 1 item!"); return; }
    const size  = sizes[product.id];
    const price = getPrice(product, size);
    addToCart({ id: `${product.id}-${size}`, name: product.title, price, image: product.img, quantity: qty, size });
    alert(`${product.title} (${size}) ×${qty} added to cart!`);
    setQuantities(prev => ({ ...prev, [product.id]: 0 }));
  };

  return (
    <div>
      <FilterBar sortBy={sortBy} setSortBy={setSortBy} category="" setCategory={() => {}} showCategory={false} />
      <div className="images-container">
        {sorted.map(product => {
          const size  = sizes[product.id];
          const price = getPrice(product, size);
          return (
            <div key={product.id} className="gallery" data-aos="flip-right">
              <img src={product.img} alt={product.title} />
              <p className="caption">{product.title}</p>
              <div className="price-cart">
                <span className="price-text">₹{price.toLocaleString()}</span>
                <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                  Add to Cart <i className="fa-solid fa-cart-shopping"></i>
                </button>
                <button className="share" onClick={() => setShareProduct({ name: product.title, price })}>
                  <i className="fa-solid fa-share-nodes"></i>
                </button>
                <div className="quantity-wrapper">
                  <button className="qty-btn" onClick={() => handleQtyChange(product.id, +1)} disabled={quantities[product.id] >= MAX_LIMIT}>+</button>
                  <span className="qty-display">{quantities[product.id] || 0}</span>
                  <button className="qty-btn" onClick={() => handleQtyChange(product.id, -1)} disabled={quantities[product.id] <= 0}>−</button>
                </div>
              </div>
              <div className="sizeoptions">
                {product.sizes.map(s => (
                  <button key={s.weight} className={size === s.weight ? "active" : ""} onClick={() => setSizes(prev => ({ ...prev, [product.id]: s.weight }))}>
                    {s.weight}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {shareProduct && <ShareModal product={shareProduct.name} price={shareProduct.price} onClose={() => setShareProduct(null)} />}
    </div>
  );
}
