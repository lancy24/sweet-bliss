import React from 'react';
import './Bestsellers.css';

import truffle from './assets/truffle.jpg';
import cake7 from './assets/cake7.jpeg';
import cake5 from './assets/cake5.jpeg';

const Bestsellers = () => {
  return (

    <section className="bestsellers">
        
      <h2 className="bestsellers-heading"  data-aos="flip-left" data-aos-duration="1000"> Our Bestsellers🍰</h2>

      <div className="bestseller-row" data-aos="flip-right" data-aos-duration="1000">
        <div className="bestseller-card">
          <img src={truffle} alt="Chocolate Truffle Cake" />
          <p>Chocolate Truffle Cake</p>
        </div>

        <div className="bestseller-card">
          <img src={cake7} alt="Chocolate Brownies" />
          <p>Chocolate Brownies</p>
        </div>

        <div className="bestseller-card">
          <img src={cake5} alt="Donuts" />
          <p>Donuts</p>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
