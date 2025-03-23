import React from "react";
import "./NewsLetter.css";
const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Be the First to Know About New Arrivals!</h1>
      <p>Get latest fashion trends & offers directly in your inbox.</p>
      <div>
        <input type="email" placeholder="Your Email id" />
        <button>Get My Discount</button>
      </div>
    </div>
  );
};

export default NewsLetter;
