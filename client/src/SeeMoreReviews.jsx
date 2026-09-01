import React from "react";
import "./SeeMoreReviews.css"; // <-- your CSS file

const reviews = [
  { name: "Aarav Sharma", review: "The chocolate croissants are heavenly! Fresh and flaky every time.", rating: 5 },
  { name: "Priya Kapoor", review: "Loved the red velvet cupcakes, moist and perfectly sweet.", rating: 4 },
  { name: "Rohan Mehta", review: "The sourdough bread is the best in town. Great crust and flavor.", rating: 5 },
  { name: "Simran Gill", review: "Their blueberry muffins are bursting with flavor. Highly recommend!", rating: 4 },
  { name: "Kabir Singh", review: "Amazing customer service and the pastries are always fresh.", rating: 5 },
  { name: "Ananya Verma", review: "The cinnamon rolls are soft, gooey, and absolutely delicious.", rating: 5 },
  { name: "Dev Patel", review: "I tried the walnut brownies — rich, fudgy, and addictive.", rating: 4 },
  { name: "Neha Bansal", review: "The butter cookies melt in your mouth. Perfect with tea.", rating: 5 },
  { name: "Arjun Khanna", review: "Best bakery in Ludhiana! Their cakes are beautifully decorated.", rating: 5 },
  { name: "Meera Joshi", review: "The pineapple pastry was light and refreshing. Loved it.", rating: 4 },
  { name: "Rahul Malhotra", review: "Their garlic bread is a must-try. Perfectly toasted and flavorful.", rating: 5 },
  { name: "Ishita Anand", review: "The chocolate truffle cake was rich and indulgent.", rating: 5 },
  { name: "Vikram Chauhan", review: "I always buy their multigrain bread — healthy and tasty.", rating: 4 },
  { name: "Sneha Reddy", review: "The strawberry tart was fresh and delightful.", rating: 5 },
  { name: "Karan Gupta", review: "Their cheesecakes are creamy and perfectly balanced.", rating: 5 },
  { name: "Tanya Kapoor", review: "The almond croissants are my favorite breakfast treat.", rating: 4 },
  { name: "Manish Arora", review: "Loved the festive plum cake during Christmas season.", rating: 5 },
  { name: "Ritika Sharma", review: "The chocolate éclairs are filled generously and taste divine.", rating: 5 },
  { name: "Siddharth Jain", review: "Their bakery has a cozy vibe and everything tastes homemade.", rating: 4 },
  { name: "Pooja Nair", review: "The mango mousse cake was refreshing and beautifully presented.", rating: 5 }
];

const SeeMoreReviews = () => {
  return (
    <section className="reviewss">
      <h2>More Customer Reviews</h2>
      <div className="review-containerr">
        {reviews.map((item, index) => (
          <div className="review-cards" key={index}>
            <div className="review-headerr">
              <span className="reviewerr">{item.name}</span>
            </div>
            <p className="review-textt">{item.review}</p>
            <div className="review-ratingg">
              {"⭐".repeat(item.rating)}
              <span className="rating-textt">({item.rating}/5)</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default SeeMoreReviews;
