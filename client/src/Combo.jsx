// src/Combo.jsx
import React from "react";
import ProductCard from "./ProductCard";

import brownlavaImg    from "./assets/combo/brownlava.jpeg";
import coffeecrosImg   from "./assets/combo/coffeecros.jpg";
import cookiesshakeImg from "./assets/combo/cookiesshake.jpg";

const products = [
  { id: 701, img: brownlavaImg,    alt: "Brownie with Lava Cake",  title: "BROWNIE WITH LAVA CAKE",  price: 150 },
  { id: 702, img: coffeecrosImg,   alt: "Coffee with Croissant",   title: "COFFEE WITH CROISSANT",   price: 210 },
  { id: 703, img: cookiesshakeImg, alt: "Cookies with Milkshake",  title: "COOKIES WITH MILKSHAKE",  price: 100 },
];

export default function Combo() {
  return <ProductCard products={products} hasSizes={false} />;
}
