import React from "react";
import CakeCard from "./CakeCard";
import "./Gallery.css";

const cakes = [
  { name: "BLUEBERRY CAKE", image: "practical lancy/blueberry.jpg", price: 349 },
  { name: "WEDDING CAKE", image: "practical lancy/wedding.jpg", price: 11999 },
  { name: "BUTTERSCOTCH CAKE", image: "practical lancy/butterscoth.jpg", price: 399 },
  { name: "CHOCOLATE CAKE", image: "practical lancy/choc.jpg", price: 499 },
  { name: "CHOCO LAVA CAKE", image: "practical lancy/choco lava.jpg", price: 149 },
  { name: "FRUIT CAKE", image: "practical lancy/fruit cake.jpg", price: 3999 },
  { name: "RED VELVET CAKE", image: "practical lancy/red velvet.jpg", price: 599 },
  { name: "STRAWBERRY CAKE", image: "practical lancy/strawbeery.jpg", price: 649 },
  { name: "TRUFFLE CAKE", image: "practical lancy/truffle.jpg", price: 799 },
  { name: "VANILLA CAKE", image: "practical lancy/bday.jpg", price: 699 },
];

const Gallery = () => (
  <div className="images-container">
    {cakes.map((cake, idx) => (
      <CakeCard key={idx} {...cake} />
    ))}
  </div>
);

export default Gallery;