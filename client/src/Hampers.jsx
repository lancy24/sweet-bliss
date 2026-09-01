import React from "react";
import { useCart } from "./CartContext";

import anniversarytrayImg from "./assets/gift/anniversarytray.jpg";
import bdaytrayImg from "./assets/gift/bdaytray.jpg";
import boxhamperImg from "./assets/gift/boxhamper.jpg";
import cakehamperImg from "./assets/gift/cakehamper.jpg";
import teddychocImg from "./assets/gift/teddychoc.jpg";

import "./CakeCard.css";

const products = [
  { id: 301, img: anniversarytrayImg, alt: "Festive Hamper", title: "ANNIVERSARY TRAY HAMPER" },
  { id: 302, img: bdaytrayImg, alt: "Chocolate Hamper", title: "BIRTHDAY TRAY HAMPER" },
  { id: 303, img: boxhamperImg, alt: "Gourmet Hamper", title: "BOX HAMPER" },
  { id: 304, img: cakehamperImg, alt: "Wellness Hamper", title: "CAKE HAMPER" },
  { id: 305, img: teddychocImg, alt: "Wellness Hamper", title: "TEDDY HAMPER" },
];

function Hampers() {
  const handleShare = (product) => {
    const shareData = {
      title: product.title,
      text: `Check out this amazing ${product.title}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard
        .writeText(`${shareData.text} ${shareData.url}`)
        .then(() => alert("Link copied"))
        .catch(console.error);
    }
  };

  return (
    <>
      <div className="images-container">
        {products.map((product) => (
          <div key={product.id} className="gallery" data-aos="flip-right">
            <img src={product.img} alt={product.alt} />
            <div className="caption">{product.title}</div>

            <button className="share" onClick={() => handleShare(product)}>
              <i className="fa-solid fa-share-nodes"></i>
            </button>
          </div>
        ))}
      </div>

      {/* Footer-style disclaimer */}
      <div className="footer-note">
        Price depends on your customization • You can customize your hamper as per your personalization.
      </div>
    </>
  );
}

export default Hampers;
