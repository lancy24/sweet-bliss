import { useState } from "react";
import { useCart } from "./CartContext";
import Navbar from "./Navbar";
import Discount from "./Discount";
import { useNavigate } from "react-router-dom";
import "./BuildYourBox.css";

const ITEMS = [
  { id: 1,  name: "Red Velvet Cake",        emoji: "🎂", price: 599 },
  { id: 2,  name: "Chocolate Truffle Cake", emoji: "🍫", price: 799 },
  { id: 3,  name: "Cupcake",               emoji: "🧁", price: 80  },
  { id: 4,  name: "Croissant",             emoji: "🥐", price: 90  },
  { id: 5,  name: "Cookies (6pc)",         emoji: "🍪", price: 120 },
  { id: 6,  name: "Brownie",               emoji: "🟫", price: 100 },
  { id: 7,  name: "Donut",                 emoji: "🍩", price: 60  },
  { id: 8,  name: "Cheesecake",            emoji: "🍰", price: 750 },
  { id: 9,  name: "Macarons (4pc)",        emoji: "🍬", price: 200 },
  { id: 10, name: "Choco Pastry",          emoji: "🥐", price: 60  },
  { id: 11, name: "Walnut Brownie",        emoji: "🍫", price: 95  },
  { id: 12, name: "Pista Cupcake",         emoji: "🧁", price: 75  },
];

const BOX_COLORS = [
  { hex: "#F4C0D1", name: "Pink" },
  { hex: "#B5D4F4", name: "Sky Blue" },
  { hex: "#9FE1CB", name: "Mint" },
  { hex: "#FAC775", name: "Gold" },
  { hex: "#CEC8F5", name: "Lavender" },
  { hex: "#F0997B", name: "Peach" },
  { hex: "#C0DD97", name: "Sage" },
  { hex: "#E8E6DC", name: "Ivory" },
];

const RIBBON_COLORS = [
  { hex: "#D4537E", name: "Rose" },
  { hex: "#378ADD", name: "Blue" },
  { hex: "#1D9E75", name: "Emerald" },
  { hex: "#BA7517", name: "Gold" },
  { hex: "#7F77DD", name: "Purple" },
  { hex: "#D85A30", name: "Coral" },
  { hex: "#333333", name: "Black" },
  { hex: "#E24B4A", name: "Red" },
];

const BOX_FEE = 50;
const GIFT_CARD_FEE = 30;
const MAX_ITEMS = 4;
const WHATSAPP_NUMBER = "917717581243";

// Gift box SVG for cart image
const GIFT_BOX_SVG_URL = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="65" width="100" height="65" rx="4" fill="#F4C0D1"/>
  <rect x="16" y="50" width="108" height="22" rx="4" fill="#D4537Ebb"/>
  <rect x="63" y="50" width="14" height="80" rx="2" fill="#D4537E" opacity="0.75"/>
  <rect x="16" y="55" width="108" height="12" rx="2" fill="#D4537E" opacity="0.75"/>
  <ellipse cx="56" cy="50" rx="14" ry="8" fill="#D4537E" opacity="0.9"/>
  <ellipse cx="84" cy="50" rx="14" ry="8" fill="#D4537E" opacity="0.9"/>
  <circle cx="70" cy="50" r="7" fill="#D4537E"/>
  <text x="70" y="104" text-anchor="middle" font-size="28">🎁</text>
</svg>`)}`;

function GiftBoxSVG({ boxColor, ribbonColor, topEmoji }) {
  const lid = ribbonColor + "bb";
  return (
    <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" className="gift-box-svg">
      <rect x="20" y="65" width="100" height="65" rx="4" fill={boxColor} />
      <rect x="16" y="50" width="108" height="22" rx="4" fill={lid} />
      <rect x="63" y="50" width="14" height="80" rx="2" fill={ribbonColor} opacity="0.75" />
      <rect x="16" y="55" width="108" height="12" rx="2" fill={ribbonColor} opacity="0.75" />
      <ellipse cx="56" cy="50" rx="14" ry="8" fill={ribbonColor} opacity="0.9" />
      <ellipse cx="84" cy="50" rx="14" ry="8" fill={ribbonColor} opacity="0.9" />
      <circle cx="70" cy="50" r="7" fill={ribbonColor} />
      <text x="70" y="104" textAnchor="middle" fontSize="28">{topEmoji}</text>
    </svg>
  );
}

export default function BuildYourBox() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [boxColor, setBoxColor] = useState(BOX_COLORS[0]);
  const [ribbonColor, setRibbonColor] = useState(RIBBON_COLORS[0]);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [giftCard, setGiftCard] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [toast, setToast] = useState("");

  const itemsTotal = selectedItems.reduce((sum, id) => {
    const item = ITEMS.find((i) => i.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const basePrice = itemsTotal + BOX_FEE + (giftCard ? GIFT_CARD_FEE : 0);
  const totalPrice = basePrice * qty;

  const topEmoji = selectedItems.length > 0
    ? ITEMS.find((i) => i.id === selectedItems[selectedItems.length - 1])?.emoji
    : "🎁";

  function toggleItem(id) {
    setSelectedItems((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_ITEMS) { showToast(`Max ${MAX_ITEMS} items allowed!`); return prev; }
      return [...prev, id];
    });
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function handleAddToCart() {
    if (selectedItems.length === 0) { showToast("Please select at least 1 item!"); return; }
    const itemNames = selectedItems.map((id) => ITEMS.find((i) => i.id === id)?.name).join(", ");
    const boxName = `🎁 Gift Box (${boxColor.name} / ${ribbonColor.name} ribbon)`;
    addToCart({
      id: `box-${Date.now()}`,
      name: boxName,
      price: totalPrice,
      quantity: 1,
      image: GIFT_BOX_SVG_URL,
      size: null,
      note: `Items: ${itemNames}${giftCard ? ` | Gift Card: "${giftMessage}"` : ""}${note ? ` | Note: ${note}` : ""}`,
    });
    showToast("🎁 Gift box added to cart!");
    setSelectedItems([]);
    setNote("");
    setGiftMessage("");
    setGiftCard(false);
  }

  function handleWhatsApp() {
    if (selectedItems.length === 0) return;
    const itemNames = selectedItems.map((id) => ITEMS.find((i) => i.id === id)?.name).join(", ");
    const msg =
      `Hello! I'd like to place a custom bakery box order 🎁\n\n` +
      `*Items:* ${itemNames}\n` +
      `*Box Color:* ${boxColor.name}\n` +
      `*Ribbon:* ${ribbonColor.name}\n` +
      `*Quantity:* ${qty} box(es)\n` +
      (giftCard ? `*Gift Card Message:* "${giftMessage}"\n` : "") +
      `*Total:* ₹${totalPrice.toLocaleString("en-IN")}\n` +
      (note ? `*Special Note:* ${note}\n` : "") +
      `\nPlease confirm availability. Thank you! 😊`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <div style={{ paddingTop: "88px" }}>
      <Discount />
      <Navbar onHomeClick={() => navigate("/")} darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <div className="byb-page">
        <div className="byb-container">
          <div className="byb-header">
            <h1>🎁 Build Your Own Gift Box</h1>
            <p>Pick your treats, customize the look, and order in one tap!</p>
          </div>

          <div className="byb-grid">
            {/* LEFT */}
            <div className="byb-options">
              <span className="byb-label">Choose items (up to {MAX_ITEMS})</span>
              <div className="byb-item-grid">
                {ITEMS.map((item) => {
                  const selected = selectedItems.includes(item.id);
                  return (
                    <button key={item.id} className={`byb-item-btn ${selected ? "selected" : ""}`} onClick={() => toggleItem(item.id)}>
                      <span className="byb-item-emoji">{item.emoji}</span>
                      <span className="byb-item-name">{item.name}</span>
                      <span className="byb-item-price">₹{item.price}</span>
                    </button>
                  );
                })}
              </div>

              <span className="byb-label">Box color</span>
              <div className="byb-color-row">
                {BOX_COLORS.map((c) => (
                  <div key={c.hex} className={`byb-color-dot ${boxColor.hex === c.hex ? "selected" : ""}`} style={{ background: c.hex }} title={c.name} onClick={() => setBoxColor(c)} />
                ))}
              </div>

              <span className="byb-label">Ribbon color</span>
              <div className="byb-color-row">
                {RIBBON_COLORS.map((c) => (
                  <div key={c.hex} className={`byb-color-dot ${ribbonColor.hex === c.hex ? "selected" : ""}`} style={{ background: c.hex }} title={c.name} onClick={() => setRibbonColor(c)} />
                ))}
              </div>

              {/* Gift Card Option */}
              <div className="byb-giftcard-section">
                <label className="byb-giftcard-toggle">
                  <input type="checkbox" checked={giftCard} onChange={(e) => setGiftCard(e.target.checked)} />
                  <span>Add a Gift Card 💌 <small>(+₹{GIFT_CARD_FEE})</small></span>
                </label>
                {giftCard && (
                  <textarea
                    className="byb-note"
                    rows={2}
                    placeholder="Write your gift message here... e.g. Happy Birthday! 🎉"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    style={{ marginTop: "8px" }}
                  />
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="byb-right">
              <span className="byb-label">Live preview</span>
              <div className="byb-preview">
                <GiftBoxSVG boxColor={boxColor.hex} ribbonColor={ribbonColor.hex} topEmoji={topEmoji} />
                <div className="byb-tags">
                  {selectedItems.length === 0 ? (
                    <span className="byb-empty-tag">No items selected yet</span>
                  ) : (
                    selectedItems.map((id) => {
                      const item = ITEMS.find((i) => i.id === id);
                      return <span key={id} className="byb-tag">{item.emoji} {item.name}</span>;
                    })
                  )}
                  {giftCard && <span className="byb-tag byb-tag-card">💌 Gift Card</span>}
                </div>
              </div>

              <div className="byb-summary">
                <div className="byb-price-row">
                  <span>Estimated total</span>
                  <span className="byb-total">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="byb-breakdown">
                  <small>
                    Items: ₹{itemsTotal} + Box: ₹{BOX_FEE}
                    {giftCard ? ` + Gift Card: ₹${GIFT_CARD_FEE}` : ""}
                    {qty > 1 ? ` × ${qty} boxes` : ""}
                  </small>
                </div>

                <div className="byb-qty-row">
                  <span>Boxes:</span>
                  <button className="byb-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span className="byb-qty-num">{qty}</span>
                  <button className="byb-qty-btn" onClick={() => setQty(q => Math.min(20, q + 1))}>+</button>
                </div>

                <textarea
                  className="byb-note"
                  rows={2}
                  placeholder="Special instructions (e.g. no nuts, delivery time...)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />

                <button className={`byb-cart-btn ${selectedItems.length === 0 ? "disabled" : ""}`} disabled={selectedItems.length === 0} onClick={handleAddToCart}>
                  🛒 Add to Cart — ₹{totalPrice.toLocaleString("en-IN")}
                </button>

                <button className={`byb-wa-btn ${selectedItems.length === 0 ? "disabled" : ""}`} disabled={selectedItems.length === 0} onClick={handleWhatsApp}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.847L.057 23.077a.75.75 0 00.921.921l5.23-1.465A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-5.011-1.392l-.36-.214-3.733 1.046 1.003-3.625-.234-.373A9.713 9.713 0 012.25 12c0-5.376 4.374-9.75 9.75-9.75s9.75 4.374 9.75 9.75-4.374 9.75-9.75 9.75z"/>
                  </svg>
                  Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className="byb-toast">{toast}</div>}
    </div>
  );
}
