import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import LoadingScreen from "./LoadingScreen";
import Dashboard from "./Dashboard";
import BuildYourBox from "./BuildYourBox";
import CakeCard from "./CakeCard";
import Cheesecake from "./Cheesecake";
import Pastry from "./Pastry";
import Cupcake from "./Cupcake";
import Donuts from "./Donuts";
import Cookies from "./Cookies";
import Brownies from "./Brownies";
import Combo from "./Combo";
import Hampers from "./Hampers";
import CartPage from "./CartPage";
import Reviews from "./Reviews";
import SeeMoreReviews from "./SeeMoreReviews";
import Contact from "./Contact";
import FeaturesSection from "./FeaturesSection";
import Offers from "./Offers";
import AdminPanel from "./AdminPanel";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
// import OTPPage from "./OTPPage";

import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/build-box" element={<BuildYourBox />} />
          <Route path="/cakecard" element={<CakeCard />} />
          <Route path="/cheesecake" element={<Cheesecake />} />
          <Route path="/pastry" element={<Pastry />} />
          <Route path="/cupcakes" element={<Cupcake />} />
          <Route path="/donuts" element={<Donuts />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/brownies" element={<Brownies />} />
          <Route path="/combo" element={<Combo />} />
          <Route path="/hamper" element={<Hampers />} />
          <Route path="/hampers" element={<Hampers />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/see-more" element={<SeeMoreReviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<FeaturesSection />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about-us" element={<FeaturesSection />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/verify-otp" element={<OTPPage />} /> */}
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}