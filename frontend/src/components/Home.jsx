import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ImageSlider from "./ImageSlider";
import "./Home.css";

function Home({ searchTerm, onSearchChange, cartCount }) {
  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={onSearchChange} cartCount={cartCount} />

      <main className="home-main">
        <div className="home-container">
          <section className="home-text">
            <h1 className="home-title">Welcome to OneStopShop</h1>
            <p className="home-subtitle">Curated essentials, just for you.</p>
            <p className="home-description">
              Discover a carefully selected collection of quality products designed
              to elevate your lifestyle. From timeless classics to modern must-haves,
              everything you need is right here.
            </p>
          </section>

          <section className="home-slider">
            <ImageSlider />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Home;
