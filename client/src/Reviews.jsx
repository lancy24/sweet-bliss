import React, { useState, useEffect } from 'react';
import './Reviews.css';
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';
import img1 from './assets/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg';
import img2 from './assets/christopher-campbell-rDEOVtE7vOs-unsplash.jpg';
import img3 from './assets/mario-la-pergola-c_FJd4p-zGo-unsplash.jpg';

const DEFAULT_REVIEWS = [
  { id: 1, name: "Mukul M.", img: img1, text: "Absolutely loved the chocolate truffle cake! Super moist and rich. 🍫🎂", rating: 5 },
  { id: 2, name: "Naniya D.", img: img2, text: "Ordered a birthday hamper, delivered on time. Very elegant packaging. 🎁", rating: 4 },
  { id: 3, name: "Komal R.", img: img3, text: "The best bakery in town. The cupcakes were fresh and creamy! 🧁", rating: 4 },
];

const Reviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("blissfulReviews");
      return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
    } catch { return DEFAULT_REVIEWS; }
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ text: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem("blissfulReviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.text.trim()) return;
    const newReview = {
      id: Date.now(),
      name: user?.name || "Anonymous",
      img: null,
      text: form.text,
      rating: form.rating,
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    setForm({ text: "", rating: 5 });
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="reviews">
      <hr />
      <h2 data-aos="fade-up">Bakery Customer Reviews</h2>

      <div className="review-actions">
        {user ? (
          <button className="add-review-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "✕ Cancel" : "✍️ Write a Review"}
          </button>
        ) : (
          <p className="login-to-review">
            <Link to="/login">Login</Link> to write a review!
          </p>
        )}
      </div>

      {submitted && <div className="review-success">🎉 Thank you for your review!</div>}

      {showForm && (
        <div className="review-form-wrapper" data-aos="fade-up">
          <form className="review-form" onSubmit={handleSubmit}>
            <h3>Share your experience 🧁</h3>
            <div className="rating-select">
              <label>Rating:</label>
              <div className="star-select">
                {[1,2,3,4,5].map((star) => (
                  <span
                    key={star}
                    className={form.rating >= star ? "star active" : "star"}
                    onClick={() => setForm({ ...form, rating: star })}
                  >⭐</span>
                ))}
              </div>
            </div>
            <textarea
              placeholder="Tell us about your experience..."
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              rows={4}
              required
            />
            <button type="submit" className="submit-review-btn">Submit Review 🎂</button>
          </form>
        </div>
      )}

      <div className="review-container">
        {reviews.map((review) => (
          <div className="review-card" key={review.id} data-aos="zoom-in">
            <div className="review-header">
              {review.img ? (
                <img src={review.img} alt={review.name} className="profile-pic" />
              ) : (
                <div className="profile-placeholder">{review.name.charAt(0).toUpperCase()}</div>
              )}
              <span className="reviewer">{review.name}</span>
            </div>
            <p className="review-text">"{review.text}"</p>
            <div className="review-rating">
              {"⭐".repeat(review.rating)}
              <span className="rating-text"><b>{review.rating}/5</b></span>
            </div>
          </div>
        ))}
      </div>

      <br />
      <Link to="/see-more" className="see-more-btn">See More</Link>
      <br /><br />
      <hr />
    </section>
  );
};

export default Reviews;
