// src/Pastry.jsx
import React from "react";
import ProductCard from "./ProductCard";

import chocoImg      from "./assets/pastry/choco.jpg";
import pineappleImg  from "./assets/pastry/pineapple.jpg";
import puffImg       from "./assets/pastry/puff.jpg";
import croissantImg  from "./assets/pastry/croissants.jpg";
import blackforestImg from "./assets/pastry/blackforest.jpg";
import truffleImg    from "./assets/pastry/truffle.jpg";
import mangoImg      from "./assets/pastry/mango.jpg";
import rasmalaiImg   from "./assets/pastry/rasmalai.jpg";

const products = [
  { id: 201, img: chocoImg,       alt: "Choco Pastry",        title: "CHOCO PASTRY",        price: 60  },
  { id: 202, img: pineappleImg,   alt: "Pineapple Pastry",    title: "PINEAPPLE PASTRY",    price: 40  },
  { id: 203, img: puffImg,        alt: "Puff Pastry",         title: "PUFF PASTRY",         price: 60  },
  { id: 204, img: croissantImg,   alt: "Croissants",          title: "CROISSANTS",          price: 90  },
  { id: 205, img: blackforestImg, alt: "Black Forest Pastry", title: "BLACK FOREST PASTRY", price: 40  },
  { id: 206, img: truffleImg,     alt: "Truffle Pastry",      title: "TRUFFLE PASTRY",      price: 100 },
  { id: 207, img: mangoImg,       alt: "Mango Pastry",        title: "MANGO PASTRY",        price: 30  },
  { id: 208, img: rasmalaiImg,    alt: "Rasmalai Pastry",     title: "RASMALAI PASTRY",     price: 100 },
];

export default function Pastry() {
  return <ProductCard products={products} hasSizes={false} />;
}
