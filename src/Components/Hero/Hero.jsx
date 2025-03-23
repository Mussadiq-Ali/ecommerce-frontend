import React from "react";
import "./Hero.css";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Experience An Iconic Luxury Brand</h2>
        <div>
          <p>Upgrade Your Look </p>
          <p> with Our New</p>
          <p> Collection</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="img" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="img" />
      </div>
    </div>
  );
};

export default Hero;
