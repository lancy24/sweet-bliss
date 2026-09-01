// src/Cheesecake.jsx
import React from "react";
import ProductCard from "./ProductCard";

import japaneseImg from "./assets/cheesecake/japanese.jpg";
import baklavaImg from "./assets/cheesecake/baklava.jpg";
import mangoImg from "./assets/cheesecake/mango.jpg";
import biscoffImg from "./assets/cheesecake/biscoff.jpg";

const products = [
  { id: 101, img: japaneseImg, alt: "Japanese Cheesecake", title: "JAPANESE CHEESECAKE", sizes: [{weight:"500gm",price:599},{weight:"1kg",price:999} ] },
  { id: 102, img: baklavaImg, alt: "Baklava Cheesecake",  title: "BAKLAVA CHEESECAKE",  sizes: [{weight:"500gm",price:699},{weight:"1kg",price:1199} ] },
  { id: 103, img: mangoImg,   alt: "Mango Cheesecake",   title: "MANGO CHEESECAKE",   sizes: [{weight:"500gm",price:799},{weight:"1kg",price:1299} ]},
  { id: 104, img: biscoffImg, alt: "Biscoff Cheesecake", title: "BISCOFF CHEESECAKE",  sizes: [{weight:"500gm",price:750},{weight:"1kg",price:1399}] },
];
  
export default function Cheesecake() {
  return <ProductCard products={products} hasSizes={true} />;
}
