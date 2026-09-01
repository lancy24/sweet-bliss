import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
const BASE_URL = "https://sweet-bliss-ja4h.onrender.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("blissfulUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(
     `${BASE_URL}/api/auth/login`,
      { email, password }
    );
    const userData = response.data;
    setUser(userData);
    localStorage.setItem("blissfulUser", JSON.stringify(userData));
    window.dispatchEvent(new Event("storage"));
    return userData;
  };

  const register = async (name, email, password) => {
    const response = await axios.post(
      `${BASE_URL}/api/auth/register`,
      { name, email, password }
    );
    const userData = response.data;
    setUser(userData);
    localStorage.setItem("blissfulUser", JSON.stringify(userData));
    window.dispatchEvent(new Event("storage"));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("blissfulUser");
    window.dispatchEvent(new Event("storage"));
  };

  const saveCartToDB = async (cartItems) => {
    if (!user) return;
    try {
      await axios.put(
        `${BASE_URL}/api/auth/save-cart`,
        { cart: cartItems },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const { displayName, email } = result.user;
    const response = await axios.post(
      `${BASE_URL}/api/auth/google`,
      { name: displayName, email }
    );
    const userData = response.data;
    setUser(userData);
    localStorage.setItem("blissfulUser", JSON.stringify(userData));
    window.dispatchEvent(new Event("storage"));
    return userData;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, saveCartToDB, loading, googleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}