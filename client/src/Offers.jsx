import React from "react";
import "./Offers.css"; 

const Offers = () => {
  return (
    <div className="offer-container">
      <div id="offers" data-aos="flip-right" data-aos-duration="1000">
        <h1>🥳Sweet Deals That Rise Above👉🏻</h1>
      </div>
      <br />

      <div className="offer-card" data-aos="fade-down-right">
        <h2>Buy 1 Get 1 Free!</h2>
        <p className="content">On all cupcakes, today only.🧁</p>
        <button>Order Now</button>
      </div>

      <div className="offer-card" data-aos="fade-down-right">
        <h2>20% Off</h2>
        <p className="content">On all custom birthday cakes!🎂</p>
        <small>
          Use code: <strong>BDAY20</strong>
        </small>
        <button>Customize</button>
      </div>

      <div className="offer-card" data-aos="fade-down-right">
        <h2>₹100 Off</h2>
        <p className="content">On your first order over ₹499</p>
        <button>Claim Offer</button>
      </div>

      <div className="offer-card" data-aos="fade-down-right">
        <h2>Morning Treat!</h2>
        <p className="content">Free coffee with any pastry till 11 AM🍰</p>
        <button>View Menu</button>
      </div>

      <div className="offer-card" data-aos="fade-down-right">
        <h2>Festive Combo</h2>
        <p className="content">Get a cookie box free with every hamper!</p>
        <button>Explore Hampers</button>
      </div>
      
    </div>
        
  );
};

export default Offers;
