import React, { useEffect } from "react";
import "./ShareModal.css";

export default function ShareModal({ product, price, onClose }) {
  const text = `🧁 Check out ${product} - ₹${price} at Blissful Bites! Order now at localhost:5173`;
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent("http://localhost:5173");

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: "fab fa-whatsapp",
      color: "#25D366",
      url: `https://wa.me/?text=${encodedText}`,
    },
    {
      name: "Instagram",
      icon: "fab fa-instagram",
      color: "#E1306C",
      url: `https://www.instagram.com/`,
      note: "(copy link)",
    },
    {
      name: "Twitter/X",
      icon: "fab fa-twitter",
      color: "#1DA1F2",
      url: `https://twitter.com/intent/tweet?text=${encodedText}`,
    },
    {
      name: "Facebook",
      icon: "fab fa-facebook-f",
      color: "#1877F2",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      name: "Telegram",
      icon: "fab fa-telegram-plane",
      color: "#0088cc",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
  ];

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(text);
    alert("✅ Product info copied to clipboard!");
  };

  return (
    <div className="share-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <button className="share-close" onClick={onClose}>✕</button>
        <div className="share-header">
          <span className="share-emoji">🧁</span>
          <h3>Share this product</h3>
          <p className="share-product-name">{product}</p>
          <p className="share-price">₹{price}</p>
        </div>

        <div className="share-buttons">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="share-option"
              style={{ "--share-color": link.color }}
              onClick={() => { if (link.name === "Instagram") handleCopyLink(); }}
            >
              <div className="share-icon-wrap">
                <i className={link.icon}></i>
              </div>
              <span>{link.name}</span>
              {link.note && <small>{link.note}</small>}
            </a>
          ))}
        </div>

        <button className="copy-link-btn" onClick={handleCopyLink}>
          <i className="fa-solid fa-copy"></i> Copy Product Info
        </button>
      </div>
    </div>
  );
}