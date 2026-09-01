// src/Brownies.jsx
import React from "react";
import ProductCard from "./ProductCard";

import caramelImg from "./assets/brownies/caramel.jpg";
import cheseImg   from "./assets/brownies/chese.jpg";
import chocImg    from "./assets/brownies/choc.jpg";
import millionImg from "./assets/brownies/million.jpg";
import walnutImg  from "./assets/brownies/walnut.jpg";
import whiteImg   from "./assets/brownies/white.jpg";

const products = [
  { id: 601, img: caramelImg, alt: "Caramel Brownie",            title: "CARAMEL BROWNIE",              price: 140 },
  { id: 602, img: cheseImg,   alt: "Cheesecake Brownie",         title: "CHEESE CAKE BROWNIE",          price: 110 },
  { id: 603, img: chocImg,    alt: "Chocolate Brownie",          title: "CHOCOLATE BROWNIE",            price: 100 },
  { id: 604, img: millionImg, alt: "Millionaire Brownie",        title: "MILLIONAIRE BROWNIE",          price: 50  },
  { id: 605, img: walnutImg,  alt: "Walnut Brownie",             title: "WALNUT BROWNIE",               price: 95  },
  { id: 606, img: whiteImg,   alt: "White Chocolate Brownie",    title: "WHITE CHOCOLATE CHIPS BROWNIE", price: 100 },
];

export default function Brownies() {
  return <ProductCard products={products} hasSizes={false} />;
}
