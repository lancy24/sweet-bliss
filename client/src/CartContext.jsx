import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Save cart to DB
  const saveCartToDB = async (items) => {
    const savedUser = localStorage.getItem("blissfulUser");
    if (!savedUser) return;
    const user = JSON.parse(savedUser);
    try {
      await axios.put(
        "http://localhost:5000/api/auth/save-cart",
        { cart: items },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  };

  // Load cart from DB
  const loadCartFromDB = async () => {
    const savedUser = localStorage.getItem("blissfulUser");
    if (!savedUser) {
      setCartItems([]);
      return;
    }
    const user = JSON.parse(savedUser);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/me",
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (response.data.savedCart?.length > 0) {
        setCartItems(
          response.data.savedCart.map((item) => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            size: item.size,
            quantity: item.quantity,
          }))
        );
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCartItems([]);
    }
  };

  // Load cart on app start
  useEffect(() => {
    loadCartFromDB();
  }, []);

  // Watch for login/logout changes
  useEffect(() => {
    const handleStorageChange = () => {
      loadCartFromDB();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addToCart = (item) => {
    const existing = cartItems.find((i) => i.id === item.id);
    let updatedCart;
    if (existing) {
      updatedCart = cartItems.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      updatedCart = [...cartItems, { ...item }];
    }
    setCartItems(updatedCart);
    saveCartToDB(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    saveCartToDB(updatedCart);
  };

  const updateQuantity = (id, qty) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
    );
    setCartItems(updatedCart);
    saveCartToDB(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartToDB([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        cartTotal,
        loadCartFromDB,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}