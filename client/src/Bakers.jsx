import React from 'react';
import baker1 from './assets/baker1.jpg';
import baker2 from './assets/baker2.jpg';
import './Bakers.css';

const Bakers = () => {
  return (
    <div className="bakers">
      <h1>Lead Bakers & Dough Designer</h1>
      <div className="bakerimg">
        <div className="bakerone">
          <img src={baker1} alt="Ms. Palak Grover" />
          <p className="captionn">
            Ms. Palak Grover
            <br />
            (Diploma in Bakery & Confectionery)
          </p>
        </div>
        <div className="bakertwo">
          <img src={baker2} alt="Mr. Kunal Sharma" />
          <p className="captionn">
            Mr. Kunal Sharma
            <br />
            (Eggless Baking Entrepreneur Course)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bakers;
