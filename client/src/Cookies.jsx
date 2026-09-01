// src/Cookies.jsx
import React from "react";
import ProductCard from "./ProductCard";

import choco   from "./assets/cookies/choco.jpg";
import naan    from "./assets/cookies/naan.jpg";
import butter  from "./assets/cookies/butter.jpg";
import almond  from "./assets/cookies/almond.jpg";
import hazelnut from "./assets/cookies/hazelnut.jpg";
import coconut from "./assets/cookies/CoConut.jpg";

const products = [
  { id: 501, img: choco,    alt: "Choco Chip Cookies", title: "CHOCO CHIP COOKIES", price: 80  },
  { id: 502, img: naan,     alt: "Naan Khatai",        title: "NAAN KHATAI",        price: 70  },
  { id: 503, img: butter,   alt: "Butter Cookies",     title: "BUTTER COOKIES",     price: 60  },
  { id: 504, img: almond,   alt: "Almond Cookies",     title: "ALMOND COOKIES",     price: 90  },
  { id: 505, img: hazelnut, alt: "Hazelnut Cookies",   title: "HAZELNUT COOKIES",   price: 100 },
  { id: 506, img: coconut,  alt: "Coconut Cookies",    title: "COCONUT COOKIES",    price: 85  },
];

export default function Cookies() {
  return <ProductCard products={products} hasSizes={false} />;
}
