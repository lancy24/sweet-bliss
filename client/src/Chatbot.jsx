import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const AUTO_REPLIES = {
  // Greetings
  "hello": "Hello! Welcome to Blissful Bites 🧁 How can I help you today?",
  "hi": "Hi there! 😊 Welcome to Blissful Bites! What can I help you with?",
  "hey": "Hey! Welcome to Blissful Bites 🎂 How can I assist you?",

  // Products
  "cake": "We have amazing cakes! 🎂 Red Velvet, Chocolate, Butterscotch, Vanilla and more! Visit our Cakes page to order.",
  "cakes": "We have amazing cakes! 🎂 Red Velvet, Chocolate, Butterscotch, Vanilla and more! Visit our Cakes page to order.",
  "cupcake": "Our cupcakes are delicious! 🧁 We have Oreo, Nutella, Pista, Tiramisu and more!",
  "cupcakes": "Our cupcakes are delicious! 🧁 We have Oreo, Nutella, Pista, Tiramisu and more!",
  "pastry": "Fresh pastries daily! 🥐 Choco, Pineapple, Mango, Rasmalai and more!",
  "pastries": "Fresh pastries daily! 🥐 Choco, Pineapple, Mango, Rasmalai and more!",
  "cookie": "Crunchy and fresh cookies! 🍪 Choco Chip, Butter, Almond, Coconut and more!",
  "cookies": "Crunchy and fresh cookies! 🍪 Choco Chip, Butter, Almond, Coconut and more!",
  "brownie": "Fudgy brownies! 🍫 Caramel, Walnut, Cheesecake and more!",
  "brownies": "Fudgy brownies! 🍫 Caramel, Walnut, Cheesecake and more!",
  "donut": "Fresh donuts! 🍩 Glazed, Jelly Filled, Boston Cream and more!",
  "donuts": "Fresh donuts! 🍩 Glazed, Jelly Filled, Boston Cream and more!",
  "cheesecake": "Creamy cheesecakes! 🍰 Japanese, Baklava, Mango, Biscoff and more!",

  // Pricing
  "price": "Our prices start from ₹30 for pastries and go up to ₹1700 for premium cheesecakes! Check our menu for detailed pricing 😊",
  "prices": "Our prices start from ₹30 for pastries and go up to ₹1700 for premium cheesecakes! Check our menu for detailed pricing 😊",
  "cost": "Our prices are very affordable! Starting from ₹30. Check the menu for all prices 🎂",
  "cheap": "We have options starting from just ₹30! Very affordable 😊",
  "expensive": "We have options for every budget! From ₹30 to ₹1700. Check our menu!",

  // Orders
  "order": "To place an order: browse our menu → add to cart → checkout → fill delivery details → pay! Simple and easy 🛒",
  "ordering": "To place an order: browse our menu → add to cart → checkout → fill delivery details → pay! Simple and easy 🛒",
  "how to order": "Browse our menu → add items to cart → click checkout → fill your address → choose payment → done! 🎉",
  "cart": "You can add items to cart from any product page! Click the cart button to view your items 🛒",

  // Delivery
  "delivery": "We deliver fresh to your doorstep! 🚚 Delivery time is 2-3 hours after order confirmation.",
  "deliver": "We deliver fresh to your doorstep! 🚚 Delivery time is 2-3 hours after order confirmation.",
  "shipping": "We deliver fresh to your doorstep! 🚚 Delivery time is 2-3 hours after order confirmation.",
  "time": "Delivery takes 2-3 hours after order confirmation. We ensure freshness! 🎂",

  // Payment
  "payment": "We accept Credit Card, UPI, Net Banking and Cash on Delivery! 💳",
  "pay": "We accept Credit Card, UPI, Net Banking and Cash on Delivery! 💳",
  "upi": "Yes we accept UPI payments! 📱 Easy and instant!",
  "cash": "Yes we accept Cash on Delivery! 💵 Pay when you receive!",
  "cod": "Yes we accept Cash on Delivery! 💵 Pay when you receive!",

  // Discount
  "discount": "🎉 Get 20% OFF on orders above ₹700! Add more items to your cart to unlock the discount!",
  "offer": "🎉 Get 20% OFF on orders above ₹700! Also check our Offers page for more deals!",
  "offers": "🎉 Get 20% OFF on orders above ₹700! Also check our Offers page for more deals!",
  "coupon": "We have automatic 20% discount on orders above ₹700! No coupon needed 🎉",

  // Contact
  "contact": "You can reach us on our Contact page! We're always happy to help 📞",
  "phone": "Please visit our Contact page for our phone number and address 📞",
  "address": "Please visit our Contact page for our full address and location 📍",
  "location": "Please visit our Contact page for our location and map 📍",

  // Account
  "login": "You can login from the Login button in the navbar! 🔐",
  "signup": "Create your account from the Sign Up button in the navbar! 🎉",
  "account": "You can create an account or login from the navbar buttons! 🔐",

  // Reviews
  "review": "We love feedback! You can see customer reviews on our Reviews page 💕",
  "reviews": "We love feedback! You can see customer reviews on our Reviews page 💕",

  // Goodbye
  "bye": "Goodbye! Thank you for visiting Blissful Bites 🧁 Have a sweet day!",
  "goodbye": "Goodbye! Thank you for visiting Blissful Bites 🧁 Have a sweet day!",
  "thank you": "You're welcome! 😊 Enjoy your treats from Blissful Bites 🧁",
  "thanks": "You're welcome! 😊 Happy to help! Enjoy your order 🎂",
};

const getAutoReply = (message) => {
  const lower = message.toLowerCase().trim();

  // Check exact matches first
  if (AUTO_REPLIES[lower]) return AUTO_REPLIES[lower];

  // Check if message contains any keyword
  for (const keyword of Object.keys(AUTO_REPLIES)) {
    if (lower.includes(keyword)) {
      return AUTO_REPLIES[keyword];
    }
  }

  // Default reply
  return "I'm not sure about that 😊 Please contact us on our Contact page or ask about our cakes, prices, delivery, or orders!";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! Welcome to Blissful Bites 🧁 I'm your sweet assistant! Ask me about our cakes, prices, delivery or orders!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botReply = { from: "bot", text: getAutoReply(input) };

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-wrapper">
      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>🧁 Blissful Bites Assistant</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from}`}>
                {msg.from === "bot" && <span className="bot-avatar">🧁</span>}
                <div className="msg-bubble">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "🧁"}
      </button>
    </div>
  );
}