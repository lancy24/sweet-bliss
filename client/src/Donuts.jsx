// src/Donuts.jsx
import React from "react";
import ProductCard from "./ProductCard";

import glazedImg from "./assets/donuts/glazed.jpg";
import jellyImg  from "./assets/donuts/jelly.jpg";
import bostonImg from "./assets/donuts/BOSTON.jpg";
import bagelsImg from "./assets/donuts/bagles.jpg";

const products = [
  { id: 401, img: glazedImg, alt: "Glazed Donut",       title: "GLAZED DONUT",       price: 50 },
  { id: 402, img: jellyImg,  alt: "Jelly Filled Donut", title: "JELLY FILLED DONUT", price: 60 },
  { id: 403, img: bostonImg, alt: "Boston Cream Donut", title: "BOSTON CREAM DONUT", price: 70 },
  { id: 404, img: bagelsImg, alt: "Bagels",             title: "BAGELS",             price: 55 },
];

export default function Donuts() {
  return <ProductCard products={products} hasSizes={false} />;
}
