import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ImageSlider from "./ImageSlider";
import "./About.css";

function About({ searchTerm, onSearchChange, cartCount }) {
  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        cartCount={cartCount}
      />

      <main className="about-wrapper">
        <div className="about-content-box">
          {/* Text Block */}
          <div className="about-text-block">
            <h1>About OneStopShop</h1>
            <p>
              OneStopShop is your modern e-commerce destination. Designed to simplify your shopping
              journey, we bring together a curated range of products and a seamless interface.
            </p>
            <p>
              Built with React, our platform ensures speed, responsiveness, and a visually clean experience.
              We believe in combining functionality with aesthetic minimalism.
            </p>
            <div className="features">
              <h2>What We Offer</h2>
              <ul>
                <li>🔍 Effortless product discovery</li>
                <li>🛒 Minimal & powerful cart system</li>
                <li>📦 Transparent product listings</li>
                <li>💳 Secure and trusted checkout</li>
              </ul>
            </div>
          </div>

          {/* Slider Block */}
          <div className="about-slider-block">
            <ImageSlider />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;

