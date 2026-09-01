// src/CartPage.jsx
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { placeOrder } from "./api/productApi";
import "./CartPage.css";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, totalItems, clearCart } = useCart();

  const [step, setStep] = useState("cart"); // cart → address → payment → confirmed
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const safeCartItems = cartItems || [];
  const safeCartTotal = cartTotal || 0;
  const safeTotalItems = totalItems || 0;
  const discount = safeCartTotal > 700 ? safeCartTotal * 0.2 : 0;
  const finalTotal = safeCartTotal - discount;

  // ── Form validation ─────────────────────────
  const validateForm = () => {
    const errors = {};
    if (!form.customerName.trim()) errors.customerName = "Name is required";
    if (!form.phone.trim() || form.phone.length < 10) errors.phone = "Valid phone number required";
    if (!form.address.trim()) errors.address = "Address is required";
    if (!form.city.trim()) errors.city = "City is required";
    if (!form.pincode.trim() || form.pincode.length < 6) errors.pincode = "Valid pincode required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  // ── Place order ─────────────────────────────
  const handlePayment = async (paymentMethod) => {
    setLoading(true);
    try {
      const orderData = {
        customerName: form.customerName,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
        paymentMethod,
        orderItems: safeCartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          size: item.size || "",
          image: item.image || "",
        })),
        totalPrice: safeCartTotal,
        discount,
        finalPrice: finalTotal,
      };

      const savedOrder = await placeOrder(orderData);
      setOrderDetails(savedOrder);
      clearCart();
      setStep("confirmed");
    } catch (error) {
      alert("Something went wrong! Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ── EMPTY CART ──────────────────────────────
  if (safeCartItems.length === 0 && step !== "confirmed") {
    return (
      <div className="cart-page">
        <h2>🛍️ Your Sweet Bliss Cart</h2>
        <p className="empty-cart-message">
          Your cart is currently empty. Go treat yourself to some sweets! 🎂
        </p>
      </div>
    );
  }

  // ── STEP 1: CART ────────────────────────────
  if (step === "cart") {
    return (
      <div className="cart-page">
        <h2>🛍️ Your Sweet Bliss Cart ({safeTotalItems} items)</h2>

        <div className="cart-items-list">
          {safeCartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="item-details">
                <h4>{item.name}</h4>
                {item.size && <p className="item-size">Size: {item.size}</p>}
                <p>Price: ₹{item.price.toFixed(2)}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="remove-button">
                🗑️ Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p>Subtotal: <b>₹{safeCartTotal.toFixed(2)}</b></p>
          {discount > 0 && (
            <p className="discount-line">
              🎉 20% Discount: <b>-₹{discount.toFixed(2)}</b>
            </p>
          )}
          <p className="final-total">Final Total: <b>₹{finalTotal.toFixed(2)}</b></p>
          {safeCartTotal > 700 && (
            <p className="discount-note">🎉 You saved ₹{discount.toFixed(2)} on this order!</p>
          )}
          <button
            className="checkout-button"
            onClick={() => setStep("address")}
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    );
  }

  // ── STEP 2: ADDRESS FORM ────────────────────
  if (step === "address") {
    return (
      <div className="cart-page">
        <h2>📦 Delivery Details</h2>

        <div className="address-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="customerName"
              placeholder="Enter your full name"
              value={form.customerName}
              onChange={handleFormChange}
            />
            {formErrors.customerName && <span className="error">{formErrors.customerName}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter 10 digit phone number"
              value={form.phone}
              onChange={handleFormChange}
              maxLength={10}
            />
            {formErrors.phone && <span className="error">{formErrors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Delivery Address</label>
            <textarea
              name="address"
              placeholder="House no, Street, Area"
              value={form.address}
              onChange={handleFormChange}
              rows={3}
            />
            {formErrors.address && <span className="error">{formErrors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleFormChange}
              />
              {formErrors.city && <span className="error">{formErrors.city}</span>}
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="6 digit pincode"
                value={form.pincode}
                onChange={handleFormChange}
                maxLength={6}
              />
              {formErrors.pincode && <span className="error">{formErrors.pincode}</span>}
            </div>
          </div>

          <div className="order-total-preview">
            <p>Total Items: <b>{safeTotalItems}</b></p>
            <p>Final Amount: <b>₹{finalTotal.toFixed(2)}</b></p>
            {discount > 0 && <p className="discount-line">🎉 Discount Applied: -₹{discount.toFixed(2)}</p>}
          </div>

          <div className="form-buttons">
            <button className="back-button" onClick={() => setStep("cart")}>
              ← Back to Cart
            </button>
            <button
              className="checkout-button"
              onClick={() => {
                if (validateForm()) setStep("payment");
              }}
            >
              Continue to Payment →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 3: PAYMENT ─────────────────────────
  if (step === "payment") {
    return (
      <div className="cart-page">
        <h2>💳 Payment</h2>

        <div className="payment-summary">
          <h3>Delivering to</h3>
          <p>{form.customerName} | {form.phone}</p>
          <p>{form.address}, {form.city} - {form.pincode}</p>
        </div>

        <div className="payment-popup">
          <p className="amount-line">
            Subtotal: <b>₹{safeCartTotal.toFixed(2)}</b>
          </p>
          {discount > 0 && (
            <p className="discount-line">
              🎉 20% OFF: <b>-₹{discount.toFixed(2)}</b>
            </p>
          )}
          <p className="final-amount">
            Final Amount: <b>₹{finalTotal.toFixed(2)}</b>
          </p>

          <div className="payment-buttons">
            <button
              className="pay-btn"
              onClick={() => handlePayment("Credit Card")}
              disabled={loading}
            >
              💳 Pay with Credit Card
            </button>
            <button
              className="pay-btn"
              onClick={() => handlePayment("UPI")}
              disabled={loading}
            >
              📱 Pay with UPI
            </button>
            <button
              className="pay-btn"
              onClick={() => handlePayment("Net Banking")}
              disabled={loading}
            >
              🏦 Pay with Net Banking
            </button>
            <button
              className="pay-btn"
              onClick={() => handlePayment("Cash on Delivery")}
              disabled={loading}
            >
              💵 Cash on Delivery
            </button>
          </div>

          {loading && <p style={{ textAlign: "center", marginTop: "12px" }}>Placing your order... 🎂</p>}

          <button
            className="back-button"
            onClick={() => setStep("address")}
            disabled={loading}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // ── STEP 4: ORDER CONFIRMED ─────────────────
  if (step === "confirmed") {
    return (
      <div className="cart-page">
        <div className="order-confirmed">
          <div className="confirmed-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p className="confirmed-sub">Thank you for your order, <b>{orderDetails?.customerName}</b>! 🧁</p>

          <div className="order-receipt">
            <h3>Order Receipt</h3>
            <p>Order ID: <b>#{orderDetails?._id?.slice(-8).toUpperCase()}</b></p>
            <p>Payment: <b>{orderDetails?.paymentMethod}</b></p>
            <p>Delivering to: <b>{orderDetails?.address}, {orderDetails?.city}</b></p>

            <div className="receipt-items">
              {orderDetails?.orderItems?.map((item, i) => (
                <div key={i} className="receipt-item">
                  <span>{item.name} {item.size ? `(${item.size})` : ""}</span>
                  <span>×{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {orderDetails?.discount > 0 && (
              <p className="discount-line">🎉 Discount: -₹{orderDetails?.discount?.toFixed(2)}</p>
            )}
            <p className="final-total">
              Amount Paid: <b>₹{orderDetails?.finalPrice?.toFixed(2)}</b>
            </p>
          </div>

          <button
            className="checkout-button"
            onClick={() => window.location.href = "/"}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    );
  }
}

export default CartPage;