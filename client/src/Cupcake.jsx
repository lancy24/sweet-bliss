// src/Cupcake.jsx
import React from "react";
import ProductCard from "./ProductCard";

import oreoImg     from "./assets/cupcakes/oreo.jpg";
import butterImg   from "./assets/cupcakes/butter.jpg";
import nutelImg    from "./assets/cupcakes/nutel.jpg";
import pistaImg    from "./assets/cupcakes/pista.jpg";
import tiramisuImg from "./assets/cupcakes/tiramisu.jpg";
import muffinsImg  from "./assets/cupcakes/muffins.jpg";

const products = [
  { id: 301, img: oreoImg,     alt: "Oreo Cupcake",          title: "OREO CUPCAKE",          price: 60 },
  { id: 302, img: butterImg,   alt: "Peanut Butter Cupcake", title: "PEANUT BUTTER CUPCAKE", price: 70 },
  { id: 303, img: nutelImg,    alt: "Nutella Cupcake",       title: "NUTELLA CUPCAKE",       price: 80 },
  { id: 304, img: pistaImg,    alt: "Pista Cupcake",         title: "PISTA CUPCAKE",         price: 75 },
  { id: 305, img: tiramisuImg, alt: "Tiramisu Cupcake",      title: "TIRAMISU CUPCAKE",      price: 90 },
  { id: 306, img: muffinsImg,  alt: "Muffins",               title: "MUFFINS",               price: 50 },
];

export default function Cupcake() {
  return <ProductCard products={products} hasSizes={false} />;
}
